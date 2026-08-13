import { useState, useEffect } from "react";
import { getRestaurantDetail } from "@/services/restaurantService";
import {
  RestaurantDetail,
  RestaurantMenuItem,
  FoodOption,
  CustomizedCartItem,
} from "@/types";

export function useRestaurantDetail(restaurantId: string = "r2") {
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Customization Modal States
  const [customizingItem, setCustomizingItem] = useState<RestaurantMenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: FoodOption }>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  // Cart State
  const [cartItems, setCartItems] = useState<CustomizedCartItem[]>([]);

  useEffect(() => {
    async function loadDetail() {
      try {
        const detail = await getRestaurantDetail(restaurantId);
        setRestaurant(detail);
      } catch (err) {
        console.error("Error loading restaurant detail:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [restaurantId]);

  // Open modal when user clicks (+) button on a food item
  const openCustomizationModal = (item: RestaurantMenuItem) => {
    setCustomizingItem(item);
    setQuantity(1);
    setNote("");

    // Set default options if item has optionGroups
    const defaults: { [groupId: string]: FoodOption } = {};
    if (item.optionGroups) {
      item.optionGroups.forEach((group) => {
        const defaultOpt = group.options.find((o) => o.isDefault) || group.options[0];
        if (defaultOpt) {
          defaults[group.id] = defaultOpt;
        }
      });
    }
    setSelectedOptions(defaults);
    setModalVisible(true);
  };

  const closeCustomizationModal = () => {
    setModalVisible(false);
    setCustomizingItem(null);
  };

  const selectOption = (groupId: string, option: FoodOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: option,
    }));
  };

  // Calculate price of the item currently being customized
  const calculateItemTotal = (): number => {
    if (!customizingItem) return 0;
    let basePrice = customizingItem.price;
    Object.values(selectedOptions).forEach((opt) => {
      basePrice += opt.extraPrice || 0;
    });
    return basePrice * quantity;
  };

  // Confirm customization & add item to cart
  const confirmAddToCart = () => {
    if (!customizingItem) return;

    const newItemTotal = calculateItemTotal();
    const newCartItem: CustomizedCartItem = {
      id: `${customizingItem.id}_${Date.now()}`,
      menuItem: customizingItem,
      selectedOptions: { ...selectedOptions },
      quantity,
      note,
      itemTotal: newItemTotal,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    closeCustomizationModal();
  };

  // Total cart price calculation
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    restaurant,
    loading,
    customizingItem,
    modalVisible,
    selectedOptions,
    quantity,
    setQuantity,
    note,
    setNote,
    cartItems,
    totalCartPrice,
    totalCartCount,
    openCustomizationModal,
    closeCustomizationModal,
    selectOption,
    calculateItemTotal,
    confirmAddToCart,
  };
}
