"use client";

import { OPEN_PREFERENCES_EVENT } from "@/lib/consent";

/** Footer link that re-opens the cookie preferences panel so visitors can
    withdraw or change consent as easily as they gave it (GDPR requirement). */
export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT))
      }
      className={className}
    >
      Cookie settings
    </button>
  );
}
