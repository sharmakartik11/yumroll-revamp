import { useEffect, useState } from "react";
import { getRestaurants, deleteRestaurant } from "../utils/api";
import RestaurantCard from "../components/RestaurantCard";
import { supabase } from "../lib/supabase";

export default function Pool() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data || []);
    };

    loadRestaurants();

    const channel = supabase
      .channel("restaurants-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "restaurants",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRestaurants((prev) => [payload.new, ...prev]);
          }

          if (payload.eventType === "DELETE") {
            setRestaurants((prev) =>
              prev.filter((r) => r.id !== payload.old.id),
            );
          }

          if (payload.eventType === "UPDATE") {
            setRestaurants((prev) =>
              prev.map((r) => (r.id === payload.new.id ? payload.new : r)),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id) => {
    await deleteRestaurant(id);

    // instant UI update
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Restaurant Pool</h1>

      <div className="space-y-3">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
