import { useState, useEffect } from "react";
import {
  Brain,
  Mic,
  Database,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

function About() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const agents = [
    {
      id: "lexa",
      name: "Lexa",
      title: "RAG Intelligence Agent",
      icon: Database,
      gradient: "from-cyan-500 via-blue-500 to-purple-600",
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

  return (
    <div className="min-h-screen relative text-blue-900 overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
        }}
      ></div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div
          className="text-center mb-24"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 border border-blue-300 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Neural Intelligence Platform
            </span>
          </div>

          <h1 className="text-7xl font-bold mb-6 bg-white bg-clip-text text-transparent">
            Oceanum AI Library
          </h1>

          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Welcome to the next evolution of artificial intelligence. Oceanum
            powers your applications with cutting-edge neural agents designed
            for the age of ambient computing and human-AI symbiosis.
          </p>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { label: "Processing Speed", value: "2.4ms", icon: Zap },
            { label: "Accuracy Rate", value: "99.7%", icon: Brain },
            { label: "Security Level", value: "Military", icon: Shield },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 hover:scale-105 shadow-lg overflow-hidden"
            >
              {/* Animated Background on Hover */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Gradient Sweep Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Content */}
              <div className="relative z-10">
                <stat.icon className="w-8 h-8 text-cyan-400 group-hover:text-white mb-3 transition-colors duration-500 group-hover:scale-110 transform transition-transform" />
                <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transform transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Agents Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-bold text-center mb-4 bg-white bg-clip-text text-transparent">
            Meet Your AI Agents
          </h2>
          <p className="text-center text-blue-600 mb-16 text-lg">
            Two specialized intelligences, one unified ecosystem
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="group relative p-8 rounded-3xl bg-white border border-blue-200 backdrop-blur-sm hover:border-blue-400 transition-all duration-500 cursor-pointer shadow-lg"
                onMouseEnter={() => setActiveAgent(agent.id)}
                onMouseLeave={() => setActiveAgent(null)}
                style={{
                  transform:
                    activeAgent === agent.id ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Gradient Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="relative">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${agent.gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <agent.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    {agent.name}
                  </h3>

                  <div
                    className={`text-sm font-semibold mb-4 bg-gradient-to-r ${agent.gradient} bg-clip-text text-transparent`}
                  >
                    {agent.title}
                  </div>

                  <p className="text-blue-700 mb-6 leading-relaxed">
                    {agent.description}
                  </p>

                  <button
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-xl bg-black text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                    onClick={() => (window.location.href = agent.redirectUrl)}
                  >
                    Try it Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>

                  <div className="space-y-3">
                    {agent.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${agent.gradient}`}
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

        {/* Technology Section */}
        <div className="text-center p-12 rounded-3xl bg-white border border-blue-200 backdrop-blur-sm shadow-lg">
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
            {[
              "Neural Architecture",
              "Quantum Computing",
              "Edge AI",
              "Zero-Trust Security",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full bg-blue-100 border border-blue-300 text-blue-700 text-sm font-semibold backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
