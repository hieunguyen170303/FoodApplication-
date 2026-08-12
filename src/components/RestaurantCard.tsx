import React from "react";
import { View, Text, Image } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Restaurant } from "@/types";
import { ICONS } from "@/constants";

interface RestaurantCardProps {
  item: Restaurant;
  onPress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  item,
  onPress,
}) => {
  return (
    <Card
      onPress={onPress}
      elevation={1}
      className="bg-white rounded-2xl mb-3.5 border border-gray-100/80 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Card.Content className="flex-row p-3">
        {/* Restaurant Logo */}
        <View className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 mr-3.5 items-center justify-center border border-gray-200/40">
          <Image source={item.logo} className="w-full h-full" resizeMode="cover" />
        </View>

        {/* Restaurant Details */}
        <View className="flex-1 justify-between">
          <View>
            {/* Sponsored Badge & Title */}
            <View className="flex-row items-center flex-wrap">
              {item.isSponsored && (
                <View className="bg-gray-100 px-1.5 py-0.5 rounded mr-1.5">
                  <Text className="text-[10px] text-gray-500 font-quicksand">
                    Quảng cáo
                  </Text>
                </View>
              )}
              <Text
                numberOfLines={1}
                className="text-base font-bold text-dark-100 font-quicksand-bold flex-1"
              >
                {item.name}
              </Text>
            </View>

            {/* Rating, Category & Metadata */}
            <View className="flex-row items-center mt-1 flex-wrap">
              <Image
                source={ICONS.star}
                className="w-3.5 h-3.5 mr-1"
                style={{ tintColor: "#FE8C00" }}
                resizeMode="contain"
              />
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold mr-1">
                {item.rating}
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand mr-1.5">
                ({item.reviewCount})
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                • {item.priceRange} • {item.category}
              </Text>
            </View>

            {/* Price & Delivery Time */}
            <View className="flex-row items-center mt-1">
              {item.originalDeliveryFee && (
                <Text className="text-xs text-gray-400 line-through mr-1 font-quicksand">
                  {item.originalDeliveryFee}
                </Text>
              )}
              <Text className="text-xs font-bold text-primary font-quicksand-bold mr-1.5">
                {item.deliveryFee}
              </Text>
              <Text className="text-xs text-gray-500 font-quicksand">
                • {item.deliveryTime}
              </Text>
            </View>
          </View>

          {/* Tag / Voucher Badges with Paper Chip */}
          <View className="flex-row items-center flex-wrap mt-2 gap-1.5">
            {item.tag && (
              <Chip
                compact
                style={{ backgroundColor: "#ECFDF5", borderRadius: 8, height: 26 }}
                textStyle={{
                  color: "#047857",
                  fontSize: 11,
                  fontFamily: "Quicksand-Bold",
                  fontWeight: "700",
                }}
              >
                ★ {item.tag} ›
              </Chip>
            )}

            {item.voucherBadge && (
              <Chip
                compact
                style={{ backgroundColor: "#FFF7ED", borderRadius: 8, height: 26 }}
                textStyle={{
                  color: "#FE8C00",
                  fontSize: 11,
                  fontFamily: "Quicksand-Bold",
                  fontWeight: "700",
                }}
              >
                {item.voucherBadge} {item.minOrder ? `• ${item.minOrder}` : ""}
              </Chip>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
