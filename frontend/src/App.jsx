import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RagChat from "./pages/RagChat";
import VoiceMemo from "./pages/VoiceMemo";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rag" element={<RagChat />} />
        <Route path="/voice-memo" element={<VoiceMemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
