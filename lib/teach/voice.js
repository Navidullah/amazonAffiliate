// lib/teach/voice.js
// WebRTC voice-chat signaling for the "/teach" whiteboard, layered on the
// same Firestore room used for drawing sync — no separate media/signaling
// server. Topology is a star centered on the tutor: every student opens one
// RTCPeerConnection directly to the tutor's browser (never to each other).
// The tutor mixes audio locally (Web Audio API) and re-sends a per-student
// mix so students can hear the tutor plus whichever single student is
// currently the "active speaker" — without needing an SFU.
//
// Data shape (nested under the existing whiteboards/{roomId} doc):
//   whiteboards/{roomId}
//     activeSpeakerId: string | null   — participantId the tutor has unmuted
//   whiteboards/{roomId}/participants/{participantId}
//     role: 'host' | 'student', name, handRaised, lastSeen (heartbeat)
//   whiteboards/{roomId}/calls/{participantId}   — one call doc per student
//     offer: {sdp, type}                — written by the student
//     answer: {sdp, type}                — written by the tutor
//     offerCandidates/{...}, answerCandidates/{...}

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Public, no-signup STUN/TURN so calls still connect on restrictive networks
// (mobile data, school/office wifi). This is a shared community relay
// (Metered's OpenRelay project) intended for demos/small-scale use, not a
// guaranteed-SLA service — swap in a paid TURN provider if voice chat needs
// to scale up or become more reliable later.
export const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:openrelay.metered.ca:80" },
  { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
  { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
  {
    urls: "turn:openrelay.metered.ca:443?transport=tcp",
    username: "openrelayproject",
    credential: "openrelayproject",
  },
];

const HEARTBEAT_MS = 10_000;
export const STALE_AFTER_MS = 25_000;

function randomId(len = 10) {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function getOrCreateParticipantId(roomId) {
  if (typeof window === "undefined") return randomId();
  const key = `teach:${roomId}:participantId`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = randomId();
    sessionStorage.setItem(key, id);
  }
  return id;
}

const participantsCol = (roomId) => collection(db, "whiteboards", roomId, "participants");
const participantRef = (roomId, id) => doc(db, "whiteboards", roomId, "participants", id);
const callsCol = (roomId) => collection(db, "whiteboards", roomId, "calls");
const callRef = (roomId, id) => doc(db, "whiteboards", roomId, "calls", id);

export function subscribeParticipants(roomId, cb) {
  return onSnapshot(participantsCol(roomId), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function upsertParticipant(roomId, participantId, data) {
  await setDoc(participantRef(roomId, participantId), { ...data, lastSeen: serverTimestamp() }, { merge: true });
}

export function startHeartbeat(roomId, participantId) {
  const tick = () => upsertParticipant(roomId, participantId, {}).catch(() => {});
  const id = setInterval(tick, HEARTBEAT_MS);
  return () => clearInterval(id);
}

export async function removeParticipant(roomId, participantId) {
  await deleteDoc(participantRef(roomId, participantId)).catch(() => {});
}

export async function setHandRaised(roomId, participantId, raised) {
  await updateDoc(participantRef(roomId, participantId), { handRaised: raised }).catch(() => {});
}

export async function setActiveSpeaker(roomId, participantId) {
  await updateDoc(doc(db, "whiteboards", roomId), { activeSpeakerId: participantId ?? null });
}

export function subscribeCalls(roomId, cb) {
  return onSnapshot(callsCol(roomId), (snap) => cb(snap.docChanges()));
}

export async function deleteCallDoc(roomId, participantId) {
  const cRef = callRef(roomId, participantId);
  const [offerSnap, answerSnap] = await Promise.all([
    getDocs(collection(cRef, "offerCandidates")),
    getDocs(collection(cRef, "answerCandidates")),
  ]);
  const batch = writeBatch(db);
  offerSnap.docs.forEach((d) => batch.delete(d.ref));
  answerSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(cRef);
  await batch.commit().catch(() => {});
}

// ---- Student side: open the call ----
export async function startStudentCall(roomId, participantId, localStream, { onConnectionStateChange } = {}) {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

  const remoteStream = new MediaStream();
  pc.ontrack = (e) => {
    e.streams[0]?.getTracks().forEach((t) => remoteStream.addTrack(t));
  };
  pc.onconnectionstatechange = () => onConnectionStateChange?.(pc.connectionState);

  const cRef = callRef(roomId, participantId);
  const offerCandidates = collection(cRef, "offerCandidates");
  const answerCandidates = collection(cRef, "answerCandidates");

  pc.onicecandidate = (e) => {
    if (e.candidate) addDoc(offerCandidates, e.candidate.toJSON());
  };

  const offerDesc = await pc.createOffer();
  await pc.setLocalDescription(offerDesc);
  await setDoc(cRef, { offer: { sdp: offerDesc.sdp, type: offerDesc.type }, createdAt: serverTimestamp() });

  const unsubDoc = onSnapshot(cRef, (snap) => {
    const data = snap.data();
    if (data?.answer && !pc.currentRemoteDescription) {
      pc.setRemoteDescription(new RTCSessionDescription(data.answer)).catch(() => {});
    }
  });
  const unsubCandidates = onSnapshot(answerCandidates, (snap) => {
    snap.docChanges().forEach((change) => {
      if (change.type === "added") pc.addIceCandidate(new RTCIceCandidate(change.doc.data())).catch(() => {});
    });
  });

  return {
    pc,
    remoteStream,
    cleanup: async () => {
      unsubDoc();
      unsubCandidates();
      pc.close();
      await deleteCallDoc(roomId, participantId);
    },
  };
}

// ---- Tutor side: answer one student's call ----
export function answerStudentCall(roomId, participantId, offer, outgoingTrack, { onRemoteTrack, onConnectionStateChange } = {}) {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  if (outgoingTrack) pc.addTrack(outgoingTrack, new MediaStream([outgoingTrack]));

  pc.ontrack = (e) => onRemoteTrack?.(e.streams[0]);
  pc.onconnectionstatechange = () => onConnectionStateChange?.(pc.connectionState);

  const cRef = callRef(roomId, participantId);
  const offerCandidates = collection(cRef, "offerCandidates");
  const answerCandidates = collection(cRef, "answerCandidates");

  pc.onicecandidate = (e) => {
    if (e.candidate) addDoc(answerCandidates, e.candidate.toJSON());
  };

  (async () => {
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answerDesc = await pc.createAnswer();
    await pc.setLocalDescription(answerDesc);
    await updateDoc(cRef, { answer: { sdp: answerDesc.sdp, type: answerDesc.type } });
  })().catch(() => {});

  const unsubCandidates = onSnapshot(offerCandidates, (snap) => {
    snap.docChanges().forEach((change) => {
      if (change.type === "added") pc.addIceCandidate(new RTCIceCandidate(change.doc.data())).catch(() => {});
    });
  });

  return {
    pc,
    cleanup: () => {
      unsubCandidates();
      pc.close();
    },
  };
}
