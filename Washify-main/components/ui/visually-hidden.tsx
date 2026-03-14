import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const VisuallyHidden = React.forwardRef<HTMLDivElement, VisuallyHiddenProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute w-px h-px p-0 -m-px overflow-hidden clip-rect border-0",
          className
        )}
        {...props}
      />
    )
  }
)

VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }
