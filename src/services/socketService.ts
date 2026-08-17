import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./apiClient";

// Convert http://192.168.1.10:5000/api to http://192.168.1.10:5000
const SOCKET_URL = BASE_URL.replace("/api", "");

class FrontendSocketService {
  private socket: Socket | null = null;

  public connect(): Socket {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        autoConnect: true,
      });

      this.socket.on("connect", () => {
        console.log("🔌 Connected to WebSocket Server:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("❌ Disconnected from WebSocket Server");
      });
    }

    if (!this.socket.connected) {
      this.socket.connect();
    }

    return this.socket;
  }

  public joinRoom(orderId: string) {
    const s = this.connect();
    const room = orderId.startsWith("order:") ? orderId : `order:${orderId}`;
    console.log(`📡 Emitting join_room for: ${room}`);
    s.emit("join_room", room);
  }

  public onOrderStatusChanged(callback: (data: { orderId: string; status: string; stepIndex: number; statusText: string }) => void) {
    const s = this.connect();
    s.on("order:status_changed", callback);
    return () => {
      s.off("order:status_changed", callback);
    };
  }

  public onNewAvailableOrder(callback: (order: any) => void) {
    const s = this.connect();
    s.on("shipper:new_order_available", callback);
    return () => {
      s.off("shipper:new_order_available", callback);
    };
  }

  public onChatMessageReceived(callback: (message: any) => void) {
    const s = this.connect();
    s.on("chat:new_message", callback);
    return () => {
      s.off("chat:new_message", callback);
    };
  }

  public sendChatMessage(orderId: string, message: any) {
    const s = this.connect();
    console.log("💬 Emitting chat:send_message to room:", orderId, message);
    s.emit("chat:send_message", { orderId, message });
  }

  public updateOrderStatus(orderId: string, status: string, stepIndex: number, statusText: string) {
    const s = this.connect();
    console.log("🛵 Emitting order:update_status:", orderId, status);
    s.emit("order:update_status", { orderId, status, stepIndex, statusText });
  }
}

export const socketService = new FrontendSocketService();
