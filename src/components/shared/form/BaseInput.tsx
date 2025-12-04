import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

/**
 * Base input styles following DRY principle
 * Shared styles for all input components
 */
export const getInputClassName = (error?: FieldError, className: string = "") => {
  return `w-full rounded-md border bg-slate-700/50 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-slate-600 focus:border-primary"
  } ${className}`;
};

export const getLabelClassName = () => {
  return "mb-1.5 block text-xs font-normal text-slate-300";
};

export const getErrorClassName = () => {
  return "mt-1 text-xs text-red-400";
};

/**
 * Base input wrapper component following DRY principle
 */
interface BaseInputWrapperProps {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}

export const BaseInputWrapper = forwardRef<
  HTMLDivElement,
  BaseInputWrapperProps
>(({ label, error, children }, ref) => {
  return (
    <div ref={ref}>
      <label className={getLabelClassName()}>{label}</label>
      {children}
      {error && <p className={getErrorClassName()}>{error.message}</p>}
    </div>
  );
});

BaseInputWrapper.displayName = "BaseInputWrapper";

