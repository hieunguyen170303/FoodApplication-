import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { apiClient } from "@/services/apiClient";
import { ICONS, IMAGES } from "@/constants";

export default function OrderReviewScreen() {
  const router = useRouter();
  const { orderId, storeName: paramStoreName } = useLocalSearchParams<{
    orderId: string;
    storeName?: string;
  }>();

  const activeOrderId = orderId || "ORD-9821";
  const activeStoreName = paramStoreName || "Jollibee - EC Nguyễn Du";

  // Ratings & Feedback States
  const [restaurantRating, setRestaurantRating] = useState<number>(5);
  const [restaurantComment, setRestaurantComment] = useState<string>("");
  const [selectedRestTags, setSelectedRestTags] = useState<string[]>([]);

  const [shipperRating, setShipperRating] = useState<number>(5);
  const [shipperComment, setShipperComment] = useState<string>("");
  const [selectedShipTags, setSelectedShipTags] = useState<string[]>([]);
  const [tipAmount, setTipAmount] = useState<number>(10000);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const restTagOptions = [
    "Món ăn nóng hổi 🍲",
    "Đóng gói đẹp 📦",
    "Giao đúng món ✅",
    "Giá trị tuyệt vời 💎",
    "Khẩu phần đầy đặn 🥗",
  ];

  const shipTagOptions = [
    "Giao siêu nhanh ⚡",
    "Thân thiện nhiệt tình 😃",
    "Bảo quản tốt 🛡️",
    "Lịch sự lễ phép 🙏",
    "Giao lên tận phòng 🏢",
  ];

  const tipOptions = [0, 10000, 20000, 50000];

  const toggleRestTag = (tag: string) => {
    setSelectedRestTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleShipTag = (tag: string) => {
    setSelectedShipTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      await apiClient.post("/reviews", {
        orderId: activeOrderId,
        storeName: activeStoreName,
        restaurantRating,
        restaurantComment,
        restaurantTags: selectedRestTags,
        driverName: "Nguyễn Văn Hùng",
        shipperRating,
        shipperComment,
        shipperTags: selectedShipTags,
        tipAmount,
      });

      Toast.show({
        type: "success",
        text1: "🎉 Đánh giá thành công!",
        text2: "Cảm ơn ý kiến đóng góp quý báu của bạn!",
        position: "top",
        visibilityTime: 4000,
      });

      router.replace("/(tabs)/orders" as any);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Lỗi gửi đánh giá",
        text2: err.message || "Vui lòng thử lại sau!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatVND = (amount: number) => {
    if (amount === 0) return "Không tip";
    return `${amount.toLocaleString("vi-VN")}đ`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "left", "right"]}>
      {/* Header Bar */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
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
            Đánh giá đơn hàng #{activeOrderId}
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            {activeStoreName}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        >
          {/* CARD 1: RESTAURANT RATING */}
          <View className="bg-white p-5 rounded-3xl mb-5 border border-gray-200 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Image source={IMAGES.logo} className="w-12 h-12 rounded-2xl mr-3" />
              <View className="flex-1">
                <Text className="text-xs font-bold text-primary font-quicksand-bold uppercase">
                  Đánh giá quán ăn
                </Text>
                <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
                  {activeStoreName}
                </Text>
              </View>
            </View>

            {/* Star Picker */}
            <Text className="text-xs text-gray-400 text-center mb-2 font-quicksand">
              Chất lượng món ăn thế nào?
            </Text>
            <View className="flex-row justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRestaurantRating(star)}
                  className="p-1"
                >
                  <Text className="text-3xl">
                    {star <= restaurantRating ? "⭐" : "☆"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Feedback Tags */}
            <View className="flex-row flex-wrap mb-3">
              {restTagOptions.map((tag) => {
                const isSelected = selectedRestTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => toggleRestTag(tag)}
                    className={`px-3 py-1.5 rounded-full mr-2 mb-2 border ${
                      isSelected
                        ? "bg-orange-50 border-orange-300"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold font-quicksand-bold ${
                        isSelected ? "text-primary" : "text-gray-600"
                      }`}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Comment Box */}
            <TextInput
              value={restaurantComment}
              onChangeText={setRestaurantComment}
              placeholder="Chia sẻ nhận xét của bạn về hương vị món ăn..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-sm font-quicksand text-dark-100 min-h-[80px]"
            />
          </View>

          {/* CARD 2: SHIPPER RATING */}
          <View className="bg-white p-5 rounded-3xl mb-5 border border-gray-200 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Image source={IMAGES.avatar} className="w-12 h-12 rounded-full mr-3 border border-primary" />
              <View className="flex-1">
                <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold uppercase">
                  Đánh giá tài xế giao hàng
                </Text>
                <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
                  Nguyễn Văn Hùng
                </Text>
                <Text className="text-xs text-gray-400 font-quicksand">
                  61B1 - 888.99 • Honda Wave
                </Text>
              </View>
            </View>

            {/* Star Picker */}
            <Text className="text-xs text-gray-400 text-center mb-2 font-quicksand">
              Thái độ dịch vụ của tài xế ra sao?
            </Text>
            <View className="flex-row justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setShipperRating(star)}
                  className="p-1"
                >
                  <Text className="text-3xl">
                    {star <= shipperRating ? "⭐" : "☆"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Feedback Tags */}
            <View className="flex-row flex-wrap mb-3">
              {shipTagOptions.map((tag) => {
                const isSelected = selectedShipTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => toggleShipTag(tag)}
                    className={`px-3 py-1.5 rounded-full mr-2 mb-2 border ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-300"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold font-quicksand-bold ${
                        isSelected ? "text-emerald-700" : "text-gray-600"
                      }`}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Comment Box */}
            <TextInput
              value={shipperComment}
              onChangeText={setShipperComment}
              placeholder="Nhận xét về tài xế giao hàng..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-sm font-quicksand text-dark-100 min-h-[80px] mb-4"
            />

            {/* Tip Driver Selector */}
            <View className="pt-3 border-t border-gray-100">
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold mb-2">
                🎁 Thưởng thêm (Tip) cho tài xế:
              </Text>
              <View className="flex-row space-x-2">
                {tipOptions.map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    onPress={() => setTipAmount(amount)}
                    className={`flex-1 py-2 rounded-xl items-center border ${
                      tipAmount === amount
                        ? "bg-emerald-50 border-emerald-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-extrabold font-quicksand-bold ${
                        tipAmount === amount ? "text-emerald-700" : "text-gray-600"
                      }`}
                    >
                      {formatVND(amount)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Submit Footer Bar */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl">
          <TouchableOpacity
            disabled={submitting}
            activeOpacity={0.9}
            onPress={handleSubmitReview}
            className="bg-primary py-4 rounded-full items-center justify-center shadow-md shadow-orange-500/30"
          >
            <Text className="text-white text-base font-extrabold font-quicksand-bold">
              {submitting ? "Đang gửi đánh giá..." : "⭐ Gửi đánh giá & Hoàn tất"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
