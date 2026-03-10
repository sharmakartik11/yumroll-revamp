import { getHistory } from "./storage";

export const weightedRandom = (restaurants) => {
  const history = getHistory();
  const lastPick = history[0];

  let available = restaurants;

  if (lastPick) {
    available = restaurants.filter((r) => r.name !== lastPick.name);
  }

  const pool = [];

  available.forEach((r) => {
    const weight = r.weight || 1;
    for (let i = 0; i < weight; i++) {
      pool.push(r);
    }
  });

  return pool[Math.floor(Math.random() * pool.length)];
};
