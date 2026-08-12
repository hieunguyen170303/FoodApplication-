import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import { Order } from "@/types";

interface OrderHistoryCardProps {
  order: Order;
  onReorder?: () => void;
}

export const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  order,
  onReorder,
}) => {
  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;
  const isCompleted = order.status === "COMPLETED";

  return (
    <Card
      elevation={1}
      className="bg-white rounded-2xl mb-3.5 border border-gray-100 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Card.Content className="p-3.5">
        {/* Header Store & Status */}
        <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
          <View className="flex-row items-center flex-1 mr-2">
            <Image
              source={order.storeLogo}
              className="w-10 h-10 rounded-xl mr-3"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text numberOfLines={1} className="text-base font-bold text-dark-100 font-quicksand-bold">
                {order.storeName}
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                {order.orderDate}
              </Text>
            </View>
          </View>

          <Chip
            compact
            style={{
              backgroundColor: isCompleted ? "#ECFDF5" : "#FEF2F2",
              borderRadius: 12,
            }}
            textStyle={{
              color: isCompleted ? "#047857" : "#EF4444",
              fontSize: 11,
              fontFamily: "Quicksand-Bold",
              fontWeight: "700",
            }}
          >
            {isCompleted ? "✓ Hoàn thành" : "✕ Đã hủy"}
          </Chip>
        </View>

        {/* Item List Summary */}
        <View className="py-3">
          {order.items.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center mb-1">
              <Text numberOfLines={1} className="text-xs text-gray-700 font-quicksand flex-1 pr-2">
                {item.quantity}x {item.name}
              </Text>
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold">
                {formatVND(item.price)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Price & Action Buttons */}
        <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
          <View>
            <Text className="text-[10px] text-gray-400 font-quicksand uppercase">Tổng tiền</Text>
            <Text className="text-sm font-extrabold text-primary font-quicksand-bold">
              {formatVND(order.totalPrice)}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            {isCompleted && (
              <Button
                mode="outlined"
                compact
                onPress={() => Alert.alert("Review", "Opening review modal...")}
                textColor="#4B5563"
                style={{ borderColor: "#D1D5DB" }}
                labelStyle={{ fontFamily: "Quicksand-Bold", fontSize: 12 }}
              >
                Đánh giá
              </Button>
            )}
            <Button
              mode="contained"
              compact
              onPress={onReorder || (() => Alert.alert("Reorder", `Reordering from ${order.storeName}...`))}
              buttonColor="#FE8C00"
              textColor="#FFFFFF"
              labelStyle={{ fontFamily: "Quicksand-Bold", fontSize: 12 }}
            >
              Đặt lại
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
