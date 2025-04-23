
import React from "react";
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

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
}

const locations = [
  { value: "new-york", label: "New York City" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "miami", label: "Miami" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "las-vegas", label: "Las Vegas" },
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  id,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

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
        >
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-blue-600" />
            {selectedLocation ? selectedLocation.label : "Select location"}
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
