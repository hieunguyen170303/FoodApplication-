import { useState, useEffect } from "react";
import {
  getSearchCategories,
  searchFoodsAndStores,
} from "@/services/searchService";
import { GridFoodItem, Restaurant } from "@/types";

export type SearchViewMode = "categories" | "results";

export function useSearch() {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<SearchViewMode>("categories");
  const [categoriesList] = useState<string[]>(getSearchCategories());
  const [foods, setFoods] = useState<GridFoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await searchFoodsAndStores(query, selectedCategory);
        setFoods(res.foods);
        setRestaurants(res.restaurants);

        // Auto switch to restaurant list results if user typed a query
        if (query.trim().length > 0) {
          setViewMode("results");
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, selectedCategory]);

  const clearQuery = () => {
    setQuery("");
    setViewMode("categories");
  };

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    categoriesList,
    foods,
    restaurants,
    loading,
    clearQuery,
  };
}
