import { useState } from "react";
import { addRestaurant } from "../utils/api.js";
import { cuisines } from "../data/cuisines.js";

export default function AddRestaurantForm({ refresh }) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [weight, setWeight] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    await addRestaurant({
      name,
      cuisine,
      weight,
      added_by: localStorage.getItem("currentUser"),
    });

    setName("");
    setCuisine("");
    setWeight(1);

    setLoading(false);

    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <select
        className="border p-2 w-full rounded"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      >
        <option value="">Select cuisine</option>

        {cuisines.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="5"
        className="border p-2 w-full rounded"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Add Restaurant
      </button>
    </form>
  );
}
