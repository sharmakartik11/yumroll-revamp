import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-semibold text-lg">🍜 YumRoll</h1>

        <div className="flex gap-6 text-sm items-center">
          <Link to="/dashboard" className="text-gray-600 hover:text-black">
            Dashboard
          </Link>

          <Link to="/pool" className="text-gray-600 hover:text-black">
            Pool
          </Link>

          <Link to="/random" className="text-gray-600 hover:text-black">
            Random
          </Link>
          <span className="text-gray-400 text-xs">{user}</span>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
