import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

/**
 * Reusable page layout component following Single Responsibility Principle
 */
export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-white">{title}</h1>
      </div>

      <div className="border-t border-white/10"></div>

      {children}
    </div>
  );
};
