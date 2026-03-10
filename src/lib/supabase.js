import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ldtdscyrkbfndvoynbgp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGRzY3lya2JmbmR2b3luYmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDA1NjgsImV4cCI6MjA4ODcxNjU2OH0.cIPh5WlX_lTcxUt7XAszHDAiTcHw4EsAoviUlzYDpC8";

export const supabase = createClient(supabaseUrl, supabaseKey);
