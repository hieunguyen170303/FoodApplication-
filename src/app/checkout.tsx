import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Card, Switch } from "react-native-paper";
import { useCheckout } from "@/hooks/useCheckout";
import { DeliveryOptionCard } from "@/components/DeliveryOptionCard";
import { ICONS, IMAGES } from "@/constants";

export default function CheckoutScreen() {
  const router = useRouter();
  const {
    deliveryOptions,
    selectedDelivery,
    setSelectedDelivery,
    paymentMethods,
    selectedPayment,
    address,
    itemSubtotal,
    deliveryFee,
    discountAmount,
    totalPrice,
    loading,
    placeOrder,
  } = useCheckout();

  const [usePoints, setUsePoints] = React.useState<boolean>(false);

  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <View className="px-4 py-3 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
        >
          <Image
            source={ICONS.arrowBack}
            className="w-5 h-5"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text numberOfLines={1} className="text-base font-bold text-dark-100 font-quicksand-bold">
            {address.storeName}
          </Text>
          <Text numberOfLines={1} className="text-xs text-gray-400 font-quicksand">
            Khoảng cách tới chỗ bạn: {address.distance}
          </Text>
        </View>
      </View>

      {/* Main Scroll View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Delivery Address Section (Images 1 & 2) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-start flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-red-50 items-center justify-center mr-3 mt-0.5">
                <Image source={ICONS.location} className="w-4 h-4" style={{ tintColor: "#EF4444" }} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
                  {address.title}
                </Text>
                <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
                  {address.subtitle}
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg font-bold">›</Text>
          </View>

          {/* Floor / Note helper */}
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center flex-1 pr-2">
              <Text className="text-xs text-gray-500 font-quicksand mr-2">Số tầng / c...</Text>
              <View className="bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60">
                <Text className="text-[11px] text-sky-600 font-bold font-quicksand-bold">
                  Hỗ trợ tài xế giao hàng
                </Text>
              </View>
            </View>
            <TouchableOpacity className="px-3 py-1 bg-gray-100 rounded-full">
              <Text className="text-xs font-bold text-primary font-quicksand-bold">Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Options Selector (Images 1 & 2) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <View className="flex-row items-center mb-3">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
              🛍️ Tùy chọn giao hàng
            </Text>
          </View>

          {deliveryOptions.map((opt) => (
            <DeliveryOptionCard
              key={opt.id}
              option={opt}
              isSelected={selectedDelivery?.id === opt.id}
              onSelect={() => setSelectedDelivery(opt)}
            />
          ))}
        </View>

        {/* Order Summary Section (Image 1) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
              Tóm tắt đơn hàng
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-sm font-bold text-sky-600 font-quicksand-bold">Thêm món</Text>
            </TouchableOpacity>
          </View>

          {/* Food Item Row */}
          <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
            <Image source={IMAGES.burgerTwo} className="w-14 h-14 rounded-xl mr-3" resizeMode="cover" />
            <View className="flex-1 pr-2">
              <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">
                2 Miếng Gà Rán
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                2 Fried Chicken - Gà Giòn Cay
              </Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-xs font-bold text-sky-600 font-quicksand-bold">Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>

            <View className="items-end">
              <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">74.000</Text>
              <View className="w-6 h-6 rounded-full border border-emerald-500 items-center justify-center mt-1">
                <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">1</Text>
              </View>
            </View>
          </View>

          {/* Price Breakdown */}
          <View className="pt-3">
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs text-gray-500 font-quicksand">Tổng tạm tính</Text>
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold">{formatVND(itemSubtotal)}</Text>
            </View>
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs text-gray-500 font-quicksand">Phí giao hàng và phí áp dụng ⓘ</Text>
              <Text className="text-xs font-bold text-dark-100 font-quicksand-bold">{formatVND(deliveryFee)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold">♾ Giảm 12.000đ phí giao hàng</Text>
              <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">-{formatVND(discountAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Section (Images 2 & 3) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
              Thông tin thanh toán
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("Payment Methods", "MoMo, Tiền mặt, ZaloPay...")}>
              <Text className="text-sm font-bold text-sky-600 font-quicksand-bold">Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
            <View className="w-8 h-8 rounded-full bg-[#A50064] items-center justify-center mr-3">
              <Text className="text-white font-bold text-xs">mo</Text>
            </View>
            <Text className="text-sm font-bold text-dark-100 font-quicksand-bold flex-1">
              MoMo
            </Text>
            <Text className="text-emerald-600 font-bold text-xs font-quicksand-bold">✓ Đã chọn</Text>
          </View>
        </View>

        {/* Promotions & Rewards Section (Image 3) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <Text className="text-base font-bold text-dark-100 font-quicksand-bold mb-3">
            Áp dụng ưu đãi và giảm giá
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between py-2 border-b border-gray-100">
            <View className="flex-row items-center">
              <Text className="text-base mr-2">🏷️</Text>
              <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">Đã áp dụng 1 ưu đãi.</Text>
            </View>
            <Text className="text-gray-400 font-bold">›</Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-between py-2.5">
            <View className="flex-row items-center flex-1 pr-2">
              <Text className="text-base mr-2">🪙</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">300 GrabXu (giảm 10.000đ)</Text>
                <Text className="text-xs text-sky-600 font-bold font-quicksand-bold mt-0.5">Chọn số GrabXu muốn sử dụng</Text>
              </View>
            </View>
            <Switch
              value={usePoints}
              onValueChange={setUsePoints}
              color="#00B14F"
            />
          </View>
        </View>

        {/* Rewards Earned Header (Image 3) */}
        <View className="bg-white p-4 mb-3 border-b border-gray-100">
          <Text className="text-base font-bold text-dark-100 font-quicksand-bold mb-2">
            Nhận sau khi đơn hàng hoàn tất
          </Text>
          <View className="flex-row items-center">
            <Text className="text-base mr-2">🪙</Text>
            <Text className="text-sm font-bold text-dark-100 font-quicksand-bold">
              11 GrabXu (≈ 367đ) ⓘ
            </Text>
          </View>
        </View>

        {/* Terms Disclaimer */}
        <View className="px-5 py-2">
          <Text className="text-[11px] text-gray-400 font-quicksand text-center leading-4">
            Bằng việc đặt đơn này, bạn đã đồng ý <Text className="text-sky-600 underline">Điều khoản Sử dụng</Text> và <Text className="text-sky-600 underline">Quy chế Hoạt động</Text> của chúng tôi.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar (Đặt đơn) */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-2xl rounded-t-3xl">
        <View className="flex-row items-center justify-between mb-3 px-2">
          <View>
            <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
              Tổng cộng
            </Text>
            <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold">
              Bạn tiết kiệm được 12.000đ 🎉!
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold">
              {formatVND(totalPrice)}
            </Text>
            <Text className="text-xs text-gray-400 line-through font-quicksand">
              91.000đ
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={placeOrder}
          className="bg-[#00B14F] py-4 rounded-full items-center justify-center shadow-lg"
        >
          <Text className="text-white text-lg font-extrabold font-quicksand-bold">
            Đặt đơn
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
