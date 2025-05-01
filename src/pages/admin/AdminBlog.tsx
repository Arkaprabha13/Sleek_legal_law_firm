import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useBlog, BlogPost } from '../../contexts/BlogContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Eye, RotateCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { isSupabaseConfigured } from '../../lib/supabase';

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, loading, refreshBlogPosts, seedInitialBlogPosts } = useBlog();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSeedDialogOpen, setIsSeedDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleOpenAddDialog = () => {
    setCurrentPost({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      imageUrl: '',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (post: BlogPost) => {
    setCurrentPost({...post});
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      if (currentPost.id) {
        // Update existing post
        const id = currentPost.id;
        // Remove id from updates to avoid sending it in the payload
        const { id: _, ...updates } = currentPost;
        await updateBlogPost(id, updates);
      } else {
        // Add new post
        await addBlogPost(currentPost);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (postToDelete) {
      try {
        setIsSubmitting(true);
        await deleteBlogPost(postToDelete);
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch (error) {
        console.error("Error deleting blog post:", error);
        toast.error("Failed to delete blog post");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBlogPosts();
    setIsRefreshing(false);
    toast.success("Blog posts refreshed from database");
  };

  const handleSeedData = async () => {
    try {
      setIsSubmitting(true);
      await seedInitialBlogPosts();
      setIsSeedDialogOpen(false);
    } catch (error) {
      console.error("Error seeding blog posts:", error);
      toast.error("Failed to seed blog post data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RotateCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            
            {isSupabaseConfigured() && blogPosts.length === 0 && (
              <Button 
                variant="outline" 
                onClick={() => setIsSeedDialogOpen(true)}
                className="gap-2"
              >
                <Plus size={16} />
                Seed Initial Data
              </Button>
            )}
            
            <Button onClick={handleOpenAddDialog} className="gap-2">
              <Plus size={16} />
              Add Blog Post
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <Skeleton className="w-full h-48" />
                  </div>
                  <CardContent className="flex-1 p-6 space-y-4">
                    <div>
                      <Skeleton className="h-6 w-1/4 mb-2" />
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Blog Posts Found</h3>
            <p className="text-gray-500 mb-4">Start by adding a new blog post or seed initial data.</p>
            <div className="flex justify-center gap-3">
              <Button onClick={handleOpenAddDialog} className="gap-2">
                <Plus size={16} />
                Add Blog Post
              </Button>
              {isSupabaseConfigured() && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsSeedDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus size={16} />
                  Seed Initial Data
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-48 md:h-full object-cover"
                    />
                    {post.featured && (
                      <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mt-2">{post.title}</h3>
                      <p className="text-gray-600 mt-2">{post.excerpt}</p>
                      <p className="text-sm text-gray-500 mt-2">By {post.author}</p>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        <Eye size={14} />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleOpenEditDialog(post)}
                      >
                        <Pencil size={14} />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleOpenDeleteDialog(post.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Blog Post Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentPost.id ? 'Edit Blog Post' : 'Add New Blog Post'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  value={currentPost.title || ''}
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author"
                    value={currentPost.author || ''}
                    onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category"
                    value={currentPost.category || ''}
                    onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl"
                  type="url"
                  value={currentPost.imageUrl || ''}
                  onChange={(e) => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt"
                  value={currentPost.excerpt || ''}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content"
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={8}
                  required
                />
                <p className="text-xs text-gray-500">
                  You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, etc. for formatting.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="featured"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                    checked={currentPost.featured || false}
                    onChange={(e) => setCurrentPost({...currentPost, featured: e.target.checked})}
                  />
                  <Label htmlFor="featured" className="ml-2">Featured Post</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : currentPost.id ? 'Update Post' : 'Add Post'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Seed Data Confirmation Dialog */}
        <Dialog open={isSeedDialogOpen} onOpenChange={setIsSeedDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Seed Initial Blog Data</DialogTitle>
            </DialogHeader>
            <p>
              This will populate your Supabase database with sample blog data. 
              Proceed only if you want to initialize your database with sample content.
            </p>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsSeedDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSeedData}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Seeding...' : 'Seed Data'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
