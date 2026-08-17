import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants";

export const CustomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getTabConfig = (routeName: string): { label: string; icon: any } => {
    switch (routeName) {
      case "index":
        return { label: "Trang chủ", icon: ICONS.home };
      case "search":
        return { label: "Tìm kiếm", icon: ICONS.search };
      case "orders":
        return { label: "Đơn hàng", icon: ICONS.clock };
      case "profile":
        return { label: "Cá nhân", icon: ICONS.user };
      default:
        return { label: routeName, icon: ICONS.home };
    }
  };

  return (
    <View className="absolute bottom-6 left-5 right-5 z-50">
      <View
        className="flex-row items-center justify-around bg-white/95 rounded-[32px] py-2 px-3 shadow-2xl border border-orange-500/10"
        style={{
          elevation: 16,
          shadowColor: "#FE8C00",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const { label, icon } = getTabConfig(route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              activeOpacity={0.8}
              className={`flex-row items-center justify-center py-2 px-3.5 rounded-full transition-all ${
                isFocused ? "bg-orange-50 border border-orange-200" : "bg-transparent"
              }`}
            >
              <Image
                source={icon}
                className="w-5 h-5"
                style={{ tintColor: isFocused ? "#FE8C00" : "#9CA3AF" }}
                resizeMode="contain"
              />

              {isFocused && (
                <Text className="text-xs font-extrabold text-primary font-quicksand-bold ml-1.5">
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
