import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured, Database } from '../lib/supabase';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

// Define interface for frontend blog post model that uses camelCase
export interface BlogPostModel {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string; // camelCase for frontend
  featured?: boolean;
  created_at?: string;
}

interface BlogContextType {
  blogPosts: BlogPostModel[];
  addBlogPost: (blogPost: Omit<BlogPostModel, 'id' | 'created_at'>) => Promise<BlogPostModel | null>;
  updateBlogPost: (id: string, updates: Partial<Omit<BlogPostModel, 'id' | 'created_at'>>) => Promise<BlogPostModel | null>;
  deleteBlogPost: (id: string) => Promise<boolean>;
  getBlogPost: (id: string) => BlogPostModel | undefined;
  seedInitialBlogPosts: () => Promise<void>;
  refreshBlogPosts: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Sample blog post data
const initialBlogPosts: BlogPostModel[] = [
  {
    id: '1',
    title: 'Understanding Personal Injury Claims',
    content: '<p>Personal injury law encompasses a wide range of situations where someone suffers harm from an accident or injury, and someone else might be legally responsible. The legal system aims to make the injured person "whole" again through monetary compensation, known as damages.</p><p>To establish a valid personal injury claim, you generally need to prove:</p><ul><li>The party at fault had a duty to act in a certain way</li><li>They breached that duty</li><li>The breach caused your injury</li><li>You suffered damages as a result</li></ul><p>Personal injury cases can arise from various scenarios, including car accidents, slip and falls, medical malpractice, workplace injuries, and product liability. Each type of case has its own specific legal considerations and requirements.</p><p>If you believe you have a personal injury claim, it\'s crucial to consult with an experienced attorney who can evaluate your case and guide you through the legal process.</p>',
    excerpt: 'Learn about the fundamentals of personal injury claims and what you need to prove to establish a valid case.',
    author: 'Sarah Johnson',
    date: '2023-05-15',
    category: 'Personal Injury',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'The Importance of Estate Planning',
    content: '<p>Estate planning is a critical process that everyone should undertake, regardless of age or wealth. It involves making arrangements for the management and disposal of your estate during your life and after death, while minimizing gift, estate, generation-skipping transfer, and income tax.</p><p>A comprehensive estate plan typically includes:</p><ul><li>A will or trust</li><li>Power of attorney designations</li><li>Beneficiary designations</li><li>Letter of intent</li><li>Healthcare directives</li></ul><p>Without proper estate planning, your assets may be distributed according to state law rather than your wishes. Additionally, the probate process can be lengthy and costly for your heirs.</p><p>Estate planning is not just for the wealthy. It\'s about ensuring your assets are distributed according to your wishes and minimizing the burden on your loved ones during a difficult time.</p>',
    excerpt: 'Discover why estate planning is important for everyone and what elements make up a comprehensive estate plan.',
    author: 'Michael Chen',
    date: '2023-06-22',
    category: 'Estate Planning',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Navigating Child Custody Disputes',
    content: '<p>Child custody disputes are among the most emotionally challenging aspects of family law. Courts always prioritize the best interests of the child when making custody determinations, but this standard can be interpreted in various ways.</p><p>There are several types of custody arrangements:</p><ul><li>Legal custody: The right to make important decisions about the child\'s upbringing</li><li>Physical custody: Where the child lives</li><li>Joint custody: Shared by both parents</li><li>Sole custody: Granted to one parent</li></ul><p>When determining custody, courts consider factors such as the child\'s relationship with each parent, the stability of each home environment, each parent\'s ability to provide for the child\'s needs, and sometimes the child\'s preferences (depending on age).</p><p>If you\'re facing a custody dispute, it\'s essential to work with an attorney who specializes in family law and can advocate for your rights while keeping the focus on your child\'s best interests.</p>',
    excerpt: "Learn about different types of custody arrangements and how courts determine what's in the best interest of the child.",
    author: 'Jessica Rodriguez',
    date: '2023-07-10',
    category: 'Family Law',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80'
  }
];

// Helper function to convert camelCase to snake_case
const toDbModel = (blogPost: Omit<BlogPostModel, 'id' | 'created_at'>): BlogPostInsert => {
  const { imageUrl, ...rest } = blogPost;
  return {
    ...rest,
    image_url: imageUrl
  };
};

// Helper function to convert snake_case to camelCase
const toFrontendModel = (dbBlogPost: BlogPost): BlogPostModel => {
  const { image_url, ...rest } = dbBlogPost;
  return {
    ...rest,
    imageUrl: image_url
  };
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      
      if (isSupabaseConfigured()) {
        // If Supabase is configured, try to fetch data
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          // Convert to frontend model with camelCase
          const frontendBlogPosts = data.map(toFrontendModel);
          setBlogPosts(frontendBlogPosts);
        } else {
          // If no data in Supabase, use initial data
          setBlogPosts(initialBlogPosts);
          console.info("No blog posts found in database, using sample data");
        }
      } else {
        // If Supabase is not configured, use initial data
        setBlogPosts(initialBlogPosts);
        console.info("Supabase not configured, using sample blog post data");
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError((err as Error).message);
      // Fallback to initial data
      setBlogPosts(initialBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  // Initial load of blog posts
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Function to refresh blog posts data
  const refreshBlogPosts = async () => {
    await fetchBlogPosts();
  };

  // Function to seed initial data if needed
  const seedInitialBlogPosts = async () => {
    try {
      if (!isSupabaseConfigured()) {
        toast.error('Supabase is not configured. Cannot seed data.');
        return;
      }
      
      setLoading(true);
      
      // Check if the table is empty first
      const { data: existingData, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .limit(1);
      
      if (checkError) throw new Error(checkError.message);
      
      // Only seed if no data exists
      if (existingData && existingData.length === 0) {
        // Convert camelCase to snake_case for database insert
        const dbBlogPosts = initialBlogPosts.map(post => {
          // Strip id and created_at as they will be generated by DB
          const { id, created_at, ...rest } = post;
          return toDbModel(rest);
        });
        
        const { error } = await supabase
          .from('blog_posts')
          .insert(dbBlogPosts);
        
        if (error) throw new Error(error.message);
        
        toast.success('Initial blog post data has been created');
      } else {
        toast.info('Blog post data already exists, skipping seed operation');
      }
      
      await refreshBlogPosts();
    } catch (err) {
      console.error('Error seeding blog posts:', err);
      toast.error('Failed to seed initial blog post data');
    } finally {
      setLoading(false);
    }
  };

  const addBlogPost = async (blogPost: Omit<BlogPostModel, 'id' | 'created_at'>): Promise<BlogPostModel | null> => {
    try {
      setLoading(true);
      
      // Set the current date if not provided
      const postData = {
        ...blogPost,
        date: blogPost.date || new Date().toISOString().split('T')[0]
      };
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate adding
        const newBlogPost = {
          ...postData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as BlogPostModel;
        
        setBlogPosts(prev => [newBlogPost, ...prev]);
        toast.success('Blog post added successfully! (Local mode)');
        return newBlogPost;
      }
      
      // Convert to DB model (snake_case)
      const dbBlogPost = toDbModel(postData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(dbBlogPost)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Convert back to frontend model (camelCase)
      const newBlogPost = toFrontendModel(data);
      setBlogPosts(prev => [newBlogPost, ...prev]);
      toast.success('Blog post added successfully!');
      return newBlogPost;
    } catch (err) {
      console.error('Error adding blog post:', err);
      toast.error('Failed to add blog post: ' + (err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<Omit<BlogPostModel, 'id' | 'created_at'>>): Promise<BlogPostModel | null> => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate updating
        const updatedBlogPost = blogPosts.find(p => p.id === id);
        if (!updatedBlogPost) {
          throw new Error('Blog post not found');
        }
        
        const newBlogPost = { ...updatedBlogPost, ...updates } as BlogPostModel;
        setBlogPosts(prev => prev.map(p => p.id === id ? newBlogPost : p));
        toast.success('Blog post updated successfully! (Local mode)');
        return newBlogPost;
      }
      
      // Convert to DB model (snake_case)
      const dbUpdates = updates.imageUrl
        ? { ...updates, image_url: updates.imageUrl, imageUrl: undefined }
        : updates;
        
      const { data, error } = await supabase
        .from('blog_posts')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Convert back to frontend model (camelCase)
      const updatedBlogPost = toFrontendModel(data);
      setBlogPosts(prev => prev.map(p => p.id === id ? updatedBlogPost : p));
      toast.success('Blog post updated successfully!');
      return updatedBlogPost;
    } catch (err) {
      console.error('Error updating blog post:', err);
      toast.error('Failed to update blog post: ' + (err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // In development without Supabase, simulate deletion
        setBlogPosts(prev => prev.filter(post => post.id !== id));
        toast.success('Blog post deleted successfully! (Local mode)');
        return true;
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      setBlogPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Blog post deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting blog post:', err);
      toast.error('Failed to delete blog post: ' + (err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBlogPost = (id: string) => {
    return blogPosts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ 
      blogPosts, 
      addBlogPost, 
      updateBlogPost, 
      deleteBlogPost, 
      getBlogPost, 
      loading, 
      error,
      seedInitialBlogPosts,
      refreshBlogPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
