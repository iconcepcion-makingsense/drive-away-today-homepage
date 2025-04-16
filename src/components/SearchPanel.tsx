
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LocationSelector from "./LocationSelector";
import DateRangePicker from "./DateRangePicker";
import { Search, Calendar } from "lucide-react";
import { useFeature } from "@growthbook/growthbook-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarUI } from "./ui/calendar";
import { cn } from "@/lib/utils";

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
  
  // For separate date pickers
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Get the experiment variation from GrowthBook
  const searchExperiment = useFeature("search-panel-variant").value;

  // Update dateRange when separate pickers change
  React.useEffect(() => {
    if (searchExperiment?.variant === "separate-dates" && (startDate !== dateRange.from || endDate !== dateRange.to)) {
      setDateRange({
        from: startDate,
        to: endDate
      });
    }
  }, [startDate, endDate, searchExperiment?.variant]);

  // Update separate pickers when dateRange changes
  React.useEffect(() => {
    if (searchExperiment?.variant === "separate-dates" && (startDate !== dateRange.from || endDate !== dateRange.to)) {
      if (dateRange.from) setStartDate(dateRange.from);
      if (dateRange.to) setEndDate(dateRange.to);
    }
  }, [dateRange, searchExperiment?.variant]);

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

  // Render separate date pickers variation
  if (variant === "separate-dates") {
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

            {/* Start Date Picker */}
            <div className="md:col-span-3">
              <Label htmlFor="start-date" className="mb-2 block font-medium">
                Pickup Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    {startDate ? format(startDate, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarUI
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date Picker */}
            <div className="md:col-span-3">
              <Label htmlFor="end-date" className="mb-2 block font-medium">
                Return Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    {endDate ? format(endDate, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarUI
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date < new Date() || (startDate && date < startDate)}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex items-end">
              <Button
                className={`w-full ${buttonColor} h-10`}
                onClick={handleSearch}
                disabled={!location || !startDate || !endDate}
              >
                <Search className="mr-2 h-4 w-4" /> {buttonText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Render either the default or compact variant based on the experiment
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
