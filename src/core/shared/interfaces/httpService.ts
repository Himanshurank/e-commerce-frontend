export interface IHttpService {
  get<T>(params: {
    path: string;
    queryParams?: Record<string, any>;
  }): Promise<T>;
  post<T>(params: {
    path: string;
    body: Record<string, any>;
    headers?: Record<string, any>;
    config?: any;
  }): Promise<T>;
  put<T>(params: { path: string; body: Record<string, any> }): Promise<T>;

  delete<T>(params: { path: string }): Promise<T>;
}

export interface IRepositoryHttpClient {
  get<T>(params: {
    url: string;
    queryParams?: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<T>;
  post<T>(params: {
    url: string;
    body?: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<T>;
}

export interface IHttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface IHttpError extends Error {
  status?: number;
  statusText?: string;
  response?: {
    data?: any;
    status: number;
    statusText: string;
  };
}

export type RequestInterceptor = (config: any) => any | Promise<any>;

export type ResponseInterceptor = (response: any) => any | Promise<any>;

export type ErrorInterceptor = (error: IHttpError) => Promise<any>;

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

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: true;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors: any[];
  success: false;
}
