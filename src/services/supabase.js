import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kakwrpkvygrmmclnxaib.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtha3dycGt2eWdybW1jbG54YWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDg0MDYsImV4cCI6MjAzMDM4NDQwNn0.DULWR6YqO9kZEM6t1DS71cNEBnBLQb7ycBAXJG2BkSU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
