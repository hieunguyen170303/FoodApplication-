import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ChatMessage } from "@/types";
import { socketService } from "@/services/socketService";
import { ICONS, IMAGES } from "@/constants";

export default function CustomerChatWithDriverScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const activeOrderId = orderId || "ORD-9821";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init_1",
      orderId: activeOrderId,
      senderRole: "SHIPPER",
      senderName: "Tài xế Nguyễn Văn Hùng",
      text: "Chào bạn, mình vừa nhận đơn hàng và đang lấy món tại quán ạ! 🛵",
      timestamp: "Vừa xong",
    },
  ]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (activeOrderId) {
      // Connect WebSocket room for live chat with Shipper
      socketService.joinRoom(activeOrderId);

      const unsubscribe = socketService.onChatMessageReceived((msg) => {
        console.log("💬 Customer received WebSocket Chat Message:", msg);

        // Deduplicate to prevent duplicate keys
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });

        if (msg.senderRole === "SHIPPER") {
          Toast.show({
            type: "info",
            text1: "💬 Tin nhắn từ Tài xế",
            text2: msg.text,
            position: "top",
            visibilityTime: 3500,
          });
        }
      });

      return () => unsubscribe();
    }
  }, [activeOrderId]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_cust_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      orderId: activeOrderId,
      senderRole: "CUSTOMER",
      senderName: "Bạn (Khách hàng)",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Deduplicate & append to local state
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMsg.id)) return prev;
      return [...prev, newMsg];
    });

    // Broadcast WebSocket message to Shipper
    socketService.sendChatMessage(activeOrderId, newMsg);

    if (!textToSend) setInputText("");
  };

  const handleCallDriver = () => {
    Linking.openURL("tel:0901234567").catch(() => {
      Alert.alert("Gọi điện", "Số điện thoại tài xế: 0901234567");
    });
  };

  const quickReplies = [
    "Giao lên tầng 3 giúp em nhé 🏢",
    "Em đang đứng chờ ở sảnh ạ 📍",
    "Anh cứ đến gọi em trước 2 phút nha 📞",
    "Cảm ơn anh nhiều! ⭐",
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "left", "right"]}>
      {/* Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
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

        {/* Driver Info Header */}
        <View className="flex-row items-center flex-1">
          <Image source={IMAGES.avatar} className="w-9 h-9 rounded-full mr-2.5 border border-primary" />
          <View className="flex-1">
            <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold" numberOfLines={1}>
              Nguyễn Văn Hùng (Tài xế)
            </Text>
            <Text className="text-xs text-emerald-600 font-quicksand">
              🟢 Live Chat • Đơn #{activeOrderId}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCallDriver}
          className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 ml-2"
        >
          <Text className="text-xs font-bold text-emerald-700 font-quicksand-bold">
            📞 Gọi
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Messages Scroll Area */}
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {messages.map((item) => {
            const isCustomer = item.senderRole === "CUSTOMER";
            return (
              <View
                key={item.id}
                className={`mb-3 flex-row ${isCustomer ? "justify-end" : "justify-start"}`}
              >
                <View
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl ${
                    isCustomer
                      ? "bg-primary rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold mb-0.5 ${
                      isCustomer ? "text-orange-100" : "text-gray-400"
                    }`}
                  >
                    {item.senderName}
                  </Text>

                  <Text
                    className={`text-sm font-medium leading-5 ${
                      isCustomer ? "text-white font-quicksand-bold" : "text-dark-100 font-quicksand"
                    }`}
                  >
                    {item.text}
                  </Text>

                  <Text
                    className={`text-[10px] mt-1 text-right ${
                      isCustomer ? "text-orange-200" : "text-gray-400"
                    }`}
                  >
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Quick Suggestion Chips Bar */}
        <View className="px-4 py-2 bg-white/90 border-t border-gray-100 flex-row">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickReplies.map((chip, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSendMessage(chip)}
                className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full mr-2"
              >
                <Text className="text-xs text-primary font-bold font-quicksand-bold">
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Text Input Footer Bar */}
        <View className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nhắn tin cho tài xế giao hàng..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 bg-gray-100 px-4 py-2.5 rounded-full text-sm font-medium font-quicksand text-dark-100 mr-2"
          />

          <TouchableOpacity
            onPress={() => handleSendMessage()}
            className="w-10 h-10 rounded-full bg-primary items-center justify-center shadow-md shadow-orange-500/30"
          >
            <Text className="text-white text-base">➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
