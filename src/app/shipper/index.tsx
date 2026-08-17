import React, { useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useShipper } from "@/hooks/useShipper";
import { ShipperStatsHeader } from "@/components/ShipperStatsHeader";
import { ShipperOrderCard } from "@/components/ShipperOrderCard";
import { socketService } from "@/services/socketService";
import { ShipperOrder } from "@/types";

export default function ShipperDashboardScreen() {
  const {
    stats,
    availableOrders,
    activeOrder,
    loading,
    refreshData,
    handleAcceptOrder,
    handleUpdateStatus,
  } = useShipper();

  // Listen for real-time WebSocket new customer order push
  useEffect(() => {
    const unsubscribe = socketService.onNewAvailableOrder((newOrder) => {
      console.log("⚡ Shipper received real-time new order event:", newOrder.orderCode);
      Toast.show({
        type: "info",
        text1: "🔥 CÓ ĐƠN HÀNG MỚI!",
        text2: `Đơn hàng #${newOrder.orderCode} tại ${newOrder.storeName} vừa được khách đặt.`,
        position: "top",
        visibilityTime: 4500,
      });
      refreshData();
    });
    return () => unsubscribe();
  }, [refreshData]);

  const onAccept = async (orderId: string) => {
    // Strict 1-active-order check
    if (activeOrder !== null) {
      Toast.show({
        type: "error",
        text1: "🔒 Đang có 1 đơn hàng chưa hoàn thành!",
        text2: "Vui lòng giao xong đơn hiện tại trước khi nhận đơn mới.",
        position: "top",
        visibilityTime: 4000,
      });
      return;
    }

    try {
      await handleAcceptOrder(orderId);
      socketService.joinRoom(orderId);

      Toast.show({
        type: "success",
        text1: "⚡ Đã nhận đơn thành công!",
        text2: `Bạn đã nhận đơn hàng #${orderId}. Hãy di chuyển đến quán nhé!`,
        position: "top",
        visibilityTime: 3500,
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Lỗi nhận đơn",
        text2: err.message,
      });
    }
  };

  const onUpdate = async (orderId: string, newStatus: ShipperOrder["status"]) => {
    try {
      await handleUpdateStatus(orderId, newStatus);

      let stepIndex = 1;
      let statusText = "Đang giao hàng";
      if (newStatus === "PICKED_UP") {
        stepIndex = 1;
        statusText = "Tài xế đã lấy món tại quán!";
      } else if (newStatus === "DELIVERING") {
        stepIndex = 2;
        statusText = "Tài xế đang giao hàng đến bạn!";
      } else if (newStatus === "COMPLETED") {
        stepIndex = 3;
        statusText = "Đã giao hàng thành công!";
      }

      // Broadcast WebSocket Event to Customer App in real time!
      socketService.updateOrderStatus(orderId, newStatus, stepIndex, statusText);

      Toast.show({
        type: "success",
        text1: newStatus === "COMPLETED" ? "🎉 Đã hoàn thành đơn hàng!" : "✅ Cập nhật thành công!",
        text2: newStatus === "COMPLETED" ? "Đã mở khóa nhận đơn mới!" : statusText,
        position: "top",
        visibilityTime: 3500,
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Lỗi cập nhật",
        text2: err.message,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-2" edges={["top", "left", "right"]}>
      {/* Shipper Top Header Bar */}
      <View className="flex-row justify-between items-center mb-4 pt-2">
        <View>
          <Text className="text-xs font-semibold text-gray-400 font-quicksand">
            KÊNH DÀNH CHO TÀI XẾ
          </Text>
          <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold">
            Nguyễn Văn Hùng 👋
          </Text>
        </View>

        {/* Online Status Pill */}
        <View className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex-row items-center space-x-1">
          <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1" />
          <Text className="text-xs font-extrabold text-emerald-700 font-quicksand-bold">
            ONLINE 🟢
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshData} colors={["#FE8C00"]} />
        }
      >
        {/* Earnings & Performance Banner */}
        <ShipperStatsHeader stats={stats} onRefresh={refreshData} />

        {/* SECTION 1: Active Accepted Order (If Any) */}
        {activeOrder ? (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
                🚨 ĐƠN HÀNG ĐANG GIAO (1/1)
              </Text>
              <Text className="text-xs font-bold text-primary font-quicksand-bold">
                Đang xử lý ⚡
              </Text>
            </View>

            <ShipperOrderCard
              order={activeOrder}
              isActive={true}
              onUpdateStatus={onUpdate}
            />
          </View>
        ) : (
          <View className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 mb-5 flex-row items-center">
            <Text className="text-xl mr-2.5">✅</Text>
            <View className="flex-1">
              <Text className="text-xs font-bold text-emerald-800 font-quicksand-bold">
                SẴN SÀNG NHẬN ĐƠN MỚI
              </Text>
              <Text className="text-[11px] text-emerald-600 font-quicksand">
                Bạn chưa có đơn hàng nào đang giao. Hãy chọn 1 đơn hàng bên dưới để bắt đầu!
              </Text>
            </View>
          </View>
        )}

        {/* Lock Banner if Shipper holds active order */}
        {activeOrder && (
          <View className="bg-amber-50 p-3 rounded-2xl border border-amber-200 mb-5 flex-row items-center">
            <Text className="text-xl mr-2.5">🔒</Text>
            <View className="flex-1">
              <Text className="text-xs font-bold text-amber-800 font-quicksand-bold">
                ĐANG GIAO ĐƠN #{activeOrder.orderCode}
              </Text>
              <Text className="text-[11px] text-amber-700 font-quicksand">
                Quy định: Mỗi tài xế chỉ giao 1 đơn hàng tại một thời điểm. Hoàn thành đơn để mở khóa!
              </Text>
            </View>
          </View>
        )}

        {/* SECTION 2: Available Orders Feed */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
              ⚡ ĐƠN HÀNG CHỜ NHẬN ({availableOrders.length})
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand">
              Ưu tiên đơn mới
            </Text>
          </View>

          {availableOrders.length === 0 ? (
            <View className="bg-white p-8 rounded-2xl border border-gray-100 items-center justify-center">
              <Text className="text-3xl mb-2">🛵</Text>
              <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold mb-1">
                Chưa có đơn hàng mới
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand text-center">
                Vui lòng duy trì ứng dụng ở trạng thái ONLINE để nhận đơn sớm nhất!
              </Text>
            </View>
          ) : (
            availableOrders.map((ord) => (
              <ShipperOrderCard
                key={ord.id}
                order={ord}
                isActive={false}
                hasActiveOrder={activeOrder !== null}
                onAccept={onAccept}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
