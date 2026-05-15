import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
  watchImg,
} from "./images";

export const MOCK_PRODUCTS = [
  {
    _id: "mock1",
    name: "MacBook Pro 16",
    model: "M3 Max",
    category: "Laptops",
    type: "Premium",
    price: 2499,
    oldPrice: 2699,
    isHot: true,
    image: collectionLaptop,
    description: "The most powerful MacBook ever."
  },
  {
    _id: "mock2",
    name: "iPhone 15 Pro",
    model: "Titanium",
    category: "Smartphones",
    type: "Mobile",
    price: 999,
    oldPrice: 1099,
    isHot: true,
    image: watchImg, // Using watch as a fallback tech image
    description: "Titanium. So strong. So light. So Pro."
  },
  {
    _id: "mock3",
    name: "Sony WH-1000XM5",
    model: "XM5",
    category: "Accessories",
    type: "Audio",
    price: 349,
    oldPrice: 399,
    isHot: false,
    image: collectionHeadset,
    description: "Industry leading noise canceling."
  },
  {
    _id: "mock4",
    name: "Gaming Mouse G-Pro",
    model: "Logitech",
    category: "Accessories",
    type: "Gaming",
    price: 129,
    oldPrice: 159,
    isHot: true,
    image: collectionCamara, // Using camara as fallback for accessory
    description: "Ultra-fast gaming mouse."
  }
];
