import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ICONS } from "@/constants";

interface VoucherItem {
  id: string;
  code: string;
  title: string;
  discountText: string;
  minOrderText: string;
  expiryText: string;
  category: "FREESHIP" | "DISCOUNT" | "PARTNER";
  isSaved: boolean;
}

export default function VouchersScreen() {
  const router = useRouter();
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"ALL" | "FREESHIP" | "DISCOUNT" | "PARTNER">("ALL");

  const [vouchers, setVouchers] = useState<VoucherItem[]>([
    {
      id: "v1",
      code: "FREESHIP25K",
      title: "Voucher Freeship Hỏa Tốc",
      discountText: "Giảm 25.000đ phí giao hàng",
      minOrderText: "Đơn tối thiểu 99.000đ",
      expiryText: "Hết hạn sau 2 giờ",
      category: "FREESHIP",
      isSaved: true,
    },
    {
      id: "v2",
      code: "FOOD50K",
      title: "Ưu Đãi Độc Quyền Quán Nổi Bật",
      discountText: "Giảm ngay 50.000đ",
      minOrderText: "Đơn tối thiểu 150.000đ",
      expiryText: "Hết hạn 23:59 hôm nay",
      category: "DISCOUNT",
      isSaved: true,
    },
    {
      id: "v3",
      code: "MOMOFOOD20",
      title: "Hoàn xu thanh toán MoMo",
      discountText: "Hoàn 20.000đ vào ví MoMo",
      minOrderText: "Thanh toán bằng MoMo",
      expiryText: "Hạn dùng: 30/08/2026",
      category: "PARTNER",
      isSaved: false,
    },
    {
      id: "v4",
      code: "FREESHIP15K",
      title: "Freeship Mọi Cửa Hàng",
      discountText: "Giảm 15.000đ phí vận chuyển",
      minOrderText: "Đơn tối thiểu 50.000đ",
      expiryText: "Hạn dùng: 25/08/2026",
      category: "FREESHIP",
      isSaved: true,
    },
  ]);

  const handleApplyPromoCode = () => {
    if (!promoCodeInput.trim()) {
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập mã giảm giá!",
      });
      return;
    }

    const code = promoCodeInput.toUpperCase().trim();
    Toast.show({
      type: "success",
      text1: `🎉 Đã lưu mã [${code}] thành công!`,
      text2: "Voucher đã được thêm vào Kho Voucher của bạn.",
      position: "top",
    });
    setPromoCodeInput("");
  };

  const filteredVouchers = vouchers.filter((item) => {
    if (activeTab === "ALL") return true;
    return item.category === activeTab;
  });

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
            Kho Voucher & Mã giảm giá
          </Text>
          <Text className="text-xs text-emerald-600 font-quicksand">
            {vouchers.length} mã ưu đãi khả dụng
          </Text>
        </View>
      </View>

      {/* Promo Code Input Box */}
      <View className="bg-white p-4 border-b border-gray-100 flex-row items-center">
        <TextInput
          value={promoCodeInput}
          onChangeText={setPromoCodeInput}
          placeholder="Nhập mã ưu đãi (VD: FREESHIP25K)..."
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
          className="flex-1 bg-gray-100 px-4 py-2.5 rounded-2xl text-sm font-bold font-quicksand text-dark-100 mr-2"
        />
        <TouchableOpacity
          onPress={handleApplyPromoCode}
          className="bg-primary px-4 py-2.5 rounded-2xl items-center justify-center"
        >
          <Text className="text-white text-xs font-extrabold font-quicksand-bold">
            Áp dụng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View className="bg-white px-4 py-2 border-b border-gray-100 flex-row">
        {[
          { key: "ALL", label: "Tất cả" },
          { key: "FREESHIP", label: "🛵 Freeship" },
          { key: "DISCOUNT", label: "🏷️ Giảm giá món" },
          { key: "PARTNER", label: "💳 Ví MoMo/Bank" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-full mr-2 border ${
              activeTab === tab.key
                ? "bg-primary border-primary"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <Text
              className={`text-xs font-bold font-quicksand-bold ${
                activeTab === tab.key ? "text-white" : "text-gray-600"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Voucher Cards Scroll View */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {filteredVouchers.map((v) => (
          <View
            key={v.id}
            className="bg-white rounded-3xl p-4 mb-4 border border-orange-100 shadow-sm flex-row items-center"
          >
            {/* Left Ticket Badge */}
            <View className="w-16 h-16 rounded-2xl bg-orange-100 border border-orange-200 items-center justify-center mr-3">
              <Text className="text-2xl">
                {v.category === "FREESHIP" ? "🛵" : v.category === "DISCOUNT" ? "🎁" : "💳"}
              </Text>
              <Text className="text-[9px] font-extrabold text-primary font-quicksand-bold mt-0.5">
                VOUCHER
              </Text>
            </View>

            {/* Content Info */}
            <View className="flex-1 pr-2">
              <Text className="text-xs font-extrabold text-primary font-quicksand-bold">
                MÃ: {v.code}
              </Text>
              <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold" numberOfLines={1}>
                {v.title}
              </Text>
              <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold mt-0.5">
                {v.discountText}
              </Text>
              <Text className="text-[11px] text-gray-400 font-quicksand mt-0.5">
                {v.minOrderText} • <Text className="text-red-500 font-bold">{v.expiryText}</Text>
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)" as any)}
              className="bg-primary px-3 py-2 rounded-xl"
            >
              <Text className="text-white text-xs font-bold font-quicksand-bold">
                Dùng ngay
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
