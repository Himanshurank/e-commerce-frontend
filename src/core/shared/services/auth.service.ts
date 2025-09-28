import { ClientHttpService } from "./client-http.service";
import { ConfigService } from "./config.service";
import Cookies from "js-cookie";

// Types based on backend API reference
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "CUSTOMER" | "SELLER";
  phoneNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: "CUSTOMER" | "SELLER";
  status: string;
  emailVerified: boolean;
  phoneNumber?: string;
  canLogin: boolean;
  canSellProducts: boolean;
  canAccessAdminPanel: boolean;
  needsApproval: boolean;
  createdAt: string;
}

export interface SellerProfile {
  id: string;
  businessName: string;
  isVerified: boolean;
  canReceivePayouts: boolean;
  hasCompleteProfile: boolean;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    expiresIn: number;
    sellerProfile?: SellerProfile;
    emailVerificationRequired?: boolean;
    message: string;
  };
  message: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any[];
  };
}

class AuthService {
  private httpService: ClientHttpService;
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
    this.httpService = new ClientHttpService(this.configService);
  }

  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.httpService.post<AuthResponse>({
        path: this.configService.getApiPaths().auth.register,
        body: data,
      });

      // Store token if registration successful
      if (response.success && response.data.token) {
        this.setAuthToken(response.data.token);
        this.setUser(response.data.user);
      }

      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.httpService.post<AuthResponse>({
        path: this.configService.getApiPaths().auth.login,
        body: data,
      });

      // Store token if login successful
      if (response.success && response.data.token) {
        this.setAuthToken(response.data.token);
        this.setUser(response.data.user);
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.httpService.post({
        path: this.configService.getApiPaths().auth.logout,
        body: {},
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API response
      this.clearAuth();
    }
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<any> {
    try {
      return await this.httpService.get({
        path: this.configService.getApiPaths().auth.profile,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  }

  /**
   * Store authentication token in secure cookie
   */
  private setAuthToken(token: string): void {
    // Store token in secure, httpOnly cookie
    Cookies.set("auth_token", token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "strict", // CSRF protection
      path: "/", // Available throughout the app
    });

    // Set token for future requests
    this.httpService.setDefaultHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Store user data in localStorage
   */
  private setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  /**
   * Get stored authentication token from cookie
   */
  getAuthToken(): string | null {
    return Cookies.get("auth_token") || null;
  }

  /**
   * Get stored user data from localStorage
   */
  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    // Remove auth token cookie
    Cookies.remove("auth_token", { path: "/" });

    // Remove user data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    // Remove authorization header
    this.httpService.removeDefaultHeader("Authorization");
  }

  /**
   * Initialize auth service (call on app startup)
   */
  initialize(): void {
    const token = this.getAuthToken();
    if (token) {
      this.httpService.setDefaultHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  }

  /**
   * Get authentication token from server-side cookies (for SSR)
   * @param cookieString - Cookie string from request headers
   */
  getAuthTokenFromCookies(cookieString: string): string | null {
    if (!cookieString) return null;

    const cookies = cookieString.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    return cookies.auth_token || null;
  }

  /**
   * Get user data from server-side localStorage is not available in SSR
   * This method is kept for API compatibility but returns null
   * Use getUser() on client-side instead
   * @param cookieString - Cookie string from request headers (not used)
   */
  getUserFromCookies(cookieString: string): User | null {
    // User data is stored in localStorage, not available in SSR
    // Return null and handle user data on client-side
    return null;
  }
}

export const authService = new AuthService();
