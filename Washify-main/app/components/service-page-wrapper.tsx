"use client";

import { useState } from "react";
import LoadingScreen from "./loading-screen";

interface ServicePageWrapperProps {
  children: React.ReactNode;
}

export default function ServicePageWrapper({ children }: ServicePageWrapperProps) {
  const [isImageReady, setIsImageReady] = useState(false);

  const handleImageReady = () => {
    setIsImageReady(true);
  };

  return (
    <>
      <LoadingScreen isVisible={!isImageReady} />
      <ServicePageContext.Provider value={{ onImageReady: handleImageReady }}>
        {children}
      </ServicePageContext.Provider>
    </>
  );
}

import { createContext } from "react";

export const ServicePageContext = createContext<{
  onImageReady: () => void;
}>({
  onImageReady: () => {},
});
