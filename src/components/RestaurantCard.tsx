import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Restaurant } from "@/types";

interface RestaurantCardProps {
  item: Restaurant;
  onPress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white p-3.5 rounded-3xl mb-4 border border-gray-200/80 shadow-md shadow-orange-500/5 flex-row items-center"
    >
      {/* Restaurant Logo with Overlay Star Badge */}
      <View className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 mr-3.5 items-center justify-center border border-gray-200/50">
        <Image source={item.logo} className="w-full h-full" resizeMode="cover" />
        <View className="absolute bottom-1 left-1 bg-white/90 px-1.5 py-0.5 rounded-full border border-gray-200 flex-row items-center">
          <Text className="text-[10px] font-extrabold text-amber-500 font-quicksand-bold">
            ⭐ {item.rating}
          </Text>
        </View>
      </View>

      {/* Restaurant Details */}
      <View className="flex-1 justify-between py-0.5">
        <View>
          {/* Title & Tag */}
          <View className="flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              className="text-base font-extrabold text-dark-100 font-quicksand-bold flex-1 mr-2"
            >
              {item.name}
            </Text>
            {item.isSponsored && (
              <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                <Text className="text-[9px] text-gray-500 font-quicksand">
                  QC
                </Text>
              </View>
            )}
          </View>

          {/* Subtitle & Delivery Time */}
          <Text className="text-xs text-gray-400 font-quicksand mt-0.5" numberOfLines={1}>
            {item.branch || "Thủ Dầu Một"} • {item.category}
          </Text>

          {/* Delivery Fee & Time Pill */}
          <View className="flex-row items-center mt-1.5">
            <Text className="text-xs font-extrabold text-primary font-quicksand-bold mr-1.5">
              🛵 {item.deliveryFee}
            </Text>
            {item.originalDeliveryFee && (
              <Text className="text-xs text-gray-400 line-through mr-1 font-quicksand">
                {item.originalDeliveryFee}
              </Text>
            )}
            <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold">
              • ⏱️ {item.deliveryTime}
            </Text>
          </View>
        </View>

        {/* Voucher Chips */}
        <View className="flex-row items-center flex-wrap mt-2.5 gap-1.5">
          {item.tag && (
            <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Text className="text-[10px] font-extrabold text-emerald-700 font-quicksand-bold">
                ★ {item.tag}
              </Text>
            </View>
          )}

          {item.voucherBadge && (
            <View className="bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              <Text className="text-[10px] font-extrabold text-primary font-quicksand-bold">
                🎁 {item.voucherBadge}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
