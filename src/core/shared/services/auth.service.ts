import { ClientHttpService } from "./client-http.service";
import { ConfigService } from "./config.service";

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
   * Store authentication token
   */
  private setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      // Set token for future requests
      this.httpService.setDefaultHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  }

  /**
   * Store user data
   */
  private setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  /**
   * Get stored authentication token
   */
  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  /**
   * Get stored user data
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      this.httpService.removeDefaultHeader("Authorization");
    }
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
}

export const authService = new AuthService();
