"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Dashboard failed to load</h2>
      <pre className="mt-4 whitespace-pre-wrap text-sm">{error?.message}</pre>
      <button className="mt-4 underline" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
