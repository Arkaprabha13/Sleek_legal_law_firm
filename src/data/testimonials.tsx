
import React from "react";
import { Highlight } from "@/components/ui/Highlight";
import { TestimonialCardProps } from "@/components/ui/TestimonialCard";

export const testimonials: TestimonialCardProps[] = [
  {
    name: "Alex Rivera",
    role: "CEO, TechSolutions Inc.",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        Working with SleekLegal transformed our company's legal operations.
        <Highlight>
          Their expertise in corporate law saved us countless hours and resources.
        </Highlight>{" "}
        Highly recommended for any business seeking professional legal counsel.
      </p>
    ),
    rating: 5
  },
  {
    name: "Samantha Lee",
    role: "Entrepreneur",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        SleekLegal's attorneys handled my business formation with exceptional care.
        <Highlight>
          They guided me through every step with clarity and professionalism.
        </Highlight>{" "}
        I'm grateful for their support during this critical phase of my business.
      </p>
    ),
    rating: 5
  },
  {
    name: "Raj Patel",
    role: "CFO, Global Ventures Ltd.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        As a multinational corporation, we needed specialized legal expertise for our expansion. 
        SleekLegal delivered beyond our expectations.
        <Highlight>Their strategic approach to international law has been invaluable.</Highlight>
      </p>
    ),
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "Real Estate Investor",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        SleekLegal's property law experts have been instrumental in managing my real estate portfolio.
        <Highlight>
          Their attention to detail has protected my investments for years.
        </Highlight>{" "}
        I couldn't ask for a better legal partner.
      </p>
    ),
    rating: 4
  },
  {
    name: "Michael Brown",
    role: "Director at FinTech Innovations",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        SleekLegal's expertise in financial regulations helped us navigate complex compliance issues.
        <Highlight>
          Their counsel was crucial for our fintech startup's success.
        </Highlight>{" "}
        They truly understand the intersection of technology and law.
      </p>
    ),
    rating: 5
  },
  {
    name: "Linda Wu",
    role: "Small Business Owner",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        When I needed help with employment contracts and workplace policies, SleekLegal provided clear, practical guidance.
        <Highlight>
          Their legal support has given me confidence as I grow my team.
        </Highlight>{" "}
      </p>
    ),
    rating: 5
  },
  {
    name: "Carlos Gomez",
    role: "Digital Marketing Agency Owner",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        SleekLegal helped me navigate copyright issues and client contracts for my agency.
        <Highlight>
          Their understanding of digital business has been a game-changer.
        </Highlight>{" "}
      </p>
    ),
    rating: 4
  },
  {
    name: "Aisha Khan",
    role: "Fashion Brand Founder",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        Protecting my fashion brand's intellectual property was my top priority.
        <Highlight>
          SleekLegal's trademark expertise ensured my brand remains secure.
        </Highlight>{" "}
      </p>
    ),
    rating: 5
  },
  {
    name: "Tom Chen",
    role: "Healthcare Administrator",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Navigating healthcare regulations is incredibly complex, but SleekLegal made it manageable.
        <Highlight>
          Their specialized knowledge in healthcare law is unmatched.
        </Highlight>{" "}
      </p>
    ),
    rating: 5
  },
  {
    name: "Sofia Patel",
    role: "Education Nonprofit Director",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        SleekLegal helped our nonprofit navigate complex regulatory requirements.
        <Highlight>
          Their dedication to our mission made them true partners in our work.
        </Highlight>{" "}
      </p>
    ),
    rating: 4
  },
];
