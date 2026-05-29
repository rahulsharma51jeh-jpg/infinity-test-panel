"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "gradient-brand text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
  secondary: "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20",
  ghost: "hover:bg-primary/10 text-foreground",
  outline: "border border-border hover:border-primary hover:text-primary bg-transparent",
  glass: "glass hover:bg-primary/10",
  danger: "bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20",
};

const sizes = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-xl",
  icon: "h-9 w-9 rounded-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
