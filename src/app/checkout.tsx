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
import { Switch } from "react-native-paper";
import { useCheckout } from "@/hooks/useCheckout";
import { DeliveryOptionCard } from "@/components/DeliveryOptionCard";
import { ICONS, IMAGES } from "@/constants";

export default function CheckoutScreen() {
  const router = useRouter();
  const {
    cartItems,
    currentRestaurant,
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
    <SafeAreaView className="flex-1 bg-[#FDFBF7]" edges={["top", "left", "right"]}>
      {/* Top Header */}
      <View className="px-4 py-3 flex-row items-center bg-white/95 border-b border-orange-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 items-center justify-center mr-3"
        >
          <Image
            source={ICONS.arrowBack}
            className="w-5 h-5"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text numberOfLines={1} className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
            {currentRestaurant.name || address.storeName}
          </Text>
          <Text numberOfLines={1} className="text-xs text-gray-400 font-quicksand">
            Khoảng cách tới chỗ bạn: {address.distance}
          </Text>
        </View>
      </View>

      {/* Main Scroll View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Delivery Address Section */}
        <View className="bg-white/95 p-4 mb-3 border-b border-orange-100">
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-start flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-red-50 items-center justify-center mr-3 mt-0.5 border border-red-100">
                <Image source={ICONS.location} className="w-4 h-4" style={{ tintColor: "#EF4444" }} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
                  {address.title}
                </Text>
                <Text className="text-xs text-gray-500 font-quicksand mt-0.5">
                  {address.subtitle}
                </Text>
              </View>
            </View>
            <Image
              source={ICONS.arrowRight}
              className="w-4 h-4 mt-1"
              style={{ tintColor: "#9CA3AF" }}
              resizeMode="contain"
            />
          </View>

          {/* Floor / Note helper */}
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center flex-1 pr-2">
              <Text className="text-xs text-gray-500 font-quicksand mr-2">Ghi chú giao hàng...</Text>
              <View className="bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/60">
                <Text className="text-[11px] text-sky-600 font-bold font-quicksand-bold">
                  Hỗ trợ tài xế giao tận tay
                </Text>
              </View>
            </View>
            <TouchableOpacity className="px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
              <Text className="text-xs font-bold text-primary font-quicksand-bold">Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Options Selector */}
        <View className="bg-white/95 p-4 mb-3 border-b border-orange-100">
          <View className="flex-row items-center mb-3">
            <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              Tùy chọn giao hàng
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

        {/* Order Summary Section */}
        <View className="bg-white/95 p-4 mb-3 border-b border-orange-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              Tóm tắt đơn hàng ({currentRestaurant.name})
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-sm font-bold text-sky-600 font-quicksand-bold">Thêm món</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Food Items List from CartContext */}
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => {
              const selectedOptsObj = cartItem.selectedOptions || {};
              const optionsList = Object.values(selectedOptsObj);
              const hasOptions = optionsList.length > 0;

              return (
                <View key={cartItem.id} className="flex-row items-center justify-between py-2.5 border-b border-gray-100">
                  <Image
                    source={cartItem.menuItem?.image || currentRestaurant.logo || IMAGES.burgerTwo}
                    className="w-14 h-14 rounded-xl mr-3"
                    resizeMode="cover"
                  />
                  <View className="flex-1 pr-2">
                    <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                      {cartItem.menuItem?.name || "Món ăn"}
                    </Text>
                    <Text className="text-xs text-gray-400 font-quicksand">
                      {hasOptions
                        ? optionsList.map((o) => o?.name).filter(Boolean).join(", ")
                        : cartItem.menuItem?.description || "Món ăn đặt giao"}
                    </Text>
                    {cartItem.note ? (
                      <Text className="text-[11px] text-orange-600 font-quicksand mt-0.5">
                        Ghi chú: {cartItem.note}
                      </Text>
                    ) : null}
                  </View>

                  <View className="items-end">
                    <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                      {formatVND(cartItem.itemTotal || 0)}
                    </Text>
                    <View className="w-6 h-6 rounded-full border border-emerald-500 items-center justify-center mt-1 bg-emerald-50">
                      <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">
                        {cartItem.quantity || 1}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View className="flex-row items-center justify-between py-2 border-b border-gray-100">
              <Image source={IMAGES.burgerTwo} className="w-14 h-14 rounded-xl mr-3" resizeMode="cover" />
              <View className="flex-1 pr-2">
                <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">
                  2 Miếng Gà Rán - Gà Giòn Cay
                </Text>
                <Text className="text-xs text-gray-400 font-quicksand">
                  Combo Gà Rán Giòn Cay
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold">74.000đ</Text>
                <View className="w-6 h-6 rounded-full border border-emerald-500 items-center justify-center mt-1">
                  <Text className="text-xs font-bold text-emerald-600 font-quicksand-bold">1</Text>
                </View>
              </View>
            </View>
          )}

          {/* Price Breakdown */}
          <View className="pt-3">
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs text-gray-500 font-quicksand">Tổng tạm tính</Text>
              <Text className="text-xs font-extrabold text-[#181C2E] font-quicksand-bold">{formatVND(itemSubtotal)}</Text>
            </View>
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs text-gray-500 font-quicksand">Phí giao hàng và phí áp dụng</Text>
              <Text className="text-xs font-extrabold text-[#181C2E] font-quicksand-bold">{formatVND(deliveryFee)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold">Giảm 12.000đ phí giao hàng</Text>
              <Text className="text-xs font-extrabold text-emerald-600 font-quicksand-bold">-{formatVND(discountAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method Section */}
        <View className="bg-white/95 p-4 mb-3 border-b border-orange-100">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              Thông tin thanh toán
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("Phương thức thanh toán", "MoMo, Tiền mặt, ZaloPay...")}>
              <Text className="text-sm font-bold text-sky-600 font-quicksand-bold">Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
            <View className="w-8 h-8 rounded-full bg-[#A50064] items-center justify-center mr-3">
              <Text className="text-white font-bold text-xs">mo</Text>
            </View>
            <Text className="text-sm font-extrabold text-[#181C2E] font-quicksand-bold flex-1">
              MoMo
            </Text>
            <Text className="text-emerald-600 font-bold text-xs font-quicksand-bold">Đã chọn</Text>
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
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-orange-100 shadow-2xl rounded-t-3xl">
        <View className="flex-row items-center justify-between mb-3 px-2">
          <View>
            <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold">
              Tổng cộng
            </Text>
            <Text className="text-xs text-emerald-600 font-bold font-quicksand-bold">
              Tiết kiệm 12.000đ phí giao hàng
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-xl font-extrabold text-[#181C2E] font-quicksand-bold">
              {formatVND(totalPrice)}
            </Text>
            <Text className="text-xs text-gray-400 line-through font-quicksand">
              {formatVND(totalPrice + 12000)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={placeOrder}
          className="bg-primary py-4 rounded-full items-center justify-center shadow-lg shadow-orange-500/30"
        >
          <Text className="text-white text-base font-extrabold font-quicksand-bold">
            Đặt đơn hàng ngay
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
