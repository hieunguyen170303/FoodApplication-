import { useState, useEffect, useCallback } from "react";
import {
  getActiveOrder,
  getOrderHistory,
  completeActiveOrder,
  updateActiveOrderStatus,
} from "@/services/orderService";
import { Order, OrderStatus } from "@/types";

export function useOrders() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const [active, history] = await Promise.all([
        getActiveOrder(),
        getOrderHistory(),
      ]);
      setActiveOrder(active ? { ...active } : null);
      setOrderHistory([...history]);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    stepIndex: number,
    statusText: string
  ) => {
    await updateActiveOrderStatus(orderId, status, stepIndex, statusText);
    await fetchOrders();
  };

  const completeOrder = async (orderId: string) => {
    await completeActiveOrder(orderId);
    await fetchOrders();
  };

  return {
    activeOrder,
    orderHistory,
    loading,
    refreshOrders: fetchOrders,
    updateOrderStatus,
    completeOrder,
  };
}
