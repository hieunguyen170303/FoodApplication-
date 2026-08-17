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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ChatMessage } from "@/types";
import { shipperService } from "@/services/shipperService";
import { socketService } from "@/services/socketService";
import { ICONS } from "@/constants";

export default function CustomerChatScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const activeOrderId = orderId || "ORD-9821";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (activeOrderId) {
      shipperService.getChatMessages(activeOrderId).then((msgs: ChatMessage[]) => {
        setMessages(msgs);
      });

      // Join order WebSocket room & listen for real-time messages
      socketService.joinRoom(activeOrderId);

      const unsubscribe = socketService.onChatMessageReceived((msg) => {
        console.log("💬 Shipper received WebSocket Chat Message:", msg);

        // Deduplicate to prevent duplicate keys
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });

        if (msg.senderRole === "CUSTOMER") {
          Toast.show({
            type: "info",
            text1: `💬 Tin nhắn từ ${msg.senderName}`,
            text2: msg.text,
            position: "top",
            visibilityTime: 3500,
          });
        }
      });

      return () => unsubscribe();
    }
  }, [activeOrderId]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = await shipperService.sendChatMessage(activeOrderId, text.trim());

    // Deduplicate & append to local state
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMsg.id)) return prev;
      return [...prev, newMsg];
    });

    socketService.sendChatMessage(activeOrderId, newMsg);

    if (!textToSend) setInputText("");
  };

  const quickReplies = [
    "Tôi đang di chuyển đến ạ! 🛵",
    "Quán đang làm món, khoảng 5 phút nữa em tới!",
    "Đến nơi em sẽ gọi anh/chị nhé! 📞",
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

        <View className="flex-1">
          <Text className="text-sm font-extrabold text-dark-100 font-quicksand-bold">
            Phạm Hoàng Nam (Khách hàng)
          </Text>
          <Text className="text-xs text-emerald-600 font-quicksand">
            🟢 WebSocket Active • Đơn #{activeOrderId}
          </Text>
        </View>

        <TouchableOpacity className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Text className="text-xs font-bold text-emerald-700 font-quicksand-bold">
            📞 Gọi
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Messages List */}
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {messages.map((item) => {
            const isShipper = item.senderRole === "SHIPPER";
            return (
              <View
                key={item.id}
                className={`mb-3 flex-row ${isShipper ? "justify-end" : "justify-start"}`}
              >
                <View
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl ${
                    isShipper
                      ? "bg-primary rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold mb-0.5 ${
                      isShipper ? "text-orange-100" : "text-gray-400"
                    }`}
                  >
                    {item.senderName}
                  </Text>

                  <Text
                    className={`text-sm font-medium leading-5 ${
                      isShipper ? "text-white font-quicksand-bold" : "text-dark-100 font-quicksand"
                    }`}
                  >
                    {item.text}
                  </Text>

                  <Text
                    className={`text-[10px] mt-1 text-right ${
                      isShipper ? "text-orange-200" : "text-gray-400"
                    }`}
                  >
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Quick Suggest Chips Bar */}
        <View className="px-4 py-2 bg-white/80 border-t border-gray-100 flex-row">
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
            placeholder="Nhập tin nhắn cho khách hàng..."
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
