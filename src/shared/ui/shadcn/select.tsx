import { forwardRef } from "react"
import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"

const selectBaseClasses =
  "flex h-9 w-full items-center rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectBaseClasses, className)}
        {...props}
      />
    )
  }
)

Select.displayName = "Select"

export { Select }
