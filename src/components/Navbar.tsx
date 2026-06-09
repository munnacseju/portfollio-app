export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <span className="font-bold text-xl tracking-tighter">MOTIUR.</span>
      <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
        <a href="#about" className="hover:text-white transition">About</a>
        <a href="#experience" className="hover:text-white transition">Experience</a>
        <a href="#skills" className="hover:text-white transition">Skills</a>
        <a href="#projects" className="hover:text-white transition">Projects</a>
        <a href="#contact" className="hover:text-white transition">Contact</a>
      </div>
    </div>
  </nav>
);
