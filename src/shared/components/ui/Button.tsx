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
      default: "bg-primary text-white border border-transparent hover:bg-primary/90",
      primary: "bg-primary text-white border border-transparent hover:bg-primary/90",
      secondary: "bg-secondary text-white border border-transparent hover:bg-secondary/90",
      "secondary-container": "bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-container/50",
      outline: "border border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-on-surface-variant hover:text-primary hover:bg-surface-container/50",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizeClasses = {
      default: "h-12 px-8 uppercase tracking-widest text-[10px] font-bold rounded-none",
      sm: "h-10 px-6 uppercase tracking-widest text-[10px] font-bold rounded-none",
      lg: "h-14 px-10 uppercase tracking-widest text-[10px] font-bold rounded-none",
      icon: "h-12 w-12 rounded-none flex items-center justify-center",
    }

    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"

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
