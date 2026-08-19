import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ICONS } from "@/constants";
import { ShipperStats } from "@/types";

interface Props {
  stats?: ShipperStats;
  onRefresh?: () => void;
}

export const ShipperStatsHeader: React.FC<Props> = ({ stats, onRefresh }) => {
  const formatVND = (amount?: number) => {
    if (amount === undefined || amount === null || isNaN(amount)) return "0đ";
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const todayEarnings = stats?.todayEarnings ?? 0;
  const completedCount = stats?.completedCount ?? 0;
  const rating = stats?.rating ?? 5.0;
  const acceptanceRate = stats?.acceptanceRate ?? "100%";

  return (
    <View
      className="rounded-[28px] p-5 mb-5 shadow-xl shadow-orange-500/25 border border-white/20 overflow-hidden"
      style={{ backgroundColor: "#FE8C00" }}
    >
      {/* Top Banner Row */}
      <View className="flex-row justify-between items-center mb-4 z-10">
        <View>
          <Text className="text-xs font-bold text-orange-100 uppercase tracking-wider font-quicksand">
            Thu nhập hôm nay
          </Text>
          <Text className="text-3xl font-extrabold text-white font-quicksand-bold mt-1">
            {formatVND(todayEarnings)}
          </Text>
        </View>

        {onRefresh && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRefresh}
            className="bg-white/20 px-3.5 py-1.5 rounded-full border border-white/30"
          >
            <Text className="text-white text-xs font-extrabold font-quicksand-bold">
              Làm mới
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Grid Stats Row */}
      <View className="flex-row bg-white/20 rounded-2xl p-3.5 justify-between items-center border border-white/30">
        <View className="items-center flex-1">
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            {completedCount}
          </Text>
          <Text className="text-[11px] text-orange-100 font-quicksand mt-0.5">
            Đơn hoàn thành
          </Text>
        </View>

        <View className="w-[1px] h-6 bg-white/30" />

        <View className="items-center flex-1 flex-row justify-center">
          <Image
            source={ICONS.star}
            className="w-3.5 h-3.5 mr-1"
            style={{ tintColor: "#FFFFFF" }}
            resizeMode="contain"
          />
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            {rating}
          </Text>
        </View>

        <View className="w-[1px] h-6 bg-white/30" />

        <View className="items-center flex-1">
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            {acceptanceRate}
          </Text>
          <Text className="text-[11px] text-orange-100 font-quicksand mt-0.5">
            Tỷ lệ nhận đơn
          </Text>
        </View>
      </View>
    </View>
  );
};
