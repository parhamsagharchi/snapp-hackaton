/**
 * Shared validation rules following DRY principle
 */
export const validationRules = {
  displayName: {
    required: "نام الزامی است",
    minLength: {
      value: 1,
      message: "نام نمی‌تواند خالی باشد",
    },
  },
} as const;

