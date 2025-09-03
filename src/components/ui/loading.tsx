import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary", 
        sizeClasses[size], 
        className
      )} 
    />
  )
}

interface LoadingCardProps {
  text?: string
  className?: string
}

export function LoadingCard({ text = "Loading...", className }: LoadingCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 space-y-4 min-h-[200px]", 
      className
    )}>
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

interface LoadingFullscreenProps {
  text?: string
}

export function LoadingFullscreen({ text = "Loading..." }: LoadingFullscreenProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingCard text={text} />
    </div>
  )
}