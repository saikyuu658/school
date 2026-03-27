import { ChevronDown, AlertCircle } from 'lucide-react'
import { useState, forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react'

type FieldSize = "sm" | "md" | "lg"

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string
  error?: string
  helper?: string
  icon?: ReactNode
  size?: FieldSize
  fullWidth?: boolean
  placeholder?: string
  options: { label: string; value: string | number }[]
}

const fieldSizes: Record<FieldSize, { wrap: string; text: string; icon: number }> = {
  sm: { wrap: "h-8 px-2.5 gap-1.5 rounded-lg", text: "text-[13px]", icon: 14 },
  md: { wrap: "h-10 px-3 gap-2 rounded-[10px]", text: "text-sm", icon: 16 },
  lg: { wrap: "h-12 px-3.5 gap-2.5 rounded-xl", text: "text-[15px]", icon: 18 },
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    helper,
    icon,
    size = "md",
    fullWidth = true,
    className = "",
    disabled,
    options,
    placeholder,
    ...props
  },
  ref
) {
  const [focused, setFocused] = useState(false)
  const s = fieldSizes[size]

  const borderClass = error
    ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20"
    : focused
    ? "border-[#0785CB] ring-[#0785CB]/15 ring-2"
    : "border-slate-200 hover:border-slate-300"

  return (
    <div className={["flex flex-col gap-1.5", fullWidth ? "w-full" : "", className].join(" ")}>
      {label && (
        <label className={`text-[13px] font-medium ${error ? "text-red-500" : "text-slate-700"}`}>
          {label}
        </label>
      )}

      <div
        className={[
          "flex items-center bg-white border transition-all duration-150 relative",
          s.wrap,
          borderClass,
          disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "",
        ].join(" ")}
      >
        {icon && (
          <span className={`flex items-center shrink-0 ${focused ? "text-[#0785CB]" : "text-slate-400"} transition-colors duration-150`}>
            {icon}
          </span>
        )}

        <select
          ref={ref}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={[
            "flex-1 bg-transparent border-none outline-none appearance-none pr-6",
            "text-slate-800 disabled:cursor-not-allowed",
            s.text,
          ].join(" ")}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Ícone de Seta Customizado */}
        <div className="absolute right-3 pointer-events-none flex items-center text-slate-400">
          {error ? (
            <AlertCircle size={s.icon} className="text-red-400" />
          ) : (
            <ChevronDown size={s.icon} />
          )}
        </div>
      </div>

      {(error || helper) && (
        <p className={`text-[12px] ${error ? "text-red-500" : "text-slate-400"}`}>
          {error ?? helper}
        </p>
      )}
    </div>
  )
})