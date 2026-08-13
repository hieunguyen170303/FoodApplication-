import { DeliveryOption, PaymentMethod } from "@/types";

export const MOCK_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "del_priority",
    name: "Ưu tiên ⚡",
    speedText: "19 phút",
    timeText: "19 phút",
    price: 10000,
    originalPrice: 22000,
    tag: "Cam kết giao hàng đúng hẹn",
  },
  {
    id: "del_fast",
    name: "Nhanh",
    speedText: "25 phút",
    timeText: "25 phút",
    price: 1000,
    originalPrice: 13000,
    isDefault: true,
  },
  {
    id: "del_saver",
    name: "Tiết kiệm",
    speedText: "40 phút",
    timeText: "40 phút",
    price: 0,
    originalPrice: 10000,
    isFree: true,
  },
  {
    id: "del_schedule",
    name: "Đặt giao sau",
    speedText: "Theo giờ hẹn",
    timeText: "Chọn giờ",
    price: 0,
  },
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "momo",
    name: "MoMo",
    color: "#A50064",
    isDefault: true,
  },
  {
    id: "cash",
    name: "Tiền mặt khi nhận hàng (COD)",
    color: "#00B14F",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    color: "#0068FF",
  },
];

export const MOCK_DELIVERY_ADDRESS = {
  title: "Đại Học Quốc Tế Miền Đông - Cổng L...",
  subtitle: "Lê Duẩn, P.Bình Dương, TP.Hồ Chí Minh...",
  distance: "3,3 km",
  storeName: "KFC - Tòa Nhà Sora Gardens SC",
};

export const getDeliveryOptions = async (): Promise<DeliveryOption[]> => {
  return MOCK_DELIVERY_OPTIONS;
};

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return MOCK_PAYMENT_METHODS;
};
