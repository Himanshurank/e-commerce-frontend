import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/components/layouts/main-layout";
import { useEffect } from "react";
import { authService } from "@/core/shared/services/auth.service";

export default function App({ Component, pageProps }: AppProps) {
  // Initialize auth service on app startup
  useEffect(() => {
    authService.initialize();
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
