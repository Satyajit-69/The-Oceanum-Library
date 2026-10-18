import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FeatureCard({
  title,
  desc,
  route,
  videoUrl,
  imageUrl,
  layout = "left", // "left" | "right" -> media position
}) {
  const navigate = useNavigate();
  const card = useRef(null);

  useGSAP(
    () => {
      const fromLeft = layout === "left";

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: card.current, start: "top 85%", once: true },
      });

      tl.from(card.current, { opacity: 0, y: 50, duration: 0.7 })
        .from(
          ".media-wrap",
          {
            clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.4"
        )
        .from(".media-inner", { scale: 1.3, duration: 1.2 }, "<")
        .from(
          ".reveal",
          { opacity: 0, y: 24, duration: 0.6, stagger: 0.12 },
          "-=0.6"
        );
    },
    { scope: card, dependencies: [layout] }
  );

  const lift = (y) =>
    gsap.to(card.current, { y, duration: 0.35, ease: "power2.out" });

  const mediaClass =
    "w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105";

  return (
    <div
      ref={card}
      onClick={() => navigate(route)}
      onMouseEnter={() => lift(-4)}
      onMouseLeave={() => lift(0)}
      className={`group cursor-pointer flex flex-col sm:flex-row sm:items-stretch overflow-hidden rounded-2xl
        border border-zinc-800 bg-zinc-950 transition-colors duration-300 hover:border-zinc-600
        ${layout === "left" ? "" : "sm:flex-row-reverse"}`}
    >
      {/* Media */}
      <div className="media-wrap w-full sm:w-2/5 h-40 sm:h-auto sm:min-h-[180px] overflow-hidden bg-black">
        <div className="media-inner w-full h-full">
          {videoUrl ? (
            <video src={videoUrl} className={mediaClass} autoPlay loop muted playsInline />
          ) : imageUrl ? (
            <img src={imageUrl} alt={title} className={mediaClass} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
              <span className="text-5xl font-bold text-white/90">{title[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full sm:w-3/5 p-5 sm:p-6 flex flex-col justify-center gap-3">
        <h2 className="reveal text-xl sm:text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>

        <p className="reveal text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {desc}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="reveal inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black
            transition-colors duration-300 hover:bg-zinc-200 active:scale-95"
        >
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}