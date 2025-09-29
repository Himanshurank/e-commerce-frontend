import { ClientHttpService } from "./httpServiceClient";
import { ConfigService } from "./configService";
import { ApiResponse } from "../interfaces/httpService";
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
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

  async signin(data: LoginRequest): Promise<any> {
    const response = await this.httpService.post<any>({
      path: this.configService.getApiPaths().signin,
      body: data,
    });

    if (response.success && response.token) {
      this.setAuthToken(response.token);
      this.setUser(response.user);
    }

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
}

export const authService = new AuthService();
