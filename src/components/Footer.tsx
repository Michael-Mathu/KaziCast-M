export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-4">KaziCast</h3>
          <p className="text-sm leading-relaxed">
            The exclusive casting and aggregator platform for the East African film industry.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">For Industry</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Post a Role</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Browse Talent</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">For Talent</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Create Profile</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Find Castings</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
        &copy; {new Date().getFullYear()} KaziCast. All rights reserved.
      </div>
    </footer>
  );
}
