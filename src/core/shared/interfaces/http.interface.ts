/**
 * HTTP service interface following the reference guide
 * Provides generic HTTP client abstraction for both client and server-side usage
 */
export interface IHttpService {
  /**
   * Perform GET request
   * @param params Request parameters including path and query params
   * @returns Promise with typed response
   */
  get<T>(params: IHttpGetParams): Promise<T>;

  /**
   * Perform POST request
   * @param params Request parameters including path and body
   * @returns Promise with typed response
   */
  post<T>(params: IHttpPostParams): Promise<T>;

  /**
   * Perform PUT request
   * @param params Request parameters including path and body
   * @returns Promise with typed response
   */
  put<T>(params: IHttpPutParams): Promise<T>;

  /**
   * Perform DELETE request
   * @param params Request parameters including path and optional body
   * @returns Promise with typed response
   */
  delete<T>(params: IHttpDeleteParams): Promise<T>;

  /**
   * Perform PATCH request
   * @param params Request parameters including path and body
   * @returns Promise with typed response
   */
  patch<T>(params: IHttpPatchParams): Promise<T>;
}

/**
 * HTTP GET request parameters
 */
export interface IHttpGetParams {
  path: string;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * HTTP POST request parameters
 */
export interface IHttpPostParams {
  path: string;
  body: Record<string, any> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * HTTP PUT request parameters
 */
export interface IHttpPutParams {
  path: string;
  body: Record<string, any> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * HTTP DELETE request parameters
 */
export interface IHttpDeleteParams {
  path: string;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * HTTP PATCH request parameters
 */
export interface IHttpPatchParams {
  path: string;
  body: Record<string, any> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * HTTP response wrapper
 */
export interface IHttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * HTTP error interface
 */
export interface IHttpError extends Error {
  status?: number;
  statusText?: string;
  response?: {
    data?: any;
    status: number;
    statusText: string;
  };
}

/**
 * Request interceptor function type
 */
export type RequestInterceptor = (config: any) => any | Promise<any>;

/**
 * Response interceptor function type
 */
export type ResponseInterceptor = (response: any) => any | Promise<any>;

/**
 * Error interceptor function type
 */
export type ErrorInterceptor = (error: IHttpError) => Promise<any>;

/**
 * HTTP client configuration
 */
export interface IHttpClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retries?: number;
  retryDelay?: number;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  errorInterceptors?: ErrorInterceptor[];
}
