import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Mic,
  Database,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Waves,
  Globe,
  Code,
  Lock,
} from "lucide-react";

function About() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const agents = [
    {
      id: "lexa",
      name: "Lexa",
      title: "RAG Intelligence Agent",
      icon: Database,
      gradient: "from-cyan-500 via-blue-500 to-purple-600",
      glowColor: "rgba(6, 182, 212, 0.3)",
      description:
        "Neural retrieval-augmented generation system with quantum-enhanced semantic search",
      features: [
        "Multi-modal document understanding",
        "Real-time knowledge graph synthesis",
        "Context-aware response generation",
        "Adaptive learning from interactions",
      ],
      redirectUrl: "/rag",
    },
    {
      id: "meeku",
      name: "Meeku",
      title: "Voice Intelligence Agent",
      icon: Mic,
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      glowColor: "rgba(168, 85, 247, 0.3)",
      description:
        "Advanced conversational AI with emotion recognition and natural language mastery",
      features: [
        "Ultra-low latency voice processing",
        "Sentiment-aware responses",
        "Multi-language neural translation",
        "Contextual conversation memory",
      ],
      redirectUrl: "/voice-memo",
    },
  ];

  const technologies = [
    { name: "Neural Architecture", icon: Brain },
    { name: "Quantum Computing", icon: Sparkles },
    { name: "Edge AI", icon: Globe },
    { name: "Zero-Trust Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen relative text-blue-900 overflow-hidden">
      {/* Enhanced Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1530053969600-caed2596d242?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          transform: `scale(${1 + scrollY * 0.0001})`,
        }}
      ></div>

      

      

      {/* Animated Background Orbs with Enhanced Movement */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 text-white rounded-full blur-3xl"
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"
          style={{
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl"
          style={{
            animation: "float 12s ease-in-out infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Hero Section with Enhanced Animations */}
        <div
          ref={(el) => (sectionRefs.current.hero = el)}
          data-section="hero"
          className={`text-center mb-24 transition-all duration-1000 ${
            isVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 border border-blue-300 mb-8 backdrop-blur-sm animate-bounce-slow hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-blue-600 animate-spin-slow" />
            <span className="text-sm font-semibold text-blue-700">
              Neural Intelligence Platform
            </span>
          </div>

          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent animate-gradient-x">
            Oceanum AI Library
          </h1>

          <div className="relative inline-block">
            <Waves className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 animate-pulse"></div>
          </div>

          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Welcome to the next evolution of artificial intelligence. Oceanum
            powers your applications with cutting-edge neural agents designed
            for the age of ambient computing and human-AI symbiosis.
          </p>
        </div>

        {/* Stats Section with Enhanced Hover Effects */}
        <div
          ref={(el) => (sectionRefs.current.stats = el)}
          data-section="stats"
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 transition-all duration-1000 delay-200 ${
            isVisible.stats
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { label: "Processing Speed", value: "2.4ms", icon: Zap },
            { label: "Accuracy Rate", value: "99.7%", icon: Brain },
            { label: "Security Level", value: "Military", icon: Shield },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden"
              style={{
                animation: `slide-up 0.6s ease-out ${i * 0.1}s backwards`,
              }}
            >
              {/* Rotating Border Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow blur-sm"></div>
                <div className="absolute inset-[2px] bg-gray-900 rounded-2xl"></div>
              </div>

           
              <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <stat.icon className="w-8 h-8 text-cyan-400 group-hover:text-white mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 transform" />
                <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transform transition-transform duration-500 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors duration-500">
                  {stat.label}
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* AI Agents Section with Advanced Animations */}
        <div
          ref={(el) => (sectionRefs.current.agents = el)}
          data-section="agents"
          className={`mb-24 transition-all duration-1000 delay-300 ${
            isVisible.agents
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent animate-gradient-x">
              Meet Your AI Agents
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto mb-4 rounded-full animate-pulse"></div>
            <p className="text-blue-100 text-lg">
              Two specialized intelligences, one unified ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="group relative p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200 hover:border-blue-400 transition-all duration-500 cursor-pointer shadow-2xl overflow-hidden"
                onMouseEnter={() => setActiveAgent(agent.id)}
                onMouseLeave={() => setActiveAgent(null)}
                style={{
                  transform:
                    activeAgent === agent.id
                      ? "scale(1.03) translateY(-8px)"
                      : "scale(1)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: `slide-in-${index % 2 === 0 ? "left" : "right"} 0.8s ease-out ${index * 0.2}s backwards`,
                }}
              >
                {/* Animated Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-700`}
                ></div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${agent.glowColor}, transparent 70%)`,
                  }}
                ></div>

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} blur-xl`}
                  ></div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} animate-border-spin`}
                  ></div>
                  <div className="absolute inset-[3px] bg-white rounded-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Pulse Effect */}
                  <div className="relative inline-block mb-6">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}
                    ></div>
                    <div
                      className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${agent.gradient} group-hover:scale-110 transition-all duration-500 shadow-lg`}
                    >
                      <agent.icon className="w-8 h-8 text-white animate-float" />
                    </div>
                  </div>

                  <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    {agent.name}
                  </h3>

                  <div
                    className={`text-sm font-semibold mb-4 bg-gradient-to-r ${agent.gradient} bg-clip-text text-transparent`}
                  >
                    {agent.title}
                  </div>

                  <p className="text-blue-700 mb-6 leading-relaxed group-hover:text-blue-800 transition-colors duration-300">
                    {agent.description}
                  </p>

                  {/* Enhanced Button */}
                  <button
                    className={`group/btn relative inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-xl bg-gradient-to-r ${agent.gradient} text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden`}
                    onClick={() => (window.location.href = agent.redirectUrl)}
                  >
                    <span className="relative z-10">Try it Now</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    
                    {/* Button Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                  </button>

                  {/* Features with Stagger Animation */}
                  <div className="space-y-3">
                    {agent.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm group-hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.gradient} animate-pulse`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        ></div>
                        <span className="text-blue-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Technology Section */}
        <div
          ref={(el) => (sectionRefs.current.tech = el)}
          data-section="tech"
          className={`text-center p-12 rounded-3xl bg-white/95 backdrop-blur-md border border-blue-200 shadow-2xl relative overflow-hidden transition-all duration-1000 delay-400 ${
            isVisible.tech
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-xy"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Code className="w-16 h-16 mx-auto mb-6 text-blue-600 animate-bounce-slow" />
            
            <h3 className="text-3xl font-bold mb-6 text-blue-900">
              Built for Tomorrow, Available Today
            </h3>
            
            <p className="text-blue-700 max-w-3xl mx-auto leading-relaxed text-lg mb-8">
              Oceanum leverages transformer-based architectures, neural memory
              networks, and adaptive learning to deliver unprecedented
              performance. Our agents don't just process information—they
              understand context, learn from interactions, and evolve with your
              needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-300 text-blue-700 text-sm font-semibold backdrop-blur-sm hover:scale-110 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    animation: `pop-in 0.5s ease-out ${i * 0.1}s backwards`,
                  }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center gap-2">
                    <tech.icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(10px, -10px); opacity: 0.7; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-border-spin {
          animation: border-spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default About;