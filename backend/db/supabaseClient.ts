// filepath: /c:/Users/mjcon/OneDrive/Desktop/CODING/2ND YEAR/2ND_SEM/se_components/component-design/backend/src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxjjbkvhgarughvlykbn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ampia3ZoZ2FydWdodmx5a2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDg2MjIsImV4cCI6MjA1NjU4NDYyMn0.stukpl7x1cWrGiTWMm4omqzirQtWlBJQ5q6IC05_j1s";

export const supabase = createClient(supabaseUrl, supabaseKey);
