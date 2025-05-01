
import React, { useState } from "react";
import { GavelIcon, ScaleIcon, BuildingIcon, HomeIcon, HeartPulseIcon, ShieldIcon, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import ShinyText from "./ui/ShinyText";
import FloatingShape from "./ui/FloatingShape";

const PracticeAreas = () => {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);

  const practiceAreas = [
    {
      id: 1,
      title: "Corporate Law",
      description: "Expert guidance on all aspects of business law, from formation to governance and compliance.",
      icon: <BuildingIcon className="h-10 w-10 text-law-gold" />,
    },
    {
      id: 2,
      title: "Litigation",
      description: "Skilled representation in civil and commercial disputes, with a focus on efficient resolution.",
      icon: <GavelIcon className="h-10 w-10 text-law-gold" />,
    },
    {
      id: 3,
      title: "Family Law",
      description: "Compassionate counsel for divorce, custody, and other sensitive family legal matters.",
      icon: <HeartPulseIcon className="h-10 w-10 text-law-gold" />,
    },
    {
      id: 4,
      title: "Real Estate",
      description: "Comprehensive services for property transactions, development, and dispute resolution.",
      icon: <HomeIcon className="h-10 w-10 text-law-gold" />,
    },
    {
      id: 5,
      title: "Criminal Defense",
      description: "Vigorous defense for individuals facing criminal charges, with a commitment to protecting rights.",
      icon: <ShieldIcon className="h-10 w-10 text-law-gold" />,
    },
    {
      id: 6,
      title: "Intellectual Property",
      description: "Protection for your innovations and creative works through patents, trademarks, and copyrights.",
      icon: <ScaleIcon className="h-10 w-10 text-law-gold" />,
    },
  ];

  return (
    <section id="practice-areas" className="relative section py-24 overflow-hidden">
      {/* Abstract shapes */}
      <FloatingShape 
        type="circle" 
        size={180} 
        top="10%" 
        left="5%" 
        color="rgba(212, 175, 55, 0.07)" 
        blur={35}
        speed={20}
      />
      <FloatingShape 
        type="circle" 
        size={150} 
        top="70%" 
        left="90%" 
        color="rgba(212, 175, 55, 0.08)" 
        blur={30}
        speed={25}
      />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-law-gold"></div>
              <h5 className="text-law-gold font-medium tracking-wider px-4">OUR EXPERTISE</h5>
              <div className="h-px w-10 bg-law-gold"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-charcoal mb-6 font-playfair">
            Practice <span className="text-gradient-gold">Areas</span>
          </h2>
          <p className="text-law-gray text-lg">
            SleekLegal offers comprehensive legal services across various practice areas, 
            providing expert counsel tailored to your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <div 
              key={area.id} 
              className={`glass p-8 rounded-lg shadow-elegant border border-gray-100 hover-lift ${
                hoveredArea === area.id ? 'shadow-gold' : ''
              }`}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg bg-law-gold/10 transition-all duration-500 ${
                  hoveredArea === area.id ? 'bg-law-gold/20' : ''
                }`}>
                  {area.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-law-charcoal mb-3">
                {area.title}
                {hoveredArea === area.id && (
                  <div className="h-1 w-10 bg-law-gold mt-2"></div>
                )}
              </h3>
              
              <p className="text-law-gray mb-6">{area.description}</p>
              
              <a 
                href="#contact" 
                className="group inline-flex items-center text-law-gold font-medium hover:text-law-charcoal transition-colors"
              >
                Learn More
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="elegant" className="font-medium">
            View All Services <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
