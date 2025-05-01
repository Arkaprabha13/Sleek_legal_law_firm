
import React from "react";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: string;
  highlight?: boolean;
}

const ShinyText = ({ 
  children, 
  className,
  size = "lg",
  color = "text-law-gold",
  highlight = false
}: ShinyTextProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl"
  };

  return (
    <span
      className={cn(
        "inline-block font-semibold relative",
        sizeClasses[size],
        color,
        {
          "animate-pulse": highlight,
          "before:content-[''] before:absolute before:-inset-1 before:bg-law-gold/10 before:blur-sm before:rounded-lg": highlight
        },
        className
      )}
    >
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
    </span>
  );
};

export default ShinyText;
