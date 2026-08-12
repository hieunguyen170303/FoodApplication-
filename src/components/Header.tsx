import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Badge, TouchableRipple } from "react-native-paper";
import { ICONS, USER_LOCATION } from "@/constants";

interface HeaderProps {
  location?: string;
  cartCount?: number;
  onLocationPress?: () => void;
  onCartPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location = USER_LOCATION,
  cartCount = 2,
  onLocationPress,
  onCartPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
      {/* Location Section */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onLocationPress}
        className="flex-col"
      >
        <Text className="text-[11px] font-bold tracking-wider text-primary uppercase font-quicksand-bold">
          DELIVER TO
        </Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-base font-bold text-dark-100 font-quicksand-bold mr-1.5">
            {location}
          </Text>
          <Image
            source={ICONS.arrowDown}
            className="w-3.5 h-3.5"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {/* Cart Button with Paper Badge */}
      <View className="relative">
        <TouchableRipple
          borderless
          onPress={onCartPress}
          className="w-11 h-11 bg-dark-100 rounded-full items-center justify-center shadow-sm overflow-hidden"
        >
          <Image
            source={ICONS.bag}
            className="w-5 h-5"
            style={{ tintColor: "#FFFFFF" }}
            resizeMode="contain"
          />
        </TouchableRipple>

        {cartCount > 0 && (
          <Badge
            size={20}
            className="absolute -top-1 -right-1 bg-primary text-white font-bold border-2 border-white"
            style={{ backgroundColor: "#FE8C00" }}
          >
            {cartCount}
          </Badge>
        )}
      </View>
    </View>
  );
};
