import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICONS, IMAGES } from "@/constants";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-3" edges={["top", "left", "right"]}>
      <Text className="text-2xl font-bold text-dark-100 font-quicksand-bold mb-4">
        My Profile
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Profile Card */}
        <View className="flex-row items-center bg-primary/10 p-5 rounded-3xl mb-6 border border-primary/20">
          <Image source={IMAGES.avatar} className="w-16 h-16 rounded-full mr-4" resizeMode="cover" />
          <View className="flex-1">
            <Text className="text-lg font-bold text-dark-100 font-quicksand-bold">John Doe</Text>
            <Text className="text-sm text-gray-500 font-quicksand">john.doe@example.com</Text>
            <Text className="text-xs text-primary font-bold font-quicksand-bold mt-1">VIP Member</Text>
          </View>
        </View>

        {/* Menu Items */}
        {[
          { icon: ICONS.location, title: "Delivery Addresses", subtitle: "Rijeka, Croatia" },
          { icon: ICONS.clock, title: "Order History", subtitle: "12 completed orders" },
          { icon: ICONS.star, title: "Favorites & Offers", subtitle: "3 active vouchers" },
          { icon: ICONS.pencil, title: "Edit Profile", subtitle: "Change password & info" },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-3">
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-3 border border-gray-200/50">
              <Image source={item.icon} className="w-5 h-5" style={{ tintColor: "#FE8C00" }} resizeMode="contain" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-dark-100 font-quicksand-bold">{item.title}</Text>
              <Text className="text-xs text-gray-400 font-quicksand">{item.subtitle}</Text>
            </View>
            <Image source={ICONS.arrowRight} className="w-4 h-4" style={{ tintColor: "#878787" }} resizeMode="contain" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100 mt-4">
          <Image source={ICONS.logout} className="w-5 h-5 mr-2" style={{ tintColor: "#F14141" }} resizeMode="contain" />
          <Text className="text-red-500 font-bold font-quicksand-bold text-base">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
