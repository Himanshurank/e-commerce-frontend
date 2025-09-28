/**
 * Configuration service interface following the reference guide
 * Provides centralized configuration management for the application
 */
export interface IConfigService {
  /**
   * Get application configuration
   * @returns Application configuration object
   */
  getAppConfig(): Record<string, any>;

  /**
   * Get API paths configuration
   * @returns API paths configuration object
   */
  getApiPaths(): Record<string, any>;

  /**
   * Get full API URL by combining base URL with path
   * @param path API path
   * @returns Full API URL
   */
  getFullApiUrl(path: string): string;

  /**
   * Replace path parameters with actual values
   * @param path Path with parameters (e.g., '/products/:id')
   * @param params Object with parameter values (e.g., { id: '123' })
   * @returns Path with replaced parameters
   */
  replacePathParams(path: string, params: Record<string, string>): string;
}

/**
 * Application configuration structure
 */
export interface IAppConfig {
  apiBaseUrl: string;
  environment: "development" | "production" | "staging";
  timeout: number;
  retries: number;
  enableLogging: boolean;
  version: string;
}

/**
 * API paths configuration structure
 */
export interface IApiPaths {
  // Product endpoints
  products: string;
  productById: string;
  productSearch: string;
  productCategories: string;

  // Cart endpoints
  cart: string;
  cartItems: string;
  cartAdd: string;
  cartRemove: string;
  cartUpdate: string;

  // User endpoints
  users: string;
  userProfile: string;
  userOrders: string;
  userWishlist: string;

  // Order endpoints
  orders: string;
  orderById: string;
  orderCreate: string;
  orderUpdate: string;

  // Auth endpoints
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    forgotPassword: string;
    resetPassword: string;
  };

  // Seller endpoints
  sellers: string;
  sellerProducts: string;
  sellerOrders: string;
  sellerAnalytics: string;

  // Admin endpoints
  admin: {
    users: string;
    sellers: string;
    orders: string;
    analytics: string;
    reports: string;
  };

  // Pages endpoints
  pages: {
    homepage: string;
  };
}
