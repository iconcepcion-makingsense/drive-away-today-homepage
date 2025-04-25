
import React, { useEffect, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getLocations, Location } from "@/services/locationsService";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  id,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await getLocations();
        setLocations(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const selectedLocation = locations.find((location) => location.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          id={id}
          className={cn(
            "w-full justify-between text-left bg-white",
            !value && "text-muted-foreground",
            className
          )}
          disabled={loading}
        >
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-blue-600" />
            {loading ? "Loading..." : selectedLocation ? selectedLocation.label : "Select location"}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white" align="start">
        <Command>
          <CommandInput 
            placeholder="Search location..." 
            className="h-9"
            id="location-search-input"
          />
          <CommandList>
            {loading ? (
              <div className="py-6 text-center text-sm">Loading locations...</div>
            ) : error ? (
              <div className="py-6 text-center text-sm text-red-500">{error}</div>
            ) : (
              <>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      id={`location-option-${location.value}`}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                        {location.label}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === location.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
