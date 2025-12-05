import { forwardRef } from "react";
import clsx from "clsx";

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
      <label className={clsx("flex items-center gap-1.5 text-xs text-slate-300", className)}>
        <input
          ref={ref}
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
          {...props}
        />
        {label}
      </label>
    );
  }
);

CheckboxInput.displayName = "CheckboxInput";

