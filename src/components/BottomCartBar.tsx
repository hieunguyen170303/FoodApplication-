import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants";

interface BottomCartBarProps {
  totalCount: number;
  totalPrice: number;
  onPressCart?: () => void;
}

export const BottomCartBar: React.FC<BottomCartBarProps> = ({
  totalCount,
  totalPrice,
  onPressCart,
}) => {
  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <View className="absolute bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-xl rounded-t-3xl overflow-hidden pb-4">
      {/* Promo Unlock Progress Bar */}
      <View className="bg-gray-50/90 px-5 py-2.5 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-xs font-bold text-gray-700 font-quicksand-bold">
          Đặt <Text className="underline">70.000đ</Text>, mở khoá ưu đãi{" "}
          <Text className="text-dark-100 font-extrabold">12.000đ</Text>
        </Text>
        <Text className="text-xs font-bold">🔒</Text>
      </View>

      {/* Active Cart Bar */}
      {totalCount > 0 ? (
        <View className="px-5 pt-3">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressCart}
            className="bg-[#00B14F] rounded-full p-3.5 flex-row items-center justify-between shadow-md"
          >
            {/* Left: Items Count & Bag Icon */}
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-3">
                <Image
                  source={ICONS.bag}
                  className="w-4 h-4"
                  style={{ tintColor: "#FFFFFF" }}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-sm font-bold font-quicksand-bold">
                {totalCount} món
              </Text>
            </View>

            {/* Right: Total Price & View Cart Text */}
            <View className="flex-row items-center">
              <Text className="text-white text-base font-extrabold font-quicksand-bold mr-2">
                {formatVND(totalPrice)}
              </Text>
              <Text className="text-white text-sm font-bold font-quicksand-bold">
                ➔
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
