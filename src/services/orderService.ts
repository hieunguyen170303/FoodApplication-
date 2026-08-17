import { IMAGES } from "@/constants";
import { Order } from "@/types";

export const MOCK_ACTIVE_ORDER: Order = {
  id: "ORD-9821",
  storeName: "Jollibee - EC Nguyễn Du",
  storeLogo: IMAGES.logo,
  status: "DELIVERING",
  statusText: "Tài xế đang giao hàng đến bạn",
  estimatedTime: "15 - 20 phút (14:35)",
  currentStepIndex: 2, // 0: Nhận đơn, 1: Chế biến, 2: Đang giao, 3: Đã đến nơi
  orderDate: "Hôm nay, 14:15",
  items: [
    {
      id: "i1",
      name: "1 Miếng Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly vừa + 1 Khoai tây chiên + 1 Pepsi",
      quantity: 1,
      price: 78000,
    },
  ],
  totalPrice: 108000,
  driverInfo: {
    name: "Nguyễn Văn Hùng",
    phone: "0901234567",
    rating: 4.9,
    vehicleNumber: "61B1 - 888.99",
    avatar: IMAGES.avatar,
  },
};

export const MOCK_ORDER_HISTORY: Order[] = [
  {
    id: "ORD-8712",
    storeName: "KFC - Tòa Nhà Sora Gardens SC",
    storeLogo: IMAGES.burgerTwo,
    status: "COMPLETED",
    statusText: "Đơn hàng đã hoàn thành",
    orderDate: "10/08/2026 - 18:30",
    items: [
      {
        id: "i2",
        name: "Combo Gà Rán Ròn Rã + 2 Pepsi lớn",
        quantity: 1,
        price: 145000,
      },
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
      {
        id: "i3",
        name: "Burger Bò Tôm + Fries + Coke",
        quantity: 1,
        price: 95000,
      },
    ],
    totalPrice: 95000,
  },
  {
    id: "ORD-5412",
    storeName: "Gold Chicken - Gà Rán Hàn Quốc",
    storeLogo: IMAGES.burgerOne,
    status: "CANCELLED",
    statusText: "Đã hủy bởi người dùng",
    orderDate: "28/07/2026 - 19:40",
    items: [
      {
        id: "i4",
        name: "Gà sốt cay ngọt nửa con + Kimchi",
        quantity: 1,
        price: 112000,
      },
    ],
    totalPrice: 112000,
  },
];

let currentLiveOrder: Order | null = MOCK_ACTIVE_ORDER;

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
    storeName: storeName || "KFC - Tòa Nhà Sora Gardens SC",
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
    totalPrice: totalPrice,
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

export const getActiveOrder = async (): Promise<Order | null> => {
  return currentLiveOrder;
};

export const getOrderHistory = async (): Promise<Order[]> => {
  return MOCK_ORDER_HISTORY;
};
