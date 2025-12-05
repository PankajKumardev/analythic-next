import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-subtle selection:bg-[#ff003d] selection:text-white border-border h-9 w-full min-w-0 rounded-lg border bg-background px-3 py-1 text-base text-foreground shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#ff003d] focus-visible:ring-2 focus-visible:ring-[#ff003d]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }

