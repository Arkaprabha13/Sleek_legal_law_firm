
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactInfo: React.FC<ContactInfo> = ({ icon, title, content }) => (
  <motion.div 
    className="flex"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="mr-4 mt-1"
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon}
    </motion.div>
    <div>
      <h4 className="font-medium text-law-charcoal">{title}</h4>
      <p className="text-law-gray">{content}</p>
    </div>
  </motion.div>
);

const AnimatedContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      
      // Reset submitted message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const inputClasses = (field: string) => `
    w-full px-4 py-3 border rounded-md 
    focus:outline-none focus:ring-2 
    transition-all duration-300
    ${focused === field 
      ? 'border-law-gold ring-law-gold/30 shadow-gold' 
      : 'border-gray-300 focus:ring-law-gold'
    }
  `;

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h5 className="text-law-gold font-medium mb-2">GET IN TOUCH</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-law-charcoal mb-6">
            Contact Us
          </h2>
          <p className="text-law-gray">
            Have a legal question or need assistance? Our team is ready to help.
            Contact us today to schedule your consultation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div 
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-law-charcoal mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<MapPin className="text-law-gold" />}
                  title="Address"
                  content="123 Law Street, Suite 500, Legal City, LC 12345"
                />
                <ContactInfo 
                  icon={<Phone className="text-law-gold" />}
                  title="Phone"
                  content="+1 (555) 123-4567"
                />
                <ContactInfo 
                  icon={<Mail className="text-law-gold" />}
                  title="Email"
                  content="info@sleeklegal.com"
                />
                <ContactInfo 
                  icon={<Clock className="text-law-gold" />}
                  title="Office Hours"
                  content="Monday - Friday: 9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            <motion.div 
              className="bg-law-charcoal p-6 rounded-lg text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h4 className="text-xl font-semibold mb-4">Free Consultation</h4>
              <p className="text-gray-300 mb-4">
                Schedule your free 30-minute consultation with one of our attorneys to 
                discuss your legal needs and how we can help.
              </p>
              <motion.a 
                href="tel:+15551234567" 
                className="btn bg-law-gold text-white hover:bg-law-lightgold hover:text-law-charcoal inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="md:col-span-3 bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-law-charcoal mb-6">
              Send Us a Message
            </h3>
            
            {submitted ? (
              <motion.div 
                className="bg-green-50 text-green-700 p-4 rounded-md mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Your message has been sent successfully! We'll get back to you shortly.
              </motion.div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className="block text-law-darkgray mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={inputClasses('name')}
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className="block text-law-darkgray mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={inputClasses('email')}
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="phone" className="block text-law-darkgray mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={inputClasses('phone')}
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="service" className="block text-law-darkgray mb-2">
                    Service Needed
                  </label>
                  <motion.select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => handleFocus('service')}
                    onBlur={handleBlur}
                    className={inputClasses('service')}
                    required
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select a service</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Litigation">Litigation</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                  </motion.select>
                </motion.div>
              </div>
              
              <motion.div 
                className="mb-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="message" className="block text-law-darkgray mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={inputClasses('message')}
                  required
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div 
                    className="flex items-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </motion.div>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedContactForm;
