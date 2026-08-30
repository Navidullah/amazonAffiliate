// lib/teach/room.js
// Firestore helpers for the live teaching whiteboard ("/teach").
//
// Data shape:
//   whiteboards/{roomId}
//     hostKey: string            — presence of ?key=<hostKey> in the URL grants edit rights
//     createdAt: serverTimestamp
//     pageOrder: string[]        — ordered list of page ids
//     currentPageId: string      — page the presenter is currently showing
//   whiteboards/{roomId}/pages/{pageId}
//     createdAt: serverTimestamp
//   whiteboards/{roomId}/pages/{pageId}/objects/{objectId}
//     type: 'stroke' | 'rect' | 'circle' | 'line' | 'text' | 'equation'
//     ...geometry/content fields (all coordinates are 0..1, relative to the board)
//     color, strokeWidth
//     createdAt: serverTimestamp
//     clientId: string           — used for local "undo my last object"

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function randomId(len = 8) {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function newRoomId() {
  return randomId(8);
}

export function newHostKey() {
  return randomId(12);
}

const roomRef = (roomId) => doc(db, "whiteboards", roomId);
const pagesCol = (roomId) => collection(db, "whiteboards", roomId, "pages");
const pageRef = (roomId, pageId) => doc(db, "whiteboards", roomId, "pages", pageId);
const objectsCol = (roomId, pageId) => collection(db, "whiteboards", roomId, "pages", pageId, "objects");
const objectRef = (roomId, pageId, objectId) => doc(db, "whiteboards", roomId, "pages", pageId, "objects", objectId);

export async function createRoom() {
  const roomId = newRoomId();
  const hostKey = newHostKey();
  const firstPageId = randomId(6);

  await setDoc(pageRef(roomId, firstPageId), { createdAt: serverTimestamp() });
  await setDoc(roomRef(roomId), {
    hostKey,
    createdAt: serverTimestamp(),
    pageOrder: [firstPageId],
    currentPageId: firstPageId,
  });

  return { roomId, hostKey };
}

export function subscribeRoom(roomId, cb) {
  return onSnapshot(roomRef(roomId), (snap) => {
    if (!snap.exists()) return cb(null);
    cb({ id: snap.id, ...snap.data() });
  });
}

export async function addPage(roomId, currentPageOrder) {
  const pageId = randomId(6);
  await setDoc(pageRef(roomId, pageId), { createdAt: serverTimestamp() });
  const nextOrder = [...currentPageOrder, pageId];
  await updateDoc(roomRef(roomId), { pageOrder: nextOrder, currentPageId: pageId });
  return pageId;
}

export async function setCurrentPage(roomId, pageId) {
  await updateDoc(roomRef(roomId), { currentPageId: pageId });
}

export function subscribeObjects(roomId, pageId, cb) {
  const q = query(objectsCol(roomId, pageId), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function addObject(roomId, pageId, object) {
  const ref = await addDoc(objectsCol(roomId, pageId), {
    ...object,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteObject(roomId, pageId, objectId) {
  await deleteDoc(objectRef(roomId, pageId, objectId));
}

export async function clearPage(roomId, pageId) {
  const snap = await getDocs(objectsCol(roomId, pageId));
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
