import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Waves } from "lucide-react";

// Each link can have `items` that show in a popover on hover.
// Change the labels, descriptions and paths to match your routes.
const links = [
  {
    name: "Home",
    path: "/",
    items: [
      { label: "Overview", desc: "What Oceanum is and who it's for", path: "/" },
      { label: "Featured models", desc: "Hand-picked models to start with", path: "/models" },
    ],
  },
  {
    name: "About",
    path: "/about",
    items: [
      { label: "Our story", desc: "Why we built the library", path: "/about" },
      { label: "Team", desc: "The people behind Oceanum", path: "/about#team" },
      { label: "Contact", desc: "Questions or feedback", path: "/about#contact" },
    ],
  },
  {
    name: "Models",
    path: "/models",
    items: [
      { label: "All models", desc: "Browse the full library", path: "/models" },
      { label: "Language", desc: "Chat, writing and reasoning", path: "/models?type=language" },
      { label: "Vision", desc: "Image and video understanding", path: "/models?type=vision" },
      { label: "Audio", desc: "Speech and sound", path: "/models?type=audio" },
    ],
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false); // mobile menu
  const [hidden, setHidden] = useState(false); // hide while scrolling down
  const [scrolled, setScrolled] = useState(false); // show background after scrolling
  const [activeMenu, setActiveMenu] = useState(null); // which desktop popover is open
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes
  useEffect(() => {
    setActiveMenu(null);
    setOpen(false);
  }, [pathname]);

  const linkClass = (path) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      pathname === path
        ? "text-green-400"
        : "text-zinc-400 hover:text-green-50"
    }`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden && !open && !activeMenu ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <div
        className={`w-full border-b px-4 transition-all duration-500 sm:px-6 ${
          scrolled || open
            ? "border-zinc-800 bg-black/60 shadow-lg shadow-black/30 backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
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

          {/* Desktop links with hover popovers */}
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((l) => {
              const isOpen = activeMenu === l.name;
              return (
                <div
                  key={l.path}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(l.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                  onFocus={() => setActiveMenu(l.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setActiveMenu(null);
                  }}
                >
                  <Link
                    to={l.path}
                    className={`${linkClass(l.path)} flex items-center gap-1.5`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {l.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Link>

                  {/* pt-3 bridges the gap so the popover stays open while the cursor moves down */}
                  <div
                    className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl">
                      {l.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="block rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-zinc-900"
                        >
                          <div className="text-sm font-semibold text-green-50">{item.label}</div>
                          <div className="text-xs text-zinc-500">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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

        {/* Mobile menu: sub-options are listed under each link */}
        <div
          className={`grid transition-all duration-300 lg:hidden ${
            open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 overflow-hidden">
            {links.map((l) => (
              <div key={l.path} className="flex flex-col">
                <Link
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className={`${linkClass(l.path)} py-3`}
                >
                  {l.name}
                </Link>
                <div className="ml-4 flex flex-col border-l border-zinc-800 pl-3">
                  {l.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm text-zinc-500 transition-colors hover:text-green-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
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