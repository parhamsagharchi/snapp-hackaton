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
import { validationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";

type DriverFormData = {
  displayName: string;
  lat: number;
  lng: number;
};

function DriverPage() {
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
      <PageLayout title="مدیریت راننده">
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <p className="text-xs text-slate-300">در حال بارگذاری...</p>
        </div>
      </PageLayout>
    );
  }

  const onSubmit = (data: DriverFormData) => {
    if (!driver) {
      toast.error("راننده یافت نشد");
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
    <PageLayout title="ویرایش اطلاعات راننده">
      {/* Form */}
      <div className="space-y-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        >
          <TextInput
            label="نام *"
            placeholder="نام راننده"
            autoFocus
            {...register("displayName", validationRules.displayName)}
            error={errors.displayName}
          />

          <NumberInput
            label="عرض جغرافیایی (Latitude) *"
            placeholder="مثال: 35.72"
            step="0.0001"
            {...register("lat", {
              required: "عرض جغرافیایی الزامی است",
              valueAsNumber: true,
              min: { value: -90, message: "عرض جغرافیایی باید بین -90 تا 90 باشد" },
              max: { value: 90, message: "عرض جغرافیایی باید بین -90 تا 90 باشد" },
            })}
            error={errors.lat}
          />

          <NumberInput
            label="طول جغرافیایی (Longitude) *"
            placeholder="مثال: 51.45"
            step="0.0001"
            {...register("lng", {
              required: "طول جغرافیایی الزامی است",
              valueAsNumber: true,
              min: { value: -180, message: "طول جغرافیایی باید بین -180 تا 180 باشد" },
              max: { value: 180, message: "طول جغرافیایی باید بین -180 تا 180 باشد" },
            })}
            error={errors.lng}
          />

          <FormActions isEditing={false} submitLabel="ویرایش" />
        </form>
      </div>
    </PageLayout>
  );
}

export default DriverPage;
