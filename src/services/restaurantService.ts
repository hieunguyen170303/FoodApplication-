import { IMAGES } from "@/constants";
import { RestaurantDetail, RestaurantMenuItem, FoodOptionGroup } from "@/types";

const JOLLIBEE_CUSTOMIZATION_GROUPS: FoodOptionGroup[] = [
  {
    id: "g_mango_pie",
    title: "Chọn Bánh Xoài Đào :",
    required: true,
    options: [
      { id: "opt_mango_1", name: "1 Bánh xoài đào", extraPrice: 0, isDefault: true },
    ],
  },
  {
    id: "g_drink",
    title: "Chọn Nước 1:",
    required: true,
    options: [
      { id: "opt_pepsi", name: "1 Pepsi lớn", extraPrice: 0, isDefault: true },
      { id: "opt_7up", name: "1 7up lớn", extraPrice: 0 },
      { id: "opt_mirinda", name: "1 Mirinda cam lớn", extraPrice: 0 },
    ],
  },
  {
    id: "g_chicken",
    title: "Chọn 1 Gà giòn - 1:",
    required: true,
    options: [
      { id: "opt_chick_original", name: "1 Gà giòn vui vẻ", extraPrice: 0, isDefault: true },
      { id: "opt_chick_spicy", name: "1 Miếng Gà Sốt Cay", extraPrice: 2000 },
    ],
  },
  {
    id: "g_fries",
    title: "Chọn 1 Khoai Tây Chiên - 1:",
    required: true,
    options: [
      { id: "opt_fries_reg", name: "1 Khoai tây chiên vừa", extraPrice: 0, isDefault: true },
      { id: "opt_fries_large", name: "1 Khoai Tây Chiên lớn", extraPrice: 10000 },
      { id: "opt_fries_bbq", name: "1 Khoai Lắc Vị BBQ", extraPrice: 5000 },
      { id: "opt_fries_bbq_large", name: "1 Khoai Lắc Vị BBQ Lớn", extraPrice: 15000 },
    ],
  },
];

export const MOCK_RESTAURANT_DETAIL: RestaurantDetail = {
  id: "r2",
  name: "Jollibee",
  branch: "EC Nguyễn Du - Thủ Dầu Một",
  logo: IMAGES.logo,
  rating: 4.4,
  reviewCount: "1K+",
  originalDeliveryFee: "42.000đ",
  deliveryFee: "30.000đ",
  deliveryTime: "36 phút trở lên",
  vouchers: [
    {
      id: "v1",
      title: "Giảm 10.000đ",
      subtitle: "Đơn hàng từ 70.000đ",
    },
    {
      id: "v2",
      title: "Ưu đãi đến 10%",
      subtitle: "Đặt đơn nhóm",
    },
  ],
  menuSections: [
    {
      id: "sec_today_deals",
      title: "Ưu đãi hôm nay",
      items: [
        {
          id: "m1",
          name: "2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Khoai Tây Chiên vừa + 2 Nước ngọt",
          description: "Giá gốc 180.000. 2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Khoai Tây...",
          price: 145000,
          originalPrice: 180000,
          image: IMAGES.burgerOne,
          tag: "Ưu đãi 20%",
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
      ],
    },
    {
      id: "sec_for_you",
      title: "Dành cho bạn",
      items: [
        {
          id: "m2",
          name: "1 Miếng Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly vừa + 1 Khoai tây chiên vừa + 1 Bánh xoài đào + 1 Nước ngọt",
          description: "Giá gốc 80.000. 1 Miếng Gà Giòn Vui Vẻ + 1 Khoai tây chiên vừa + 1 Bánh xoài đào + 1 Nước ngọt lớn + 1 Tương Chua Ngọt + 1 Tương Cà",
          price: 78000,
          originalPrice: 80000,
          image: IMAGES.burgerOne,
          tag: "Bán chạy",
          isPopular: true,
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
        {
          id: "m3",
          name: "1 Mỳ Ý Jolly vừa + 1 Miếng Gà Giòn Vui Vẻ + 1 Khoai tây chiên vừa + 1 Nước ngọt",
          description: "Mỳ Ý thơm ngon kèm gà giòn tan và khoai tây chiên giòn giòn.",
          price: 93000,
          image: IMAGES.burgerTwo,
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
        {
          id: "m4",
          name: "3 Miếng gà giòn vui vẻ + 2 Mỳ Ý Jolly + 1 Khoai tây chiên vừa + 3 Nước",
          description: "Combo no bụng cho 2-3 người ăn.",
          price: 185000,
          originalPrice: 225000,
          image: IMAGES.pizzaOne,
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
        {
          id: "m5",
          name: "1 Mỳ Ý sốt cay vừa + 1 Miếng Gà Giòn Vui Vẻ + 1 Nước",
          description: "Mỳ Ý sốt cay đậm đà chuẩn vị Jollibee.",
          price: 78000,
          image: IMAGES.burrito,
          isNew: true,
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
      ],
    },
    {
      id: "sec_combos",
      title: "Cặp Đôi Ăn Ý",
      items: [
        {
          id: "m6",
          name: "2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Khoai Tây Chiên vừa + 2 Nước ngọt",
          description: "Giá gốc 180.000. Combo cho cặp đôi cực hời.",
          price: 145000,
          originalPrice: 180000,
          image: IMAGES.burgerOne,
          tag: "Bán chạy",
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
        {
          id: "m7",
          name: "3 Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly + 1 Khoai tây chiên vừa + 2 Nước ngọt",
          description: "Giá gốc 178.000. Món đặc tuyển bán chạy nhất.",
          price: 145000,
          originalPrice: 178000,
          image: IMAGES.burgerTwo,
          tag: "Món đặc tuyển",
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
        {
          id: "m8",
          name: "COMBO GIA ĐÌNH (4-5 người)",
          description: "Combo rộn rã cho cả gia đình thưởng thức.",
          price: 322000,
          originalPrice: 364000,
          image: IMAGES.pizzaOne,
          optionGroups: JOLLIBEE_CUSTOMIZATION_GROUPS,
        },
      ],
    },
  ],
};

export const getRestaurantDetail = async (id: string): Promise<RestaurantDetail> => {
  return MOCK_RESTAURANT_DETAIL;
};
