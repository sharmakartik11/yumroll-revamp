export default function RestaurantCard({ restaurant, onDelete }) {
  const currentUser = localStorage.getItem("currentUser");

  const handleDelete = () => {
    onDelete(restaurant.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-lg">{restaurant.name}</h2>

        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-1">
          {restaurant.cuisine}
        </span>

        <p className="text-xs text-gray-400 mt-1">
          Added by {restaurant.added_by}
        </p>
      </div>

      {restaurant.added_by === currentUser && (
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
