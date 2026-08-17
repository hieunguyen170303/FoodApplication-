import React from "react";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

function ShipperTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="flex-row bg-white border-t border-gray-200 py-2.5 px-4 justify-around items-center">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        // Hide screens with href: null from bottom tab bar
        if (options.href === null) return null;

        const isFocused = state.index === index;

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

        let icon = "🛵";
        let label = "Đơn hàng";
        if (route.name === "index") {
          icon = "🛵";
          label = "Đơn hàng";
        } else if (route.name === "history") {
          icon = "📜";
          label = "Lịch sử";
        } else if (route.name === "profile") {
          icon = "👤";
          label = "Tài khoản";
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            className="items-center justify-center flex-1 py-1"
          >
            <Text className="text-xl mb-0.5">{icon}</Text>
            <Text
              className={`text-xs font-bold font-quicksand-bold ${
                isFocused ? "text-primary" : "text-gray-400"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ShipperLayout() {
  return (
    <Tabs
      tabBar={(props) => <ShipperTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Đơn hàng",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Lịch sử",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Tài khoản",
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="chat/[orderId]"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
