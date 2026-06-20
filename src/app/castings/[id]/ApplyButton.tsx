"use client";

import { useState } from "react";

export default function ApplyButton({ castingId, hasApplied }: { castingId: string; hasApplied: boolean }) {
  const [applied, setApplied] = useState(hasApplied);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (applied) {
    return (
      <div className="border border-[#C8A97E]/40 bg-[#C8A97E]/5 p-6 text-center">
        <p className="text-sm text-[#C8A97E] font-semibold">✓ Application submitted</p>
        <p className="text-xs text-text-muted mt-1">Track status in your dashboard.</p>
      </div>
    );
  }

  const handleApply = async () => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/castings/${castingId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setLoading(false);
    if (res.ok) {
      setApplied(true);
    } else {
      const d = await res.json();
      setError(d.error || "Failed to apply.");
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3 rounded-md">{error}</div>}

      {!showForm ? (
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-[#b8966a] transition-colors"
          >
            Apply for This Role
          </button>
          <button
            onClick={handleApply}
            disabled={loading}
            className="border border-border text-text-muted font-bold uppercase tracking-widest text-xs px-6 py-3 hover:border-text-main hover:text-text-main transition-colors disabled:opacity-50"
          >
            {loading ? "Applying..." : "Quick Apply"}
          </button>
        </div>
      ) : (
        <div className="border border-border p-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-text-muted font-semibold">Cover Message (optional)</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-transparent border border-border p-3 text-text-main text-sm focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
            placeholder="Tell the director why you're right for this role..."
          />
          <div className="flex gap-3">
            <button
              onClick={handleApply}
              disabled={loading}
              className="bg-[#C8A97E] text-black font-bold uppercase tracking-widest text-xs px-6 py-2.5 hover:bg-[#b8966a] transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-text-muted hover:text-text-main transition-colors px-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
