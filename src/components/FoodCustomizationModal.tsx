import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { RadioButton, Chip } from "react-native-paper";
import { RestaurantMenuItem, FoodOption } from "@/types";

interface FoodCustomizationModalProps {
  visible: boolean;
  item: RestaurantMenuItem | null;
  selectedOptions: { [groupId: string]: FoodOption };
  quantity: number;
  note: string;
  itemTotal: number;
  onClose: () => void;
  onSelectOption: (groupId: string, option: FoodOption) => void;
  onQuantityChange: (qty: number) => void;
  onNoteChange: (text: string) => void;
  onAddToCart: () => void;
}

export const FoodCustomizationModal: React.FC<FoodCustomizationModalProps> = ({
  visible,
  item,
  selectedOptions,
  quantity,
  note,
  itemTotal,
  onClose,
  onSelectOption,
  onQuantityChange,
  onNoteChange,
  onAddToCart,
}) => {
  if (!item) return null;

  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header Image & Action Buttons */}
          <View className="relative w-full h-[260px] bg-gray-100">
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Top Close (X) & Share Buttons */}
            <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-md"
              >
                <Text className="text-xl font-bold text-dark-100">✕</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-md">
                <Text className="text-lg font-bold text-dark-100">➦</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Food Details Section */}
          <View className="p-5 border-b border-gray-100">
            <View className="flex-row items-start justify-between">
              <Text className="text-xl font-bold text-dark-100 font-quicksand-bold flex-1 mr-3 leading-6">
                {item.name}
              </Text>
              <View className="items-end">
                <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold">
                  {formatVND(item.price)}
                </Text>
                {item.originalPrice && (
                  <Text className="text-xs text-gray-400 line-through font-quicksand">
                    Giá gốc {formatVND(item.originalPrice)}
                  </Text>
                )}
              </View>
            </View>
            {item.description && (
              <Text className="text-xs text-gray-500 font-quicksand mt-2 leading-4">
                {item.description}
              </Text>
            )}
          </View>

          {/* Customization Option Groups */}
          {item.optionGroups?.map((group) => {
            const currentSelected = selectedOptions[group.id];

            return (
              <View
                key={group.id}
                className="p-5 border-b border-gray-100 bg-white"
              >
                {/* Option Group Header */}
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
                    {group.title}
                  </Text>
                  <Chip
                    compact
                    style={{ backgroundColor: "#ECFDF5", height: 26 }}
                    textStyle={{
                      color: "#047857",
                      fontSize: 11,
                      fontFamily: "Quicksand-Bold",
                      fontWeight: "700",
                    }}
                  >
                    Đã áp dụng
                  </Chip>
                </View>

                {/* Radio Options List */}
                <RadioButton.Group
                  onValueChange={(val) => {
                    const opt = group.options.find((o) => o.id === val);
                    if (opt) onSelectOption(group.id, opt);
                  }}
                  value={currentSelected?.id || ""}
                >
                  {group.options.map((opt) => (
                    <TouchableOpacity
                      key={opt.id}
                      activeOpacity={0.8}
                      onPress={() => onSelectOption(group.id, opt)}
                      className="flex-row items-center justify-between py-2.5"
                    >
                      <View className="flex-row items-center flex-1 pr-2">
                        <RadioButton.Android
                          value={opt.id}
                          color="#00B14F"
                          uncheckedColor="#D1D5DB"
                        />
                        <Text className="text-sm font-medium text-gray-800 font-quicksand ml-2">
                          {opt.name}
                        </Text>
                      </View>
                      {opt.extraPrice > 0 && (
                        <Text className="text-xs font-bold text-gray-500 font-quicksand-bold">
                          +{formatVND(opt.extraPrice)}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </RadioButton.Group>
              </View>
            );
          })}

          {/* Restaurant Note Area */}
          <View className="p-5 border-b border-gray-100">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-bold text-dark-100 font-quicksand-bold">
                Thêm lưu ý cho quán
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                Không bắt buộc
              </Text>
            </View>
            <View className="border border-gray-200 rounded-2xl p-3 bg-gray-50/50">
              <TextInput
                value={note}
                onChangeText={onNoteChange}
                placeholder="Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                className="text-xs font-quicksand text-dark-100 p-0 min-h-[60px]"
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Quantity Selector */}
          <View className="p-5 items-center justify-center flex-row">
            <TouchableOpacity
              onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className={`w-9 h-9 rounded-full items-center justify-center border ${
                quantity <= 1 ? "border-gray-200 bg-gray-100" : "border-emerald-500 bg-emerald-50"
              }`}
            >
              <Text className={`text-lg font-bold ${quantity <= 1 ? "text-gray-400" : "text-emerald-600"}`}>
                -
              </Text>
            </TouchableOpacity>

            <Text className="text-lg font-bold text-dark-100 font-quicksand-bold mx-6">
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={() => onQuantityChange(quantity + 1)}
              className="w-9 h-9 rounded-full bg-emerald-500 items-center justify-center"
            >
              <Text className="text-lg font-bold text-white">+</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Fixed Green Action Button (Images 4 & 5) */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onAddToCart}
            className="bg-[#00B14F] py-4 rounded-full items-center justify-center shadow-md"
          >
            <Text className="text-white text-base font-extrabold font-quicksand-bold">
              Thêm vào giỏ hàng - {formatVND(itemTotal)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
