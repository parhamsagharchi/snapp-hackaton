import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: FieldError;
  placeholder?: string;
  step?: string;
}

/**
 * Reusable number input component following Single Responsibility Principle
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, error, placeholder, step = "0.1", className = "", ...props }, ref) => {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-normal text-slate-300">
          {label}
        </label>
        <input
          ref={ref}
          type="number"
          step={step}
          placeholder={placeholder}
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className={`w-full rounded-md border bg-slate-700/50 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-600 focus:border-primary"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400">{error.message}</p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

