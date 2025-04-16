
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';
import { toast } from "@/components/ui/use-toast";

// GrowthBook client key from your GrowthBook dashboard
// For development, using a placeholder value
const CLIENT_KEY = "sdk-UJg9fpEtmfOWmn"; // Replace this with your actual client key from GrowthBook

// Initialize GrowthBook with proper defaults
const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io", // Default API host
  clientKey: CLIENT_KEY,
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
      variant: "separate-dates",
      buttonColor: "blue",
      buttonText: "Search Cars"
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
        // Check if client key is properly set
        if (!CLIENT_KEY || CLIENT_KEY === "sdk-UJg9fpEtmfOWmn") {
          console.warn("GrowthBook client key not set or using placeholder. Using local feature definitions.");
          // Still mark as ready so we use local definitions
          setReady(true);
          return;
        }

        await growthbook.loadFeatures();
        console.log("GrowthBook features loaded successfully");
        
        // Log the loaded features for debugging
        const features = growthbook.getFeatures();
        console.log("Available features:", features);
        
        // Show success toast in development
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
        
        // Show error toast in development
        if (import.meta.env.DEV) {
          toast({
            title: "GrowthBook Connection Error",
            description: "Using local feature definitions instead.",
            variant: "destructive",
            duration: 5000,
          });
        }
        
        // Still set ready to true so the app doesn't get stuck
        setReady(true);
      }
    };

    loadGrowthBook();

    // Update context when window is focused (in case features have changed)
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
