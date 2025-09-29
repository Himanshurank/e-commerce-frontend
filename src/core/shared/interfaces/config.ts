export interface IConfigService {
  getAppConfig(): IAppConfig;
  getApiPaths(): IApiPaths;
  getEnvironment(): string;
  isDevelopment(): boolean;
  isProduction(): boolean;
  getFeatureFlags(): IFeatureFlags;
  getThirdPartyConfig(): IThirdPartyConfig;
  getApiUrl(path: string, isInternal?: boolean): string;
  validateConfig(): void;
}

export interface IAppConfig {
  lancerAPI: string;
  internalLancerAPI: string;

  database: {
    host: string;
    port: number;
    name: string;
  };

  app: {
    name: string;
    version: string;
    domain: string;
    port: number;
  };

  security: {
    apiKey: string;
    jwtSecret: string;
    corsOrigins: string[];
  };

  cache: {
    redis: {
      host: string;
      port: number;
      ttl: number;
    };
  };
}

export interface IApiPaths {
  auth: string;
  homepage: string;
}

export interface IFeatureFlags {
  enableNewUI: boolean;
  enableAdvancedSearch: boolean;
  enableRealTimeUpdates: boolean;
  enableAnalytics: boolean;
  enableReviews: boolean;
  enableWishlist: boolean;
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
