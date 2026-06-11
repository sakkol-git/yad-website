import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/shared/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "primary" | "secondary" | "secondary-container" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const variantClasses = {
      default: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container hover:shadow-ambient-hover",
      primary: "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container hover:shadow-ambient-hover",
      secondary: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container hover:shadow-ambient-hover",
      "secondary-container": "bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary hover:shadow-ambient-hover",
      outline: "border-2 border-primary text-primary hover:bg-surface-container-low",
      ghost: "text-primary hover:bg-surface-container-low",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizeClasses = {
      default: "h-12 px-6 py-3 font-label-bold text-[14px] tracking-wide rounded-md",
      sm: "min-h-[44px] px-4 py-2 font-label-bold text-[12px] tracking-wide rounded-md",
      lg: "h-14 px-8 py-4 font-label-bold text-[16px] tracking-wide rounded-lg",
      icon: "h-12 w-12 rounded-lg flex items-center justify-center",
    }

    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"

    return (
      <Comp
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
