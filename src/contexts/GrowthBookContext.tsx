
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';

// Initialize GrowthBook with proper defaults
const growthbook = new GrowthBook({
  apiHost: import.meta.env.VITE_GROWTHBOOK_API_HOST || "https://cdn.growthbook.io",
  clientKey: import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY || "",
  // We'll automatically track experiment views
  trackingCallback: (experiment, result) => {
    console.log("Experiment Viewed:", experiment.key, result.variationId);
  },
  // Add default attributes if needed
  attributes: {
    // Add any user attributes here
    deviceType: 'web',
  }
});

// Add some default feature values for development
growthbook.setFeatures({
  "search-panel-variant": {
    defaultValue: {
      variant: "default",
      buttonColor: "blue",
      buttonText: "Search"
    }
  }
});

interface GrowthBookContextProps {
  ready: boolean;
}

const GrowthBookContext = createContext<GrowthBookContextProps>({ ready: false });

export const useGrowthBook = () => useContext(GrowthBookContext);

export const GrowthBookWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load GrowthBook features when component mounts
    const loadGrowthBook = async () => {
      try {
        await growthbook.loadFeatures();
        console.log("GrowthBook features loaded successfully");
        setReady(true);
      } catch (error) {
        console.error("Failed to load GrowthBook features:", error);
        // Still set ready to true so the app doesn't get stuck
        setReady(true);
      }
    };

    loadGrowthBook();

    // Update context when window is focused (in case features have changed)
    const refreshFeatures = () => growthbook.refreshFeatures();
    window.addEventListener("focus", refreshFeatures);
    return () => window.removeEventListener("focus", refreshFeatures);
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <GrowthBookContext.Provider value={{ ready }}>
        {children}
      </GrowthBookContext.Provider>
    </GrowthBookProvider>
  );
};
