import {
  IHttpService,
  IHttpGetParams,
  IHttpPostParams,
  IHttpPutParams,
  IHttpDeleteParams,
  IHttpPatchParams,
  IHttpResponse,
  IHttpError,
  IHttpClientConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from "@/core/shared/interfaces/http.interface";
import { IConfigService } from "@/core/shared/interfaces/config.interface";

/**
 * Server-side HTTP service implementation using fetch API
 * Designed for server-side usage in Next.js API routes, getServerSideProps, etc.
 * Optimized for Node.js environment
 */
export class ServerHttpService implements IHttpService {
  private readonly config: IHttpClientConfig;
  private readonly requestInterceptors: RequestInterceptor[] = [];
  private readonly responseInterceptors: ResponseInterceptor[] = [];
  private readonly errorInterceptors: ErrorInterceptor[] = [];

  constructor(
    private readonly configService: IConfigService,
    private readonly defaultHeaders: Record<string, string> = {}
  ) {
    const appConfig = this.configService.getAppConfig();

    this.config = {
      baseURL: appConfig.apiBaseUrl,
      timeout: appConfig.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": `ECommerce-Server/${appConfig.version}`,
        ...this.defaultHeaders,
      },
      retries: appConfig.retries,
      retryDelay: 1000,
    };

    // Add default error interceptor for server-side error handling
    this.addErrorInterceptor(this.defaultServerErrorHandler.bind(this));
  }

  /**
   * Perform GET request
   */
  async get<T>(params: IHttpGetParams): Promise<T> {
    const url = this.buildUrl(params.path, params.queryParams);
    const options = await this.buildRequestOptions("GET", params.headers);

    return this.executeRequest<T>(url, options);
  }

  /**
   * Perform POST request
   */
  async post<T>(params: IHttpPostParams): Promise<T> {
    const url = this.buildUrl(params.path);
    const options = await this.buildRequestOptions(
      "POST",
      params.headers,
      params.body
    );

    return this.executeRequest<T>(url, options);
  }

  /**
   * Perform PUT request
   */
  async put<T>(params: IHttpPutParams): Promise<T> {
    const url = this.buildUrl(params.path);
    const options = await this.buildRequestOptions(
      "PUT",
      params.headers,
      params.body
    );

    return this.executeRequest<T>(url, options);
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(params: IHttpDeleteParams): Promise<T> {
    const url = this.buildUrl(params.path);
    const options = await this.buildRequestOptions(
      "DELETE",
      params.headers,
      params.body
    );

    return this.executeRequest<T>(url, options);
  }

  /**
   * Perform PATCH request
   */
  async patch<T>(params: IHttpPatchParams): Promise<T> {
    const url = this.buildUrl(params.path);
    const options = await this.buildRequestOptions(
      "PATCH",
      params.headers,
      params.body
    );

    return this.executeRequest<T>(url, options);
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(path: string, queryParams?: Record<string, any>): string {
    const baseUrl = this.config.baseURL.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    let url = `${baseUrl}${cleanPath}`;

    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, String(v)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  /**
   * Build request options for fetch (server-side optimized)
   */
  private async buildRequestOptions(
    method: string,
    headers?: Record<string, string>,
    body?: Record<string, any> | FormData
  ): Promise<RequestInit> {
    let requestOptions: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...headers,
      },
      // Server-side specific options
      signal: AbortSignal.timeout(this.config.timeout),
      // Keep connections alive for better performance in server environment
      keepalive: false, // Not supported in Node.js fetch
    };

    // Handle request body
    if (body) {
      if (body instanceof FormData) {
        requestOptions.body = body;
        // Remove Content-Type header for FormData
        delete (requestOptions.headers as any)["Content-Type"];
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      requestOptions = await interceptor(requestOptions);
    }

    return requestOptions;
  }

  /**
   * Execute HTTP request with server-optimized retry logic
   */
  private async executeRequest<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    let lastError: IHttpError;
    const maxRetries = this.config.retries || 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        return await this.handleResponse<T>(response);
      } catch (error) {
        lastError = this.createHttpError(error);

        // Server-side retry logic - more conservative
        if (this.shouldNotRetryOnServer(lastError) || attempt === maxRetries) {
          break;
        }

        // Exponential backoff with jitter for server requests
        if (attempt < maxRetries) {
          const jitter = Math.random() * 1000;
          const delay = this.config.retryDelay! * Math.pow(2, attempt) + jitter;
          await this.delay(delay);
        }
      }
    }

    // Apply error interceptors
    for (const interceptor of this.errorInterceptors) {
      try {
        return await interceptor(lastError!);
      } catch {
        // Continue to next interceptor if this one doesn't handle the error
      }
    }

    throw lastError!;
  }

  /**
   * Handle fetch response (server-side optimized)
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    let responseData: IHttpResponse<T>;

    try {
      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else if (contentType && contentType.includes("text/")) {
        data = await response.text();
      } else {
        // For binary data, return as buffer in server environment
        data = await response.arrayBuffer();
      }

      responseData = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
      };

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        responseData = await interceptor(responseData);
      }

      if (!response.ok) {
        throw this.createHttpError(
          new Error(`HTTP ${response.status}: ${response.statusText}`),
          response.status,
          response.statusText,
          responseData
        );
      }

      return responseData.data;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw this.createHttpError(
          new Error("Request timeout"),
          408,
          "Request Timeout"
        );
      }
      throw error;
    }
  }

  /**
   * Create standardized HTTP error
   */
  private createHttpError(
    error: any,
    status?: number,
    statusText?: string,
    response?: any
  ): IHttpError {
    const httpError = new Error(
      error.message || "HTTP request failed"
    ) as IHttpError;
    httpError.name = "HttpError";
    httpError.status = status;
    httpError.statusText = statusText;
    httpError.response = response;
    return httpError;
  }

  /**
   * Server-side specific retry logic
   */
  private shouldNotRetryOnServer(error: IHttpError): boolean {
    if (!error.status) return false;

    // Don't retry client errors (4xx) except for rate limiting and timeouts
    if (error.status >= 400 && error.status < 500) {
      return ![408, 429].includes(error.status);
    }

    // Don't retry certain server errors that are unlikely to resolve
    if (error.status >= 500) {
      return [501, 505].includes(error.status);
    }

    return false;
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Parse response headers to plain object
   */
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Server-side specific error handler
   */
  private async defaultServerErrorHandler(error: IHttpError): Promise<never> {
    // Server-side logging (you might want to use a proper logging service)
    if (this.configService.getAppConfig().enableLogging) {
      console.error("Server HTTP Request Error:", {
        timestamp: new Date().toISOString(),
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        stack: error.stack,
        response: error.response,
      });
    }

    // Server-side specific error handling
    // You might want to:
    // - Send to error tracking service (Sentry, LogRocket, etc.)
    // - Store in database for analysis
    // - Alert monitoring systems

    throw error;
  }

  /**
   * Get current configuration
   */
  getConfig(): IHttpClientConfig {
    return { ...this.config };
  }

  /**
   * Update default headers (useful for adding auth tokens)
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    Object.assign(this.config.headers, headers);
  }

  /**
   * Remove default header
   */
  removeDefaultHeader(key: string): void {
    delete this.config.headers[key];
  }

  /**
   * Set authorization header
   */
  setAuthorizationHeader(
    token: string,
    type: "Bearer" | "Basic" = "Bearer"
  ): void {
    this.setDefaultHeaders({
      Authorization: `${type} ${token}`,
    });
  }

  /**
   * Remove authorization header
   */
  removeAuthorizationHeader(): void {
    this.removeDefaultHeader("Authorization");
  }

  /**
   * Create a new instance with different base URL (useful for external APIs)
   */
  createWithBaseUrl(baseUrl: string): ServerHttpService {
    const newService = new ServerHttpService(
      this.configService,
      this.defaultHeaders
    );
    newService.config.baseURL = baseUrl;
    return newService;
  }
}
