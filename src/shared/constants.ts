export const FOOTER_SECTIONS = [
  {
    title: "Quick Links",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/help", label: "Help Center" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "For Sellers",
    links: [
      { href: "/sell", label: "Start Selling" },
      { href: "/seller-center", label: "Seller Center" },
      { href: "/seller-guide", label: "Seller Guide" },
      { href: "/commission-rates", label: "Commission Rates" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/track-order", label: "Order Tracking" },
      { href: "/returns", label: "Returns & Refunds" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/payment-methods", label: "Payment Methods" },
    ],
  },
];

// UI Constants - Shared across multiple components/pages
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
  },
  SPACING: {
    header: {
      height: "5rem", // 80px (h-20)
      heightCalc: "calc(100vh - 5rem)",
    },
  },
} as const;

// Animation Constants - Shared across components
export const ANIMATION_CONSTANTS = {
  TRANSITIONS: {
    default: "transition-all duration-300",
    colors: "transition-colors duration-300",
    slow: "transition-all duration-500",
  },
  BLUR: {
    background: "blur-3xl",
    glass: "backdrop-blur-sm",
  },
} as const;
