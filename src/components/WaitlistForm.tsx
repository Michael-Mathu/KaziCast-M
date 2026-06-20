"use client";

import React, { useState } from 'react';

type Role = "Talent (Actor/Crew)" | "Director/Producer" | "Just curious";

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role | "">("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role: role || undefined }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center justify-center p-8 min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        <h3 className="text-2xl text-text-main mb-2 font-bold">You&apos;re on the list.</h3>
        <p className="text-text-muted leading-relaxed max-w-[320px]">
          We&apos;ll be in touch before anyone else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="block text-sm font-semibold text-text-main">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Optional"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-text-main">Email</label>
        <input
          id="email"
          type="email"
          required
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 relative">
        <label htmlFor="role" className="block text-sm font-semibold text-text-main">Role</label>
        <select
          id="role"
          className="input-field appearance-none cursor-pointer pr-10 bg-surface"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="" disabled>Select your role (Optional)</option>
          <option value="Talent (Actor/Crew)">Talent (Actor/Crew)</option>
          <option value="Director/Producer">Director/Producer</option>
          <option value="Just curious">Just curious</option>
        </select>
        <div className="absolute right-4 bottom-4 pointer-events-none text-text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </div>
      </div>

      {status === 'error' && (
        <div className="text-sm border border-danger bg-[#FCE8E6] text-danger p-3 rounded-md mt-2">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary mt-4 self-end"
      >
        {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
      </button>
    </form>
  );
}
