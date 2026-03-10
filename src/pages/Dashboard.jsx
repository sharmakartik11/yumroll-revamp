import { useState, useEffect } from "react";
import { getRestaurants } from "../utils/api";
import AddRestaurantForm from "../components/AddRestaurantForm";
import RestaurantCard from "../components/RestaurantCard";

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);

  //   const load = async () => {
  //     const data = await getRestaurants();
  //     setRestaurants(data);
  //   };

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };

    loadRestaurants();
  }, []);
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Add Restaurant</h2>

      <AddRestaurantForm />

      <div className="mt-8">
        <h3 className="font-medium mb-3">Current List of Restaurants</h3>
        <div className="space-y-3 mt-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
