import React from "react";
import Head from "next/head";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

interface IMainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  testId?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  showFooter?: boolean;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
    title = "ECommerce - Your Trusted Marketplace",
    description = "Discover amazing products from trusted sellers. Shop electronics, fashion, home goods and more with secure payments and fast delivery.",
    className = "",
    testId,
    cartItemCount,
    onCartClick,
    onSearch,
    showFooter = true,
  } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`min-h-screen bg-white flex flex-col ${className}`}
        data-testid={testId || "main-layout"}
      >
        <Header
          cartItemCount={cartItemCount}
          onCartClick={onCartClick}
          onSearch={onSearch}
        />

        <main className="flex-1">{children}</main>

        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
