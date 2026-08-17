import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useShipper } from "@/hooks/useShipper";
import { IMAGES } from "@/constants";

export default function ShipperProfileScreen() {
  const router = useRouter();
  const { stats } = useShipper();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất tài khoản Shipper?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => router.replace("/auth" as any),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-2" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Title */}
        <View className="mb-4 pt-2">
          <Text className="text-xs font-semibold text-gray-400 font-quicksand">
            TÀI KHOẢN TÀI XẾ
          </Text>
          <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold">
            Hồ sơ cá nhân
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white p-5 rounded-3xl border border-gray-100 items-center mb-5 shadow-sm">
          <Image source={IMAGES.avatar} className="w-20 h-20 rounded-full mb-3 border-2 border-primary" />
          <Text className="text-lg font-extrabold text-dark-100 font-quicksand-bold mb-0.5">
            Nguyễn Văn Hùng
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand mb-3">
            shipper@gmail.com • 0912 345 678
          </Text>

          <View className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <Text className="text-xs font-extrabold text-emerald-700 font-quicksand-bold">
              🟢 Tài xế đối tác chính thức
            </Text>
          </View>
        </View>

        {/* Vehicle & Info Section */}
        <View className="bg-white rounded-2xl p-4 mb-5 border border-gray-100 space-y-3">
          <Text className="text-xs font-bold text-gray-400 uppercase font-quicksand mb-1">
            Thông tin phương tiện
          </Text>

          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Loại xe:</Text>
            <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
              Honda Wave Alpha 110
            </Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Biển số xe:</Text>
            <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
              61-B1 892.45
            </Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Khu vực hoạt động:</Text>
            <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
              Thủ Dầu Một, Bình Dương
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="bg-red-50 border border-red-200 py-3.5 rounded-2xl items-center justify-center mb-8"
        >
          <Text className="text-red-600 text-sm font-extrabold font-quicksand-bold">
            🚪 Đăng xuất tài khoản Shipper
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
