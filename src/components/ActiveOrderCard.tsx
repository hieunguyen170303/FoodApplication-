import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, Alert, Linking } from "react-native";
import { ICONS, IMAGES } from "@/constants";
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

  const resolveImage = (img: any, fallback: any) => {
    if (!img) return fallback;
    if (typeof img === "number") return img;
    if (typeof img === "object" && img.uri) return img;
    if (typeof img === "string" && img.startsWith("http")) return { uri: img };
    return fallback;
  };

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
    <View className="bg-white/95 rounded-[28px] mb-5 overflow-hidden border border-orange-500/15 shadow-xl shadow-orange-500/10">
      {/* Header Banner */}
      <View className="bg-orange-50/70 p-4 border-b border-orange-100/80 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 pr-2">
          <Image
            source={resolveImage(order.storeLogo, IMAGES.logo)}
            className="w-12 h-12 rounded-2xl mr-3 border border-orange-200/60"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text numberOfLines={1} className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              {order.storeName}
            </Text>
            <Text className="text-xs text-primary font-bold font-quicksand-bold mt-0.5">
              {order.statusText}
            </Text>
          </View>
        </View>

        <View className={`px-3 py-1 rounded-full border ${isCompleted ? "bg-emerald-50 border-emerald-200" : "bg-orange-100 border-orange-200"}`}>
          <Text className={`text-[11px] font-extrabold font-quicksand-bold ${isCompleted ? "text-emerald-700" : "text-primary"}`}>
            {isCompleted ? "Đã giao hàng thành công" : order.estimatedTime}
          </Text>
        </View>
      </View>

      <View className="p-4">
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
                        ? "bg-primary border-primary shadow-xs shadow-orange-500/40"
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
          <View className="flex-row items-center justify-between bg-orange-50/40 p-3 rounded-2xl my-3 border border-orange-100/60">
            <View className="flex-row items-center flex-1">
              <Image
                source={resolveImage(order.driverInfo.avatar, IMAGES.avatar)}
                className="w-10 h-10 rounded-full mr-3 border border-primary"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                  {order.driverInfo.name}
                </Text>
                <View className="flex-row items-center mt-0.5">
                  <Text className="text-xs text-gray-500 font-quicksand mr-1.5">
                    {order.driverInfo.vehicleNumber}
                  </Text>
                  <Image
                    source={ICONS.star}
                    className="w-3 h-3 mr-0.5"
                    style={{ tintColor: "#F59E0B" }}
                    resizeMode="contain"
                  />
                  <Text className="text-xs font-bold text-amber-600 font-quicksand-bold">
                    {order.driverInfo.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCallDriver}
                className="w-9 h-9 rounded-full bg-emerald-500 items-center justify-center shadow-xs"
              >
                <Image
                  source={ICONS.phone}
                  className="w-4 h-4"
                  style={{ tintColor: "#FFFFFF" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push(`/chat/${order.id}` as any)}
                className="w-9 h-9 rounded-full bg-primary items-center justify-center shadow-xs"
              >
                <Image
                  source={ICONS.envelope}
                  className="w-4 h-4"
                  style={{ tintColor: "#FFFFFF" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Order Items Summary */}
        <View className="border-t border-gray-100 pt-3">
          {(order.items || []).map((item) => (
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

        {/* Action Button */}
        {isCompleted ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push(`/review/${order.id}?storeName=${encodeURIComponent(order.storeName)}` as any)
            }
            className="mt-4 bg-primary py-3.5 rounded-full items-center justify-center shadow-md shadow-orange-500/25"
          >
            <Text className="text-white font-extrabold text-sm font-quicksand-bold">
              Đánh giá cửa hàng & tài xế
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressTrack || (() => Alert.alert("Tracking", "Opening map position..."))}
            className="mt-4 bg-primary py-3.5 rounded-full items-center justify-center shadow-md shadow-orange-500/25"
          >
            <Text className="text-white font-extrabold text-sm font-quicksand-bold">
              Xem vị trí tài xế thời gian thực
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
