
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import PracticeAreas from "../components/PracticeAreas";
import Attorneys from "../components/Attorneys";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { TestimonialsShowcase } from "@/components/ui/TestimonialsShowcase";
import AnimatedContactForm from "@/components/AnimatedContactForm";
import FAQ from "@/components/FAQ";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "SleekLegal - Expert Legal Services";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <PracticeAreas />
      <Attorneys />
      <TestimonialsShowcase 
        compact 
        title="What Our Clients Say"
        subtitle="Our client testimonials reflect our commitment to excellence and client satisfaction in all legal matters."
      />
      <FAQ />
      <AnimatedContactForm />
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default Index;
