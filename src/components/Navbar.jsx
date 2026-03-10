import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-semibold text-lg">🍜 YumRoll</h1>

        <div className="flex gap-6 text-sm">
          <Link to="/dashboard" className="hover:text-black text-gray-600">
            Dashboard
          </Link>

          <Link to="/pool" className="hover:text-black text-gray-600">
            Pool
          </Link>

          <Link to="/random" className="hover:text-black text-gray-600">
            Random
          </Link>
        </div>
      </div>
    </nav>
  );
}
