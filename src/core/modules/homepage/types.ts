// API Response Types (matching backend)
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

// Backend DTO Types
export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  level: number;
  sortOrder: number;
}

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: string; // Decimal as string
  comparePrice: string | null; // Decimal as string
  primaryImage: string | null;
  averageRating: string; // Decimal as string
  reviewCount: number;
  hasDiscount: boolean;
  discountPercentage: number;
  isAvailable: boolean;
}

export interface HomepageData {
  categories: CategoryDto[];
  featuredProducts: ProductDto[];
}

// Frontend UI Types (transformed from backend)
export interface ICategory {
  id: string;
  name: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  seller: string;
  inStock: boolean;
}

export interface IHomePageData {
  categories: ICategory[];
  featuredProducts: IProduct[];
  stats?: {
    totalProducts: number;
    totalSuppliers: number;
    totalCountries: number;
  };
}

export interface IHomePageProps {
  className?: string;
  categories: ICategory[];
  featuredProducts: IProduct[];
  stats?: {
    totalProducts: number;
    totalSuppliers: number;
    totalCountries: number;
  };
}
