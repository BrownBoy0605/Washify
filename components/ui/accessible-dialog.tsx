"use client"

import * as React from "react"
import { DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { VisuallyHidden } from "./visually-hidden"
import { cn } from "@/lib/utils"

interface AccessibleDialogContentProps
  extends React.ComponentProps<typeof DialogContent> {
  title?: string
  hideTitle?: boolean
}

const AccessibleDialogContent = React.forwardRef<
  HTMLDivElement,
  AccessibleDialogContentProps
>(({ title, hideTitle = false, children, ...props }, ref) => {
  return (
    <DialogContent ref={ref} {...props}>
      {title && (
        <DialogHeader>
          {hideTitle ? (
            <VisuallyHidden asChild>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle>{title}</DialogTitle>
          )}
        </DialogHeader>
      )}
      {children}
    </DialogContent>
  )
})

AccessibleDialogContent.displayName = "AccessibleDialogContent"

export { AccessibleDialogContent }
