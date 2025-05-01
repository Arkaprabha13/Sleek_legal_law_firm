
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  content: string;
  imageUrl?: string;
  rating: number;
  date: string;
  caseType?: string;
  featured?: boolean;
}

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  getTestimonial: (id: string) => Testimonial | undefined;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

// Sample testimonial data
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    position: 'CEO, Tech Innovations',
    content: 'The corporate legal team at SleekLegal handled our merger with exceptional professionalism. Their attention to detail and strategic approach saved us from potential complications and ensured a smooth transition. I highly recommend their services to any business navigating complex legal matters.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    rating: 5,
    date: '2023-04-15',
    caseType: 'Corporate Law',
    featured: true
  },
  {
    id: '2',
    name: 'Emily Richardson',
    position: 'Small Business Owner',
    content: 'When I needed help with my small business formation, SleekLegal provided clear guidance through every step of the process. They explained complex legal concepts in terms I could understand and helped me make informed decisions. Their expertise was invaluable in getting my business off to a strong start.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
    rating: 5,
    date: '2023-03-22',
    caseType: 'Business Formation',
    featured: true
  },
  {
    id: '3',
    name: 'Robert Johnson',
    content: 'After my accident, I was overwhelmed with medical bills and insurance claims. The personal injury team at SleekLegal took over and handled everything professionally. They fought for fair compensation and kept me informed throughout the process. I couldn\'t have asked for better representation during such a difficult time.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    rating: 4,
    date: '2023-02-10',
    caseType: 'Personal Injury'
  },
  {
    id: '4',
    name: 'Maria Gonzalez',
    content: 'Jessica Rodriguez helped me navigate a challenging custody dispute with compassion and expertise. She always made me feel that my case was a priority and fought tirelessly for my children\'s best interests. The outcome exceeded my expectations, and I\'m grateful for her dedication.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
    rating: 5,
    date: '2023-01-05',
    caseType: 'Family Law'
  }
];

export const TestimonialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage or use initial data
    const storedTestimonials = localStorage.getItem('testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      setTestimonials(initialTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(initialTestimonials));
    }
  }, []);

  const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedTestimonials = [...testimonials, newTestimonial];
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    toast.success('Testimonial added successfully!');
  };

  const updateTestimonial = (testimonial: Testimonial) => {
    const updatedTestimonials = testimonials.map(t => t.id === testimonial.id ? testimonial : t);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    toast.success('Testimonial updated successfully!');
  };

  const deleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    toast.success('Testimonial deleted successfully!');
  };

  const getTestimonial = (id: string) => {
    return testimonials.find(testimonial => testimonial.id === id);
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial, updateTestimonial, deleteTestimonial, getTestimonial }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonial = (): TestimonialContextType => {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonial must be used within a TestimonialProvider');
  }
  return context;
};
