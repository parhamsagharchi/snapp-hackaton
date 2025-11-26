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
  volume: {
    required: "حجم الزامی است",
    min: {
      value: 0.1,
      message: "حجم باید بیشتر از 0 باشد",
    },
    valueAsNumber: true as const,
  },
  capacityVolume: {
    required: "ظرفیت الزامی است",
    min: {
      value: 0.1,
      message: "ظرفیت باید بیشتر از 0 باشد",
    },
    valueAsNumber: true as const,
  },
} as const;

