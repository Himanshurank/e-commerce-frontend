# E-Commerce Frontend - Next.js Planning Document

## 🎯 Project Overview

### Repository: `ecommerce-frontend`

**Technology**: Next.js 14+ with App Router + PostgreSQL
**Purpose**: User interfaces for customers, sellers, and admin
**Deployment**: Vercel

### Key Features

- **Customer Interface**: Product browsing, cart, checkout, order tracking
- **Seller Dashboard**: Product management, order fulfillment, analytics
- **Admin Panel**: User management, seller approval, financial oversight
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Server-side rendering for product pages

---

## 🏗️ Project Structure

```
ecommerce-frontend/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-banner.jpg
│   │   ├── placeholder-product.jpg
│   │   └── icons/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                    # App Router (Next.js 14+)
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/       # Dashboard route group
│   │   │   ├── customer/
│   │   │   │   ├── orders/
│   │   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── seller/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── users/
│   │   │   │   ├── sellers/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── products/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── api/               # API routes (minimal)
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── webhook/
│   │   │       └── stripe/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/               # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   ├── forms/            # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── product/          # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── ProductImages.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductSearch.tsx
│   │   │   └── RelatedProducts.tsx
│   │   ├── cart/             # Cart components
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── MiniCart.tsx
│   │   ├── order/            # Order components
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   ├── OrderStatus.tsx
│   │   │   ├── OrderTracking.tsx
│   │   │   └── OrderHistory.tsx
│   │   ├── dashboard/        # Dashboard components
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── KPIWidget.tsx
│   │   └── common/           # Common components
│   │       ├── SearchBox.tsx
│   │       ├── Pagination.tsx
│   │       ├── ImageUpload.tsx
│   │       ├── DatePicker.tsx
│   │       ├── RichTextEditor.tsx
│   │       └── ErrorBoundary.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   ├── useOrders.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useMediaQuery.ts
│   ├── services/             # API service functions
│   │   ├── api.ts            # Axios configuration
│   │   ├── auth.ts           # Authentication services
│   │   ├── products.ts       # Product services
│   │   ├── orders.ts         # Order services
│   │   ├── users.ts          # User services
│   │   ├── payments.ts       # Payment services
│   │   ├── upload.ts         # File upload services
│   │   └── analytics.ts      # Analytics services
│   ├── store/                # State management (Zustand)
│   │   ├── authStore.ts      # Authentication state
│   │   ├── cartStore.ts      # Shopping cart state
│   │   ├── productStore.ts   # Product browsing state
│   │   ├── orderStore.ts     # Order management state
│   │   ├── uiStore.ts        # UI state (modals, loading)
│   │   └── index.ts          # Store exports
│   ├── utils/                # Utility functions
│   │   ├── formatters.ts     # Data formatting utilities
│   │   ├── validators.ts     # Validation functions
│   │   ├── constants.ts      # App constants
│   │   ├── helpers.ts        # Helper functions
│   │   ├── cn.ts            # Class name utility
│   │   └── seo.ts           # SEO utilities
│   ├── types/                # TypeScript definitions
│   │   ├── auth.ts          # Authentication types
│   │   ├── product.ts       # Product types
│   │   ├── order.ts         # Order types
│   │   ├── user.ts          # User types
│   │   ├── api.ts           # API response types
│   │   └── index.ts         # Type exports
│   ├── styles/               # Styling
│   │   ├── globals.css      # Global styles
│   │   └── components.css   # Component-specific styles
│   └── lib/                  # Library configurations
│       ├── auth.ts          # NextAuth configuration
│       ├── stripe.ts        # Stripe configuration
│       └── validations.ts   # Zod schemas
├── .env.local                # Environment variables
├── .env.example              # Environment template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
├── README.md                 # Documentation
└── .gitignore               # Git ignore rules
```

---

## 📦 Dependencies & Configuration

### Package.json

```json
{
  "name": "ecommerce-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",

    "axios": "^1.6.0",
    "next-auth": "^4.24.0",
    "zustand": "^4.4.0",

    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",

    "tailwindcss": "^3.3.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",

    "@stripe/stripe-js": "^2.1.0",
    "@stripe/react-stripe-js": "^2.3.0",

    "lucide-react": "^0.290.0",
    "react-hot-toast": "^2.4.0",
    "framer-motion": "^10.16.0",
    "react-intersection-observer": "^9.5.0",

    "@tanstack/react-query": "^5.0.0",
    "date-fns": "^2.30.0",
    "recharts": "^2.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",

    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",

    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0",

    "jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^6.0.0",

    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f8fafc",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          900: "#0f172a",
        },
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
```

---

## 🔧 Core Architecture

### API Service Layer

```typescript
// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const { response } = error;

        if (response?.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        if (response?.status === 403) {
          toast.error("You do not have permission to perform this action");
        }

        if (response?.status >= 500) {
          toast.error("Server error. Please try again later.");
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();
```

### Authentication Service

```typescript
// src/services/auth.ts
import { apiService } from "./api";
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
} from "@/types/auth";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        return response;
      }

      throw new Error("Login failed");
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || "Login failed");
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/register",
        userData
      );

      if (response.success && response.data) {
        localStorage.setItem("authToken", response.data.token);
        return response;
      }

      throw new Error("Registration failed");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || "Registration failed"
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<{ success: boolean; data: User }>(
      "/auth/me"
    );
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiService.put<{ success: boolean; data: User }>(
      "/auth/profile",
      userData
    );
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
}

export const authService = new AuthService();
```

### Product Service

```typescript
// src/services/products.ts
import { apiService } from "./api";
import {
  Product,
  ProductFilters,
  CreateProductData,
  UpdateProductData,
} from "@/types/product";

class ProductService {
  async getProducts(filters?: ProductFilters) {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    return apiService.get<{
      success: boolean;
      data: {
        products: Product[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
    }>(url);
  }

  async getProduct(id: string) {
    return apiService.get<{
      success: boolean;
      data: Product;
    }>(`/products/${id}`);
  }

  async searchProducts(query: string) {
    return apiService.get<{
      success: boolean;
      data: {
        products: Product[];
        total: number;
      };
    }>(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(categorySlug: string, filters?: ProductFilters) {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `/products/category/${categorySlug}?${queryString}`
      : `/products/category/${categorySlug}`;

    return apiService.get<{
      success: boolean;
      data: {
        products: Product[];
        category: { id: string; name: string; slug: string };
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
    }>(url);
  }

  async createProduct(productData: CreateProductData) {
    return apiService.post<{
      success: boolean;
      data: Product;
    }>("/products", productData);
  }

  async updateProduct(id: string, productData: UpdateProductData) {
    return apiService.put<{
      success: boolean;
      data: Product;
    }>(`/products/${id}`, productData);
  }

  async deleteProduct(id: string) {
    return apiService.delete<{
      success: boolean;
      message: string;
    }>(`/products/${id}`);
  }

  async getSellerProducts(sellerId: string) {
    return apiService.get<{
      success: boolean;
      data: {
        products: Product[];
        total: number;
      };
    }>(`/products/seller/${sellerId}`);
  }
}

export const productService = new ProductService();
```

---

## 🗃️ State Management (Zustand)

### Authentication Store

```typescript
// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/auth";
import { User, LoginCredentials, RegisterData } from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      getCurrentUser: async () => {
        if (!get().token) return;

        set({ isLoading: true });
        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updateProfile: async (userData) => {
        set({ isLoading: true });
        try {
          const updatedUser = await authService.updateProfile(userData);
          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### Cart Store

```typescript
// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        let newItems: CartItem[];

        if (existingItem) {
          newItems = items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...items,
            {
              id: `${product.id}-${Date.now()}`,
              product,
              quantity,
              price: product.price,
            },
          ];
        }

        const total = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({ items: newItems, total, itemCount });
      },

      removeItem: (productId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.product.id !== productId);
        const total = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({ items: newItems, total, itemCount });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );

        const total = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        set({ items: newItems, total, itemCount });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
);
```

---

## 🎨 Component Architecture

### UI Components

#### Button Component

```typescript
// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
      secondary:
        "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus-visible:ring-secondary-500",
      outline:
        "border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 focus-visible:ring-secondary-500",
      ghost:
        "text-secondary-700 hover:bg-secondary-100 focus-visible:ring-secondary-500",
      danger:
        "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-6 text-base",
      xl: "h-12 px-8 text-base",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
```

#### Input Component

```typescript
// src/components/ui/Input.tsx
import React from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-secondary-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-secondary-400">{leftIcon}</span>
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-error-500 focus-visible:ring-error-500",
              className
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-secondary-400">{rightIcon}</span>
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
```

### Feature Components

#### Product Card

```typescript
// src/components/product/ProductCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatters";

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  showWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
  showWishlist = true,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);
    try {
      addItem(product);
      // Show success toast
    } catch (error) {
      // Show error toast
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100
      )
    : 0;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-secondary-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0] || "/images/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              -{discountPercentage}%
            </Badge>
          )}

          {product.stockQuantity === 0 && (
            <Badge variant="secondary" className="absolute right-2 top-2">
              Out of Stock
            </Badge>
          )}

          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className="absolute right-2 bottom-2 rounded-full bg-white/80 p-2 text-secondary-600 transition-colors hover:bg-white hover:text-error-600"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted && "fill-current text-error-600"
                )}
              />
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-medium text-secondary-900 line-clamp-2 group-hover:text-primary-600">
              {product.name}
            </h3>

            {product.seller && (
              <p className="text-sm text-secondary-500">
                by {product.seller.name}
              </p>
            )}
          </div>

          {/* Rating */}
          {product.averageRating && (
            <div className="mb-2 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.averageRating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-secondary-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-secondary-500">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-semibold text-secondary-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-secondary-500 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && product.stockQuantity > 0 && (
            <Button
              onClick={handleAddToCart}
              loading={isAddingToCart}
              className="w-full"
              size="sm"
              leftIcon={<ShoppingCart className="h-4 w-4" />}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};
```

---

## 📱 Pages & Routing

### App Router Structure

#### Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "E-Commerce Platform",
    template: "%s | E-Commerce Platform",
  },
  description: "Modern e-commerce platform for buyers and sellers",
  keywords: ["ecommerce", "shopping", "marketplace", "online store"],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "E-Commerce Platform",
    description: "Modern e-commerce platform for buyers and sellers",
    siteName: "E-Commerce Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Platform",
    description: "Modern e-commerce platform for buyers and sellers",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
```

#### Home Page

```typescript
// src/app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary-900">
            Shop by Category
          </h2>
          <FeaturedCategories />
        </div>
      </section>

      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary-900">
            Featured Products
          </h2>
          <Suspense fallback={<ProductGridSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
```

#### Product Detail Page

```typescript
// src/app/products/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import { productService } from "@/services/products";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const response = await productService.getProduct(params.slug);
    const product = response.data;

    return {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.shortDescription,
      openGraph: {
        title: product.name,
        description: product.shortDescription || "",
        images: product.images?.slice(0, 4) || [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.shortDescription || "",
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const response = await productService.getProduct(params.slug);
    const product = response.data;

    return (
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail product={product} />
        </Suspense>

        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-secondary-900">
            Customer Reviews
          </h2>
          <Suspense fallback={<div>Loading reviews...</div>}>
            <ProductReviews productId={product.id} />
          </Suspense>
        </section>

        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-secondary-900">
            Related Products
          </h2>
          <Suspense fallback={<ProductGridSkeleton />}>
            <RelatedProducts
              productId={product.id}
              categoryId={product.categoryId}
            />
          </Suspense>
        </section>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
```

---

## 🔒 Authentication & Security

### NextAuth Configuration

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (response.success && response.data) {
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              role: response.data.user.role,
              token: response.data.token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

### Protected Route HOC

```typescript
// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  redirectTo = "/login",
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, getCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (!user && isAuthenticated) {
      getCurrentUser();
    }

    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
      return;
    }
  }, [
    user,
    isAuthenticated,
    isLoading,
    allowedRoles,
    redirectTo,
    router,
    getCurrentUser,
  ]);

  if (isLoading || (!user && isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
```

---

## 🎨 Styling & Theming

### Global Styles

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-semibold tracking-tight;
  }

  h1 {
    @apply text-4xl lg:text-5xl;
  }

  h2 {
    @apply text-3xl lg:text-4xl;
  }

  h3 {
    @apply text-2xl lg:text-3xl;
  }

  h4 {
    @apply text-xl lg:text-2xl;
  }

  h5 {
    @apply text-lg lg:text-xl;
  }

  h6 {
    @apply text-base lg:text-lg;
  }
}

@layer utilities {
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-secondary-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-secondary-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-secondary-400;
}

/* Focus styles */
.focus-visible\:ring-2:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--ring);
}
```

---

## 🧪 Testing Strategy

### Jest Configuration

```javascript
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/layout.tsx",
    "!src/app/globals.css",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Component Tests

```typescript
// __tests__/components/ProductCard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cartStore";

// Mock the cart store
jest.mock("@/store/cartStore");

const mockProduct = {
  id: "1",
  name: "Test Product",
  slug: "test-product",
  price: 99.99,
  comparePrice: 129.99,
  images: ["/test-image.jpg"],
  stockQuantity: 10,
  seller: { id: "1", name: "Test Seller" },
  averageRating: 4.5,
  reviewCount: 25,
};

const mockAddItem = jest.fn();

beforeEach(() => {
  (useCartStore as jest.Mock).mockReturnValue({
    addItem: mockAddItem,
  });
});

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("by Test Seller")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("$129.99")).toBeInTheDocument();
    expect(screen.getByText("(25)")).toBeInTheDocument();
  });

  it("shows discount percentage", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("-23%")).toBeInTheDocument();
  });

  it("adds product to cart when button is clicked", async () => {
    render(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
    });
  });

  it("shows out of stock badge when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stockQuantity: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment & Environment

### Environment Variables

```bash
# .env.local
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_REVIEWS=true
NEXT_PUBLIC_ENABLE_WISHLIST=true
```

### Vercel Deployment Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://your-backend-api.com/:path*"
    }
  ]
}
```

---

## 📚 Learning Outcomes

### Technical Skills You'll Master

#### **Next.js App Router**

- **Why Important**: Latest Next.js architecture with better performance
- **What You'll Learn**:
  - Server and client components
  - Nested layouts and route groups
  - Loading and error boundaries
  - Metadata API for SEO
  - Streaming and Suspense

#### **State Management with Zustand**

- **Why Important**: Modern, lightweight state management
- **What You'll Learn**:
  - Store creation and management
  - Persistence with localStorage
  - Optimistic updates
  - State synchronization

#### **Component Architecture**

- **Why Important**: Scalable and maintainable UI development
- **What You'll Learn**:
  - Atomic design principles
  - Compound components
  - Render props and custom hooks
  - TypeScript integration

#### **Performance Optimization**

- **Why Important**: Fast, responsive user experience
- **What You'll Learn**:
  - Image optimization
  - Code splitting
  - Lazy loading
  - Bundle analysis

This frontend planning document provides a complete roadmap for building a modern, scalable e-commerce frontend with Next.js. Every decision is explained with reasoning, and the architecture is designed for maintainability and performance.

Ready to proceed with the backend planning document! 🚀
