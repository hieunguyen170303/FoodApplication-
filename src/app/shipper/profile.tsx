import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useShipper } from "@/hooks/useShipper";
import { ICONS, IMAGES } from "@/constants";

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
    <SafeAreaView className="flex-1 bg-[#FDFBF7] px-4 pt-2" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Header Title */}
        <View className="mb-4 pt-2">
          <Text className="text-xs font-bold text-gray-400 font-quicksand uppercase tracking-wider">
            TÀI KHOẢN TÀI XẾ
          </Text>
          <Text className="text-xl font-extrabold text-[#181C2E] font-quicksand-bold">
            Hồ sơ cá nhân
          </Text>
        </View>

        {/* Profile Glass Card */}
        <View className="bg-white/95 p-5 rounded-[28px] border border-orange-100/80 items-center mb-5 shadow-md shadow-orange-500/5">
          <Image source={IMAGES.avatar} className="w-20 h-20 rounded-full mb-3 border-2 border-primary" />
          <Text className="text-lg font-extrabold text-[#181C2E] font-quicksand-bold mb-0.5">
            Nguyễn Văn Hùng
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand mb-3">
            shipper@gmail.com • 0912 345 678
          </Text>

          <View className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
            <Text className="text-xs font-extrabold text-emerald-700 font-quicksand-bold">
              Tài xế đối tác chính thức
            </Text>
          </View>
        </View>

        {/* Shipper Wallet Banner Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/shipper/wallet" as any)}
          className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 rounded-[28px] mb-5 shadow-lg shadow-emerald-500/25 border border-white/20 flex-row justify-between items-center"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-2xl bg-white/20 items-center justify-center mr-3 border border-white/30">
              <Image
                source={ICONS.dollar}
                className="w-5 h-5"
                style={{ tintColor: "#FFFFFF" }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text className="text-xs text-emerald-100 font-bold font-quicksand-bold uppercase tracking-wider">
                SỐ DƯ VÍ TÀI XẾ
              </Text>
              <Text className="text-lg font-extrabold text-white font-quicksand-bold">
                350.000đ (Rút về Ngân hàng)
              </Text>
            </View>
          </View>
          <Image
            source={ICONS.arrowRight}
            className="w-4 h-4"
            style={{ tintColor: "#FFFFFF" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Vehicle & Info Section */}
        <View className="bg-white/95 rounded-[28px] p-4 mb-5 border border-gray-100/80 shadow-xs">
          <Text className="text-xs font-bold text-gray-400 uppercase font-quicksand mb-2 px-1 tracking-wider">
            Thông tin phương tiện
          </Text>

          <View className="flex-row justify-between py-2.5 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Loại xe:</Text>
            <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
              Honda Wave Alpha 110
            </Text>
          </View>

          <View className="flex-row justify-between py-2.5 border-b border-gray-100">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Biển số xe:</Text>
            <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
              61-B1 892.45
            </Text>
          </View>

          <View className="flex-row justify-between py-2.5">
            <Text className="text-sm font-medium text-gray-600 font-quicksand">Khu vực hoạt động:</Text>
            <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
              Thủ Dầu Một, Bình Dương
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleLogout}
          className="bg-red-50/80 border border-red-200/80 py-4 rounded-[28px] items-center justify-center mb-8 flex-row space-x-2"
        >
          <Image
            source={ICONS.logout}
            className="w-5 h-5 mr-2"
            style={{ tintColor: "#EF4444" }}
            resizeMode="contain"
          />
          <Text className="text-red-600 text-sm font-extrabold font-quicksand-bold">
            Đăng xuất tài khoản Shipper
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
