import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { IMAGES } from "@/constants";

export default function AuthScreen() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState<string>("Adrian Hajdin");
  const [email, setEmail] = useState<string>("adrian@gmail.com");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [loading, setLoading] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (activeTab === "login") {
        await login(email, password);
        setSuccessModalVisible(true);
      } else {
        const res = await register(fullName, email, password);
        // Redirect to OTP Verification screen
        router.push(`/verify-otp?email=${encodeURIComponent(email)}` as any);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToHome = () => {
    setSuccessModalVisible(false);
    router.replace("/(tabs)" as any);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        {/* Top Hero Background Image Section */}
        <ImageBackground
          source={IMAGES.loginGraphic}
          className="w-full h-[260px] justify-end pb-8 px-6"
          resizeMode="cover"
        >
          {/* Dark Overlay gradient for contrast */}
          <View className="absolute inset-0 bg-black/40" />

          <View className="z-10">
            <Text className="text-3xl font-extrabold text-white font-quicksand-bold tracking-tight">
              Get Started now
            </Text>
            <Text className="text-sm font-medium text-gray-200 font-quicksand mt-1">
              Create an account or log in to explore
            </Text>
          </View>
        </ImageBackground>

        {/* White Rounded Card Form Container (Images 1 & 2) */}
        <View className="flex-1 bg-white -mt-6 rounded-t-3xl px-6 pt-6 pb-10">
          {/* Tab Switcher (Log In vs Sign Up) */}
          <View className="flex-row bg-gray-100 p-1 rounded-2xl mb-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab("login")}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: activeTab === "login" ? "#FFFFFF" : "transparent",
                elevation: activeTab === "login" ? 2 : 0,
              }}
            >
              <Text
                className={`text-sm font-bold font-quicksand-bold ${
                  activeTab === "login" ? "text-primary" : "text-gray-400"
                }`}
              >
                Log In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab("signup")}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: activeTab === "signup" ? "#FFFFFF" : "transparent",
                elevation: activeTab === "signup" ? 2 : 0,
              }}
            >
              <Text
                className={`text-sm font-bold font-quicksand-bold ${
                  activeTab === "signup" ? "text-primary" : "text-gray-400"
                }`}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            {/* Full Name field (Only shown in Sign Up tab - Image 1) */}
            {activeTab === "signup" && (
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-400 font-quicksand mb-1">
                  Full Name
                </Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Adrian Hajdin"
                  placeholderTextColor="#9CA3AF"
                  className="text-base font-bold text-dark-100 font-quicksand-bold pb-2 border-b border-gray-200"
                />
              </View>
            )}

            {/* Email Address field */}
            <View className="mb-4">
              <Text className="text-xs font-semibold text-gray-400 font-quicksand mb-1">
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="adrian@gmail.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-base font-bold text-dark-100 font-quicksand-bold pb-2 border-b border-gray-200"
              />
            </View>

            {/* Password field */}
            <View className="mb-6">
              <Text className="text-xs font-semibold text-gray-400 font-quicksand mb-1">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••••••"
                placeholderTextColor="#9CA3AF"
                className="text-base font-bold text-dark-100 font-quicksand-bold pb-2 border-b border-gray-200"
              />
            </View>

            {/* Primary Orange Submit Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSubmit}
              disabled={loading}
              className="bg-primary py-4 rounded-full items-center justify-center shadow-md mb-6"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-extrabold font-quicksand-bold">
                  {activeTab === "login" ? "Login" : "Sign Up"}
                </Text>
              )}
            </TouchableOpacity>

            {/* Bottom Switch Link */}
            <View className="items-center justify-center">
              {activeTab === "login" ? (
                <TouchableOpacity onPress={() => setActiveTab("signup")}>
                  <Text className="text-xs font-medium text-gray-400 font-quicksand">
                    Don't have an account?{" "}
                    <Text className="text-primary font-bold font-quicksand-bold">
                      Sign up
                    </Text>
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setActiveTab("login")}>
                  <Text className="text-xs font-medium text-gray-400 font-quicksand">
                    Already have an account?{" "}
                    <Text className="text-primary font-bold font-quicksand-bold">
                      Login
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Login / Sign Up Success Modal (Image 3) */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleGoToHome}
      >
        <View className="flex-1 bg-black/60 items-center justify-end">
          <View className="w-full bg-white rounded-t-3xl p-6 items-center shadow-2xl">
            {/* Top Handle bar */}
            <View className="w-12 h-1 bg-gray-200 rounded-full mb-6" />

            {/* Success Checkmark Circle Badge */}
            <View className="relative w-20 h-20 rounded-full bg-orange-50 items-center justify-center border-4 border-orange-100 mb-4">
              <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                <Text className="text-white text-2xl font-bold">✓</Text>
              </View>
            </View>

            {/* Title & Subtitle */}
            <Text className="text-xl font-extrabold text-dark-100 font-quicksand-bold text-center mb-1">
              Login Successful
            </Text>
            <Text className="text-xs text-gray-400 font-quicksand text-center mb-6 px-4">
              You're all set to continue where you left off.
            </Text>

            {/* Go to Homepage Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleGoToHome}
              className="w-full bg-primary py-4 rounded-full items-center justify-center shadow-md"
            >
              <Text className="text-white text-base font-extrabold font-quicksand-bold">
                Go to Homepage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
