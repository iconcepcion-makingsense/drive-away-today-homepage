
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LocationSelector from "./LocationSelector";
import DateRangePicker from "./DateRangePicker";
import { Search } from "lucide-react";
import { useFeature } from "@growthbook/growthbook-react";

interface SearchPanelProps {
  className?: string;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ className }) => {
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Get the experiment variation from GrowthBook with default values
  const searchExperiment = useFeature("search-panel-variant", {
    variant: "default",
    buttonColor: "blue",
    buttonText: "Search"
  }).value;

  const handleSearch = () => {
    console.log("Searching for cars with:", {
      location,
      pickupDate: dateRange.from,
      returnDate: dateRange.to,
    });
    // This would typically trigger an API call or navigation
  };

  // Get the button color with fallback
  const buttonColor = (searchExperiment?.buttonColor || "blue") === "green" 
    ? "bg-green-600 hover:bg-green-700" 
    : "bg-blue-600 hover:bg-blue-700";

  // Get the button text with fallback
  const buttonText = searchExperiment?.buttonText || "Search";

  // Use a default variant if none is specified
  const variant = searchExperiment?.variant || "default";

  // Render either the default or variant B based on the experiment
  if (variant === "compact") {
    // Compact variant
    return (
      <Card className={`bg-white shadow-lg ${className}`}>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LocationSelector
                value={location}
                onChange={setLocation}
                id="location"
              />
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                id="dates"
              />
            </div>
            <Button
              className={`w-full ${buttonColor} h-10`}
              onClick={handleSearch}
              disabled={!location || !dateRange.from || !dateRange.to}
            >
              <Search className="mr-2 h-4 w-4" /> {buttonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`bg-white shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Location Selector */}
          <div className="md:col-span-4">
            <Label htmlFor="location" className="mb-2 block font-medium">
              Pickup Location
            </Label>
            <LocationSelector
              value={location}
              onChange={setLocation}
              id="location"
            />
          </div>

          {/* Date Range Selector */}
          <div className="md:col-span-6">
            <Label htmlFor="dates" className="mb-2 block font-medium">
              Rental Period
            </Label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              id="dates"
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 flex items-end">
            <Button
              className={`w-full ${buttonColor} h-10`}
              onClick={handleSearch}
              disabled={!location || !dateRange.from || !dateRange.to}
            >
              <Search className="mr-2 h-4 w-4" /> {buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
