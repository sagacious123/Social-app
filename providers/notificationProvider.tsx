"use client";

import { ReactElement, createContext, useContext, useState } from "react";
import { PositionedNotificationBarComponent } from "./components/postionedNotificationBarComponent";

export const PageNotificationColorScheme = {
  success: { bg: "#00A788", color: "#fff" },
  error: { bg: "#CE1212", color: "#fff" },
  warning: { bg: "#EB7704", color: "#fff" },
  info: { bg: "#0061BD", color: "#fff" },
};

export interface PageNotification {
  title?: string;
  message: string | ReactElement;
  timeout?: number;
  scheme?: keyof typeof PageNotificationColorScheme;
}

type PageNotificationProviderProv = {
  initNotification: (state: PageNotification) => void;
};

export const PageNotificationProviderContext =
  createContext<PageNotificationProviderProv>({
    initNotification: () => {},
  });

export const PageNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notification, setNotification] = useState<
    PageNotification | undefined
  >();
  const colorScheme = PageNotificationColorScheme;

  const initNotification = (state: PageNotification) => {
    const timeout = state?.timeout ?? 4000;
    // set notification
    setNotification({
      ...state,
    });

    // clear notification after timeout
    setTimeout(() => {
      setNotification(undefined);
    }, timeout);
  };

  const getScheme = () => {
    const scheme = notification?.scheme ?? "success";
    if (notification && colorScheme[scheme]) {
      return colorScheme[scheme];
    }

    return undefined;
  };

  return (
    <PageNotificationProviderContext.Provider
      value={{
        initNotification,
      }}
    >
      {children}

      <PositionedNotificationBarComponent
        show={Boolean(notification)}
        title={notification?.title}
        message={notification?.message}
        backgroundColor={getScheme()?.bg}
        color={getScheme()?.color}
        onClose={() => setNotification(undefined)}
      />
    </PageNotificationProviderContext.Provider>
  );
};

export const usePageNotificationProvider = () =>
  useContext(PageNotificationProviderContext);
