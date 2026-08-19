import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ICONS, IMAGES } from "@/constants";
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

  const accountMenu = [
    {
      icon: ICONS.location,
      title: "Sổ địa chỉ giao hàng",
      subtitle: "Nhà riêng, Cơ quan, Trường học",
      route: "/addresses",
      badgeText: "3 địa chỉ",
    },
    {
      icon: ICONS.dollar,
      title: "Ví & Phương thức thanh toán",
      subtitle: "MoMo, FoodApp Pay, ZaloPay, COD",
      route: "/payment-methods",
      badgeText: "150.000đ",
    },
    {
      icon: ICONS.star,
      title: "Kho Voucher & Mã giảm giá",
      subtitle: "Mã Freeship, Giảm giá món, MoMo",
      route: "/vouchers",
      badgeText: "4 mã khả dụng",
    },
    {
      icon: ICONS.bag,
      title: "Quán ăn & Món ăn yêu thích",
      subtitle: "Quán ăn đã lưu & Món ngon hợp gu",
      route: "/favorites",
      badgeText: "2 quán • 2 món",
    },
  ];

  const serviceMenu = [
    {
      icon: ICONS.envelope,
      title: "Trung tâm thông báo",
      subtitle: "Cập nhật đơn hàng & Tin tức khuyến mãi",
      route: "/notifications",
      badgeText: "Mới",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FDFBF7] px-5 pt-3" edges={["top", "left", "right"]}>
      {/* Glassmorphism Page Header Title */}
      <View className="mb-4">
        <Text className="text-2xl font-extrabold text-[#181C2E] font-quicksand-bold tracking-tight">
          Hồ sơ cá nhân
        </Text>
        <Text className="text-xs text-gray-400 font-quicksand mt-0.5">
          Quản lý tài khoản & Dịch vụ cá nhân
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO CARD: Glassmorphism Card with Soft Gradient Overlay */}
        <View
          className="bg-white/95 rounded-[32px] p-5 mb-6 border border-orange-500/15 shadow-xl shadow-orange-500/10 flex-row items-center justify-between"
          style={{
            elevation: 8,
            shadowColor: "#FE8C00",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
          }}
        >
          {/* Subtle Warm Gradient Accent Background */}
          <View className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-transparent rounded-[32px]" />

          <View className="flex-row items-center flex-1 mr-2 z-10">
            {/* 3D Glass Avatar Capsule with Status Glow */}
            <View className="relative mr-4">
              <View className="w-18 h-18 w-[68px] h-[68px] rounded-full p-1 bg-gradient-to-br from-orange-400 to-amber-500 shadow-md shadow-orange-500/30">
                <Image
                  source={user?.avatar || IMAGES.avatar}
                  className="w-full h-full rounded-full border-2 border-white"
                  resizeMode="cover"
                />
              </View>
              <View className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
            </View>

            {/* User Info & Badges */}
            <View className="flex-1">
              <Text className="text-lg font-extrabold text-[#181C2E] font-quicksand-bold leading-6" numberOfLines={1}>
                {user?.name || "Nguyễn Văn Hùng"}
              </Text>
              <Text className="text-xs text-gray-500 font-quicksand mt-0.5" numberOfLines={1}>
                {user?.email || "hieupro120593@gmail.com"}
              </Text>

              {/* High Contrast 3D Glass Badges */}
              <View className="flex-row items-center mt-2.5 space-x-2">
                <View className="bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 rounded-full shadow-xs shadow-orange-500/20">
                  <Text className="text-[10px] font-extrabold text-white font-quicksand-bold uppercase tracking-wider">
                    VIP Platinum
                  </Text>
                </View>
                <View className="bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300/60">
                  <Text className="text-[10px] font-extrabold text-amber-900 font-quicksand-bold">
                    300 Xu
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pencil Edit Profile Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Alert.alert("Thông tin", "Đang mở chỉnh sửa hồ sơ...")}
            className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 items-center justify-center z-10 shadow-xs"
          >
            <Image
              source={ICONS.pencil}
              className="w-4 h-4"
              style={{ tintColor: "#FE8C00" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* SECTION 1: Account Management */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-xs font-extrabold text-orange-600 uppercase tracking-widest font-quicksand-bold">
              Quản lý tài khoản
            </Text>
            <Text className="text-[11px] text-gray-400 font-quicksand">
              4 mục cá nhân
            </Text>
          </View>

          <View
            className="bg-white/95 rounded-[28px] border border-orange-100/80 shadow-md shadow-orange-500/5 overflow-hidden"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            }}
          >
            {accountMenu.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => router.push(item.route as any)}
                className={`flex-row items-center p-4 ${
                  idx < accountMenu.length - 1 ? "border-b border-orange-50/80" : ""
                }`}
              >
                {/* 3D-styled Vibrant Icon Capsule */}
                <View className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 items-center justify-center mr-3.5 shadow-md shadow-orange-500/25 border border-white/40">
                  <Image
                    source={item.icon}
                    className="w-5 h-5"
                    style={{ tintColor: "#FFFFFF" }}
                    resizeMode="contain"
                  />
                </View>

                <View className="flex-1 pr-2">
                  <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
                    {item.subtitle}
                  </Text>
                </View>

                {/* Right Badge & Arrow */}
                <View className="flex-row items-center space-x-1.5">
                  <Text className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60 font-quicksand-bold">
                    {item.badgeText}
                  </Text>
                  <Image
                    source={ICONS.arrowRight}
                    className="w-4 h-4"
                    style={{ tintColor: "#C4C4C4" }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SECTION 2: Notifications & Driver Mode */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-xs font-extrabold text-orange-600 uppercase tracking-widest font-quicksand-bold">
              Thông báo & Dịch vụ
            </Text>
            <Text className="text-[11px] text-gray-400 font-quicksand">
              Hệ thống & Shipper
            </Text>
          </View>

          <View
            className="bg-white/95 rounded-[28px] border border-orange-100/80 shadow-md shadow-orange-500/5 overflow-hidden"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            }}
          >
            {serviceMenu.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => router.push(item.route as any)}
                className="flex-row items-center p-4 border-b border-orange-50/80"
              >
                {/* 3D-styled Vibrant Icon Capsule */}
                <View className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 items-center justify-center mr-3.5 shadow-md shadow-orange-500/25 border border-white/40">
                  <Image
                    source={item.icon}
                    className="w-5 h-5"
                    style={{ tintColor: "#FFFFFF" }}
                    resizeMode="contain"
                  />
                </View>

                <View className="flex-1 pr-2">
                  <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
                    {item.subtitle}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1.5">
                  <Text className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60 font-quicksand-bold">
                    {item.badgeText}
                  </Text>
                  <Image
                    source={ICONS.arrowRight}
                    className="w-4 h-4"
                    style={{ tintColor: "#C4C4C4" }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}

            {/* Shipper Channel Switcher with Emerald 3D Gradient Icon */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/shipper" as any)}
              className="flex-row items-center p-4 bg-emerald-50/50"
            >
              <View className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 items-center justify-center mr-3.5 shadow-md shadow-emerald-500/30 border border-white/40">
                <Image
                  source={ICONS.person}
                  className="w-5 h-5"
                  style={{ tintColor: "#FFFFFF" }}
                  resizeMode="contain"
                />
              </View>

              <View className="flex-1 pr-2">
                <Text className="text-sm font-extrabold text-emerald-950 font-quicksand-bold">
                  Kênh Tài xế / Shipper
                </Text>
                <Text className="text-xs text-emerald-700 font-quicksand mt-0.5">
                  Bảng doanh thu, nhận đơn & Ví tài xế
                </Text>
              </View>

              <View className="bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300/60 flex-row items-center">
                <Text className="text-[11px] font-extrabold text-emerald-800 font-quicksand-bold mr-1">
                  Mở Kênh
                </Text>
                <Image
                  source={ICONS.arrowRight}
                  className="w-3.5 h-3.5"
                  style={{ tintColor: "#047857" }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: Logout Glass Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-gradient-to-r from-red-500/10 via-rose-500/10 to-red-500/5 py-4 rounded-[28px] border border-red-200/80 shadow-xs"
        >
          <Image
            source={ICONS.logout}
            className="w-5 h-5 mr-2"
            style={{ tintColor: "#EF4444" }}
            resizeMode="contain"
          />
          <Text className="text-red-600 font-extrabold font-quicksand-bold text-sm">
            Đăng xuất tài khoản
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
