import { useState, useEffect } from "react";
import { getCategories, getFeaturedFoods, getHeroPromo } from "@/services/foodService";
import { FoodCategory, FoodItem } from "@/types";

export function useFood() {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [featuredFoods, setFeaturedFoods] = useState<FoodItem[]>([]);
  const [heroPromo, setHeroPromo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, foods, promo] = await Promise.all([
          getCategories(),
          getFeaturedFoods(),
          getHeroPromo(),
        ]);
        setCategories(cats);
        setFeaturedFoods(foods);
        setHeroPromo(promo);
      } catch (error) {
        console.error("Error loading food data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { categories, featuredFoods, heroPromo, loading };
}
