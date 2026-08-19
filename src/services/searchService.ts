import { IMAGES } from "@/constants";
import { GridFoodItem, Restaurant } from "@/types";

export const MOCK_GRID_FOODS: GridFoodItem[] = [
  {
    id: "g1",
    restaurantId: "r1",
    name: "Wendy's Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: IMAGES.burgerOne,
  },
  {
    id: "g2",
    restaurantId: "r2",
    name: "Veggie Burger",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burgers",
    image: IMAGES.burgerTwo,
  },
  {
    id: "g3",
    restaurantId: "r3",
    name: "Margherita Magic",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: IMAGES.pizzaOne,
  },
  {
    id: "g4",
    restaurantId: "r3",
    name: "Veggie Delight",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Pizza",
    image: IMAGES.pizzaOne,
  },
  {
    id: "g5",
    restaurantId: "r1",
    name: "Chicken Wrap",
    price: 10.4,
    startingPriceText: "From $10.4",
    category: "Burrito",
    image: IMAGES.burrito,
  },
  {
    id: "g6",
    restaurantId: "r2",
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
    name: "Burger King - Thủ Dầu Một",
    logo: IMAGES.burgerOne,
    rating: 4.9,
    reviewCount: "213",
    category: "Burgers & Thức ăn nhanh",
    priceRange: "$$$",
    originalDeliveryFee: "49.000đ",
    deliveryFee: "37.000đ",
    deliveryTime: "40 phút trở lên",
    isSponsored: true,
    tag: "Quán trứ danh",
    voucherBadge: "Giảm 13.000đ",
    minOrder: "Đơn hàng từ 70.000đ",
  },
  {
    id: "r2",
    name: "Jollibee - TTTM Coopmart Bình Dương",
    logo: IMAGES.logo,
    rating: 4.4,
    reviewCount: "7K+",
    category: "Burgers & Gà Rán",
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
    category: "Pizza & Gà Rán",
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
    category: "Burrito & Thức Ăn Nhanh",
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
  try {
    const params = new URLSearchParams();
    if (query.trim()) params.append("q", query.trim());
    if (category && category !== "All" && category !== "Tất cả") params.append("category", category);

    const res = await fetch(`http://localhost:5000/api/search?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        // Map backend images to local IMAGES
        const foods = (data.data.foods || []).map((f: any) => ({
          ...f,
          image: IMAGES[f.image as keyof typeof IMAGES] || IMAGES.burgerOne,
        }));
        const restaurants = (data.data.restaurants || []).map((r: any) => ({
          ...r,
          logo: IMAGES[r.logo as keyof typeof IMAGES] || IMAGES.logo,
        }));
        if (foods.length > 0 || restaurants.length > 0) {
          return { foods, restaurants };
        }
      }
    }
  } catch (e) {
    console.warn("API Search fallback to local filtering");
  }

  // Fallback client filtering
  let foods = MOCK_GRID_FOODS;
  let restaurants = MOCK_RESTAURANTS;

  if (category && category !== "All" && category !== "Tất cả") {
    foods = foods.filter(
      (f) => f.category.toLowerCase() === category.toLowerCase()
    );
    restaurants = restaurants.filter(
      (r) =>
        r.category.toLowerCase().includes(category.toLowerCase()) ||
        r.name.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    foods = foods.filter((f) => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    restaurants = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }

  return { foods, restaurants };
};
