import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { getRestaurants } from "../utils/api";
import { supabase } from "../lib/supabase";
import confetti from "canvas-confetti";

export default function Randomizer() {
  const [restaurants, setRestaurants] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data || []);
    };

    loadRestaurants();

    const channel = supabase
      .channel("restaurants-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "restaurants",
        },
        () => {
          loadRestaurants();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  //   const truncate = (text, max = 14) =>
  //     text.length > max ? text.slice(0, max - 1) + "…" : text;

  const colors = restaurants.map((_, i) =>
    i % 2 === 0 ? "#f3f4f6" : "#e5e7eb",
  );

  const getWheelFontSize = (count) => {
    if (count <= 5) return 22;
    if (count <= 10) return 18;
    if (count <= 20) return 14;
    return 12;
  };

  const wheelData = restaurants.map((r) => ({
    option: r.name,
  }));

  const spinWheel = () => {
    if (restaurants.length === 0) return;

    const newIndex = Math.floor(Math.random() * restaurants.length);

    setPrizeIndex(newIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setShowWinner(true);

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-semibold mb-6">Restaurant Wheel</h1>

      {restaurants.length > 0 ? (
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={wheelData}
          backgroundColors={colors}
          textColors={["#000"]}
          textDistance={50}
          fontSize={getWheelFontSize(restaurants.length)}
          onStopSpinning={handleStopSpinning}
        />
      ) : (
        <p className="text-gray-500">No restaurants added yet</p>
      )}

      <button
        onClick={spinWheel}
        disabled={mustSpin || restaurants.length === 0}
        className="mt-8 bg-black text-white px-10 py-4 rounded-2xl text-lg hover:scale-105 transition disabled:opacity-40"
      >
        🎡 YumRoll It!
      </button>

      {/* Winner Modal */}
      {showWinner && restaurants[prizeIndex] && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 shadow-xl text-center max-w-sm">
            <p className="text-gray-500 text-sm mb-2">Tonight we eat at</p>

            <h2 className="text-3xl font-bold mb-2">
              {restaurants[prizeIndex].name}
            </h2>

            <p className="text-gray-500 mb-6">
              {restaurants[prizeIndex].cuisine}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Suggested by {restaurants[prizeIndex].added_by}
            </p>

            <button
              onClick={() => setShowWinner(false)}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Nice 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
