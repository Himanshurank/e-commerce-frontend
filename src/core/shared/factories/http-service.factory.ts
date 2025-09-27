import { IHttpService } from "@/core/shared/interfaces/http.interface";
import { IConfigService } from "@/core/shared/interfaces/config.interface";
import { ClientHttpService } from "@/core/shared/services/client-http.service";
import { ServerHttpService } from "@/core/shared/services/server-http.service";
import { ConfigService } from "@/core/shared/services/config.service";

/**
 * HTTP Service Factory following the reference guide
 * Creates appropriate HTTP service based on environment (client vs server)
 */
export class HttpServiceFactory {
  private static configService: IConfigService;
  private static clientHttpService: IHttpService;
  private static serverHttpService: IHttpService;

  /**
   * Get HTTP service based on current environment
   * Automatically detects client vs server-side and returns appropriate service
   */
  static getHttpService(headers?: Record<string, string>): IHttpService {
    if (typeof window !== "undefined") {
      // Client-side
      return this.getClientHttpService(headers);
    } else {
      // Server-side
      return this.getServerHttpService(headers);
    }
  }

  /**
   * Get client-side HTTP service (singleton)
   */
  static getClientHttpService(headers?: Record<string, string>): IHttpService {
    if (!this.clientHttpService) {
      const configService = this.getConfigService();
      this.clientHttpService = new ClientHttpService(configService, headers);
    }
    return this.clientHttpService;
  }

  /**
   * Get server-side HTTP service (singleton)
   */
  static getServerHttpService(headers?: Record<string, string>): IHttpService {
    if (!this.serverHttpService) {
      const configService = this.getConfigService();
      this.serverHttpService = new ServerHttpService(configService, headers);
    }
    return this.serverHttpService;
  }

  /**
   * Create new client-side HTTP service instance (non-singleton)
   */
  static createClientHttpService(
    headers?: Record<string, string>
  ): IHttpService {
    const configService = this.getConfigService();
    return new ClientHttpService(configService, headers);
  }

  /**
   * Create new server-side HTTP service instance (non-singleton)
   */
  static createServerHttpService(
    headers?: Record<string, string>
  ): IHttpService {
    const configService = this.getConfigService();
    return new ServerHttpService(configService, headers);
  }

  /**
   * Get config service (singleton)
   */
  static getConfigService(): IConfigService {
    if (!this.configService) {
      this.configService = new ConfigService();
    }
    return this.configService;
  }

  /**
   * Create HTTP service with custom configuration
   */
  static createWithConfig(
    config: IConfigService,
    isServerSide: boolean = typeof window === "undefined",
    headers?: Record<string, string>
  ): IHttpService {
    if (isServerSide) {
      return new ServerHttpService(config, headers);
    } else {
      return new ClientHttpService(config, headers);
    }
  }

  /**
   * Create HTTP service with authentication token
   */
  static createWithAuth(
    token: string,
    tokenType: "Bearer" | "Basic" = "Bearer",
    isServerSide: boolean = typeof window === "undefined"
  ): IHttpService {
    const headers = {
      Authorization: `${tokenType} ${token}`,
    };

    return this.createWithConfig(
      this.getConfigService(),
      isServerSide,
      headers
    );
  }

  /**
   * Create HTTP service for external API
   */
  static createForExternalApi(
    baseUrl: string,
    headers?: Record<string, string>,
    isServerSide: boolean = typeof window === "undefined"
  ): IHttpService {
    // Create a custom config service for external API
    const configService = new (class implements IConfigService {
      getAppConfig() {
        return {
          apiBaseUrl: baseUrl,
          timeout: 10000,
          retries: 3,
          enableLogging: process.env.NODE_ENV === "development",
          environment: (process.env.NODE_ENV as any) || "development",
          version: "1.0.0",
        };
      }

      getApiPaths() {
        return {}; // External APIs typically don't use our path structure
      }

      getFullApiUrl(path: string): string {
        const cleanBaseUrl = baseUrl.replace(/\/$/, "");
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${cleanBaseUrl}${cleanPath}`;
      }

      replacePathParams(path: string, params: Record<string, string>): string {
        let result = path;
        Object.entries(params).forEach(([key, value]) => {
          result = result.replace(`:${key}`, value);
        });
        return result;
      }
    })();

    return this.createWithConfig(configService, isServerSide, headers);
  }

  /**
   * Clear singleton instances (useful for testing)
   */
  static clearInstances(): void {
    this.configService = undefined as any;
    this.clientHttpService = undefined as any;
    this.serverHttpService = undefined as any;
  }
}

/**
 * Convenience functions for common use cases
 */

/**
 * Get HTTP service for current environment
 */
export const getHttpService = (
  headers?: Record<string, string>
): IHttpService => {
  return HttpServiceFactory.getHttpService(headers);
};

/**
 * Get client-side HTTP service
 */
export const getClientHttpService = (
  headers?: Record<string, string>
): IHttpService => {
  return HttpServiceFactory.getClientHttpService(headers);
};

/**
 * Get server-side HTTP service
 */
export const getServerHttpService = (
  headers?: Record<string, string>
): IHttpService => {
  return HttpServiceFactory.getServerHttpService(headers);
};

/**
 * Get HTTP service with authentication
 */
export const getAuthenticatedHttpService = (
  token: string,
  tokenType: "Bearer" | "Basic" = "Bearer"
): IHttpService => {
  return HttpServiceFactory.createWithAuth(token, tokenType);
};

/**
 * Get HTTP service for external API
 */
export const getExternalApiHttpService = (
  baseUrl: string,
  headers?: Record<string, string>
): IHttpService => {
  return HttpServiceFactory.createForExternalApi(baseUrl, headers);
};
