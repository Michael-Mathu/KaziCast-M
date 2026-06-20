"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  category: "talent" | "director" | "safety" | "billing";
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  // Talent FAQs
  {
    id: "t-1",
    category: "talent",
    question: "How do I apply for a casting call?",
    answer: (
      <p>
        To apply for a casting, log in to your account, go to the <strong>Active Castings</strong> page, select the casting call you are interested in, write a brief cover message/audition pitch, and click <strong>Quick Apply</strong>. Your stage name, bio, headshot, and portfolio links will be shared with the casting director instantly.
      </p>
    ),
  },
  {
    id: "t-2",
    category: "talent",
    question: "What makes a good casting profile?",
    answer: (
      <p>
        Casting directors look for clear, professional headshots and a detailed, up-to-date portfolio. Make sure to paste a link to a high-quality headshot URL (e.g. from Google Drive or Dropbox) so it renders correctly, write a clear professional bio, and list your previous works (including film names, character types, and production years) under the profile edit page.
      </p>
    ),
  },
  {
    id: "t-3",
    category: "talent",
    question: "How do I know if my application was viewed or accepted?",
    answer: (
      <p>
        You can track the status of all your applications in your <strong>Submissions Dashboard</strong>. Statuses include <strong>Pending</strong> (received), <strong>Shortlisted</strong> (under consideration), and <strong>Accepted</strong> or <strong>Rejected</strong>. You will also receive email notifications for status updates.
      </p>
    ),
  },
  // Director FAQs
  {
    id: "d-1",
    category: "director",
    question: "How do I post a new casting call?",
    answer: (
      <p>
        Log in to your Director account and navigate to <strong>My Castings</strong>. Click on <strong>Post a Casting</strong>. Enter all production details including the role description, location (e.g. Nairobi, Mombasa), rate (e.g. daily or flat fee), role type (Lead, Supporting, Background, etc.), and the application deadline. Once saved, it will immediately appear on the active listings.
      </p>
    ),
  },
  {
    id: "d-2",
    category: "director",
    question: "How do I review talent applications?",
    answer: (
      <p>
        Go to <strong>My Castings</strong> in your dashboard and select the casting call you want to review. Click <strong>Review Applications</strong> to see the list of applicants. You can click on any actor's name to view their full profile, headshots, consents, and previous works, and then update their application status to Shortlisted, Accepted, or Rejected.
      </p>
    ),
  },
  {
    id: "d-3",
    category: "director",
    question: "Can I contact actors directly outside the platform?",
    answer: (
      <p>
        Once you shortlist or accept an actor's application, their verified contact details will be shared with you. Please review our <a href="/legal/community" className="text-accent underline font-semibold">Community Guidelines</a> for standards of professional communication and safe audition practices.
      </p>
    ),
  },
  // Safety FAQs
  {
    id: "s-1",
    category: "safety",
    question: "How does KaziCast protect me against harassment (Casting Couch)?",
    answer: (
      <div>
        <p className="mb-2">
          KaziCast has a zero-tolerance policy for harassment and exploitation. We protect actors by:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-text-muted">
          <li>Verifying directors' accounts and production legitimacy before allowing them to post.</li>
          <li>Forbidding auditions in private residences. All auditions must be in professional, public, or studio spaces.</li>
          <li>Ensuring actors are allowed to bring a companion or chaperone to auditions.</li>
          <li>Providing a confidential reporting system. If you experience harassment, contact <strong>safety@kazicast.com</strong> immediately.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "s-2",
    category: "safety",
    question: "What is the Public Consent Record and why is it important?",
    answer: (
      <p>
        The Public Consent Record is a unique KaziCast feature that logs your data and likeness consent settings (including AI training opt-outs) in a public, auditable register. This prevents directors or production houses from using your headshots or performance clips in AI modeling, marketing, or productions without your explicit, timestamped consent.
      </p>
    ),
  },
  {
    id: "s-3",
    category: "safety",
    question: "What are my rights under the Kenya Data Protection Act 2019?",
    answer: (
      <p>
        Under the Kenya DPA, you have the right to access a copy of all personal data we hold about you, correct inaccuracies, withdraw your consent (such as for public visibility), and request complete erasure of your data. You can exercise these rights by contacting our Data Protection Officer at <strong>dpo@kazicast.com</strong>.
      </p>
    ),
  },
  // Billing/Payments FAQs
  {
    id: "b-1",
    category: "billing",
    question: "Are there any fees to use KaziCast?",
    answer: (
      <p>
        KaziCast is completely <strong>free</strong> for talent to create a profile, upload headshots/portfolios, and apply for castings. Directors can also list casting calls for free during our beta phase. Any changes to our pricing structure will be communicated at least 30 days in advance.
      </p>
    ),
  },
  {
    id: "b-2",
    category: "billing",
    question: "How are actor payments handled for roles?",
    answer: (
      <p>
        Payments are negotiated and paid directly between the production company (directors) and the actor. KaziCast is a casting platform and does not handle production payroll. We encourage all actors to sign a written contract specifying rates (such as daily M-Pesa or bank transfer payouts) before filming begins.
      </p>
    ),
  },
  {
    id: "b-3",
    category: "billing",
    question: "Who do I contact if I have account issues?",
    answer: (
      <p>
        For password resets, account deletion, or technical glitches, send an email to <strong>support@kazicast.com</strong> with your registered email and username. Our Nairobi support team will resolve it within 24 hours.
      </p>
    ),
  },
];

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "talent", label: "🎭 For Talent" },
  { id: "director", label: "🎬 For Directors" },
  { id: "safety", label: "🛡️ Safety & Trust" },
  { id: "billing", label: "💳 Payments & Accounts" },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      search === "" ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      (typeof faq.answer === "string" && faq.answer.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-text-main tracking-tight">
          How can we help you?
        </h1>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          Find answers to common questions about profiles, casting applications, safety guidelines, and user rights in Kenya.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto pt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="input-field pr-10 pl-4 py-3 shadow-sm"
          />
          <div className="absolute right-3 top-7 text-text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setExpandedId(null);
            }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all rounded-lg ${
              activeCategory === cat.id
                ? "bg-accent/10 border-accent text-accent"
                : "border-border text-text-muted hover:border-text-main hover:text-text-main"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`card border transition-all ${
                  isExpanded ? "border-accent shadow-sm" : "border-border hover:border-text-muted"
                }`}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-text-main text-base md:text-lg">
                    {faq.question}
                  </span>
                  <span className={`text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-border/50 text-sm text-text-muted leading-relaxed animate-fade-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 px-6 border border-dashed border-border bg-surface rounded-2xl max-w-md mx-auto my-4 animate-fade-up">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main mb-1">
              No articles found
            </h3>
            <p className="text-sm text-text-muted mb-6">
              We couldn't find any articles matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="btn-outline text-xs px-4 py-2 hover:border-accent hover:text-accent transition-colors rounded-lg font-semibold uppercase tracking-widest cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
