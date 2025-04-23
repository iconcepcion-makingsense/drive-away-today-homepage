import React, { createContext, useContext, useEffect, useState } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';
import { toast } from "@/components/ui/use-toast";

// GrowthBook client key from your GrowthBook dashboard
const CLIENT_KEY = "sdk-UJg9fpEtmfOWmn"; // Replace this with your actual client key from GrowthBook

// Initialize GrowthBook with proper defaults
const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: CLIENT_KEY,
  trackingCallback: (experiment, result) => {
    console.log("Experiment Viewed:", experiment.key, result.variationId);
  },
  attributes: {
    deviceType: 'web',
  }
});

// Default feature values for development environment
growthbook.setFeatures({
  "search-panel-variant": {
    defaultValue: "default",
    rules: [
      {
        condition: {
          "seed": "search-panel-test"
        },
        variations: ["default", "separate-dates"],
        weights: [0.5, 0.5],
        key: "search-panel-test"
      }
    ]
  }
});

interface GrowthBookContextProps {
  ready: boolean;
  growthbook: GrowthBook;
}

const GrowthBookContext = createContext<GrowthBookContextProps>({ 
  ready: false,
  growthbook: growthbook
});

export const useGrowthBook = () => useContext(GrowthBookContext);

export const GrowthBookWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadGrowthBook = async () => {
      try {
        if (!CLIENT_KEY || CLIENT_KEY === "sdk-UJg9fpEtmfOWmn") {
          console.warn("GrowthBook client key not set or using placeholder. Using local feature definitions.");
          setReady(true);
          return;
        }

        await growthbook.loadFeatures();
        console.log("GrowthBook features loaded successfully");
        
        const features = growthbook.getFeatures();
        console.log("Available features:", features);
        
        if (import.meta.env.DEV) {
          toast({
            title: "GrowthBook Connected",
            description: "Feature flags loaded successfully.",
            duration: 3000,
          });
        }
        
        setReady(true);
      } catch (error) {
        console.error("Failed to load GrowthBook features:", error);
        
        if (import.meta.env.DEV) {
          toast({
            title: "GrowthBook Connection Error",
            description: "Using local feature definitions instead.",
            variant: "destructive",
            duration: 5000,
          });
        }
        
        setReady(true);
      }
    };

    loadGrowthBook();

    const refreshFeatures = () => {
      if (CLIENT_KEY && CLIENT_KEY !== "sdk-UJg9fpEtmfOWmn") {
        growthbook.refreshFeatures();
      }
    };
    window.addEventListener("focus", refreshFeatures);
    return () => window.removeEventListener("focus", refreshFeatures);
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <GrowthBookContext.Provider value={{ ready, growthbook }}>
        {children}
      </GrowthBookContext.Provider>
    </GrowthBookProvider>
  );
};
