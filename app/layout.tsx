export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import { Providers } from "../providers/chakraProvider";
import { PageNotificationProvider } from "../providers/notificationProvider";
import { AuthContextProvider } from "@/context/AuthContext";
import { UserContextProvider } from "@/context/UserContext";
import { CompanyContextProvider } from "@/context/CompanyContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description: "Social app for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserContextProvider>
            <AuthContextProvider>
              <CompanyContextProvider>
                <PageNotificationProvider>
                  <Header />
                  {children}
                </PageNotificationProvider>
              </CompanyContextProvider>
            </AuthContextProvider>
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  );
}
