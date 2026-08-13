import { CATEGORIES, HERO_PROMO, IMAGES } from "@/constants";
import { FoodCategory, FoodItem } from "@/types";

export const getCategories = async (): Promise<FoodCategory[]> => {
  return CATEGORIES;
};

export const getHeroPromo = async () => {
  return HERO_PROMO;
};

export const getFeaturedFoods = async (): Promise<FoodItem[]> => {
  return [
    {
      id: "1",
      name: "Double Beef Cheese Burger",
      description: "Juicy double beef patty with melted cheddar, fresh lettuce, and special sauce.",
      price: 10.88,
      rating: 4.9,
      prepTime: "15-20 min",
      calories: "450 kcal",
      category: "burgers",
      image: IMAGES.burgerOne,
      isPopular: true,
    },
    {
      id: "2",
      name: "Supreme Feast Pizza",
      description: "Loaded with pepperoni, mozzarella, bell peppers, olives, and fresh basil.",
      price: 12.5,
      rating: 4.8,
      prepTime: "20-25 min",
      calories: "680 kcal",
      category: "pizza",
      image: IMAGES.pizzaOne,
      isPopular: true,
    },
    {
      id: "3",
      name: "Beef Loaded Burrito",
      description: "Stuffed with seasoned beef, Mexican rice, black beans, salsa, and sour cream.",
      price: 7.5,
      rating: 4.7,
      prepTime: "10-15 min",
      calories: "520 kcal",
      category: "burrito",
      image: IMAGES.burrito,
      isPopular: true,
    },
  ];
};
