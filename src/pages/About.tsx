
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";

const About = () => {
  useEffect(() => {
    document.title = "About Us | SleekLegal";
    window.scrollTo(0, 0);
  }, []);

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
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg max-w-3xl opacity-90">
            Learn about our journey, values, and commitment to excellence in legal services.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Our History</h2>
              <p className="mb-4 text-law-gray">
                SleekLegal was founded in 2005 by a group of attorneys who shared a vision: to create a law firm that combined legal excellence with a client-first approach. What began as a small practice with just three attorneys has grown into a respected firm with a team of legal professionals serving clients across multiple practice areas.
              </p>
              <p className="mb-4 text-law-gray">
                Over the years, we've built a reputation for providing exceptional legal representation while maintaining the personalized attention that clients deserve. Our growth has been driven not by aggressive expansion, but by our commitment to quality service and positive outcomes for our clients.
              </p>
              <p className="text-law-gray">
                Today, SleekLegal stands as a testament to that original vision, continuing to evolve while staying true to our founding principles.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560241804-02b7b1bc9d55?auto=format&fit=crop&q=80" 
                alt="SleekLegal office"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-law-offwhite">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Our Core Values</h2>
            <p className="text-law-gray">
              These principles guide our practice and define our approach to serving our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-law-gold/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-law-gold text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-law-charcoal">Integrity</h3>
              <p className="text-law-gray">
                We uphold the highest ethical standards in all our dealings. Our commitment to honesty and transparency builds trust with our clients and respects the legal profession.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-law-gold/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-law-gold text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-law-charcoal">Excellence</h3>
              <p className="text-law-gray">
                We strive for excellence in every aspect of our work. From meticulous legal research to compelling case presentation, we pursue the highest quality in all we do.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-law-gold/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-law-gold text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-law-charcoal">Client Focus</h3>
              <p className="text-law-gray">
                Our clients are at the center of everything we do. We listen carefully to understand their needs and concerns, providing personalized service and accessible communication.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80" 
                alt="Team member"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80" 
                alt="Team meeting"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80" 
                alt="Legal consultation"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" 
                alt="Client meeting"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h5 className="text-law-gold font-medium mb-2">WHY CHOOSE US</h5>
              <h2 className="text-3xl font-bold mb-6 text-law-charcoal">Our Approach to Legal Practice</h2>
              <p className="mb-4 text-law-gray">
                At SleekLegal, we believe that effective legal representation requires more than just knowledge of the law—it requires an understanding of each client's unique situation and goals.
              </p>
              <p className="mb-4 text-law-gray">
                Unlike many traditional law firms, we take a collaborative approach, working closely with our clients throughout the legal process. We believe in keeping our clients informed and involved, explaining complex legal concepts in clear, understandable terms.
              </p>
              <p className="text-law-gray">
                We combine our legal expertise with a practical, solution-oriented mindset. While we're always prepared to advocate aggressively when necessary, we also recognize the value of strategic negotiation and creative problem-solving.
              </p>
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

export default About;
