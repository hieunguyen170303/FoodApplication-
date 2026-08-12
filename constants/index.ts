export const IMAGES = {
  burgerOne: require("../assets/images/burger-one.png"),
  burgerTwo: require("../assets/images/burger-two.png"),
  pizzaOne: require("../assets/images/pizza-one.png"),
  burrito: require("../assets/images/buritto.png"),
  avatar: require("../assets/images/avatar.png"),
  logo: require("../assets/images/logo.png"),
  loginGraphic: require("../assets/images/login-graphic.png"),
  emptyState: require("../assets/images/empty-state.png"),
  success: require("../assets/images/success.png"),
};

export const ICONS = {
  home: require("../assets/icons/home.png"),
  search: require("../assets/icons/search.png"),
  bag: require("../assets/icons/bag.png"),
  user: require("../assets/icons/user.png"),
  person: require("../assets/icons/person.png"),
  location: require("../assets/icons/location.png"),
  arrowDown: require("../assets/icons/arrow-down.png"),
  arrowRight: require("../assets/icons/arrow-right.png"),
  arrowBack: require("../assets/icons/arrow-back.png"),
  clock: require("../assets/icons/clock.png"),
  star: require("../assets/icons/star.png"),
  plus: require("../assets/icons/plus.png"),
  minus: require("../assets/icons/minus.png"),
  trash: require("../assets/icons/trash.png"),
  phone: require("../assets/icons/phone.png"),
  envelope: require("../assets/icons/envelope.png"),
  pencil: require("../assets/icons/pencil.png"),
  logout: require("../assets/icons/logout.png"),
  check: require("../assets/icons/check.png"),
  dollar: require("../assets/icons/dollar.png"),
};

export const HERO_PROMO = {
  title: "SUMMER COMBO",
  price: "$10.88",
  image: IMAGES.burgerOne,
  bgColor: "#D23B0D", // Warm vibrant dark orange/red
};

export const CATEGORIES = [
  {
    id: "burgers",
    title: "BURGERS",
    bgColor: "#E98308", // Golden vibrant orange
    image: IMAGES.burgerTwo,
    imagePosition: "left" as const,
  },
  {
    id: "pizza",
    title: "PIZZA",
    bgColor: "#0D4D3A", // Deep forest green
    image: IMAGES.pizzaOne,
    imagePosition: "right" as const,
  },
  {
    id: "burrito",
    title: "BURRITO",
    bgColor: "#D54E13", // Terracotta warm orange
    image: IMAGES.burrito,
    imagePosition: "left" as const,
  },
];

export const USER_LOCATION = "Binh Duong, Ho Chi Minh";
