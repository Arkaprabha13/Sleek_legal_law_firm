import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAttorney } from '../../contexts/AttorneyContext'; 
import { useBlog } from '../../contexts/BlogContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, FileText, Home, LogOut, Database, RefreshCw, Check, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const { attorneys, seedInitialAttorneys } = useAttorney();
  const { blogPosts, seedInitialBlogPosts } = useBlog();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<{
    attorneys: boolean;
    blog: boolean;
    error?: string;
  }>({ attorneys: false, blog: false });
  const [progress, setProgress] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleMigrateData = async () => {
    if (!isSupabaseConfigured()) {
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    
    try {
      // Migrate attorneys data
      setProgress(25);
      await seedInitialAttorneys();
      setMigrationStatus(prev => ({ ...prev, attorneys: true }));
      
      // Migrate blog posts data
      setProgress(50);
      await seedInitialBlogPosts();
      setMigrationStatus(prev => ({ ...prev, blog: true }));
      
      // Complete
      setProgress(100);
    } catch (error) {
      console.error("Error during migration:", error);
      setMigrationStatus(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error during migration'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {admin?.name || 'Admin'}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/attorneys')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Attorneys
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Attorneys</div>
              <p className="text-xs text-muted-foreground mt-1">
                Add, edit, or remove attorney profiles
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/blog')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Blog
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Blog</div>
              <p className="text-xs text-muted-foreground mt-1">
                Create, edit, or delete blog posts
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Website
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Website</div>
              <p className="text-xs text-muted-foreground mt-1">
                Go to the main website
              </p>
            </CardContent>
          </Card>
        </div>

        {isSupabaseConfigured() && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Migration
              </CardTitle>
              <CardDescription>Migrate your local data to Supabase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {migrationStatus.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {migrationStatus.error}
                  </AlertDescription>
                </Alert>
              )}
              
              {isLoading && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">Migration in progress...</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Attorneys</span>
                    {migrationStatus.attorneys ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" /> Migrated
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {attorneys.length} attorney profiles ready to migrate
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Blog Posts</span>
                    {migrationStatus.blog ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" /> Migrated
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {blogPosts.length} blog posts ready to migrate
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="gap-2 w-full" 
                onClick={handleMigrateData} 
                disabled={isLoading || (migrationStatus.attorneys && migrationStatus.blog)}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Migrating...
                  </>
                ) : (migrationStatus.attorneys && migrationStatus.blog) ? (
                  <>
                    <Check className="h-4 w-4" />
                    Migration Complete
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4" />
                    Migrate All Data to Supabase
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your website data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Attorneys</p>
                <p className="text-2xl font-bold">{attorneys.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                <p className="text-2xl font-bold">{blogPosts.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Testimonials</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Practice Areas</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
