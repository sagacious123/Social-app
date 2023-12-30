import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import { Providers } from "../providers/chakraProvider";
import { PageNotificationProvider } from "../providers/notificationProvider";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <AuthContextProvider>
            <PageNotificationProvider>{children}</PageNotificationProvider>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
