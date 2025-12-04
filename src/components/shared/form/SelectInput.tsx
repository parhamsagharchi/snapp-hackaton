import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { getInputClassName, BaseInputWrapper } from "./BaseInput";

interface SelectInputOption {
  value: string;
  label: string;
}

interface SelectInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  error?: FieldError;
  options: SelectInputOption[];
  placeholder?: string;
}

/**
 * Reusable select input component following Single Responsibility Principle and DRY
 */
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <BaseInputWrapper label={label} error={error}>
        <select
          ref={ref}
          className={getInputClassName(error, className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </BaseInputWrapper>
    );
  }
);

SelectInput.displayName = "SelectInput";

