import React from "react";
import { ICONS, IMAGES } from "@/constants";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất tài khoản?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: () => logout() },
    ]);
  };

  const menuItems = [
    {
      emoji: "🔔",
      title: "Trung tâm Thông báo",
      subtitle: "Cập nhật đơn hàng & Khuyến mãi",
      route: "/notifications",
    },
    {
      emoji: "🎟️",
      title: "Kho Voucher & Ví Mã giảm giá",
      subtitle: "4 mã giảm giá khả dụng",
      route: "/vouchers",
    },
    {
      emoji: "❤️",
      title: "Quán ăn & Món ăn Yêu thích",
      subtitle: "2 quán ăn • 2 món đã lưu",
      route: "/favorites",
    },
    {
      emoji: "📍",
      title: "Sổ Địa chỉ Giao hàng",
      subtitle: "Nhà riêng, Cơ quan, Trường học",
      route: "/addresses",
    },
    {
      emoji: "💳",
      title: "Ví Điện tử & Thanh toán",
      subtitle: "MoMo, FoodApp Pay, ZaloPay, COD",
      route: "/payment-methods",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] px-5 pt-3" edges={["top", "left", "right"]}>
      <Text className="text-2xl font-extrabold text-dark-100 font-quicksand-bold mb-4">
        Hồ sơ cá nhân 👤
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Profile Card */}
        <View className="flex-row items-center bg-white p-5 rounded-3xl mb-6 border border-orange-100 shadow-sm">
          <Image
            source={user?.avatar || IMAGES.avatar}
            className="w-16 h-16 rounded-full mr-4 border-2 border-primary"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-lg font-extrabold text-dark-100 font-quicksand-bold">
              {user?.name || "Nguyễn Văn Hùng"}
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand">
              {user?.email || "hieupro120593@gmail.com"}
            </Text>

            <View className="flex-row items-center mt-1">
              <View className="bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 mr-2">
                <Text className="text-[10px] font-extrabold text-amber-700 font-quicksand-bold">
                  ⭐ VIP Platinum
                </Text>
              </View>
              <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">
                🪙 300 Xu
              </Text>
            </View>
          </View>
        </View>

        {/* Menu List */}
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.8}
            onPress={() => router.push(item.route as any)}
            className="flex-row items-center bg-white p-4 rounded-3xl border border-gray-100 mb-3 shadow-xs"
          >
            <View className="w-11 h-11 bg-orange-50 rounded-2xl items-center justify-center mr-3.5 border border-orange-100">
              <Text className="text-xl">{item.emoji}</Text>
            </View>

            <View className="flex-1 pr-2">
              <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
                {item.title}
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand mt-0.5">
                {item.subtitle}
              </Text>
            </View>

            <Image
              source={ICONS.arrowRight}
              className="w-4 h-4"
              style={{ tintColor: "#9CA3AF" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}

        {/* Shipper Mode Switcher Button */}
        <TouchableOpacity
          onPress={() => router.push("/shipper" as any)}
          className="flex-row items-center justify-between bg-emerald-50 p-4 rounded-3xl border border-emerald-200 mt-2 mb-3"
        >
          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">🛵</Text>
            <View>
              <Text className="text-sm font-extrabold text-emerald-900 font-quicksand-bold">
                Kênh Tài Xế / Shipper
              </Text>
              <Text className="text-xs text-emerald-700 font-quicksand">
                Bảng doanh thu, nhận đơn & Ví tài xế
              </Text>
            </View>
          </View>
          <Text className="text-emerald-700 font-bold">➔</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-50 py-3.5 rounded-3xl border border-red-100 mt-1"
        >
          <Image
            source={ICONS.logout}
            className="w-5 h-5 mr-2"
            style={{ tintColor: "#F14141" }}
            resizeMode="contain"
          />
          <Text className="text-red-500 font-extrabold font-quicksand-bold text-sm">
            Đăng xuất tài khoản
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
