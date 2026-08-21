"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Ticks } from "@/components/Hud";
import { HudOverlay } from "@/components/Scrolly";

export type Posting = {
  id: number;
  slug: string;
  title: string;
  description: string;
  employment_type: string | null;
  location_type: string | null;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

function ApplyForm({ posting }: { posting: Posting }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot, must stay empty
  const [resume, setResume] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("Please agree to the Privacy Policy to continue.");
      return;
    }
    if (!resume) {
      setErrorMsg("Please attach your resume (PDF, DOC or DOCX).");
      return;
    }
    if (resume.size > MAX_RESUME_BYTES) {
      setErrorMsg("Your resume must be 5MB or smaller.");
      return;
    }
    setSending(true);
    setErrorMsg(null);
    try {
      const fd = new FormData();
      fd.append("jobPostingId", String(posting.id));
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("message", form.message);
      fd.append("resume", resume);
      fd.append("consent", consent ? "true" : "false");
      fd.append("company", company);

      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit your application");
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-8 border-t border-line pt-8 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-ink text-xl mx-auto mb-5">
          ✓
        </div>
        <h4 className="text-xl font-bold text-ink mb-2">Application received.</h4>
        <p className="text-muted text-sm max-w-md mx-auto">
          Thanks for applying. We review every application and will get back to you at{" "}
          <span className="text-ink font-medium">{form.email}</span> if there is a fit.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-line pt-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label mb-2 block">
            Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="label mb-2 block">
            Email <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label mb-2 block">
            Phone{" "}
            <span className="normal-case tracking-normal text-[11px] text-subtle">(optional)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
            placeholder="+1 (000) 000-0000"
          />
        </div>
        <div>
          <label className="label mb-2 block">
            Resume <span className="text-accent">*</span>
          </label>
          <label className="block cursor-pointer">
            <input
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] ?? null)}
              className="peer sr-only"
            />
            <span className="input-field flex items-center justify-between gap-3 border-dashed transition-colors hover:border-ink peer-focus-visible:border-ink">
              <span className={`truncate ${resume ? "text-ink font-medium" : "text-faint"}`}>
                {resume ? resume.name : "Attach your resume"}
              </span>
              <span className="shrink-0 text-xs font-semibold bg-accent text-ink px-3 py-1.5 rounded-md">
                {resume ? "Replace" : "Browse"}
              </span>
            </span>
          </label>
          <p className="text-[11px] text-faint mt-1.5">PDF, DOC or DOCX. 5MB max.</p>
        </div>
      </div>

      <div>
        <label className="label mb-2 block">
          Message{" "}
          <span className="normal-case tracking-normal text-[11px] text-subtle">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-field resize-none"
          placeholder="Anything you want us to know: relevant experience, availability, or the most interesting production bug you have fixed."
        />
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#A3FF00] cursor-pointer"
        />
        <span className="text-xs leading-relaxed text-muted">
          I agree that my details and resume may be used to assess my application, in
          line with the{" "}
          <Link
            href="/privacy"
            className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:text-accent transition-colors"
          >
            Privacy Policy
          </Link>
          . <span className="text-accent">*</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Submitting..." : "Submit Application"}
        {!sending && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      {errorMsg && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function PostingCard({ posting, index }: { posting: Posting; index: number }) {
  const [applyOpen, setApplyOpen] = useState(false);
  const paragraphs = posting.description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Ticks className="panel hot p-8 md:p-10">
        <p className="mono mb-5">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> Open position
        </p>
        <h2 className="display text-3xl md:text-4xl mb-5">{posting.title}</h2>
        {(posting.employment_type || posting.location_type) && (
          <div className="flex flex-wrap gap-2 -mt-2 mb-6">
            {posting.employment_type && (
              <span className="text-[11px] font-bold uppercase tracking-wider bg-accent text-ink px-2.5 py-1 rounded-full">
                {posting.employment_type}
              </span>
            )}
            {posting.location_type && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted bg-panel2 border border-line px-2.5 py-1 rounded-full">
                {posting.location_type}
              </span>
            )}
          </div>
        )}
        <div className="space-y-4 max-w-3xl">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-muted leading-relaxed text-[15px] whitespace-pre-wrap">
              {p}
            </p>
          ))}
        </div>

        {!applyOpen ? (
          <button
            type="button"
            onClick={() => setApplyOpen(true)}
            className="btn-primary mt-8"
          >
            Apply for this role
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        ) : (
          <ApplyForm posting={posting} />
        )}
      </Ticks>
    </motion.article>
  );
}

export default function CareersContent({ postings }: { postings: Posting[] }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <HudOverlay />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="relative max-w-7xl mx-auto px-6"
        >
          <motion.p custom={0} variants={fadeUp} className="label mb-6">
            <span className="text-accent">CRS</span> Careers
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} className="display text-hero mb-8 max-w-5xl">
            Work on things that <span className="tilt-chip">have to work</span>.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
          >
            LEVEL7 builds marketing that proves itself and the software behind it,
            including Bob, our AI employee for small businesses. Small team, real
            production systems, no busywork.
          </motion.p>
        </motion.div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* ── OPEN POSITIONS ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {postings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="panel p-12 md:p-16 text-center max-w-2xl mx-auto"
            >
              <p className="mono mb-5">
                <span className="text-accent">00</span> Open positions
              </p>
              <h2 className="display text-4xl mb-4">No open positions right now.</h2>
              <p className="text-muted leading-relaxed max-w-md mx-auto">
                We are not hiring at the moment, but that changes as we grow. Check
                back soon, or reach out through the{" "}
                <Link
                  href="/contact"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:text-accent transition-colors"
                >
                  contact page
                </Link>{" "}
                if you think we should know about you anyway.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {postings.map((p, i) => (
                <PostingCard key={p.id} posting={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
