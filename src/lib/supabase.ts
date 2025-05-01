import { createClient } from '@supabase/supabase-js';

// Define database schema types for type safety
export type Database = {
  public: {
    Tables: {
      attorneys: {
        Row: {
          id: string;
          name: string;
          position: string;
          specialty: string;
          bio: string;
          education: string[];
          image_url: string; // Changed from imageUrl to image_url
          email: string;
          phone: string;
          linkedin: string;
          featured?: boolean;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['attorneys']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['attorneys']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          author: string;
          date: string;
          category: string;
          image_url: string; // Changed from imageUrl to image_url
          featured?: boolean;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
    };
  };
};

// Try to get environment variables, fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Remove console logs for production environment
// if (import.meta.env.DEV) {
//   console.log('Supabase URL:', supabaseUrl);
//   console.log('Supabase Anon Key:', supabaseAnonKey ? '✓ Set' : '✗ Missing');
// }

// Create client with proper typing
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

// Log warning if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
  );
}

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// SQL statements for creating tables with correct column names (snake_case)
const CREATE_ATTORNEYS_TABLE = `
CREATE TABLE IF NOT EXISTS public.attorneys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT NOT NULL,
  education TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
`;

const CREATE_BLOG_POSTS_TABLE = `
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
`;

// Function to create a table using SQL via RPC
const createTable = async (sql: string) => {
  try {
    const { error } = await supabase.rpc('exec_sql', { query: sql });
    
    if (error) {
      console.error(`Error creating table: ${error.message}`);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error executing SQL:', err);
    return false;
  }
};

// Initialize database tables
export const initializeTables = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, skipping table initialization');
    return false;
  }

  try {
    // First, ensure the uuid-ossp extension is enabled for UUID generation
    await supabase.rpc('exec_sql', {
      query: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    });
    
    // Try to create tables using RPC
    const attorneysCreated = await createTable(CREATE_ATTORNEYS_TABLE);
    const blogPostsCreated = await createTable(CREATE_BLOG_POSTS_TABLE);
    
    if (attorneysCreated && blogPostsCreated) {
      console.log('Database tables created successfully');
      return true;
    }

    // If RPC fails (which might happen if the user doesn't have access to exec_sql),
    // we'll verify if the tables exist by querying them
    console.log('Checking if tables exist...');
    const attorneysCheck = await checkIfTableExists('attorneys');
    const blogPostsCheck = await checkIfTableExists('blog_posts');
    
    if (!attorneysCheck || !blogPostsCheck) {
      console.error('Tables do not exist and could not be created. Please create them manually in the Supabase dashboard.');
      return false;
    }
    
    console.log('Database connection verified successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database tables:', error);
    return false;
  }
};

// Helper to check if a table exists
const checkIfTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('count(*)')
      .limit(1)
      .single();
    
    // If there's an error but it's NOT about the table not existing,
    // that means the table exists but there was another issue
    if (error && !error.message.includes('does not exist')) {
      console.log(`Table ${tableName} exists but had error:`, error.message);
      return true;
    }
    
    // If we get data or the error wasn't about table existence, the table exists
    return !!data || (error && !error.message.includes('does not exist'));
  } catch (err) {
    console.error(`Error checking if table ${tableName} exists:`, err);
    return false;
  }
};
