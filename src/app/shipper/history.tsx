import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShipper } from "@/hooks/useShipper";
import { ShipperHistoryCard } from "@/components/ShipperHistoryCard";

export default function ShipperHistoryScreen() {
  const { historyOrders } = useShipper();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-2" edges={["top", "left", "right"]}>
      {/* Header Bar */}
      <View className="mb-4 pt-2">
        <Text className="text-xs font-semibold text-gray-400 font-quicksand">
          LỊCH SỬ GIAO HÀNG
        </Text>
        <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold">
          Các đơn đã hoàn thành ({historyOrders.length})
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {historyOrders.length === 0 ? (
          <View className="bg-white p-8 rounded-2xl border border-gray-100 items-center justify-center">
            <Text className="text-3xl mb-2">📜</Text>
            <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold mb-1">
              Chưa có lịch sử giao hàng
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand text-center">
              Các đơn giao thành công của bạn sẽ được lưu giữ tại đây.
            </Text>
          </View>
        ) : (
          historyOrders.map((ord) => <ShipperHistoryCard key={ord.id} order={ord} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
