import { supabase } from "../lib/supabase";

export const getRestaurants = async () => {
  const { data, error } = await supabase
    .from("yumroll-data")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const addRestaurant = async (restaurant) => {
  await supabase.from("yumroll-data").insert([restaurant]);
};

export const deleteRestaurant = async (id) => {
  const { error } = await supabase.from("restaurants").delete().eq("id", id);

  if (error) {
    console.error(error);
  }
};
