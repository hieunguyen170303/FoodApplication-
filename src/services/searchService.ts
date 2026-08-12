import { IMAGES } from "@/constants";
import { GridFoodItem, Restaurant } from "@/types";

export const MOCK_GRID_FOODS: GridFoodItem[] = [
  {
    id: "g1",
    name: "Wendy's Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: IMAGES.burgerOne,
  },
  {
    id: "g2",
    name: "Veggie Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: IMAGES.burgerTwo,
  },
  {
    id: "g3",
    name: "Margherita Magic",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: IMAGES.pizzaOne,
  },
  {
    id: "g4",
    name: "Veggie Delight",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: IMAGES.pizzaOne,
  },
  {
    id: "g5",
    name: "Chicken Wrap",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burrito",
    image: IMAGES.burrito,
  },
  {
    id: "g6",
    name: "Big Beef Burrito",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burrito",
    image: IMAGES.burrito,
  },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Gà Rán sốt Hàn Quốc - Gold Chicken",
    logo: IMAGES.burgerOne,
    rating: 4.9,
    reviewCount: "213",
    category: "Gà Rán Hàn Quốc",
    priceRange: "$$$",
    originalDeliveryFee: "49.000đ",
    deliveryFee: "37.000đ",
    deliveryTime: "40 phút trở lên",
    isSponsored: true,
    tag: "Quán trứ danh Grab",
    voucherBadge: "Giảm 13.000đ",
    minOrder: "Đơn hàng từ 70.000đ",
  },
  {
    id: "r2",
    name: "Jollibee - TTTM Coopmart Bình Dương",
    logo: IMAGES.logo,
    rating: 4.4,
    reviewCount: "7K+",
    category: "Món Philippin",
    priceRange: "$$$",
    originalDeliveryFee: "38.000đ",
    deliveryFee: "26.000đ",
    deliveryTime: "41 phút trở lên",
    voucherBadge: "Giảm 12.000đ phí giao hàng",
    minOrder: "Đơn hàng từ 70.000đ",
  },
  {
    id: "r3",
    name: "KFC - Tòa Nhà Sora Gardens SC",
    logo: IMAGES.burgerTwo,
    rating: 4.3,
    reviewCount: "2K+",
    category: "Gà Rán & Burger",
    priceRange: "$$$",
    originalDeliveryFee: "10.000đ",
    deliveryFee: "Miễn phí",
    deliveryTime: "21 phút trở lên",
    voucherBadge: "Giảm 103.000đ",
    minOrder: "Xô Chất Chill 289k",
  },
  {
    id: "r4",
    name: "Lotteria - Midori Park Bình Dương",
    logo: IMAGES.pizzaOne,
    rating: 4.4,
    reviewCount: "560",
    category: "Thức Ăn Nhanh",
    priceRange: "$$$",
    originalDeliveryFee: "12.000đ",
    deliveryFee: "Miễn phí",
    deliveryTime: "22 phút trở lên",
    voucherBadge: "Giảm 12.000đ",
    minOrder: "Áp dụng nhiều mã",
  },
];

export const getSearchCategories = (): string[] => [
  "All",
  "Burgers",
  "Pizza",
  "Burrito",
  "Drinks",
  "Desserts",
];

export const searchFoodsAndStores = async (
  query: string,
  category: string
): Promise<{ foods: GridFoodItem[]; restaurants: Restaurant[] }> => {
  let foods = MOCK_GRID_FOODS;
  let restaurants = MOCK_RESTAURANTS;

  // Filter by category
  if (category && category !== "All") {
    foods = foods.filter(
      (f) => f.category.toLowerCase() === category.toLowerCase()
    );
    restaurants = restaurants.filter(
      (r) =>
        r.category.toLowerCase().includes(category.toLowerCase()) ||
        r.name.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Filter by query
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    foods = foods.filter((f) => f.name.toLowerCase().includes(q));
    restaurants = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }

  return { foods, restaurants };
};
