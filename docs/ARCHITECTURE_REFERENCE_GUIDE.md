# Pragmatic Clean Architecture Reference Guide

## React TypeScript Implementation with Service-Oriented Design

### Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Clean Architecture Layers](#clean-architecture-layers)
4. [Dependency Injection System](#dependency-injection-system)
5. [Service Management](#service-management)
6. [Design Patterns Implementation](#design-patterns-implementation)
7. [Loose Coupling Strategies](#loose-coupling-strategies)
8. [Implementation Examples](#implementation-examples)
9. [Best Practices](#best-practices)
10. [Migration Guide](#migration-guide)

---

## Overview

This document provides a comprehensive reference for implementing **Pragmatic Clean Architecture** in React TypeScript applications. This approach combines **Service-Oriented Design**, **Command Pattern**, **Repository Pattern**, **Factory Patterns**, and **React Hook Integration** to create maintainable, scalable, and developer-friendly applications.

Unlike traditional Clean Architecture, this approach is specifically optimized for React development with a flatter structure that emphasizes practical patterns over strict layering.

### Key Principles Applied

- **Dependency Inversion Principle (DIP)**
- **Single Responsibility Principle (SRP)**
- **Open/Closed Principle (OCP)**
- **Interface Segregation Principle (ISP)**
- **Separation of Concerns**
- **Domain-Driven Design (DDD)**

### Architecture Benefits

- ✅ **Framework Independence** - Business logic independent of React
- ✅ **Maintainability** - Clear separation of responsibilities
- ✅ **Scalability** - Modular structure for easy feature addition
- ✅ **Type Safety** - Full TypeScript support throughout all layers
- ✅ **Developer Experience** - Consistent patterns and clear contracts

---

## Project Structure

### Directory Organization

```
src/
├── modules/                    # Feature modules (domain-specific)
│   ├── affordabilitySearch/   # Affordability search functionality
│   │   ├── commands/          # Command objects (DTOs)
│   │   ├── constant/          # Module constants
│   │   ├── infrastructure/    # External adapters & repositories
│   │   │   ├── implementations/
│   │   │   │   └── repositories/
│   │   │   └── interfaces/
│   │   │       ├── repositories/
│   │   │       └── services/
│   │   ├── mappers/          # Data transformation
│   │   ├── services/         # Domain services
│   │   ├── types/            # Domain types & enums
│   │   ├── useCases/         # Application business logic
│   │   └── utlis/           # Module utilities
│   ├── aiSearch/             # AI search functionality
│   │   ├── commands/
│   │   ├── infrastructure/
│   │   │   ├── implementations/
│   │   │   └── interfaces/
│   │   ├── services/
│   │   ├── types/
│   │   └── useCases/
│   ├── findAgent/            # Agent finding functionality
│   │   ├── commands/
│   │   ├── infrastructure/
│   │   │   ├── implementations/
│   │   │   ├── interfaces/
│   │   │   └── repositories/
│   │   ├── mappers/
│   │   ├── services/
│   │   ├── types/
│   │   ├── useCases/
│   │   └── utils/
│   ├── searchResult/         # Search results functionality
│   │   ├── commands/
│   │   ├── infrastructure/
│   │   │   └── repositories/
│   │   │       └── interfaces/
│   │   ├── mappers/
│   │   ├── services/
│   │   ├── shared/
│   │   ├── types/
│   │   └── useCases/
│   └── listingSr/            # Listing search results (legacy structure)
│       ├── core/             # Core business logic
│       │   ├── interfaces/   # Domain contracts
│       │   ├── services/     # Domain services
│       │   └── types/        # Domain entities
│       ├── infrastructure/   # Repository implementations
│       └── presentation/     # UI layer (hooks, state management)
└── shared/                   # Cross-cutting concerns
    ├── context/              # React contexts for DI
    ├── hooks/                # Shared React hooks
    ├── infrastructure/       # Shared external adapters
    ├── interfaces/           # Shared contracts
    ├── services/             # Shared business services
    ├── types/                # Shared types & enums
    └── utils/                # Utilities & DI container
```

### Actual Module Structure Template (Based on Your Project)

```
modules/[featureName]/
├── commands/                 # Input DTOs for use cases
│   └── [feature].command.ts
├── constant/                 # Module-specific constants (optional)
│   └── [feature].constant.ts
├── infrastructure/           # External world adapters
│   ├── implementations/      # Concrete implementations
│   │   └── repositories/
│   │       └── [feature].impl.ts
│   └── interfaces/          # Repository & service contracts
│       ├── repositories/
│       │   └── [feature].interface.ts
│       └── services/        # Analytics & other service interfaces
│           └── [feature]Analytics.interface.ts
├── mappers/                  # Data transformation
│   └── [feature].mapper.ts
├── services/                 # Domain & application services
│   ├── [feature].service.ts
│   └── analytics/           # Analytics services
│       └── [feature]Analytics.service.ts
├── types/                    # Module-specific types & enums
│   ├── [feature].types.ts
│   └── enum.ts
├── useCases/                 # Application business logic
│   ├── [useCase]/
│   │   ├── [useCase].usecase.ts    # Pure business logic
│   │   └── use[UseCase].ts         # React hook wrapper (optional)
│   └── [otherUseCases]/
└── utils/                    # Module utilities (optional)
    └── [feature]Helper.ts
```

---

## Architecture Patterns

### Key Architectural Characteristics

This architecture follows these specific patterns:

#### 1. **Flat Clean Architecture** (Not Traditional Layered)

- **No Core/Domain Layer**: Business logic is distributed across services and use cases
- **Direct Use Case → Repository Pattern**: Use cases directly consume repository implementations
- **Service-Oriented Architecture**: Heavy use of services for business logic and analytics

#### 2. **Command-Driven Use Cases**

```typescript
// Example from affordabilitySearch
export class StepProgressUseCase {
  constructor(
    private storageService: ILocalStorageService,
    private affordabilitySearchAnalyticsService: IAffordabilitySearchAnalytics
  ) {}

  execute(command: StepProgressCommand): StepProgressData | null {
    // Business logic implementation
  }
}
```

#### 3. **Factory Pattern for Handlers**

```typescript
// Example from findAgent
export class AgentAgencySrFactory {
  create(activeTab: EAgentAgencyTab) {
    switch (activeTab) {
      case EAgentAgencyTab.AGENT:
        return new AgentSearchHandler(this.findAgentSearchRepository);
      case EAgentAgencyTab.AGENCY:
        return new AgencySearchHandler(this.findAgentSearchRepository);
    }
  }
}
```

#### 4. **React Hook Integration**

- Use cases are wrapped in React hooks for UI integration
- Hooks handle loading states, error handling, and state management
- Direct instantiation of use cases within hooks (not DI container)

#### 5. **Analytics as First-Class Citizens**

- Every module has dedicated analytics services
- Analytics interfaces are separate from business logic interfaces
- Analytics tracking integrated into use cases

#### 6. **Mapper Pattern for Data Transformation**

- Dedicated mapper classes for transforming between DTOs and domain objects
- Mappers handle API request/response transformation

---

## Clean Architecture Layers

### Layer 1: Core/Domain Layer (Innermost)

**Purpose**: Contains business rules, entities, and domain services
**Dependencies**: None (pure business logic)

```typescript
// Example: Domain Entity
export interface IListing {
  id: string;
  title: string;
  price: number;
  location: ILocation;
  // Domain-specific properties
}

// Example: Domain Service Interface
export interface IListingService {
  calculatePrice(listing: IListing): number;
  validateListing(listing: IListing): boolean;
}
```

### Layer 2: Use Cases/Application Layer

**Purpose**: Contains application-specific business rules
**Dependencies**: Only Core/Domain layer

```typescript
// Example: Use Case
export class CreateListingUseCase {
  constructor(
    private listingRepository: IListingRepository,
    private notificationService: INotificationService,
    private analyticsService: IAnalyticsService
  ) {}

  async execute(command: CreateListingCommand): Promise<IListing> {
    // 1. Validate input
    this.validateCommand(command);

    // 2. Create domain entity
    const listing = this.createListingFromCommand(command);

    // 3. Save to repository
    const savedListing = await this.listingRepository.save(listing);

    // 4. Send notifications
    await this.notificationService.notify(savedListing);

    // 5. Track analytics
    this.analyticsService.track("listing_created", savedListing);

    return savedListing;
  }
}
```

### Layer 3: Infrastructure Layer

**Purpose**: Contains implementations of interfaces defined in inner layers
**Dependencies**: Core and Use Cases layers

```typescript
// Example: Repository Implementation
export class ListingRepositoryImpl implements IListingRepository {
  constructor(
    private httpClient: IHttpService,
    private config: IConfigService
  ) {}

  async save(listing: IListing): Promise<IListing> {
    const response = await this.httpClient.post<IListing>({
      path: this.config.getApiPaths().listings,
      body: listing,
    });
    return response.data;
  }

  async findById(id: string): Promise<IListing | null> {
    try {
      const response = await this.httpClient.get<IListing>({
        path: `${this.config.getApiPaths().listings}/${id}`,
      });
      return response.data;
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }
}
```

### Layer 4: Presentation Layer (Outermost)

**Purpose**: Contains UI components, React hooks, and state management
**Dependencies**: All inner layers through dependency injection

```typescript
// Example: React Hook
export const useCreateListing = () => {
  const { createListingUseCase } = useServices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListing = async (command: CreateListingCommand) => {
    setLoading(true);
    setError(null);

    try {
      const listing = await createListingUseCase.execute(command);
      return listing;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createListing, loading, error };
};
```

---

## Dependency Injection System

### Custom DI Container Implementation

```typescript
// src/shared/utils/diContainer.ts
class DIContainer {
  private instances = new Map<string, any>();
  private registrations = new Map<
    string,
    {
      constructor: new (...args: any[]) => any;
      args: any[];
    }
  >();

  /**
   * Register a service with its dependencies
   */
  register<T>(
    identifier: string,
    constructor: new (...args: any[]) => T,
    ...args: any[]
  ): void {
    this.registrations.set(identifier, { constructor, args });
  }

  /**
   * Get service instance (singleton pattern)
   */
  get<T>(identifier: string): T {
    // Return existing instance if available
    if (this.instances.has(identifier)) {
      return this.instances.get(identifier) as T;
    }

    // Create new instance
    const registration = this.registrations.get(identifier);
    if (!registration) {
      throw new Error(`Service '${identifier}' not registered.`);
    }

    const { constructor, args } = registration;

    // Resolve dependencies (supports factory functions)
    const resolvedArgs = args.map((arg) =>
      typeof arg === "function" ? arg(this) : arg
    );

    // Create and cache instance
    const instance = new constructor(...resolvedArgs);
    this.instances.set(identifier, instance);

    return instance;
  }

  /**
   * Check if service is registered
   */
  has(identifier: string): boolean {
    return this.registrations.has(identifier);
  }

  /**
   * Clear all instances (useful for development)
   */
  clear(): void {
    this.instances.clear();
  }
}

export const diContainer = new DIContainer();
```

### Service Registration Patterns

#### 1. Simple Service Registration

```typescript
// Register service with direct dependencies
diContainer.register(
  "HttpService",
  HttpServiceImpl,
  config.apiBaseUrl,
  config.timeout
);
```

#### 2. Factory Function Registration

```typescript
// Register service with factory function for complex dependencies
diContainer.register(
  "ListingService",
  ListingService,
  (container: DIContainer) =>
    container.get<IListingRepository>("ListingRepository"),
  (container: DIContainer) =>
    container.get<IAnalyticsService>("AnalyticsService")
);
```

#### 3. Interface-based Registration

```typescript
// Register implementation against interface
diContainer.register<IListingRepository>(
  "ListingRepository",
  ListingRepositoryImpl,
  (container: DIContainer) => container.get<IHttpService>("HttpService"),
  (container: DIContainer) => container.get<IConfigService>("ConfigService")
);
```

### Service Registration Setup

```typescript
// src/shared/utils/serviceRegistration.ts
export const registerServices = () => {
  // Infrastructure services
  diContainer.register("ConfigService", ConfigServiceImpl);
  diContainer.register("HttpService", HttpServiceImpl, (container) =>
    container.get("ConfigService")
  );
  diContainer.register("StorageService", LocalStorageServiceImpl);
  diContainer.register(
    "AnalyticsService",
    MatomoAnalyticsServiceImpl,
    (container) => container.get("ConfigService")
  );

  // Repositories
  diContainer.register(
    "ListingRepository",
    ListingRepositoryImpl,
    (container) => container.get("HttpService"),
    (container) => container.get("ConfigService")
  );

  // Domain services
  diContainer.register(
    "ListingService",
    ListingService,
    (container) => container.get("ListingRepository"),
    (container) => container.get("AnalyticsService")
  );

  // Use cases
  diContainer.register(
    "CreateListingUseCase",
    CreateListingUseCase,
    (container) => container.get("ListingRepository"),
    (container) => container.get("NotificationService"),
    (container) => container.get("AnalyticsService")
  );
};
```

---

## Service Management

### React Context Integration

#### 1. Service Context Definition

```typescript
// src/shared/interfaces/serviceContext.ts
export interface IServiceContext {
  // Domain services
  listingService: IListingService;
  userService: IUserService;

  // Use cases
  createListingUseCase: CreateListingUseCase;
  updateListingUseCase: UpdateListingUseCase;
  deleteListingUseCase: DeleteListingUseCase;

  // Infrastructure services
  analyticsService: IAnalyticsService;
  cacheService: ICacheService;
}
```

#### 2. Service Provider Implementation

```typescript
// src/shared/context/serviceContext.tsx
import React, { createContext, ReactNode } from "react";
import { diContainer } from "@shared/utils/diContainer";
import { IServiceContext } from "@shared/interfaces/serviceContext";

export const ServiceContext = createContext<IServiceContext | null>(null);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const services: IServiceContext = {
    // Domain services
    listingService: diContainer.get<IListingService>("ListingService"),
    userService: diContainer.get<IUserService>("UserService"),

    // Use cases
    createListingUseCase: diContainer.get<CreateListingUseCase>(
      "CreateListingUseCase"
    ),
    updateListingUseCase: diContainer.get<UpdateListingUseCase>(
      "UpdateListingUseCase"
    ),
    deleteListingUseCase: diContainer.get<DeleteListingUseCase>(
      "DeleteListingUseCase"
    ),

    // Infrastructure services
    analyticsService: diContainer.get<IAnalyticsService>("AnalyticsService"),
    cacheService: diContainer.get<ICacheService>("CacheService"),
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
```

#### 3. Service Hook

```typescript
// src/shared/hooks/useServices.ts
import { useContext } from "react";
import { ServiceContext } from "@shared/context/serviceContext";
import { IServiceContext } from "@shared/interfaces/serviceContext";

export const useServices = (): IServiceContext => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }

  return context;
};
```

### Multi-Context Architecture

#### Shared Services Context

```typescript
// src/shared/context/sharedServiceContext.tsx
export interface ISharedServiceContext {
  // Cross-cutting services
  httpService: IHttpService;
  storageService: IStorageService;
  configService: IConfigService;
  navigationService: INavigationService;
  toasterService: IToasterService;
  authService: IAuthService;
}

export const SharedServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const services: ISharedServiceContext = {
    httpService: diContainer.get<IHttpService>("HttpService"),
    storageService: diContainer.get<IStorageService>("StorageService"),
    configService: diContainer.get<IConfigService>("ConfigService"),
    navigationService: diContainer.get<INavigationService>("NavigationService"),
    toasterService: diContainer.get<IToasterService>("ToasterService"),
    authService: diContainer.get<IAuthService>("AuthService"),
  };

  return (
    <SharedContext.Provider value={services}>{children}</SharedContext.Provider>
  );
};
```

#### Application Setup

```typescript
// src/App.tsx
import { registerServices } from "@shared/utils/serviceRegistration";
import { ServiceProvider } from "@shared/context/serviceContext";
import { SharedServiceProvider } from "@shared/context/sharedServiceContext";

// Register all services on app startup
registerServices();

function App() {
  return (
    <SharedServiceProvider>
      <ServiceProvider>
        <Router>
          <Routes>{/* Your routes */}</Routes>
        </Router>
      </ServiceProvider>
    </SharedServiceProvider>
  );
}
```

---

## Design Patterns Implementation

### 1. Repository Pattern

#### Interface Definition

```typescript
// src/shared/interfaces/repository.ts
export interface IRepository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(criteria?: any): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
  exists(id: ID): Promise<boolean>;
}

// Domain-specific repository
export interface IListingRepository extends IRepository<IListing> {
  findByLocation(location: ILocation): Promise<IListing[]>;
  findByPriceRange(min: number, max: number): Promise<IListing[]>;
  findFeatured(): Promise<IListing[]>;
}
```

#### Implementation

```typescript
// src/modules/listing/infrastructure/listingRepositoryImpl.ts
export class ListingRepositoryImpl implements IListingRepository {
  constructor(
    private httpClient: IHttpService,
    private config: IConfigService,
    private mapper: IListingMapper
  ) {}

  async findById(id: string): Promise<IListing | null> {
    try {
      const response = await this.httpClient.get<any>({
        path: `${this.config.getApiPaths().listings}/${id}`,
      });
      return this.mapper.toDomain(response.data);
    } catch (error) {
      if (error.status === 404) return null;
      throw new Error(`Failed to fetch listing: ${error.message}`);
    }
  }

  async findByLocation(location: ILocation): Promise<IListing[]> {
    const response = await this.httpClient.post<any>({
      path: this.config.getApiPaths().listingsByLocation,
      body: { location },
    });
    return response.data.map((item) => this.mapper.toDomain(item));
  }

  async save(listing: IListing): Promise<IListing> {
    const dto = this.mapper.toDto(listing);
    const response = await this.httpClient.post<any>({
      path: this.config.getApiPaths().listings,
      body: dto,
    });
    return this.mapper.toDomain(response.data);
  }

  // ... other methods
}
```

### 2. Factory Pattern

#### Abstract Factory

```typescript
// src/shared/interfaces/factory.ts
export interface IServiceFactory<T> {
  create(...args: any[]): T;
}

// Concrete factory
export class ListingServiceFactory implements IServiceFactory<IListingHandler> {
  constructor(
    private analyticsService: IAnalyticsService,
    private repository: IListingRepository,
    private cacheService: ICacheService
  ) {}

  create(type: ListingType): IListingHandler {
    switch (type) {
      case ListingType.RESIDENTIAL:
        return new ResidentialListingHandler(
          this.analyticsService,
          this.repository,
          this.cacheService
        );
      case ListingType.COMMERCIAL:
        return new CommercialListingHandler(
          this.analyticsService,
          this.repository,
          this.cacheService
        );
      case ListingType.RENTAL:
        return new RentalListingHandler(
          this.analyticsService,
          this.repository,
          this.cacheService
        );
      default:
        throw new Error(`Unsupported listing type: ${type}`);
    }
  }
}
```

#### Strategy Factory

```typescript
// src/shared/services/strategyFactory.ts
export class AnalyticsStrategyFactory {
  constructor(private config: IConfigService) {}

  createAnalyticsStrategy(platform: AnalyticsPlatform): IAnalyticsStrategy {
    switch (platform) {
      case AnalyticsPlatform.GOOGLE_ANALYTICS:
        return new GoogleAnalyticsStrategy(this.config.getGAConfig());
      case AnalyticsPlatform.MATOMO:
        return new MatomoAnalyticsStrategy(this.config.getMatomoConfig());
      case AnalyticsPlatform.MIXPANEL:
        return new MixpanelAnalyticsStrategy(this.config.getMixpanelConfig());
      default:
        return new NullAnalyticsStrategy();
    }
  }
}
```

### 3. Command Pattern

#### Command Interface

```typescript
// src/shared/interfaces/command.ts
export interface ICommand<TResult = void> {
  execute(): Promise<TResult>;
}

export interface ICommandHandler<TCommand, TResult = void> {
  handle(command: TCommand): Promise<TResult>;
}
```

#### Command Implementation

```typescript
// src/modules/listing/commands/createListing.command.ts
export interface CreateListingCommand {
  title: string;
  description: string;
  price: number;
  location: ILocation;
  images: string[];
  features: string[];
}

export class CreateListingCommandHandler
  implements ICommandHandler<CreateListingCommand, IListing>
{
  constructor(
    private listingRepository: IListingRepository,
    private validationService: IValidationService,
    private analyticsService: IAnalyticsService,
    private notificationService: INotificationService
  ) {}

  async handle(command: CreateListingCommand): Promise<IListing> {
    // 1. Validate command
    await this.validationService.validate(command);

    // 2. Create domain entity
    const listing: IListing = {
      id: generateId(),
      ...command,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: ListingStatus.DRAFT,
    };

    // 3. Save to repository
    const savedListing = await this.listingRepository.save(listing);

    // 4. Send notifications
    await this.notificationService.notifyListingCreated(savedListing);

    // 5. Track analytics
    this.analyticsService.track("listing_created", {
      listingId: savedListing.id,
      price: savedListing.price,
      location: savedListing.location,
    });

    return savedListing;
  }
}
```

### 4. Observer Pattern

#### Event System

```typescript
// src/shared/interfaces/eventBus.ts
export interface IEventBus {
  subscribe<T>(eventType: string, handler: (event: T) => void): void;
  unsubscribe<T>(eventType: string, handler: (event: T) => void): void;
  publish<T>(eventType: string, event: T): void;
}

export class EventBus implements IEventBus {
  private handlers = new Map<string, Array<(event: any) => void>>();

  subscribe<T>(eventType: string, handler: (event: T) => void): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  unsubscribe<T>(eventType: string, handler: (event: T) => void): void {
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      const index = eventHandlers.indexOf(handler);
      if (index > -1) {
        eventHandlers.splice(index, 1);
      }
    }
  }

  publish<T>(eventType: string, event: T): void {
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(event));
    }
  }
}
```

#### Domain Events

```typescript
// src/modules/listing/events/listingEvents.ts
export interface ListingCreatedEvent {
  listingId: string;
  title: string;
  price: number;
  createdBy: string;
  createdAt: Date;
}

export interface ListingUpdatedEvent {
  listingId: string;
  changes: Partial<IListing>;
  updatedBy: string;
  updatedAt: Date;
}

// Event handlers
export class ListingEventHandlers {
  constructor(
    private analyticsService: IAnalyticsService,
    private notificationService: INotificationService,
    private cacheService: ICacheService
  ) {}

  onListingCreated = async (event: ListingCreatedEvent) => {
    // Track analytics
    this.analyticsService.track("listing_created", event);

    // Send notifications
    await this.notificationService.notifyNewListing(event);

    // Clear cache
    this.cacheService.invalidate("listings");
  };

  onListingUpdated = async (event: ListingUpdatedEvent) => {
    // Track analytics
    this.analyticsService.track("listing_updated", event);

    // Clear specific cache
    this.cacheService.invalidate(`listing_${event.listingId}`);
  };
}
```

### 5. Adapter Pattern

#### External Service Adapter

```typescript
// src/shared/interfaces/paymentService.ts
export interface IPaymentService {
  processPayment(
    amount: number,
    paymentMethod: PaymentMethod
  ): Promise<PaymentResult>;
  refundPayment(transactionId: string): Promise<RefundResult>;
}

// Stripe adapter
export class StripePaymentAdapter implements IPaymentService {
  constructor(private stripeClient: Stripe) {}

  async processPayment(
    amount: number,
    paymentMethod: PaymentMethod
  ): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create({
        amount: amount * 100, // Stripe uses cents
        currency: "usd",
        payment_method: paymentMethod.stripeId,
        confirm: true,
      });

      return {
        success: true,
        transactionId: paymentIntent.id,
        amount: amount,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// PayPal adapter
export class PayPalPaymentAdapter implements IPaymentService {
  constructor(private paypalClient: PayPalClient) {}

  async processPayment(
    amount: number,
    paymentMethod: PaymentMethod
  ): Promise<PaymentResult> {
    // PayPal-specific implementation
    // ...
  }
}
```

---

## Loose Coupling Strategies

### 1. Interface Segregation

#### Granular Interfaces

```typescript
// Instead of one large interface
interface IUserService {
  // Authentication
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;

  // Profile management
  getProfile(userId: string): Promise<UserProfile>;
  updateProfile(
    userId: string,
    profile: Partial<UserProfile>
  ): Promise<UserProfile>;

  // Preferences
  getPreferences(userId: string): Promise<UserPreferences>;
  updatePreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences>;
}

// Split into focused interfaces
interface IAuthenticationService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  validateToken(token: string): Promise<boolean>;
}

interface IUserProfileService {
  getProfile(userId: string): Promise<UserProfile>;
  updateProfile(
    userId: string,
    profile: Partial<UserProfile>
  ): Promise<UserProfile>;
  deleteProfile(userId: string): Promise<void>;
}

interface IUserPreferencesService {
  getPreferences(userId: string): Promise<UserPreferences>;
  updatePreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences>;
  resetPreferences(userId: string): Promise<UserPreferences>;
}
```

### 2. Dependency Inversion

#### High-level modules don't depend on low-level modules

```typescript
// ❌ Bad: Direct dependency on concrete implementation
class ListingService {
  private httpClient = new AxiosHttpClient(); // Direct dependency

  async getListings(): Promise<Listing[]> {
    return this.httpClient.get("/listings");
  }
}

// ✅ Good: Dependency on abstraction
class ListingService {
  constructor(private httpClient: IHttpService) {} // Depends on interface

  async getListings(): Promise<Listing[]> {
    return this.httpClient.get("/listings");
  }
}
```

### 3. Event-Driven Decoupling

#### Domain Events for Cross-Module Communication

```typescript
// src/shared/events/domainEvents.ts
export class DomainEvents {
  private static eventBus: IEventBus;

  static setEventBus(eventBus: IEventBus): void {
    this.eventBus = eventBus;
  }

  static publish<T>(eventType: string, event: T): void {
    this.eventBus.publish(eventType, event);
  }

  static subscribe<T>(eventType: string, handler: (event: T) => void): void {
    this.eventBus.subscribe(eventType, handler);
  }
}

// Usage in use case
export class CreateListingUseCase {
  async execute(command: CreateListingCommand): Promise<IListing> {
    const listing = await this.listingRepository.save(command);

    // Publish domain event instead of direct service calls
    DomainEvents.publish("listing.created", {
      listingId: listing.id,
      title: listing.title,
      createdAt: listing.createdAt,
    });

    return listing;
  }
}

// Event handlers in different modules
export class AnalyticsModule {
  constructor() {
    DomainEvents.subscribe("listing.created", this.handleListingCreated);
  }

  private handleListingCreated = (event: ListingCreatedEvent) => {
    this.analyticsService.track("listing_created", event);
  };
}
```

### 4. Configuration-Based Coupling

#### External Configuration for Dependencies

```typescript
// src/shared/config/serviceConfig.ts
export interface ServiceConfig {
  analytics: {
    provider: "google" | "matomo" | "mixpanel";
    config: any;
  };
  storage: {
    provider: "localStorage" | "sessionStorage" | "indexedDB";
    config: any;
  };
  http: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
}

// Service factory based on configuration
export class ServiceFactory {
  static createServices(config: ServiceConfig): void {
    // Register analytics service based on config
    const analyticsService = this.createAnalyticsService(config.analytics);
    diContainer.register("AnalyticsService", () => analyticsService);

    // Register storage service based on config
    const storageService = this.createStorageService(config.storage);
    diContainer.register("StorageService", () => storageService);
  }

  private static createAnalyticsService(config: any): IAnalyticsService {
    switch (config.provider) {
      case "google":
        return new GoogleAnalyticsService(config.config);
      case "matomo":
        return new MatomoAnalyticsService(config.config);
      default:
        return new NullAnalyticsService();
    }
  }
}
```

---

## Implementation Examples

#### 1. AffordabilitySearch Module

**Command Pattern:**

```typescript
// src/modules/affordabilitySearch/commands/affordabilitySearch.command.ts
export type StepProgressCommand = {
  data: Partial<StepProgressData>;
};

export type RetrieveSuburbsCommand = {
  selectedState: string;
  propertyFilters: PropertyFilters;
};
```

**Use Case Implementation:**

```typescript
// src/modules/affordabilitySearch/useCases/stepper/stepProgress.usecase.ts
export class StepProgressUseCase {
  private readonly STORAGE_KEY = "affordability-search-state";

  constructor(
    private storageService: ILocalStorageService,
    private affordabilitySearchAnalyticsService: IAffordabilitySearchAnalytics
  ) {}

  execute(command: StepProgressCommand): StepProgressData | null {
    try {
      const { data } = command;

      if (Object.keys(data).length === 0) {
        return this.getStoredData();
      }

      return this.updateStoredData(data);
    } catch (error) {
      console.error("Error in affordability search operation:", error);
      return null;
    }
  }

  private updateStoredData(
    newData: Partial<StepProgressData>
  ): StepProgressData {
    const currentData: StepProgressData =
      this.getStoredData() || getInitialStepperState();
    const updatedData = { ...currentData, ...newData };

    this.storageService.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    return updatedData;
  }
}
```

**Repository Implementation:**

```typescript
// src/modules/affordabilitySearch/infrastructure/implementations/repositories/affordabilitySearch.impl.ts
export class AffordabilitySearchRepositoryImpl
  implements AffordabilitySearchRepository
{
  constructor(
    private httpClient: IHttpService,
    private config: IConfigService
  ) {}

  async getSuburbsWithListingCount(
    command: RetrieveSuburbsCommand
  ): Promise<SuburbsWithListingCount> {
    try {
      const requestBody = RetrieveSuburbsMapper.toApiRequest(command);
      const response = await this.httpClient.post<any>({
        path: this.config.getApiPaths().affordabilitySearchSuburbs,
        body: requestBody,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
```

**React Hook Integration:**

```typescript
// src/modules/affordabilitySearch/useCases/stepper/useAffordabilityStepper.ts
export const useAffordabilityStepper = (queryParams?: string, url?: string) => {
  const { storageService, analyticsService, navigationService } =
    useSharedService();

  // Direct instantiation (not DI container)
  const affordabilitySearchAnalyticsService =
    new AffordabilitySearchAnalyticsService(analyticsService);
  const stepProgressUseCase = new StepProgressUseCase(
    storageService,
    affordabilitySearchAnalyticsService
  );

  const [stepper, setStepper] = useState<StepProgressData>(initialStepperState);

  const updateStepper = useCallback(
    <K extends keyof StepProgressData>(
      key: K,
      value:
        | StepProgressData[K]
        | ((prev: StepProgressData[K]) => StepProgressData[K])
    ) => {
      const newValue =
        typeof value === "function" ? value(stepper[key]) : value;
      const updatedData = stepProgressUseCase.execute({
        data: { [key]: newValue },
      });

      if (updatedData) {
        setStepper(updatedData);
      }
    },
    [stepper]
  );

  return {
    stepperDetails: stepper,
    updateStepper,
    executeNext,
    executeBack,
    // ... other methods
  };
};
```

#### 2. FindAgent Module

**Factory Pattern:**

```typescript
// src/modules/findAgent/services/agentAgencySrFactory.service.ts
export class AgentAgencySrFactory {
  constructor(private findAgentSearchRepository: FindAgentSearchRepository) {}

  create(activeTab: EAgentAgencyTab) {
    switch (activeTab) {
      case EAgentAgencyTab.AGENT:
        return new AgentSearchHandler(this.findAgentSearchRepository);
      case EAgentAgencyTab.AGENCY:
        return new AgencySearchHandler(this.findAgentSearchRepository);
      default:
        throw new Error("Invalid tab type");
    }
  }
}
```

**Handler Pattern:**

```typescript
// src/modules/findAgent/services/agentSearchHandler.service.ts
export class AgentSearchHandler {
  constructor(private findAgentSearchRepository: FindAgentSearchRepository) {}

  async handle(
    command: AgentAgencySearchCommand
  ): Promise<AgentSearchResultResponse> {
    try {
      const searchRequest = AgencyMapper.toAgentSearchRequest(command);
      const response = await this.findAgentSearchRepository.getAgentSearchData(
        searchRequest
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
```

**Use Case with Factory:**

```typescript
// src/modules/findAgent/useCases/search/agentAgencySearch.usecase.ts
export class AgentAgencySearchUseCase {
  constructor(
    private findAgentSearchRepository: FindAgentSearchRepository,
    private toasterService: IToasterService,
    private findAgentSearchAnalyticsService: FindAgentSearchAnalyticsService
  ) {}

  async execute(
    command: AgentAgencySearchCommand,
    matomoDetails?: TAgentSearchSelectionDimensions
  ): Promise<AgentSearchResultResponse | AgencySearchResultResponse> {
    try {
      // Factory pattern usage
      const handler = new AgentAgencySrFactory(
        this.findAgentSearchRepository
      ).create(command.activeTab);
      const response = await handler.handle(command);

      // Analytics integration
      matomoDetails &&
        this.findAgentSearchAnalyticsService.trackSearchSelection(
          matomoDetails
        );
      return response;
    } catch (error: any) {
      this.toasterService.customToaster(
        error.message || EToastMsg.somethingWrong,
        "error"
      );
      throw error;
    }
  }
}
```

#### 3. AISearch Module

**Simple Use Case Pattern:**

```typescript
// src/modules/aiSearch/useCases/search/searchResults.usecase.ts
export class SearchResultsUseCase {
  constructor(
    private aiSearchRepository: AISearchRepositoryImpl,
    private toasterService: IToasterService
  ) {}

  async execute(
    command: SearchResultsCommand
  ): Promise<TAiSearchResultsResponse> {
    try {
      const response = await this.aiSearchRepository.getAiSearchResults(
        command
      );
      return response;
    } catch (error: any) {
      this.toasterService.customToaster(
        error.message || EToastMsg.somethingWrong,
        "error"
      );
      throw error;
    }
  }
}
```

**Navigation Use Case:**

```typescript
// src/modules/aiSearch/useCases/search/search.usecase.ts
export class SearchUseCase {
  constructor(
    private readonly navigationService: INavigationService,
    private readonly aiSearchAnalyticsService: AiSearchAnalyticsService
  ) {}

  async execute(command: SearchResultsCommand): Promise<void> {
    try {
      const searchUrl = UrlService.AiSearchResultUrl.getUrlFromAiSearchData({
        queryString: command.content,
        saleMethod: command.saleMethod,
      });

      // Analytics tracking
      this.aiSearchAnalyticsService.trackAiSearch(
        {
          searchKeyword: command.content,
          listingType: [
            command.saleMethod === ESaleMethod.sale
              ? EListingPageType.buy
              : EListingPageType.rent,
          ],
        },
        command.url
      );

      searchUrl && this.navigationService.navigateTo(searchUrl);
    } catch (error) {
      throw error;
    }
  }
}
```

#### 4. SearchResult Module

**Complex Use Case with Multiple Dependencies:**

```typescript
// src/modules/searchResult/useCases/saveSearch/saveSearch.usecase.ts
export class SaveSearchUseCase {
  constructor(
    private subscriberService: SubscriberService,
    private toasterService: IToasterService,
    private srAnalyticsService: ISrAnalyticsService,
    private authorizedService: IAuthorization
  ) {}

  async execute(command: SaveSearchCommand) {
    const { appliedFilters, locationRecord, street, sendFrequency } = command;

    // Mapper pattern usage
    const apiBodyParams = SaveSearchMapper.toApiRequest(command);

    try {
      const response = await this.subscriberService.saveSearchListingSrPage(
        apiBodyParams
      );

      if (response.success) {
        this.toasterService.customToaster(
          "The search has been saved.",
          "success"
        );

        // Analytics integration
        this.srAnalyticsService.trackSaveSearchInteraction(
          appliedFilters,
          locationRecord,
          street,
          sendFrequency
        );
      }
      return response;
    } catch (error: any) {
      if (error.statusCode === 401) {
        return this.authorizedService.handle401Error(error.message);
      } else {
        return this.toasterService.customToaster(error.message, "error");
      }
    }
  }
}
```

**Service with Factory Pattern:**

```typescript
// src/modules/searchResult/services/locationChangeHandlerFactory.service.ts
export class LocationChangeHandlerFactory {
  constructor(
    private srAnalyticsService: SrAnalyticsService,
    private recentSearchService: RecentSearchService,
    private navigationService: INavigationService,
    private listingSrRepository: ListingSrRepository,
    private analyticsManagerService: AnalyticsManagerService,
    private recentlyViewService: RecentlyViewService
  ) {}

  create(groupId: ELocationGroupId) {
    switch (groupId) {
      case ELocationGroupId.PROJECT:
        return new ProjectChangeHandler(
          this.navigationService,
          this.srAnalyticsService
        );
      case ELocationGroupId.SCHOOL:
        return new SchoolCatchmentChangeHandler(
          this.listingSrRepository,
          this.srAnalyticsService,
          this.recentSearchService,
          this.analyticsManagerService,
          this.recentlyViewService
        );
      default:
        return new ListingChangeHandler(
          this.srAnalyticsService,
          this.listingSrRepository,
          this.recentSearchService,
          this.analyticsManagerService,
          this.recentlyViewService
        );
    }
  }
}
```

---

## Key Differences from Traditional Clean Architecture

### Your Project's Approach vs Traditional Clean Architecture

| Aspect                    | Traditional Clean Architecture                              | Your Project's Approach                                  |
| ------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| **Domain Layer**          | Separate core/domain layer with entities and business rules | Business logic distributed across use cases and services |
| **Dependency Injection**  | DI Container with service registration                      | Direct instantiation in React hooks with shared services |
| **Use Case Dependencies** | Injected through constructor                                | Mixed: some injected, some directly instantiated         |
| **Repository Pattern**    | Interface in domain, implementation in infrastructure       | Interface and implementation both in infrastructure      |
| **Service Registration**  | Centralized service registration                            | Per-module service instantiation                         |
| **React Integration**     | Service context providers                                   | Direct hook integration with shared services             |

### Why Your Approach Works

#### ✅ **Pragmatic Clean Architecture**

- **Simpler Structure**: Fewer layers, easier to understand
- **React-First**: Designed specifically for React applications
- **Module Independence**: Each module is self-contained

#### ✅ **Service-Oriented Design**

- **Analytics Integration**: First-class analytics support
- **Shared Services**: Common services available across modules
- **Factory Patterns**: Flexible service creation

#### ✅ **Command-Driven Architecture**

- **Clear Contracts**: Commands define clear input/output contracts
- **Type Safety**: Full TypeScript support
- **Predictable Flow**: Consistent execution patterns across modules

### Best Practices for Your Architecture

#### 1. **Use Case Design**

```typescript
// ✅ Good: Clear command interface
export class RetrieveStatesUseCase {
  constructor(
    private affordabilitySearchRepository: AffordabilitySearchRepository,
    private toasterService: IToasterService
  ) {}

  async execute(command: RetrieveStatesCommand): Promise<StateOptions[]> {
    // Implementation with error handling
  }
}

// ❌ Avoid: Unclear parameters
export class RetrieveStatesUseCase {
  async execute(state: string, filters: any): Promise<any> {
    // Unclear contract
  }
}
```

#### 2. **Repository Interface Design**

```typescript
// ✅ Good: Focused interface
export interface AffordabilitySearchRepository {
  getStatesOptions: (command: RetrieveStatesCommand) => Promise<StateOptions[]>;
  getSuburbsWithListingCount: (
    command: RetrieveSuburbsCommand
  ) => Promise<SuburbsWithListingCount>;
}

// ❌ Avoid: Generic repository
export interface GenericRepository<T> {
  get(id: string): Promise<T>;
  save(entity: T): Promise<T>;
}
```

#### 3. **React Hook Integration**

```typescript
// ✅ Good: Hook with use case
export const useAffordabilityStepper = () => {
  const { storageService, analyticsService } = useSharedService();

  // Direct instantiation is fine for your architecture
  const stepProgressUseCase = new StepProgressUseCase(
    storageService,
    analyticsService
  );

  const updateStepper = useCallback((command: StepProgressCommand) => {
    return stepProgressUseCase.execute(command);
  }, []);

  return { updateStepper };
};

// ❌ Avoid: Business logic in hooks
export const useAffordabilityStepper = () => {
  const updateStepper = useCallback((data: any) => {
    // Business logic directly in hook
    const stored = localStorage.getItem("key");
    // ... complex logic
  }, []);
};
```

#### 4. **Analytics Integration**

```typescript
// ✅ Good: Analytics as dependency
export class SearchUseCase {
  constructor(
    private navigationService: INavigationService,
    private analyticsService: AiSearchAnalyticsService // Dedicated analytics service
  ) {}

  async execute(command: SearchCommand): Promise<void> {
    // Business logic
    this.navigationService.navigateTo(url);

    // Analytics tracking
    this.analyticsService.trackSearch(command.searchTerm);
  }
}
```

#### 5. **Error Handling**

```typescript
// ✅ Good: Consistent error handling
export class SaveSearchUseCase {
  async execute(command: SaveSearchCommand) {
    try {
      const response = await this.service.save(command);
      this.toasterService.success("Search saved");
      return response;
    } catch (error: any) {
      if (error.statusCode === 401) {
        return this.authService.handle401Error(error.message);
      }
      this.toasterService.error(error.message);
      throw error;
    }
  }
}
```

---

## Best Practices

### 1. Service Design Principles

#### Single Responsibility

```typescript
// ❌ Bad: Service doing too many things
class ListingService {
  async createListing(data: any) {
    /* ... */
  }
  async sendEmail(to: string, subject: string) {
    /* ... */
  }
  async processPayment(amount: number) {
    /* ... */
  }
  async generateReport() {
    /* ... */
  }
}

// ✅ Good: Focused services
class ListingService {
  async createListing(data: CreateListingCommand): Promise<IListing> {
    /* ... */
  }
  async updateListing(
    id: string,
    data: UpdateListingCommand
  ): Promise<IListing> {
    /* ... */
  }
  async deleteListing(id: string): Promise<void> {
    /* ... */
  }
}

class EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    /* ... */
  }
}

class PaymentService {
  async processPayment(
    amount: number,
    method: PaymentMethod
  ): Promise<PaymentResult> {
    /* ... */
  }
}
```

#### Interface Segregation

```typescript
// ❌ Bad: Fat interface
interface IUserService {
  // Authentication
  login(credentials: any): Promise<User>;
  logout(): Promise<void>;

  // Profile
  getProfile(id: string): Promise<UserProfile>;
  updateProfile(id: string, data: any): Promise<UserProfile>;

  // Billing
  getBillingInfo(id: string): Promise<BillingInfo>;
  updateBillingInfo(id: string, data: any): Promise<BillingInfo>;

  // Analytics
  trackUserAction(action: string): void;
}

// ✅ Good: Segregated interfaces
interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
}

interface IUserProfileService {
  getProfile(id: string): Promise<UserProfile>;
  updateProfile(id: string, data: UpdateProfileCommand): Promise<UserProfile>;
}

interface IBillingService {
  getBillingInfo(userId: string): Promise<BillingInfo>;
  updateBillingInfo(
    userId: string,
    data: UpdateBillingCommand
  ): Promise<BillingInfo>;
}
```

### 2. Error Handling Strategy

#### Domain-Specific Errors

```typescript
// src/shared/errors/domainErrors.ts
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
}

export class ValidationError extends DomainError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 400;

  constructor(public readonly errors: string[]) {
    super(`Validation failed: ${errors.join(", ")}`);
  }
}

export class NotFoundError extends DomainError {
  readonly code = "NOT_FOUND";
  readonly statusCode = 404;

  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
  }
}

export class UnauthorizedError extends DomainError {
  readonly code = "UNAUTHORIZED";
  readonly statusCode = 401;

  constructor(message = "Unauthorized access") {
    super(message);
  }
}
```

#### Error Handling in Use Cases

```typescript
export class CreateListingUseCase {
  async execute(command: CreateListingCommand): Promise<IListing> {
    try {
      // Validation
      const validation = this.listingDomainService.validateListing(command);
      if (!validation.isValid) {
        throw new ValidationError(validation.errors);
      }

      // Business logic
      const listing = await this.listingRepository.save(command);
      return listing;
    } catch (error) {
      // Log error
      this.logger.error("Failed to create listing", { error, command });

      // Re-throw domain errors
      if (error instanceof DomainError) {
        throw error;
      }

      // Wrap unknown errors
      throw new Error(`Failed to create listing: ${error.message}`);
    }
  }
}
```

### 3. Performance Considerations

#### Caching Strategy

```typescript
// src/shared/services/cacheService.ts
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class RedisCacheService implements ICacheService {
  constructor(private redisClient: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl = 3600): Promise<void> {
    await this.redisClient.setex(key, ttl, JSON.stringify(value));
  }
}

// Usage in repository
export class CachedListingRepository implements IListingRepository {
  constructor(
    private baseRepository: IListingRepository,
    private cacheService: ICacheService
  ) {}

  async findById(id: string): Promise<IListing | null> {
    const cacheKey = `listing:${id}`;

    // Try cache first
    const cached = await this.cacheService.get<IListing>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fallback to base repository
    const listing = await this.baseRepository.findById(id);
    if (listing) {
      await this.cacheService.set(cacheKey, listing, 1800); // 30 minutes
    }

    return listing;
  }
}
```

#### Lazy Loading

```typescript
// Lazy service registration
diContainer.register(
  "ExpensiveService",
  ExpensiveService,
  // Only create when actually needed
  (container) => container.get("Dependency1"),
  (container) => container.get("Dependency2")
);

// Lazy component loading
const LazyListingForm = React.lazy(() => import("./components/ListingForm"));

export const ListingPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyListingForm />
    </Suspense>
  );
};
```

---

## Migration Guide

### From Existing Architecture

#### 1. Gradual Migration Strategy

**Phase 1: Setup Infrastructure**

```typescript
// 1. Install DI container
// 2. Create service interfaces
// 3. Setup service contexts
// 4. Register existing services
```

**Phase 2: Extract Use Cases**

```typescript
// 1. Identify business logic in components
// 2. Extract to use case classes
// 3. Create React hook wrappers
// 4. Update components to use hooks
```

**Phase 3: Implement Repository Pattern**

```typescript
// 1. Create repository interfaces
// 2. Extract data access logic
// 3. Implement repository classes
// 4. Update services to use repositories
```

**Phase 4: Add Domain Services**

```typescript
// 1. Extract business rules
// 2. Create domain service classes
// 3. Update use cases to use domain services
```

#### 2. Migration Checklist

- [ ] Setup DI container
- [ ] Create service interfaces
- [ ] Setup service contexts
- [ ] Extract use cases from components
- [ ] Implement repository pattern
- [ ] Add domain services
- [ ] Update error handling
- [ ] Update documentation

#### 3. Common Pitfalls

**Avoid These Mistakes:**

```typescript
// ❌ Don't put business logic in components
const ListingComponent = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Business logic in component
    fetch("/api/listings")
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter((listing) => listing.price > 100000);
        const sorted = filtered.sort((a, b) => b.price - a.price);
        setListings(sorted);
      });
  }, []);
};

// ✅ Extract to use case
const useListings = () => {
  const { getListingsUseCase } = useServices();
  // Use case handles business logic
};
```

**Don't Skip Interfaces:**

```typescript
// ❌ Direct dependency on implementation
class ListingService {
  constructor(private httpClient: AxiosHttpClient) {}
}

// ✅ Depend on interface
class ListingService {
  constructor(private httpClient: IHttpService) {}
}
```

---

## Conclusion

This architecture implements a **Pragmatic Clean Architecture** that balances architectural principles with practical React development needs:

### Architecture Strengths

1. **🏗️ Modular Structure**: Each module is self-contained with clear boundaries
2. **🎯 Command-Driven Design**: Clear contracts through command objects and use case interfaces
3. **🔧 Service-Oriented**: Effective use of services for business logic, analytics, and external integrations
4. **⚡ React-Optimized**: Direct hook integration with use cases for optimal React performance
5. **📊 Analytics-First**: Built-in analytics tracking as a core architectural concern
6. **🏭 Factory Patterns**: Flexible service creation and handler selection
7. **🗂️ Repository Pattern**: Clean data access abstraction with proper interfaces

### Key Architectural Patterns Used

- **Flat Clean Architecture**: Simplified layers without traditional domain/core separation
- **Command Pattern**: Structured input/output contracts for use cases
- **Factory Pattern**: Dynamic service and handler creation
- **Repository Pattern**: Data access abstraction
- **Mapper Pattern**: Clean data transformation between layers
- **Service Pattern**: Encapsulated business logic and external service integration

### Your Architecture Benefits

✅ **Maintainable**: Clear module boundaries and consistent patterns
✅ **Scalable**: Modular structure supports feature growth
✅ **Type-Safe**: Full TypeScript support throughout
✅ **React-Optimized**: Designed for React development patterns
✅ **Analytics-Ready**: Built-in tracking and monitoring capabilities
✅ **Developer-Friendly**: Consistent patterns and clear contracts

### Key Takeaways

1. **🎯 Use Command-Driven Use Cases**: Command pattern provides excellent contracts
2. **🏭 Leverage Factory Patterns**: Great for handling different service strategies
3. **📊 Integrate Analytics**: Analytics-first approach adds valuable insights
4. **🔧 Use Shared Services**: Shared service pattern works well for cross-cutting concerns
5. **🗂️ Keep Repository Interfaces Focused**: Domain-specific repositories are more maintainable
6. **⚡ Embrace Direct Hook Integration**: React hook pattern is practical and performant
7. **🏗️ Maintain Module Independence**: Keep modules self-contained for better maintainability

### Migration Guidance for New Modules

When creating new modules, follow the established patterns:

```
modules/[newModule]/
├── commands/           # Command objects
├── infrastructure/     # Repository implementations & interfaces
├── services/          # Business services & analytics
├── types/            # Types & enums
├── useCases/         # Use case classes with React hooks
└── mappers/          # Data transformation
```

This architecture reference provides a comprehensive guide for building maintainable, scalable React applications using proven patterns that balance architectural principles with practical development needs.
