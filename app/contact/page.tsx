"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
              <div id="illustration-contact-hero" className="border-2 border-dashed border-[#D8D8D8] rounded-xl" style={{ width: 280, height: 280 }} />
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
              <div id="illustration-contact-icon" className="border-2 border-dashed border-[#D8D8D8] rounded-xl" style={{ width: 120, height: 120 }} />
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
