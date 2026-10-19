import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "lenis/dist/lenis.css";
import useLenis from "./hooks/useLenis";
import Home from "./pages/Home";
import RagChat from "./pages/RagChat";
import VoiceMemo from "./pages/VoiceMemo";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import LearnMore from "./pages/LearnMore";

export default function App() {
  const lenis = useLenis();
  const { pathname } = useLocation();

  // Reset scroll on route change
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rag" element={<RagChat />} />
        <Route path="/voice-memo" element={<VoiceMemo />} />
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}