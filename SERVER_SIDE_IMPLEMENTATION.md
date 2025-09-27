# Server-Side HTTP Service Implementation

This document explains the server-side implementation using the HTTP services for the e-commerce homepage.

## Implementation Overview

The homepage now uses **server-side data fetching** with `getServerSideProps` to load data at request time, providing better SEO and initial page load performance.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser       │    │   Next.js        │    │   Backend API   │
│                 │    │                  │    │                 │
│ 1. Request Page │───▶│ 2. getServerSide │───▶│ 3. HTTP Service │
│                 │    │    Props         │    │    Calls        │
│                 │    │                  │    │                 │
│ 6. Render Page  │◀───│ 5. Return Props  │◀───│ 4. API Response │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Key Files Modified

### 1. `/src/pages/index.tsx`

- Added `getServerSideProps` for server-side data fetching
- Uses `getServerHttpService()` to fetch data from backend APIs
- Implements parallel data fetching for better performance
- Includes comprehensive error handling with fallback data

```typescript
export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context
) => {
  const httpService = getServerHttpService({
    "X-Server-Request": "true",
    "X-Request-ID": `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    "User-Agent": context.req.headers["user-agent"] || "ECommerce-Server/1.0.0",
  });

  // Parallel data fetching
  const [categoriesResponse, productsResponse, statsResponse] =
    await Promise.allSettled([
      httpService.get({
        path: "/categories",
        queryParams: { limit: 8, featured: true },
      }),
      httpService.get({
        path: "/products",
        queryParams: { featured: true, limit: 8, inStock: true },
      }),
      httpService.get({ path: "/stats/platform" }),
    ]);

  // Handle responses and fallbacks...
};
```

### 2. `/src/components/templates/home-page.tsx`

- Updated to accept server-fetched data as props
- Added client-side HTTP service usage for interactive features
- Implements real API calls for cart operations and newsletter subscription

```typescript
const HomePage = (props: IHomePageProps) => {
  const { categories, featuredProducts, stats } = props;

  const handleAddToCart = async (productId: string) => {
    const httpService = getClientHttpService();
    await httpService.post({
      path: "/cart/add",
      body: { productId, quantity: 1 },
    });
  };
};
```

### 3. `/src/core/modules/homepage/types.ts`

- Defined TypeScript interfaces for homepage data
- Ensures type safety across server and client components

## API Endpoints Expected

The implementation expects the following backend API endpoints:

### Server-Side (getServerSideProps)

```
GET /api/categories?limit=8&featured=true
GET /api/products?featured=true&limit=8&inStock=true
GET /api/stats/platform
```

### Client-Side (Interactive Features)

```
POST /api/cart/add
POST /api/newsletter/subscribe
```

## Example API Routes

I've also created example Next.js API routes to demonstrate the pattern:

### `/src/pages/api/products/featured.ts`

- Demonstrates server-side HTTP service usage in API routes
- Includes proper error handling and response formatting
- Shows how to pass request context to HTTP service

### `/src/pages/api/cart/add.ts`

- Shows cart operations using server-side HTTP service
- Includes product validation and stock checking
- Demonstrates authentication handling

## Features Implemented

### ✅ Server-Side Data Fetching

- **Parallel API calls** for better performance
- **Comprehensive error handling** with fallback data
- **Request context passing** (User-Agent, Request ID, etc.)
- **Type-safe data** with TypeScript interfaces

### ✅ Client-Side Interactions

- **Add to cart** functionality using client HTTP service
- **Newsletter subscription** with proper error handling
- **Search navigation** with query parameter encoding
- **Real-time cart updates** in UI

### ✅ Error Resilience

- **Graceful fallbacks** when API calls fail
- **Structured error logging** for debugging
- **User-friendly error messages**
- **Fallback to mock data** for development

## Environment Setup

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_API_RETRIES=3
NEXT_PUBLIC_ENABLE_LOGGING=true
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Benefits of This Approach

### 🚀 **Performance**

- **Server-side rendering** with real data
- **Parallel API calls** reduce loading time
- **Cached responses** at CDN level

### 🔍 **SEO Optimization**

- **Pre-rendered content** with actual data
- **Meta tags** populated with real information
- **Search engine friendly** URLs and content

### 🛡️ **Reliability**

- **Fallback mechanisms** ensure page always loads
- **Error boundaries** prevent crashes
- **Graceful degradation** when APIs are down

### 🔧 **Developer Experience**

- **Type safety** throughout the application
- **Consistent error handling** patterns
- **Easy to test** with mock HTTP services
- **Clear separation** of server/client concerns

## Usage Examples

### Server-Side Data Fetching

```typescript
// In getServerSideProps
const httpService = getServerHttpService();
const data = await httpService.get({ path: "/api/data" });
```

### Client-Side Interactions

```typescript
// In React components
const httpService = getClientHttpService();
await httpService.post({ path: "/api/action", body: data });
```

### API Routes

```typescript
// In Next.js API routes
const httpService = getServerHttpService();
const result = await httpService.get({ path: "/external-api" });
```

This implementation provides a robust, scalable foundation for server-side data fetching while maintaining excellent developer experience and type safety.
