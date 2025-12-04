/**
 * List of pages that should use content-only layout (no map, no card container)
 * These pages will have independent scrolling content area
 */
export const CONTENT_ONLY_PAGES = ["/algorithm", "/pitch"] as const;

export function isContentOnlyPage(pathname: string): boolean {
  return CONTENT_ONLY_PAGES.includes(pathname as any);
}

