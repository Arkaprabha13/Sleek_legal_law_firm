
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

interface TestimonialsShowcaseProps {
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  compact?: boolean;
}

export function TestimonialsShowcase({
  className,
  title = "What Our Clients Are Saying",
  subtitle = "Don't just take our word for it. Here's what our clients have to say about working with SleekLegal.",
  compact = false,
}: TestimonialsShowcaseProps) {
  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto mb-12 text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-law-charcoal">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-center text-law-gray">
          {subtitle}
        </p>
      </div>

      <div className={cn("relative", compact ? "max-h-[500px]" : "max-h-[700px]", "overflow-hidden")}>
        <div className="gap-4 md:columns-2 xl:columns-3">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:40s]": i === 0,
                  "[--duration:70s]": i === 2,
                })}
                pauseOnHover
              >
                {testimonials
                  .slice(i * 3, Math.min((i + 1) * 3, testimonials.length))
                  .map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.random() * 0.5,
                        duration: 0.8,
                      }}
                    >
                      <TestimonialCard {...card} />
                    </motion.div>
                  ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20%"></div>
      </div>
    </section>
  );
}
