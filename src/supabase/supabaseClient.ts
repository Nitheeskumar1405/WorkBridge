import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jznbfjxihmgeqnycivwi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bmJmanhpaG1nZXFueWNpdndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MjU4OTcsImV4cCI6MjA0NzUwMTg5N30.K3l2eDwRrL9eDo9BtlBMHqAPtKv4zjUUYmwoFI4LhYs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

