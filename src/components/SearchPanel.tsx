
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

  const handleSearch = () => {
    console.log("Searching for cars with:", {
      location,
      pickupDate: dateRange.from,
      returnDate: dateRange.to,
    });
    // This would typically trigger an API call or navigation
  };

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
              className="w-full bg-blue-600 hover:bg-blue-700 h-10"
              onClick={handleSearch}
              disabled={!location || !dateRange.from || !dateRange.to}
            >
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
