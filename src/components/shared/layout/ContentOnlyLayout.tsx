import type { ReactNode } from "react";

interface ContentOnlyLayoutProps {
  title?: string;
  children: ReactNode;
}

/**
 * Layout component for content-only pages (no map, no divider, just content)
 * Inherits dark background and color scheme from parent
 */
export const ContentOnlyLayout = ({ title, children }: ContentOnlyLayoutProps) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-white">{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

