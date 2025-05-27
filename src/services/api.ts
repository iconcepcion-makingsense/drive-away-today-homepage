
import { supabase } from "@/integrations/supabase/client";

// Base API service class
class ApiService {
  protected supabase = supabase;
  
  protected handleError(error: any, operation: string) {
    console.error(`Error in ${operation}:`, error);
    throw error;
  }
}

export default ApiService;
