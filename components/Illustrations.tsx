/*
 * Flat brand illustrations. Palette is locked to the brand book:
 * #0A0A0A ink, #A3FF00 lime, #FFFFFF white, grays for support.
 * Animations touch transform/opacity only.
 */

const anim = `
  @keyframes il-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes il-rise { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes il-drift { 0% { transform: translateX(0); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateX(150px); opacity: 0; } }
  @keyframes il-drop { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(120px); opacity: 0; } }
  @keyframes il-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.12); } }
  @keyframes il-wave { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }
  @keyframes il-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
`;

/** HERO: a climber plants the lime flag on top of seven rising levels. */
export function HeroIllustration() {
  return (
    <svg viewBox="0 0 640 500" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A person climbs seven rising levels and plants a flag at the top while leads flow in" className="w-full h-auto">
      <style>{anim}</style>

      {/* rising dashed trajectory */}
      <path d="M40 420 C 180 400, 300 300, 560 96" stroke="#A3FF00" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.7" />

      {/* seven stepped levels */}
      {[
        { x: 60, h: 56 }, { x: 128, h: 96 }, { x: 196, h: 136 }, { x: 264, h: 180 },
        { x: 332, h: 226 }, { x: 400, h: 276 }, { x: 468, h: 330 },
      ].map((s, i) => (
        <g key={i} style={{ animation: `il-rise 0.7s cubic-bezier(0.22,1,0.36,1) ${0.12 + i * 0.09}s both` }}>
          <rect x={s.x} y={444 - s.h} width="62" height={s.h} rx="6" fill={i === 6 ? "#141414" : "#141414"} stroke="#3A3A3A" strokeWidth="2" />
          {/* one lit window per level */}
          <rect x={s.x + 14} y={458 - s.h} width="12" height="12" rx="2" fill="#A3FF00" />
          <rect x={s.x + 34} y={458 - s.h} width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />
          {i > 2 && <rect x={s.x + 14} y={480 - s.h} width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />}
          {i > 2 && <rect x={s.x + 34} y={480 - s.h} width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />}
        </g>
      ))}

      {/* tilted lime cap on the seventh level, the logo motif */}
      <g style={{ animation: "il-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.85s both" }}>
        <rect x="466" y="88" width="70" height="34" rx="4" fill="#1E1E1E" transform="rotate(-4 501 105)" />
        <rect x="472" y="82" width="70" height="34" rx="4" fill="#A3FF00" transform="rotate(-4 507 99)" />
        <text x="500" y="108" fill="#0A0A0A" fontSize="26" fontWeight="700" fontFamily="var(--font-display), sans-serif" transform="rotate(-4 507 99)">7</text>
      </g>

      {/* the climber, planted on top */}
      <g style={{ animation: "il-float 4s ease-in-out 1.4s infinite" }}>
        {/* flag */}
        <g style={{ transformOrigin: "586px 60px", animation: "il-wave 3.2s ease-in-out 1.6s infinite" }}>
          <line x1="586" y1="62" x2="586" y2="14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M586 16 L622 26 L586 38 Z" fill="#A3FF00" />
        </g>
        {/* body */}
        <path d="M562 46 q8 -16 20 -8 l4 24 q-14 8 -24 0 Z" fill="#FFFFFF" />
        <circle cx="566" cy="30" r="11" fill="#FFFFFF" />
        {/* eye */}
        <circle cx="570" cy="28" r="1.8" fill="#0A0A0A" style={{ animation: "il-blink 4.5s linear infinite", transformOrigin: "570px 28px" }} />
        {/* arm holding the flag */}
        <path d="M578 44 Q584 50 586 56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* legs */}
        <path d="M566 62 L560 76 M574 62 L580 76" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* ledge under the climber */}
      <rect x="544" y="76" width="62" height="10" rx="4" fill="#A3FF00" />
      <rect x="548" y="86" width="54" height="240" rx="6" fill="#141414" stroke="#3A3A3A" strokeWidth="2" />
      <rect x="560" y="100" width="12" height="12" rx="2" fill="#A3FF00" style={{ animation: "il-pulse 2.8s ease-in-out infinite", transformOrigin: "566px 106px" }} />
      <rect x="580" y="100" width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />
      <rect x="560" y="122" width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />
      <rect x="580" y="122" width="12" height="12" rx="2" fill="none" stroke="#3A3A3A" strokeWidth="2" />

      {/* leads drifting toward the levels */}
      <circle cx="14" cy="380" r="5" fill="#A3FF00" style={{ animation: "il-drift 3.4s ease-in-out 1.2s infinite" }} />
      <circle cx="14" cy="404" r="3.5" fill="#A3FF00" opacity="0.7" style={{ animation: "il-drift 3.4s ease-in-out 2s infinite" }} />
      <circle cx="14" cy="358" r="2.5" fill="#A3FF00" opacity="0.5" style={{ animation: "il-drift 3.4s ease-in-out 2.7s infinite" }} />

      {/* ground */}
      <line x1="20" y1="444" x2="620" y2="444" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** METHOD 1: the filter. Many dots enter the funnel, only lime ones reach the pipeline. */
export function FilterIllustration() {
  return (
    <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A funnel filters a crowd of leads so only qualified ones reach the pipeline" className="w-full h-auto">
      <style>{anim}</style>

      {/* incoming crowd of dots */}
      {[
        { x: 80, y: 40, f: "#A3FF00", d: 0 }, { x: 130, y: 24, f: "#C9C9C9", d: 0.5 },
        { x: 180, y: 46, f: "#A3FF00", d: 1 }, { x: 230, y: 22, f: "#C9C9C9", d: 1.5 },
        { x: 280, y: 44, f: "#C9C9C9", d: 2 }, { x: 330, y: 30, f: "#A3FF00", d: 2.5 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="9" fill={p.f} style={{ animation: `il-drop 3.2s ease-in 0.${i * 4}s infinite` }} />
      ))}

      {/* funnel */}
      <path d="M60 90 L380 90 L250 210 L250 268 L190 268 L190 210 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 90 L380 90 L360 110 L80 110 Z" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="4" strokeLinejoin="round" />

      {/* rejected dots bouncing off */}
      <circle cx="52" cy="150" r="7" fill="#C9C9C9" />
      <path d="M64 140 Q46 132 40 156" stroke="#C9C9C9" strokeWidth="2" strokeDasharray="3 5" fill="none" />
      <circle cx="392" cy="158" r="7" fill="#C9C9C9" />
      <path d="M378 144 Q396 138 400 164" stroke="#C9C9C9" strokeWidth="2" strokeDasharray="3 5" fill="none" />

      {/* qualified dots exiting */}
      <circle cx="220" cy="290" r="8" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="3" style={{ animation: "il-pulse 2s ease-in-out infinite", transformOrigin: "220px 290px" }} />

      {/* pipeline tray */}
      <rect x="150" y="312" width="140" height="26" rx="13" fill="#0A0A0A" />
      <circle cx="180" cy="325" r="7" fill="#A3FF00" />
      <circle cx="210" cy="325" r="7" fill="#A3FF00" />
      <circle cx="240" cy="325" r="7" fill="#A3FF00" />

      {/* inspector character with magnifier */}
      <g style={{ animation: "il-float 3.6s ease-in-out infinite" }}>
        <circle cx="368" cy="228" r="16" fill="#0A0A0A" />
        <circle cx="373" cy="224" r="2.5" fill="#FFFFFF" style={{ animation: "il-blink 5s linear infinite", transformOrigin: "373px 224px" }} />
        <path d="M356 244 q12 -8 26 0 l4 34 q-18 8 -34 0 Z" fill="#0A0A0A" />
        {/* magnifier over the funnel exit */}
        <circle cx="322" cy="258" r="17" stroke="#0A0A0A" strokeWidth="5" fill="rgba(163,255,0,0.18)" />
        <line x1="334" y1="271" x2="348" y2="284" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** METHOD 2: the after-lead journey. Messages warm a lead until the meter hits lime. */
export function WarmingIllustration() {
  return (
    <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Automated messages warm up a lead, shown as a rising trust meter" className="w-full h-auto">
      <style>{anim}</style>

      {/* phone */}
      <rect x="64" y="44" width="176" height="280" rx="24" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
      <rect x="128" y="58" width="48" height="8" rx="4" fill="#0A0A0A" />

      {/* chat bubbles, staggered */}
      <g style={{ animation: "il-rise 0.6s ease-out 0.2s both" }}>
        <rect x="84" y="90" width="104" height="30" rx="12" fill="#0A0A0A" />
        <rect x="96" y="102" width="66" height="6" rx="3" fill="#5C5C5C" />
      </g>
      <g style={{ animation: "il-rise 0.6s ease-out 0.7s both" }}>
        <rect x="118" y="132" width="104" height="30" rx="12" fill="#A3FF00" />
        <rect x="130" y="144" width="66" height="6" rx="3" fill="#0A0A0A" opacity="0.5" />
      </g>
      <g style={{ animation: "il-rise 0.6s ease-out 1.2s both" }}>
        <rect x="84" y="174" width="88" height="30" rx="12" fill="#0A0A0A" />
        <rect x="96" y="186" width="52" height="6" rx="3" fill="#5C5C5C" />
      </g>
      <g style={{ animation: "il-rise 0.6s ease-out 1.7s both" }}>
        <rect x="110" y="216" width="112" height="30" rx="12" fill="#A3FF00" />
        <rect x="122" y="228" width="72" height="6" rx="3" fill="#0A0A0A" opacity="0.5" />
      </g>
      {/* typing dots */}
      <g>
        <circle cx="100" cy="276" r="4" fill="#C9C9C9" style={{ animation: "il-pulse 1.2s ease-in-out 0s infinite", transformOrigin: "100px 276px" }} />
        <circle cx="114" cy="276" r="4" fill="#C9C9C9" style={{ animation: "il-pulse 1.2s ease-in-out 0.2s infinite", transformOrigin: "114px 276px" }} />
        <circle cx="128" cy="276" r="4" fill="#C9C9C9" style={{ animation: "il-pulse 1.2s ease-in-out 0.4s infinite", transformOrigin: "128px 276px" }} />
      </g>

      {/* trust thermometer */}
      <rect x="292" y="70" width="36" height="200" rx="18" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
      <rect x="300" y="150" width="20" height="112" rx="10" fill="#A3FF00" />
      <circle cx="310" cy="286" r="26" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="4" />
      {/* degree ticks */}
      <line x1="336" y1="100" x2="348" y2="100" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
      <line x1="336" y1="150" x2="348" y2="150" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
      <line x1="336" y1="200" x2="348" y2="200" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />

      {/* the warmed lead, happy face */}
      <g style={{ animation: "il-float 3.4s ease-in-out infinite" }}>
        <circle cx="388" cy="190" r="24" fill="#0A0A0A" />
        <circle cx="380" cy="184" r="3" fill="#FFFFFF" style={{ animation: "il-blink 4.2s linear infinite", transformOrigin: "380px 184px" }} />
        <circle cx="396" cy="184" r="3" fill="#FFFFFF" style={{ animation: "il-blink 4.2s linear infinite", transformOrigin: "396px 184px" }} />
        <path d="M378 198 Q388 206 398 198" stroke="#A3FF00" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/** METHOD 3: ROI. One coin in, a growing stack out. */
export function RoiIllustration() {
  return (
    <svg viewBox="0 0 440 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One coin invested returns a growing stack of coins" className="w-full h-auto">
      <style>{anim}</style>

      {/* loop arrow */}
      <path d="M110 120 A 120 120 0 0 1 330 120" stroke="#0A0A0A" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" fill="none" />
      <path d="M322 100 L336 122 L308 126 Z" fill="#0A0A0A" />

      {/* coin going in */}
      <g style={{ animation: "il-float 3s ease-in-out infinite" }}>
        <circle cx="88" cy="160" r="34" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
        <text x="88" y="172" textAnchor="middle" fill="#0A0A0A" fontSize="32" fontWeight="700" fontFamily="var(--font-display), sans-serif">1</text>
      </g>
      <rect x="46" y="216" width="84" height="14" rx="7" fill="#0A0A0A" />

      {/* multiplier chips */}
      <g style={{ animation: "il-rise 0.6s ease-out 0.4s both" }}>
        <rect x="196" y="52" width="56" height="30" rx="15" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="3" transform="rotate(-4 224 67)" />
        <text x="224" y="74" textAnchor="middle" fill="#0A0A0A" fontSize="17" fontWeight="700" fontFamily="var(--font-body), sans-serif" transform="rotate(-4 224 67)">x3</text>
      </g>
      <g style={{ animation: "il-rise 0.6s ease-out 0.8s both" }}>
        <rect x="262" y="40" width="64" height="30" rx="15" fill="#0A0A0A" transform="rotate(3 294 55)" />
        <text x="294" y="61" textAnchor="middle" fill="#A3FF00" fontSize="17" fontWeight="700" fontFamily="var(--font-body), sans-serif" transform="rotate(3 294 55)">x12</text>
      </g>

      {/* returned stack of coins */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} style={{ animation: `il-rise 0.5s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.14}s both` }}>
          <rect x={300} y={288 - i * 26} width="96" height="22" rx="11" fill={i % 2 ? "#A3FF00" : "#FFFFFF"} stroke="#0A0A0A" strokeWidth="3.5" />
        </g>
      ))}
      <rect x="280" y="314" width="136" height="14" rx="7" fill="#0A0A0A" />

      {/* the owner, arms up */}
      <g style={{ animation: "il-float 3.6s ease-in-out 0.4s infinite" }}>
        <circle cx="222" cy="220" r="17" fill="#0A0A0A" />
        <circle cx="217" cy="216" r="2.5" fill="#FFFFFF" style={{ animation: "il-blink 4.8s linear infinite", transformOrigin: "217px 216px" }} />
        <circle cx="228" cy="216" r="2.5" fill="#FFFFFF" style={{ animation: "il-blink 4.8s linear infinite", transformOrigin: "228px 216px" }} />
        <path d="M215 229 Q222 234 229 229" stroke="#A3FF00" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M210 240 q12 -6 26 0 l3 46 q-16 7 -32 0 Z" fill="#0A0A0A" />
        <path d="M208 246 Q192 234 186 218" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M238 246 Q254 234 260 218" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      <line x1="60" y1="330" x2="260" y2="330" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
    </svg>
  );
}

/** Small: megaphone for the agency engine. */
export function AgencyGlyph() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-20 h-20">
      <rect x="10" y="16" width="60" height="34" rx="4" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="4" transform="rotate(-4 40 33)" />
      <rect x="16" y="22" width="60" height="34" rx="4" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" transform="rotate(-4 46 39)" />
      <path d="M28 40 L52 34 M28 48 L46 44" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" transform="rotate(-4 46 39)" />
      <path d="M58 60 L84 46 L84 86 L58 74 Z" fill="#0A0A0A" />
      <rect x="46" y="60" width="14" height="16" rx="3" fill="#0A0A0A" />
      <path d="M88 56 L94 52 M88 66 L96 66 M88 76 L94 80" stroke="#A3FF00" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Small: stacked product blocks for the software engine. */
export function SoftwareGlyph() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-20 h-20">
      <rect x="14" y="58" width="68" height="24" rx="5" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="4" />
      <rect x="22" y="34" width="52" height="24" rx="5" fill="#A3FF00" stroke="#0A0A0A" strokeWidth="4" transform="rotate(-3 48 46)" />
      <rect x="32" y="12" width="34" height="22" rx="5" fill="#0A0A0A" transform="rotate(2 49 23)" />
      <circle cx="26" cy="70" r="3.5" fill="#A3FF00" />
      <circle cx="38" cy="70" r="3.5" fill="#0A0A0A" />
    </svg>
  );
}
