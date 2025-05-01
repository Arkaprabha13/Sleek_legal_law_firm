
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingBackgroundProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlowingBackground = ({ 
  children, 
  className, 
  glowColor = "rgba(212, 175, 55, 0.2)", 
  intensity = 'medium' 
}: GlowingBackgroundProps) => {
  const intensityMap = {
    low: "blur-[50px] opacity-30",
    medium: "blur-[70px] opacity-40",
    high: "blur-[100px] opacity-50"
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={cn("absolute -inset-[50%] rounded-full", intensityMap[intensity])}
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowingBackground;
