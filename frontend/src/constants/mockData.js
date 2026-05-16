import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
  watchImg,
} from "./images";

export const MOCK_PRODUCTS = [
  {
    _id: "1",
    id: 1,
    name: "Predator Helios Neo",
    model: "G930",
    category: "Laptops",
    type: "Gaming Powerhouse",
    price: 1890,
    oldPrice: 2100,
    isHot: true,
    image: collectionLaptop,
    model3D: "/models/laptop.glb",
    description: "High-performance gaming laptop with immersive 3D display."
  },
  {
    _id: "2",
    id: 2,
    name: "Sony WH-1000XM5",
    model: "XM5",
    category: "Accessories",
    type: "Audio",
    price: 349,
    oldPrice: 399,
    isHot: true,
    image: collectionHeadset,
    model3D: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
    description: "Industry leading noise canceling and sci-fi aesthetics."
  },
  {
    _id: "3",
    id: 3,
    name: "iPhone 15 Pro",
    model: "Titanium",
    category: "Smartphones",
    type: "Mobile",
    price: 1199,
    oldPrice: 1299,
    isHot: false,
    image: watchImg,
    model3D: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
    description: "Titanium. So strong. So light. So Pro."
  },
  {
    _id: "4",
    id: 4,
    name: "ThinkPad Z13",
    model: "AMD Ryzen 9",
    category: "Laptops",
    type: "Business Elite",
    price: 1550,
    oldPrice: 1699,
    isHot: true,
    image: collectionLaptop,
    model3D: "/models/scene.glb",
    description: "Elite performance for business professionals."
  },
  {
    _id: "5",
    id: 5,
    name: "Bose Ultra Comfort",
    model: "Ultra 2",
    category: "Accessories",
    type: "Audiophile Grade",
    price: 650,
    oldPrice: 750,
    isHot: true,
    image: collectionHeadset,
    model3D: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChronographWatch/glTF-Binary/ChronographWatch.glb",
    description: "Spatial Audio and precision engineering."
  }
];
