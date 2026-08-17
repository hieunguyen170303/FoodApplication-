import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ICONS } from "@/constants";

interface SavedAddress {
  id: string;
  tag: "HOME" | "OFFICE" | "SCHOOL" | "OTHER";
  title: string;
  subtitle: string;
  contactName: string;
  contactPhone: string;
  isDefault: boolean;
}

export default function SavedAddressesScreen() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: "addr_1",
      tag: "HOME",
      title: "Chung cư Bcons City (Nhà riêng)",
      subtitle: "Phòng 14.02, Tầng 14, Tháp Green Topaz, Dĩ An, Bình Dương",
      contactName: "Nguyễn Văn Hùng",
      contactPhone: "0912 345 678",
      isDefault: true,
    },
    {
      id: "addr_2",
      tag: "OFFICE",
      title: "Tòa nhà Becamex Tower (Công ty)",
      subtitle: "Tầng 8, 230 Đại Lộ Bình Dương, Phường Phú Hòa, Thủ Dầu Một",
      contactName: "Nguyễn Văn Hùng",
      contactPhone: "0912 345 678",
      isDefault: false,
    },
    {
      id: "addr_3",
      tag: "SCHOOL",
      title: "Đại học Thủ Dầu Một (Trường học)",
      subtitle: "Cổng chính Số 6 Trần Văn Ơn, Phường Phú Hòa, Thủ Dầu Một",
      contactName: "Nguyễn Văn Hùng",
      contactPhone: "0912 345 678",
      isDefault: false,
    },
  ]);

  // Modal Add New Address state
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newSubtitle, setNewSubtitle] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<SavedAddress["tag"]>("HOME");

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
    Toast.show({
      type: "success",
      text1: "✅ Đã chọn làm địa chỉ giao hàng mặc định!",
      position: "top",
    });
  };

  const handleAddAddress = () => {
    if (!newTitle.trim() || !newSubtitle.trim()) {
      Toast.show({
        type: "error",
        text1: "Vui lòng điền đầy đủ tên gợi nhớ và địa chỉ!",
      });
      return;
    }

    const newAddr: SavedAddress = {
      id: `addr_${Date.now()}`,
      tag: selectedTag,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim(),
      contactName: "Nguyễn Văn Hùng",
      contactPhone: "0912 345 678",
      isDefault: false,
    };

    setAddresses((prev) => [...prev, newAddr]);
    setModalVisible(false);
    setNewTitle("");
    setNewSubtitle("");

    Toast.show({
      type: "success",
      text1: "🎉 Đã thêm địa chỉ giao hàng mới!",
      position: "top",
    });
  };

  const getBadgeForTag = (tag: SavedAddress["tag"]) => {
    switch (tag) {
      case "HOME":
        return { label: "🏠 Nhà riêng", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "OFFICE":
        return { label: "🏢 Cơ quan", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "SCHOOL":
        return { label: "🏫 Trường học", color: "bg-amber-50 text-amber-700 border-amber-200" };
      default:
        return { label: "📍 Khác", color: "bg-gray-50 text-gray-700 border-gray-200" };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "left", "right"]}>
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
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
          <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold">
            Sổ địa chỉ giao hàng 📍
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand">
            {addresses.length} địa chỉ đã lưu
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-primary px-3.5 py-1.5 rounded-full"
        >
          <Text className="text-white text-xs font-extrabold font-quicksand-bold">
            + Thêm mới
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {addresses.map((item) => {
          const badge = getBadgeForTag(item.tag);
          return (
            <View
              key={item.id}
              className={`bg-white p-4 rounded-3xl mb-4 border ${
                item.isDefault
                  ? "border-primary shadow-md shadow-orange-500/10"
                  : "border-gray-200"
              }`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <View className={`px-2.5 py-1 rounded-full border ${badge.color}`}>
                  <Text className="text-xs font-extrabold font-quicksand-bold">
                    {badge.label}
                  </Text>
                </View>

                {item.isDefault ? (
                  <View className="bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Text className="text-[10px] font-bold text-emerald-700 font-quicksand-bold">
                      ✓ Mặc định
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setDefaultAddress(item.id)}>
                    <Text className="text-xs font-bold text-sky-600 font-quicksand-bold">
                      Đặt mặc định
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text className="text-base font-extrabold text-dark-100 font-quicksand-bold mb-1">
                {item.title}
              </Text>
              <Text className="text-xs text-gray-500 font-quicksand leading-5 mb-2">
                {item.subtitle}
              </Text>
              <Text className="text-xs text-gray-400 font-quicksand">
                👤 {item.contactName} • 📞 {item.contactPhone}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Add New Address Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white p-5 rounded-t-3xl border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-extrabold text-dark-100 font-quicksand-bold">
                Thêm địa chỉ giao hàng mới 📍
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-400 font-bold text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            {/* Tag selector */}
            <Text className="text-xs font-bold text-gray-500 font-quicksand-bold mb-2">
              Loại địa chỉ:
            </Text>
            <View className="flex-row space-x-2 mb-4">
              {[
                { key: "HOME", label: "🏠 Nhà riêng" },
                { key: "OFFICE", label: "🏢 Cơ quan" },
                { key: "SCHOOL", label: "🏫 Trường học" },
              ].map((t) => (
                <TouchableOpacity
                  key={t.key}
                  onPress={() => setSelectedTag(t.key as any)}
                  className={`flex-1 py-2 rounded-xl border items-center ${
                    selectedTag === t.key
                      ? "bg-orange-50 border-primary"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold font-quicksand-bold ${
                      selectedTag === t.key ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Tên gợi nhớ (VD: Nhà riêng Dĩ An)..."
              placeholderTextColor="#9CA3AF"
              className="bg-gray-100 p-3 rounded-2xl border border-gray-200 text-sm font-quicksand mb-3 text-dark-100"
            />

            <TextInput
              value={newSubtitle}
              onChangeText={setNewSubtitle}
              placeholder="Địa chỉ chi tiết (Số nhà, Tên đường, Phường/Xã)..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={2}
              className="bg-gray-100 p-3 rounded-2xl border border-gray-200 text-sm font-quicksand mb-5 text-dark-100"
            />

            <TouchableOpacity
              onPress={handleAddAddress}
              className="bg-primary py-3.5 rounded-full items-center justify-center shadow-md shadow-orange-500/30"
            >
              <Text className="text-white text-sm font-extrabold font-quicksand-bold">
                Lưu địa chỉ này
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
