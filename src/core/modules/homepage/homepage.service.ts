import { IHttpService } from "@/core/shared/interfaces/httpService";
import { ApiResponse, HomepageData, CategoryDto, ProductDto } from "./types";

/**
 * Homepage service for handling homepage-related API calls
 */
export class HomepageService {
  constructor(private readonly httpService: IHttpService) {}

  /**
   * Fetch homepage data from backend API
   * @returns Promise<HomepageData>
   */
  async getHomepageData(): Promise<HomepageData> {
    const response = await this.httpService.get<ApiResponse<HomepageData>>({
      path: "/api/homepage",
    });
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch homepage data");
    }

    return response.data;
  }

  /**
   * Transform backend CategoryDto to frontend ICategory
   */
  static transformCategory(category: CategoryDto) {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      image:
        category.imageUrl ||
        "https://placehold.co/64x64/6366f1/ffffff/png?text=Cat",
      productCount: 0, // Backend doesn't provide this yet
    };
  }

  /**
   * Transform backend ProductDto to frontend IProduct
   */
  static transformProduct(product: ProductDto) {
    const price = parseFloat(product.price);
    const comparePrice = product.comparePrice
      ? parseFloat(product.comparePrice)
      : null;

    return {
      id: product.id,
      name: product.name,
      price: product.hasDiscount && comparePrice ? comparePrice : price,
      originalPrice: product.hasDiscount && comparePrice ? price : null,
      image:
        product.primaryImage ||
        "https://placehold.co/300x300/6366f1/ffffff/png?text=Product",
      rating: parseFloat(product.averageRating) || 0,
      reviewCount: product.reviewCount,
      seller: "Unknown Seller", // Backend doesn't provide seller info yet
      inStock: product.isAvailable,
    };
  }
}
