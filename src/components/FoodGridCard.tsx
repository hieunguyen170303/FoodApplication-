import React from "react";
import { View, Text, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { GridFoodItem } from "@/types";

interface FoodGridCardProps {
  item: GridFoodItem;
  onPress?: () => void;
  onAddToCart?: () => void;
}

export const FoodGridCard: React.FC<FoodGridCardProps> = ({
  item,
  onPress,
  onAddToCart,
}) => {
  return (
    <Card
      onPress={onPress}
      elevation={1}
      className="bg-white rounded-[24px] mb-4 overflow-hidden border border-gray-100/80"
      style={{
        width: "48%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Card.Content className="items-center p-3">
        {/* Floating Food Image */}
        <View className="w-28 h-28 mb-2 items-center justify-center">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Food Details */}
        <View className="items-center w-full mt-1">
          <Text
            numberOfLines={1}
            className="text-base font-bold text-dark-100 font-quicksand-bold text-center"
          >
            {item.name}
          </Text>
          <Text className="text-xs text-gray-400 font-quicksand text-center mt-1">
            {item.startingPriceText}
          </Text>

          {/* Add to Cart Button with Paper Button */}
          <Button
            mode="text"
            compact
            onPress={onAddToCart}
            textColor="#FE8C00"
            labelStyle={{
              fontFamily: "Quicksand-Bold",
              fontWeight: "700",
              fontSize: 13,
            }}
            className="mt-2"
          >
            + Add to cart
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};
