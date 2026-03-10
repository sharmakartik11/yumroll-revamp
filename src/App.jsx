import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pool from "./pages/Pool";
import Randomizer from "./pages/Randomizer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/random" element={<Randomizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
