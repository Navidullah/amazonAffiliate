import Whiteboard from "@/app/components/teach/Whiteboard";
import VoiceChat from "@/app/components/teach/VoiceChat";

export const metadata = {
  title: "Classroom | Shopyor",
  robots: "noindex, nofollow",
};

export default async function TeachRoomPage({ params, searchParams }) {
  const { roomId } = await params;
  const { key } = await searchParams;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-3">
      <VoiceChat roomId={roomId} hostKey={key || null} />
      <Whiteboard roomId={roomId} hostKey={key || null} />
    </main>
  );
}
