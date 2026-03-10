import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/storage";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) return;
    saveUser(name);
    localStorage.setItem("currentUser", name);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h1 className="text-xl font-semibold mb-4">YumRoll</h1>

        <input
          className="border w-full p-2 rounded mb-4"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-black text-white w-full py-2 rounded"
          onClick={handleLogin}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
