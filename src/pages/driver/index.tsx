import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMapStore, type IDriver } from "@/store/map.store";
import {
  TextInput,
  NumberInput,
  LocationDisplay,
  FormActions,
} from "@/components/shared/form";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { validationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";

type DriverFormData = {
  displayName: string;
  capacityVolume: number;
};

function DriverPage() {
  const driver = useMapStore((state) => state.driver);
  const activePin = useMapStore((state) => state.activePin);
  const updateDriver = useMapStore((state) => state.updateDriver);
  const setActivePin = useMapStore((state) => state.setActivePin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DriverFormData>({
    defaultValues: {
      displayName: "",
      capacityVolume: 0,
    },
  });

  useEffect(() => {
    if (driver) {
      setValue("displayName", driver.displayName || "");
      setValue("capacityVolume", driver.capacityVolume);
      setActivePin({ lat: driver.lat, lng: driver.lng });
    }
  }, [driver, setValue, setActivePin]);

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
    if (!activePin) {
      toast.error(toastMessages.errors.locationRequired);
      return;
    }

    const driverData: IDriver = {
      ...data,
      lat: activePin.lat,
      lng: activePin.lng,
    };

    updateDriver(driverData);
    setActivePin(null);
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
            label="ظرفیت (لیتر) *"
            placeholder="ظرفیت راننده به لیتر"
            {...register("capacityVolume", validationRules.capacityVolume)}
            error={errors.capacityVolume}
          />

          <LocationDisplay activePin={activePin} />

          <FormActions isEditing={false} submitLabel="ویرایش" />
        </form>
      </div>
    </PageLayout>
  );
}

export default DriverPage;
