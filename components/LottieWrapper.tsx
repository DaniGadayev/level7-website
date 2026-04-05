"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false, loading: () => <div /> }
);

interface LottieWrapperProps {
  src: string;
  height?: number;
  width?: number;
  className?: string;
}

export default function LottieWrapper({
  src,
  height = 300,
  width = 300,
  className = "",
}: LottieWrapperProps) {
  return (
    <div className={className}>
      <Player
        autoplay
        loop
        src={src}
        style={{ height, width }}
      />
    </div>
  );
}
