import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useOrders } from "@/hooks/useOrders";
import { ActiveOrderCard } from "@/components/ActiveOrderCard";
import { OrderHistoryCard } from "@/components/OrderHistoryCard";
import { socketService } from "@/services/socketService";
import { apiClient } from "@/services/apiClient";
import { Order, OrderStatus } from "@/types";

export default function OrdersScreen() {
  const router = useRouter();
  const { orderHistory, loading, refreshOrders } = useOrders();

  const [liveOrder, setLiveOrder] = useState<Order | null>(null);

  // Ref always tracks latest liveOrder — no stale closure in WS / poll callbacks
  const liveOrderRef = useRef<Order | null>(null);
  liveOrderRef.current = liveOrder;

  const navigatedRef = useRef(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Navigate to review ───────────────────────────────────────────────────
  // Takes orderId + storeName directly — works even when liveOrder state is null.
  const goToReview = useCallback(
    (orderId: string, storeName: string) => {
      if (navigatedRef.current) return; // prevent double-navigate
      navigatedRef.current = true;

      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      console.log("[Orders] → goToReview:", orderId);

      Toast.show({
        type: "success",
        text1: "Đơn hàng đã giao thành công! 🎉",
        text2: "Hãy đánh giá cửa hàng & tài xế 🌟",
        position: "top",
        visibilityTime: 2500,
      });

      setTimeout(() => {
        router.push(
          `/review/${orderId}?storeName=${encodeURIComponent(storeName)}` as any
        );
      }, 600);
    },
    [router]
  );

  // ─── WebSocket listener ───────────────────────────────────────────────────
  // Registered ONCE. Uses liveOrderRef so no stale closure.
  // On COMPLETED: navigate immediately — does NOT wait for state/poll.
  useEffect(() => {
    const unsubscribe = socketService.onOrderStatusChanged((data) => {
      const status = (data.status as OrderStatus) ?? "COMPLETED";
      const stepIndex = data.stepIndex ?? 3;
      const statusText = data.statusText ?? "";
      const eventOrderId: string = data.orderId ?? "";

      console.log("[Orders] WS:", status, eventOrderId);

      if (status === "COMPLETED") {
        // Get storeName from the ref (current live order), or use fallback
        const storeName = liveOrderRef.current?.storeName ?? "Nhà hàng";
        goToReview(eventOrderId, storeName);
        return; // skip state update — we're navigating away
      }

      // Intermediate statuses: update UI state
      setLiveOrder((prev) => {
        if (!prev) return prev;
        return { ...prev, status, currentStepIndex: stepIndex, statusText };
      });
    });

    return () => unsubscribe();
  }, [goToReview]); // goToReview is stable (useCallback with [router])

  // ─── Polling — fallback when WS is missed (socket disconnect, fresh start) ─
  const startPolling = useCallback(() => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      if (navigatedRef.current) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        return;
      }
      try {
        const res = await apiClient.get("/orders/active");
        const order: Order | null = res?.data ?? null;

        if (!order) {
          setLiveOrder(null);
          return;
        }

        // Update tracking UI
        setLiveOrder(order);

        if (order.status === "COMPLETED" || order.currentStepIndex === 3) {
          goToReview(order.id, order.storeName ?? "Nhà hàng");
        }
      } catch {
        /* silent — will retry next tick */
      }
    }, 2000);
  }, [goToReview]);

  // ─── Join socket room for real-time events ────────────────────────────────
  useEffect(() => {
    if (liveOrder?.id) {
      socketService.joinRoom(liveOrder.id);
    }
  }, [liveOrder?.id]);

  // ─── Screen focus: reset guard, start polling, refresh history ────────────
  useFocusEffect(
    useCallback(() => {
      navigatedRef.current = false;
      startPolling();
      refreshOrders();

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      };
    }, [startPolling, refreshOrders])
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#FDFBF7]"
      edges={["top", "left", "right"]}
    >
      <View className="px-5 pt-3 pb-3">
        <Text className="text-[11px] font-bold tracking-wider text-primary uppercase font-quicksand-bold">
          TRACKING & HISTORY
        </Text>
        <Text className="text-2xl font-extrabold text-[#181C2E] font-quicksand-bold mt-0.5">
          Đơn hàng của bạn
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingHorizontal: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshOrders}
            tintColor="#FE8C00"
          />
        }
      >
        {liveOrder && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-extrabold text-[#181C2E] font-quicksand-bold">
                Đơn hàng đang giao
              </Text>
              <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
                <Text className="text-xs font-extrabold text-emerald-700 font-quicksand-bold">
                  LIVE TRACKING
                </Text>
              </View>
            </View>
            <ActiveOrderCard order={liveOrder} />
          </View>
        )}

        <View className="mb-4">
          <Text className="text-lg font-extrabold text-[#181C2E] font-quicksand-bold mb-3">
            Lịch sử đơn hàng
          </Text>
          {orderHistory.length > 0 ? (
            orderHistory.map((o) => <OrderHistoryCard key={o.id} order={o} />)
          ) : (
            <View className="bg-white/90 p-8 rounded-2xl items-center justify-center border border-gray-100 shadow-xs">
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
