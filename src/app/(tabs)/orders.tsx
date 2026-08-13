import React from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrders } from "@/hooks/useOrders";
import { ActiveOrderCard } from "@/components/ActiveOrderCard";
import { OrderHistoryCard } from "@/components/OrderHistoryCard";

export default function OrdersScreen() {
  const { activeOrder, orderHistory, loading, refreshOrders } = useOrders();

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={["top", "left", "right"]}>
      {/* Page Title Header */}
      <View className="px-5 pt-3 pb-3">
        <Text className="text-[11px] font-bold tracking-wider text-primary uppercase font-quicksand-bold">
          TRACKING & HISTORY
        </Text>
        <Text className="text-2xl font-extrabold text-dark-100 font-quicksand-bold mt-0.5">
          Đơn hàng của bạn
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingHorizontal: 20 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshOrders} tintColor="#FE8C00" />
        }
      >
        {/* Active Order Progress Tracking Section */}
        {activeOrder && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-dark-100 font-quicksand-bold">
                Đơn hàng đang giao 🛵
              </Text>
              <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Text className="text-xs font-bold text-emerald-700 font-quicksand-bold">
                  Đang diễn ra
                </Text>
              </View>
            </View>

            <ActiveOrderCard order={activeOrder} />
          </View>
        )}

        {/* Order History Section */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-dark-100 font-quicksand-bold mb-3">
            Lịch sử đơn hàng
          </Text>

          {orderHistory.length > 0 ? (
            orderHistory.map((pastOrder) => (
              <OrderHistoryCard key={pastOrder.id} order={pastOrder} />
            ))
          ) : (
            <View className="bg-white p-8 rounded-2xl items-center justify-center border border-gray-100">
              <Text className="text-gray-400 font-quicksand text-sm">
                Bạn chưa có lịch sử đơn hàng nào.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
