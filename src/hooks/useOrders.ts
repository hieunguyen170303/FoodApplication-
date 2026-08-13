import { useState, useEffect } from "react";
import { getActiveOrder, getOrderHistory } from "@/services/orderService";
import { Order } from "@/types";

export function useOrders() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchOrders() {
    setLoading(true);
    try {
      const [active, history] = await Promise.all([
        getActiveOrder(),
        getOrderHistory(),
      ]);
      setActiveOrder(active);
      setOrderHistory(history);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    activeOrder,
    orderHistory,
    loading,
    refreshOrders: fetchOrders,
  };
}
