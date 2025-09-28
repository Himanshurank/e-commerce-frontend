import {
  IConfigService,
  IAppConfig,
  IApiPaths,
} from "@/core/shared/interfaces/config.interface";

/**
 * Configuration service implementation
 * Provides centralized configuration management for the application
 */
export class ConfigService implements IConfigService {
  private readonly appConfig: IAppConfig;
  private readonly apiPaths: IApiPaths;

  constructor() {
    this.appConfig = this.initializeAppConfig();
    this.apiPaths = this.initializeApiPaths();
  }

  /**
   * Get application configuration
   */
  getAppConfig(): IAppConfig {
    return this.appConfig;
  }

  /**
   * Get API paths configuration
   */
  getApiPaths(): IApiPaths {
    return this.apiPaths;
  }

  /**
   * Initialize application configuration based on environment
   */
  private initializeAppConfig(): IAppConfig {
    const isDevelopment = process.env.NODE_ENV === "development";
    const isProduction = process.env.NODE_ENV === "production";

    return {
      apiBaseUrl:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        (isDevelopment
          ? "http://localhost:3001/api"
          : "https://api.ecommerce.com"),
      environment: (process.env.NODE_ENV as any) || "development",
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
      retries: parseInt(process.env.NEXT_PUBLIC_API_RETRIES || "3"),
      enableLogging:
        isDevelopment || process.env.NEXT_PUBLIC_ENABLE_LOGGING === "true",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    };
  }

  /**
   * Initialize API paths configuration
   */
  private initializeApiPaths(): IApiPaths {
    return {
      // Product endpoints
      products: "/products",
      productById: "/products/:id",
      productSearch: "/products/search",
      productCategories: "/products/categories",

      // Cart endpoints
      cart: "/cart",
      cartItems: "/cart/items",
      cartAdd: "/cart/add",
      cartRemove: "/cart/remove",
      cartUpdate: "/cart/update",

      // User endpoints
      users: "/users",
      userProfile: "/users/profile",
      userOrders: "/users/orders",
      userWishlist: "/users/wishlist",

      // Order endpoints
      orders: "/orders",
      orderById: "/orders/:id",
      orderCreate: "/orders/create",
      orderUpdate: "/orders/:id/update",

      // Auth endpoints
      auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        refresh: "/auth/refresh",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
      },

      // Seller endpoints
      sellers: "/sellers",
      sellerProducts: "/sellers/products",
      sellerOrders: "/sellers/orders",
      sellerAnalytics: "/sellers/analytics",

      // Admin endpoints
      admin: {
        users: "/admin/users",
        sellers: "/admin/sellers",
        orders: "/admin/orders",
        analytics: "/admin/analytics",
        reports: "/admin/reports",
      },

      pages: {
        homepage: "/pages/homepage",
      },
    };
  }

  /**
   * Get full API URL by combining base URL with path
   */
  getFullApiUrl(path: string): string {
    const baseUrl = this.appConfig.apiBaseUrl.replace(/\/$/, ""); // Remove trailing slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Replace path parameters with actual values
   * Example: '/products/:id' with { id: '123' } becomes '/products/123'
   */
  replacePathParams(path: string, params: Record<string, string>): string {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  }

  /**
   * Check if we're running on client side
   */
  isClientSide(): boolean {
    return typeof window !== "undefined";
  }

  /**
   * Check if we're running on server side
   */
  isServerSide(): boolean {
    return typeof window === "undefined";
  }

  /**
   * Get environment-specific configuration
   */
  getEnvironmentConfig(): {
    isDevelopment: boolean;
    isProduction: boolean;
    isStaging: boolean;
  } {
    return {
      isDevelopment: this.appConfig.environment === "development",
      isProduction: this.appConfig.environment === "production",
      isStaging: this.appConfig.environment === "staging",
    };
  }
}
