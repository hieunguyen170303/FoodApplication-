import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ShipperOrder } from "@/types";

interface Props {
  order: ShipperOrder & { isPriority?: boolean };
  isActive?: boolean;
  hasActiveOrder?: boolean;
  onAccept?: (id: string) => void;
  onUpdateStatus?: (id: string, newStatus: ShipperOrder["status"]) => void;
}

export const ShipperOrderCard: React.FC<Props> = ({
  order,
  isActive = false,
  hasActiveOrder = false,
  onAccept,
  onUpdateStatus,
}) => {
  const router = useRouter();

  const formatVND = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const handleCallPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Gọi điện", `Số điện thoại: ${phone}`);
    });
  };

  return (
    <View
      className={`bg-white rounded-2xl p-4 mb-4 border ${
        isActive ? "border-primary shadow-md shadow-orange-500/10" : "border-gray-200"
      }`}
    >
      {/* Top Header Row */}
      <View className="flex-row justify-between items-center pb-3 border-b border-gray-100 mb-3">
        <View className="flex-row items-center space-x-2">
          {order.isPriority && (
            <View className="bg-red-50 border border-red-200 px-2 py-0.5 rounded-md mr-1">
              <Text className="text-[10px] font-extrabold text-red-600 font-quicksand-bold">
                🔥 ĐƠN MỚI TẠO
              </Text>
            </View>
          )}
          <Text className="text-xs font-extrabold text-dark-100 font-quicksand-bold">
            #{order.orderCode}
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">• {order.createdAt}</Text>
        </View>

        {/* Shipping Payout Earnings Pill */}
        <View className="bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          <Text className="text-sm font-extrabold text-primary font-quicksand-bold">
            +{formatVND(order.shippingEarnings)}
          </Text>
        </View>
      </View>

      {/* Store Location */}
      <View className="flex-row items-start mb-3">
        <View className="w-6 h-6 rounded-full bg-orange-100 items-center justify-center mr-3 mt-0.5">
          <Text className="text-xs">🏪</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs font-semibold text-gray-400 font-quicksand uppercase">
            Lấy hàng tại quán
          </Text>
          <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
            {order.storeName}
          </Text>
          <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
            {order.storeAddress}
          </Text>
        </View>
      </View>

      {/* Delivery Connector Line */}
      <View className="w-[2px] h-4 bg-gray-200 ml-3 -mt-2 mb-1" />

      {/* Customer Location */}
      <View className="flex-row items-start mb-3">
        <View className="w-6 h-6 rounded-full bg-emerald-100 items-center justify-center mr-3 mt-0.5">
          <Text className="text-xs">📍</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-xs font-semibold text-gray-400 font-quicksand uppercase">
              Giao cho khách ({order.distanceText})
            </Text>
            <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">
              {formatVND(order.totalFoodPrice)} (Tiền món)
            </Text>
          </View>
          <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
            {order.customerName} - {order.customerPhone}
          </Text>
          <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
            {order.deliveryAddress}
          </Text>
        </View>
      </View>

      {/* Items Summary */}
      <View className="bg-gray-50 p-2.5 rounded-xl mb-4 border border-gray-100">
        <Text className="text-xs font-medium text-gray-600 font-quicksand" numberOfLines={2}>
          📦 <Text className="font-bold font-quicksand-bold text-dark-100">Món:</Text> {order.itemsSummary}
        </Text>
      </View>

      {/* Action Buttons Row */}
      {order.status === "AVAILABLE" ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onAccept && onAccept(order.id)}
          className={`py-3 rounded-xl items-center justify-center shadow-sm ${
            hasActiveOrder ? "bg-gray-300 border border-gray-400" : "bg-primary"
          }`}
        >
          <Text className="text-white text-sm font-extrabold font-quicksand-bold">
            {hasActiveOrder
              ? "🔒 Hoàn thành đơn hiện tại để nhận"
              : `⚡ Nhận đơn hàng ngay (+${formatVND(order.shippingEarnings)})`}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="space-y-2">
          {/* Status Progression Button */}
          {order.status === "ACCEPTED" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onUpdateStatus && onUpdateStatus(order.id, "PICKED_UP")}
              className="bg-purple-600 py-3 rounded-xl items-center justify-center shadow-sm"
            >
              <Text className="text-white text-sm font-extrabold font-quicksand-bold">
                🛍️ Đã lấy hàng tại quán ➔ Chuyển giao hàng
              </Text>
            </TouchableOpacity>
          )}

          {order.status === "PICKED_UP" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onUpdateStatus && onUpdateStatus(order.id, "DELIVERING")}
              className="bg-orange-500 py-3 rounded-xl items-center justify-center shadow-sm"
            >
              <Text className="text-white text-sm font-extrabold font-quicksand-bold">
                🛵 Đã gần tới nơi ➔ Gọi khách hàng
              </Text>
            </TouchableOpacity>
          )}

          {order.status === "DELIVERING" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onUpdateStatus && onUpdateStatus(order.id, "COMPLETED")}
              className="bg-emerald-600 py-3 rounded-xl items-center justify-center shadow-sm"
            >
              <Text className="text-white text-sm font-extrabold font-quicksand-bold">
                ✅ Đã giao hàng thành công & Nhận tiền
              </Text>
            </TouchableOpacity>
          )}

          {/* Quick Communication Bar (Chat & Phone) */}
          <View className="flex-row space-x-2 pt-2">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(`/shipper/chat/${order.id}` as any)}
              className="flex-1 bg-orange-50 border border-orange-200 py-2.5 rounded-xl items-center justify-center flex-row space-x-1"
            >
              <Text className="text-sm">💬</Text>
              <Text className="text-xs font-bold text-primary font-quicksand-bold">
                Nhắn tin khách
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCallPhone(order.customerPhone)}
              className="flex-1 bg-emerald-50 border border-emerald-200 py-2.5 rounded-xl items-center justify-center flex-row space-x-1"
            >
              <Text className="text-sm">📞</Text>
              <Text className="text-xs font-bold text-emerald-700 font-quicksand-bold">
                Gọi khách hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
