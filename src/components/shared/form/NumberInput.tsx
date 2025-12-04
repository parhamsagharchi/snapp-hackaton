import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { getInputClassName, BaseInputWrapper } from "./BaseInput";

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: FieldError;
  placeholder?: string;
  step?: string;
}

/**
 * Reusable number input component following Single Responsibility Principle and DRY
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, error, placeholder, step = "0.1", className = "", ...props }, ref) => {
    return (
      <BaseInputWrapper label={label} error={error}>
        <input
          ref={ref}
          type="number"
          step={step}
          placeholder={placeholder}
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          className={getInputClassName(error, className)}
          {...props}
        />
      </BaseInputWrapper>
    );
  }
);

NumberInput.displayName = "NumberInput";

