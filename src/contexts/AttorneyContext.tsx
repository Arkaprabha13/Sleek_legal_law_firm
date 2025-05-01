import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured, Database } from '../lib/supabase';

export type Attorney = Database['public']['Tables']['attorneys']['Row'];
type AttorneyInsert = Database['public']['Tables']['attorneys']['Insert'];
type AttorneyUpdate = Database['public']['Tables']['attorneys']['Update'];

// Define interface for frontend attorney model that uses camelCase
export interface AttorneyModel {
  id: string;
  name: string;
  position: string;
  specialty: string;
  bio: string;
  education: string[];
  imageUrl: string; // camelCase for frontend
  email: string;
  phone: string;
  linkedin: string;
  featured?: boolean;
  created_at?: string;
}

interface AttorneyContextType {
  attorneys: AttorneyModel[];
  addAttorney: (attorney: Omit<AttorneyModel, 'id' | 'created_at'>) => Promise<AttorneyModel | null>;
  updateAttorney: (id: string, updates: Partial<Omit<AttorneyModel, 'id' | 'created_at'>>) => Promise<AttorneyModel | null>;
  deleteAttorney: (id: string) => Promise<boolean>;
  getAttorney: (id: string) => AttorneyModel | undefined;
  loading: boolean;
  error: string | null;
  seedInitialAttorneys: () => Promise<void>;
  refreshAttorneys: () => Promise<void>;
}

const AttorneyContext = createContext<AttorneyContextType | undefined>(undefined);

// Sample attorney data - This will be used only for initial seeding if needed
const initialAttorneys: AttorneyModel[] = [
  {
    id: '1',
    name: "Sarah Johnson",
    position: "Managing Partner",
    specialty: "Corporate Law",
    bio: "Sarah Johnson is the founding and managing partner of SleekLegal. With over 15 years of experience in corporate law, she has guided numerous businesses through complex legal challenges. Sarah specializes in mergers and acquisitions, corporate governance, and commercial contracts. Her strategic approach and deep understanding of business principles make her an invaluable asset to corporate clients.",
    education: [
      "J.D., Harvard Law School",
      "B.A. in Economics, Yale University"
    ],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    email: "sarah.johnson@sleeklegal.com",
    phone: "+1 (555) 123-4567",
    linkedin: "#",
    featured: true
  },
  {
    id: '2',
    name: "Michael Chen",
    position: "Senior Partner",
    specialty: "Litigation",
    bio: "Michael Chen is a senior partner specializing in complex litigation matters. With a reputation for being a tenacious advocate, Michael has successfully represented clients in high-stakes litigation across multiple industries. His expertise includes commercial disputes, class actions, and product liability defense. Michael is known for his compelling courtroom presence and strategic case management.",
    education: [
      "J.D., Stanford Law School",
      "B.S. in Political Science, UC Berkeley"
    ],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    email: "michael.chen@sleeklegal.com",
    phone: "+1 (555) 987-6543",
    linkedin: "#",
    featured: true
  },
  {
    id: '3',
    name: "Jessica Rodriguez",
    position: "Partner",
    specialty: "Family Law",
    bio: "Jessica Rodriguez leads our Family Law practice with compassion and determination. She understands the emotional complexities of family legal matters and provides personalized guidance to clients during challenging times. Jessica handles divorce proceedings, child custody arrangements, adoption, and prenuptial agreements with sensitivity and professional expertise.",
    education: [
      "J.D., Columbia Law School",
      "B.A. in Psychology, NYU"
    ],
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80",
    email: "jessica.rodriguez@sleeklegal.com",
    phone: "+1 (555) 456-7890",
    linkedin: "#"
  },
  {
    id: '4',
    name: "David Wilson",
    position: "Associate",
    specialty: "Real Estate",
    bio: "David Wilson is an associate attorney focusing on real estate law. He assists clients with property acquisitions, sales, leasing, and land use matters. David's detail-oriented approach ensures that real estate transactions proceed smoothly and that clients' interests are protected. He works with both individual and commercial property investors to navigate complex real estate laws.",
    education: [
      "J.D., Georgetown University Law Center",
      "B.B.A. in Real Estate, University of Michigan"
    ],
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    email: "david.wilson@sleeklegal.com",
    phone: "+1 (555) 789-0123",
    linkedin: "#"
  },
];

// Helper function to convert camelCase to snake_case
const toDbModel = (attorney: Omit<AttorneyModel, 'id' | 'created_at'>): AttorneyInsert => {
  const { imageUrl, ...rest } = attorney;
  return {
    ...rest,
    image_url: imageUrl
  };
};

// Helper function to convert snake_case to camelCase
const toFrontendModel = (dbAttorney: Attorney): AttorneyModel => {
  const { image_url, ...rest } = dbAttorney;
  return {
    ...rest,
    imageUrl: image_url
  };
};

export const AttorneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attorneys, setAttorneys] = useState<AttorneyModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttorneys = async () => {
    try {
      setLoading(true);
      
      if (isSupabaseConfigured()) {
        // If Supabase is configured, try to fetch data
        const { data, error } = await supabase
          .from('attorneys')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          // Convert to frontend model with camelCase
          const frontendAttorneys = data.map(toFrontendModel);
          setAttorneys(frontendAttorneys);
        } else {
          // If no data in Supabase, use initial data
          setAttorneys(initialAttorneys);
          console.info("No attorneys found in database, using sample data");
        }
      } else {
        // If Supabase is not configured, use initial data
        setAttorneys(initialAttorneys);
        console.info("Supabase not configured, using sample attorney data");
      }
    } catch (err) {
      console.error('Error fetching attorneys:', err);
      setError((err as Error).message);
      // Fallback to initial data
      setAttorneys(initialAttorneys);
    } finally {
      setLoading(false);
    }
  };

  // Initial load of attorneys
  useEffect(() => {
    fetchAttorneys();
  }, []);

  // Function to refresh attorneys data
  const refreshAttorneys = async () => {
    await fetchAttorneys();
  };

  // Function to seed initial data if needed
  const seedInitialAttorneys = async () => {
    try {
      if (!isSupabaseConfigured()) {
        toast.error('Supabase is not configured. Cannot seed data.');
        return;
      }
      
      setLoading(true);
      
      // Check if the table is empty first
      const { data: existingData, error: checkError } = await supabase
        .from('attorneys')
        .select('id')
        .limit(1);
      
      if (checkError) throw new Error(checkError.message);
      
      // Only seed if no data exists
      if (existingData && existingData.length === 0) {
        // Convert camelCase to snake_case for database insert
        const dbAttorneys = initialAttorneys.map(attorney => {
          // Strip id and created_at as they will be generated by DB
          const { id, created_at, ...rest } = attorney;
          return toDbModel(rest);
        });
        
        const { error } = await supabase
          .from('attorneys')
          .insert(dbAttorneys);
        
        if (error) throw new Error(error.message);
        
        toast.success('Initial attorney data has been created');
      } else {
        toast.info('Attorney data already exists, skipping seed operation');
      }
      
      await refreshAttorneys();
    } catch (err) {
      console.error('Error seeding attorneys:', err);
      toast.error('Failed to seed initial attorney data: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addAttorney = async (attorney: Omit<AttorneyModel, 'id' | 'created_at'>): Promise<AttorneyModel | null> => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate adding
        const newAttorney = {
          ...attorney,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as AttorneyModel;
        
        setAttorneys(prev => [...prev, newAttorney]);
        toast.success('Attorney added successfully! (Local mode)');
        return newAttorney;
      }
      
      // Convert to DB model (snake_case)
      const dbAttorney = toDbModel(attorney);
      
      const { data, error } = await supabase
        .from('attorneys')
        .insert(dbAttorney)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Convert back to frontend model (camelCase)
      const newAttorney = toFrontendModel(data);
      setAttorneys(prev => [...prev, newAttorney]);
      toast.success('Attorney added successfully!');
      return newAttorney;
    } catch (err) {
      console.error('Error adding attorney:', err);
      toast.error('Failed to add attorney: ' + (err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAttorney = async (id: string, updates: Partial<Omit<AttorneyModel, 'id' | 'created_at'>>): Promise<AttorneyModel | null> => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate updating
        const updatedAttorney = attorneys.find(a => a.id === id);
        if (!updatedAttorney) {
          throw new Error('Attorney not found');
        }
        
        const newAttorney = { ...updatedAttorney, ...updates } as AttorneyModel;
        setAttorneys(prev => prev.map(a => a.id === id ? newAttorney : a));
        toast.success('Attorney updated successfully! (Local mode)');
        return newAttorney;
      }
      
      // Convert to DB model (snake_case)
      const dbUpdates = updates.imageUrl
        ? { ...updates, image_url: updates.imageUrl, imageUrl: undefined }
        : updates;
        
      const { data, error } = await supabase
        .from('attorneys')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Convert back to frontend model (camelCase)
      const updatedAttorney = toFrontendModel(data);
      setAttorneys(prev => prev.map(a => a.id === id ? updatedAttorney : a));
      toast.success('Attorney updated successfully!');
      return updatedAttorney;
    } catch (err) {
      console.error('Error updating attorney:', err);
      toast.error('Failed to update attorney: ' + (err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAttorney = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate deletion
        setAttorneys(prev => prev.filter(attorney => attorney.id !== id));
        toast.success('Attorney deleted successfully! (Local mode)');
        return true;
      }
      
      const { error } = await supabase
        .from('attorneys')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      setAttorneys(prev => prev.filter(attorney => attorney.id !== id));
      toast.success('Attorney deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting attorney:', err);
      toast.error('Failed to delete attorney: ' + (err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getAttorney = (id: string) => {
    return attorneys.find(attorney => attorney.id === id);
  };

  return (
    <AttorneyContext.Provider value={{ 
      attorneys, 
      addAttorney, 
      updateAttorney, 
      deleteAttorney, 
      getAttorney, 
      loading, 
      error,
      seedInitialAttorneys,
      refreshAttorneys
    }}>
      {children}
    </AttorneyContext.Provider>
  );
};

export const useAttorney = (): AttorneyContextType => {
  const context = useContext(AttorneyContext);
  if (context === undefined) {
    throw new Error('useAttorney must be used within an AttorneyProvider');
  }
  return context;
};
