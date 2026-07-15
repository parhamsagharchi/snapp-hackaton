import clsx from "clsx";
import { useTranslation } from "@/i18n";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "neutral" | "white";
  className?: string;
  fullScreen?: boolean;
};

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const colorMap: Record<NonNullable<SpinnerProps["color"]>, string> = {
  primary: "border-primary",
  secondary: "border-secondary",
  neutral: "border-neutral",
  white: "border-white",
};

export function Spinner({
  size = "md",
  color = "primary",
  className,
  fullScreen = false,
}: SpinnerProps) {
  const { t } = useTranslation();
  const spinnerElement = (
    <span
      className={clsx(
        "inline-block animate-spin rounded-full border-2 border-t-transparent",
        sizeMap[size],
        colorMap[color],
        className
      )}
      aria-label={t("common.loadingAria")}
      role="status"
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}
