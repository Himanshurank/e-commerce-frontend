import { IHttpService, IHttpError } from "../interfaces/httpService";
import { IConfigService } from "../interfaces/config";
import {
  ApiError,
  NetworkError,
  TimeoutError,
  AuthenticationError,
} from "../errors/api-error";
import Cookies from "js-cookie";

export class ClientHttpService implements IHttpService {
  private baseUrl: string;

  constructor(private config: IConfigService) {
    this.baseUrl = this.config.getAppConfig().lancerAPI;
  }

  async get<T>({
    path,
    queryParams = {},
  }: {
    path: string;
    queryParams?: Record<string, any>;
  }): Promise<T> {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${this.baseUrl}/${path}${queryString ? `?${queryString}` : ""}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include", // Include cookies
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        await this.handleHttpError(response);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, { path, queryParams });
      throw error;
    }
  }

  async post<T>({
    path,
    body,
    headers = {},
    config,
  }: {
    path: string;
    body: Record<string, any>;
    headers?: Record<string, any>;
    config?: any;
  }): Promise<T> {
    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
          ...headers,
        },
        credentials: "include",
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(config?.timeout || 10000),
      });

      if (!response.ok) {
        await this.handleHttpError(response);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, { path, body });
      throw error;
    }
  }

  async put<T>({
    path,
    body,
  }: {
    path: string;
    body: Record<string, any>;
  }): Promise<T> {
    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        await this.handleHttpError(response);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, { path, body });
      throw error;
    }
  }

  async delete<T>({ path }: { path: string }): Promise<T> {
    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        await this.handleHttpError(response);
      }

      // Handle empty response for DELETE requests
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      this.handleError(error, { path });
      throw error;
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = Cookies.get("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleHttpError(response: Response) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: response.statusText };
    }

    // Handle specific status codes
    if (response.status === 401) {
      // Clear auth and redirect to login
      Cookies.remove("auth_token", { path: "/" });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new AuthenticationError(
        errorBody.message || "Authentication required"
      );
    }

    throw new ApiError(
      errorBody.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  private handleError(error: any, context: any) {
    console.error("Client HTTP Service Error:", {
      error: error.message,
      context,
      timestamp: new Date().toISOString(),
    });

    // Transform fetch errors to our custom errors
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new TimeoutError("Request timeout");
      }
      if (
        error.message.includes("fetch") ||
        error.message.includes("network")
      ) {
        throw new NetworkError("Network error occurred");
      }
    }
  }

  // Utility methods for authentication
  setAuthToken(token: string): void {
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  removeAuthToken(): void {
    Cookies.remove("auth_token", { path: "/" });
  }

  getAuthToken(): string | null {
    return Cookies.get("auth_token") || null;
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
