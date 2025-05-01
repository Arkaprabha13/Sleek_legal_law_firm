import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import PracticeAreasPage from "./pages/PracticeAreasPage";
import AttorneysPage from "./pages/AttorneysPage";
import ContactPage from "./pages/ContactPage";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAttorneys from "./pages/admin/AdminAttorneys";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminRoute from "./components/admin/AdminRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { AttorneyProvider } from "./contexts/AttorneyContext";
import { BlogProvider } from "./contexts/BlogContext";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, initializeTables, supabase } from "./lib/supabase";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [dbInitError, setDbInitError] = useState<string | null>(null);

  // Setup database tables when the app starts
  useEffect(() => {
    const setupDatabase = async () => {
      if (!isSupabaseConfigured()) {
        toast.warning(
          "Supabase environment variables are missing. The app will work in local mode. To enable database functionality, please add the Supabase URL and key.",
          {
            duration: 8000,
            id: "supabase-config-warning",
          }
        );
        return;
      }

      try {
        // Try to create the tables via RPC if they don't exist
        const success = await initializeTables();
        
        if (success) {
          setDbInitialized(true);
          toast.success("Connected to Supabase database successfully", {
            id: "supabase-connection-success",
          });
        } else {
          setDbInitError("Could not create or verify database tables");
          
          // Show instructions for manual table creation
          toast.error(
            "Tables don't exist or couldn't be created automatically. Please create them manually in the Supabase dashboard.",
            {
              duration: 10000,
              id: "supabase-table-creation-error",
            }
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setDbInitError(errorMessage);
        
        console.error("Error setting up database:", error);
        toast.error(`Failed to connect to Supabase database: ${errorMessage}. Using local data instead.`, {
          duration: 10000,
          id: "supabase-connection-error",
        });
      }
    };

    setupDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AttorneyProvider>
            <BlogProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/practice-areas" element={<PracticeAreasPage />} />
                  <Route path="/attorneys" element={<AttorneysPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="/admin/attorneys" element={<AdminRoute><AdminAttorneys /></AdminRoute>} />
                  <Route path="/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </BlogProvider>
          </AttorneyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
