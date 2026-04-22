"use client";

import React, { useState } from 'react';

const LOCATIONS = [
  "Nairobi", "Mombasa", "Kampala", "Dar es Salaam", "Kigali", "Other East Africa", "Outside East Africa"
];

export default function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Talent',
    location: 'Nairobi'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder FORM_URL and entry IDs
    const FORM_URL = `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`;
    
    const body = new FormData();
    body.append('entry.111111111', formData.name);       // Full Name
    body.append('entry.222222222', formData.email);      // Email
    body.append('entry.333333333', formData.role);       // Joining as
    body.append('entry.444444444', formData.location);   // Based in

    // For now, we just log and set submitted
    console.log("Submitting to Google Forms:", formData);

    try {
      // await fetch(FORM_URL, {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   body,
      // });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  return (
    <section id="waitlist" className="px-6 md:px-12 py-32 md:py-48 bg-near-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="max-w-xl">
          <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1.1] tracking-tight text-warm-white mb-10">
            Be part of <span className="italic">building</span> what East Africa's film industry needs.
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            KaziCast is in active development. The waitlist gets you early access, a founding member profile, and a direct line to the team building this. We're starting in Nairobi. We want the right people in the room first.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-10 md:p-16 relative overflow-hidden min-h-[600px] flex flex-col">
          {!submitted ? (
            <div className="flex flex-col gap-10 relative z-10 flex-grow">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-accent/50 transition-colors text-warm-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-accent/50 transition-colors text-warm-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">I am joining as</label>
                  <div className="grid grid-cols-2 gap-0 border border-white/10">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, role: 'Talent'})}
                      className={`py-4 font-bold text-xs uppercase tracking-widest transition-all ${formData.role === 'Talent' ? 'bg-warm-white text-near-black' : 'text-muted hover:text-white'}`}
                    >
                      Talent
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, role: 'Director'})}
                      className={`py-4 font-bold text-xs uppercase tracking-widest transition-all ${formData.role === 'Director' ? 'bg-warm-white text-near-black' : 'text-muted hover:text-white'}`}
                    >
                      Director
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Where are you based?</label>
                  <select 
                    className="bg-black/40 border border-white/10 px-6 py-4 outline-none focus:border-accent/50 transition-colors text-warm-white appearance-none"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                <button 
                  type="submit"
                  className="bg-accent text-near-black px-8 py-5 font-bold uppercase tracking-tight hover:brightness-110 transition-all text-sm mt-4"
                >
                  Secure My Spot →
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center text-center justify-center flex-grow relative z-10">
              <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center text-accent mb-4 animate-scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
              </div>
              <h3 className="font-serif text-3xl text-warm-white animate-fade-up" style={{ animationDelay: '100ms' }}>You're on the list.</h3>
              <p className="text-muted leading-relaxed max-w-[280px] animate-fade-up" style={{ animationDelay: '200ms' }}>
                KaziCast is being built with you in mind — we'll be in touch before anyone else.
              </p>
            </div>
          )}
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <style jsx>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .animate-fade-up { opacity: 0; animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          `}</style>
        </div>
      </div>
    </section>
  );
}
