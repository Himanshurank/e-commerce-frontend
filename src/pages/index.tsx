import React from "react";
import { GetServerSideProps } from "next";
import HomePage from "@/components/templates/home-page";
import { getServerHttpService } from "@/core/shared/factories/http-service.factory";
import { IHomePageProps } from "@/core/modules/homepage/types";

export default function Home(props: IHomePageProps) {
  return <HomePage {...props} />;
}

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context
) => {
  try {
    // Get server-side HTTP service
    const httpService = getServerHttpService({
      "X-Server-Request": "true",
      "X-Request-ID": `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      "User-Agent":
        context.req.headers["user-agent"] || "ECommerce-Server/1.0.0",
    });

    // Use the dedicated homepage endpoint from backend API reference
    const homepageData = await httpService.get<any>({
      path: "/api/v1/pages/homepage",
      queryParams: {
        category_limit: 8,
        featured_product_limit: 8,
        include_metadata: true,
      },
    });

    const stats = {
      totalProducts: homepageData.data.metadata?.totalProducts || 0,
      totalSuppliers: homepageData.data.metadata?.totalCategories || 0,
      totalCountries: 190, // Static value as not provided by API
    };

    return {
      props: {
        categories: homepageData.data.categories,
        featuredProducts: homepageData.data.products.featured,
        stats,
      },
    };
  } catch (error) {
    console.error("Homepage API Error:", error);
    return {
      notFound: true,
    };
  }
};
