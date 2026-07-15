import { t } from "@/i18n";

type Translate = typeof t;

/**
 * Shared validation rules following DRY principle.
 * Accepts a translator so messages match the active language.
 */
export function getValidationRules(translate: Translate = t) {
  return {
    displayName: {
      required: translate("validation.nameRequired"),
      minLength: {
        value: 1,
        message: translate("validation.nameEmpty"),
      },
    },
  } as const;
}
