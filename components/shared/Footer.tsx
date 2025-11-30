export default function Footer() {
  return (
    <footer className="mt-24 bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-gray-300">

        {/* LEFT – About GNPL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">GNPL</h3>
          <p className="text-sm leading-relaxed">
            Gold Coast Nepalese Premier League is an annual cricket tournament 
            celebrating Nepalese community, unity and cricketing excellence on 
            Australia's Gold Coast.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} GNPL. All Rights Reserved.
          </p>
        </div>

        {/* CENTER – Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-cyan-400">Home</a></li>
            <li><a href="/teams" className="hover:text-cyan-400">Teams</a></li>
            <li><a href="/fixtures" className="hover:text-cyan-400">Fixtures</a></li>
            <li><a href="/results" className="hover:text-cyan-400">Results</a></li>
            <li><a href="/gallery" className="hover:text-cyan-400">Gallery</a></li>
            <li><a href="/sponsors" className="hover:text-cyan-400">Sponsors</a></li>
          </ul>
        </div>

        {/* RIGHT – Powered By */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Powered By</h3>

          <div className="flex items-center gap-4">
            <img
              src="/gcgcc.jpg" // Replace with your actual file
              alt="Gorkhas Club"
              className="w-14 h-14 object-cover rounded-full border border-gray-700"
            />

            <div>
              <p className="font-semibold text-white">Gold Coast Gorkhas CC</p>
              <p className="text-gray-400 text-sm">
                Supporting cricket & community growth.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Contact: gnplinfo@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
