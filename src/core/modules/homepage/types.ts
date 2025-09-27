// Homepage data types
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
  originalPrice?: number;
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
