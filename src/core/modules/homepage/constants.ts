export const MOCK_CATEGORIES = [
  {
    id: "1",
    name: "Electronics",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 1250,
    slug: "electronics",
  },
  {
    id: "2",
    name: "Fashion",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 2100,
    slug: "fashion",
  },
  {
    id: "3",
    name: "Home & Garden",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 890,
    slug: "home-garden",
  },
  {
    id: "4",
    name: "Sports",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 650,
    slug: "sports",
  },
  {
    id: "5",
    name: "Books",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 3200,
    slug: "books",
  },
  {
    id: "6",
    name: "Toys",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 720,
    slug: "toys",
  },
  {
    id: "7",
    name: "Beauty",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 980,
    slug: "beauty",
  },
  {
    id: "8",
    name: "Automotive",
    image: "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
    productCount: 450,
    slug: "automotive",
  },
];

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.5,
    reviewCount: 128,
    seller: "TechStore",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker with Heart Rate Monitor",
    price: 149.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.2,
    reviewCount: 89,
    seller: "FitGear",
    inStock: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt - Premium Quality",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.7,
    reviewCount: 256,
    seller: "EcoFashion",
    inStock: true,
  },
  {
    id: "4",
    name: "Professional Camera Lens 50mm f/1.8",
    price: 299.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.8,
    reviewCount: 67,
    seller: "PhotoPro",
    inStock: false,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.4,
    reviewCount: 143,
    seller: "OfficeComfort",
    inStock: true,
  },
  {
    id: "6",
    name: "Smart Home Security Camera System",
    price: 179.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.3,
    reviewCount: 94,
    seller: "SecureHome",
    inStock: true,
  },
  {
    id: "7",
    name: "Premium Kitchen Knife Set with Wooden Block",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.6,
    reviewCount: 187,
    seller: "ChefTools",
    inStock: true,
  },
  {
    id: "8",
    name: "Wireless Charging Pad for Smartphones",
    price: 29.99,
    image: "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
    rating: 4.1,
    reviewCount: 312,
    seller: "TechStore",
    inStock: true,
  },
];

// Hero Section Constants
export const HERO_STATS = [
  {
    value: "200M+",
    label: "Products",
    iconType: "package",
    color: "text-brand-600",
  },
  {
    value: "40M+",
    label: "Suppliers",
    iconType: "building",
    color: "text-accent-600",
  },
  {
    value: "190+",
    label: "Countries",
    iconType: "globe",
    color: "text-brand-500",
  },
] as const;

export const HERO_CONTENT = {
  BADGE: {
    text: "Trusted Global Platform",
    iconType: "star",
  },
  HEADING: {
    main: "Connect, Trade & Grow Your Business",
    highlight: "Globally",
  },
  DESCRIPTION:
    "Discover millions of quality products from verified suppliers worldwide. Experience seamless B2B trading with advanced tools, secure payments, and comprehensive support.",
  SEARCH_PLACEHOLDER: "Search products, suppliers, or categories...",
  CTA_BUTTONS: {
    primary: "Start Exploring",
    secondary: "Join as Supplier",
  },
} as const;

export const HERO_VALUE_PROPS = [
  {
    id: 1,
    title: "Global Marketplace",
    description:
      "Access millions of products from verified suppliers across 190+ countries with real-time inventory.",
    iconType: "world",
    gradient: "from-brand-500 to-brand-600",
  },
  {
    id: 2,
    title: "Secure Trading",
    description:
      "Trade with confidence using our secure payment system, quality assurance, and buyer protection.",
    iconType: "shield",
    gradient: "from-accent-500 to-accent-600",
  },
  {
    id: 3,
    title: "Smart Solutions",
    description:
      "Streamline your sourcing with AI-powered recommendations, bulk ordering, and logistics support.",
    iconType: "lightning",
    gradient: "from-brand-600 to-brand-700",
  },
  {
    id: 4,
    title: "Expert Support",
    description:
      "Get dedicated account management, trade consulting, and 24/7 customer support for your business.",
    iconType: "users",
    gradient: "from-accent-400 to-accent-500",
  },
] as const;
