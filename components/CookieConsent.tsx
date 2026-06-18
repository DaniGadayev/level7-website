"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  readConsent,
  writeConsent,
  consentDecisionNeeded,
  DENY_ALL,
  GRANT_ALL,
  OPEN_PREFERENCES_EVENT,
} from "@/lib/consent";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Decide whether to show on first paint, and wire the "Cookie settings" link.
  useEffect(() => {
    if (consentDecisionNeeded()) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  const close = () => {
    setOpen(false);
    setShowPrefs(false);
  };

  const acceptAll = () => {
    writeConsent(GRANT_ALL);
    close();
  };
  const rejectAll = () => {
    writeConsent(DENY_ALL);
    close();
  };
  const saveChoices = () => {
    writeConsent({ necessary: true, analytics, marketing });
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed z-[60] bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md"
        >
          <div
            className="bg-white border border-[#E5E5E5] rounded-2xl p-6 md:p-7"
            style={{
              boxShadow:
                "0 1px 2px rgba(16,24,16,0.04), 0 24px 48px -12px rgba(16,24,16,0.18), 0 0 0 4px rgba(163,255,0,0.06)",
            }}
          >
            {/* Accent tick */}
            <div className="w-9 h-1 rounded-full bg-accent mb-5" />

            {!showPrefs ? (
              <>
                <h2 className="font-satoshi font-bold text-lg text-[#1A1A1A] mb-2 tracking-[-0.01em]">
                  We value your privacy
                </h2>
                <p className="text-sm leading-relaxed text-[#6B6B6B] mb-5">
                  We use a strictly-necessary cookie to run this site. With your
                  consent, we’d also use analytics to understand how it’s used.
                  Nothing non-essential loads until you choose. See our{" "}
                  <Link
                    href="/privacy#cookies"
                    className="text-[#1A1A1A] underline decoration-accent decoration-2 underline-offset-2 hover:text-accent transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
                <div className="flex flex-col gap-2.5">
                  <button onClick={acceptAll} className="btn-primary w-full">
                    Accept all
                  </button>
                  <div className="flex gap-2.5">
                    <button
                      onClick={rejectAll}
                      className="btn-ghost flex-1 !py-3 !text-sm"
                    >
                      Reject all
                    </button>
                    <button
                      onClick={() => setShowPrefs(true)}
                      className="btn-ghost flex-1 !py-3 !text-sm !border-[#E5E5E5]"
                    >
                      Customise
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-satoshi font-bold text-lg text-[#1A1A1A] mb-1 tracking-[-0.01em]">
                  Cookie preferences
                </h2>
                <p className="text-sm leading-relaxed text-[#6B6B6B] mb-5">
                  Choose which cookies we may use. You can change this anytime
                  via “Cookie settings” in the footer.
                </p>

                <div className="flex flex-col divide-y divide-[#E5E5E5] mb-6">
                  <ToggleRow
                    title="Strictly necessary"
                    desc="Required for the site to work and to remember your choice. Always on."
                    checked
                    disabled
                  />
                  <ToggleRow
                    title="Analytics"
                    desc="Helps us understand usage so we can improve the site."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ToggleRow
                    title="Marketing"
                    desc="Used to measure campaigns. Off unless you enable it."
                    checked={marketing}
                    onChange={setMarketing}
                  />
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={saveChoices}
                    className="btn-primary flex-1 !py-3 !text-sm"
                  >
                    Save choices
                  </button>
                  <button
                    onClick={acceptAll}
                    className="btn-ghost flex-1 !py-3 !text-sm !border-[#E5E5E5]"
                  >
                    Accept all
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
        <p className="text-xs leading-relaxed text-[#6B6B6B] mt-0.5">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? "bg-accent" : "bg-[#E5E5E5]"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
