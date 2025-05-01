
import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  rating?: number;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  rating = 5,
  className,
  ...props
}: TestimonialCardProps) {
  // Get the initials from the name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-6",
        "border border-neutral-200 bg-white shadow-sm",
        "hover:shadow-md hover:border-law-lightgold/50 transition-all duration-300",
        "dark:bg-law-charcoal dark:border-white/10 dark:shadow-inner",
        className,
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-law-gray">
        {description}
        <div className="flex flex-row py-2">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className="fill-yellow-500 text-yellow-500" 
              />
            ))}
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-4">
        <Avatar className="h-10 w-10 border border-law-lightgold/20">
          {img ? (
            <AvatarImage src={img} alt={name} />
          ) : (
            <AvatarFallback className="bg-law-lightgold text-law-charcoal">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        <div>
          <p className="font-medium text-law-charcoal">{name}</p>
          <p className="text-xs font-normal text-law-gray">{role}</p>
        </div>
      </div>
    </div>
  );
}
