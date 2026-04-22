import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:text-gray-300 transition-colors">
            KaziCast
          </Link>
          <nav className="hidden md:flex flex-row space-x-6 text-sm font-medium text-gray-400">
            <Link href="/castings" className="hover:text-white transition-colors">Castings</Link>
            <Link href="/talent" className="hover:text-white transition-colors">Talent Roster</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Sign In
          </button>
          <button className="text-sm font-bold bg-white text-black px-4 py-2 hover:bg-gray-200 transition-colors border border-white">
            Post a Casting
          </button>
        </div>
      </div>
    </header>
  );
}
