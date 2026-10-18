import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Waves } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Models", path: "/models" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (path) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      pathname === path
        ? "bg-green-500 text-white"
        : "text-zinc-400 hover:text-green-50"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <div className="mx-auto px-4 backdrop-blur-xl transition-all duration-500 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400 transition-transform duration-300 group-hover:scale-105">
              <Waves className="h-5 w-5 text-black" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-green-500">Oceanum</div>
              <div className="text-[10px] font-medium tracking-widest text-zinc-500">AI LIBRARY</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.path} to={l.path} className={linkClass(l.path)}>
                {l.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/about"
            className="hidden rounded-lg bg-green-50 px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(240,253,244,0.35)] lg:block"
          >
            Get Started
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-green-50 transition-colors hover:bg-zinc-900 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`grid transition-all duration-300 lg:hidden ${
            open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 overflow-hidden">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`${linkClass(l.path)} py-3`}
              >
                {l.name}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-green-50 py-3 text-center text-sm font-semibold text-black"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}