import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ICONS, IMAGES } from "@/constants";
import { Order } from "@/types";

interface OrderHistoryCardProps {
  order: Order;
  onReorder?: () => void;
}

export const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  order,
  onReorder,
}) => {
  const router = useRouter();
  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;
  const isCompleted = order.status === "COMPLETED";

  const resolveImage = (img: any, fallback: any) => {
    if (!img) return fallback;
    if (typeof img === "number") return img;
    if (typeof img === "object" && img.uri) return img;
    if (typeof img === "string" && img.startsWith("http")) return { uri: img };
    return fallback;
  };

  return (
    <View className="bg-white/95 rounded-[24px] mb-4 p-4 border border-orange-100/80 shadow-md shadow-orange-500/5">
      {/* Header Store & Status */}
      <View className="flex-row items-center justify-between pb-3 border-b border-gray-100/80">
        <View className="flex-row items-center flex-1 mr-2">
          <Image
            source={resolveImage(order.storeLogo, IMAGES.logo)}
            className="w-10 h-10 rounded-xl mr-3 border border-orange-100"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text numberOfLines={1} className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              {order.storeName}
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand">
              {order.orderDate}
            </Text>
          </View>
        </View>

        <View className={`px-3 py-1 rounded-full border ${isCompleted ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          <Text className={`text-[11px] font-extrabold font-quicksand-bold ${isCompleted ? "text-emerald-700" : "text-red-600"}`}>
            {isCompleted ? "Hoàn thành" : "Đã hủy"}
          </Text>
        </View>
      </View>

      {/* Item List Summary */}
      <View className="py-3">
        {(order.items || []).map((item) => (
          <View key={item.id} className="flex-row justify-between items-center mb-1">
            <Text numberOfLines={1} className="text-xs text-gray-700 font-quicksand flex-1 pr-2">
              {item.quantity}x {item.name}
            </Text>
            <Text className="text-xs font-bold text-[#181C2E] font-quicksand-bold">
              {formatVND(item.price)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total Price & Action Buttons */}
      <View className="flex-row items-center justify-between pt-2.5 border-t border-gray-100">
        <View>
          <Text className="text-[10px] text-gray-400 font-quicksand uppercase font-semibold">Tổng tiền</Text>
          <Text className="text-sm font-extrabold text-primary font-quicksand-bold">
            {formatVND(order.totalPrice)}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          {isCompleted && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push(`/review/${order.id}?storeName=${encodeURIComponent(order.storeName)}` as any)
              }
              className="bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 flex-row items-center"
            >
              <Image
                source={ICONS.star}
                className="w-3.5 h-3.5 mr-1"
                style={{ tintColor: "#FE8C00" }}
                resizeMode="contain"
              />
              <Text className="text-xs font-extrabold text-primary font-quicksand-bold">
                Đánh giá
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onReorder || (() => Alert.alert("Đặt lại", `Đang thêm món từ ${order.storeName}...`))}
            className="bg-primary px-4 py-1.5 rounded-full shadow-xs shadow-orange-500/30"
          >
            <Text className="text-xs font-extrabold text-white font-quicksand-bold">
              Đặt lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
