import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ICONS } from "@/constants";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyOtp } = useAuth();

  const [otpToken, setOtpToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    if (!otpToken || otpToken.length < 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ 6 chữ số mã OTP!");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email || "user@gmail.com", otpToken);
      Alert.alert("Thành công", "Xác minh tài khoản thành công!", [
        {
          text: "Vào ứng dụng",
          onPress: () => router.replace("/(tabs)" as any),
        },
      ]);
    } catch (err: any) {
      Alert.alert("Lỗi xác minh", err.message || "Mã OTP không chính xác!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-3" edges={["top", "left", "right"]}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-6"
      >
        <Image
          source={ICONS.arrowBack}
          className="w-5 h-5"
          style={{ tintColor: "#181C2E" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Header Illustration & Info */}
      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-full bg-orange-50 items-center justify-center mb-4 border border-orange-100">
          <Image
            source={ICONS.envelope}
            className="w-8 h-8"
            style={{ tintColor: "#FE8C00" }}
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-extrabold text-dark-100 font-quicksand-bold mb-2 text-center">
          Nhập mã xác nhận OTP
        </Text>
        <Text className="text-sm text-gray-500 font-quicksand text-center px-4 leading-5">
          Chúng tôi đã gửi mã OTP gồm 6 chữ số đến địa chỉ email:{"\n"}
          <Text className="font-bold text-dark-100 font-quicksand-bold">{email || "your-email@gmail.com"}</Text>
        </Text>
      </View>

      {/* 6-Digit Code Input Box */}
      <View className="mb-8">
        <Text className="text-xs font-semibold text-gray-400 font-quicksand mb-2 text-center">
          MÃ OTP (6 CHỮ SỐ)
        </Text>
        <TextInput
          value={otpToken}
          onChangeText={setOtpToken}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="123456"
          placeholderTextColor="#D1D5DB"
          className="text-3xl font-extrabold text-center text-primary font-quicksand-bold tracking-widest py-3 border-b-2 border-primary bg-orange-50/30 rounded-t-xl"
        />
      </View>

      {/* Primary Submit Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleVerify}
        disabled={loading}
        className="bg-primary py-4 rounded-full items-center justify-center shadow-md mb-6"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-base font-extrabold font-quicksand-bold">
            Xác nhận & Hoàn tất
          </Text>
        )}
      </TouchableOpacity>

      {/* Resend Helper */}
      <View className="items-center">
        <TouchableOpacity
          onPress={() => Alert.alert("Mã OTP mới", "Đã gửi lại mã OTP đến email của bạn!")}
        >
          <Text className="text-xs font-medium text-gray-400 font-quicksand">
            Chưa nhận được mã?{" "}
            <Text className="text-primary font-bold font-quicksand-bold">
              Gửi lại mã OTP
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
