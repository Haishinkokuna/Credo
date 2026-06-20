import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://almpnojnwsmkgeeqiquv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbXBub2pud3Nta2dlZXFpcXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTI1MTYsImV4cCI6MjA5NzQ4ODUxNn0.pKBMR_HvoaO240V-CD3eFJsxl6HCQleo_vdVhvhcVZE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
