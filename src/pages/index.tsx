import { GetServerSideProps } from "next";
import HomePage from "@/components/templates/home-page";
import { getServerHttpService } from "@/core/shared/factories/http-service.factory";
import { IHomePageProps } from "@/core/modules/homepage/types";
import { ConfigService } from "@/core/shared/services/config.service";
import { HomepageService } from "@/core/modules/homepage/homepage.service";
import PageContainer from "@/components/layouts/pageContainer";

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context
) => {
  try {
    // Get server-side HTTP service
    const configService = new ConfigService();
    const httpService = getServerHttpService({
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Server-Request": "true",
      "X-Request-ID": `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      "User-Agent":
        context.req.headers["user-agent"] || "ECommerce-Server/1.0.0",
    });

    // Use the homepage service to fetch data
    const homepageService = new HomepageService(httpService);
    const homepageData = await homepageService.getHomepageData();

    // Transform backend data to frontend format
    const categories = homepageData.categories.map((category) =>
      HomepageService.transformCategory(category)
    );

    const featuredProducts = homepageData.featuredProducts.map((product) =>
      HomepageService.transformProduct(product)
    );

    const stats = {
      totalProducts: featuredProducts.length,
      totalSuppliers: categories.length,
      totalCountries: 190, // Static value as not provided by API
    };

    return {
      props: {
        categories,
        featuredProducts,
        stats,
      },
    };
  } catch (error) {
    console.error("Homepage API Error:", error);

    // Return fallback data instead of notFound for better UX
    return {
      props: {
        categories: [],
        featuredProducts: [],
        stats: {
          totalProducts: 0,
          totalSuppliers: 0,
          totalCountries: 190,
        },
      },
    };
  }
};

export default function Home(props: IHomePageProps) {
  return (
    <PageContainer>
      <HomePage {...props} />
    </PageContainer>
  );
}
