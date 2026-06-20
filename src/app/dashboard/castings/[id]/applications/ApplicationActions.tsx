"use client";

import { useState } from "react";

type Status = "PENDING" | "SHORTLISTED" | "ACCEPTED" | "REJECTED";

const ACTIONS: { status: Status; label: string; style: string }[] = [
  { status: "SHORTLISTED", label: "Shortlist", style: "border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E]/10" },
  { status: "ACCEPTED", label: "Accept", style: "border-green-700 text-green-400 hover:bg-green-900/20" },
  { status: "REJECTED", label: "Reject", style: "border-gray-700 text-gray-600 hover:text-red-400 hover:border-red-800" },
];

export default function ApplicationActions({
  castingId, appId, currentStatus,
}: {
  castingId: string; appId: string; currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState<string | null>(null);

  const updateStatus = async (newStatus: Status) => {
    setLoading(newStatus);
    const res = await fetch(`/api/castings/${castingId}/applications/${appId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) setStatus(newStatus);
    setLoading(null);
  };

  return (
    <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 self-start">
      {ACTIONS.filter((a) => a.status !== status).map(({ status: s, label, style }) => (
        <button
          key={s}
          onClick={() => updateStatus(s)}
          disabled={loading !== null}
          className={`text-xs border px-3 py-1.5 font-bold uppercase tracking-widest transition-colors disabled:opacity-40 ${style}`}
        >
          {loading === s ? "..." : label}
        </button>
      ))}
    </div>
  );
}
