import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, Alert, Linking } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import { Order } from "@/types";

interface ActiveOrderCardProps {
  order: Order;
  onPressTrack?: () => void;
}

export const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({
  order,
  onPressTrack,
}) => {
  const router = useRouter();
  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  const isCompleted = order.currentStepIndex === 3 || order.status === "COMPLETED";

  const steps = [
    { label: "Đã nhận đơn", done: (order.currentStepIndex ?? 0) >= 0 },
    { label: "Đang chế biến", done: (order.currentStepIndex ?? 0) >= 1 },
    { label: "Đang giao", done: (order.currentStepIndex ?? 0) >= 2 },
    { label: "Đã đến nơi", done: (order.currentStepIndex ?? 0) >= 3 },
  ];

  const handleCallDriver = () => {
    Linking.openURL(`tel:${order.driverInfo?.phone || "0901234567"}`).catch(() => {
      Alert.alert("Gọi tài xế", `Số điện thoại: ${order.driverInfo?.phone || "0901234567"}`);
    });
  };

  return (
    <Card
      elevation={2}
      className="bg-white rounded-3xl mb-5 overflow-hidden border border-orange-100 shadow-md"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Header Banner */}
      <View className="bg-gradient-to-r bg-primary/10 p-4 border-b border-orange-100 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 pr-2">
          <Image
            source={order.storeLogo}
            className="w-12 h-12 rounded-xl mr-3"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text numberOfLines={1} className="text-base font-bold text-dark-100 font-quicksand-bold">
              {order.storeName}
            </Text>
            <Text className="text-xs text-primary font-bold font-quicksand-bold mt-0.5">
              🛵 {order.statusText}
            </Text>
          </View>
        </View>
        <Chip
          compact
          style={{ backgroundColor: isCompleted ? "#ECFDF5" : "#FFF7ED", borderRadius: 12 }}
          textStyle={{
            color: isCompleted ? "#047857" : "#FE8C00",
            fontSize: 11,
            fontFamily: "Quicksand-Bold",
            fontWeight: "700",
          }}
        >
          {isCompleted ? "✅ Đã giao thành công" : order.estimatedTime}
        </Chip>
      </View>

      <Card.Content className="p-4">
        {/* Timeline Stepper */}
        <View className="my-2">
          <View className="flex-row items-center justify-between px-2">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step Node */}
                <View className="items-center z-10">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center border-2 ${
                      step.done
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text className={`text-xs font-bold ${step.done ? "text-white" : "text-gray-400"}`}>
                      {step.done ? "✓" : idx + 1}
                    </Text>
                  </View>
                  <Text className={`text-[10px] font-bold font-quicksand-bold mt-1 text-center ${step.done ? "text-primary" : "text-gray-400"}`}>
                    {step.label}
                  </Text>
                </View>

                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <View
                    className={`flex-1 h-[3px] -mt-4 mx-1 rounded ${
                      steps[idx + 1].done ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Driver Contact Row */}
        {order.driverInfo && (
          <View className="flex-row items-center justify-between bg-gray-50 p-3 rounded-2xl my-3 border border-gray-100">
            <View className="flex-row items-center flex-1">
              <Image
                source={order.driverInfo.avatar}
                className="w-10 h-10 rounded-full mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">
                  {order.driverInfo.name}
                </Text>
                <Text className="text-xs text-gray-400 font-quicksand">
                  {order.driverInfo.vehicleNumber} • ⭐ {order.driverInfo.rating}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={handleCallDriver}
                className="w-9 h-9 rounded-full bg-emerald-500 items-center justify-center"
              >
                <Text className="text-white text-sm font-bold">📞</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`/chat/${order.id}` as any)}
                className="w-9 h-9 rounded-full bg-primary items-center justify-center shadow-sm"
              >
                <Text className="text-white text-sm font-bold">💬</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Order Items Summary */}
        <View className="border-t border-gray-100 pt-3">
          {order.items.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center mb-1">
              <Text className="text-xs text-gray-700 font-quicksand flex-1 pr-2">
                {item.quantity}x {item.name}
              </Text>
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold">
                {formatVND(item.price)}
              </Text>
            </View>
          ))}
          <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-dashed border-gray-200">
            <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">Tổng thanh toán</Text>
            <Text className="text-base font-extrabold text-primary font-quicksand-bold">
              {formatVND(order.totalPrice)}
            </Text>
          </View>
        </View>

        {/* Action Button: Review Button when Completed */}
        {isCompleted ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push(`/review/${order.id}?storeName=${encodeURIComponent(order.storeName)}` as any)
            }
            className="mt-4 bg-primary py-3 rounded-full items-center justify-center shadow-md shadow-orange-500/20 flex-row space-x-1"
          >
            <Text className="text-white font-extrabold text-sm font-quicksand-bold">
              ⭐ Đánh giá cửa hàng & tài xế
            </Text>
          </TouchableOpacity>
        ) : (
          <Button
            mode="contained"
            onPress={onPressTrack || (() => Alert.alert("Tracking", "Opening map position..."))}
            buttonColor="#FE8C00"
            textColor="#FFFFFF"
            labelStyle={{ fontFamily: "Quicksand-Bold", fontWeight: "700" }}
            className="mt-4 rounded-full py-0.5"
          >
            📍 Xem vị trí tài xế thời gian thực
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
