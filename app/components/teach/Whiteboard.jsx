"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";
import {
  Pencil,
  Eraser,
  Minus,
  Square,
  Circle as CircleIcon,
  Type,
  Sigma,
  Undo2,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Link2,
  Download,
  Users,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Highlighter,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  subscribeRoom,
  subscribeObjects,
  addObject,
  deleteObject,
  addPage,
  setCurrentPage,
  clearPage,
} from "@/lib/teach/room";

const COLORS = ["#1e293b", "#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#9333ea"];
const WIDTHS = [2, 4, 8];
const HIT_TOLERANCE = 0.02;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

function dist(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function distToSegment(px, py, ax, ay, bx, by) {
  const l2 = (bx - ax) ** 2 + (by - ay) ** 2;
  if (l2 === 0) return dist(px, py, ax, ay);
  let t = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist(px, py, ax + t * (bx - ax), ay + t * (by - ay));
}

function hitTestCanvasObject(obj, x, y) {
  if (obj.type === "stroke") {
    return obj.points.some((p) => dist(p.x, p.y, x, y) < HIT_TOLERANCE);
  }
  if (obj.type === "line") {
    return distToSegment(x, y, obj.x1, obj.y1, obj.x2, obj.y2) < HIT_TOLERANCE;
  }
  if (obj.type === "rect") {
    const x0 = Math.min(obj.x1, obj.x2) - HIT_TOLERANCE;
    const x1 = Math.max(obj.x1, obj.x2) + HIT_TOLERANCE;
    const y0 = Math.min(obj.y1, obj.y2) - HIT_TOLERANCE;
    const y1 = Math.max(obj.y1, obj.y2) + HIT_TOLERANCE;
    const onBorder =
      Math.abs(x - x0) < HIT_TOLERANCE ||
      Math.abs(x - x1) < HIT_TOLERANCE ||
      Math.abs(y - y0) < HIT_TOLERANCE ||
      Math.abs(y - y1) < HIT_TOLERANCE;
    return x >= x0 && x <= x1 && y >= y0 && y <= y1 && onBorder;
  }
  if (obj.type === "circle") {
    const cx = (obj.x1 + obj.x2) / 2;
    const cy = (obj.y1 + obj.y2) / 2;
    const rx = Math.abs(obj.x2 - obj.x1) / 2;
    const ry = Math.abs(obj.y2 - obj.y1) / 2;
    if (rx < 0.001 || ry < 0.001) return false;
    const norm = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
    return Math.abs(Math.sqrt(norm) - 1) < 0.15;
  }
  return false;
}

function drawObject(ctx, obj, w, h, dpr) {
  const isHighlighter = obj.variant === "highlighter";
  ctx.strokeStyle = obj.color || "#1e293b";
  ctx.fillStyle = obj.color || "#1e293b";
  // strokeWidth is chosen in CSS-pixel terms; the canvas backing store is
  // dpr-scaled, so without this a "4px" line renders as a faint ~2px (or
  // thinner, on higher-dpr Windows scaling like 125%/150%) hairline that
  // reads as blurry rather than a clean, deliberate stroke.
  // Highlighter strokes are drawn wider and translucent with a flat cap, like
  // a marker tip, and always reset here so the setting never leaks between
  // objects sharing the same ctx across a redraw pass.
  ctx.lineWidth = (obj.strokeWidth || 2) * dpr * (isHighlighter ? 5 : 1);
  ctx.lineCap = isHighlighter ? "butt" : "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = isHighlighter ? 0.35 : 1;

  if (obj.type === "stroke") {
    if (!obj.points || obj.points.length < 1) return;
    const pts = obj.points.map((p) => ({ x: p.x * w, y: p.y * h }));
    ctx.beginPath();
    if (pts.length < 3) {
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    } else {
      // Smooth the freehand line by drawing quadratic curves through the
      // midpoints of each pair of points, instead of raw straight segments
      // between every sampled point — this is what turns a jagged polyline
      // into a smooth, Miro-like pen stroke.
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
    }
    ctx.stroke();
  } else if (obj.type === "line") {
    ctx.beginPath();
    ctx.moveTo(obj.x1 * w, obj.y1 * h);
    ctx.lineTo(obj.x2 * w, obj.y2 * h);
    ctx.stroke();
  } else if (obj.type === "rect") {
    ctx.strokeRect(
      Math.min(obj.x1, obj.x2) * w,
      Math.min(obj.y1, obj.y2) * h,
      Math.abs(obj.x2 - obj.x1) * w,
      Math.abs(obj.y2 - obj.y1) * h
    );
  } else if (obj.type === "circle") {
    const cx = ((obj.x1 + obj.x2) / 2) * w;
    const cy = ((obj.y1 + obj.y2) / 2) * h;
    const rx = (Math.abs(obj.x2 - obj.x1) / 2) * w;
    const ry = (Math.abs(obj.y2 - obj.y1) / 2) * h;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export default function Whiteboard({ roomId, hostKey }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const boardRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [objects, setObjects] = useState([]);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(WIDTHS[1]);
  const [pendingInput, setPendingInput] = useState(null); // {type, x, y, value}
  const [copiedMsg, setCopiedMsg] = useState("");
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const drawingRef = useRef(null);
  const myObjectIdsRef = useRef([]);
  const isHost = Boolean(room && hostKey && room.hostKey === hostKey);

  // subscribe to room doc
  useEffect(() => {
    const unsub = subscribeRoom(roomId, setRoom);
    return () => unsub();
  }, [roomId]);

  // Track native fullscreen state too, so pressing Esc (or a browser's own
  // exit-fullscreen control) keeps our button/layout in sync.
  useEffect(() => {
    const onChange = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (!fsEl) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  function toggleFullscreen() {
    const el = boardRef.current;
    if (!isFullscreen) {
      setIsFullscreen(true);
      // Best-effort: real Fullscreen API hides the browser chrome where
      // supported (desktop, Android Chrome). iOS Safari doesn't support it
      // for non-video elements, so the CSS fixed-overlay layout below is
      // what actually delivers "full screen" there.
      const request = el?.requestFullscreen || el?.webkitRequestFullscreen;
      request?.call(el)?.catch?.(() => {});
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen?.();
      }
    }
  }

  // subscribe to current page's objects
  useEffect(() => {
    if (!room?.currentPageId) return;
    myObjectIdsRef.current = [];
    const unsub = subscribeObjects(roomId, room.currentPageId, setObjects);
    return () => unsub();
  }, [roomId, room?.currentPageId]);

  const redraw = useCallback(
    (previewObj) => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const cssWidth = wrap.getBoundingClientRect().width;
      const dpr = cssWidth > 0 ? w / cssWidth : window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, w, h);
      objects.forEach((obj) => {
        if (obj.type === "text" || obj.type === "equation") return;
        drawObject(ctx, obj, w, h, dpr);
      });
      if (previewObj) drawObject(ctx, previewObj, w, h, dpr);
    },
    [objects]
  );

  useEffect(() => {
    redraw();
  }, [redraw]);

  // keep canvas backing size in sync with displayed size
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const syncSize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      redraw();
    };
    // Do this synchronously on mount instead of waiting for the observer's
    // first callback — that callback can be delayed (e.g. a backgrounded
    // tab), which otherwise leaves the canvas at its 300x150 HTML default,
    // stretched via CSS to fill the board and rendering visibly blurry.
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(wrap);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changing zoom resizes wrapRef via its inline style. ResizeObserver should
  // catch that too, but re-sync explicitly here so zooming stays crisp even
  // if the observer callback is delayed (e.g. a throttled background tab).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    redraw();
  }, [zoom, redraw]);

  function getNormPoint(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    };
  }

  async function commitObject(obj) {
    const id = await addObject(roomId, room.currentPageId, obj);
    myObjectIdsRef.current.push(id);
  }

  function handlePointerDown(e) {
    if (!isHost) return;
    const { x, y } = getNormPoint(e);

    if (tool === "text" || tool === "equation") {
      setPendingInput({ type: tool, x, y, value: "" });
      return;
    }

    if (tool === "eraser") {
      const hit = [...objects].reverse().find((o) => {
        if (o.type === "text" || o.type === "equation") {
          return dist(o.x, o.y, x, y) < 0.05;
        }
        return hitTestCanvasObject(o, x, y);
      });
      if (hit) deleteObject(roomId, room.currentPageId, hit.id);
      return;
    }

    if (tool === "pen" || tool === "highlighter") {
      drawingRef.current = {
        type: "stroke",
        color,
        strokeWidth,
        // Firestore rejects `undefined` fields, so only attach `variant` when it's set.
        ...(tool === "highlighter" ? { variant: "highlighter" } : {}),
        points: [{ x, y }],
      };
    } else {
      drawingRef.current = { type: tool, color, strokeWidth, x1: x, y1: y, x2: x, y2: y };
    }
    canvasRef.current.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!isHost || !drawingRef.current) return;
    const { x, y } = getNormPoint(e);
    const d = drawingRef.current;
    if (d.type === "stroke") {
      // Skip points that land almost on top of the last one (e.g. a slow
      // hand movement firing many pointermove samples in place) — feeding
      // near-duplicate points into the quadratic-curve smoothing produces
      // overlapping little blobs ("beading") instead of one clean line.
      const last = d.points[d.points.length - 1];
      if (!last || dist(last.x, last.y, x, y) > 0.0015) {
        d.points.push({ x, y });
      }
    } else {
      d.x2 = x;
      d.y2 = y;
    }
    redraw(d);
  }

  function handlePointerUp() {
    if (!isHost || !drawingRef.current) return;
    const d = drawingRef.current;
    drawingRef.current = null;
    if (d.type === "stroke" && d.points.length < 2) return;
    if (d.type !== "stroke" && dist(d.x1, d.y1, d.x2, d.y2) < 0.005) return;
    commitObject(d);
  }

  function submitPendingInput() {
    if (!pendingInput) return;
    const value = pendingInput.value.trim();
    if (value) {
      commitObject({
        type: pendingInput.type,
        x: pendingInput.x,
        y: pendingInput.y,
        content: value,
        color,
      });
    }
    setPendingInput(null);
  }

  function handleUndo() {
    const lastId = myObjectIdsRef.current.pop();
    if (lastId) deleteObject(roomId, room.currentPageId, lastId);
  }

  async function handleClearPage() {
    if (!window.confirm("Clear everything on this page?")) return;
    await clearPage(roomId, room.currentPageId);
    myObjectIdsRef.current = [];
  }

  async function handleAddPage() {
    await addPage(roomId, room.pageOrder);
  }

  function gotoPage(delta) {
    const idx = room.pageOrder.indexOf(room.currentPageId);
    const nextIdx = idx + delta;
    if (nextIdx < 0 || nextIdx >= room.pageOrder.length) return;
    setCurrentPage(roomId, room.pageOrder[nextIdx]);
  }

  function handleExport() {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `lesson-page.png`;
    a.click();
  }

  function copyLink(withKey) {
    const url = `${window.location.origin}/teach/${roomId}${withKey ? `?key=${room.hostKey}` : ""}`;
    navigator.clipboard.writeText(url);
    setCopiedMsg(withKey ? "Tutor link copied" : "Student link copied");
    setTimeout(() => setCopiedMsg(""), 2000);
  }

  if (!room) {
    return <div className="flex h-[60vh] items-center justify-center text-muted-foreground">Loading classroom…</div>;
  }

  const pageIdx = room.pageOrder.indexOf(room.currentPageId);

  return (
    <div className="flex flex-col gap-3">
      {isHost && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2">
          <ToolButton active={tool === "pen"} onClick={() => setTool("pen")} icon={Pencil} label="Pen" />
          <ToolButton
            active={tool === "highlighter"}
            onClick={() => setTool("highlighter")}
            icon={Highlighter}
            label="Highlighter"
          />
          <ToolButton active={tool === "line"} onClick={() => setTool("line")} icon={Minus} label="Line" />
          <ToolButton active={tool === "rect"} onClick={() => setTool("rect")} icon={Square} label="Rectangle" />
          <ToolButton active={tool === "circle"} onClick={() => setTool("circle")} icon={CircleIcon} label="Circle" />
          <ToolButton active={tool === "text"} onClick={() => setTool("text")} icon={Type} label="Text" />
          <ToolButton active={tool === "equation"} onClick={() => setTool("equation")} icon={Sigma} label="Equation" />
          <ToolButton active={tool === "eraser"} onClick={() => setTool("eraser")} icon={Eraser} label="Eraser" />

          <div className="mx-1 h-6 w-px bg-border" />

          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="size-6 rounded-full border-2"
              style={{ backgroundColor: c, borderColor: color === c ? "#0f172a" : "transparent" }}
              aria-label={`Color ${c}`}
            />
          ))}

          <div className="flex items-center gap-2 px-1">
            <input
              type="range"
              min={1}
              max={16}
              step={1}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="h-1.5 w-24 accent-foreground"
              aria-label="Stroke width"
            />
            <span className="w-9 text-xs text-muted-foreground">{strokeWidth}px</span>
          </div>

          <div className="mx-1 h-6 w-px bg-border" />

          <Button variant="outline" size="icon-sm" onClick={handleUndo} title="Undo my last mark">
            <Undo2 />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={handleClearPage} title="Clear page">
            <Trash2 />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={handleExport} title="Download page as PNG">
            <Download />
          </Button>
        </div>
      )}

      <div
        ref={boardRef}
        className={
          isFullscreen
            ? "fixed inset-0 z-50 overflow-auto bg-muted/30"
            : "relative aspect-video w-full overflow-auto rounded-lg border border-border bg-muted/30 shadow-sm"
        }
      >
        <div
          ref={wrapRef}
          className="relative aspect-video bg-white"
          style={{ width: `${zoom * 100}%`, minWidth: "100%" }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            style={{ cursor: isHost ? "crosshair" : "default" }}
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

          {objects
          .filter((o) => o.type === "text" || o.type === "equation")
          .map((o) => (
            <div
              key={o.id}
              onClick={() => isHost && tool === "eraser" && deleteObject(roomId, room.currentPageId, o.id)}
              className="absolute -translate-y-1/2 select-none"
              style={{
                left: `${o.x * 100}%`,
                top: `${o.y * 100}%`,
                color: o.color,
                cursor: isHost && tool === "eraser" ? "pointer" : "default",
              }}
            >
              {o.type === "equation" ? <InlineMath math={o.content} /> : <span className="text-base">{o.content}</span>}
            </div>
          ))}

        {pendingInput && (
          <form
            className="absolute z-10 flex -translate-y-1/2 items-center gap-1"
            style={{ left: `${pendingInput.x * 100}%`, top: `${pendingInput.y * 100}%` }}
            onSubmit={(e) => {
              e.preventDefault();
              submitPendingInput();
            }}
          >
            <input
              autoFocus
              value={pendingInput.value}
              onChange={(e) => setPendingInput({ ...pendingInput, value: e.target.value })}
              onBlur={submitPendingInput}
              onKeyDown={(e) => e.key === "Escape" && setPendingInput(null)}
              placeholder={pendingInput.type === "equation" ? "x^2 + y^2 = r^2" : "Type text…"}
              className="h-8 rounded-md border border-primary bg-background px-2 text-sm shadow"
            />
          </form>
        )}

        {!isHost && (
          <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            <Users className="size-3" /> Watching live
          </div>
        )}
        </div>

        <div className="absolute bottom-2 right-2 flex items-center gap-0.5 rounded-full border border-border bg-card/95 p-1 shadow-sm">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))}
            disabled={zoom <= ZOOM_MIN}
            title="Zoom out"
          >
            <ZoomOut />
          </Button>
          <button
            onClick={() => setZoom(1)}
            className="min-w-11 px-1 text-center text-xs text-muted-foreground hover:text-foreground"
            title="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))}
            disabled={zoom >= ZOOM_MAX}
            title="Zoom in"
          >
            <ZoomIn />
          </Button>
          {zoom !== 1 && (
            <Button variant="ghost" size="icon-sm" onClick={() => setZoom(1)} title="Reset zoom">
              <RotateCcw />
            </Button>
          )}
          <div className="mx-0.5 h-5 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
          >
            {isFullscreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={!isHost || pageIdx <= 0}
            onClick={() => gotoPage(-1)}
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pageIdx + 1} of {room.pageOrder.length}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={!isHost || pageIdx >= room.pageOrder.length - 1}
            onClick={() => gotoPage(1)}
          >
            <ChevronRight />
          </Button>
          {isHost && (
            <Button variant="outline" size="sm" onClick={handleAddPage}>
              <Plus /> New page
            </Button>
          )}
        </div>

        {isHost && (
          <div className="flex items-center gap-2">
            {copiedMsg && <span className="text-xs text-muted-foreground">{copiedMsg}</span>}
            <Button variant="secondary" size="sm" onClick={() => copyLink(false)}>
              <Link2 /> Copy student link
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyLink(true)}>
              <Link2 /> Copy my link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolButton({ active, onClick, icon: Icon, label }) {
  return (
    <Button variant={active ? "default" : "outline"} size="icon-sm" onClick={onClick} title={label} aria-label={label}>
      <Icon />
    </Button>
  );
}
