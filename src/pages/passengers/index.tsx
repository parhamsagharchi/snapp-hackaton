import { useForm } from "react-hook-form";
import { useMapStore, type IPassenger } from "@/store/map.store";
import {
  TextInput,
  CheckboxInput,
  LocationDisplay,
  FormActions,
} from "@/components/shared/form";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { validationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";
import { useFormWithLocation } from "@/hooks/useFormWithLocation";

type PassengerFormData = {
  displayName: string;
  isActiveRideInHurry: boolean;
  hasLuggage: boolean;
};

function PassengersPage() {
  const passengers = useMapStore((state) => state.passengers);
  const pushPassenger = useMapStore((state) => state.pushPassenger);
  const removePassengerByIndex = useMapStore(
    (state) => state.removePassengerByIndex
  );
  const updatePassengerByIndex = useMapStore(
    (state) => state.updatePassengerByIndex
  );
  const setActivePin = useMapStore((state) => state.setActivePin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PassengerFormData>({
    defaultValues: {
      displayName: "",
      isActiveRideInHurry: false,
      hasLuggage: false,
    },
  });

  const {
    activePin,
    editingIndex,
    setEditingIndex,
    handleSubmit: handleFormSubmit,
    handleCancel: handleFormCancel,
  } = useFormWithLocation<IPassenger>({
    onAdd: pushPassenger,
    onUpdate: updatePassengerByIndex,
    successMessages: {
      add: toastMessages.success.passengerAdded,
      update: toastMessages.success.passengerUpdated,
    },
  });

  const onSubmit = (data: PassengerFormData) => {
    handleFormSubmit(data, reset);
  };

  const handleEdit = (index: number) => {
    const passenger = passengers[index];
    setValue("displayName", passenger.displayName || "");
    setValue("isActiveRideInHurry", passenger.isActiveRideInHurry);
    setValue("hasLuggage", passenger.hasLuggage);
    setActivePin({ lat: passenger.lat, lng: passenger.lng });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    removePassengerByIndex(index);
  };

  const handleCancel = () => {
    handleFormCancel(reset);
  };

  return (
    <PageLayout title="مدیریت مسافران">
      {/* Form */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          {editingIndex !== null ? "ویرایش مسافر" : "افزودن مسافر جدید"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        >
          <TextInput
            label="نام *"
            placeholder="نام مسافر"
            autoFocus
            {...register("displayName", validationRules.displayName)}
            error={errors.displayName}
          />

          <div className="flex items-center gap-6">
            <CheckboxInput
              label="سفر عجله‌ای"
              {...register("isActiveRideInHurry")}
            />
            <CheckboxInput label="بار دارد" {...register("hasLuggage")} />
          </div>

          <LocationDisplay activePin={activePin} />

          <FormActions
            isEditing={editingIndex !== null}
            onCancel={handleCancel}
          />
        </form>
      </div>

      {/* Table */}
      <DataTable
        data={passengers}
        columns={[
          {
            header: "#",
            accessor: (_, index) => index + 1,
          },
          {
            header: "نام",
            accessor: "displayName",
            className: "text-white",
          },
          {
            header: "موقعیت",
            accessor: (passenger: IPassenger) =>
              `${passenger.lat.toFixed(4)}, ${passenger.lng.toFixed(4)}`,
          },
          {
            header: "سفر عجله‌ای",
            accessor: (passenger) =>
              passenger.isActiveRideInHurry ? (
                <span className="text-green-400">بله</span>
              ) : (
                <span className="text-slate-500">خیر</span>
              ),
          },
          {
            header: "بار",
            accessor: (passenger) =>
              passenger.hasLuggage ? (
                <span className="text-blue-400">بله</span>
              ) : (
                <span className="text-slate-500">خیر</span>
              ),
          },
        ]}
        emptyMessage="هیچ مسافری ثبت نشده است"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageLayout>
  );
}

export default PassengersPage;
