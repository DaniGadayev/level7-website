"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  readConsent,
  CONSENT_CHANGE_EVENT,
  type StoredConsent,
} from "@/lib/consent";

/**
 * Loads analytics / marketing tags ONLY after the visitor has granted the
 * matching consent category. Nothing here renders — and therefore no network
 * call fires — until both (a) the relevant env id is configured and (b) the
 * visitor has opted in. Enabling analytics later is just setting the env var;
 * no code change needed.
 *
 *   NEXT_PUBLIC_GA_ID         — Google Analytics 4 measurement id (G-XXXXXXX)
 *   NEXT_PUBLIC_META_PIXEL_ID — Meta (Facebook) Pixel id
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function ConsentScripts() {
  const [consent, setConsent] = useState<StoredConsent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<StoredConsent>).detail;
      setConsent(detail ?? readConsent());
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  const analyticsOn = !!consent?.analytics && !!GA_ID;
  const marketingOn = !!consent?.marketing && !!META_PIXEL_ID;

  return (
    <>
      {analyticsOn && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', { analytics_storage: 'granted' });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {marketingOn && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
