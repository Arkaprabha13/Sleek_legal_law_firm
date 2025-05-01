
import React, { useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import ShinyText from "./ui/ShinyText";
import GlowingBackground from "./ui/GlowingBackground";
import FloatingShape from "./ui/FloatingShape";
import { Button } from "./ui/button";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const rect = sectionRef.current.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const elements = sectionRef.current.querySelectorAll('.parallax');
        
        elements.forEach((el) => {
          const element = el as HTMLElement;
          const speed = parseFloat(element.dataset.speed || "0.2");
          const yPos = (rect.top - scrollY) * speed;
          element.style.transform = `translateY(${yPos}px)`;
        });
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-law-offwhite z-0"></div>
      <div className="absolute inset-0 bg-texture-paper opacity-20 z-0"></div>
      
      {/* Abstract shapes */}
      <FloatingShape 
        type="circle" 
        size={200} 
        top="20%" 
        left="10%" 
        color="rgba(212, 175, 55, 0.08)" 
        blur={30}
      />
      <FloatingShape 
        type="square" 
        size={120} 
        top="60%" 
        left="85%" 
        color="rgba(212, 175, 55, 0.1)" 
        blur={20}
      />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block mb-2">
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-law-gold"></div>
              <h5 className="text-law-gold font-medium tracking-wider px-4">ABOUT OUR FIRM</h5>
              <div className="h-px w-10 bg-law-gold"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-law-charcoal mb-6 font-playfair">
            A Modern Law Firm With <span className="text-gradient-gold">Traditional Values</span>
          </h2>
          <p className="text-law-gray text-lg">
            Founded on principles of integrity, excellence, and client focus, SleekLegal has 
            evolved into a premier legal practice while maintaining our commitment to personalized service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="parallax" data-speed="0.1">
              <div className="aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-lg shadow-elegant overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-law-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-2xl mb-2">Our Legacy</h3>
                  <p className="text-white/90">Building trust through exceptional service since 1998</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-law-gold/10 rounded-br-lg z-[-1]"></div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-law-gold/30"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-law-gold/30"></div>
          </div>

          <div>
            <div className="parallax" data-speed="-0.05">
              <GlowingBackground
                glowColor="rgba(212, 175, 55, 0.1)"
                intensity="low"
                className="p-6 rounded-lg"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-law-charcoal mb-6 font-playfair">
                  Our Commitment to <ShinyText color="text-law-gold">Excellence</ShinyText>
                </h3>
                
                <p className="text-law-gray mb-8 leading-relaxed">
                  At SleekLegal, we believe that exceptional legal representation begins with a deep understanding 
                  of our clients' needs and objectives. Our team of experienced attorneys combines legal expertise 
                  with a client-focused approach to deliver tailored solutions for each unique situation.
                </p>
                
                <div className="space-y-5">
                  <ValuePoint>We listen carefully to understand your unique needs</ValuePoint>
                  <ValuePoint>We craft customized legal strategies for optimal outcomes</ValuePoint>
                  <ValuePoint>We communicate clearly and keep you informed</ValuePoint>
                  <ValuePoint>We are committed to excellence and ethical practice</ValuePoint>
                </div>
                
                <div className="mt-10">
                  <Button variant="gold" className="font-medium">
                    Learn More About Our Approach
                  </Button>
                </div>
              </GlowingBackground>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValuePoint = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start p-3 hover:bg-white/50 rounded-lg transition-colors duration-300 group">
    <div className="mr-4 mt-1 bg-law-gold/10 rounded-full p-1 group-hover:bg-law-gold/20 transition-colors duration-300">
      <CheckCircle className="text-law-gold" size={18} />
    </div>
    <p className="text-law-darkgray">{children}</p>
  </div>
);

export default About;
