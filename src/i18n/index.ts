import { useCallback } from "react";
import { useSettingsStore } from "@/store/settings.store";
import { translations } from "./translations";
import { localizeName, localizeDigits } from "./data";
import { DEFAULT_LANGUAGE, getDirection } from "./config";
import type { Language } from "./config";

export type { Language } from "./config";
export {
  LANGUAGES,
  LANGUAGE_LABELS,
  LANGUAGE_SHORT_LABELS,
  getDirection,
} from "./config";
export { localizeName, localizeDigits } from "./data";

export type TranslateParams = Record<string, string | number>;

function getRawValue(language: Language, key: string): string | undefined {
  const parts = key.split(".");
  let node: unknown = translations[language];
  for (const part of parts) {
    if (
      node &&
      typeof node === "object" &&
      part in (node as Record<string, unknown>)
    ) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === "string" ? node : undefined;
}

function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

/**
 * Translate a dotted key for the given language. Falls back to Persian and
 * finally to the key itself so nothing ever renders as blank.
 */
export function translate(
  key: string,
  params?: TranslateParams,
  language?: Language
): string {
  const lang = language ?? useSettingsStore.getState().language;
  const template =
    getRawValue(lang, key) ?? getRawValue(DEFAULT_LANGUAGE, key) ?? key;
  return interpolate(template, params);
}

/**
 * Non-reactive translator for use outside React (utils, event handlers).
 */
export function t(key: string, params?: TranslateParams): string {
  return translate(key, params);
}

/**
 * Reactive translation hook. Components re-render when the language changes.
 */
export function useTranslation() {
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  const translateFn = useCallback(
    (key: string, params?: TranslateParams) => translate(key, params, language),
    [language]
  );

  const localizeNameFn = useCallback(
    (name: string | undefined | null) => localizeName(name, language),
    [language]
  );

  const localizeDigitsFn = useCallback(
    (value: string | number) => localizeDigits(value, language),
    [language]
  );

  return {
    t: translateFn,
    tName: localizeNameFn,
    tDigits: localizeDigitsFn,
    language,
    setLanguage,
    dir: getDirection(language),
  };
}
