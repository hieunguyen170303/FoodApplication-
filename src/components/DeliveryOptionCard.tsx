import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DeliveryOption } from "@/types";

interface DeliveryOptionCardProps {
  option: DeliveryOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const DeliveryOptionCard: React.FC<DeliveryOptionCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      className={`p-3.5 rounded-2xl mb-2.5 flex-row items-center justify-between border ${
        isSelected
          ? "border-[#00B14F] bg-emerald-50/30"
          : "border-gray-200 bg-white"
      }`}
    >
      <View className="flex-1 pr-2">
        <View className="flex-row items-center flex-wrap">
          <Text className="text-sm font-bold text-dark-100 font-quicksand-bold mr-1.5">
            {option.name}
          </Text>
          <Text className="text-xs text-gray-500 font-quicksand">
            • {option.speedText}
          </Text>
        </View>

        {option.tag && (
          <Text className="text-[11px] font-bold text-sky-600 font-quicksand-bold mt-0.5">
            {option.tag}
          </Text>
        )}
      </View>

      <View className="flex-row items-center">
        {option.originalPrice && (
          <Text className="text-xs text-gray-400 line-through mr-1.5 font-quicksand">
            {formatVND(option.originalPrice)}
          </Text>
        )}
        <Text
          className={`text-sm font-bold font-quicksand-bold ${
            option.isFree ? "text-orange-500" : "text-orange-500"
          }`}
        >
          {option.isFree ? "FREE" : formatVND(option.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
