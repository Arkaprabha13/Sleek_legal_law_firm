
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h5 className="text-law-gold font-medium mb-2">GET IN TOUCH</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-law-charcoal mb-6">
            Contact Us
          </h2>
          <p className="text-law-gray">
            Have a legal question or need assistance? Our team is ready to help.
            Contact us today to schedule your consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-law-charcoal mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<MapPin className="text-law-gold" />}
                  title="Address"
                  content="Kalyani 741235, India"
                />
                <ContactInfo 
                  icon={<Phone className="text-law-gold" />}
                  title="Phone"
                  content="+91 8170839799"
                />
                <ContactInfo 
                  icon={<Mail className="text-law-gold" />}
                  title="Email"
                  content="arkaofficial13@gmail.com"
                />
                <ContactInfo 
                  icon={<Clock className="text-law-gold" />}
                  title="Office Hours"
                  content="Monday - Friday: 9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            <div className="bg-law-charcoal p-6 rounded-lg text-white">
              <h4 className="text-xl font-semibold mb-4">Free Consultation</h4>
              <p className="text-gray-300 mb-4">
                Schedule your free 30-minute consultation with one of our attorneys to 
                discuss your legal needs and how we can help.
              </p>
              <a href="tel:+8170839799" className="btn bg-law-gold text-white hover:bg-law-lightgold hover:text-law-charcoal">
                Call Now
              </a>
            </div>
          </div>

          <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-law-charcoal mb-6">
              Send Us a Message
            </h3>
            
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                Your message has been sent successfully! We'll get back to you shortly.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-law-darkgray mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-law-darkgray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-gold"
                    required
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-law-darkgray mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-gold"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-law-darkgray mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-gold"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Litigation">Litigation</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-law-darkgray mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-gold"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ 
  icon, 
  title, 
  content 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string;
}) => (
  <div className="flex">
    <div className="mr-4 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium text-law-charcoal">{title}</h4>
      <p className="text-law-gray">{content}</p>
    </div>
  </div>
);

export default Contact;
