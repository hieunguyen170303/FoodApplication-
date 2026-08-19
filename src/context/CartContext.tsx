import React, { createContext, useContext, useState } from "react";
import { CustomizedCartItem, RestaurantDetail } from "@/types";
import { IMAGES } from "@/constants";

interface CartContextType {
  cartItems: CustomizedCartItem[];
  currentRestaurant: Partial<RestaurantDetail> | null;
  addToCart: (restaurantInfo: Partial<RestaurantDetail>, item: CustomizedCartItem) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CustomizedCartItem[]>([]);
  const [currentRestaurant, setCurrentRestaurant] = useState<Partial<RestaurantDetail> | null>({
    name: "Jollibee - EC Nguyễn Du",
    branch: "Hùng Vương, Thủ Dầu Một",
    logo: IMAGES.logo,
  });

  const addToCart = (restaurantInfo: Partial<RestaurantDetail>, item: CustomizedCartItem) => {
    // If ordering from a new restaurant, reset cart to new restaurant
    if (currentRestaurant && currentRestaurant.name !== restaurantInfo.name && cartItems.length > 0) {
      setCartItems([item]);
      setCurrentRestaurant(restaurantInfo);
      return;
    }

    setCurrentRestaurant(restaurantInfo);
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.itemTotal, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        currentRestaurant,
        addToCart,
        clearCart,
        cartSubtotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
