import { ClientHttpService } from "./httpServiceClient";
import { ConfigService } from "./configService";
import { ApiResponse } from "../interfaces/httpService";
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  LogoutRequest,
  LogoutResponse,
  User,
} from "../interfaces/auth";
import Cookies from "js-cookie";

class AuthService {
  private httpService: ClientHttpService;
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
    this.httpService = new ClientHttpService(this.configService);
  }

  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await this.httpService.post<ApiResponse<SignupResponse>>({
      path: this.configService.getApiPaths().signup,
      body: data,
    });

    if (response.success) {
      this.setUser(response.data);
    }

    return response;
  }

  async signin(data: SigninRequest): Promise<ApiResponse<SigninResponse>> {
    const response = await this.httpService.post<ApiResponse<SigninResponse>>({
      path: this.configService.getApiPaths().signin,
      body: data,
    });

    if (response.success) {
      // Store user data
      this.setUser(response.data);

      // Set auth token if provided (future implementation)
      if (response.data.token) {
        this.setAuthToken(response.data.token);
      } else {
        // For now, create a simple session token since backend doesn't provide JWT yet
        const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.setAuthToken(sessionToken);
      }
    }

    return response;
  }

  async logout(): Promise<ApiResponse<LogoutResponse>> {
    const user = this.getUser();
    const logoutData: LogoutRequest = {
      userId: user?.id,
    };

    const response = await this.httpService.post<ApiResponse<LogoutResponse>>({
      path: this.configService.getApiPaths().logout,
      body: logoutData,
    });

    // Clear local auth data regardless of API response
    this.clearAuth();

    return response;
  }

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  getAuthToken(): string | null {
    return Cookies.get("auth_token") || null;
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  private setAuthToken(token: string): void {
    if (!token) return;

    Cookies.set("auth_token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    this.httpService.setAuthToken(token);
  }

  private setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  private clearAuth(): void {
    // Remove auth token cookie
    Cookies.remove("auth_token", { path: "/" });

    // Remove user data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    // Remove authorization token from HTTP service
    this.httpService.removeAuthToken();
  }
}

export const authService = new AuthService();
