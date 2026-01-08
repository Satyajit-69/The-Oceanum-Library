import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

export default function FeatureCard({ 
  title, 
  desc, 
  route, 
  videoUrl, 
  imageUrl,
  layout = "left" // "left" or "right" - determines video/image position
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const MediaSection = () => (
    <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
      {videoUrl ? (
        <div className="relative w-full h-full group">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-70 group-hover:opacity-0 group-hover:scale-150 transition-all duration-500" />
          </div>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-6xl font-bold opacity-20">{title[0]}</div>
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );

  const ContentSection = () => (
    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6 text-lg">
        {desc}
      </p>
      
      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
        <span>Explore Now</span>
        <ArrowRight 
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isHovered ? 'translate-x-2' : ''
          }`} 
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
    </div>
  );

  return (
    <div
      onClick={() => navigate(route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-400 transition-all duration-500 bg-white hover:scale-[1.02] min-h-[400px] flex flex-col lg:flex-row"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/50 group-hover:to-blue-50/50 transition-all duration-700"></div>
      
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

      {/* Hover Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
    </div>
  );
}


