"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContactPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

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
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #A3FF00 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
            Get in Touch
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-satoshi mb-6 leading-tight"
          >
            Let's talk<br />
            <span className="text-accent">about your empire.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-text-secondary text-xl max-w-xl">
            Whether you're a potential client, investor, partner, or just curious — we'd love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-accent/20 bg-accent/5 p-12 text-center"
              >
                <div className="text-5xl text-accent mb-4">◆</div>
                <h3 className="text-2xl font-bold font-satoshi mb-3">Message sent.</h3>
                <p className="text-text-secondary">
                  We'll get back to you at <span className="text-white">{form.email}</span> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div custom={0} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div custom={1} variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                      Phone <span className="text-white/20">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      placeholder="+1 (000) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="text-white/40">Select subject...</option>
                      <option value="general">General Inquiry</option>
                      <option value="investor">Investor Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="partner">Join as Certified Partner</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div custom={2} variants={fadeUp}>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                    placeholder="Tell us about your business and what you're looking to achieve..."
                  />
                </motion.div>

                <motion.div custom={3} variants={fadeUp}>
                  <button
                    type="submit"
                    className="w-full bg-accent text-background font-bold py-4 text-sm hover:bg-white transition-colors duration-200 group flex items-center justify-center gap-2"
                  >
                    Send Message
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Direct Contact</p>
              <div className="space-y-4">
                <a
                  href="mailto:Dani@bmf360.co.il"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors">
                    @
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-sm text-white group-hover:text-accent transition-colors">
                      Dani@bmf360.co.il
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-accent">
                    ◆
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-0.5">Website</div>
                    <div className="text-sm text-white">thelevel7.ai</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lime-divider" />

            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Response Time</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                We respond to all inquiries within <span className="text-white">24 hours</span>. For urgent investor matters, mention it in your subject line.
              </p>
            </div>

            <div className="lime-divider" />

            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Looking to Join?</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                We're always looking for certified partners, growth experts, and operators who want to be part of the LEVEL7 network.
              </p>
              <p className="text-sm text-text-secondary">
                Select <span className="text-white">"Join as Certified Partner"</span> in the subject dropdown.
              </p>
            </div>

            <div className="border border-white/5 p-6 bg-white/[0.02]">
              <div className="text-xs uppercase tracking-widest text-accent mb-3">Legal Entity</div>
              <p className="text-sm text-text-secondary">D.T LEVEL 7 TECHNOLOGY LIMITED</p>
              <p className="text-xs text-text-secondary mt-1">Registered in Cyprus</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
