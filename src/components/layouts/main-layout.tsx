import React from "react";
import Head from "next/head";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

interface IMainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  showFooter?: boolean;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
    title = "ECommerce - Your Trusted B2B Marketplace",
    description = "Leading B2B ecommerce platform for global trade. Discover quality products from verified suppliers with secure payments and reliable delivery.",
    keywords = "B2B marketplace, wholesale, suppliers, global trade, ecommerce, business solutions",
    className = "",
    cartItemCount,
    onCartClick,
    showFooter = true,
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6b21a8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={` bg-neutral-50 ${className}`}>
        <Header cartItemCount={cartItemCount} onCartClick={onCartClick} />

        <main>{children}</main>

        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
