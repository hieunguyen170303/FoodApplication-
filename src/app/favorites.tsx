import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ICONS, IMAGES } from "@/constants";

export default function FavoritesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"RESTAURANTS" | "FOODS">("RESTAURANTS");

  const [favRestaurants, setFavRestaurants] = useState([
    {
      id: "r1",
      name: "Jollibee - EC Nguyễn Du",
      branch: "Hùng Vương, Thủ Dầu Một",
      logo: IMAGES.logo,
      rating: 4.8,
      reviewCount: "1.2k+",
      deliveryFee: "15.000đ",
      deliveryTime: "20 phút",
      tag: "GÀ RÁN & BURGER",
    },
    {
      id: "r2",
      name: "KFC - Tòa Nhà Sora Gardens SC",
      branch: "Phường Phú Hòa, Thủ Dầu Một",
      logo: IMAGES.burgerTwo,
      rating: 4.9,
      reviewCount: "2.5k+",
      deliveryFee: "18.000đ",
      deliveryTime: "25 phút",
      tag: "COMBO TIẾT KIỆM",
    },
  ]);

  const [favFoods, setFavFoods] = useState([
    {
      id: "f1",
      name: "Combo 1 Miếng Gà Giòn + Mỳ Ý Jolly",
      restaurantName: "Jollibee - EC Nguyễn Du",
      price: 78000,
      image: IMAGES.burgerOne,
      rating: 4.9,
    },
    {
      id: "f2",
      name: "Burger Bò Tôm Phô Mai Hai Lớp",
      restaurantName: "Lotteria - Midori Park",
      price: 65000,
      image: IMAGES.pizzaOne,
      rating: 4.7,
    },
  ]);

  const removeFavRestaurant = (id: string) => {
    setFavRestaurants((prev) => prev.filter((r) => r.id !== id));
    Toast.show({
      type: "info",
      text1: "Đã xóa khỏi danh sách yêu thích",
    });
  };

  const removeFavFood = (id: string) => {
    setFavFoods((prev) => prev.filter((f) => f.id !== id));
    Toast.show({
      type: "info",
      text1: "Đã xóa món ăn khỏi yêu thích",
    });
  };

  const formatVND = (amount: number) => `${amount.toLocaleString("vi-VN")}đ`;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "left", "right"]}>
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
        >
          <Image
            source={ICONS.arrowBack}
            className="w-5 h-5"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
            Mục yêu thích của bạn ❤️
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            {activeTab === "RESTAURANTS" ? `${favRestaurants.length} nhà hàng` : `${favFoods.length} món ăn`}
          </Text>
        </View>
      </View>

      {/* Dual Tab Switcher */}
      <View className="bg-white p-2 border-b border-gray-100 flex-row">
        <TouchableOpacity
          onPress={() => setActiveTab("RESTAURANTS")}
          className={`flex-1 py-2.5 rounded-2xl items-center ${
            activeTab === "RESTAURANTS" ? "bg-primary" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-xs font-extrabold font-quicksand-bold ${
              activeTab === "RESTAURANTS" ? "text-white" : "text-gray-600"
            }`}
          >
            🏪 Quán ăn yêu thích ({favRestaurants.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("FOODS")}
          className={`flex-1 py-2.5 rounded-2xl items-center ml-2 ${
            activeTab === "FOODS" ? "bg-primary" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-xs font-extrabold font-quicksand-bold ${
              activeTab === "FOODS" ? "text-white" : "text-gray-600"
            }`}
          >
            🍲 Món ăn đã lưu ({favFoods.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {activeTab === "RESTAURANTS" ? (
          favRestaurants.length === 0 ? (
            <View className="bg-white p-8 rounded-3xl items-center justify-center my-10 border border-gray-100">
              <Text className="text-4xl mb-2">💔</Text>
              <Text className="text-base font-bold text-dark-100 font-quicksand-bold mb-1">
                Chưa có quán ăn yêu thích
              </Text>
            </View>
          ) : (
            favRestaurants.map((res) => (
              <TouchableOpacity
                key={res.id}
                activeOpacity={0.9}
                onPress={() => router.push(`/restaurant/${res.id}` as any)}
                className="bg-white p-4 rounded-3xl mb-4 border border-gray-200 shadow-sm flex-row items-center"
              >
                <Image source={res.logo} className="w-16 h-16 rounded-2xl mr-3.5" resizeMode="cover" />
                <View className="flex-1 pr-2">
                  <View className="bg-orange-50 self-start px-2 py-0.5 rounded-md border border-orange-200 mb-1">
                    <Text className="text-[10px] font-extrabold text-primary font-quicksand-bold">
                      {res.tag}
                    </Text>
                  </View>
                  <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold" numberOfLines={1}>
                    {res.name}
                  </Text>
                  <Text className="text-xs text-gray-400 font-quicksand" numberOfLines={1}>
                    {res.branch}
                  </Text>
                  <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold mt-1">
                    ⭐ {res.rating} ({res.reviewCount}) • {res.deliveryFee} • {res.deliveryTime}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeFavRestaurant(res.id)}
                  className="w-9 h-9 rounded-full bg-red-50 items-center justify-center border border-red-200"
                >
                  <Text className="text-base">❤️</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )
        ) : favFoods.length === 0 ? (
          <View className="bg-white p-8 rounded-3xl items-center justify-center my-10 border border-gray-100">
            <Text className="text-4xl mb-2">💔</Text>
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold mb-1">
              Chưa có món ăn đã lưu
            </Text>
          </View>
        ) : (
          favFoods.map((food) => (
            <View
              key={food.id}
              className="bg-white p-4 rounded-3xl mb-4 border border-gray-200 shadow-sm flex-row items-center"
            >
              <Image source={food.image} className="w-16 h-16 rounded-2xl mr-3.5" resizeMode="cover" />
              <View className="flex-1 pr-2">
                <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold" numberOfLines={1}>
                  {food.name}
                </Text>
                <Text className="text-xs text-gray-400 font-quicksand" numberOfLines={1}>
                  Quán: {food.restaurantName}
                </Text>
                <Text className="text-sm font-extrabold text-primary font-quicksand-bold mt-1">
                  {formatVND(food.price)} • ⭐ {food.rating}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeFavFood(food.id)}
                className="w-9 h-9 rounded-full bg-red-50 items-center justify-center border border-red-200"
              >
                <Text className="text-base">❤️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
