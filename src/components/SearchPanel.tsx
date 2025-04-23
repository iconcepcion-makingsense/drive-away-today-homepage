import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LocationSelector from "./LocationSelector";
import DateRangePicker from "./DateRangePicker";
import { Search, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarUI } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useSearchVariant } from "@/hooks/useSearchVariant";
import { pushEvent } from "@/utils/gtm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const variant = useSearchVariant();

  React.useEffect(() => {
    if (variant === "separate-dates" && (startDate !== dateRange.from || endDate !== dateRange.to)) {
      setDateRange({
        from: startDate,
        to: endDate
      });
    }
  }, [startDate, endDate, variant]);

  const handleSearch = () => {
    pushEvent('car_search', {
      location,
      pickup_date: dateRange.from?.toISOString(),
      return_date: dateRange.to?.toISOString(),
    });

    setShowDialog(true);

    console.log("Searching for cars with:", {
      location,
      pickupDate: dateRange.from,
      returnDate: dateRange.to,
    });
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  if (variant === "separate-dates") {
    return (
      <>
        <Card className={`bg-white shadow-lg ${className}`} id="search-panel">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <Label htmlFor="location" className="mb-2 block font-medium">
                  Pickup Location
                </Label>
                <LocationSelector
                  value={location}
                  onChange={setLocation}
                  id="location-selector"
                />
              </div>

              <div className="md:col-span-3">
                <Label htmlFor="start-date" className="mb-2 block font-medium">
                  Pickup Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="pickup-date"
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

              <div className="md:col-span-3">
                <Label htmlFor="end-date" className="mb-2 block font-medium">
                  Return Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="return-date"
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

              <div className="md:col-span-2 flex items-end">
                <Button
                  id="search-button"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-10"
                  onClick={handleSearch}
                  disabled={!location || !startDate || !endDate}
                >
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Dialog open={showDialog} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
            </DialogHeader>
            <div className="py-4">Conversion registered</div>
            <DialogFooter>
              <Button onClick={handleDialogClose}>Accept</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Card className={`bg-white shadow-lg ${className}`} id="search-panel">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <Label htmlFor="location" className="mb-2 block font-medium">
                Pickup Location
              </Label>
              <LocationSelector
                value={location}
                onChange={setLocation}
                id="location-selector"
              />
            </div>

            <div className="md:col-span-6">
              <Label htmlFor="dates" className="mb-2 block font-medium">
                Rental Period
              </Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                id="date-range-picker"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <Button
                id="search-button"
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
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <div className="py-4">Conversion registered</div>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchPanel;
