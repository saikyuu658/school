
import { type ButtonHTMLAttributes,type ReactNode } from "react"
import { Loader2 } from "lucide-react"


type ButtonVariant = "primary" | "secondary" | "inverted" | "outlined" | "tertiary" | "danger"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
  iconOnly?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0785CB] text-white hover:bg-[#055f96] focus-visible:ring-[#0785CB]/40 border-transparent",
  secondary:
    "bg-[#6366F1] text-white hover:bg-[#4f46e5] focus-visible:ring-[#6366F1]/40 border-transparent",
  inverted:
    "bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-500/40 border-transparent",
  outlined:
    "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-400/30",
  tertiary:
    "bg-[#B96A01] text-white hover:bg-[#8a4f01] focus-visible:ring-[#B96A01]/40 border-transparent",
  danger:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/40 border-transparent",
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-lg",
  md: "h-10 px-5 text-sm gap-2 rounded-[10px]",
  lg: "h-12 px-7 text-[15px] gap-2.5 rounded-xl",
}

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "h-8 w-8 p-0 rounded-lg",
  md: "h-10 w-10 p-0 rounded-[10px]",
  lg: "h-12 w-12 p-0 rounded-xl",
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  iconOnly = false,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium border",
        "transition-all duration-150 select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-1",
        "active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        buttonVariants[variant],
        iconOnly ? iconOnlySizes[size] : buttonSizes[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin" />
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}
      {!iconOnly && !loading && children}
      {!iconOnly && iconRight && (
        <span className="flex items-center">{iconRight}</span>
      )}
    </button>
  )
}