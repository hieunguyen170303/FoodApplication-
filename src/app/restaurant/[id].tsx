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
import { useLocalSearchParams, useRouter } from "expo-router";
import { Chip } from "react-native-paper";
import { useRestaurantDetail } from "@/hooks/useRestaurantDetail";
import { FoodCustomizationModal } from "@/components/FoodCustomizationModal";
import { BottomCartBar } from "@/components/BottomCartBar";
import { ICONS } from "@/constants";
import { RestaurantMenuItem } from "@/types";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    restaurant,
    loading,
    customizingItem,
    modalVisible,
    selectedOptions,
    quantity,
    setQuantity,
    note,
    setNote,
    totalCartPrice,
    totalCartCount,
    openCustomizationModal,
    closeCustomizationModal,
    selectOption,
    calculateItemTotal,
    confirmAddToCart,
  } = useRestaurantDetail(id || "r2");

  if (loading || !restaurant) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-400 font-quicksand">Loading restaurant menu...</Text>
      </SafeAreaView>
    );
  }

  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={["top", "left", "right"]}>
      {/* Top App Header */}
      <View className="px-4 py-3 flex-row items-center justify-between bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-2"
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
            {restaurant.name}
          </Text>
          <Text numberOfLines={1} className="text-xs text-gray-400 font-quicksand">
            - {restaurant.branch}
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mr-2">
          <Text className="text-xs font-bold text-dark-100 font-quicksand-bold">
            👥 Đặt đơn nhóm
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: totalCartCount > 0 ? 140 : 80 }}
      >
        {/* Store Info Banner Card (Image 1 Header) */}
        <View className="bg-white p-4 mx-4 mt-3 rounded-3xl border border-gray-100 shadow-sm">
          <View className="flex-row items-center">
            <Image
              source={restaurant.logo}
              className="w-16 h-16 rounded-2xl mr-3.5"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-xl font-bold text-dark-100 font-quicksand-bold">
                {restaurant.name}
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                - {restaurant.branch}
              </Text>

              <View className="flex-row items-center mt-1">
                <Image
                  source={ICONS.star}
                  className="w-3.5 h-3.5 mr-1"
                  style={{ tintColor: "#FE8C00" }}
                  resizeMode="contain"
                />
                <Text className="text-xs font-bold text-dark-100 font-quicksand-bold mr-1">
                  {restaurant.rating}
                </Text>
                <Text className="text-xs text-gray-400 font-quicksand mr-2">
                  ({restaurant.reviewCount})
                </Text>

                {restaurant.originalDeliveryFee && (
                  <Text className="text-xs text-gray-400 line-through mr-1 font-quicksand">
                    {restaurant.originalDeliveryFee}
                  </Text>
                )}
                <Text className="text-xs font-bold text-primary font-quicksand-bold mr-1.5">
                  {restaurant.deliveryFee}
                </Text>
                <Text className="text-xs text-gray-500 font-quicksand">
                  • {restaurant.deliveryTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Action Buttons */}
          <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <TouchableOpacity className="flex-1 bg-gray-50 py-2 rounded-full items-center mr-2 border border-gray-200/60">
              <Text className="text-xs font-bold text-gray-700 font-quicksand-bold">
                👥 Đặt đơn nhóm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-50 py-2 rounded-full items-center mr-2 border border-gray-200/60">
              <Text className="text-xs font-bold text-gray-700 font-quicksand-bold">
                📅 Đặt trước
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-50 py-2 rounded-full items-center border border-gray-200/60">
              <Text className="text-xs font-bold text-gray-700 font-quicksand-bold">
                🔗 Chia sẻ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Voucher Cards Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            {restaurant.vouchers.map((v) => (
              <View
                key={v.id}
                className="bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200/60 mr-2 flex-row items-center"
              >
                <Text className="text-base mr-2">🏷️</Text>
                <View>
                  <Text className="text-xs font-bold text-emerald-800 font-quicksand-bold">
                    {v.title}
                  </Text>
                  <Text className="text-[10px] text-emerald-600 font-quicksand">
                    {v.subtitle}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Category Selector Dropdown & Filter Bar (Images 2 & 3) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="my-3 px-4 flex-row"
        >
          <TouchableOpacity className="px-4 py-2 bg-white rounded-full mr-2 border border-gray-200 flex-row items-center">
            <Text className="text-xs font-bold text-dark-100 font-quicksand-bold mr-1">
              Dành cho bạn ▼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-white rounded-full mr-2 border border-gray-200">
            <Text className="text-xs font-bold text-gray-700 font-quicksand-bold">
              🌱 Ăn chay
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 rounded-full bg-white items-center justify-center border border-gray-200">
            <Text className="text-xs">🔍</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Menu Sections */}
        {restaurant.menuSections.map((section) => (
          <View key={section.id} className="mb-6 px-4">
            <Text className="text-lg font-bold text-dark-100 font-quicksand-bold mb-3">
              {section.title}
            </Text>

            {/* If section is "Ưu đãi hôm nay" -> Horizontal Scroll Promo Cards */}
            {section.id === "sec_today_deals" ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {section.items.map((item) => (
                  <View
                    key={item.id}
                    className="w-[280px] bg-white p-3 rounded-2xl border border-gray-100 mr-3 shadow-sm"
                  >
                    <Image
                      source={item.image}
                      className="w-full h-36 rounded-xl mb-2"
                      resizeMode="cover"
                    />
                    <Text
                      numberOfLines={2}
                      className="text-sm font-bold text-dark-100 font-quicksand-bold mb-1"
                    >
                      {item.name}
                    </Text>
                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row items-center">
                        <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold mr-2">
                          {formatVND(item.price)}
                        </Text>
                        {item.originalPrice && (
                          <Text className="text-xs text-gray-400 line-through font-quicksand">
                            {formatVND(item.originalPrice)}
                          </Text>
                        )}
                      </View>

                      {/* Green Plus Button (+) */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openCustomizationModal(item)}
                        className="w-8 h-8 rounded-full bg-[#00B14F] items-center justify-center shadow-md"
                      >
                        <Text className="text-white text-lg font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              /* Regular List of Food Items (Images 2 & 3) */
              <View>
                {section.items.map((item: RestaurantMenuItem) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => openCustomizationModal(item)}
                    className="flex-row bg-white p-3 rounded-2xl mb-3 border border-gray-100 shadow-sm items-center justify-between"
                  >
                    <View className="flex-1 pr-3">
                      {item.tag && (
                        <View className="self-start bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 mb-1">
                          <Text className="text-[10px] font-bold text-emerald-700 font-quicksand-bold">
                            {item.tag}
                          </Text>
                        </View>
                      )}

                      <Text
                        numberOfLines={2}
                        className="text-sm font-bold text-dark-100 font-quicksand-bold mb-1"
                      >
                        {item.name}
                      </Text>

                      {item.description ? (
                        <Text
                          numberOfLines={2}
                          className="text-xs text-gray-400 font-quicksand mb-2"
                        >
                          {item.description}
                        </Text>
                      ) : null}

                      <View className="flex-row items-center mt-1">
                        <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold mr-2">
                          {formatVND(item.price)}
                        </Text>
                        {item.originalPrice && (
                          <Text className="text-xs text-gray-400 line-through font-quicksand">
                            {formatVND(item.originalPrice)}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Right Image & Floating Green Plus Button */}
                    <View className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        source={item.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openCustomizationModal(item)}
                        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#00B14F] items-center justify-center shadow-md z-10"
                      >
                        <Text className="text-white text-lg font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Food Option Customization Modal (Images 4 & 5) */}
      <FoodCustomizationModal
        visible={modalVisible}
        item={customizingItem}
        selectedOptions={selectedOptions}
        quantity={quantity}
        note={note}
        itemTotal={calculateItemTotal()}
        onClose={closeCustomizationModal}
        onSelectOption={selectOption}
        onQuantityChange={setQuantity}
        onNoteChange={setNote}
        onAddToCart={confirmAddToCart}
      />

      {/* Sticky Bottom Cart Bar (Images 1, 2, 3) */}
      <BottomCartBar
        totalCount={totalCartCount}
        totalPrice={totalCartPrice}
        onPressCart={() => {
          router.push("/checkout" as any);
        }}
      />
    </SafeAreaView>
  );
}
