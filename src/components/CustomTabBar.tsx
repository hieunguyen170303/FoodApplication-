import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants";

export const CustomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getTabConfig = (routeName: string) => {
    switch (routeName) {
      case "index":
        return { label: "Home", icon: ICONS.home };
      case "search":
        return { label: "Search", icon: ICONS.search };
      case "cart":
        return { label: "Cart", icon: ICONS.bag, badge: 2 };
      case "profile":
        return { label: "Profile", icon: ICONS.user };
      default:
        return { label: routeName, icon: ICONS.home };
    }
  };

  return (
    <View className="absolute bottom-5 left-5 right-5 z-50">
      <View
        className="flex-row items-center justify-around bg-white rounded-full py-2.5 px-3 shadow-lg border border-gray-100"
        style={{
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 10,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const { label, icon, badge } = getTabConfig(route.name);

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

          const activeColor = "#FE8C00";
          const inactiveColor = "#878787";
          const color = isFocused ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              activeOpacity={0.7}
              className="items-center justify-center flex-1 py-1"
            >
              <View className="relative mb-1">
                <Image
                  source={icon}
                  className="w-6 h-6"
                  style={{ tintColor: color }}
                  resizeMode="contain"
                />
                {badge && badge > 0 ? (
                  <View className="absolute -top-1.5 -right-2 bg-primary rounded-full w-4 h-4 items-center justify-center border border-white">
                    <Text className="text-[9px] font-bold text-white font-quicksand-bold">
                      {badge}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Text
                className="text-[11px] font-medium font-quicksand"
                style={{ color }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
