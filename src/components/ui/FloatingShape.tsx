
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingShapeProps {
  className?: string;
  type?: "circle" | "square" | "polygon";
  color?: string;
  size?: number;
  speed?: number;
  delay?: number;
  opacity?: number;
  blur?: number;
  top?: string;
  left?: string;
}

const FloatingShape = ({
  className,
  type = "circle",
  color = "rgba(212, 175, 55, 0.3)",
  size = 100,
  speed = 20,
  delay = 0,
  opacity = 0.3,
  blur = 2,
  top = "10%",
  left = "10%",
}: FloatingShapeProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveShape = () => {
      const newX = Math.sin(Date.now() / (1000 * speed)) * 30;
      const newY = Math.cos(Date.now() / (1000 * speed + 500)) * 30;
      setPosition({ x: newX, y: newY });
    };

    const intervalId = setInterval(moveShape, 50);
    return () => clearInterval(intervalId);
  }, [speed]);

  const getShapeStyles = () => {
    switch (type) {
      case "square":
        return "rounded-md";
      case "polygon":
        return "clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
      case "circle":
      default:
        return "rounded-full";
    }
  };

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-transform duration-1000 ease-in-out",
        getShapeStyles(),
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
        filter: `blur(${blur}px)`,
        top,
        left,
        transform: `translate(${position.x}px, ${position.y}px)`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default FloatingShape;
