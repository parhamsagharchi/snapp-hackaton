import clsx from "clsx";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "neutral" | "white";
  className?: string;
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
}: SpinnerProps) {
  return (
    <span
      className={clsx(
        "inline-block animate-spin rounded-full border-2 border-t-transparent",
        sizeMap[size],
        colorMap[color],
        className
      )}
      aria-label="در حال بارگذاری"
      role="status"
    />
  );
}
