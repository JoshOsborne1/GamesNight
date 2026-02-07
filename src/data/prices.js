// Price is Right - Amazon UK Product Data
// Realistic prices based on 2024-2025 Amazon UK bestsellers and popular products

export const products = [
  // Electronics
  {
    id: 1,
    name: "Apple AirPods Pro 2",
    price: 199,
    category: "Electronics",
    hint: "Wireless noise-cancelling earbuds with USB-C charging case"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    price: 299,
    category: "Electronics",
    hint: "Premium over-ear wireless headphones with industry-leading noise cancellation"
  },
  {
    id: 3,
    name: "Amazon Fire TV Stick 4K Max",
    price: 44,
    category: "Electronics",
    hint: "Streaming device with Wi-Fi 6E and Alexa Voice Remote"
  },
  {
    id: 4,
    name: "Ring Battery Video Doorbell",
    price: 59,
    category: "Electronics",
    hint: "Wireless smart doorbell camera with head-to-toe HD video view"
  },
  {
    id: 5,
    name: "Echo Dot 5th Gen",
    price: 29,
    category: "Electronics",
    hint: "Compact smart speaker with Alexa and improved audio"
  },
  {
    id: 6,
    name: "Kindle Paperwhite",
    price: 139,
    category: "Electronics",
    hint: "Waterproof e-reader with 6.8-inch glare-free display"
  },
  {
    id: 7,
    name: "Anker Power Bank 20000mAh",
    price: 25,
    category: "Electronics",
    hint: "High-capacity portable charger with USB-C fast charging"
  },

  // Kitchen
  {
    id: 8,
    name: "Ninja Air Fryer AF100UK",
    price: 99,
    category: "Kitchen",
    hint: "3.8L 4-in-1 air fryer that uses little to no oil"
  },
  {
    id: 9,
    name: "Instant Pot Duo 7-in-1",
    price: 79,
    category: "Kitchen",
    hint: "Multi-cooker pressure cooker with 7 cooking functions"
  },
  {
    id: 10,
    name: "Nespresso Vertuo Plus",
    price: 99,
    category: "Kitchen",
    hint: "Pod coffee machine with automatic capsule recognition"
  },
  {
    id: 11,
    name: "Ninja Foodi Dual Zone Air Fryer",
    price: 169,
    category: "Kitchen",
    hint: "Large 7.6L dual drawer air fryer with Smart Cook System"
  },

  // Home
  {
    id: 12,
    name: "Dyson V11 Extra Vacuum",
    price: 349,
    category: "Home",
    hint: "Cordless stick vacuum cleaner with powerful suction"
  },
  {
    id: 13,
    name: "Shark Cordless Vacuum IZ300UK",
    price: 249,
    category: "Home",
    hint: "Anti Hair Wrap cordless vacuum with PowerFins"
  },
  {
    id: 14,
    name: "Philips Hue White & Colour Starter Kit",
    price: 129,
    category: "Home",
    hint: "Smart LED light bulbs with bridge and app control"
  },
  {
    id: 15,
    name: "LEVOIT Air Purifier",
    price: 89,
    category: "Home",
    hint: "HEPA air purifier for allergies, pets and dust"
  },

  // Gaming
  {
    id: 16,
    name: "Meta Quest 3S VR Headset",
    price: 299,
    category: "Gaming",
    hint: "All-in-one virtual reality headset with mixed reality"
  },
  {
    id: 17,
    name: "SteelSeries Arctis Nova Pro Wireless",
    price: 279,
    category: "Gaming",
    hint: "Premium multi-system gaming headset with active noise cancellation"
  },
  {
    id: 18,
    name: "GameSir G7 SE Controller",
    price: 44,
    category: "Gaming",
    hint: "Wired gaming controller for Xbox Series X|S and PC"
  },
  {
    id: 19,
    name: "Razer BlackWidow V4 Keyboard",
    price: 119,
    category: "Gaming",
    hint: "Mechanical gaming keyboard with RGB lighting"
  },

  // Fitness
  {
    id: 20,
    name: "Fitbit Charge 6",
    price: 99,
    category: "Fitness",
    hint: "Advanced fitness tracker with Google apps and 7-day battery"
  },
  {
    id: 21,
    name: "Yoga Mat Extra Thick",
    price: 18,
    category: "Fitness",
    hint: "10mm thick non-slip exercise mat for yoga and workouts"
  },
  {
    id: 22,
    name: "Adjustable Dumbbells 20kg",
    price: 45,
    category: "Fitness",
    hint: "2x10kg adjustable weight dumbbells for home gym"
  },
  {
    id: 23,
    name: "Resistance Bands Set",
    price: 12,
    category: "Fitness",
    hint: "5-piece exercise bands with different resistance levels"
  },
  {
    id: 24,
    name: "Protein Shaker Bottle",
    price: 8,
    category: "Fitness",
    hint: "700ml blender bottle with wire whisk ball"
  }
];

// Export for game use
export default products;
