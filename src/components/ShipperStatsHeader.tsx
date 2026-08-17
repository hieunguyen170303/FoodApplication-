import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShipperStats } from "@/types";

interface Props {
  stats: ShipperStats;
  onRefresh?: () => void;
}

export const ShipperStatsHeader: React.FC<Props> = ({ stats, onRefresh }) => {
  const formatVND = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <View className="bg-primary rounded-3xl p-5 mb-5 shadow-lg shadow-orange-500/20">
      {/* Top Banner Row */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-xs font-semibold text-orange-100 uppercase tracking-wider font-quicksand">
            Thu nhập hôm nay 🛵
          </Text>
          <Text className="text-3xl font-extrabold text-white font-quicksand-bold mt-1">
            {formatVND(stats.todayEarnings)}
          </Text>
        </View>

        {onRefresh && (
          <TouchableOpacity
            onPress={onRefresh}
            className="bg-white/20 px-3 py-1.5 rounded-full border border-white/30"
          >
            <Text className="text-white text-xs font-bold font-quicksand-bold">
              🔄 Làm mới
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Grid Stats Row */}
      <View className="flex-row bg-white/10 rounded-2xl p-3 justify-between items-center border border-white/10">
        <View className="items-center flex-1">
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            {stats.completedCount}
          </Text>
          <Text className="text-[11px] text-orange-100 font-quicksand mt-0.5">
            Đơn hoàn thành
          </Text>
        </View>

        <View className="w-[1px] h-6 bg-white/20" />

        <View className="items-center flex-1">
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            ⭐ {stats.rating}
          </Text>
          <Text className="text-[11px] text-orange-100 font-quicksand mt-0.5">
            Đánh giá 5.0
          </Text>
        </View>

        <View className="w-[1px] h-6 bg-white/20" />

        <View className="items-center flex-1">
          <Text className="text-base font-extrabold text-white font-quicksand-bold">
            {stats.acceptanceRate}
          </Text>
          <Text className="text-[11px] text-orange-100 font-quicksand mt-0.5">
            Tỷ lệ nhận đơn
          </Text>
        </View>
      </View>
    </View>
  );
};
