import { GetServerSideProps } from "next";
import HomePage from "@/components/templates/home-page";
import { IHomePageProps } from "@/core/modules/homepage/types";
import { HomepageService } from "@/core/modules/homepage/homepage.service";
import { ServerHttpService } from "@/core/shared/services/httpServiceServer";
import { ConfigService } from "@/core/shared/services/configService";
import PageContainer from "@/components/layouts/pageContainer";

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context
) => {
  try {
    const configService = new ConfigService();
    const httpService = new ServerHttpService(configService, {});

    const homepageService = new HomepageService(httpService, configService);
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
      totalCountries: 190,
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
