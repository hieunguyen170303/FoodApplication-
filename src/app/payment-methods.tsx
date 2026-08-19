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
import { ICONS } from "@/constants";

export default function PaymentMethodsScreen() {
  const router = useRouter();

  const [walletBalance, setWalletBalance] = useState<number>(150000);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("momo");

  const [methods, setMethods] = useState([
    {
      id: "momo",
      name: "Ví MoMo",
      description: "Tự động trừ tiền khi đặt đơn",
      icon: "🔴",
      isLinked: true,
      color: "bg-pink-50 border-pink-200",
    },
    {
      id: "food_wallet",
      name: "Ví FoodApp Pay",
      description: "Số dư ví khả dụng: 150.000đ",
      icon: "💳",
      isLinked: true,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "zalopay",
      name: "Ví ZaloPay",
      description: "Ưu đãi hoàn 15.000đ cho đơn đầu tiên",
      icon: "🔵",
      isLinked: true,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "cod",
      name: "Tiền mặt (COD)",
      description: "Thanh toán cho shipper khi nhận hàng",
      icon: "💵",
      isLinked: true,
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      id: "card",
      name: "Thẻ Visa / Mastercard",
      description: "Chưa liên kết thẻ ngân hàng",
      icon: "💳",
      isLinked: false,
      color: "bg-gray-50 border-gray-200",
    },
  ]);

  const selectMethod = (id: string) => {
    setSelectedMethodId(id);
    Toast.show({
      type: "success",
      text1: "✅ Đã chọn phương thức thanh toán mặc định!",
      position: "top",
    });
  };

  const handleTopup = () => {
    setWalletBalance((prev) => prev + 100000);
    Toast.show({
      type: "success",
      text1: "🎉 Nạp +100.000đ vào Ví FoodApp thành công!",
      position: "top",
    });
  };

  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

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
            Ví & Phương thức thanh toán 💳
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            Quản lý ví điện tử & thẻ liên kết
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {/* FoodApp Wallet Card */}
        <View className="bg-gradient-to-r bg-primary p-5 rounded-3xl mb-5 shadow-lg shadow-orange-500/30">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs font-bold text-orange-100 font-quicksand-bold uppercase tracking-wider">
              VÍ ĐIỆN TỬ FOODAPP PAY
            </Text>
            <View className="bg-white/20 px-2.5 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-white font-quicksand-bold">
                ACTIVE 🟢
              </Text>
            </View>
          </View>

          <Text className="text-xs text-orange-100 font-quicksand">
            Số dư khả dụng:
          </Text>
          <Text className="text-3xl font-extrabold text-white font-quicksand-bold mb-4">
            {formatVND(walletBalance)}
          </Text>

          <View className="flex-row space-x-3 pt-2 border-t border-white/20">
            <TouchableOpacity
              onPress={handleTopup}
              className="flex-1 bg-white py-2.5 rounded-2xl items-center justify-center"
            >
              <Text className="text-xs font-extrabold text-primary font-quicksand-bold">
                💳 Nạp tiền (+100k)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Toast.show({ type: "info", text1: "Mở lịch sử giao dịch ví" })}
              className="flex-1 bg-white/20 py-2.5 rounded-2xl items-center justify-center border border-white/40"
            >
              <Text className="text-xs font-bold text-white font-quicksand-bold">
                📜 Lịch sử
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Linked Payment Methods Section */}
        <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold mb-3">
          Phương thức thanh toán khả dụng:
        </Text>

        {methods.map((item) => {
          const isSelected = selectedMethodId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => selectMethod(item.id)}
              className={`p-4 rounded-3xl mb-3 border flex-row items-center justify-between ${
                isSelected
                  ? "bg-orange-50/60 border-primary shadow-sm"
                  : "bg-white border-gray-200"
              }`}
            >
              <View className="flex-row items-center flex-1 mr-2">
                <View className="w-10 h-10 rounded-2xl bg-white border border-gray-200 items-center justify-center mr-3">
                  <Text className="text-xl">{item.icon}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold mr-2">
                      {item.name}
                    </Text>
                    {item.isLinked && (
                      <Text className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-quicksand-bold">
                        Đã liên kết
                      </Text>
                    )}
                  </View>

                  <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
                    {item.description}
                  </Text>
                </View>
              </View>

              <View
                className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  isSelected ? "border-primary bg-primary" : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && <Text className="text-white text-[10px] font-bold">✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
