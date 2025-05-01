
import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PinContainer } from "@/components/ui/3d-pin";
import VariableProximity from "@/components/ui/VariableProximity";
import "@/components/ui/VariableProximity.css";
import GlowingBackground from "./ui/GlowingBackground";
import FloatingShape from "./ui/FloatingShape";
import ShinyText from "./ui/ShinyText";
import { Button } from "./ui/button";

const Hero = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const elements = sectionRef.current.querySelectorAll('.parallax');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || "0.2");
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-law-offwhite to-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 z-0"></div>
      <div className="absolute inset-0 bg-texture-paper opacity-30 z-0"></div>
      
      {/* Abstract shapes */}
      <FloatingShape 
        type="circle" 
        size={150} 
        top="10%" 
        left="5%" 
        color="rgba(212, 175, 55, 0.15)" 
        blur={20}
        speed={15}
      />
      <FloatingShape 
        type="square" 
        size={80} 
        top="20%" 
        left="80%" 
        color="rgba(212, 175, 55, 0.1)" 
        blur={15}
        speed={25}
        delay={2}
      />
      <FloatingShape 
        type="polygon" 
        size={120} 
        top="70%" 
        left="15%" 
        color="rgba(51, 51, 51, 0.08)" 
        blur={10}
        speed={20}
        delay={1}
      />
      <FloatingShape 
        type="circle" 
        size={200} 
        top="75%" 
        left="85%" 
        color="rgba(212, 175, 55, 0.08)" 
        blur={25}
        speed={30}
        delay={3}
      />
      
      <GlowingBackground 
        className="container relative z-10"
        glowColor="rgba(212, 175, 55, 0.15)"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h5 className="text-law-gold font-medium tracking-wider mb-3 flex items-center">
              <span className="mr-2 h-px w-5 bg-law-gold"></span>
              EXPERT LEGAL REPRESENTATION
            </h5>
            
            <div ref={headingRef} style={{ position: 'relative' }} className="mb-8">
              <VariableProximity
                label="Expert Legal Services for a Complex World"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-law-charcoal"
                fromFontVariationSettings="'wght' 600"
                toFontVariationSettings="'wght' 900"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
            </div>
            
            <p className="text-lg text-law-gray max-w-lg mb-8 leading-relaxed">
              We provide <ShinyText>exceptional legal services</ShinyText> with a personalized approach, ensuring your legal needs are met with professionalism and expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" className="font-medium">
                Get Your Free Consultation
              </Button>
              <Button variant="elegant" size="xl" className="group font-medium">
                Explore Our Services 
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="mt-12">
              <div className="flex items-center justify-between max-w-lg p-4 bg-white/80 rounded-lg backdrop-blur-sm shadow-elegant border border-gray-100">
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-law-charcoal">25+</div>
                  <div className="text-sm text-law-gray mt-1">Years Experience</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-law-charcoal">98%</div>
                  <div className="text-sm text-law-gray mt-1">Success Rate</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-law-charcoal">2.4k+</div>
                  <div className="text-sm text-law-gray mt-1">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block animate-fade-in-right relative h-[450px]">
            <div className="parallax" data-speed="-0.15">
              <div className="absolute w-48 h-48 bg-gradient-gold-radial blur-3xl opacity-30 top-0 right-0 z-0"></div>
            </div>
            <div className="parallax" data-speed="0.1">
              <PinContainer
                title="Client Testimonial"
                containerClassName="relative w-full h-full"
                className="w-full"
              >
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-elegant w-full transition-all duration-300 hover:shadow-gold border border-gray-100">
                  <div className="mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-law-charcoal text-2xl font-bold mb-6 font-playfair">Exceptional Service & Results</h3>
                  <div className="text-law-gray italic mb-6 leading-relaxed">
                    "SleekLegal provided exceptional guidance through my complex corporate litigation case. Their expertise and dedication led to a favorable outcome that exceeded my expectations."
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-white font-bold shadow-gold">
                      JD
                    </div>
                    <div className="ml-4">
                      <div className="text-law-charcoal font-medium">John Doe</div>
                      <div className="text-law-gray text-sm">CEO, Tech Innovations Inc.</div>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </div>
          </div>
        </div>
      </GlowingBackground>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-0"></div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 animate-bounce-slow">
        <span className="text-sm text-law-gray mb-2">Scroll Down</span>
        <svg className="w-6 h-6 text-law-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
