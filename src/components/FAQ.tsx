
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import GlowingBackground from "./ui/GlowingBackground";

const faqItems = [
  {
    question: "What areas of law does your firm specialize in?",
    answer: "Our law firm specializes in corporate law, intellectual property, personal injury, family law, real estate, criminal defense, and immigration law. With our team of experienced attorneys, we provide comprehensive legal services tailored to your specific needs."
  },
  {
    question: "How do I schedule a consultation with an attorney?",
    answer: "Scheduling a consultation is easy. You can request an appointment through our website's contact form, call our office directly, or email us with your inquiry. We offer both in-person and virtual consultations to accommodate your preferences and schedule."
  },
  {
    question: "What should I expect during my initial consultation?",
    answer: "During your initial consultation, we'll discuss your legal concerns, evaluate your case, and provide preliminary guidance. This meeting helps us understand your situation and determine how we can best assist you. We recommend bringing any relevant documents to maximize the value of this session."
  },
  {
    question: "What are your fee structures?",
    answer: "Our fee structures vary depending on the type of legal service. We offer hourly rates, flat fees for specific services, contingency arrangements for qualifying cases, and retainer options. During your initial consultation, we'll discuss the most appropriate fee structure for your specific needs."
  },
  {
    question: "How long will my legal matter take to resolve?",
    answer: "The timeline for resolving legal matters varies significantly based on complexity, court schedules, and other parties involved. Some straightforward matters may resolve in weeks, while complex litigation could take months or years. We'll provide you with a realistic timeframe based on your specific circumstances and keep you informed throughout the process."
  },
  {
    question: "Do you offer remote legal services?",
    answer: "Yes, we offer comprehensive remote legal services including virtual consultations, electronic document review and signing, and video conference representation for certain proceedings. Our secure digital platforms ensure confidentiality while providing convenient access to legal expertise regardless of your location."
  }
];

const FAQ = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const handleValueChange = (value: string) => {
    setExpandedItem(value === expandedItem ? null : value);
  };

  return (
    <section id="faq" className="section bg-law-offwhite">
      <GlowingBackground 
        className="container" 
        glowColor="rgba(212, 175, 55, 0.1)"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h5 className="text-law-gold font-medium tracking-wider mb-3 flex items-center justify-center">
              <span className="mr-2 h-px w-5 bg-law-gold"></span>
              COMMONLY ASKED QUESTIONS
              <span className="ml-2 h-px w-5 bg-law-gold"></span>
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-law-charcoal">Frequently Asked Questions</h2>
            <p className="text-law-gray max-w-2xl mx-auto">
              Find answers to common questions about our services, processes, and legal expertise. 
              If you don't see your question here, please don't hesitate to contact us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={expandedItem || ""}
              onValueChange={handleValueChange}
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="mb-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-law-charcoal shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="px-5 py-4 text-left text-lg font-medium text-law-charcoal dark:text-white hover:text-law-gold dark:hover:text-law-gold transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 pt-2">
                    {expandedItem === `item-${index}` ? (
                      <TextGenerateEffect 
                        words={item.answer} 
                        className="text-law-gray dark:text-gray-300"
                        filter={true}
                        duration={0.5}
                      />
                    ) : (
                      <div className="text-law-gray dark:text-gray-300">{item.answer}</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-law-charcoal dark:text-white mb-6">
                Can't find what you're looking for? Contact our legal team directly.
              </p>
              <a 
                href="/contact" 
                className="btn inline-block bg-law-gold hover:bg-law-gold/90 text-white px-8 py-3 rounded-md transition-all duration-300"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </GlowingBackground>
    </section>
  );
};

export default FAQ;
