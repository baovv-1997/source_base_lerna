import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="h-full w-screen overflow-x-hidden">
      <h1>Home</h1>
      <Link href="/login">
        <a>
          <h1 className="mt-7">Login page</h1>
        </a>
      </Link>
    </div>
  );
}
