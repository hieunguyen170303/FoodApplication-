import { apiClient } from "@/services/apiClient";
import { IMAGES } from "@/constants";
import { Order, OrderStatus } from "@/types";

// Shared mock history (shown when no real history from backend)
export const MOCK_ORDER_HISTORY: Order[] = [
  {
    id: "ORD-8712",
    storeName: "KFC - Tòa Nhà Sora Gardens SC",
    storeLogo: IMAGES.burgerTwo,
    status: "COMPLETED",
    statusText: "Đơn hàng đã hoàn thành",
    orderDate: "10/08/2026 - 18:30",
    items: [
      { id: "i2", name: "Combo Gà Rán Ròn Rã + 2 Pepsi lớn", quantity: 1, price: 145000 },
    ],
    totalPrice: 145000,
  },
  {
    id: "ORD-7619",
    storeName: "Lotteria - Midori Park Bình Dương",
    storeLogo: IMAGES.pizzaOne,
    status: "COMPLETED",
    statusText: "Đơn hàng đã hoàn thành",
    orderDate: "05/08/2026 - 12:15",
    items: [
      { id: "i3", name: "Burger Bò Tôm + Fries + Coke", quantity: 1, price: 95000 },
    ],
    totalPrice: 95000,
  },
];

// The single in-memory store for the current live order.
// Always null until the customer places a real order.
let currentLiveOrder: Order | null = null;

export const createLiveOrder = (
  storeName: string,
  storeLogo: any,
  items: { name: string; quantity: number; price: number }[],
  estimatedTime: string,
  totalPrice: number,
  customOrderId?: string
): Order => {
  const newOrder: Order = {
    id: customOrderId || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    storeName: storeName || "KFC",
    storeLogo: storeLogo || IMAGES.burgerTwo,
    status: "DELIVERING",
    statusText: "Tài xế đang giao hàng đến bạn",
    estimatedTime: estimatedTime || "19 phút",
    currentStepIndex: 2,
    orderDate: "Hôm nay, vừa xong",
    items: items.map((it, idx) => ({
      id: `live_i_${idx}`,
      name: it.name,
      quantity: it.quantity,
      price: it.price,
    })),
    totalPrice,
    driverInfo: {
      name: "Nguyễn Văn Hùng",
      phone: "0901234567",
      rating: 4.9,
      vehicleNumber: "61B1 - 888.99",
      avatar: IMAGES.avatar,
    },
  };
  currentLiveOrder = newOrder;
  return newOrder;
};

/** GET active order — always asks the backend; falls back to local cache. */
export const getActiveOrder = async (): Promise<Order | null> => {
  try {
    const res = await apiClient.get("/orders/active");
    const serverOrder = res?.data;
    if (serverOrder?.id) {
      currentLiveOrder = { ...serverOrder } as Order;
      return currentLiveOrder;
    }
    return null;
  } catch {
    return currentLiveOrder; // offline fallback
  }
};

/** GET order history — backend first, static mock as fallback. */
export const getOrderHistory = async (): Promise<Order[]> => {
  try {
    const res = await apiClient.get("/orders/history");
    return (res?.data || []) as Order[];
  } catch {
    return MOCK_ORDER_HISTORY;
  }
};

export const updateActiveOrderStatus = async (
  _orderId: string,
  status: OrderStatus,
  stepIndex: number,
  statusText: string
): Promise<void> => {
  if (currentLiveOrder) {
    currentLiveOrder.status = status;
    currentLiveOrder.currentStepIndex = stepIndex;
    currentLiveOrder.statusText = statusText;
  }
};

export const completeActiveOrder = async (_orderId: string): Promise<void> => {
  if (currentLiveOrder) {
    const finished: Order = {
      ...currentLiveOrder,
      status: "COMPLETED",
      statusText: "Đơn hàng đã hoàn thành",
      currentStepIndex: 3,
    };
    if (!MOCK_ORDER_HISTORY.some((o) => o.id === finished.id)) {
      MOCK_ORDER_HISTORY.unshift(finished);
    }
    currentLiveOrder = null;
  }
};
