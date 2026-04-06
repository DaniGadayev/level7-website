"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────
   SVG Illustrations — one per floor
───────────────────────────────────────────── */

const SVG_LOBBY = `<style>
  @keyframes lScan { 0%{transform:translateY(-20px);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateY(50px);opacity:0} }
  @keyframes lFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes lPulse { 0%,100%{opacity:1;r:3} 50%{opacity:0.4;r:5} }
  .l-mag { animation: lFloat 3s ease-in-out infinite; transform-origin: 148px 118px; }
  .l-scan { animation: lScan 2.4s ease-in-out infinite; }
  .l-d1 { animation: lPulse 1.8s ease-in-out infinite; }
  .l-d2 { animation: lPulse 1.8s ease-in-out 0.6s infinite; }
  .l-d3 { animation: lPulse 1.8s ease-in-out 1.2s infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Document -->
  <rect x="55" y="38" width="108" height="140" rx="5" stroke="#1A1A1A" stroke-width="1.5"/>
  <line x1="72" y1="68" x2="148" y2="68" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  <line x1="72" y1="82" x2="148" y2="82" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  <line x1="72" y1="96" x2="130" y2="96" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  <!-- Highlighted DNA row -->
  <rect x="72" y="110" width="74" height="9" rx="2" fill="#A3FF00" opacity="0.85"/>
  <line x1="72" y1="132" x2="138" y2="132" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  <line x1="72" y1="146" x2="120" y2="146" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  <!-- Magnifying glass -->
  <g class="l-mag">
    <circle cx="148" cy="118" r="28" stroke="#1A1A1A" stroke-width="2"/>
    <circle cx="148" cy="118" r="20" fill="white" fill-opacity="0.8"/>
    <line x1="168" y1="138" x2="182" y2="152" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Scan line inside lens -->
    <line class="l-scan" x1="132" y1="110" x2="164" y2="110" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <!-- Floating accent dots -->
  <circle class="l-d1" cx="42" cy="80" r="3" fill="#A3FF00"/>
  <circle class="l-d2" cx="36" cy="100" r="2" fill="#A3FF00"/>
  <circle class="l-d3" cx="196" cy="72" r="2.5" fill="#A3FF00"/>
</svg>`;

const SVG_FLOOR1 = `<style>
  @keyframes f1Rise { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-80px);opacity:0} }
  @keyframes f1Blink { 0%,100%{opacity:0.3} 50%{opacity:1} }
  .f1-c1 { animation: f1Rise 2.4s ease-in-out 0s infinite; }
  .f1-c2 { animation: f1Rise 2.4s ease-in-out 0.8s infinite; }
  .f1-c3 { animation: f1Rise 2.4s ease-in-out 1.6s infinite; }
  .f1-dot { animation: f1Blink 1.4s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Phone body -->
  <rect x="85" y="48" width="70" height="120" rx="10" stroke="#1A1A1A" stroke-width="1.8"/>
  <rect x="105" y="52" width="30" height="4" rx="2" fill="#1A1A1A" opacity="0.2"/>
  <line x1="85" y1="152" x2="155" y2="152" stroke="#1A1A1A" stroke-width="1.2"/>
  <!-- Content cards rising from phone -->
  <g class="f1-c1">
    <rect x="94" y="102" width="52" height="30" rx="4" fill="#F7F7F7" stroke="#E5E5E5" stroke-width="1"/>
    <line x1="100" y1="113" x2="140" y2="113" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
    <line x1="100" y1="122" x2="128" y2="122" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  </g>
  <g class="f1-c2">
    <rect x="94" y="70" width="52" height="28" rx="4" fill="#F7F7F7" stroke="#A3FF00" stroke-width="1"/>
    <rect x="100" y="76" width="16" height="16" rx="2" fill="#A3FF00" opacity="0.3"/>
    <line x1="120" y1="80" x2="140" y2="80" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
    <line x1="120" y1="87" x2="134" y2="87" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  </g>
  <g class="f1-c3">
    <rect x="94" y="86" width="52" height="28" rx="4" fill="white" stroke="#E5E5E5" stroke-width="1"/>
    <line x1="100" y1="96" x2="140" y2="96" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="100" y1="104" x2="130" y2="104" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round"/>
  </g>
  <!-- Signal dots -->
  <circle class="f1-dot" cx="50" cy="90" r="3" fill="#A3FF00"/>
  <circle class="f1-dot" cx="192" cy="110" r="2.5" fill="#A3FF00" style="animation-delay:0.7s"/>
  <circle class="f1-dot" cx="44" cy="130" r="2" fill="#A3FF00" style="animation-delay:1.4s"/>
</svg>`;

const SVG_FLOOR2 = `<style>
  @keyframes f2Draw { from{stroke-dashoffset:220} to{stroke-dashoffset:0} }
  @keyframes f2Dot { 0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0} }
  @keyframes f2Bar { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  @keyframes f2Pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .f2-line { stroke-dasharray:220; animation: f2Draw 2s ease-out 0.3s both; }
  .f2-b1 { transform-origin: 78px 175px; animation: f2Bar 0.6s ease-out 0.4s both; }
  .f2-b2 { transform-origin: 105px 175px; animation: f2Bar 0.6s ease-out 0.55s both; }
  .f2-b3 { transform-origin: 132px 175px; animation: f2Bar 0.6s ease-out 0.7s both; }
  .f2-b4 { transform-origin: 159px 175px; animation: f2Bar 0.6s ease-out 0.85s both; }
  .f2-dot { animation: f2Pulse 1.2s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Axes -->
  <line x1="55" y1="40" x2="55" y2="178" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="55" y1="178" x2="195" y2="178" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Bars -->
  <rect class="f2-b1" x="65" y="148" width="22" height="27" rx="2" fill="#E5E5E5"/>
  <rect class="f2-b2" x="92" y="130" width="22" height="45" rx="2" fill="#E5E5E5"/>
  <rect class="f2-b3" x="119" y="108" width="22" height="67" rx="2" fill="#E5E5E5"/>
  <rect class="f2-b4" x="146" y="78" width="22" height="97" rx="2" fill="#A3FF00" opacity="0.7"/>
  <!-- Rising line -->
  <polyline class="f2-line" points="76,152 103,134 130,112 157,82" stroke="#A3FF00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Dot at peak -->
  <circle class="f2-dot" cx="157" cy="82" r="5" fill="#A3FF00"/>
  <!-- Budget label -->
  <rect x="150" y="58" width="46" height="18" rx="4" fill="#1A1A1A"/>
  <text x="173" y="71" text-anchor="middle" fill="#A3FF00" font-size="9" font-family="sans-serif" font-weight="bold">+320%</text>
  <!-- Grid lines -->
  <line x1="55" y1="148" x2="185" y2="148" stroke="#E5E5E5" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="55" y1="118" x2="185" y2="118" stroke="#E5E5E5" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="55" y1="88" x2="185" y2="88" stroke="#E5E5E5" stroke-width="1" stroke-dasharray="4,4"/>
</svg>`;

const SVG_FLOOR3 = `<style>
  @keyframes f3Drop { 0%{transform:translateY(-10px);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateY(90px);opacity:0} }
  @keyframes f3Out { 0%,60%{opacity:0} 80%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.4)} }
  @keyframes f3Glow { 0%,100%{fill:#A3FF00} 50%{fill:#E5E5E5} }
  .f3-l1 { animation: f3Drop 2s ease-in 0s infinite; }
  .f3-l2 { animation: f3Drop 2s ease-in 0.7s infinite; }
  .f3-l3 { animation: f3Drop 2s ease-in 1.4s infinite; }
  .f3-out { animation: f3Out 2s ease-out 0s infinite; }
  .f3-glow { animation: f3Glow 2s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Funnel shape -->
  <path d="M50,48 L190,48 L155,110 L155,170 L85,170 L85,110 Z" stroke="#1A1A1A" stroke-width="1.8" stroke-linejoin="round"/>
  <!-- Funnel fill -->
  <path d="M50,48 L190,48 L155,110 L85,110 Z" fill="#F7F7F7"/>
  <!-- Funnel lower -->
  <rect x="85" y="110" width="70" height="60" rx="0" fill="#F7F7F7"/>
  <!-- Funnel labels -->
  <text x="120" y="80" text-anchor="middle" fill="#6B6B6B" font-size="8" font-family="sans-serif">LEADS</text>
  <text x="120" y="148" text-anchor="middle" fill="#6B6B6B" font-size="8" font-family="sans-serif">SALES</text>
  <!-- Leads dropping in -->
  <circle class="f3-l1" cx="90" cy="42" r="5" fill="#1A1A1A"/>
  <circle class="f3-l2" cx="120" cy="42" r="5" fill="#1A1A1A"/>
  <circle class="f3-l3" cx="150" cy="42" r="5" fill="#1A1A1A"/>
  <!-- Deal coming out -->
  <circle class="f3-out" cx="120" cy="186" r="7" fill="#A3FF00"/>
  <!-- Accent glow at bottom -->
  <circle class="f3-glow" cx="120" cy="176" r="3" fill="#A3FF00"/>
  <!-- Side sparks -->
  <circle cx="32" cy="75" r="2.5" fill="#A3FF00" opacity="0.5"/>
  <circle cx="208" cy="85" r="2" fill="#A3FF00" opacity="0.5"/>
</svg>`;

const SVG_FLOOR4 = `<style>
  @keyframes f4Draw { from{stroke-dashoffset:80} to{stroke-dashoffset:0} }
  @keyframes f4Pop { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
  @keyframes f4Pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .f4-ln1 { stroke-dasharray:80; animation: f4Draw 0.6s ease-out 0.5s both; }
  .f4-ln2 { stroke-dasharray:80; animation: f4Draw 0.6s ease-out 0.8s both; }
  .f4-ln3 { stroke-dasharray:80; animation: f4Draw 0.6s ease-out 1.1s both; }
  .f4-n1 { animation: f4Pop 0.4s ease-out 0.1s both; transform-origin: 120px 72px; }
  .f4-n2 { animation: f4Pop 0.4s ease-out 0.6s both; transform-origin: 68px 148px; }
  .f4-n3 { animation: f4Pop 0.4s ease-out 0.9s both; transform-origin: 120px 148px; }
  .f4-n4 { animation: f4Pop 0.4s ease-out 1.2s both; transform-origin: 172px 148px; }
  .f4-dot { animation: f4Pulse 1.5s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Connecting lines -->
  <line class="f4-ln1" x1="120" y1="94" x2="68" y2="130" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  <line class="f4-ln2" x1="120" y1="94" x2="120" y2="130" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  <line class="f4-ln3" x1="120" y1="94" x2="172" y2="130" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Top node — CEO/Founder -->
  <g class="f4-n1">
    <circle cx="120" cy="72" r="22" fill="white" stroke="#1A1A1A" stroke-width="1.8"/>
    <!-- Person icon -->
    <circle cx="120" cy="66" r="7" fill="none" stroke="#1A1A1A" stroke-width="1.4"/>
    <path d="M107,84 Q107,78 120,78 Q133,78 133,84" fill="none" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round"/>
  </g>
  <!-- Left node -->
  <g class="f4-n2">
    <circle cx="68" cy="148" r="18" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
    <circle cx="68" cy="143" r="5" fill="none" stroke="#1A1A1A" stroke-width="1.2"/>
    <path d="M59,156 Q59,152 68,152 Q77,152 77,156" fill="none" stroke="#1A1A1A" stroke-width="1.2" stroke-linecap="round"/>
  </g>
  <!-- Center node — AI -->
  <g class="f4-n3">
    <circle cx="120" cy="148" r="18" fill="#A3FF00" stroke="#A3FF00" stroke-width="1.5"/>
    <text x="120" y="153" text-anchor="middle" fill="#1A1A1A" font-size="10" font-family="sans-serif" font-weight="bold">AI</text>
  </g>
  <!-- Right node -->
  <g class="f4-n4">
    <circle cx="172" cy="148" r="18" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
    <circle cx="172" cy="143" r="5" fill="none" stroke="#1A1A1A" stroke-width="1.2"/>
    <path d="M163,156 Q163,152 172,152 Q181,152 181,156" fill="none" stroke="#1A1A1A" stroke-width="1.2" stroke-linecap="round"/>
  </g>
  <!-- Pulse dot on AI node -->
  <circle class="f4-dot" cx="120" cy="148" r="24" stroke="#A3FF00" stroke-width="1" fill="none" opacity="0.4"/>
</svg>`;

const SVG_FLOOR5 = `<style>
  @keyframes f5Grow { from{transform:scaleY(0);opacity:0} to{transform:scaleY(1);opacity:1} }
  @keyframes f5Line { from{stroke-dashoffset:180} to{stroke-dashoffset:0} }
  @keyframes f5Alert { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .f5-b1 { transform-origin: 72px 165px; animation: f5Grow 0.5s ease-out 0.2s both; }
  .f5-b2 { transform-origin: 98px 165px; animation: f5Grow 0.5s ease-out 0.35s both; }
  .f5-b3 { transform-origin: 124px 165px; animation: f5Grow 0.5s ease-out 0.5s both; }
  .f5-b4 { transform-origin: 150px 165px; animation: f5Grow 0.5s ease-out 0.65s both; }
  .f5-b5 { transform-origin: 176px 165px; animation: f5Grow 0.5s ease-out 0.8s both; }
  .f5-trend { stroke-dasharray:180; animation: f5Line 1.4s ease-out 0.9s both; }
  .f5-alert { animation: f5Alert 1.2s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Axes -->
  <line x1="48" y1="38" x2="48" y2="168" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="48" y1="168" x2="202" y2="168" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Bars (heights: 40, 55, 70, 90, 115) -->
  <rect class="f5-b1" x="58" y="125" width="22" height="40" rx="3" fill="#E5E5E5"/>
  <rect class="f5-b2" x="84" y="110" width="22" height="55" rx="3" fill="#E5E5E5"/>
  <rect class="f5-b3" x="110" y="95" width="22" height="70" rx="3" fill="#E5E5E5"/>
  <rect class="f5-b4" x="136" y="75" width="22" height="90" rx="3" fill="#A3FF00" opacity="0.8"/>
  <rect class="f5-b5" x="162" y="50" width="22" height="115" rx="3" fill="#A3FF00"/>
  <!-- Trend line -->
  <polyline class="f5-trend" points="69,125 95,110 121,95 147,75 173,50" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="180"/>
  <!-- Profit label -->
  <rect x="158" y="36" width="50" height="18" rx="4" stroke="#A3FF00" stroke-width="1" fill="white"/>
  <text x="183" y="49" text-anchor="middle" fill="#1A1A1A" font-size="8" font-family="sans-serif" font-weight="bold">PROFIT ↑</text>
  <!-- Alert dot -->
  <circle class="f5-alert" cx="48" cy="88" r="3" fill="#A3FF00"/>
  <!-- Grid -->
  <line x1="48" y1="118" x2="198" y2="118" stroke="#E5E5E5" stroke-width="0.8" stroke-dasharray="3,3"/>
  <line x1="48" y1="88" x2="198" y2="88" stroke="#E5E5E5" stroke-width="0.8" stroke-dasharray="3,3"/>
</svg>`;

const SVG_FLOOR6 = `<style>
  @keyframes f6Move { 0%{offset-distance:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{offset-distance:100%;opacity:0} }
  @keyframes f6Draw { from{stroke-dashoffset:350} to{stroke-dashoffset:0} }
  @keyframes f6Star { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
  .f6-path { stroke-dasharray:350; animation: f6Draw 1.8s ease-out 0.2s both; }
  .f6-rocket { animation: f6Move 3s ease-in-out infinite; offset-path: path('M 48 185 Q 100 160 130 120 Q 160 80 192 48'); }
  .f6-s1 { animation: f6Star 2s ease-in-out 1s infinite; transform-origin: 175px 65px; }
  .f6-s2 { animation: f6Star 2s ease-in-out 1.6s infinite; transform-origin: 155px 82px; }
  .f6-s3 { animation: f6Star 2s ease-in-out 2.2s infinite; transform-origin: 195px 78px; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Curved path -->
  <path class="f6-path" d="M 48 185 Q 100 160 130 120 Q 160 80 192 48" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Rocket on path -->
  <g class="f6-rocket">
    <rect x="-10" y="-14" width="20" height="28" rx="10" fill="#1A1A1A"/>
    <polygon points="0,-18 -6,-10 6,-10" fill="#1A1A1A"/>
    <rect x="-14" y="8" width="8" height="8" rx="2" fill="#1A1A1A"/>
    <rect x="6" y="8" width="8" height="8" rx="2" fill="#1A1A1A"/>
    <ellipse cx="0" cy="16" rx="5" ry="7" fill="#A3FF00" opacity="0.8"/>
  </g>
  <!-- Sparkle stars -->
  <g class="f6-s1">
    <line x1="175" y1="60" x2="175" y2="70" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="170" y1="65" x2="180" y2="65" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <g class="f6-s2">
    <line x1="155" y1="77" x2="155" y2="87" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="150" y1="82" x2="160" y2="82" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <g class="f6-s3">
    <line x1="195" y1="73" x2="195" y2="83" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="190" y1="78" x2="200" y2="78" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <!-- Ground base -->
  <line x1="28" y1="195" x2="88" y2="195" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <!-- Start dot -->
  <circle cx="48" cy="185" r="5" fill="#E5E5E5" stroke="#1A1A1A" stroke-width="1.5"/>
  <!-- End dot -->
  <circle cx="192" cy="48" r="5" fill="#A3FF00"/>
</svg>`;

const SVG_FLOOR7 = `<style>
  @keyframes f7Rise { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes f7Win { 0%,100%{fill:#A3FF00} 50%{fill:#E5E5E5} }
  @keyframes f7Dash { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .f7-b1 { animation: f7Rise 0.6s ease-out 0.1s both; }
  .f7-b2 { animation: f7Rise 0.6s ease-out 0.25s both; }
  .f7-b3 { animation: f7Rise 0.6s ease-out 0.4s both; }
  .f7-b4 { animation: f7Rise 0.6s ease-out 0.55s both; }
  .f7-b5 { animation: f7Rise 0.6s ease-out 0.7s both; }
  .f7-w1 { animation: f7Win 2.5s ease-in-out 1s infinite; }
  .f7-w2 { animation: f7Win 2.5s ease-in-out 1.5s infinite; }
  .f7-w3 { animation: f7Win 2.5s ease-in-out 2s infinite; }
  .f7-dash { animation: f7Dash 1.5s ease-in-out infinite; }
</style>
<svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Ground -->
  <line x1="20" y1="195" x2="220" y2="195" stroke="#1A1A1A" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
  <!-- Building 1 — tallest center -->
  <g class="f7-b3">
    <rect x="98" y="60" width="44" height="135" rx="2" stroke="#1A1A1A" stroke-width="1.8" fill="none"/>
    <rect x="106" y="72" width="10" height="8" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect x="124" y="72" width="10" height="8" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect class="f7-w1" x="106" y="90" width="10" height="8" rx="1"/>
    <rect x="124" y="90" width="10" height="8" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect x="106" y="108" width="10" height="8" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect class="f7-w2" x="124" y="108" width="10" height="8" rx="1"/>
    <!-- Crown/spire -->
    <line x1="120" y1="60" x2="120" y2="44" stroke="#A3FF00" stroke-width="2" stroke-linecap="round"/>
    <circle cx="120" cy="40" r="4" fill="#A3FF00"/>
  </g>
  <!-- Building 2 — left -->
  <g class="f7-b2">
    <rect x="54" y="100" width="36" height="95" rx="2" stroke="#1A1A1A" stroke-width="1.5" fill="none"/>
    <rect x="62" y="112" width="8" height="7" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect class="f7-w3" x="74" y="112" width="8" height="7" rx="1"/>
    <rect x="62" y="128" width="8" height="7" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
  </g>
  <!-- Building 3 — right -->
  <g class="f7-b4">
    <rect x="150" y="88" width="36" height="107" rx="2" stroke="#1A1A1A" stroke-width="1.5" fill="none"/>
    <rect x="158" y="100" width="8" height="7" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect x="170" y="100" width="8" height="7" rx="1" stroke="#1A1A1A" stroke-width="1" fill="none"/>
    <rect class="f7-w1" x="158" y="116" width="8" height="7" rx="1" style="animation-delay:2s"/>
  </g>
  <!-- Small building left -->
  <g class="f7-b1">
    <rect x="24" y="130" width="24" height="65" rx="2" stroke="#1A1A1A" stroke-width="1.2" fill="none"/>
    <rect x="30" y="140" width="5" height="5" rx="1" stroke="#1A1A1A" stroke-width="0.8" fill="none"/>
  </g>
  <!-- Small building right -->
  <g class="f7-b5">
    <rect x="192" y="140" width="24" height="55" rx="2" stroke="#1A1A1A" stroke-width="1.2" fill="none"/>
    <rect x="198" y="150" width="5" height="5" rx="1" stroke="#1A1A1A" stroke-width="0.8" fill="none"/>
  </g>
  <!-- Floating dashboard indicator -->
  <rect class="f7-dash" x="156" y="52" width="52" height="24" rx="4" fill="#1A1A1A"/>
  <text x="182" y="68" text-anchor="middle" fill="#A3FF00" font-size="9" font-family="sans-serif" font-weight="bold">AUTO ✓</text>
</svg>`;

const FLOOR_SVGS: Record<string, string> = {
  L: SVG_LOBBY,
  "1": SVG_FLOOR1,
  "2": SVG_FLOOR2,
  "3": SVG_FLOOR3,
  "4": SVG_FLOOR4,
  "5": SVG_FLOOR5,
  "6": SVG_FLOOR6,
  "7": SVG_FLOOR7,
};

/* ─────────────────────────────────────────────
   Floor data
───────────────────────────────────────────── */
const floors = [
  {
    num: "L",
    label: "Lobby",
    name: "Offer & Strategy",
    tagline: "You don't need a better product. You need to know who you're selling to.",
    who: "Starting out or stuck with a vague offer. No stable income, no defined audience.",
    ai: "Answer 15 questions → AI builds your value proposition + tells you which floor to start on.",
    pricing: "Free",
    free: true,
  },
  {
    num: "1",
    label: "Floor 1",
    name: "Organic Marketing",
    tagline: "No one will find you if you don't exist.",
    who: "Has a defined offer but zero digital presence. Not publishing content. Not on any platform.",
    ai: "Define audience + offer → AI generates platform-optimized content weekly. You just hit publish.",
    pricing: "Monthly subscription",
    free: false,
  },
  {
    num: "2",
    label: "Floor 2",
    name: "Paid Marketing",
    tagline: "A lead machine that works while you sleep.",
    who: "Organic is working but volume is too small. Needs leads without the time dependency.",
    ai: "Automatic campaign optimization, performance alerts, audience expansion — around the clock.",
    pricing: "Monthly subscription + % of media budget",
    free: false,
  },
  {
    num: "3",
    label: "Floor 3",
    name: "Sales",
    tagline: "Leads without a sales process is a leaky bucket.",
    who: "Has leads but isn't closing. Every call is different. No defined structure.",
    ai: "Auto-builds sales scripts by business type. AI coach analyzes call recordings with scoring.",
    pricing: "Monthly subscription + one-time setup fee",
    free: false,
  },
  {
    num: "4",
    label: "Floor 4",
    name: "Team & Staff",
    tagline: "Your business is stuck because it's built around you, not a system.",
    who: "Sales are good but overwhelmed. Everything runs through the founder.",
    ai: "Smart ops dashboard aggregating all departments. AI writes SOPs and job descriptions.",
    pricing: "Monthly subscription + partner coaching",
    free: false,
  },
  {
    num: "5",
    label: "Floor 5",
    name: "Finance",
    tagline: "You're not poor in money. You're poor in financial information.",
    who: "Has stable revenue but no visibility on where money goes. Discovers problems too late.",
    ai: "Real-time financial dashboard — profit, cash flow, money leak alerts, forecasting.",
    pricing: "Software subscription + one-time course + partner",
    free: false,
  },
  {
    num: "6",
    label: "Floor 6",
    name: "Scale",
    tagline: "Your next growth won't come from you — it'll come from the system you build.",
    who: "Profitable business with a small team. Growth is stuck. Wants to become a brand.",
    ai: "Automatic KPI tracking, ambassador identification, community management, media monitoring.",
    pricing: "High subscription + intensive partner coaching",
    free: false,
  },
  {
    num: "7",
    label: "Floor 7",
    name: "Empire",
    tagline: "A real business is one that works without you.",
    who: "Large profitable business where the founder is still the bottleneck.",
    ai: "Founder dashboard: sees everything, manages nothing. AI replaces founder in routine decisions.",
    pricing: "Senior partner coaching + software",
    free: false,
  },
];

/* ─────────────────────────────────────────────
   Floor section component
───────────────────────────────────────────── */
function FloorSection({ floor, index }: { floor: (typeof floors)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-20 border-b border-[#E5E5E5] last:border-0"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex lg:flex-row-reverse" : ""}`}>

          {/* Illustration */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="flex items-center justify-center bg-[#F7F7F7] rounded-3xl p-10 min-h-[320px]"
          >
            <div
              id={floor.num === "L" ? "illustration-lobby" : `illustration-floor${floor.num}`}
              style={{ width: 240, height: 240 }}
              dangerouslySetInnerHTML={{ __html: FLOOR_SVGS[floor.num] }}
            />
          </motion.div>

          {/* Content */}
          <div className={isEven ? "" : "lg:pr-8"}>
            <motion.div custom={1} variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div
                className="text-6xl font-bold font-satoshi leading-none select-none"
                style={{ color: "#A3FF00", letterSpacing: "-0.04em" }}
              >
                {floor.num}
              </div>
              <div>
                <div className="text-[10px] label">{floor.label}</div>
                {floor.free && (
                  <span className="inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full bg-accent text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider">
                    FREE
                  </span>
                )}
              </div>
            </motion.div>

            <motion.h2
              custom={2}
              variants={fadeUp}
              className="font-bold font-satoshi text-[#1A1A1A] mb-4"
              style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              {floor.name}
            </motion.h2>

            <motion.p custom={3} variants={fadeUp} className="text-lg text-[#6B6B6B] mb-8 leading-relaxed italic">
              &ldquo;{floor.tagline}&rdquo;
            </motion.p>

            <div className="space-y-4">
              <motion.div custom={4} variants={fadeUp} className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5]">
                <div className="text-[10px] label mb-1.5">Who It&apos;s For</div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{floor.who}</p>
              </motion.div>
              <motion.div custom={5} variants={fadeUp} className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5]">
                <div className="text-[10px] label mb-1.5">AI Role</div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{floor.ai}</p>
              </motion.div>
            </div>

            <motion.div custom={6} variants={fadeUp} className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#E5E5E5] text-sm font-semibold text-[#1A1A1A]">
                {floor.pricing}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function ServicesPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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
          <motion.p custom={0} variants={fadeUp} className="label mb-4">
            The Platform
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-[#1A1A1A] mb-6"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            The right tool.<br />
            The right stage.<br />
            <span className="text-accent">Every time.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] text-xl max-w-2xl leading-relaxed">
            Businesses don&apos;t fail because they&apos;re bad — they fail because they&apos;re using the wrong tools at the wrong stage. Eight floors. Each one precision-built for exactly where you are.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FLOORS ── */}
      <div>
        {floors.map((floor, i) => (
          <FloorSection key={floor.num} floor={floor} index={i} />
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold font-satoshi text-white mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Not sure which floor<br />you&apos;re on?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-lg mb-10 leading-relaxed"
          >
            Take the free AI diagnostic — 5 minutes, and you&apos;ll know exactly where to start.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="btn-primary text-base px-10 py-5">
              Start Free Diagnostic
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
