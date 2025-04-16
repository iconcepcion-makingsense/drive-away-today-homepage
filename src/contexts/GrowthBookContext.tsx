
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';

// Initialize GrowthBook with proper defaults
const growthbook = new GrowthBook({
  apiHost: import.meta.env.VITE_GROWTHBOOK_API_HOST || "https://cdn.growthbook.io",
  clientKey: import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY || "",
  // We'll automatically track experiment views
  trackingCallback: (experiment, result) => {
    console.log("Experiment Viewed:", experiment.key, result.variationId);
    
    // You can add analytics tracking here
    // Example: analytics.track("Experiment Viewed", {
    //   experimentId: experiment.key,
    //   variationId: result.variationId
    // });
  },
  // Add user attributes for targeting
  attributes: {
    deviceType: 'web',
    // Add more attributes as needed for targeting
    // userId: "user-123",
    // userType: "returning",
    // location: "US",
  }
});

// Default feature values for development environment
// These will be overridden when connected to GrowthBook
growthbook.setFeatures({
  "search-panel-variant": {
    defaultValue: {
      variant: "default",
      buttonColor: "blue",
      buttonText: "Search"
    },
    rules: [
      {
        condition: { id: "everyone" },
        force: { 
          variant: "default", 
          buttonColor: "blue", 
          buttonText: "Search" 
        },
        coverage: 0.5
      },
      {
        condition: { id: "everyone" },
        force: { 
          variant: "separate-dates", 
          buttonColor: "blue", 
          buttonText: "Search Cars" 
        },
        coverage: 0.5
      }
    ]
  }
  // You can add more feature flags here
});

interface GrowthBookContextProps {
  ready: boolean;
  growthbook: GrowthBook; // Expose the GrowthBook instance
}

const GrowthBookContext = createContext<GrowthBookContextProps>({ 
  ready: false,
  growthbook: growthbook
});

export const useGrowthBook = () => useContext(GrowthBookContext);

export const GrowthBookWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load GrowthBook features when component mounts
    const loadGrowthBook = async () => {
      try {
        await growthbook.loadFeatures();
        console.log("GrowthBook features loaded successfully");
        
        // Log the loaded features for debugging
        const features = growthbook.getFeatures();
        console.log("Available features:", features);
        
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
      <GrowthBookContext.Provider value={{ ready, growthbook }}>
        {children}
      </GrowthBookContext.Provider>
    </GrowthBookProvider>
  );
};
