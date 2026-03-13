import { forwardRef } from "react"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"

const inputBaseClasses =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputBaseClasses, className)}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
