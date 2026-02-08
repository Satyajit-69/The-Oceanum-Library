import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
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
    <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full overflow-hidden">
      {videoUrl ? (
        <div className="relative w-full h-full group/video">
          <video
            src={videoUrl}
            className="w-full h-full object-cover transition-transform duration-700"
            autoPlay={isVideoPlaying}
            loop
            muted
            playsInline
          />
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 group-hover/video:opacity-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoPlaying(true);
                }}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white/95 shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300"
              >
                <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
              </button>
            </div>
          )}
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-8xl font-bold text-white/90">{title[0]}</span>
        </div>
      )}

      
    </div>
  );

  const ContentSection = () => (
    <div className="relative w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white">
      {/* Content Container */}
      <div className="space-y-6 relative z-10">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold w-fit">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Featured
        </div>

        {/* Title */}
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
          {desc}
        </p>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:gap-4 w-fit"
        >
          <span>Explore Now</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>

        {/* Feature Highlights */}
        <div className="flex gap-6 pt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Live Demo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Interactive</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-0 group-hover:bg-blue-300/30 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl -z-0 group-hover:bg-purple-300/30 transition-colors duration-700" />
    </div>
  );

  return (
    <div
      onClick={() => navigate(route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white min-h-[500px] lg:min-h-[600px] flex flex-col lg:flex-row"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute inset-[3px] bg-white rounded-3xl" />

      {/* Content Layout Based on Position */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
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

      {/* Hover Glow Effect
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 transition-all duration-700 pointer-events-none rounded-3xl" /> */}
    </div>
  );
}