import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 pt-36 pb-20">
      <div className="text-center max-w-md">
        <p className="label mb-4">404</p>
        <h1
          className="display text-section mb-5"
        >
          This floor does not exist.
        </h1>
        <p className="text-muted text-lg mb-8">
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
