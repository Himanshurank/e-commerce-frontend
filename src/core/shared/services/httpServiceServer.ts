import { IHttpService, IHttpError } from "../interfaces/httpService";
import { IConfigService } from "../interfaces/config";
import { ApiError, NetworkError, TimeoutError } from "../errors/api-error";

/**
 * Server-side HTTP service implementation using fetch API
 * Designed for server-side usage in Next.js API routes, getServerSideProps, etc.
 * Optimized for Node.js environment
 * Following the comprehensive architecture from http.md
 */
export class ServerHttpService implements IHttpService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(
    private config: IConfigService,
    headers: Record<string, string> = {},
    pageUrl?: string
  ) {
    this.baseUrl = this.config.getAppConfig().internalLancerAPI;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.API_KEY || "",
      "User-Agent": "ECommerce-Server",
      ...headers,
    };
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
        headers: this.defaultHeaders,
        signal: AbortSignal.timeout(
          this.config.getAppConfig().app.port || 10000
        ),
      });

      if (!response.ok) {
        throw await this.createApiError(response);
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
        headers: { ...this.defaultHeaders, ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(config?.timeout || 10000),
      });

      if (!response.ok) {
        throw await this.createApiError(response);
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
        headers: this.defaultHeaders,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw await this.createApiError(response);
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
        headers: this.defaultHeaders,
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw await this.createApiError(response);
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

  private async createApiError(response: Response): Promise<ApiError> {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: response.statusText };
    }

    return new ApiError(
      errorBody.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  private handleError(error: any, context: any) {
    // Server-side logging
    console.error("Server HTTP Service Error:", {
      timestamp: new Date().toISOString(),
      error: error.message,
      context,
      stack: error.stack,
    });

    // Transform fetch errors to our custom errors
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new TimeoutError("Request timeout");
      }
      if (error.message.includes("fetch")) {
        throw new NetworkError("Network error occurred");
      }
    }
  }

  // Utility method to set authorization header
  setAuthorizationHeader(
    token: string,
    type: "Bearer" | "Basic" = "Bearer"
  ): void {
    this.defaultHeaders["Authorization"] = `${type} ${token}`;
  }

  // Utility method to remove authorization header
  removeAuthorizationHeader(): void {
    delete this.defaultHeaders["Authorization"];
  }

  // Get current headers
  getHeaders(): Record<string, string> {
    return { ...this.defaultHeaders };
  }

  // Update headers
  updateHeaders(headers: Record<string, string>): void {
    Object.assign(this.defaultHeaders, headers);
  }
}
