
import React from "react";
import { cn } from "@/lib/utils";

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-law-lightgold p-1 py-0.5 font-bold text-law-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
