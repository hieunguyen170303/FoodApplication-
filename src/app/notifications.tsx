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
import { ICONS } from "@/constants";

interface NotificationItem {
  id: string;
  type: "ORDER" | "PROMO" | "SYSTEM";
  title: string;
  message: string;
  timestamp: string;
  isUnread: boolean;
  orderId?: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ALL" | "ORDER" | "PROMO" | "SYSTEM">("ALL");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      type: "ORDER",
      title: "🛵 Tài xế đang trên đường giao hàng!",
      message: "Tài xế Nguyễn Văn Hùng đã lấy món tại Jollibee và đang giao tới bạn.",
      timestamp: "5 phút trước",
      isUnread: true,
      orderId: "ORD-9821",
    },
    {
      id: "n2",
      type: "PROMO",
      title: "🎁 Voucher Freeship 0đ vừa cập bến!",
      message: "Giảm ngay 25.000đ phí giao hàng cho đơn từ 99k. Sử dụng ngay trước 23:59!",
      timestamp: "1 giờ trước",
      isUnread: true,
    },
    {
      id: "n3",
      type: "ORDER",
      title: "✅ Đã giao hàng thành công",
      message: "Đơn hàng #FOOD-9540 đã được hoàn tất. Đừng quên đánh giá trải nghiệm nhé!",
      timestamp: "Hôm nay, 12:45",
      isUnread: false,
      orderId: "ORD-9540",
    },
    {
      id: "n4",
      type: "SYSTEM",
      title: "🔒 Bảo mật tài khoản",
      message: "Tài khoản của bạn vừa đăng nhập thành công trên thiết bị Android mới.",
      timestamp: "Hôm qua, 18:30",
      isUnread: false,
    },
    {
      id: "n5",
      type: "PROMO",
      title: "🔥 Combo Gà Rán Giảm 50%",
      message: "Ưu đãi độc quyền hôm nay tại KFC Bình Dương. Đặt ngay!",
      timestamp: "2 ngày trước",
      isUnread: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "ALL") return true;
    return item.type === activeTab;
  });

  const getIconForType = (type: NotificationItem["type"]) => {
    switch (type) {
      case "ORDER":
        return "🛵";
      case "PROMO":
        return "🎁";
      case "SYSTEM":
        return "🔔";
      default:
        return "📩";
    }
  };

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
            Thông báo của bạn
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            {notifications.filter((n) => n.isUnread).length} tin chưa đọc
          </Text>
        </View>

        <TouchableOpacity onPress={markAllAsRead} className="bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
          <Text className="text-xs font-bold text-primary font-quicksand-bold">
            Đọc tất cả
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs Header */}
      <View className="bg-white px-4 py-2 border-b border-gray-100 flex-row">
        {[
          { key: "ALL", label: "Tất cả" },
          { key: "ORDER", label: "🛵 Đơn hàng" },
          { key: "PROMO", label: "🎁 Ưu đãi" },
          { key: "SYSTEM", label: "🔔 Hệ thống" },
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

      {/* Notification Cards Scroll List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {filteredNotifications.length === 0 ? (
          <View className="bg-white p-8 rounded-3xl items-center justify-center border border-gray-100 my-10">
            <Text className="text-4xl mb-2">🔕</Text>
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold mb-1">
              Không có thông báo nào
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand text-center">
              Bạn sẽ nhận được thông báo khi có cập nhật đơn hàng hoặc khuyến mãi mới!
            </Text>
          </View>
        ) : (
          filteredNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => {
                if (item.orderId) {
                  router.push("/(tabs)/orders" as any);
                } else if (item.type === "PROMO") {
                  router.push("/vouchers" as any);
                }
              }}
              className={`p-4 rounded-2xl mb-3 border ${
                item.isUnread
                  ? "bg-orange-50/50 border-orange-200 shadow-sm"
                  : "bg-white border-gray-200"
              }`}
            >
              <View className="flex-row items-start">
                <View className="w-10 h-10 rounded-2xl bg-white border border-gray-200 items-center justify-center mr-3 shadow-xs">
                  <Text className="text-xl">{getIconForType(item.type)}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text
                      className="text-sm font-extrabold text-dark-100 font-quicksand-bold flex-1 mr-2"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    {item.isUnread && (
                      <View className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </View>

                  <Text className="text-xs text-gray-600 font-quicksand leading-5 mb-2">
                    {item.message}
                  </Text>

                  <Text className="text-[10px] text-gray-400 font-quicksand">
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
