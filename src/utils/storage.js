const USERS_KEY = "users";
const RESTAURANTS_KEY = "restaurants";
const HISTORY_KEY = "restaurantHistory";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const saveUser = (username) => {
  const users = getUsers();
  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const getRestaurants = () => {
  return JSON.parse(localStorage.getItem(RESTAURANTS_KEY)) || [];
};

export const saveRestaurant = (restaurant) => {
  const restaurants = getRestaurants();
  restaurants.push(restaurant);
  localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
};

export const deleteRestaurant = (id) => {
  const restaurants = getRestaurants().filter((r) => r.id !== id);
  localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
};

export const restaurantExists = (name) => {
  const restaurants = getRestaurants();

  return restaurants.find(
    (r) => r.name.trim().toLowerCase() === name.trim().toLowerCase(),
  );
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
};

export const addToHistory = (restaurant) => {
  const history = getHistory();

  const updated = [
    { ...restaurant, pickedAt: new Date().toISOString() },
    ...history,
  ];

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};
