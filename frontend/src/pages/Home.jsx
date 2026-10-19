import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FeatureCard from "../components/FeatureCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  { n: "01", t: "Upload", d: "Drop in your documents. They are parsed, chunked and indexed in seconds." },
  { n: "02", t: "Ask", d: "Chat with your library by text or voice, in your own words." },
  { n: "03", t: "Understand", d: "Get answers with the reasoning visible, so you can trust the result." },
];

const TAGS = ["RAG", "Voice AI", "Semantic Search", "Code Agents", "Reasoning", "Documents", "Playground"];

const FEATURES = [
  {
    title: "RAG Intelligence",
    desc: "Upload your documents and chat with them using retrieval-augmented generation. Semantic search understands context and returns precise answers from your own library. Built for research, legal documents, technical manuals and knowledge management.",
    route: "/rag",
    imageUrl: "/innovation-animate.svg",
  },
  {
    title: "Voice AI Assistant",
    desc: "Natural, low-latency voice conversations powered by modern speech technology. Real-time transcription, multi-language support and hands-free workflows that adapt to the way you speak.",
    route: "/voice-memo",
    imageUrl: "/voice-chat-animate.svg",
  },
  {
    title: "Upload Documents",
    desc: "Drag and drop files up to 10MB with batch processing. Text is extracted, formatting preserved and content indexed for instant retrieval. Secure, encrypted storage keeps your documents private.",
    route: "/upload",
    imageUrl: "/upload-animate.svg",
  },
  {
    title: "AI Playground",
    desc: "A sandbox for experimenting with multiple AI models. Test, compare and fine-tune capabilities in real time, from language models to image generation and code completion, with no setup.",
    route: "/playground",
    imageUrl: "/playground.svg",
  },
  {
    title: "CodePilot Agent",
    desc: "A Cursor-style coding agent that turns natural language into real, structured code and files. It understands intent, generates complete implementations and writes files only with your explicit confirmation.",
    route: "/codepilot",
    imageUrl: "/code-agent-animate.svg",
  },
  {
    title: "DeepThink Engine",
    desc: "A transparent reasoning engine that works through problems step by step before answering. It validates logic and exposes its thinking, ideal for debugging, research and complex decisions.",
    route: "/deepthink",
    imageUrl: "/thinking-animate.svg",
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
          .from(".hero-mask > *", { yPercent: 110, duration: 1.1, stagger: 0.12 })
          .from(".hero-fade", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.6");

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
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
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

  return (
    <div ref={root} className="relative min-h-screen overflow-hidden bg-black text-zinc-100" style={{fontFamily:'"Quicksand", sans-serif;'}}>
  
    
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 pb-20 pt-28 text-center">
          <div className="mx-auto max-w-4xl space-y-6">
         

            <h1 className="space-y-1">
              <span className="hero-mask block overflow-hidden pb-2">
                <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-6xl font-extrabold leading-tight tracking-tight text-transparent md:text-8xl">
                  The Oceanum
                </span>
              </span>
              <span className="hero-mask block overflow-hidden pb-2">
                <span className="block text-5xl font-bold tracking-tight md:text-7xl">
                  <span className="bg-gradient-to-r from-zinc-500 to-zinc-700 bg-clip-text text-transparent">
                    AI Library
                  </span>{" "}
                  🐬
                </span>
              </span>
            </h1>

            <p className="hero-fade mx-auto max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
              Dive deep into the future of artificial intelligence.
              <br />
              <span className="font-medium text-white">Empowering innovation with neural intelligence agents.</span>
            </p>

            <div className="hero-fade flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/rag"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-zinc-500 hover:text-white"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="reveal-up px-6 pb-20">
          <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-zinc-800 border-y border-zinc-800 py-8 text-center">
            {[
              { v: <span className="count" data-count={FEATURES.length}>{FEATURES.length}</span>, l: "AI Features" },
              { v: "24/7", l: "Available" },
              { v: "∞", l: "Possibilities" },
            ].map((s) => (
              <div key={s.l}>
                <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-4xl font-bold text-transparent">
                  {s.v}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{s.l}</div>
              </div>
            ))}
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
          <SectionHead eyebrow="Features" title="Everything in one library" />
          <div className="mx-auto grid max-w-5xl gap-6">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.route} {...f} layout={i % 2 === 0 ? "left" : "right"} />
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

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="reveal-up relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center backdrop-blur-lg">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-transparent" />
            <h2 className="relative bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
              Ready to dive in?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
              Join the future of AI-powered solutions and unlock unlimited potential.
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