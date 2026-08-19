import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getSearchCategories,
  searchFoodsAndStores,
} from "@/services/searchService";
import { GridFoodItem, Restaurant } from "@/types";

export type SearchViewMode = "categories" | "results";

export function useSearch() {
  const params = useLocalSearchParams<{ category?: string; q?: string }>();
  const initialCategory = params.category || "All";
  const initialQuery = params.q || "";

  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [viewMode, setViewMode] = useState<SearchViewMode>(initialQuery ? "results" : "categories");
  const [categoriesList] = useState<string[]>(getSearchCategories());
  const [foods, setFoods] = useState<GridFoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync route params when navigating
  useEffect(() => {
    if (params.category) setSelectedCategory(params.category);
    if (params.q) {
      setQuery(params.q);
      setViewMode("results");
    }
  }, [params.category, params.q]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await searchFoodsAndStores(query, selectedCategory);
        setFoods(res.foods);
        setRestaurants(res.restaurants);

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
    setSelectedCategory("All");
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
