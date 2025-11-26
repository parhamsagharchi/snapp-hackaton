import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

/**
 * Reusable page layout component following Single Responsibility Principle
 */
export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="border-t border-slate-700/50"></div>

      {children}
    </div>
  );
};

