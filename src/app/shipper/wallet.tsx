import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ICONS } from "@/constants";

export default function ShipperWalletScreen() {
  const router = useRouter();

  const [walletBalance, setWalletBalance] = useState<number>(350000);
  const [todayEarnings, setTodayEarnings] = useState<number>(125000);
  const [withdrawAmountInput, setWithdrawAmountInput] = useState<string>("100000");

  const [historyLogs, setHistoryLogs] = useState([
    {
      id: "log_1",
      title: "Cộng tiền giao đơn #FOOD-9821",
      amount: 25000,
      type: "EARNING",
      timestamp: "18:20 Hôm nay",
    },
    {
      id: "log_2",
      title: "Cộng tiền giao đơn #FOOD-9822",
      amount: 18000,
      type: "EARNING",
      timestamp: "17:45 Hôm nay",
    },
    {
      id: "log_3",
      title: "Thưởng Tip từ khách hàng",
      amount: 20000,
      type: "TIP",
      timestamp: "17:45 Hôm nay",
    },
    {
      id: "log_4",
      title: "Rút tiền về Vietcombank (STK 9999...)",
      amount: -150000,
      type: "WITHDRAW",
      timestamp: "Hôm qua, 20:00",
    },
  ]);

  const handleWithdraw = () => {
    const num = parseInt(withdrawAmountInput.replace(/\D/g, ""), 10);
    if (isNaN(num) || num <= 0) {
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập số tiền rút hợp lệ!",
      });
      return;
    }

    if (num > walletBalance) {
      Toast.show({
        type: "error",
        text1: "Số dư ví không đủ để thực hiện giao dịch!",
      });
      return;
    }

    setWalletBalance((prev) => prev - num);
    setHistoryLogs((prev) => [
      {
        id: `log_${Date.now()}`,
        title: `Rút tiền về Vietcombank (STK 9999...)`,
        amount: -num,
        type: "WITHDRAW",
        timestamp: "Vừa xong",
      },
      ...prev,
    ]);

    Toast.show({
      type: "success",
      text1: `Rút thành công ${num.toLocaleString("vi-VN")}đ!`,
      text2: "Tiền đã được chuyển vào tài khoản Vietcombank.",
      position: "top",
      visibilityTime: 4000,
    });
  };

  const formatVND = (num: number) => `${num.toLocaleString("vi-VN")}đ`;

  return (
    <SafeAreaView className="flex-1 bg-[#FDFBF7] px-4 pt-2" edges={["top", "left", "right"]}>
      {/* Header Bar */}
      <View className="flex-row items-center justify-between py-3 mb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center mr-3 shadow-xs"
        >
          <Image
            source={ICONS.arrowBack}
            className="w-5 h-5"
            style={{ tintColor: "#181C2E" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-xs font-bold text-gray-400 font-quicksand uppercase tracking-wider">
            KÊNH TÀI XẾ
          </Text>
          <Text className="text-xl font-extrabold text-[#181C2E] font-quicksand-bold">
            Ví thu nhập Shipper
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Earnings Overview Glass Card */}
        <View
          className="p-5 rounded-[28px] mb-5 shadow-xl shadow-emerald-500/25 border border-white/20"
          style={{ backgroundColor: "#059669" }}
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-bold text-emerald-100 font-quicksand-bold uppercase tracking-wider">
              SỐ DƯ VÍ KHẢ DỤNG
            </Text>
            <View className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
              <Text className="text-[10px] font-bold text-white font-quicksand-bold">
                Tài xế Nguyễn Văn Hùng
              </Text>
            </View>
          </View>

          <Text className="text-3xl font-extrabold text-white font-quicksand-bold mb-3">
            {formatVND(walletBalance)}
          </Text>

          <View className="flex-row justify-between items-center pt-3 border-t border-white/20">
            <View>
              <Text className="text-[11px] text-emerald-100 font-quicksand">
                Thu nhập hôm nay:
              </Text>
              <Text className="text-sm font-extrabold text-white font-quicksand-bold">
                +{formatVND(todayEarnings)} (12 đơn)
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-[11px] text-emerald-100 font-quicksand">
                Đánh giá dịch vụ:
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={ICONS.star}
                  className="w-3.5 h-3.5 mr-1"
                  style={{ tintColor: "#FFFFFF" }}
                  resizeMode="contain"
                />
                <Text className="text-sm font-extrabold text-white font-quicksand-bold">
                  4.9 (98% Hoàn thành)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Withdrawal Section */}
        <View className="bg-white/95 p-5 rounded-[28px] mb-5 border border-orange-100/80 shadow-md shadow-orange-500/5">
          <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold mb-1">
            Rút tiền về Ngân hàng
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand mb-3">
            Tài khoản nhận: <Text className="font-bold text-[#181C2E]">Vietcombank - STK 99998888</Text>
          </Text>

          <View className="flex-row items-center mb-3">
            <TextInput
              value={withdrawAmountInput}
              onChangeText={setWithdrawAmountInput}
              keyboardType="numeric"
              placeholder="Nhập số tiền muốn rút..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 bg-gray-50/80 px-4 py-3 rounded-2xl text-sm font-bold text-[#181C2E] border border-gray-200/80 mr-2"
            />
            <TouchableOpacity
              onPress={() => setWithdrawAmountInput(walletBalance.toString())}
              className="bg-orange-50 px-3.5 py-3 rounded-2xl border border-orange-200"
            >
              <Text className="text-xs font-extrabold text-primary font-quicksand-bold">
                Rút hết
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleWithdraw}
            activeOpacity={0.9}
            className="bg-emerald-600 py-3.5 rounded-full items-center justify-center shadow-md shadow-emerald-500/25"
          >
            <Text className="text-white text-sm font-extrabold font-quicksand-bold">
              XÁC NHẬN RÚT TIỀN NGAY
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History Log */}
        <Text className="text-base font-extrabold text-[#181C2E] font-quicksand-bold mb-3 px-1">
          Lịch sử biến động số dư
        </Text>

        {historyLogs.map((log) => {
          const isPositive = log.amount > 0;
          return (
            <View
              key={log.id}
              className="bg-white/95 p-4 rounded-[24px] mb-3 border border-gray-100 flex-row justify-between items-center shadow-xs"
            >
              <View className="flex-row items-center flex-1 mr-2">
                <View
                  className={`w-10 h-10 rounded-2xl items-center justify-center mr-3 border ${
                    isPositive ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <Image
                    source={isPositive ? ICONS.dollar : ICONS.arrowRight}
                    className="w-4 h-4"
                    style={{ tintColor: isPositive ? "#047857" : "#EF4444" }}
                    resizeMode="contain"
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-xs font-extrabold text-[#181C2E] font-quicksand-bold" numberOfLines={1}>
                    {log.title}
                  </Text>
                  <Text className="text-[10px] text-gray-400 font-quicksand mt-0.5">
                    {log.timestamp}
                  </Text>
                </View>
              </View>

              <Text
                className={`text-sm font-extrabold font-quicksand-bold ${
                  isPositive ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {isPositive ? `+${formatVND(log.amount)}` : formatVND(log.amount)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
