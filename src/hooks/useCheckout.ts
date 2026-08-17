import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useCart } from "@/context/CartContext";
import { apiClient } from "@/services/apiClient";
import {
  getDeliveryOptions,
  getPaymentMethods,
  MOCK_DELIVERY_ADDRESS,
} from "@/services/checkoutService";
import { createLiveOrder } from "@/services/orderService";
import { DeliveryOption, PaymentMethod } from "@/types";
import { IMAGES } from "@/constants";

export function useCheckout() {
  const router = useRouter();
  const { cartItems, currentRestaurant, cartSubtotal, clearCart } = useCart();

  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Dynamic values calculated from CartContext
  const itemSubtotal = cartSubtotal > 0 ? cartSubtotal : 74000;
  const discountAmount = 12000;

  useEffect(() => {
    async function loadCheckoutData() {
      try {
        const [delOpts, payMethods] = await Promise.all([
          getDeliveryOptions(),
          getPaymentMethods(),
        ]);
        setDeliveryOptions(delOpts);
        setSelectedDelivery(delOpts[0]); // Default: Ưu tiên ⚡
        setPaymentMethods(payMethods);
        setSelectedPayment(payMethods[0]); // Default: MoMo
      } catch (err) {
        console.error("Error loading checkout data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCheckoutData();
  }, []);

  const deliveryFee = selectedDelivery ? selectedDelivery.price : 10000;
  const totalPrice = Math.max(0, itemSubtotal + deliveryFee - discountAmount);

  const placeOrder = async () => {
    const estTime = selectedDelivery ? selectedDelivery.timeText : "19 phút";
    const storeName = currentRestaurant?.name || "Jollibee - EC Nguyễn Du";
    const storeLogo = currentRestaurant?.logo || IMAGES.logo;

    const formattedItems = cartItems.length > 0
      ? cartItems.map((c) => ({
          name: `${c.quantity}x ${c.menuItem.name}${
            Object.values(c.selectedOptions).length > 0
              ? ` (${Object.values(c.selectedOptions).map((o) => o.name).join(", ")})`
              : ""
          }`,
          quantity: c.quantity,
          price: c.itemTotal,
        }))
      : [
          {
            name: "2 Miếng Gà Rán - Gà Giòn Cay",
            quantity: 1,
            price: 74000,
          },
        ];

    let createdOrderId: string | undefined;

    // 1. Post new order to backend server via REST API so Shipper receives it live!
    try {
      const res = await apiClient.post("/orders", {
        storeName,
        totalPrice,
        items: formattedItems,
        estimatedTime: `${estTime} (Tài xế đang giao)`,
        deliveryAddress: MOCK_DELIVERY_ADDRESS.subtitle,
      });
      console.log("✅ Order posted successfully to Backend API:", res);
      if (res && res.data && res.data.id) {
        createdOrderId = res.data.id;
      }
    } catch (err) {
      console.warn("Could not post to backend API, falling back to local creation:", err);
    }

    // 2. Create local live tracking order in orderService with EXACT same order.id
    createLiveOrder(
      storeName,
      storeLogo,
      formattedItems,
      `${estTime} (Tài xế đang giao)`,
      totalPrice,
      createdOrderId
    );

    // 3. Clear shopping cart
    clearCart();

    Toast.show({
      type: "success",
      text1: "🎉 Đặt đơn thành công!",
      text2: `Đơn hàng tại ${storeName} đang được chuẩn bị.`,
      position: "top",
      visibilityTime: 4000,
    });

    // 4. Redirect user to /(tabs)/orders tab
    router.replace("/(tabs)/orders" as any);
  };

  return {
    cartItems,
    currentRestaurant: currentRestaurant || {
      name: "Jollibee - EC Nguyễn Du",
      branch: "Hùng Vương, Thủ Dầu Một",
      logo: IMAGES.logo,
    },
    deliveryOptions,
    selectedDelivery,
    setSelectedDelivery,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    address: {
      ...MOCK_DELIVERY_ADDRESS,
      storeName: currentRestaurant?.name || "Jollibee - EC Nguyễn Du",
    },
    itemSubtotal,
    deliveryFee,
    discountAmount,
    totalPrice,
    loading,
    placeOrder,
  };
}
