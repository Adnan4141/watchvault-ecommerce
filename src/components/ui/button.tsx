import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542A0C] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
          {
            "bg-[#542A0C] text-white hover:bg-[#3d1d07] shadow-sm":
              variant === "default",
            "border border-gray-200 bg-white hover:bg-gray-50 text-gray-800":
              variant === "outline",
            "hover:bg-gray-100 text-gray-700": variant === "ghost",
            "bg-[#f5ebe6] text-[#542A0C] hover:bg-[#ebdacf]":
              variant === "secondary",
            "bg-red-500 text-white hover:bg-red-600": variant === "danger",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base font-semibold": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
