import React from "react";
import { View, Text, Image } from "react-native";
import { ICONS } from "@/constants";
import { ShipperOrder } from "@/types";

interface Props {
  order: ShipperOrder;
}

export const ShipperHistoryCard: React.FC<Props> = ({ order }) => {
  const formatVND = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <View className="bg-white/95 rounded-[24px] p-4 mb-3 border border-orange-100/80 shadow-md shadow-orange-500/5">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <Text className="text-xs font-extrabold text-[#181C2E] font-quicksand-bold">
            #{order.orderCode}
          </Text>
          <Text className="text-[11px] text-gray-400 font-quicksand">• {order.createdAt}</Text>
        </View>

        <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Text className="text-xs font-extrabold text-emerald-700 font-quicksand-bold">
            +{formatVND(order.shippingEarnings)}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold mb-1">
        {order.storeName}
      </Text>

      <Text className="text-xs text-gray-500 font-quicksand mb-2" numberOfLines={1}>
        Giao tới: {order.deliveryAddress}
      </Text>

      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <Text className="text-xs font-medium text-gray-400 font-quicksand">
          Khách: {order.customerName}
        </Text>
        <View className="flex-row items-center">
          <Image
            source={ICONS.star}
            className="w-3.5 h-3.5 mr-1"
            style={{ tintColor: "#F59E0B" }}
            resizeMode="contain"
          />
          <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">
            5.0 (Hoàn thành)
          </Text>
        </View>
      </View>
    </View>
  );
};
