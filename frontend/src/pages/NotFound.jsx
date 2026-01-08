import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500">Go Home</Link>
    </div>
  );
}
