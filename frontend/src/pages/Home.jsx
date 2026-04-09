import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-zinc-100">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Floating Blobs (Greyscale) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-zinc-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Animated Wave Background (Monochrome) */}
      <div className="fixed inset-0 z-0 opacity-20">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 690"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out"
          preserveAspectRatio="none"
          style={{ height: "100vh" }}
        >
          <style>
            {`
              @keyframes pathAnim-0 {
                0%, 100% {
                  d: path("M 0,700 L 0,131 C 81.68,111.29 163.36,91.57 301,84 C 438.64,76.43 632.25,81 776,78 C 919.75,75 1013.64,64.43 1116,72 C 1218.36,79.57 1329.18,105.29 1440,131 L 1440,700 L 0,700 Z");
                }
                50% {
                  d: path("M 0,700 L 0,131 C 142.71,147.93 285.43,164.86 398,167 C 510.57,169.14 593,156.5 720,153 C 847,149.5 1018.57,155.14 1146,153 C 1273.43,150.86 1356.71,140.93 1440,131 L 1440,700 L 0,700 Z");
                }
              }
              .path-0 {
                animation: pathAnim-0 8s ease-in-out infinite;
              }
            `}
          </style>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff"></stop>
              <stop offset="100%" stopColor="#888888"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,131 C 81.68,111.29 163.36,91.57 301,84 C 438.64,76.43 632.25,81 776,78 C 919.75,75 1013.64,64.43 1116,72 C 1218.36,79.57 1329.18,105.29 1440,131 L 1440,700 L 0,700 Z"
            stroke="none"
            fill="url(#gradient)"
            fillOpacity="0.1"
            className="path-0"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="pt-20 pb-16 px-8">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full text-zinc-300 text-sm font-medium mb-6 shadow-xl animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-100"></span>
              </span>
              Now Live
            </div>

            <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 drop-shadow-lg leading-tight tracking-tight">
              The Oceanum
            </h1>

            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-zinc-500 to-zinc-700 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
              AI Library 🐬
            </div>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              Dive deep into the future of artificial intelligence
              <br />
              <span className="text-white font-medium">
                Empowering innovation with neural intelligence agents
              </span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center bg-zinc-900/50 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-zinc-800/50 transition-all hover:bg-zinc-800/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  3+
                </div>
                <div className="text-sm text-zinc-500 font-medium mt-1">
                  AI Features
                </div>
              </div>
              <div className="text-center bg-zinc-900/50 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-zinc-800/50 transition-all hover:bg-zinc-800/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  ∞
                </div>
                <div className="text-sm text-zinc-500 font-medium mt-1">
                  Possibilities
                </div>
              </div>
              <div className="text-center bg-zinc-900/50 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-zinc-800/50 transition-all hover:bg-zinc-800/50">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-zinc-500 font-medium mt-1">
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-8 pb-20">
          <div className="grid gap-8 max-w-full mx-auto">
            <FeatureCard
              title="RAG Intelligence"
              desc="Experience next-generation retrieval-augmented generation with quantum-enhanced semantic search capabilities. Upload your documents and chat with them using advanced AI. Our sophisticated natural language processing algorithms understand context and deliver precise answers from your document library. Perfect for research, legal documents, technical manuals, and knowledge management systems."
              route="/rag"
              imageUrl="/innovation-animate.svg"
              layout="left"
            />

            <FeatureCard
              title="Voice AI Assistant"
              desc="Advanced conversational AI with emotion recognition and ultra-low latency voice processing. Natural voice interactions powered by cutting-edge speech technology. Our voice assistant understands context, responds naturally, and adapts to your speaking style. Features real-time transcription, multi-language support, and seamless integration with your workflow for hands-free productivity."
              route="/voice-memo"
              imageUrl="/voice-chat-animate.svg"
              layout="right"
            />

            <FeatureCard
              title="Upload Documents"
              desc="Support for RTF files up to 10MB with our intuitive drag-and-drop interface. Easily upload and manage your documents with batch processing capabilities. Our intelligent file processing system extracts text, maintains formatting, and indexes content for instant retrieval. Process multiple files simultaneously for efficient workflow management. Secure cloud storage with encryption ensures your documents remain private and protected."
              route="/upload"
              imageUrl="/upload-animate.svg"
              layout="left"
            />

            <FeatureCard
              title="AI Playground"
              desc="Experiment with multiple AI models in a sandbox environment. Test, compare, and fine-tune various AI capabilities in real-time with interactive controls and comprehensive testing tools. Our playground features state-of-the-art language models, image generation, code completion, and more. Perfect for developers, researchers, and AI enthusiasts who want to explore the cutting edge of artificial intelligence without complex setup."
              route="/playground"
              imageUrl="/playground.svg"
              layout="right"
            />
            <FeatureCard
              title="CodePilot Agent"
              desc="An intelligent Cursor-style coding agent that converts natural language into real, structured code and files. CodePilot understands developer intent, generates complete implementations, and safely writes files with explicit user confirmation. Built for reliable AI-assisted development with full transparency and control."
              route="/codepilot"
              imageUrl="/code-agent-animate.svg"
              layout="left"
            />

            <FeatureCard
              title="DeepThink Engine"
              desc="A transparent AI reasoning engine that analyzes problems step by step before responding. DeepThink validates logic, exposes structured thinking, and delivers accurate, explainable answers. Perfect for debugging, research, and complex decision-making where understanding the reasoning matters as much as the result."
              route="/deepthink"
              imageUrl="/thinking-animate.svg"
              layout="right"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-8 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 bg-zinc-900/60 backdrop-blur-lg border border-zinc-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-transparent pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent relative z-10 tracking-tight">
              Ready to dive in?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto relative z-10">
              Join the future of AI-powered solutions and unlock unlimited
              potential
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4 relative z-10">
              <a
                href="/about"
                className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Get Started Free
              </a>
              <a
                href="/learnmore"
                className="px-8 py-4 bg-zinc-900 backdrop-blur-sm border-2 border-zinc-700 text-zinc-300 rounded-full font-semibold text-lg hover:bg-zinc-800 hover:text-white transition-all duration-300 shadow-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>
    </div>
  );
}
