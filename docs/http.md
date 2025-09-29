# HTTP Service Architecture Documentation

## Overview

This document outlines a comprehensive HTTP service architecture for Next.js applications that supports both server-side and client-side HTTP operations with clean separation of concerns, dependency injection, and robust error handling.

## Architecture Components

### 1. Core HTTP Service Interface

```typescript
// interfaces/IHttpService.ts
export interface IHttpService {
  get<T>(params: { path: string; queryParams?: Record<string, any> }): Promise<T>;
  post<T>(params: { path: string; body: Record<string, any>; headers?: Record<string, any>; config?: any }): Promise<T>;
  put<T>(params: { path: string; body: Record<string, any> }): Promise<T>;
  delete<T>(params: { path: string }): Promise<T>;
}

export interface IRepositoryHttpClient {
  get<T>(params: { url: string; queryParams?: Record<string, any>; headers?: Record<string, any> }): Promise<T>;
  post<T>(params: { url: string; body?: Record<string, any>; headers?: Record<string, any> }): Promise<T>;
}
```

### 2. Configuration Service

The Configuration Service is a crucial component that manages all application settings, API endpoints, and environment-specific configurations. It provides a centralized way to access configuration values throughout your application.

#### 2.1 Configuration Interface

```typescript
// interfaces/IConfigService.ts
export interface IConfigService {
  getAppConfig(): IAppConfig;
  getApiPaths(): IApiPaths;
  getEnvironment(): string;
  isDevelopment(): boolean;
  isProduction(): boolean;
  getFeatureFlags(): IFeatureFlags;
  getThirdPartyConfig(): IThirdPartyConfig;
}

export interface IAppConfig {
  // API Endpoints
  lancerAPI: string; // Client-side API endpoint
  internalLancerAPI: string; // Server-side API endpoint

  // Database Configuration
  database: {
    host: string;
    port: number;
    name: string;
  };

  // Application Settings
  app: {
    name: string;
    version: string;
    domain: string;
    port: number;
  };

  // Security Settings
  security: {
    apiKey: string;
    jwtSecret: string;
    corsOrigins: string[];
  };

  // Cache Configuration
  cache: {
    redis: {
      host: string;
      port: number;
      ttl: number;
    };
  };
}

export interface IApiPaths {
  // Core API paths
  listings: string;
  users: string;
  auth: string;

  // Feature-specific paths
  search: string;
  notifications: string;
  analytics: string;

  // External API paths
  payment: string;
  maps: string;
}

export interface IFeatureFlags {
  enableNewUI: boolean;
  enableAdvancedSearch: boolean;
  enableRealTimeUpdates: boolean;
  enableAnalytics: boolean;
}

export interface IThirdPartyConfig {
  google: {
    mapsApiKey: string;
    analyticsId: string;
  };
  stripe: {
    publishableKey: string;
    webhookSecret: string;
  };
  sentry: {
    dsn: string;
    environment: string;
  };
}
```

#### 2.2 Configuration Implementation

```typescript
// services/ConfigService.ts
import { IConfigService, IAppConfig, IApiPaths, IFeatureFlags, IThirdPartyConfig } from '../interfaces/IConfigService';

export class ConfigService implements IConfigService {
  private static instance: ConfigService;
  private config: IAppConfig | null = null;

  // Singleton pattern to ensure single configuration instance
  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private constructor() {
    this.loadConfiguration();
  }

  private loadConfiguration(): void {
    this.config = {
      // API Configuration
      lancerAPI: this.getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3001/api/public'),
      internalLancerAPI: this.getEnvVar('INTERNAL_API_URL', 'http://localhost:3001/api/internal'),

      // Database Configuration
      database: {
        host: this.getEnvVar('DB_HOST', 'localhost'),
        port: parseInt(this.getEnvVar('DB_PORT', '5432')),
        name: this.getEnvVar('DB_NAME', 'myapp'),
      },

      // Application Configuration
      app: {
        name: this.getEnvVar('APP_NAME', 'My Application'),
        version: this.getEnvVar('APP_VERSION', '1.0.0'),
        domain: this.getEnvVar('APP_DOMAIN', 'localhost:3000'),
        port: parseInt(this.getEnvVar('PORT', '3000')),
      },

      // Security Configuration
      security: {
        apiKey: this.getEnvVar('API_KEY', ''),
        jwtSecret: this.getEnvVar('JWT_SECRET', 'default-secret'),
        corsOrigins: this.getEnvVar('CORS_ORIGINS', 'http://localhost:3000').split(','),
      },

      // Cache Configuration
      cache: {
        redis: {
          host: this.getEnvVar('REDIS_HOST', 'localhost'),
          port: parseInt(this.getEnvVar('REDIS_PORT', '6379')),
          ttl: parseInt(this.getEnvVar('CACHE_TTL', '300')), // 5 minutes
        },
      },
    };
  }

  private getEnvVar(key: string, defaultValue: string = ''): string {
    if (typeof window !== 'undefined') {
      // Client-side: only access NEXT_PUBLIC_ variables
      return process.env[key] || defaultValue;
    }
    // Server-side: access all environment variables
    return process.env[key] || defaultValue;
  }

  getAppConfig(): IAppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config;
  }

  getApiPaths(): IApiPaths {
    return {
      // Core paths
      listings: 'listings',
      users: 'users',
      auth: 'auth',

      // Feature paths
      search: 'search',
      notifications: 'notifications',
      analytics: 'analytics',

      // External paths
      payment: 'payment',
      maps: 'maps',
    };
  }

  getEnvironment(): string {
    return this.getEnvVar('NODE_ENV', 'development');
  }

  isDevelopment(): boolean {
    return this.getEnvironment() === 'development';
  }

  isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }

  getFeatureFlags(): IFeatureFlags {
    return {
      enableNewUI: this.getEnvVar('FEATURE_NEW_UI', 'false') === 'true',
      enableAdvancedSearch: this.getEnvVar('FEATURE_ADVANCED_SEARCH', 'false') === 'true',
      enableRealTimeUpdates: this.getEnvVar('FEATURE_REALTIME', 'false') === 'true',
      enableAnalytics: this.getEnvVar('FEATURE_ANALYTICS', 'true') === 'true',
    };
  }

  getThirdPartyConfig(): IThirdPartyConfig {
    return {
      google: {
        mapsApiKey: this.getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', ''),
        analyticsId: this.getEnvVar('NEXT_PUBLIC_GA_ID', ''),
      },
      stripe: {
        publishableKey: this.getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', ''),
        webhookSecret: this.getEnvVar('STRIPE_WEBHOOK_SECRET', ''),
      },
      sentry: {
        dsn: this.getEnvVar('NEXT_PUBLIC_SENTRY_DSN', ''),
        environment: this.getEnvironment(),
      },
    };
  }

  // Utility method to get API URL with path
  getApiUrl(path: string, isInternal: boolean = false): string {
    const baseUrl = isInternal ? this.config?.internalLancerAPI : this.config?.lancerAPI;
    return `${baseUrl}/${path}`;
  }

  // Method to validate required configuration
  validateConfig(): void {
    const requiredVars = ['API_KEY', 'JWT_SECRET'];

    const missing = requiredVars.filter((key) => !this.getEnvVar(key));

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}
```

#### 2.3 Environment-Specific Configuration

```typescript
// config/environments/development.ts
export const developmentConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    name: 'myapp_dev',
  },
  cache: {
    redis: {
      host: 'localhost',
      port: 6379,
      ttl: 60, // Shorter TTL for development
    },
  },
  security: {
    corsOrigins: ['http://localhost:3000', 'http://localhost:3001'],
  },
};

// config/environments/production.ts
export const productionConfig = {
  database: {
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT || '5432'),
    name: process.env.PROD_DB_NAME,
  },
  cache: {
    redis: {
      host: process.env.PROD_REDIS_HOST,
      port: parseInt(process.env.PROD_REDIS_PORT || '6379'),
      ttl: 300, // Longer TTL for production
    },
  },
  security: {
    corsOrigins: [process.env.PROD_DOMAIN],
  },
};

// config/environments/index.ts
import { developmentConfig } from './development';
import { productionConfig } from './production';

export const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};
```

#### 2.4 Configuration Factory

```typescript
// factories/ConfigFactory.ts
import { ConfigService } from '../services/ConfigService';
import { IConfigService } from '../interfaces/IConfigService';

export class ConfigFactory {
  private static configService: IConfigService | null = null;

  static create(): IConfigService {
    if (!this.configService) {
      this.configService = ConfigService.getInstance();

      // Validate configuration on creation
      this.configService.validateConfig();
    }

    return this.configService;
  }

  // Method to reset configuration (useful for testing)
  static reset(): void {
    this.configService = null;
  }
}
```

#### 2.5 Configuration Hook for React

```typescript
// hooks/useConfig.ts
import { useMemo } from 'react';
import { ConfigFactory } from '../factories/ConfigFactory';
import { IConfigService } from '../interfaces/IConfigService';

export function useConfig(): IConfigService {
  const configService = useMemo(() => {
    return ConfigFactory.create();
  }, []);

  return configService;
}

// Specific hooks for common configuration needs
export function useApiConfig() {
  const config = useConfig();
  return config.getAppConfig();
}

export function useFeatureFlags() {
  const config = useConfig();
  return config.getFeatureFlags();
}

export function useThirdPartyConfig() {
  const config = useConfig();
  return config.getThirdPartyConfig();
}
```

#### 2.6 Usage Examples

```typescript
// Using ConfigService in HTTP Services
export class ServerHttpService implements IHttpService {
  constructor(private config: IConfigService, headers: Record<string, string> = {}) {
    this.baseUrl = this.config.getApiUrl('', true); // true for internal API
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-API-KEY': this.config.getAppConfig().security.apiKey,
      ...headers,
    };
  }
}

// Using ConfigService in Components
const MyComponent: React.FC = () => {
  const { enableNewUI, enableAdvancedSearch } = useFeatureFlags();
  const { google } = useThirdPartyConfig();

  return (
    <div>
      {enableNewUI && <NewUIComponent />}
      {enableAdvancedSearch && <AdvancedSearchComponent />}
      {google.mapsApiKey && <GoogleMapsComponent apiKey={google.mapsApiKey} />}
    </div>
  );
};

// Using ConfigService in API Routes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const config = ConfigFactory.create();
  const { security } = config.getAppConfig();

  // Validate API key
  if (req.headers['x-api-key'] !== security.apiKey) {
    return res.status(401).json({ message: 'Invalid API key' });
  }

  // Continue with request handling...
}
```

#### 2.7 Configuration Testing

```typescript
// __tests__/services/ConfigService.test.ts
import { ConfigService } from '../../services/ConfigService';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.API_KEY = 'test-api-key';
    process.env.JWT_SECRET = 'test-jwt-secret';

    configService = ConfigService.getInstance();
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.API_KEY;
    delete process.env.JWT_SECRET;
  });

  it('should load configuration correctly', () => {
    const config = configService.getAppConfig();

    expect(config.security.apiKey).toBe('test-api-key');
    expect(config.security.jwtSecret).toBe('test-jwt-secret');
  });

  it('should return correct environment', () => {
    expect(configService.getEnvironment()).toBe('test');
    expect(configService.isDevelopment()).toBe(false);
    expect(configService.isProduction()).toBe(false);
  });

  it('should validate required configuration', () => {
    delete process.env.API_KEY;

    expect(() => {
      configService.validateConfig();
    }).toThrow('Missing required environment variables: API_KEY');
  });
});
```

## Server-Side Implementation

### 1. Server-Side HTTP Service

```typescript
// services/server/ServerHttpService.ts
import { IHttpService, IConfigService } from '../interfaces';

export class ServerHttpService implements IHttpService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(private config: IConfigService, headers: Record<string, string> = {}, pageUrl?: string) {
    this.baseUrl = this.config.getAppConfig().internalLancerAPI;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.API_KEY || '',
      ...(process.env.NODE_ENV === 'development' && {
        Host: this.config.getAppConfig().database.host,
      }),
      ...headers,
    };
  }

  async get<T>({ path, queryParams = {} }: { path: string; queryParams?: Record<string, any> }): Promise<T> {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${this.baseUrl}/${path}${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.defaultHeaders,
      });

      if (!response.ok) {
        throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
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
  }: {
    path: string;
    body: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<T> {
    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { ...this.defaultHeaders, ...headers },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new ApiError(
          errorBody.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, { path, body });
      throw error;
    }
  }

  private handleError(error: any, context: any) {
    console.error('Server HTTP Service Error:', {
      error: error.message,
      context,
      stack: error.stack,
    });
  }
}
```

### 2. Server-Side Usage in Next.js Pages

```typescript
// pages/api/listings/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerHttpService } from '../../../services/server/ServerHttpService';
import { ConfigService } from '../../../services/ConfigService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Extract headers for forwarding
    const forwardHeaders: Record<string, string> = {};
    if (req.headers['x-forwarded-for']) {
      forwardHeaders['x-forwarded-for'] = req.headers['x-forwarded-for'] as string;
    }
    if (req.headers.authorization) {
      forwardHeaders['authorization'] = req.headers.authorization;
    }

    // Create services
    const configService = new ConfigService();
    const httpService = new ServerHttpService(configService, forwardHeaders, req.url);

    // Make API call
    const listings = await httpService.get({
      path: 'listings',
      queryParams: req.query,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error('API Error:', error);
    res.status(error.statusCode || 500).json({
      message: error.message || 'Internal server error',
    });
  }
}
```

### 3. Server-Side Usage in getServerSideProps

```typescript
// pages/listings/index.tsx
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ServerHttpService } from '../../services/server/ServerHttpService';
import { ConfigService } from '../../services/ConfigService';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, query } = context;

  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'x-request-id': generateRequestId(),
    };

    // Forward client headers
    if (req.headers['x-forwarded-for']) {
      headers['x-forwarded-for'] = req.headers['x-forwarded-for'] as string;
    }
    if (req.cookies.authToken) {
      headers['authorization'] = `Bearer ${req.cookies.authToken}`;
    }

    // Create services
    const configService = new ConfigService();
    const httpService = new ServerHttpService(configService, headers, context.resolvedUrl);

    // Fetch data
    const listings = await httpService.get({
      path: 'listings',
      queryParams: query,
    });

    return {
      props: {
        listings,
        requestId: headers['x-request-id'],
      },
    };
  } catch (error) {
    console.error('SSR Error:', error);

    // Handle different error scenarios
    if (error.statusCode === 404) {
      return { notFound: true };
    }

    if (error.statusCode === 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // For other errors, show error page
    return {
      props: {
        error: {
          message: 'Failed to load data',
          statusCode: error.statusCode || 500,
        },
      },
    };
  }
};

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

## Client-Side Implementation

### 1. Client-Side HTTP Service

```typescript
// services/client/ClientHttpService.ts
import { IHttpService, IConfigService } from '../interfaces';

export class ClientHttpService implements IHttpService {
  private baseUrl: string;

  constructor(private config: IConfigService) {
    this.baseUrl = this.config.getAppConfig().lancerAPI;
  }

  async get<T>({ path, queryParams = {} }: { path: string; queryParams?: Record<string, any> }): Promise<T> {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${this.baseUrl}/${path}${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        credentials: 'include', // Include cookies
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
  }: {
    path: string;
    body: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<T> {
    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...headers,
        },
        credentials: 'include',
        body: JSON.stringify(body),
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

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
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
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return;
    }

    throw new ApiError(
      errorBody.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  private handleError(error: any, context: any) {
    console.error('Client HTTP Service Error:', {
      error: error.message,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### 2. React Hook for HTTP Service

```typescript
// hooks/useHttpService.ts
import { useMemo } from 'react';
import { ClientHttpService } from '../services/client/ClientHttpService';
import { ConfigService } from '../services/ConfigService';

export function useHttpService() {
  const httpService = useMemo(() => {
    const configService = new ConfigService();
    return new ClientHttpService(configService);
  }, []);

  return httpService;
}
```

### 3. Custom Hook for API Calls

```typescript
// hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';
import { useHttpService } from './useHttpService';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useApi<T>(path: string, queryParams: Record<string, any> = {}, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const httpService = useHttpService();
  const { immediate = true, onSuccess, onError } = options;

  const execute = useCallback(
    async (overrideParams?: Record<string, any>) => {
      setLoading(true);
      setError(null);

      try {
        const result = await httpService.get<T>({
          path,
          queryParams: { ...queryParams, ...overrideParams },
        });

        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [path, queryParams, httpService, onSuccess, onError]
  );

  const mutate = useCallback(
    async (body: Record<string, any>) => {
      setLoading(true);
      setError(null);

      try {
        const result = await httpService.post<T>({
          path,
          body,
        });

        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [path, httpService, onSuccess, onError]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    mutate,
    refetch: execute,
  };
}
```

### 4. Client-Side Usage in Components

```typescript
// components/ListingsList.tsx
import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';

interface Listing {
  id: number;
  title: string;
  price: number;
}

export const ListingsList: React.FC = () => {
  const [filters, setFilters] = useState({ category: 'all' });

  const {
    data: listings,
    loading,
    error,
    execute: refetchListings,
  } = useApi<Listing[]>('listings', filters, {
    onError: (error) => {
      console.error('Failed to load listings:', error);
    },
  });

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    refetchListings(newFilters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Listings</h2>
      {listings?.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>${listing.price}</p>
        </div>
      ))}
    </div>
  );
};
```

### 5. Form Submission with HTTP Service

```typescript
// components/ContactForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHttpService } from '../hooks/useHttpService';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>();
  const httpService = useHttpService();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await httpService.post({
        path: 'contact',
        body: {
          ...data,
          timestamp: new Date().toISOString(),
        },
      });

      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Your Name" disabled={isSubmitting} />
      <input {...register('email', { required: true })} type="email" placeholder="Your Email" disabled={isSubmitting} />
      <textarea {...register('message', { required: true })} placeholder="Your Message" disabled={isSubmitting} />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
```

## Repository Pattern Implementation

### 1. Repository Interface

```typescript
// repositories/interfaces/IListingRepository.ts
export interface IListingRepository {
  getListings(params: GetListingsParams): Promise<ListingsResponse>;
  getListingById(id: number): Promise<Listing>;
  createListing(listing: CreateListingRequest): Promise<Listing>;
  updateListing(id: number, listing: UpdateListingRequest): Promise<Listing>;
  deleteListing(id: number): Promise<void>;
}

export interface GetListingsParams {
  page?: number;
  limit?: number;
  category?: string;
  priceMin?: number;
  priceMax?: number;
}
```

### 2. Repository Implementation

```typescript
// repositories/ListingRepository.ts
import { IListingRepository } from './interfaces/IListingRepository';
import { IHttpService } from '../services/interfaces';

export class ListingRepository implements IListingRepository {
  constructor(private httpService: IHttpService) {}

  async getListings(params: GetListingsParams): Promise<ListingsResponse> {
    return await this.httpService.get({
      path: 'listings',
      queryParams: params,
    });
  }

  async getListingById(id: number): Promise<Listing> {
    return await this.httpService.get({
      path: `listings/${id}`,
    });
  }

  async createListing(listing: CreateListingRequest): Promise<Listing> {
    return await this.httpService.post({
      path: 'listings',
      body: listing,
    });
  }

  async updateListing(id: number, listing: UpdateListingRequest): Promise<Listing> {
    return await this.httpService.put({
      path: `listings/${id}`,
      body: listing,
    });
  }

  async deleteListing(id: number): Promise<void> {
    await this.httpService.delete({
      path: `listings/${id}`,
    });
  }
}
```

## Error Handling

### 1. Custom Error Classes

```typescript
// errors/ApiError.ts
export class ApiError extends Error {
  constructor(message: string, public statusCode: number, public responseBody?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}
```

### 2. Global Error Handler

```typescript
// services/ErrorHandler.ts
export class ErrorHandler {
  static handle(error: any, context?: any) {
    // Log error
    console.error('HTTP Service Error:', {
      message: error.message,
      statusCode: error.statusCode,
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack,
    });

    // Send to monitoring service (e.g., Sentry)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, { extra: context });
    }

    // Return user-friendly message
    return this.getUserFriendlyMessage(error);
  }

  private static getUserFriendlyMessage(error: any): string {
    if (error.statusCode === 400) return 'Invalid request. Please check your input.';
    if (error.statusCode === 401) return 'Please log in to continue.';
    if (error.statusCode === 403) return 'You do not have permission to perform this action.';
    if (error.statusCode === 404) return 'The requested resource was not found.';
    if (error.statusCode === 500) return 'Server error. Please try again later.';
    if (error.name === 'NetworkError') return 'Network error. Please check your connection.';

    return 'An unexpected error occurred. Please try again.';
  }
}
```

## Environment Configuration

### 1. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api/public
INTERNAL_API_URL=http://localhost:3001/api/internal
API_KEY=your-api-key-here
DB_HOST=localhost

# .env.production
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api/public
INTERNAL_API_URL=https://internal-api.yourapp.com/api/internal
API_KEY=your-production-api-key
DB_HOST=your-production-db-host
```

### 2. Next.js Configuration

```javascript
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.INTERNAL_API_URL}/:path*`,
      },
    ];
  },
};
```

## Testing

### 1. HTTP Service Tests

```typescript
// __tests__/services/ClientHttpService.test.ts
import { ClientHttpService } from '../../services/client/ClientHttpService';
import { ConfigService } from '../../services/ConfigService';

// Mock fetch
global.fetch = jest.fn();

describe('ClientHttpService', () => {
  let httpService: ClientHttpService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    httpService = new ClientHttpService(configService);
    (fetch as jest.Mock).mockClear();
  });

  it('should make GET request successfully', async () => {
    const mockResponse = { data: 'test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await httpService.get({ path: 'test' });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle HTTP errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ message: 'Resource not found' }),
    });

    await expect(httpService.get({ path: 'nonexistent' })).rejects.toThrow('Resource not found');
  });
});
```

## Best Practices

### 1. Request/Response Interceptors

```typescript
// services/interceptors.ts
export class RequestInterceptor {
  static addCorrelationId(headers: Record<string, string>): Record<string, string> {
    return {
      ...headers,
      'X-Correlation-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  static addTimestamp(headers: Record<string, string>): Record<string, string> {
    return {
      ...headers,
      'X-Request-Time': new Date().toISOString(),
    };
  }
}

export class ResponseInterceptor {
  static logResponse(response: any, requestInfo: any) {
    console.log('API Response:', {
      url: requestInfo.url,
      method: requestInfo.method,
      status: response.status,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### 2. Caching Strategy

```typescript
// services/CacheService.ts
export class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();

  set(key: string, data: any, ttlMs: number = 300000) {
    // 5 minutes default
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }
}
```

This architecture provides a robust, scalable foundation for HTTP services in Next.js applications with clear separation between server-side and client-side concerns, comprehensive error handling, and maintainable code structure.
