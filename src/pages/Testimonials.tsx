
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { useTestimonial } from "../contexts/TestimonialContext";
import { Star, Quote } from "lucide-react";
import { TestimonialsShowcase } from "@/components/ui/TestimonialsShowcase";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";

const Testimonials = () => {
  const { testimonials } = useTestimonial();

  useEffect(() => {
    document.title = "Client Testimonials | SleekLegal";
    window.scrollTo(0, 0);
  }, []);

  // Function to generate star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  // Format testimonials for HoverEffect component
  const formattedTestimonials = testimonials.filter(t => t.featured).map(testimonial => ({
    title: testimonial.name,
    description: `"${testimonial.content}"`,
    link: "#" // We're not navigating anywhere but keeping the structure
  }));

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div 
        className="pt-24 pb-16 bg-law-charcoal text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/testimonials">Testimonials</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Client Testimonials
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Hear from our clients about their experiences working with SleekLegal.
          </motion.p>
        </div>
      </motion.div>
      
      {/* Modern testimonial showcase */}
      <TestimonialsShowcase />
      
      <section className="py-16">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-law-charcoal">What Our Clients Say</h2>
            <p className="text-law-gray">
              We value the relationships we build with our clients. Here's what they have to say about working with SleekLegal.
            </p>
          </motion.div>
          
          {/* Featured testimonials with hover effect */}
          <div className="mb-16">
            <HoverEffect items={formattedTestimonials} />
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-law-charcoal text-center mb-8">More Client Feedback</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.filter(t => !t.featured).map((testimonial) => (
                <motion.div 
                  key={testimonial.id} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-law-gray text-sm italic mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    {testimonial.imageUrl && (
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover mr-3" 
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-law-charcoal">{testimonial.name}</h4>
                      {testimonial.caseType && (
                        <p className="text-xs text-law-gold">{testimonial.caseType}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-law-offwhite">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-law-charcoal">Share Your Experience</h2>
            <p className="text-law-gray mb-8">
              We value feedback from our clients. If you've worked with SleekLegal, we'd love to hear about your experience.
            </p>
            <motion.a 
              href="#"
              className="btn btn-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit a Testimonial
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default Testimonials;
