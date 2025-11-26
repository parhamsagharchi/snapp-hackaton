/**
 * Centralized toast messages following DRY principle
 */
export const toastMessages = {
  errors: {
    locationRequired: "لطفاً موقعیت را از نقشه انتخاب کنید",
  },
  success: {
    passengerAdded: "مسافر با موفقیت اضافه شد",
    passengerUpdated: "مسافر با موفقیت ویرایش شد",
    parcelAdded: "بسته با موفقیت اضافه شد",
    parcelUpdated: "بسته با موفقیت ویرایش شد",
    driverUpdated: "اطلاعات راننده با موفقیت ویرایش شد",
  },
} as const;

