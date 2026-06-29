import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 pt-36 pb-20">
      <div className="text-center max-w-md">
        <p className="label mb-4">404</p>
        <h1
          className="font-bold font-satoshi text-[#1A1A1A] mb-5"
          style={{ fontSize: "clamp(2.5rem,6vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Page not found.
        </h1>
        <p className="text-[#6B6B6B] text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/resources" className="btn-ghost">
            Browse resources
          </Link>
        </div>
      </div>
    </section>
  );
}
