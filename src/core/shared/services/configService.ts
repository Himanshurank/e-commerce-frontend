import {
  IConfigService,
  IAppConfig,
  IApiPaths,
  IFeatureFlags,
  IThirdPartyConfig,
} from "../interfaces/config";

/**
 * Simple configuration service implementation
 * Can be used directly without factory pattern
 */
export class ConfigService implements IConfigService {
  private config: IAppConfig | null = null;

  constructor() {
    this.loadConfiguration();
  }

  private loadConfiguration(): void {
    this.config = {
      // API Configuration
      lancerAPI: this.getEnvVar(
        "NEXT_PUBLIC_API_BASE_URL",
        "https://e-commerce-backend-4na4.onrender.com/api"
      ),
      internalLancerAPI: this.getEnvVar(
        "NEXT_PUBLIC_API_BASE_URL",
        "https://e-commerce-backend-4na4.onrender.com/api"
      ),

      // Database Configuration
      database: {
        host: this.getEnvVar("DB_HOST", "localhost"),
        port: parseInt(this.getEnvVar("DB_PORT", "5432")),
        name: this.getEnvVar("DB_NAME", "ecommerce"),
      },

      // Application Configuration
      app: {
        name: this.getEnvVar("APP_NAME", "E-Commerce Platform"),
        version: this.getEnvVar("NEXT_PUBLIC_APP_VERSION", "1.0.0"),
        domain: this.getEnvVar("APP_DOMAIN", "localhost:3000"),
        port: parseInt(this.getEnvVar("PORT", "3000")),
      },

      // Security Configuration
      security: {
        apiKey: this.getEnvVar("API_KEY", ""),
        jwtSecret: this.getEnvVar("JWT_SECRET", "default-secret"),
        corsOrigins: this.getEnvVar(
          "CORS_ORIGINS",
          "http://localhost:3000"
        ).split(","),
      },

      // Cache Configuration
      cache: {
        redis: {
          host: this.getEnvVar("REDIS_HOST", "localhost"),
          port: parseInt(this.getEnvVar("REDIS_PORT", "6379")),
          ttl: parseInt(this.getEnvVar("CACHE_TTL", "300")), // 5 minutes
        },
      },
    };
  }

  private getEnvVar(key: string, defaultValue: string = ""): string {
    if (typeof window !== "undefined") {
      // Client-side: only access NEXT_PUBLIC_ variables
      return process.env[key] || defaultValue;
    }
    // Server-side: access all environment variables
    return process.env[key] || defaultValue;
  }

  getAppConfig(): IAppConfig {
    if (!this.config) {
      throw new Error("Configuration not loaded");
    }
    return this.config;
  }

  getApiPaths(): IApiPaths {
    return {
      signup: "auth/signup",
      signin: "auth/signin",
      profile: "auth/profile",
      logout: "auth/logout",
      homepage: "homepage",
    };
  }

  getEnvironment(): string {
    return this.getEnvVar("NODE_ENV", "development");
  }

  isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  isProduction(): boolean {
    return this.getEnvironment() === "production";
  }

  getFeatureFlags(): IFeatureFlags {
    return {
      enableNewUI: this.getEnvVar("FEATURE_NEW_UI", "false") === "true",
      enableAdvancedSearch:
        this.getEnvVar("FEATURE_ADVANCED_SEARCH", "false") === "true",
      enableRealTimeUpdates:
        this.getEnvVar("FEATURE_REALTIME", "false") === "true",
      enableAnalytics: this.getEnvVar("FEATURE_ANALYTICS", "true") === "true",
      enableReviews:
        this.getEnvVar("NEXT_PUBLIC_ENABLE_REVIEWS", "true") === "true",
      enableWishlist:
        this.getEnvVar("NEXT_PUBLIC_ENABLE_WISHLIST", "true") === "true",
    };
  }

  getThirdPartyConfig(): IThirdPartyConfig {
    return {
      google: {
        mapsApiKey: this.getEnvVar("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", ""),
        analyticsId: this.getEnvVar("NEXT_PUBLIC_GA_ID", ""),
      },
      stripe: {
        publishableKey: this.getEnvVar(
          "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
          ""
        ),
        webhookSecret: this.getEnvVar("STRIPE_WEBHOOK_SECRET", ""),
      },
      sentry: {
        dsn: this.getEnvVar("NEXT_PUBLIC_SENTRY_DSN", ""),
        environment: this.getEnvironment(),
      },
    };
  }

  // Utility method to get API URL with path
  getApiUrl(path: string, isInternal: boolean = false): string {
    const baseUrl = isInternal
      ? this.config?.internalLancerAPI
      : this.config?.lancerAPI;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${baseUrl}/${cleanPath}`;
  }

  // Method to validate required configuration
  validateConfig(): void {
    const requiredVars = ["API_KEY", "JWT_SECRET"];

    const missing = requiredVars.filter((key) => !this.getEnvVar(key));

    if (missing.length > 0) {
      console.warn(`Missing environment variables: ${missing.join(", ")}`);
      // Don't throw in development to allow for missing optional config
      if (this.isProduction()) {
        throw new Error(
          `Missing required environment variables: ${missing.join(", ")}`
        );
      }
    }
  }
}
