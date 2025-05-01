
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { useAttorney } from "../contexts/AttorneyContext";
import { Mail, Phone, Linkedin, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AttorneysPage = () => {
  const { attorneys, loading } = useAttorney();
  const [expandedAttorney, setExpandedAttorney] = React.useState<string | null>(null);

  useEffect(() => {
    document.title = "Our Attorneys | SleekLegal";
    window.scrollTo(0, 0);
  }, []);

  const toggleAttorneyDetails = (id: string) => {
    if (expandedAttorney === id) {
      setExpandedAttorney(null);
    } else {
      setExpandedAttorney(id);
    }
  };

  // Loading skeletons
  const AttorneySkeletons = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="aspect-[3/4]">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-law-charcoal text-white">
        <div className="container">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/attorneys">Attorneys</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Legal Team</h1>
          <p className="text-lg max-w-3xl opacity-90">
            Meet our team of dedicated legal professionals committed to providing exceptional representation.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Expert Legal Representation</h2>
            <p className="text-law-gray">
              Our attorneys bring decades of combined experience across various practice areas. 
              Each member of our team is committed to providing personalized, strategic legal services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <AttorneySkeletons />
            ) : (
              attorneys.map((attorney) => (
                <div 
                  key={attorney.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={attorney.imageUrl}
                      alt={attorney.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex space-x-3 text-white">
                          <a href={`mailto:${attorney.email}`} className="hover:text-law-gold transition-colors">
                            <Mail size={20} />
                          </a>
                          <a href={`tel:${attorney.phone}`} className="hover:text-law-gold transition-colors">
                            <Phone size={20} />
                          </a>
                          <a href={attorney.linkedin} className="hover:text-law-gold transition-colors">
                            <Linkedin size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-law-charcoal">{attorney.name}</h3>
                    <p className="text-law-gold mb-1">{attorney.position}</p>
                    <p className="text-law-gray text-sm mb-4">{attorney.specialty}</p>
                    
                    <button 
                      onClick={() => toggleAttorneyDetails(attorney.id)}
                      className="flex items-center text-sm text-law-charcoal hover:text-law-gold transition-colors font-medium"
                    >
                      {expandedAttorney === attorney.id ? 'Hide Details' : 'View Details'}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform ${expandedAttorney === attorney.id ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {expandedAttorney === attorney.id && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <div>
                          <h4 className="text-sm font-bold text-law-charcoal mb-2">About</h4>
                          <p className="text-sm text-law-gray">{attorney.bio}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold text-law-charcoal mb-2">Education</h4>
                          <ul className="space-y-1">
                            {attorney.education.map((edu, index) => (
                              <li key={index} className="text-sm text-law-gray">• {edu}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold text-law-charcoal mb-2">Contact</h4>
                          <p className="text-sm text-law-gray">Email: <a href={`mailto:${attorney.email}`} className="text-law-gold hover:underline">{attorney.email}</a></p>
                          <p className="text-sm text-law-gray">Phone: <a href={`tel:${attorney.phone}`} className="text-law-gold hover:underline">{attorney.phone}</a></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-law-offwhite">
        <div className="container">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Work With Our Team</h2>
                <p className="text-law-gray mb-6">
                  Our attorneys are ready to assist you with your legal needs. Schedule a consultation today to discuss your case with a member of our team.
                </p>
                <a 
                  href="/contact" 
                  className="btn btn-gold self-start"
                >
                  Schedule a Consultation
                </a>
              </div>
              <div className="bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80" 
                  alt="Legal team meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default AttorneysPage;
