import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMapStore, type IDriver } from "@/store/map.store";
import {
  TextInput,
  NumberInput,
  FormActions,
} from "@/components/shared/form";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { getValidationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";
import { useTranslation } from "@/i18n";

type DriverFormData = {
  displayName: string;
  lat: number;
  lng: number;
};

function DriverPage() {
  const { t } = useTranslation();
  const validationRules = getValidationRules(t);
  const driver = useMapStore((state) => state.driver);
  const updateDriver = useMapStore((state) => state.updateDriver);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DriverFormData>({
    defaultValues: {
      displayName: "",
      lat: 0,
      lng: 0,
    },
  });

  const isUpdatingFromDriver = useRef(false);
  const isUpdatingFromForm = useRef(false);

  useEffect(() => {
    if (driver && !isUpdatingFromForm.current) {
      isUpdatingFromDriver.current = true;
      setValue("displayName", driver.displayName || "");
      setValue("lat", driver.lat);
      setValue("lng", driver.lng);
      // Reset flag after a short delay to allow form to update
      setTimeout(() => {
        isUpdatingFromDriver.current = false;
      }, 100);
    }
  }, [driver, setValue]);

  // Watch lat/lng changes and update driver position when user manually changes them
  const lat = watch("lat");
  const lng = watch("lng");
  
  useEffect(() => {
    if (
      driver &&
      !isUpdatingFromDriver.current &&
      lat !== undefined &&
      lng !== undefined &&
      lat !== 0 &&
      lng !== 0
    ) {
      const latDiff = Math.abs(lat - driver.lat) > 0.0001;
      const lngDiff = Math.abs(lng - driver.lng) > 0.0001;
      
      if (latDiff || lngDiff) {
        isUpdatingFromForm.current = true;
        updateDriver({
          ...driver,
          lat,
          lng,
        });
        setTimeout(() => {
          isUpdatingFromForm.current = false;
        }, 100);
      }
    }
  }, [lat, lng]);

  if (!driver) {
    return (
      <PageLayout title={t("driver.titleLoading")}>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-300">{t("common.loading")}</p>
        </div>
      </PageLayout>
    );
  }

  const onSubmit = (data: DriverFormData) => {
    if (!driver) {
      toast.error(t("driver.notFound"));
      return;
    }

    const driverData: IDriver = {
      displayName: data.displayName,
      lat: data.lat,
      lng: data.lng,
    };

    updateDriver(driverData);
    toast.success(toastMessages.success.driverUpdated);
  };

  return (
    <PageLayout title={t("driver.titleEdit")}>
      {/* Form */}
      <div className="space-y-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        >
          <TextInput
            label={t("driver.nameLabel")}
            placeholder={t("driver.namePlaceholder")}
            autoFocus
            {...register("displayName", validationRules.displayName)}
            error={errors.displayName}
          />

          <NumberInput
            label={t("driver.latLabel")}
            placeholder={t("driver.latPlaceholder")}
            step="0.0001"
            {...register("lat", {
              required: t("driver.latRequired"),
              valueAsNumber: true,
              min: { value: -90, message: t("driver.latRange") },
              max: { value: 90, message: t("driver.latRange") },
            })}
            error={errors.lat}
          />

          <NumberInput
            label={t("driver.lngLabel")}
            placeholder={t("driver.lngPlaceholder")}
            step="0.0001"
            {...register("lng", {
              required: t("driver.lngRequired"),
              valueAsNumber: true,
              min: { value: -180, message: t("driver.lngRange") },
              max: { value: 180, message: t("driver.lngRange") },
            })}
            error={errors.lng}
          />

          <FormActions isEditing={false} submitLabel={t("driver.submit")} />
        </form>
      </div>
    </PageLayout>
  );
}

export default DriverPage;
