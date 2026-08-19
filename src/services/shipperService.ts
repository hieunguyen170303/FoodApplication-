import { ShipperOrder, ChatMessage, ShipperStats, AuthUser } from "@/types";
import { IMAGES } from "@/constants";
import { apiClient } from "./apiClient";

// Fallback local mock data store for Shipper if network is offline
let mockAvailableOrders: ShipperOrder[] = [
  {
    id: "ORD-9821",
    orderCode: "FOOD-9821",
    storeName: "Jollibee - EC Nguyễn Du",
    storeAddress: "Tầng 1, EC Nguyễn Du, Hùng Vương, Thủ Dầu Một",
    storePhone: "0274 382 119",
    customerName: "Nguyễn Văn Hùng",
    customerPhone: "0912 345 678",
    deliveryAddress: "Phòng 14.02, Chung cư Bcons City, Dĩ An, Bình Dương",
    distanceText: "2.4 km",
    itemsSummary: "1x Combo Gà Giòn Vui Vẻ + 1x Mỳ Ý Jolly + 1x Pepsi",
    totalFoodPrice: 108000,
    shippingEarnings: 25000,
    status: "AVAILABLE",
    statusText: "Đơn hàng mới chờ nhận",
    createdAt: "10 phút trước",
  },
  {
    id: "ORD-9822",
    orderCode: "FOOD-9822",
    storeName: "KFC - Nguyễn Trãi",
    storeAddress: "235 Nguyễn Trãi, Phường Phú Hòa, Thủ Dầu Một",
    storePhone: "0274 399 888",
    customerName: "Trần Thị Mai",
    customerPhone: "0988 777 666",
    deliveryAddress: "128 Đường Lê Hồng Phong, Phú Lợi, Thủ Dầu Một",
    distanceText: "1.8 km",
    itemsSummary: "2x Miếng Gà Rán + 1x Khoai Tây Chiên Lớn + 2x Mirinda",
    totalFoodPrice: 110000,
    shippingEarnings: 18000,
    status: "AVAILABLE",
    statusText: "Đơn hàng mới chờ nhận",
    createdAt: "15 phút trước",
  },
];

let mockActiveOrder: ShipperOrder | null = null;

let mockCompletedHistory: ShipperOrder[] = [
  {
    id: "ORD-9540",
    orderCode: "FOOD-9540",
    storeName: "Bún Chả Hà Nội - Phú Cường",
    storeAddress: "12 Yersin, Phường Phú Cường, Thủ Dầu Một",
    storePhone: "0274 311 222",
    customerName: "Vũ Thị Hương",
    customerPhone: "0944 555 666",
    deliveryAddress: "89 Đường Thích Quảng Đức, Phú Cường",
    distanceText: "2.1 km",
    itemsSummary: "2x Suất Bún Chả Đặc Biệt + 2x Nem Cua Bể",
    totalFoodPrice: 140000,
    shippingEarnings: 22000,
    status: "COMPLETED",
    statusText: "Đã giao thành công",
    createdAt: "Hôm nay, 12:30",
  },
];

let mockChatMessages: { [orderId: string]: ChatMessage[] } = {};

export const shipperService = {
  // Shipper login authentication check
  async loginShipper(identifier: string, pass: string): Promise<AuthUser> {
    await new Promise((res) => setTimeout(res, 300));

    const cleanInput = identifier.toLowerCase().trim();
    if (cleanInput === "shipper" || cleanInput === "shipper@gmail.com") {
      if (pass === "123" || pass === "123456") {
        return {
          id: "usr_shipper_01",
          name: "Nguyễn Văn Hùng (Shipper)",
          email: "shipper@gmail.com",
          role: "SHIPPER",
          avatar: IMAGES.avatar,
        };
      }
    }

    throw new Error("Tài khoản hoặc mật khẩu Shipper không đúng! (Dùng tk: shipper, pass: 123)");
  },

  // Get Shipper statistics from REST API
  async getShipperStats(): Promise<ShipperStats> {
    try {
      const res = await apiClient.get("/shipper/stats");
      return res.stats;
    } catch {
      return {
        todayEarnings: 350000,
        completedCount: mockCompletedHistory.length,
        rating: 4.9,
        acceptanceRate: "98%",
      };
    }
  },

  // Get available unassigned orders from Express Backend REST API
  async getShipperAvailableOrders(): Promise<ShipperOrder[]> {
    try {
      const res = await apiClient.get("/shipper/orders/available");
      console.log("🛵 Fetched Available Orders from REST API:", res.orders?.length);
      return res.orders || [];
    } catch (err) {
      console.warn("Using fallback local available orders:", err);
      return mockAvailableOrders;
    }
  },

  // Get active accepted order from Express Backend REST API
  async getShipperActiveOrder(): Promise<ShipperOrder | null> {
    try {
      const res = await apiClient.get("/shipper/orders/active");
      return res.order || null;
    } catch {
      return mockActiveOrder;
    }
  },

  // Accept an available order via REST API
  async acceptOrder(orderId: string): Promise<ShipperOrder> {
    try {
      const res = await apiClient.post(`/shipper/orders/${orderId}/accept`, {});
      mockActiveOrder = res.order;
      return res.order;
    } catch (err: any) {
      console.warn("REST accept order error, fallback to local:", err.message);
      const targetIndex = mockAvailableOrders.findIndex((o) => o.id === orderId);
      if (targetIndex !== -1) {
        const accepted = mockAvailableOrders[targetIndex];
        accepted.status = "ACCEPTED";
        accepted.statusText = "Tài xế Nguyễn Văn Hùng đã nhận đơn!";
        mockAvailableOrders.splice(targetIndex, 1);
        mockActiveOrder = accepted;
        return accepted;
      }
      throw err;
    }
  },

  // Update order status via REST API (ACCEPTED -> PICKED_UP -> DELIVERING -> COMPLETED)
  async updateOrderStatus(orderId: string, newStatus: ShipperOrder["status"]): Promise<ShipperOrder> {
    // Save local snapshot BEFORE API call in case REST fails or returns null
    const localSnapshot: ShipperOrder | null = mockActiveOrder ? { ...mockActiveOrder } : null;

    try {
      const res = await apiClient.put(`/shipper/orders/${orderId}/status`, { status: newStatus });
      if (newStatus === "COMPLETED") {
        mockActiveOrder = null;
        // res.order may be null from backend - fallback to local snapshot
        return res.order || localSnapshot || ({ id: orderId, status: newStatus, shippingEarnings: 25000 } as any);
      } else {
        mockActiveOrder = res.order;
        return res.order;
      }
    } catch (err: any) {
      console.warn("REST update status error, fallback to local:", err.message);
      if (!localSnapshot) {
        throw new Error("Không tìm thấy đơn hàng đang giao!");
      }
      localSnapshot.status = newStatus;
      if (newStatus === "COMPLETED") {
        mockActiveOrder = null;
        return localSnapshot;
      }
      mockActiveOrder = localSnapshot;
      return localSnapshot;
    }
  },

  // Get delivered history from REST API
  async getShipperOrderHistory(): Promise<ShipperOrder[]> {
    try {
      const res = await apiClient.get("/shipper/orders/history");
      return res.history || [];
    } catch {
      return mockCompletedHistory;
    }
  },

  // Get chat messages for order
  async getChatMessages(orderId: string): Promise<ChatMessage[]> {
    try {
      const res = await apiClient.get(`/shipper/messages/${orderId}`);
      return res.messages || [];
    } catch {
      return mockChatMessages[orderId] || [];
    }
  },

  // Send a chat message
  async sendChatMessage(orderId: string, text: string): Promise<ChatMessage> {
    try {
      const res = await apiClient.post(`/shipper/messages/${orderId}`, {
        senderRole: "SHIPPER",
        senderName: "Tài xế Nguyễn Văn Hùng",
        text,
      });
      return res.message;
    } catch {
      const newMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        orderId,
        senderRole: "SHIPPER",
        senderName: "Tài xế Nguyễn Văn Hùng",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      if (!mockChatMessages[orderId]) {
        mockChatMessages[orderId] = [];
      }
      mockChatMessages[orderId].push(newMsg);
      return newMsg;
    }
  },
};
