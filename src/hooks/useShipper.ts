import { useState, useEffect, useCallback } from "react";
import { ShipperOrder, ChatMessage, ShipperStats } from "@/types";
import { shipperService } from "@/services/shipperService";

export function useShipper() {
  const [stats, setStats] = useState<ShipperStats>({
    todayEarnings: 350000,
    completedCount: 12,
    rating: 4.9,
    acceptanceRate: "98%",
  });
  const [availableOrders, setAvailableOrders] = useState<ShipperOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<ShipperOrder | null>(null);
  const [historyOrders, setHistoryOrders] = useState<ShipperOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [s, avail, active, hist] = await Promise.all([
        shipperService.getShipperStats(),
        shipperService.getShipperAvailableOrders(),
        shipperService.getShipperActiveOrder(),
        shipperService.getShipperOrderHistory(),
      ]);
      setStats(s);
      setAvailableOrders(avail);
      setActiveOrder(active);
      setHistoryOrders(hist);
    } catch (err: any) {
      console.warn("Error fetching shipper data:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleAcceptOrder = async (orderId: string) => {
    const accepted = await shipperService.acceptOrder(orderId);
    setActiveOrder({ ...accepted });
    setAvailableOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: ShipperOrder["status"]
  ) => {
    const updated = await shipperService.updateOrderStatus(orderId, newStatus);
    if (newStatus === "COMPLETED") {
      setActiveOrder(null);
      setHistoryOrders((prev) => [updated, ...prev]);
      setStats((prev) => ({
        ...prev,
        todayEarnings: prev.todayEarnings + updated.shippingEarnings,
        completedCount: prev.completedCount + 1,
      }));
    } else {
      setActiveOrder({ ...updated });
    }
  };

  return {
    stats,
    availableOrders,
    activeOrder,
    historyOrders,
    loading,
    refreshData,
    handleAcceptOrder,
    handleUpdateStatus,
  };
}
