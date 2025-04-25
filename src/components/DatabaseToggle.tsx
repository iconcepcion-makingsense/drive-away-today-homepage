
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { setUseDatabase, getUseDatabase, testConnection } from "@/utils/database";
import { toast } from "sonner";

interface DatabaseToggleProps {
  className?: string;
}

const DatabaseToggle: React.FC<DatabaseToggleProps> = ({ className }) => {
  const [useDb, setUseDb] = useState(getUseDatabase());
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Check database connection when component mounts or when useDb changes
    const checkConnection = async () => {
      if (useDb) {
        setChecking(true);
        try {
          const connected = await testConnection();
          setIsConnected(connected);
          if (!connected) {
            toast.error("Database connection failed. Using local data.");
            setUseDb(false);
          } else {
            toast.success("Connected to database successfully!");
          }
        } catch (error) {
          console.error("Connection test error:", error);
          setIsConnected(false);
          toast.error("Database connection failed. Using local data.");
          setUseDb(false);
        } finally {
          setChecking(false);
        }
      }
    };

    checkConnection();
  }, [useDb]);

  const handleToggle = (checked: boolean) => {
    setUseDb(checked);
    setUseDatabase(checked);
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Switch
            id="database-mode"
            checked={useDb}
            onCheckedChange={handleToggle}
            disabled={checking}
          />
          <div className="grid gap-1">
            <Label htmlFor="database-mode">Database Mode</Label>
            <p className="text-sm text-gray-500">
              {checking ? "Checking connection..." : 
                useDb ? 
                  isConnected ? 
                    "Using external MySQL database" : 
                    "Failed to connect, using local data" : 
                  "Using local data from code"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseToggle;
