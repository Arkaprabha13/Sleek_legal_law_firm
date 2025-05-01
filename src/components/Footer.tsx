
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-law-charcoal text-white pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6">
              <span className="text-white">Sleek</span>
              <span className="text-law-gold">Legal</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Providing exceptional legal services with a personalized approach for over 25 years.
            </p>
            <div className="flex space-x-4">
              {/* <SocialLink icon={<Facebook size={20} />} href="#" /> */}
              {/* <SocialLink icon={<Twitter size={20} />} href="" /> */}
              {/* <SocialLink icon={<Instagram size={20} />} href="#" /> */}
              <SocialLink icon={<Linkedin size={20} />} href="https://in.linkedin.com/in/arkaprabhabanerjee13" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              <FooterLink href="#practice-areas">Corporate Law</FooterLink>
              <FooterLink href="#practice-areas">Litigation</FooterLink>
              <FooterLink href="#practice-areas">Family Law</FooterLink>
              <FooterLink href="#practice-areas">Real Estate</FooterLink>
              <FooterLink href="#practice-areas">Criminal Defense</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#attorneys">Our Team</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-3">
              <p>Kalyani 741235</p>
              {/* <p>Legal City, LC 12345</p> */}
              <p>Phone: 8170839799</p>
              <p>Email: arkaofficial13@gmail.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SleekLegal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-law-gold transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-400 hover:text-law-gold transition-colors"
    >
      {children}
    </a>
  </li>
);

export default Footer;
