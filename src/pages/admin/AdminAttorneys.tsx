import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAttorney, Attorney } from '../../contexts/AttorneyContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus, RotateCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";
import { isSupabaseConfigured } from '../../lib/supabase';

const AdminAttorneys = () => {
  const { attorneys, addAttorney, updateAttorney, deleteAttorney, loading, refreshAttorneys, seedInitialAttorneys } = useAttorney();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSeedDialogOpen, setIsSeedDialogOpen] = useState(false);
  const [currentAttorney, setCurrentAttorney] = useState<Partial<Attorney>>({});
  const [attorneyToDelete, setAttorneyToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleOpenAddDialog = () => {
    setCurrentAttorney({
      name: '',
      position: '',
      specialty: '',
      bio: '',
      education: [''],
      imageUrl: '',
      email: '',
      phone: '',
      linkedin: '',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (attorney: Attorney) => {
    setCurrentAttorney({...attorney});
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setAttorneyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      if (currentAttorney.id) {
        // Update existing attorney
        const id = currentAttorney.id;
        // Remove id from updates to avoid sending it in the payload
        const { id: _, ...updates } = currentAttorney;
        await updateAttorney(id, updates);
      } else {
        // Add new attorney
        await addAttorney(currentAttorney);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving attorney:", error);
      toast.error("Failed to save attorney");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (attorneyToDelete) {
      try {
        setIsSubmitting(true);
        await deleteAttorney(attorneyToDelete);
        setIsDeleteDialogOpen(false);
        setAttorneyToDelete(null);
      } catch (error) {
        console.error("Error deleting attorney:", error);
        toast.error("Failed to delete attorney");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEducationChange = (index: number, value: string) => {
    const updatedEducation = [...(currentAttorney.education || [])];
    updatedEducation[index] = value;
    setCurrentAttorney({...currentAttorney, education: updatedEducation});
  };

  const addEducationField = () => {
    setCurrentAttorney({
      ...currentAttorney, 
      education: [...(currentAttorney.education || []), '']
    });
  };

  const removeEducationField = (index: number) => {
    const updatedEducation = [...(currentAttorney.education || [])];
    updatedEducation.splice(index, 1);
    setCurrentAttorney({...currentAttorney, education: updatedEducation});
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshAttorneys();
    setIsRefreshing(false);
    toast.success("Attorneys refreshed from database");
  };

  const handleSeedData = async () => {
    try {
      setIsSubmitting(true);
      await seedInitialAttorneys();
      setIsSeedDialogOpen(false);
    } catch (error) {
      console.error("Error seeding attorneys:", error);
      toast.error("Failed to seed attorney data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Attorneys</h1>
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
            
            {isSupabaseConfigured() && attorneys.length === 0 && (
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
              Add Attorney
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : attorneys.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Attorneys Found</h3>
            <p className="text-gray-500 mb-4">Start by adding a new attorney or seed initial data.</p>
            <div className="flex justify-center gap-3">
              <Button onClick={handleOpenAddDialog} className="gap-2">
                <Plus size={16} />
                Add Attorney
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {attorneys.map((attorney) => (
              <Card key={attorney.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={attorney.imageUrl} 
                    alt={attorney.name} 
                    className="w-full h-full object-cover"
                  />
                  {attorney.featured && (
                    <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{attorney.name}</h3>
                  <p className="text-amber-600 text-sm mb-1">{attorney.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{attorney.specialty}</p>
                  
                  <div className="flex mt-4 justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleOpenEditDialog(attorney)}
                    >
                      <Pencil size={14} />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => handleOpenDeleteDialog(attorney.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Attorney Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentAttorney.id ? 'Edit Attorney' : 'Add New Attorney'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    value={currentAttorney.name || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input 
                    id="position"
                    value={currentAttorney.position || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, position: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input 
                    id="specialty"
                    value={currentAttorney.specialty || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, specialty: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl"
                    type="url"
                    value={currentAttorney.imageUrl || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, imageUrl: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={currentAttorney.email || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    value={currentAttorney.phone || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input 
                    id="linkedin"
                    type="url"
                    value={currentAttorney.linkedin || ''}
                    onChange={(e) => setCurrentAttorney({...currentAttorney, linkedin: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                      checked={currentAttorney.featured || false}
                      onChange={(e) => setCurrentAttorney({...currentAttorney, featured: e.target.checked})}
                    />
                    <Label htmlFor="featured" className="ml-2">Featured Attorney</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={currentAttorney.bio || ''}
                  onChange={(e) => setCurrentAttorney({...currentAttorney, bio: e.target.value})}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Education</Label>
                {currentAttorney.education?.map((edu, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input 
                      value={edu}
                      onChange={(e) => handleEducationChange(index, e.target.value)}
                      placeholder="e.g., J.D., Harvard Law School"
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => removeEducationField(index)}
                      disabled={currentAttorney.education?.length === 1}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addEducationField}
                  className="gap-2"
                >
                  <Plus size={16} />
                  Add Education
                </Button>
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
                  {isSubmitting ? 'Saving...' : currentAttorney.id ? 'Update Attorney' : 'Add Attorney'}
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
            <p>Are you sure you want to delete this attorney? This action cannot be undone.</p>
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
              <DialogTitle>Seed Initial Attorney Data</DialogTitle>
            </DialogHeader>
            <p>
              This will populate your Supabase database with sample attorney data. 
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

export default AdminAttorneys;
