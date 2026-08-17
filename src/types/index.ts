export interface FoodCategory {
  id: string;
  title: string;
  bgColor: string;
  image: any;
  imagePosition?: "left" | "right";
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  prepTime: string;
  calories: string;
  category: string;
  image: any;
  isPopular?: boolean;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: any;
  isVip: boolean;
}

export interface GridFoodItem {
  id: string;
  name: string;
  price: number;
  startingPriceText: string;
  category: string;
  image: any;
}

export interface Restaurant {
  id: string;
  name: string;
  branch?: string;
  logo: any;
  rating: number;
  reviewCount: string;
  category: string;
  priceRange: string;
  originalDeliveryFee?: string;
  deliveryFee: string;
  deliveryTime: string;
  isSponsored?: boolean;
  tag?: string;
  voucherBadge?: string;
  minOrder?: string;
}

export interface FoodOption {
  id: string;
  name: string;
  extraPrice: number;
  isDefault?: boolean;
}

export interface FoodOptionGroup {
  id: string;
  title: string;
  required: boolean;
  options: FoodOption[];
}

export interface RestaurantMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: any;
  tag?: string;
  isPopular?: boolean;
  isNew?: boolean;
  optionGroups?: FoodOptionGroup[];
}

export interface CustomizedCartItem {
  id: string;
  menuItem: RestaurantMenuItem;
  selectedOptions: { [groupId: string]: FoodOption };
  quantity: number;
  note: string;
  itemTotal: number;
}

export interface MenuSection {
  id: string;
  title: string;
  items: RestaurantMenuItem[];
}

export interface RestaurantDetail {
  id: string;
  name: string;
  branch: string;
  logo: any;
  rating: number;
  reviewCount: string;
  deliveryFee: string;
  originalDeliveryFee?: string;
  deliveryTime: string;
  vouchers: { id: string; title: string; subtitle: string; icon?: string }[];
  menuSections: MenuSection[];
}

export type OrderStatus = "PREPARING" | "DELIVERING" | "COMPLETED" | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  storeName: string;
  storeLogo: any;
  status: OrderStatus;
  statusText: string;
  estimatedTime?: string;
  currentStepIndex?: number; // 0: Đã nhận đơn, 1: Đang chế biến, 2: Đang giao hàng, 3: Đã đến nơi
  orderDate: string;
  items: OrderItem[];
  totalPrice: number;
  driverInfo?: {
    name: string;
    phone: string;
    rating: number;
    vehicleNumber: string;
    avatar: any;
  };
}

export interface DeliveryOption {
  id: string;
  name: string;
  speedText: string;
  timeText: string;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  tag?: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
}

export type UserRole = "CUSTOMER" | "SHIPPER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatar?: any;
}

// ----------------------------------------------------
// SHIPPER SPECIFIC TYPES
// ----------------------------------------------------
export type ShipperOrderStatus =
  | "AVAILABLE"
  | "ACCEPTED"
  | "PICKED_UP"
  | "DELIVERING"
  | "COMPLETED";

export interface ShipperOrder {
  id: string;
  orderCode: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  distanceText: string;
  itemsSummary: string;
  totalFoodPrice: number;
  shippingEarnings: number; // Tiền công giao đơn của Shipper
  status: ShipperOrderStatus;
  statusText: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderRole: "CUSTOMER" | "SHIPPER";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ShipperStats {
  todayEarnings: number;
  completedCount: number;
  rating: number;
  acceptanceRate: string;
}
