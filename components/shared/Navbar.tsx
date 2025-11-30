export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">GNPL</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="/" className="hover:text-primary">Home</a>
          <a href="/teams" className="hover:text-primary">Teams</a>
          <a href="/fixtures" className="hover:text-primary">Fixtures</a>
          <a href="/sponsors" className="hover:text-primary">Sponsors</a>
          <a href="/gallery" className="hover:text-primary">Gallery</a>
          <a href="/admin" className="hover:text-primary font-semibold">Admin</a>
        </div>
      </div>
    </nav>
  );
}
