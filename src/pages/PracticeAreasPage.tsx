
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { Link } from "react-router-dom";
import { Building2, Users, Scale, Home, Briefcase, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const practiceAreas = [
  {
    id: 'corporate',
    title: 'Corporate Law',
    description: 'From business formation to complex mergers and acquisitions, our corporate team provides comprehensive legal services to businesses of all sizes.',
    icon: Building2,
    details: [
      'Business Formation & Structuring',
      'Mergers & Acquisitions',
      'Corporate Governance',
      'Contract Drafting & Review',
      'Compliance & Regulatory Matters',
      'Business Dissolution'
    ]
  },
  {
    id: 'family',
    title: 'Family Law',
    description: 'Our compassionate family law attorneys guide clients through emotionally challenging matters with sensitivity and professional expertise.',
    icon: Users,
    details: [
      'Divorce & Separation',
      'Child Custody & Support',
      'Alimony & Spousal Support',
      'Adoption',
      'Prenuptial & Postnuptial Agreements',
      'Domestic Violence Protection'
    ]
  },
  {
    id: 'litigation',
    title: 'Litigation',
    description: 'When disputes require court intervention, our skilled litigators provide strategic advocacy focused on achieving favorable outcomes.',
    icon: Scale,
    details: [
      'Civil Litigation',
      'Commercial Disputes',
      'Contract Disputes',
      'Employment Litigation',
      'Insurance Defense',
      'Alternative Dispute Resolution'
    ]
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: "Whether you're buying, selling, leasing, or developing property, our real estate attorneys can navigate complex transactions and disputes.",
    icon: Home,
    details: [
      'Residential & Commercial Transactions',
      'Title Examinations',
      'Property Development',
      'Leasing Agreements',
      'Zoning & Land Use',
      'Real Estate Litigation'
    ]
  },
  {
    id: 'employment',
    title: 'Employment Law',
    description: 'We represent both employers and employees in workplace matters, providing guidance on compliance and resolving disputes.',
    icon: Briefcase,
    details: [
      'Employment Contracts',
      'Workplace Discrimination',
      'Harassment Claims',
      'Wage & Hour Disputes',
      'Wrongful Termination',
      'Non-Compete Agreements'
    ]
  },
  {
    id: 'estate',
    title: 'Estate Planning',
    description: 'Our estate planning services help clients protect their assets, provide for loved ones, and create a lasting legacy.',
    icon: FileText,
    details: [
      'Wills & Trusts',
      'Powers of Attorney',
      'Healthcare Directives',
      'Estate & Trust Administration',
      'Probate',
      'Business Succession Planning'
    ]
  }
];

const PracticeAreasPage = () => {
  useEffect(() => {
    document.title = "Practice Areas | SleekLegal";
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
                <BreadcrumbLink href="/practice-areas">Practice Areas</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Our Practice Areas
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Comprehensive legal services tailored to meet your specific needs across various domains of law.
          </motion.p>
        </div>
      </motion.div>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-law-charcoal">How We Can Help</h2>
            <p className="text-law-gray">
              At SleekLegal, we offer expertise across a wide range of legal disciplines. Our attorneys specialize in various practice areas, allowing us to provide comprehensive services to individuals and businesses alike.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div 
                key={area.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="p-6">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-law-gold/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <area.icon className="text-law-gold" size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-law-charcoal">{area.title}</h3>
                  <p className="text-law-gray mb-4">{area.description}</p>
                  <div className="mt-6">
                    <h4 className="font-bold text-sm text-law-darkgray mb-3">Our Services Include:</h4>
                    <ul className="space-y-2">
                      {area.details.map((item, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-law-gold mr-2">•</span>
                          <span className="text-sm text-law-gray">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Link to="/contact" className="text-law-gold font-medium hover:text-law-charcoal transition-colors text-sm">
                        Contact Us About {area.title} →
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm text-law-gray">
                          Get in touch with our {area.title} specialists today to discuss your legal needs and how we can assist you.
                        </p>
                        <div className="text-xs text-law-gold">
                          Click to schedule a consultation
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-law-offwhite">
        <div className="container">
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Need Legal Assistance?</h2>
                <p className="text-law-gray mb-6">
                  Our experienced attorneys are ready to help you navigate your legal challenges. Schedule a consultation to discuss your specific situation and learn how we can assist you.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="btn btn-gold self-start"
                  >
                    Book a Consultation
                  </Link>
                </motion.div>
              </div>
              <div className="bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80" 
                  alt="Consultation with attorney"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default PracticeAreasPage;
