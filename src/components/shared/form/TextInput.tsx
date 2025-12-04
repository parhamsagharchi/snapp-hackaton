import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { getInputClassName, BaseInputWrapper } from "./BaseInput";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  placeholder?: string;
}

/**
 * Reusable text input component following Single Responsibility Principle and DRY
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, placeholder, className = "", ...props }, ref) => {
    return (
      <BaseInputWrapper label={label} error={error}>
        <input
          ref={ref}
          type="text"
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

TextInput.displayName = "TextInput";

