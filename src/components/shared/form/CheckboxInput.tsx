import { forwardRef } from "react";

interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Reusable checkbox input component following Single Responsibility Principle
 */
export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <label className={`flex items-center gap-2 text-xs text-slate-300 ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
          {...props}
        />
        {label}
      </label>
    );
  }
);

CheckboxInput.displayName = "CheckboxInput";

