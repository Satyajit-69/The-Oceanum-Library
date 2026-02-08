import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="/404.svg" alt="page not found" className="h-full" />

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white rounded-md text-2xl p-6 hover:text-yellow-300"
      >
        Back to Home
      </button>
    </div>
  );
}
