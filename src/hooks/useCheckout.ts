import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
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

  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock checkout item values matching Images 1, 2, 3
  const itemSubtotal = 74000;
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

  const placeOrder = () => {
    const estTime = selectedDelivery ? selectedDelivery.timeText : "19 phút";

    // 1. Create live tracking order in orderService
    createLiveOrder(
      "KFC - Tòa Nhà Sora Gardens SC",
      IMAGES.burgerTwo,
      [
        {
          name: "2 Miếng Gà Rán - Gà Giòn Cay",
          quantity: 1,
          price: 74000,
        },
      ],
      `${estTime} (Tài xế đang giao)`,
      totalPrice
    );

    // 2. Redirect user to /(tabs)/orders tab
    router.replace("/(tabs)/orders" as any);
  };

  return {
    deliveryOptions,
    selectedDelivery,
    setSelectedDelivery,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    address: MOCK_DELIVERY_ADDRESS,
    itemSubtotal,
    deliveryFee,
    discountAmount,
    totalPrice,
    loading,
    placeOrder,
  };
}
