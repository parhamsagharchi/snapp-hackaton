export type Language = "fa" | "en";

export const LANGUAGES: Language[] = ["fa", "en"];

export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Text direction for a given language.
 * Persian is right-to-left, English is left-to-right.
 */
export function getDirection(language: Language): "rtl" | "ltr" {
  return language === "fa" ? "rtl" : "ltr";
}

/**
 * Human readable label for each language (shown in its own script).
 */
export const LANGUAGE_LABELS: Record<Language, string> = {
  fa: "فارسی",
  en: "English",
};

/**
 * Short label used on the language toggle button.
 */
export const LANGUAGE_SHORT_LABELS: Record<Language, string> = {
  fa: "FA",
  en: "EN",
};
