"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Hand, PhoneOff, PhoneCall, Radio, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeRoom } from "@/lib/teach/room";
import {
  getOrCreateParticipantId,
  subscribeParticipants,
  upsertParticipant,
  removeParticipant,
  setHandRaised,
  setActiveSpeaker,
  subscribeCalls,
  deleteCallDoc,
  startStudentCall,
  answerStudentCall,
  startHeartbeat,
  STALE_AFTER_MS,
} from "@/lib/teach/voice";

export default function VoiceChat({ roomId, hostKey }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [handRaised, setHandRaisedLocal] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const participantIdRef = useRef(null);
  if (!participantIdRef.current) participantIdRef.current = getOrCreateParticipantId(roomId);
  const participantId = participantIdRef.current;

  const isHost = Boolean(room && hostKey && room.hostKey === hostKey);
  const activeSpeakerId = room?.activeSpeakerId || null;
  // Long-lived WebRTC callbacks (registered once, when voice is enabled) need
  // the *current* active speaker, not the one closed over at connect-time —
  // a ref sidesteps that staleness for a late-joining student's setup.
  const activeSpeakerRef = useRef(null);
  useEffect(() => {
    activeSpeakerRef.current = activeSpeakerId;
  }, [activeSpeakerId]);

  useEffect(() => {
    const unsub = subscribeRoom(roomId, setRoom);
    return () => unsub();
  }, [roomId]);

  useEffect(() => {
    if (!isHost) return;
    const unsub = subscribeParticipants(roomId, setParticipants);
    return () => unsub();
  }, [roomId, isHost]);

  // ---------------- Host: mixer + per-student peer connections ----------------
  const hostAudioRef = useRef(null); // { ctx, hostGain, localStream }
  const studentNodesRef = useRef({}); // participantId -> { pc, cleanup, dest, monitorGain, broadcastGain }

  const connectSpeakerToAllExcept = useCallback((speakerId) => {
    const nodes = studentNodesRef.current;
    Object.entries(nodes).forEach(([id, node]) => {
      if (id === speakerId) return;
      try {
        nodes[speakerId]?.broadcastGain?.connect(node.dest);
      } catch {
        // already connected / node gone — ignore
      }
    });
  }, []);

  const disconnectStudentNode = useCallback((id) => {
    const node = studentNodesRef.current[id];
    if (!node) return;
    try {
      node.broadcastGain?.disconnect();
      node.monitorGain?.disconnect();
      node.dest && hostAudioRef.current?.hostGain?.disconnect(node.dest);
      node.dest?.disconnect();
    } catch {}
    node.cleanup?.();
    delete studentNodesRef.current[id];
  }, []);

  // React to the tutor's choice of active speaker: rewire the mix graph.
  const prevSpeakerRef = useRef(null);
  useEffect(() => {
    if (!isHost || !connected) return;
    const nodes = studentNodesRef.current;
    const prev = prevSpeakerRef.current;
    if (prev && nodes[prev]) {
      try {
        nodes[prev].broadcastGain?.disconnect();
      } catch {}
    }
    if (activeSpeakerId && nodes[activeSpeakerId]?.broadcastGain) {
      connectSpeakerToAllExcept(activeSpeakerId);
    }
    prevSpeakerRef.current = activeSpeakerId;
  }, [activeSpeakerId, isHost, connected, connectSpeakerToAllExcept]);

  const enableHostVoice = useCallback(async () => {
    setError("");
    setConnecting(true);
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const hostGain = ctx.createGain();
      ctx.createMediaStreamSource(localStream).connect(hostGain);
      hostAudioRef.current = { ctx, hostGain, localStream };

      const handleOffer = (id, data) => {
        if (studentNodesRef.current[id] || !data?.offer) return;
        const dest = ctx.createMediaStreamDestination();
        hostGain.connect(dest);
        const outgoingTrack = dest.stream.getAudioTracks()[0];

        const { pc, cleanup } = answerStudentCall(roomId, id, data.offer, outgoingTrack, {
          onRemoteTrack: (stream) => {
            const micSource = ctx.createMediaStreamSource(stream);
            const monitorGain = ctx.createGain(); // tutor always hears connected students directly
            monitorGain.gain.value = 1;
            micSource.connect(monitorGain).connect(ctx.destination);
            const broadcastGain = ctx.createGain(); // gated: only routed to others when they're "live"
            broadcastGain.gain.value = 1;
            micSource.connect(broadcastGain);
            studentNodesRef.current[id] = { ...studentNodesRef.current[id], monitorGain, broadcastGain };
            if (activeSpeakerRef.current === id) connectSpeakerToAllExcept(id);
          },
        });
        studentNodesRef.current[id] = { pc, cleanup, dest };
      };

      const unsubCalls = subscribeCalls(roomId, (changes) => {
        changes.forEach((change) => {
          const id = change.doc.id;
          if (change.type === "removed") {
            disconnectStudentNode(id);
            return;
          }
          handleOffer(id, change.doc.data());
        });
      });
      hostAudioRef.current.unsubCalls = unsubCalls;
      setConnected(true);
    } catch (e) {
      setError(e?.message?.includes("Permission") || e?.name === "NotAllowedError"
        ? "Microphone permission was denied. Allow mic access and try again."
        : "Couldn't start voice chat. Check your microphone and try again.");
    } finally {
      setConnecting(false);
    }
  }, [roomId, connectSpeakerToAllExcept, disconnectStudentNode]);

  const disableHostVoice = useCallback(() => {
    Object.keys(studentNodesRef.current).forEach(disconnectStudentNode);
    hostAudioRef.current?.unsubCalls?.();
    hostAudioRef.current?.localStream?.getTracks().forEach((t) => t.stop());
    hostAudioRef.current?.ctx?.close().catch(() => {});
    hostAudioRef.current = null;
    setConnected(false);
    setActiveSpeaker(roomId, null).catch(() => {});
  }, [roomId, disconnectStudentNode]);

  // Prune students who went silent (closed tab without cleanup firing).
  useEffect(() => {
    if (!isHost || !connected) return;
    const id = setInterval(() => {
      const now = Date.now();
      participants.forEach((p) => {
        if (p.role !== "student") return;
        const lastSeen = p.lastSeen?.toMillis?.() ?? 0;
        if (now - lastSeen > STALE_AFTER_MS) {
          disconnectStudentNode(p.id);
          removeParticipant(roomId, p.id);
          deleteCallDoc(roomId, p.id);
          if (activeSpeakerId === p.id) setActiveSpeaker(roomId, null).catch(() => {});
        }
      });
    }, 15_000);
    return () => clearInterval(id);
  }, [isHost, connected, participants, roomId, activeSpeakerId, disconnectStudentNode]);

  useEffect(() => () => disableHostVoice(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleHostMute() {
    const gain = hostAudioRef.current?.hostGain;
    if (!gain) return;
    gain.gain.value = micMuted ? 1 : 0;
    setMicMuted(!micMuted);
  }

  // ---------------- Student: connect to the tutor ----------------
  const studentCallRef = useRef(null); // { pc, remoteStream, cleanup, localStream }
  const remoteAudioRef = useRef(null);
  const stopHeartbeatRef = useRef(null);

  const enableStudentVoice = useCallback(async () => {
    setError("");
    setConnecting(true);
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await upsertParticipant(roomId, participantId, { role: "student", handRaised: false, name: name.trim() || "Student" });
      stopHeartbeatRef.current = startHeartbeat(roomId, participantId);
      const call = await startStudentCall(roomId, participantId, localStream, {
        onConnectionStateChange: (state) => {
          if (state === "failed" || state === "disconnected") setError("Voice connection lost.");
        },
      });
      studentCallRef.current = { ...call, localStream };
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = call.remoteStream;
      setConnected(true);
    } catch (e) {
      setError(e?.name === "NotAllowedError"
        ? "Microphone permission was denied. Allow mic access and try again."
        : "Couldn't connect voice chat. Check your microphone and try again.");
    } finally {
      setConnecting(false);
    }
  }, [roomId, participantId]);

  const disableStudentVoice = useCallback(() => {
    studentCallRef.current?.cleanup?.();
    studentCallRef.current?.localStream?.getTracks().forEach((t) => t.stop());
    studentCallRef.current = null;
    stopHeartbeatRef.current?.();
    removeParticipant(roomId, participantId);
    setConnected(false);
    setHandRaisedLocal(false);
  }, [roomId, participantId]);

  useEffect(() => () => disableStudentVoice(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleStudentMute() {
    const track = studentCallRef.current?.localStream?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = micMuted;
    setMicMuted(!micMuted);
  }

  function toggleRaiseHand() {
    const next = !handRaised;
    setHandRaisedLocal(next);
    setHandRaised(roomId, participantId, next).catch(() => {});
  }

  if (!room) return null;

  // ---------------- Host UI ----------------
  if (isHost) {
    const students = participants.filter((p) => p.role === "student");
    const raisedHands = students.filter((p) => p.handRaised);

    return (
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
        <div className="flex flex-wrap items-center gap-2">
          {!connected ? (
            <Button size="sm" onClick={enableHostVoice} disabled={connecting}>
              <PhoneCall /> {connecting ? "Starting…" : "Start voice chat"}
            </Button>
          ) : (
            <>
              <Button variant="outline" size="icon-sm" onClick={toggleHostMute} title={micMuted ? "Unmute my mic" : "Mute my mic"}>
                {micMuted ? <MicOff /> : <Mic />}
              </Button>
              <Button variant="outline" size="sm" onClick={disableHostVoice}>
                <PhoneOff /> End voice chat
              </Button>
              {activeSpeakerId && (
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  <Radio className="size-3" /> Live: {students.find((s) => s.id === activeSpeakerId)?.name || "Student"}
                </span>
              )}
            </>
          )}
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        {connected && students.length > 0 && (
          <div className="flex flex-col gap-1 border-t border-border pt-2">
            {students.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1.5">
                  {s.handRaised && <Hand className="size-3.5 text-amber-500" />}
                  {s.name || "Student"}
                </span>
                <Button
                  variant={activeSpeakerId === s.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSpeaker(roomId, activeSpeakerId === s.id ? null : s.id)}
                >
                  {activeSpeakerId === s.id ? "Mute" : "Unmute"}
                </Button>
              </div>
            ))}
          </div>
        )}
        {connected && students.length === 0 && (
          <p className="text-xs text-muted-foreground">Waiting for students to join…</p>
        )}
        {connected && raisedHands.length > 0 && (
          <p className="text-xs text-amber-600">{raisedHands.length} student{raisedHands.length > 1 ? "s" : ""} raised a hand</p>
        )}
      </div>
    );
  }

  // ---------------- Student UI ----------------
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3">
      <audio ref={remoteAudioRef} autoPlay />
      {!connected ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={40}
            className="h-8 w-40 rounded-md border border-border bg-background px-2 text-sm"
          />
          <Button size="sm" onClick={enableStudentVoice} disabled={connecting}>
            <PhoneCall /> {connecting ? "Connecting…" : "Enable voice"}
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="icon-sm" onClick={toggleStudentMute} title={micMuted ? "Unmute my mic" : "Mute my mic"}>
            {micMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button
            variant={handRaised ? "default" : "outline"}
            size="sm"
            onClick={toggleRaiseHand}
            disabled={activeSpeakerId === participantId}
          >
            <Hand /> {handRaised ? "Hand raised" : "Raise hand"}
          </Button>
          <Button variant="outline" size="sm" onClick={disableStudentVoice}>
            <PhoneOff /> Leave voice chat
          </Button>
          {activeSpeakerId === participantId && (
            <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              <Volume2 className="size-3" /> You're live
            </span>
          )}
        </>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
