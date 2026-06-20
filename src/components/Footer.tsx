import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-base/80 backdrop-blur-md text-muted py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-0.5 mb-4">
            <span className="text-lg font-serif font-bold text-white tracking-tight">Kazi</span>
            <span className="text-lg font-serif font-bold text-accent tracking-tight">Cast</span>
          </div>
          <p className="text-sm leading-relaxed">
            The exclusive casting and aggregator platform for the East African film industry.
          </p>
        </div>
        <div>
          <h4 className="text-warm-white font-semibold mb-4 uppercase text-xs tracking-widest">For Industry</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/dashboard/castings/new" className="hover:text-accent transition-colors duration-300">Post a Role</Link></li>
            <li><Link href="/talent" className="hover:text-accent transition-colors duration-300">Browse Talent</Link></li>
            <li><Link href="/castings" className="hover:text-accent transition-colors duration-300">Castings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-warm-white font-semibold mb-4 uppercase text-xs tracking-widest">For Talent</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/register" className="hover:text-accent transition-colors duration-300">Create Profile</Link></li>
            <li><Link href="/castings" className="hover:text-accent transition-colors duration-300">Find Castings</Link></li>
            <li><Link href="/dashboard/consent" className="hover:text-accent transition-colors duration-300">Consent Ledger</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-warm-white font-semibold mb-4 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-glass-border text-sm text-center text-muted/60">
        &copy; {new Date().getFullYear()} KaziCast. All rights reserved.
      </div>
    </footer>
  );
}
