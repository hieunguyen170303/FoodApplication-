import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useOrders } from "@/hooks/useOrders";
import { ActiveOrderCard } from "@/components/ActiveOrderCard";
import { OrderHistoryCard } from "@/components/OrderHistoryCard";
import { socketService } from "@/services/socketService";
import { Order } from "@/types";

export default function OrdersScreen() {
  const { activeOrder: initialActiveOrder, orderHistory, loading, refreshOrders } = useOrders();
  const [liveActiveOrder, setLiveActiveOrder] = useState<Order | null>(initialActiveOrder);

  useEffect(() => {
    setLiveActiveOrder(initialActiveOrder);
  }, [initialActiveOrder]);

  // Connect WebSocket for Real-time Status Sync from Shipper
  useEffect(() => {
    if (liveActiveOrder?.id) {
      socketService.joinRoom(liveActiveOrder.id);

      socketService.onOrderStatusChanged((data) => {
        console.log("⚡ Real-time Order Status Update received:", data);

        // Show compact sleek Toast Notification
        Toast.show({
          type: "info",
          text1: "🛵 Cập nhật đơn hàng mới!",
          text2: data.statusText || "Tài xế vừa cập nhật trạng thái đơn hàng.",
          position: "top",
          visibilityTime: 4000,
        });

        // Update live order state
        setLiveActiveOrder((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            currentStepIndex: data.stepIndex !== undefined ? data.stepIndex : prev.currentStepIndex,
            statusText: data.statusText || prev.statusText,
            status: data.status === "COMPLETED" ? "COMPLETED" : prev.status,
          };
        });
      });
    }
  }, [liveActiveOrder?.id]);

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
        {liveActiveOrder && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-dark-100 font-quicksand-bold">
                Đơn hàng đang giao 🛵
              </Text>
              <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Text className="text-xs font-bold text-emerald-700 font-quicksand-bold">
                  LIVE TRACKING 🔴
                </Text>
              </View>
            </View>

            <ActiveOrderCard order={liveActiveOrder} />
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
