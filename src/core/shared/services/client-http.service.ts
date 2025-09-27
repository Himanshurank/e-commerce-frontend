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
 * Client-side HTTP service implementation using fetch API
 * Designed for browser/client-side usage in React components and hooks
 */
export class ClientHttpService implements IHttpService {
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
        ...this.defaultHeaders,
      },
      retries: appConfig.retries,
      retryDelay: 1000,
    };

    // Add default error interceptor for common error handling
    this.addErrorInterceptor(this.defaultErrorHandler.bind(this));
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
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  /**
   * Build request options for fetch
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
      signal: AbortSignal.timeout(this.config.timeout),
    };

    // Handle request body
    if (body) {
      if (body instanceof FormData) {
        requestOptions.body = body;
        // Remove Content-Type header for FormData (browser will set it with boundary)
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
   * Execute HTTP request with retry logic
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

        // Don't retry on client errors (4xx) or on the last attempt
        if (this.shouldNotRetry(lastError) || attempt === maxRetries) {
          break;
        }

        // Wait before retrying
        if (attempt < maxRetries) {
          await this.delay(this.config.retryDelay! * Math.pow(2, attempt));
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
   * Handle fetch response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    let responseData: IHttpResponse<T>;

    try {
      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
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
   * Check if request should not be retried
   */
  private shouldNotRetry(error: IHttpError): boolean {
    if (!error.status) return false;

    // Don't retry client errors (4xx) except for specific cases
    return error.status >= 400 && error.status < 500 && error.status !== 408;
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
   * Default error handler
   */
  private async defaultErrorHandler(error: IHttpError): Promise<never> {
    // Log error in development
    if (this.configService.getAppConfig().enableLogging) {
      console.error("HTTP Request Error:", {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        response: error.response,
      });
    }

    // You can add more default error handling here
    // For example: redirect to login on 401, show toast notifications, etc.

    throw error;
  }

  /**
   * Get current configuration
   */
  getConfig(): IHttpClientConfig {
    return { ...this.config };
  }

  /**
   * Update default headers
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
}
