
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import AnimatedContactForm from "@/components/AnimatedContactForm";
import { motion } from "framer-motion";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Us | SleekLegal";
    window.scrollTo(0, 0);
  }, []);

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
                <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Schedule a consultation or reach out with any questions you may have.
          </motion.p>
        </div>
      </motion.div>
      
      <AnimatedContactForm />
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
