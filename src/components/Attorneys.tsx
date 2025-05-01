
import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";
import GlowingBackground from "./ui/GlowingBackground";
import ShinyText from "./ui/ShinyText";
import { Button } from "./ui/button";
import FloatingShape from "./ui/FloatingShape";

const Attorneys = () => {
  const attorneys = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Managing Partner",
      specialty: "Corporate Law",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      email: "sarah.johnson@sleeklegal.com",
      phone: "+1 (555) 123-4567",
      linkedin: "#",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Senior Partner",
      specialty: "Litigation",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
      email: "michael.chen@sleeklegal.com",
      phone: "+1 (555) 987-6543",
      linkedin: "#",
    },
    {
      id: 3,
      name: "Jessica Rodriguez",
      position: "Partner",
      specialty: "Family Law",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80",
      email: "jessica.rodriguez@sleeklegal.com",
      phone: "+1 (555) 456-7890",
      linkedin: "#",
    },
    {
      id: 4,
      name: "David Wilson",
      position: "Associate",
      specialty: "Real Estate",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
      email: "david.wilson@sleeklegal.com",
      phone: "+1 (555) 789-0123",
      linkedin: "#",
    },
  ];

  return (
    <section id="attorneys" className="relative section py-24 overflow-hidden bg-law-offwhite">
      {/* Abstract shapes */}
      <FloatingShape 
        type="circle" 
        size={200} 
        top="15%" 
        left="8%" 
        color="rgba(212, 175, 55, 0.1)" 
        blur={40}
        speed={15}
      />
      <FloatingShape 
        type="circle" 
        size={160} 
        top="75%" 
        left="85%" 
        color="rgba(212, 175, 55, 0.08)" 
        blur={30}
        speed={22}
      />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-law-gold"></div>
              <h5 className="text-law-gold font-medium tracking-wider px-4">OUR TEAM</h5>
              <div className="h-px w-10 bg-law-gold"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-charcoal mb-6 font-playfair">
            Meet Our <span className="text-gradient-gold">Attorneys</span>
          </h2>
          <p className="text-law-gray text-lg">
            Our team of dedicated legal professionals brings decades of combined experience
            and a commitment to excellence in every case.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {attorneys.map((attorney, index) => (
            <div 
              key={attorney.id} 
              className="bg-white rounded-lg overflow-hidden shadow-elegant group card-3d"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={attorney.imageUrl}
                  alt={attorney.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex space-x-3 text-white">
                      <a href={`mailto:${attorney.email}`} className="hover:text-law-gold transition-colors p-2 bg-black/30 rounded-full">
                        <Mail size={18} />
                      </a>
                      <a href={`tel:${attorney.phone}`} className="hover:text-law-gold transition-colors p-2 bg-black/30 rounded-full">
                        <Phone size={18} />
                      </a>
                      <a href={attorney.linkedin} className="hover:text-law-gold transition-colors p-2 bg-black/30 rounded-full">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <GlowingBackground 
                className="p-6" 
                glowColor="rgba(212, 175, 55, 0.05)"
                intensity="low"
              >
                <h3 className="text-xl font-bold text-law-charcoal group-hover:text-law-gold transition-colors">
                  {attorney.name}
                </h3>
                <p className="text-law-gold mb-1">{attorney.position}</p>
                <p className="text-law-gray text-sm">{attorney.specialty}</p>
                
                <div className="mt-3 h-0.5 w-0 bg-law-gold group-hover:w-1/3 transition-all duration-500"></div>
              </GlowingBackground>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="gold" className="font-medium">
            View All Attorneys
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Attorneys;
