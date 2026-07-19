"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            /* Primary */
            "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700":
              variant === "primary",
            /* Secondary */
            "bg-stone-900 text-white hover:bg-stone-700 active:bg-stone-800":
              variant === "secondary",
            /* Ghost */
            "text-stone-600 hover:bg-stone-50 hover:text-stone-900 active:bg-stone-100":
              variant === "ghost",
            /* Outline */
            "border border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-900 bg-transparent":
              variant === "outline",
          },
          {
            "h-9 px-4 text-sm rounded-md": size === "sm",
            "h-11 px-6 text-sm rounded-lg": size === "md",
            "h-13 px-8 text-base rounded-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
