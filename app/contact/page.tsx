"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Contact Hero SVG — 280×280
   Envelope opening + message emerging
───────────────────────────────────────────── */
const SVG_CONTACT_HERO = `<style>
  @keyframes chOpen  { 0%,30%{transform:rotateX(0deg)} 60%,100%{transform:rotateX(-160deg)} }
  @keyframes chRise  { 0%,40%{transform:translateY(0);opacity:0} 70%,100%{transform:translateY(-40px);opacity:1} }
  @keyframes chPulse { 0%,100%{opacity:1;r:4} 50%{opacity:0.3;r:6} }
  @keyframes chDash  { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
  .ch-flap   { transform-origin: 140px 118px; animation: chOpen 3s ease-in-out 0.5s infinite; }
  .ch-letter { animation: chRise 3s ease-out 0.5s infinite; }
  .ch-d1 { animation: chPulse 1.8s ease-in-out infinite; }
  .ch-d2 { animation: chPulse 1.8s ease-in-out .7s infinite; }
  .ch-d3 { animation: chPulse 1.8s ease-in-out 1.4s infinite; }
  .ch-line { stroke-dasharray:200; animation: chDash 1.2s ease-out 0.3s both; }
</style>
<svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Envelope body -->
  <rect x="40" y="118" width="200" height="130" rx="6" stroke="#1A1A1A" stroke-width="1.8" fill="white"/>
  <!-- Bottom fold lines -->
  <line class="ch-line" x1="40" y1="248" x2="140" y2="185" stroke="#E5E5E5" stroke-width="1" stroke-linecap="round"/>
  <line class="ch-line" x1="240" y1="248" x2="140" y2="185" stroke="#E5E5E5" stroke-width="1" stroke-linecap="round" style="animation-delay:.15s"/>
  <!-- Envelope flap -->
  <g class="ch-flap">
    <path d="M40,118 L140,178 L240,118 Z" fill="#F7F7F7" stroke="#1A1A1A" stroke-width="1.8" stroke-linejoin="round"/>
  </g>
  <!-- Letter emerging -->
  <g class="ch-letter">
    <rect x="96" y="60" width="88" height="110" rx="4" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="110" y1="84" x2="170" y2="84" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
    <line x1="110" y1="96" x2="170" y2="96" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
    <line x1="110" y1="108" x2="155" y2="108" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
    <!-- Lime accent line -->
    <rect x="110" y="120" width="60" height="6" rx="2" fill="#A3FF00" opacity="0.85"/>
    <line x1="110" y1="140" x2="150" y2="140" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  </g>
  <!-- Floating dots -->
  <circle class="ch-d1" cx="30"  cy="150" r="4" fill="#A3FF00"/>
  <circle class="ch-d2" cx="252" cy="135" r="3" fill="#A3FF00"/>
  <circle class="ch-d3" cx="140" cy="32"  r="3" fill="#A3FF00"/>
</svg>`;

/* ─────────────────────────────────────────────
   Contact Icon SVG — 120×120
   Chat bubble with typing dots
───────────────────────────────────────────── */
const SVG_CONTACT_ICON = `<style>
  @keyframes ciDot { 0%,60%,100%{transform:translateY(0);opacity:.3} 30%{transform:translateY(-5px);opacity:1} }
  @keyframes ciBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
  .ci-bubble { animation: ciBounce 2.5s ease-in-out infinite; transform-origin: 60px 55px; }
  .ci-t1 { animation: ciDot 1.2s ease-in-out infinite; }
  .ci-t2 { animation: ciDot 1.2s ease-in-out .2s infinite; }
  .ci-t3 { animation: ciDot 1.2s ease-in-out .4s infinite; }
</style>
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="ci-bubble">
    <path d="M15,20 Q15,10 25,10 L95,10 Q105,10 105,20 L105,70 Q105,80 95,80 L45,80 L28,98 L32,80 L25,80 Q15,80 15,70 Z"
          fill="white" stroke="#1A1A1A" stroke-width="1.8" stroke-linejoin="round"/>
    <!-- Typing dots -->
    <circle class="ci-t1" cx="44" cy="45" r="5" fill="#A3FF00"/>
    <circle class="ci-t2" cx="60" cy="45" r="5" fill="#A3FF00"/>
    <circle class="ci-t3" cx="76" cy="45" r="5" fill="#A3FF00"/>
  </g>
</svg>`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContactPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-36 pb-20 border-b border-[#E5E5E5]">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p custom={0} variants={fadeUp} className="label mb-4">
                Get in Touch
              </motion.p>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-bold font-satoshi text-[#1A1A1A] mb-6"
                style={{ fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
              >
                Let&apos;s talk.
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] text-xl leading-relaxed">
                Whether you&apos;re a potential client, partner, or just curious — we&apos;d love to hear from you.
              </motion.p>
            </div>
            <motion.div custom={3} variants={fadeUp} className="hidden lg:flex justify-center">
              <div
                id="illustration-contact-hero"
                style={{ width: 280, height: 280 }}
                dangerouslySetInnerHTML={{ __html: SVG_CONTACT_HERO }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-3xl p-14 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-[#1A1A1A] text-2xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-satoshi text-[#1A1A1A] mb-3">Message sent.</h3>
                <p className="text-[#6B6B6B]">
                  We&apos;ll get back to you at{" "}
                  <span className="text-[#1A1A1A] font-medium">{form.email}</span> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <span className="normal-case tracking-normal text-[11px] text-[#AAAAAA]">(optional)</span>
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
                        Subject <span className="text-accent">*</span>
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input-field appearance-none cursor-pointer"
                      >
                        <option value="">Select subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="partner">Join as Certified Partner</option>
                        <option value="press">Press</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label mb-2 block">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tell us about your business and what you're looking to achieve..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-sm">
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Direct Contact */}
            <div className="card p-6">
              <p className="label mb-5">Direct Contact</p>
              <div className="space-y-4">
                <a href="mailto:Dani@bmf360.co.il" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] flex items-center justify-center text-[#6B6B6B] group-hover:border-accent group-hover:text-accent transition-colors text-sm font-bold">
                    @
                  </div>
                  <div>
                    <div className="text-[10px] label mb-0.5">Email</div>
                    <div className="text-sm text-[#1A1A1A] group-hover:text-accent transition-colors font-medium">
                      Dani@bmf360.co.il
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] flex items-center justify-center text-[#6B6B6B] text-sm font-bold">
                    ↗
                  </div>
                  <div>
                    <div className="text-[10px] label mb-0.5">Website</div>
                    <div className="text-sm text-[#1A1A1A] font-medium">thelevel7.ai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="card p-6">
              <p className="label mb-3">Response Time</p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                We respond to all inquiries within{" "}
                <span className="text-[#1A1A1A] font-semibold">24 hours</span>.
              </p>
            </div>

            {/* Lottie */}
            <div className="flex justify-center py-4">
              <div
                id="illustration-contact-icon"
                style={{ width: 120, height: 120 }}
                dangerouslySetInnerHTML={{ __html: SVG_CONTACT_ICON }}
              />
            </div>

            {/* Legal */}
            <div className="card p-6">
              <p className="label mb-3">Legal Entity</p>
              <p className="text-sm text-[#1A1A1A] font-medium">D.T LEVEL 7 TECHNOLOGY LIMITED</p>
              <p className="text-xs text-[#6B6B6B] mt-1">Registered in Cyprus</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
