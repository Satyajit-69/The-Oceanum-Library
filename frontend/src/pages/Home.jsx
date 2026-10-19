import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FeatureCard from "../components/FeatureCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Tip: download this photo, save as public/hero.jpg and use "/hero.jpg" instead
const HERO_IMG = "https://unsplash.com/photos/QURU8IY-RaI/download?force=true&w=2000";

const STEPS = [
  { n: "01", t: "Upload", d: "Add your documents. They are parsed, chunked and embedded so they can be searched by meaning." },
  { n: "02", t: "Ask", d: "Chat with your files in natural language, by text or voice, and get answers grounded in your own content." },
  { n: "03", t: "Organize", d: "Let the Smart File Organizer sort mixed files into folders, review the structure, and download it as a ZIP." },
];

const TAGS = ["Document Chat", "RAG", "Semantic Search", "Voice", "File Organizer", "ZIP Export", "Knowledge Workspace"];

const STACK = [
  { t: "Frontend", d: "React, Vite, Tailwind CSS" },
  { t: "Backend", d: "Python, FastAPI" },
  { t: "AI", d: "OpenAI API, LangChain, LangGraph" },
  { t: "Retrieval", d: "Embeddings, vector search, RAG" },
];

// Typewriter text. Keep each under ~18 characters so it fits on one line
const HEADS = ["Your documents,", "Your files,", "Your notes,", "Your research,", "Your library,"];
const TITLES = [
  "understood by AI",
  "ready to chat",
  "organized for you",
  "answered in seconds",
  "always at hand",
  "easy to search",
  "grounded in facts",
  "your knowledge",
];

const FEATURES = [
  {
    title: "AI-Powered Document Chat",
    desc: "Ask questions about your uploaded documents in natural language and get context-aware responses grounded in your own files, not generic answers.",
    route: "/rag",
    imageUrl: "/innovation-animate.svg",
  },
  {
    title: "Retrieval-Augmented Generation",
    desc: "Relevant passages are retrieved with embeddings and vector search, then used to ground every AI-generated answer in your source material.",
    route: "/rag",
    imageUrl: "/thinking-animate.svg",
  },
  {
    title: "Upload Documents",
    desc: "Drag and drop your files to have them processed and indexed for instant retrieval. Your knowledge becomes searchable and ready to question.",
    route: "/upload",
    imageUrl: "/upload-animate.svg",
  },
  {
    title: "Voice-Enabled Interaction",
    desc: "Talk to the AI assistant instead of typing. Spoken interaction brings a hands-free way to explore your knowledge, subject to the voice capabilities currently implemented.",
    route: "/voice-memo",
    imageUrl: "/voice-chat-animate.svg",
  },
  {
    title: "Smart File Organizer (Planned)",
    desc: "Classify mixed file collections by file type, subject or your own instructions, using file metadata and AI-assisted content classification. Review the proposed folder structure before anything is finalized.",
    route: "/organizer",
    imageUrl: "/playground.svg",
  },
  {
    title: "Downloadable File Archives (Planned)",
    desc: "Export your organized collection as a ZIP archive while your original files stay preserved and untouched.",
    route: "/organizer",
    imageUrl: "/code-agent-animate.svg",
  },
];

function SectionHead({ eyebrow, title }) {
  return (
    <div className="reveal-up mb-12 text-center">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero intro
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(".hero-img", { scale: 1.15, duration: 2.2, ease: "power2.out" }, 0)
          .from(".hero-mask > *", { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0)
          .from(".hero-fade", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 0.7);

        // Scroll progress bar
        gsap.set(".progress", { scaleX: 0 });
        gsap.to(".progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        // Generic reveal on scroll
        gsap.utils.toArray(".reveal-up").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Staggered steps
        gsap.set(".step", { opacity: 0, y: 40 });
        ScrollTrigger.batch(".step", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }),
        });

        // Count-up numbers
        gsap.utils.toArray(".count").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = Math.round(obj.v)),
            scrollTrigger: { trigger: el, start: "top 98%", once: true },
          });
        });

        // Infinite marquee
        gsap.to(".marquee", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

        // Cursor spotlight (mouse devices only)
        if (window.matchMedia("(pointer: fine)").matches) {
          gsap.set(".spotlight", { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 3 });
          const sx = gsap.quickTo(".spotlight", "x", { duration: 0.8, ease: "power3" });
          const sy = gsap.quickTo(".spotlight", "y", { duration: 0.8, ease: "power3" });
          const move = (e) => {
            sx(e.clientX);
            sy(e.clientY);
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        }
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  // Typewriter (both lines)
  useGSAP(
    () => {
      const head = root.current.querySelector(".type-head");
      const tail = root.current.querySelector(".type-text");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        head.textContent = HEADS[0];
        tail.textContent = TITLES[0];
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".caret", { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

        let lastH = -1;
        let lastT = -1;
        let tl;

        // random index, never the same one twice in a row
        const pick = (arr, last) => {
          let i;
          do i = Math.floor(Math.random() * arr.length);
          while (i === last);
          return i;
        };

        // adds a type (from < to) or delete (from > to) step straight onto the timeline
        const step = (tl, el, text, from, to, speed, position) => {
          const s = { n: from };
          tl.to(
            s,
            {
              n: to,
              duration: Math.abs(to - from) * speed,
              ease: "none",
              onUpdate: () => (el.textContent = text.slice(0, Math.round(s.n))),
            },
            position
          );
        };

        const run = () => {
          lastH = pick(HEADS, lastH);
          lastT = pick(TITLES, lastT);
          const h = HEADS[lastH];
          const t = TITLES[lastT];

          head.textContent = "";
          tail.textContent = "";

          tl = gsap.timeline({ onComplete: run });
          tl.set(".caret-a", { visibility: "visible" })
            .set(".caret-b", { visibility: "hidden" });

          step(tl, head, h, 0, h.length, 0.06); // type line 1

          tl.set(".caret-a", { visibility: "hidden" })
            .set(".caret-b", { visibility: "visible" });

          step(tl, tail, t, 0, t.length, 0.07); // type line 2
          step(tl, tail, t, t.length, 0, 0.035, "+=1.8"); // hold, then delete line 2

          tl.set(".caret-a", { visibility: "visible" })
            .set(".caret-b", { visibility: "hidden" });

          step(tl, head, h, h.length, 0, 0.035); // delete line 1
        };

        const start = gsap.delayedCall(1.2, run); // wait for the hero intro
        return () => {
          start.kill();
          tl && tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="relative min-h-screen overflow-hidden bg-black text-zinc-100"
      style={{ fontFamily: '"Raleway", sans-serif' }}
    >
      <div className="relative z-10">
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
          {/* Background image */}
          <img
            src={HERO_IMG}
            alt=""
            className="hero-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-6 pt-36 md:px-[100px]">
            <h1 className="max-w-6xl" style={{ fontFamily: '"Raleway", sans-serif' }}>
              <span className="hero-mask block overflow-hidden pb-1">
                <span className="block min-h-[1.05em] text-5xl font-black leading-[1.05] tracking-tighter text-white md:text-7xl lg:text-8xl">
                  <span className="type-head" />
                  <span className="caret caret-a ml-2 inline-block h-[0.85em] w-[0.07em] translate-y-[0.08em] bg-white align-baseline" />
                </span>
              </span>
              <span className="hero-mask block overflow-hidden pb-2">
                <span className="block min-h-[1.05em] text-5xl font-black leading-[1.05] tracking-tighter text-transparent [-webkit-text-stroke:1px_#fff] md:text-7xl lg:text-8xl">
                  <span className="type-text" />
                  <span className="caret caret-b invisible ml-2 inline-block h-[0.85em] w-[0.07em] translate-y-[0.08em] bg-white align-baseline" />
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-10 text-lg font-semibold text-white">
              Upload, ask and organize. No setup required.
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/rag"
                className="bg-white px-12 py-5 text-sm font-semibold uppercase tracking-wide text-black transition-all duration-300 hover:bg-zinc-200"
              >
                Get Started
              </Link>
              <p className="max-w-[16rem] text-sm leading-snug text-zinc-300">
                Upload a document and start asking in seconds.
              </p>
            </div>
          </div>

          {/* Bottom row: stats + badge */}
          <div className="hero-fade relative z-10 flex flex-wrap items-end justify-between gap-8 px-6 pb-12 pt-24 md:px-[100px]">
            <div className="flex gap-16">
              <div>
                <div className="text-5xl font-medium tracking-tighter text-white md:text-6xl">
                  <span className="count" data-count={FEATURES.length}>{FEATURES.length}</span>
                </div>
                <div className="mt-3 text-sm text-zinc-200">core features</div>
              </div>
              <div>
                <div className="text-5xl font-medium tracking-tighter text-white md:text-6xl">RAG</div>
                <div className="mt-3 text-sm text-zinc-200">grounded answers</div>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-snug text-zinc-200">
              Powered by RAG, LangChain and LangGraph for answers grounded in your own files.
            </p>
          </div>
        </section>

        {/* Marquee */}
        <section className="border-y border-zinc-900 py-5">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="marquee flex w-max whitespace-nowrap">
              {[...TAGS, ...TAGS, ...TAGS, ...TAGS].map((t, i) => (
                <span key={i} className="px-6 text-sm uppercase tracking-[0.25em] text-zinc-600">
                  {t} <span className="ml-12 text-zinc-800">/</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-24">
          <SectionHead eyebrow="Features" title="Your knowledge, in one workspace" />
          <div className="mx-auto grid max-w-5xl gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} layout={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 pb-24">
          <SectionHead eyebrow="How it works" title="Three simple steps" />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="step rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-600"
              >
                <div className="mb-4 text-sm font-medium text-zinc-600">{s.n}</div>
                <h3 className="mb-2 text-xl font-semibold text-white">{s.t}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="px-6 pb-24">
          <SectionHead eyebrow="Technology" title="Built with modern tools" />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-4">
            {STACK.map((s) => (
              <div
                key={s.t}
                className="reveal-up rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-zinc-600"
              >
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">{s.t}</div>
                <p className="text-sm leading-relaxed text-zinc-300">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="reveal-up relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center backdrop-blur-lg">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-transparent" />
            <h2 className="relative bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
              Ready to dive in?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
              Make your personal knowledge more accessible and useful with one unified AI-powered workspace.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/about"
                className="rounded-full bg-white px-8 py-3.5 font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Get Started Free
              </Link>
              <Link
                to="/learnmore"
                className="rounded-full border border-zinc-700 bg-zinc-900 px-8 py-3.5 font-semibold text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}