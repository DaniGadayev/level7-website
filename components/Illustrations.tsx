/*
 * Brand illustrations, v2 — built on the Lemonade craft system:
 * 1. Depth = three tonal layers (faint background silhouettes, light midground,
 *    fully detailed foreground). 2. One contour weight on the subject; interior
 *    lines thinner. 3. Characters with human proportions in natural poses.
 * 4. Micro-details only in the foreground layer. 5. Lime rationed to a few
 *    accents. 6. Scenes bleed to the edges and sit on a ground line.
 * Limbs use the tube technique: an ink stroke under a paper stroke gives
 * outlined volume with round ends. Animations touch transform/opacity only.
 */

const anim = `
  @keyframes il-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes il-blink { 0%, 93%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.12); } }
  @keyframes il-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
  @keyframes il-drift { 0% { transform: translateX(0); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateX(130px); opacity: 0; } }
  @keyframes il-driftL { 0% { transform: translateX(0); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateX(-130px); opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

/* Light-section palette */
const INK = "#141414";
const LINE_IN = "#3D3D3D"; // interior detail lines
const MID = "#C9C9C4"; // midground strokes
const BACK = "#EBEBE6"; // background silhouettes
const PLANE = "#F2F2ED"; // shaded planes
const PLANE2 = "#E7E7E1"; // darker plane (roofs, sides)
const SHADOW = "#E9E9E3"; // ground blobs
const LIME = "#A3FF00";
const PAPER = "#FFFFFF";

/** Outlined limb with volume: ink underlay + paper overlay, both round-capped. */
function Tube({ d, w = 10, fill = PAPER }: { d: string; w?: number; fill?: string }) {
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w + 5.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

/**
 * Standard head, drawn at origin (0,0 = center of the face circle), facing right.
 * flip=-1 mirrors it to face left. Cropped side-swept hair, ear, blinking eye,
 * brow and a small smile — the whole cast shares one face system.
 */
function Head({ x, y, s = 1, flip = 1 }: { x: number; y: number; s?: number; flip?: 1 | -1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * flip} ${s})`}>
      <circle cx="0" cy="0" r="22" fill={PAPER} stroke={INK} strokeWidth="3" />
      {/* side-swept crop */}
      <path d="M-22 4 Q-24 -20 -2 -23 Q16 -25 21 -10 Q22 -7 21 -3 Q14 -14 2 -13 Q-8 -13 -13 -6 Q-16 -2 -16 6 Q-20 6 -22 4 Z" fill={INK} />
      {/* ear on the far side */}
      <circle cx="-17" cy="5" r="4.5" fill={PAPER} stroke={INK} strokeWidth="2.2" />
      <path d="M-18 4 q2 1 1 3" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* face */}
      <circle cx="12" cy="2" r="2.4" fill={INK} style={{ animation: "il-blink 4.8s linear infinite" }} />
      <path d="M7 -7 q5 -3 9 -0.5" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M12 13 q4 2.5 8 -0.5" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Window with glass highlight — the Lemonade signature detail. */
function Win({ x, y, w = 26, h = 32, stroke = INK, sw = 2 }: { x: number; y: number; w?: number; h?: number; stroke?: string; sw?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={PAPER} stroke={stroke} strokeWidth={sw} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={stroke} strokeWidth={sw * 0.7} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={stroke} strokeWidth={sw * 0.7} />
      <line x1={x + 4} y1={y + h - 5} x2={x + w * 0.45} y2={y + 4} stroke={PLANE2} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

/** Cloud-shaped bush used to ground buildings. */
function Bush({ x, y, s = 1, fill = PLANE }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 24 Q-2 12 8 10 Q10 0 22 2 Q30 -4 38 4 Q48 2 50 12 Q58 14 56 24 Z"
      fill={fill}
      stroke={INK}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO LEFT — "filtered leads walk in". Business owners with
   briefcases, each wearing a lime qualified-badge, queue into the
   LEVEL7 storefront that bleeds off the left edge. A gray dot
   that did not pass rolls away.
────────────────────────────────────────────────────────────── */
export function LeadsInScene() {
  return (
    <svg
      viewBox="0 0 440 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Qualified business owners queue into the LEVEL7 storefront"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      {/* background */}
      <g fill={BACK}>
        <rect x="-10" y="180" width="70" height="340" rx="3" />
        <rect x="310" y="230" width="66" height="290" rx="3" />
        <path d="M250 112 Q256 92 276 96 Q284 82 302 88 Q320 84 324 102 Q338 106 334 118 Z" />
      </g>
      <ellipse cx="220" cy="524" rx="210" ry="13" fill={SHADOW} />

      {/* storefront, cut by the left edge */}
      <g>
        <rect x="-24" y="140" width="164" height="380" rx="3" fill={PAPER} stroke={INK} strokeWidth="3" />
        <line x1="-24" y1="140" x2="146" y2="140" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <Win x={6} y={168} />
        <Win x={58} y={168} />
        <Win x={6} y={226} />
        <Win x={58} y={226} />
        <Win x={6} y={284} />
        <g>
          <rect x="58" y="284" width="26" height="32" rx="2" fill={LIME} stroke={INK} strokeWidth="2" />
          <line x1="71" y1="284" x2="71" y2="316" stroke={INK} strokeWidth="1.5" />
          <line x1="58" y1="300" x2="84" y2="300" stroke={INK} strokeWidth="1.5" />
        </g>
        {/* brick hints */}
        <g stroke={LINE_IN} strokeWidth="1.6" strokeLinecap="round" opacity="0.5">
          <path d="M100 190 h10 M110 196 h10 M100 202 h10" />
          <path d="M10 344 h10 M20 350 h10" />
        </g>
        {/* tilted lime chip on the facade */}
        <g>
          <rect x="96" y="336" width="40" height="22" rx="3" fill={PLANE2} transform="rotate(-5 116 347)" />
          <rect x="100" y="332" width="40" height="22" rx="3" fill={LIME} stroke={INK} strokeWidth="2.4" transform="rotate(-5 120 343)" />
          <text x="115" y="350" fill={INK} fontSize="17" fontFamily="var(--font-display), sans-serif" transform="rotate(-5 120 343)">7</text>
        </g>
        {/* door with awning */}
        <rect x="42" y="404" width="58" height="116" fill={PAPER} stroke={INK} strokeWidth="3" />
        <line x1="71" y1="404" x2="71" y2="520" stroke={INK} strokeWidth="2" />
        <circle cx="64" cy="462" r="2.2" fill={INK} />
        <circle cx="78" cy="462" r="2.2" fill={INK} />
        <path d="M34 404 L108 404 L100 384 L42 384 Z" fill={LIME} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <line x1="52" y1="384" x2="56" y2="404" stroke={INK} strokeWidth="2" />
        <line x1="71" y1="384" x2="71" y2="404" stroke={INK} strokeWidth="2" />
        <line x1="90" y1="384" x2="86" y2="404" stroke={INK} strokeWidth="2" />
      </g>

      {/* dashed lead path into the door */}
      <path
        d="M440 508 C 380 508, 300 507, 240 506 C 190 505, 140 498, 106 484"
        stroke={LIME}
        strokeWidth="2.5"
        strokeDasharray="1 11"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="392" cy="507" r="4.5" fill={LIME} stroke={INK} strokeWidth="2" style={{ animation: "il-driftL 4s ease-in-out 1s infinite" }} />

      {/* one that did not pass, rolling away */}
      <circle cx="404" cy="474" r="8" fill={MID} stroke={INK} strokeWidth="2.4" />
      <path d="M400 456 l8 8 M408 456 l-8 8" stroke={MID} strokeWidth="2.2" strokeLinecap="round" />

      {/* walking lead #1 — briefcase, about to enter */}
      <g>
        {/* qualified badge */}
        <g style={{ animation: "il-float 3.4s ease-in-out infinite" }}>
          <circle cx="200" cy="262" r="11" fill={LIME} stroke={INK} strokeWidth="2.4" />
          <path d="M195 262 l4 4 l7 -8" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* trailing arm behind torso */}
        <Tube d="M200 358 Q210 380 208 400" w={10} />
        {/* legs mid-stride */}
        <Tube d="M188 428 Q180 462 168 496" w={12} />
        <Tube d="M196 428 Q206 460 210 496" w={12} />
        <rect x="150" y="494" width="32" height="12" rx="6" fill={INK} />
        <rect x="202" y="494" width="32" height="12" rx="6" fill={INK} />
        {/* torso */}
        <path d="M178 348 Q182 338 196 338 Q210 338 214 350 L216 412 Q216 428 200 428 L192 428 Q176 428 176 412 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M188 344 q7 5 14 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        <path d="M186 364 Q187 390 184 418" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        {/* briefcase arm, leading */}
        <Tube d="M180 356 Q168 380 164 402" w={10} />
        <circle cx="163" cy="406" r="5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        <rect x="142" y="410" width="40" height="28" rx="5" fill={INK} />
        <path d="M156 410 q6 -8 12 0" stroke={INK} strokeWidth="3" fill="none" />
        <rect x="158" y="420" width="8" height="6" rx="2" fill={LIME} />
        {/* head, facing the door */}
        <g style={{ animation: "il-float 4.6s ease-in-out infinite" }}>
          <path d="M190 330 L192 340 L204 340 L202 328 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={196} y={314} s={0.9} flip={-1} />
        </g>
      </g>

      {/* walking lead #2 — a step behind */}
      <g>
        <g style={{ animation: "il-float 3.4s ease-in-out 0.6s infinite" }}>
          <circle cx="318" cy="272" r="11" fill={LIME} stroke={INK} strokeWidth="2.4" />
          <path d="M313 272 l4 4 l7 -8" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <Tube d="M318 366 Q326 386 324 406" w={10} fill={PLANE} />
        <Tube d="M306 434 Q298 464 288 498" w={12} fill={PLANE} />
        <Tube d="M314 434 Q322 464 326 498" w={12} fill={PLANE} />
        <rect x="270" y="496" width="32" height="12" rx="6" fill={INK} />
        <rect x="318" y="496" width="32" height="12" rx="6" fill={INK} />
        {/* torso, tonal variation */}
        <path d="M296 356 Q300 346 314 346 Q328 346 332 358 L334 420 Q334 434 318 434 L310 434 Q294 434 294 420 Z" fill={PLANE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M304 372 Q305 398 302 426" stroke={LINE_IN} strokeWidth="1.8" fill="none" opacity="0.6" />
        {/* phone in the leading hand, checking the invite */}
        <Tube d="M298 364 Q288 384 284 400" w={10} fill={PLANE} />
        <circle cx="283" cy="404" r="5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        <rect x="272" y="404" width="18" height="30" rx="4" fill={PAPER} stroke={INK} strokeWidth="2.4" transform="rotate(-8 281 419)" />
        <rect x="276" y="410" width="10" height="5" rx="2.5" fill={LIME} transform="rotate(-8 281 419)" />
        {/* head with a bun */}
        <g style={{ animation: "il-float 4.6s ease-in-out 0.5s infinite" }}>
          <circle cx="326" cy="316" r="7" fill={INK} />
          <path d="M308 338 L310 348 L322 348 L320 336 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={314} y={322} s={0.9} flip={-1} />
        </g>
      </g>

      <Bush x={112} y={498} s={0.9} />
      <Bush x={356} y={500} s={0.75} fill={PLANE2} />
      <line x1="-20" y1="520" x2="440" y2="520" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO RIGHT — "the busy business". The owner takes a call behind
   the counter, the sales bell rings, a teammate carries out an
   order, and the chart on the wall only goes up. Bleeds off the
   right edge.
────────────────────────────────────────────────────────────── */
export function BusyScene({ viewBox = "0 0 440 560" }: { viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A business owner takes a call behind a busy counter while a teammate carries an order and the sales chart rises"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      {/* background */}
      <g fill={BACK}>
        <rect x="386" y="170" width="80" height="350" rx="3" />
        <rect x="30" y="230" width="60" height="290" rx="3" />
        <path d="M84 104 Q90 84 110 88 Q118 74 136 80 Q154 76 158 94 Q172 98 168 110 Z" />
      </g>
      <ellipse cx="250" cy="524" rx="210" ry="13" fill={SHADOW} />

      {/* rising chart, floating in the office air */}
      <g style={{ animation: "il-float 5.4s ease-in-out infinite" }}>
        <rect x="150" y="112" width="180" height="118" rx="10" fill={PAPER} stroke={INK} strokeWidth="3" />
        <path d="M166 140 h148 M166 168 h148 M166 196 h148" stroke={PLANE2} strokeWidth="2" />
        <polyline points="168,206 208,186 236,194 268,158 296,166 312,136" stroke={INK} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M296 166 L312 136" stroke={LIME} strokeWidth="4" strokeLinecap="round" />
        <circle cx="312" cy="136" r="5" fill={LIME} stroke={INK} strokeWidth="2.2" />
      </g>

      {/* the counter, bleeding right */}
      <g>
        <rect x="150" y="352" width="320" height="16" rx="7" fill={PAPER} stroke={INK} strokeWidth="3.5" />
        <rect x="162" y="368" width="300" height="152" fill={PAPER} stroke={INK} strokeWidth="3" />
        <line x1="162" y1="392" x2="462" y2="392" stroke={LINE_IN} strokeWidth="1.8" />
        {/* lime chip on the counter front */}
        <rect x="188" y="428" width="40" height="22" rx="3" fill={LIME} stroke={INK} strokeWidth="2.4" transform="rotate(-4 208 439)" />
        <text x="203" y="445" fill={INK} fontSize="17" fontFamily="var(--font-display), sans-serif" transform="rotate(-4 208 439)">7</text>
      </g>

      {/* sales bell on the counter, ringing */}
      <g>
        <path d="M262 336 Q262 320 280 320 Q298 320 298 336 Z" fill={PAPER} stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
        <rect x="256" y="336" width="48" height="8" rx="4" fill={INK} />
        <circle cx="280" cy="318" r="3" fill={INK} />
        <path d="M252 310 L244 302 M280 304 L280 293 M308 310 L316 302" stroke={LIME} strokeWidth="3.5" strokeLinecap="round" style={{ animation: "il-pulse 2.2s ease-in-out infinite" }} />
      </g>

      {/* the owner behind the counter, on the phone */}
      <g>
        {/* resting arm on the counter */}
        <Tube d="M330 286 Q318 316 306 340" w={11} />
        <circle cx="303" cy="344" r="5.5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        {/* torso above the counter */}
        <path d="M334 268 Q338 256 356 256 Q374 256 378 270 L382 352 L330 352 Q328 352 328 340 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M348 262 q8 6 16 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        <path d="M344 286 Q345 316 342 344" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        {/* phone arm up to the ear */}
        <Tube d="M376 278 Q390 270 386 254" w={10.5} />
        <circle cx="384" cy="250" r="5.5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        <rect x="374" y="222" width="13" height="26" rx="4" fill={INK} transform="rotate(10 380 235)" />
        {/* speech: tiny lime talk marks */}
        <path d="M396 214 q6 -2 8 -8 M400 226 q8 0 12 -4" stroke={LIME} strokeWidth="2.6" strokeLinecap="round" fill="none" style={{ animation: "il-pulse 2.6s ease-in-out infinite" }} />
        {/* head, facing the room */}
        <g style={{ animation: "il-float 4.3s ease-in-out infinite" }}>
          <path d="M350 250 L352 260 L366 260 L364 248 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={358} y={232} s={1} flip={-1} />
        </g>
      </g>

      {/* teammate carrying an order out */}
      <g>
        {/* legs mid-stride */}
        <Tube d="M96 428 Q88 462 76 496" w={12} />
        <Tube d="M104 428 Q114 460 118 496" w={12} />
        <rect x="58" y="494" width="32" height="12" rx="6" fill={INK} />
        <rect x="110" y="494" width="32" height="12" rx="6" fill={INK} />
        {/* torso */}
        <path d="M86 348 Q90 338 104 338 Q118 338 122 350 L124 412 Q124 428 108 428 L100 428 Q84 428 84 412 Z" fill={PLANE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* both arms to the box */}
        <Tube d="M90 358 Q80 376 82 392" w={10} fill={PLANE} />
        <Tube d="M118 358 Q126 376 124 392" w={10} fill={PLANE} />
        {/* the box with lime tape */}
        <rect x="72" y="388" width="60" height="42" rx="5" fill={PAPER} stroke={INK} strokeWidth="3" />
        <line x1="102" y1="388" x2="102" y2="430" stroke={LIME} strokeWidth="5" />
        <line x1="72" y1="404" x2="132" y2="404" stroke={LINE_IN} strokeWidth="1.8" />
        {/* head with a bun, focused ahead */}
        <g style={{ animation: "il-float 4.6s ease-in-out 0.4s infinite" }}>
          <circle cx="90" cy="308" r="7" fill={INK} />
          <path d="M98 330 L100 340 L112 340 L110 328 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={104} y={314} s={0.9} />
        </g>
      </g>

      {/* fulfilled orders waiting */}
      <g>
        <rect x="20" y="474" width="52" height="38" rx="5" fill={PAPER} stroke={INK} strokeWidth="2.8" />
        <line x1="46" y1="474" x2="46" y2="512" stroke={LIME} strokeWidth="4" />
        <rect x="28" y="442" width="44" height="32" rx="5" fill={PLANE} stroke={INK} strokeWidth="2.8" />
        <line x1="50" y1="442" x2="50" y2="474" stroke={LIME} strokeWidth="4" />
      </g>

      <Bush x={392} y={498} s={0.85} />
      <line x1="0" y1="520" x2="460" y2="520" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO (legacy full-street scene, kept for reuse elsewhere)
────────────────────────────────────────────────────────────── */
export function HeroIllustration({ viewBox = "0 0 1200 560" }: { viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A person works on a laptop on a city bench while seven buildings climb upward behind them"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      {/* LAYER 1 — background silhouettes */}
      <g fill={BACK}>
        <rect x="40" y="200" width="90" height="320" rx="3" />
        <rect x="150" y="260" width="70" height="260" rx="3" />
        <rect x="330" y="230" width="80" height="290" rx="3" />
        <rect x="700" y="180" width="90" height="340" rx="3" />
        <rect x="1040" y="240" width="120" height="280" rx="3" />
        <path d="M120 150 Q126 128 148 132 Q156 116 176 122 Q196 118 200 136 Q216 140 212 154 Z" />
        <path d="M840 96 Q848 72 874 78 Q884 60 906 68 Q928 62 932 84 Q950 88 944 102 Z" />
      </g>

      {/* LAYER 2 — the seven-step climb */}
      <g stroke={MID} strokeWidth="2.5" fill={PAPER} strokeLinejoin="round">
        <rect x="240" y="382" width="96" height="108" rx="3" />
        <rect x="352" y="344" width="96" height="146" rx="3" />
        <rect x="464" y="300" width="96" height="190" rx="3" />
        <rect x="576" y="252" width="96" height="238" rx="3" />
        <rect x="688" y="200" width="96" height="290" rx="3" />
        <rect x="800" y="144" width="96" height="346" rx="3" />
      </g>
      <g stroke={MID} strokeWidth="2">
        {[
          [258, 400], [298, 400], [258, 432], [298, 432],
          [370, 362], [410, 362], [370, 394], [410, 394], [370, 426],
          [482, 318], [522, 318], [482, 350], [522, 350], [482, 382], [522, 382],
          [594, 270], [634, 270], [594, 302], [634, 302], [594, 334], [634, 334], [594, 366],
          [706, 218], [746, 218], [706, 250], [746, 250], [706, 282], [746, 282], [706, 314], [746, 314],
          [818, 162], [858, 162], [818, 194], [858, 194], [818, 226], [858, 226], [818, 258], [858, 258], [818, 290],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="22" height="18" rx="1.5" fill={PAPER} />
        ))}
      </g>
      {/* three lit windows only */}
      <rect x="858" y="194" width="22" height="18" rx="1.5" fill={LIME} style={{ animation: "il-pulse 4s ease-in-out infinite" }} />
      <rect x="634" y="302" width="22" height="18" rx="1.5" fill={LIME} opacity="0.8" />
      <rect x="370" y="394" width="22" height="18" rx="1.5" fill={LIME} opacity="0.55" />

      {/* LAYER 3 — the seventh tower */}
      <g>
        <g style={{ animation: "il-float 5s ease-in-out infinite" }}>
          <rect x="922" y="52" width="86" height="42" rx="4" fill={PLANE2} transform="rotate(-5 965 73)" />
          <rect x="930" y="44" width="86" height="42" rx="4" fill={LIME} stroke={INK} strokeWidth="3" transform="rotate(-5 973 65)" />
          <text x="962" y="78" fill={INK} fontSize="34" fontFamily="var(--font-display), sans-serif" transform="rotate(-5 973 65)">
            7
          </text>
        </g>
        <rect x="912" y="108" width="118" height="382" rx="4" fill={PAPER} stroke={INK} strokeWidth="3" />
        <path d="M1030 112 L1054 132 L1054 490 L1030 490 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <line x1="906" y1="108" x2="1060" y2="108" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="940" y1="108" x2="940" y2="86" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="940" cy="83" r="3" fill={LIME} stroke={INK} strokeWidth="1.5" />
        <Win x={928} y={128} />
        <Win x={972} y={128} />
        <Win x={928} y={176} />
        <Win x={972} y={176} />
        <Win x={928} y={224} />
        <Win x={972} y={224} />
        <Win x={928} y={272} />
        <g>
          <rect x="972" y="272" width="26" height="32" rx="2" fill={LIME} stroke={INK} strokeWidth="2" />
          <line x1="985" y1="272" x2="985" y2="304" stroke={INK} strokeWidth="1.5" />
          <line x1="972" y1="288" x2="998" y2="288" stroke={INK} strokeWidth="1.5" />
        </g>
        <g stroke={LINE_IN} strokeWidth="1.6" strokeLinecap="round" opacity="0.5">
          <path d="M922 330 h10 M932 336 h10 M922 342 h10" />
          <path d="M1002 150 h10 M1012 156 h10" />
          <path d="M1000 396 h10 M1010 402 h10 M1000 408 h10" />
        </g>
        <rect x="938" y="404" width="52" height="86" fill={PAPER} stroke={INK} strokeWidth="3" />
        <line x1="964" y1="404" x2="964" y2="490" stroke={INK} strokeWidth="2" />
        <circle cx="957" cy="448" r="2.2" fill={INK} />
        <circle cx="971" cy="448" r="2.2" fill={INK} />
        <path d="M930 404 L998 404 L990 386 L938 386 Z" fill={LIME} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <line x1="947" y1="386" x2="951" y2="404" stroke={INK} strokeWidth="2" />
        <line x1="964" y1="386" x2="964" y2="404" stroke={INK} strokeWidth="2" />
        <line x1="981" y1="386" x2="977" y2="404" stroke={INK} strokeWidth="2" />
      </g>

      {/* leads flow along the street, under the buildings, into the door */}
      <path
        d="M40 508 C 300 508, 600 506, 800 504 C 880 502, 930 498, 956 492"
        stroke={LIME}
        strokeWidth="2.5"
        strokeDasharray="1 12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="380" cy="507" r="5" fill={LIME} stroke={INK} strokeWidth="2" style={{ animation: "il-drift 4s ease-in-out 0.8s infinite" }} />
      <circle cx="480" cy="506" r="3.5" fill={LIME} style={{ animation: "il-drift 4s ease-in-out 2.4s infinite" }} />

      {/* FOREGROUND — bench, person, dog */}
      <g>
        <ellipse cx="230" cy="524" rx="200" ry="13" fill={SHADOW} />

        {/* bench: backrest + seat */}
        <g stroke={INK} strokeWidth="3" strokeLinecap="round">
          <line x1="118" y1="352" x2="330" y2="352" />
          <line x1="118" y1="366" x2="330" y2="366" />
          <line x1="126" y1="352" x2="130" y2="404" />
          <line x1="322" y1="352" x2="318" y2="404" />
          <line x1="118" y1="404" x2="330" y2="404" />
          <line x1="118" y1="416" x2="330" y2="416" />
          <line x1="132" y1="416" x2="126" y2="518" />
          <line x1="316" y1="416" x2="322" y2="518" />
        </g>

        {/* coffee cup on the bench seat */}
        <g>
          <path d="M160 382 L178 382 L175 404 L163 404 Z" fill={PAPER} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="158" y1="382" x2="180" y2="382" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M166 374 q3 -6 0 -10 M172 374 q3 -6 0 -10" stroke={MID} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* person: sits on the seat, laptop on knees, feet on the ground */}
        <g>
          {/* far shin behind, slightly back */}
          <Tube d="M262 420 L256 500" w={11} fill={PLANE} />
          <rect x="244" y="498" width="38" height="14" rx="7" fill={INK} />
          {/* thigh block: hips on the seat to the knee */}
          <path d="M206 396 Q210 388 222 388 L280 396 Q292 398 292 410 Q292 420 280 420 L216 420 Q204 420 204 408 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {/* near shin + shoe */}
          <Tube d="M282 422 L288 502" w={12} />
          <rect x="272" y="500" width="40" height="15" rx="7.5" fill={INK} />

          {/* torso: shoulder slope + waist taper, slight forward lean */}
          <path d="M208 322 Q212 312 228 312 Q244 312 248 326 L252 372 Q253 392 240 396 L216 396 Q204 394 205 376 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {/* collar + one fold */}
          <path d="M220 318 q8 6 16 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
          <path d="M216 340 Q217 366 214 388" stroke={LINE_IN} strokeWidth="1.8" fill="none" />

          {/* laptop: base on knees, screen angled so the chart shows */}
          <path d="M262 342 L294 348 L288 396 L256 390 Z" fill={INK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M266 350 L289 354 L284 390 L261 386 Z" fill="#242424" />
          <polyline points="266,380 271,371 276,374 281,364 286,367" stroke={LIME} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M238 396 L288 396 L296 408 L242 408 Z" fill={PLANE2} stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />

          {/* near arm: shoulder → elbow → hand on the keyboard */}
          <Tube d="M238 330 Q252 344 256 368 Q258 386 264 396" w={11} />
          <circle cx="266" cy="399" r="5.5" fill={PAPER} stroke={INK} strokeWidth="2.5" />

          {/* head, gently bobbing */}
          <g style={{ animation: "il-float 4.5s ease-in-out infinite" }}>
            <path d="M222 306 L224 316 L238 316 L236 304 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
            <Head x={230} y={288} s={1.05} />
          </g>
        </g>

        {/* dog, sitting, looking up at the person */}
        <g>
          <path d="M74 472 Q70 450 88 446 Q108 442 112 462 L114 500 L100 500 L98 484 Q88 488 80 484 L78 500 L66 500 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="94" cy="438" r="14" fill={PAPER} stroke={INK} strokeWidth="3" />
          <path d="M82 430 Q78 418 88 422 Z M106 430 Q110 418 100 422 Z" fill={INK} />
          <circle cx="91" cy="436" r="2" fill={INK} />
          <circle cx="100" cy="436" r="2" fill={INK} />
          <ellipse cx="95.5" cy="442" rx="3" ry="2.2" fill={INK} />
          <path d="M94 452 Q104 455 112 452" stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M112 484 Q126 480 128 468" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        <Bush x={330} y={496} s={1.1} />
        <Bush x={40} y={500} s={0.8} fill={PLANE2} />
      </g>

      {/* ground */}
      <line x1="24" y1="520" x2="1176" y2="520" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="380" y1="490" x2="900" y2="490" stroke={MID} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   METHOD 1 — the filter. A person feeds mixed leads onto a belt
   that runs into the sorting machine; gray ones drop to the bin,
   lime ones ride out to the pipeline tray.
────────────────────────────────────────────────────────────── */
export function FilterIllustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A person feeds leads onto a conveyor into a sorting machine; only qualified leads continue to the pipeline"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      <g fill={BACK}>
        <rect x="60" y="30" width="120" height="80" rx="6" />
        <rect x="420" y="24" width="110" height="66" rx="6" />
      </g>
      <ellipse cx="280" cy="392" rx="240" ry="14" fill={SHADOW} />

      {/* conveyor: horizontal belt feeding straight into the hopper mouth */}
      <g>
        <rect x="118" y="150" width="122" height="16" rx="8" fill={PAPER} stroke={INK} strokeWidth="3" />
        <circle cx="136" cy="158" r="4" fill={PLANE2} stroke={INK} strokeWidth="1.6" />
        <circle cx="178" cy="158" r="4" fill={PLANE2} stroke={INK} strokeWidth="1.6" />
        <circle cx="220" cy="158" r="4" fill={PLANE2} stroke={INK} strokeWidth="1.6" />
        <line x1="132" y1="166" x2="128" y2="388" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* mixed leads rolling toward the hopper */}
      <circle cx="176" cy="141" r="9" fill={MID} stroke={INK} strokeWidth="2.5" />
      <circle cx="210" cy="141" r="9" fill={LIME} stroke={INK} strokeWidth="2.5" />

      {/* the person, dropping a lead onto the belt */}
      <g>
        {/* relaxed arm sits behind the torso */}
        <Tube d="M66 240 Q54 262 58 288" w={11} />
        {/* legs */}
        <Tube d="M74 306 L70 380" w={13} />
        <Tube d="M94 306 L100 380" w={13} />
        <rect x="56" y="378" width="32" height="12" rx="6" fill={INK} />
        <rect x="90" y="378" width="32" height="12" rx="6" fill={INK} />
        {/* torso */}
        <path d="M64 226 Q68 216 84 216 Q100 216 104 230 L106 296 Q106 312 88 312 L78 312 Q62 312 62 296 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M76 222 q8 6 16 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        <path d="M74 244 Q75 272 72 300" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        {/* raised arm, lead held above the belt */}
        <Tube d="M98 232 Q116 212 126 186 Q132 170 140 158" w={11} />
        <circle cx="143" cy="153" r="6" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <circle cx="152" cy="136" r="10" fill={LIME} stroke={INK} strokeWidth="2.6" style={{ animation: "il-float 3s ease-in-out infinite" }} />
        <path d="M154 148 L154 144" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
        {/* head */}
        <g style={{ animation: "il-float 4.4s ease-in-out infinite" }}>
          <path d="M78 210 L80 220 L94 220 L92 208 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={86} y={192} s={0.95} />
        </g>
      </g>

      {/* the machine */}
      <g>
        <path d="M226 158 L370 158 L334 232 L262 232 Z" fill={PAPER} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M226 158 L370 158 L360 178 L236 178 Z" fill={PLANE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="248" y="232" width="100" height="88" rx="8" fill={PAPER} stroke={INK} strokeWidth="3.5" />
        <path d="M348 240 L364 252 L364 320 L348 320 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* dial + working light */}
        <circle cx="280" cy="262" r="14" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <line x1="280" y1="262" x2="289" y2="254" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M269 254 A14 14 0 0 1 291 254" stroke={LIME} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="318" cy="254" r="5" fill={LIME} stroke={INK} strokeWidth="2" style={{ animation: "il-pulse 1.8s ease-in-out infinite" }} />
        <path d="M266 296 h28 M266 304 h28" stroke={LINE_IN} strokeWidth="2" strokeLinecap="round" />
        <circle cx="256" cy="240" r="1.8" fill={LINE_IN} />
        <circle cx="340" cy="240" r="1.8" fill={LINE_IN} />
        <circle cx="256" cy="312" r="1.8" fill={LINE_IN} />
        <circle cx="340" cy="312" r="1.8" fill={LINE_IN} />
        <line x1="262" y1="320" x2="258" y2="388" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="334" y1="320" x2="338" y2="388" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        {/* reject chute, down-left */}
        <path d="M248 278 L216 294 L216 310 L248 294 Z" fill={PLANE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* reject bin */}
      <g>
        <path d="M170 322 L216 322 L210 384 L176 384 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M166 314 L220 314 L220 322 L166 322 Z" fill={PLANE2} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="186" cy="338" r="8" fill={MID} stroke={INK} strokeWidth="2" />
        <circle cx="200" cy="346" r="8" fill={MID} stroke={INK} strokeWidth="2" />
        <path d="M182 356 l8 8 M190 356 l-8 8" stroke={LINE_IN} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* qualified leads out to the tray */}
      <g>
        <path d="M348 272 L408 272 L424 280 L424 292 L408 284 L348 284 Z" fill={PLANE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="384" cy="266" r="9" fill={LIME} stroke={INK} strokeWidth="2.5" />
        <rect x="424" y="296" width="112" height="26" rx="13" fill={INK} />
        <circle cx="446" cy="309" r="8" fill={LIME} />
        <circle cx="470" cy="309" r="8" fill={LIME} />
        <circle cx="494" cy="309" r="8" fill={LIME} />
        <circle cx="516" cy="309" r="8" fill={LIME} opacity="0.45" />
        <line x1="432" y1="322" x2="428" y2="388" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="528" y1="322" x2="532" y2="388" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {/* tiny flag marking the pipeline */}
        <line x1="480" y1="296" x2="480" y2="272" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M480 272 L498 277 L480 284 Z" fill={LIME} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>

      <Bush x={30} y={368} s={0.9} />
      <line x1="20" y1="390" x2="540" y2="390" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   METHOD 2 — the warm-up. A lead relaxes in an armchair reading
   the sequence of helpful messages; the trust gauge fills to lime.
────────────────────────────────────────────────────────────── */
export function WarmingIllustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A relaxed person reads a sequence of helpful messages on their phone while a trust gauge fills up"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      <g fill={BACK}>
        <rect x="380" y="30" width="150" height="100" rx="8" />
        <circle cx="80" cy="70" r="34" />
      </g>
      <ellipse cx="250" cy="394" rx="220" ry="14" fill={SHADOW} />

      {/* floor lamp, midground */}
      <g stroke={MID} strokeWidth="3" strokeLinecap="round">
        <line x1="420" y1="150" x2="420" y2="380" />
        <path d="M398 150 L442 150 L432 118 L408 118 Z" fill={PLANE} strokeLinejoin="round" />
        <line x1="398" y1="382" x2="442" y2="382" />
      </g>
      <circle cx="420" cy="140" r="5" fill={LIME} opacity="0.7" style={{ animation: "il-pulse 3.4s ease-in-out infinite" }} />

      {/* armchair */}
      <g>
        <path d="M108 250 Q104 196 150 194 L216 194 Q252 196 250 244 L250 300 L108 300 Z" fill={PLANE} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        {/* armrests */}
        <path d="M96 262 Q96 246 112 246 L120 246 L120 336 L96 336 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M238 262 Q238 246 254 246 L262 246 L262 336 L238 336 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* seat front */}
        <path d="M120 300 L238 300 L238 336 L120 336 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <line x1="128" y1="336" x2="124" y2="386" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="232" y1="336" x2="236" y2="386" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* person in the chair, phone raised */}
      <g>
        {/* resting arm behind the torso, hand on the left armrest by the mug */}
        <Tube d="M150 222 Q132 234 122 244" w={10.5} />
        <circle cx="119" cy="246" r="5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        {/* far leg */}
        <Tube d="M170 286 L216 282 M216 282 L222 366" w={12} fill={PLANE} />
        <rect x="208" y="364" width="34" height="13" rx="6.5" fill={INK} />
        {/* torso reclined */}
        <path d="M144 210 Q148 200 164 200 Q180 200 184 214 L188 268 Q188 284 172 286 L158 286 Q142 284 142 268 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M156 206 q8 6 16 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        <path d="M152 228 Q153 254 150 276" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        {/* near leg: thigh forward, shin down to the floor */}
        <Tube d="M162 288 L206 290 M206 290 L212 370" w={13} />
        <rect x="198" y="368" width="36" height="14" rx="7" fill={INK} />
        {/* phone arm: shoulder → elbow → hand up */}
        <Tube d="M182 218 Q200 226 208 216 Q216 206 218 196" w={10.5} />
        <circle cx="219" cy="192" r="5.5" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        {/* phone in hand */}
        <rect x="210" y="152" width="24" height="40" rx="5" fill={PAPER} stroke={INK} strokeWidth="2.8" transform="rotate(8 222 172)" />
        <rect x="215" y="160" width="14" height="7" rx="3" fill={LIME} transform="rotate(8 222 172)" />
        <path d="M216 173 h12 M216 179 h9" stroke={LINE_IN} strokeWidth="1.8" strokeLinecap="round" transform="rotate(8 222 172)" />
        {/* head */}
        <g style={{ animation: "il-float 4.2s ease-in-out infinite" }}>
          <path d="M158 194 L160 204 L174 204 L172 192 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={166} y={176} s={1} />
        </g>
        {/* mug on the left armrest */}
        <g>
          <rect x="99" y="230" width="17" height="16" rx="3" fill={PAPER} stroke={INK} strokeWidth="2.5" />
          <path d="M116 234 q7 2 0 8" stroke={INK} strokeWidth="2.2" fill="none" />
          <path d="M104 224 q3 -5 0 -9 M111 224 q3 -5 0 -9" stroke={MID} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* the message sequence */}
      <g>
        <g style={{ animation: "il-float 5s ease-in-out infinite" }}>
          <rect x="296" y="150" width="150" height="38" rx="12" fill={PAPER} stroke={INK} strokeWidth="2.8" />
          <circle cx="316" cy="169" r="9" fill={PLANE2} stroke={INK} strokeWidth="2" />
          <path d="M312 169 l3 3 l6 -6" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M332 163 h84 M332 174 h58" stroke={LINE_IN} strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g style={{ animation: "il-float 5s ease-in-out 0.5s infinite" }}>
          <rect x="312" y="200" width="150" height="38" rx="12" fill={PAPER} stroke={INK} strokeWidth="2.8" />
          <circle cx="332" cy="219" r="9" fill={PLANE2} stroke={INK} strokeWidth="2" />
          <path d="M328 219 l3 3 l6 -6" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M348 213 h76 M348 224 h50" stroke={LINE_IN} strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g style={{ animation: "il-float 5s ease-in-out 1s infinite" }}>
          <rect x="296" y="250" width="150" height="38" rx="12" fill={LIME} stroke={INK} strokeWidth="2.8" />
          <path d="M310 264 l6 8 l12 -14" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M336 263 h80 M336 274 h54" stroke={INK} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
        </g>
        <path d="M296 170 Q270 190 280 220 Q286 240 296 262" stroke={LIME} strokeWidth="2.2" strokeDasharray="1 9" strokeLinecap="round" fill="none" />
      </g>

      {/* trust gauge */}
      <g>
        <rect x="486" y="170" width="30" height="180" rx="15" fill={PAPER} stroke={INK} strokeWidth="3" />
        <rect x="492" y="238" width="18" height="100" rx="9" fill={LIME} />
        <circle cx="501" cy="330" r="7" fill={INK} />
        <path d="M516 200 h10 M516 250 h10 M516 300 h10" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <Bush x={330} y={372} s={0.9} />
      <line x1="28" y1="392" x2="532" y2="392" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   METHOD 3 — the return. One coin goes into the meter, the gauge
   points to lime, and a stack of coins grows on the desk.
────────────────────────────────────────────────────────────── */
export function RoiIllustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A person feeds one coin into a return machine and a growing stack of coins comes out on the desk"
      className="w-full h-auto"
    >
      <style>{anim}</style>

      <g fill={BACK}>
        <rect x="60" y="30" width="130" height="86" rx="8" />
        <rect x="430" y="40" width="100" height="70" rx="8" />
      </g>
      <ellipse cx="280" cy="394" rx="235" ry="14" fill={SHADOW} />

      {/* desk */}
      <g>
        <rect x="120" y="282" width="360" height="14" rx="6" fill={PAPER} stroke={INK} strokeWidth="3.5" />
        <line x1="140" y1="296" x2="134" y2="388" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="456" y1="296" x2="462" y2="388" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* the return machine */}
      <g>
        <rect x="230" y="168" width="126" height="114" rx="10" fill={PAPER} stroke={INK} strokeWidth="3.5" />
        <path d="M356 176 L372 188 L372 282 L356 282 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        {/* coin slot */}
        <rect x="262" y="158" width="42" height="10" rx="5" fill={INK} />
        {/* gauge */}
        <circle cx="293" cy="212" r="24" fill={PAPER} stroke={INK} strokeWidth="2.8" />
        <path d="M273 204 A24 24 0 0 1 293 188" stroke={MID} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M293 188 A24 24 0 0 1 314 201" stroke={LIME} strokeWidth="4" fill="none" strokeLinecap="round" />
        <line x1="293" y1="212" x2="307" y2="198" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="293" cy="212" r="3" fill={INK} />
        {/* multiplier chips */}
        <rect x="244" y="248" width="38" height="22" rx="11" fill={PAPER} stroke={INK} strokeWidth="2.4" />
        <text x="263" y="264" textAnchor="middle" fill={INK} fontSize="13" fontWeight="700" fontFamily="var(--font-body), sans-serif">x3</text>
        <rect x="290" y="248" width="42" height="22" rx="11" fill={INK} />
        <text x="311" y="264" textAnchor="middle" fill={LIME} fontSize="13" fontWeight="700" fontFamily="var(--font-body), sans-serif">x12</text>
        {/* output arrow to the stack */}
        <path d="M372 250 L400 250" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 8" />
        <path d="M398 243 L410 250 L398 257 Z" fill={LIME} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* the person, dropping a coin in — arm rises left of the machine face */}
      <g>
        {/* relaxed arm behind the torso */}
        <Tube d="M150 244 Q138 266 142 288" w={11} />
        {/* legs */}
        <Tube d="M158 306 L152 380" w={13} />
        <Tube d="M180 306 L188 380" w={13} />
        <rect x="138" y="378" width="32" height="12" rx="6" fill={INK} />
        <rect x="178" y="378" width="32" height="12" rx="6" fill={INK} />
        {/* torso */}
        <path d="M148 232 Q152 222 168 222 Q184 222 188 236 L192 296 Q192 312 174 312 L164 312 Q146 312 146 296 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M160 228 q8 6 16 0" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        <path d="M158 252 Q159 278 156 304" stroke={LINE_IN} strokeWidth="1.8" fill="none" />
        {/* coin arm: raised up beside the machine, not across it */}
        <Tube d="M182 238 Q200 214 212 188 Q220 170 230 158" w={11} />
        <circle cx="234" cy="154" r="6" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <circle cx="248" cy="140" r="13" fill={LIME} stroke={INK} strokeWidth="2.8" style={{ animation: "il-float 3s ease-in-out infinite" }} />
        <text x="248" y="146" textAnchor="middle" fill={INK} fontSize="15" fontWeight="700" fontFamily="var(--font-body), sans-serif">1</text>
        {/* drop dashes toward the slot */}
        <path d="M258 152 Q268 158 274 160" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 6" />
        {/* head */}
        <g style={{ animation: "il-float 4.4s ease-in-out infinite" }}>
          <path d="M162 216 L164 226 L178 226 L176 214 Z" fill={PAPER} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <Head x={170} y={198} s={0.95} />
        </g>
      </g>

      {/* the growing stack on the desk */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={408} y={262 - i * 20} width="60" height="17" rx="8.5" fill={i % 2 ? LIME : PAPER} stroke={INK} strokeWidth="2.6" />
        ))}
        <rect x="412" y="156" width="52" height="15" rx="7.5" fill={LIME} stroke={INK} strokeWidth="2.4" style={{ animation: "il-float 2.6s ease-in-out infinite" }} />
      </g>

      {/* potted plant */}
      <g>
        <path d="M496 328 L524 328 L519 368 L501 368 Z" fill={PAPER} stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M510 328 Q504 306 490 300 M510 328 Q512 302 528 296 M510 328 Q510 310 510 298" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="488" cy="298" r="4" fill={LIME} />
        <circle cx="530" cy="294" r="4" fill={LIME} />
        <circle cx="510" cy="294" r="4" fill={LIME} />
      </g>

      <line x1="28" y1="390" x2="532" y2="390" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Two-engine glyphs, same standard. */
export function AgencyGlyph() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-20 h-20">
      <ellipse cx="48" cy="86" rx="34" ry="5" fill={SHADOW} />
      <path d="M18 44 L52 30 L52 66 L18 54 Z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M52 30 Q66 30 66 48 Q66 66 52 66 Z" fill={PLANE2} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="12" y="42" width="10" height="14" rx="3" fill={PAPER} stroke={INK} strokeWidth="2.6" />
      <path d="M26 56 L30 74 Q31 78 27 78 L22 78 Q19 78 19 74 L20 55" fill={PAPER} stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M74 36 L82 30 M76 48 L86 48 M74 60 L82 66" stroke={LIME} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function SoftwareGlyph() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-20 h-20">
      <ellipse cx="48" cy="86" rx="34" ry="5" fill={SHADOW} />
      <rect x="14" y="22" width="68" height="52" rx="6" fill={PAPER} stroke={INK} strokeWidth="3" />
      <line x1="14" y1="36" x2="82" y2="36" stroke={INK} strokeWidth="2.6" />
      <circle cx="23" cy="29" r="2.2" fill={INK} />
      <circle cx="31" cy="29" r="2.2" fill={INK} />
      <circle cx="39" cy="29" r="2.2" fill={LIME} stroke={INK} strokeWidth="1.4" />
      <polyline points="24,64 36,54 46,58 58,44 70,48" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="70" cy="48" r="4" fill={LIME} stroke={INK} strokeWidth="2" />
      <path d="M60 62 L74 76 L67 76 L64 82 Z" fill={INK} />
    </svg>
  );
}
