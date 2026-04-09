import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

export default function FeatureCard({
  title,
  desc,
  route,
  videoUrl,
  imageUrl,
  layout = "left", // "left" or "right" - determines media position
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const MediaSection = () => (
    <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full overflow-hidden bg-black">
      {videoUrl ? (
        <div className="relative w-full h-full group/video">
          <video
            src={videoUrl}
            className="w-full h-full object-cover transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            autoPlay={isVideoPlaying}
            loop
            muted
            playsInline
          />
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 group-hover/video:opacity-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoPlaying(true);
                }}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-300"
              >
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </button>
            </div>
          )}
        </div>
      ) : imageUrl ? (
        <div className="w-full h-full relative">
          {/* Subtle overlay for the image to blend it with black and white theme */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center border-l border-zinc-800">
          <span className="text-8xl font-bold text-white/90">{title[0]}</span>
        </div>
      )}
    </div>
  );

  const ContentSection = () => (
    <div className="relative w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-zinc-950 border-r border-zinc-900 lg:border-r-0 lg:border-l">
      {/* Content Container */}
      <div className="space-y-6 relative z-10">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold w-fit shadow-lg backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          Featured
        </div>

        {/* Title */}
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-xl font-light">
          {desc}
        </p>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 hover:gap-4 w-fit"
        >
          <span>Explore Now</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>

        {/* Feature Highlights */}
        <div className="flex gap-6 pt-4 text-sm text-zinc-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            <span>Live Demo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            <span>Interactive</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0 group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-500/5 rounded-full blur-3xl -z-0 group-hover:bg-zinc-400/10 transition-colors duration-700 pointer-events-none" />
    </div>
  );

  return (
    <div
      onClick={() => navigate(route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 bg-zinc-950 min-h-[500px] lg:min-h-[600px] flex flex-col lg:flex-row border border-zinc-800/80"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />
      
      {/* Container to maintain rounding */}
      <div className="absolute inset-[1px] bg-zinc-950 rounded-3xl overflow-hidden" />

      {/* Content Layout Based on Position */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row rounded-3xl overflow-hidden">
        {layout === "left" ? (
          <>
            <MediaSection />
            <ContentSection />
          </>
        ) : (
          <>
            <ContentSection />
            <MediaSection />
          </>
        )}
      </div>
    </div>
  );
}