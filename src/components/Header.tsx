import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ICONS, USER_LOCATION } from "@/constants";

interface HeaderProps {
  location?: string;
  cartCount?: number;
  onLocationPress?: () => void;
  onCartPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location = USER_LOCATION,
  onLocationPress,
}) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
      {/* Pill Location Badge */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLocationPress || (() => router.push("/addresses" as any))}
        className="flex-row items-center bg-orange-50/80 px-3.5 py-2 rounded-full border border-orange-200 shadow-xs"
      >
        <Image
          source={ICONS.location}
          className="w-4 h-4 mr-1.5"
          style={{ tintColor: "#FE8C00" }}
          resizeMode="contain"
        />
        <View>
          <Text className="text-[10px] font-extrabold text-primary uppercase font-quicksand-bold tracking-wider">
            GIAO ĐẾN
          </Text>
          <View className="flex-row items-center">
            <Text className="text-xs font-extrabold text-dark-100 font-quicksand-bold mr-1" numberOfLines={1}>
              {location}
            </Text>
            <Image
              source={ICONS.arrowDown}
              className="w-3 h-3"
              style={{ tintColor: "#FE8C00" }}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Notification Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/notifications" as any)}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm relative"
      >
        <Image
          source={ICONS.envelope}
          className="w-4 h-4"
          style={{ tintColor: "#FE8C00" }}
          resizeMode="contain"
        />
        <View className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
      </TouchableOpacity>
    </View>
  );
};
