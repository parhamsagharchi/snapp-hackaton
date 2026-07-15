import { t } from "@/i18n";

/**
 * Centralized toast messages following DRY principle.
 * Getters read the active language at call time.
 */
export const toastMessages = {
  errors: {
    get locationRequired() {
      return t("toast.locationRequired");
    },
  },
  success: {
    get passengerAdded() {
      return t("toast.passengerAdded");
    },
    get passengerUpdated() {
      return t("toast.passengerUpdated");
    },
    get parcelAdded() {
      return t("toast.parcelAdded");
    },
    get parcelUpdated() {
      return t("toast.parcelUpdated");
    },
    get driverUpdated() {
      return t("toast.driverUpdated");
    },
  },
} as const;
