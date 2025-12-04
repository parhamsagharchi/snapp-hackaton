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
  orderOptionsActive: boolean;
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
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const setSelectedPassenger = useMapStore(
    (state) => state.setSelectedPassenger
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PassengerFormData>({
    defaultValues: {
      displayName: "",
      orderOptionsActive: false,
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
    setValue("orderOptionsActive", passenger.orderOptionsActive);
    setActivePin({ lat: passenger.lat, lng: passenger.lng });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const passenger = passengers[index];
    if (
      selectedPassenger &&
      selectedPassenger.lat === passenger.lat &&
      selectedPassenger.lng === passenger.lng
    ) {
      setSelectedPassenger(null);
    }
    removePassengerByIndex(index);
  };

  const handleCancel = () => {
    handleFormCancel(reset);
  };

  return (
    <PageLayout title="مدیریت مسافر‌ها">
      {/* Form */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white">
          {editingIndex !== null ? "ویرایش مسافر" : "افزودن مسافر جدید"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
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

          <CheckboxInput
            label="فعال سازی گزینه های سفارش"
            {...register("orderOptionsActive")}
          />

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
            header: "گزینه های سفارش",
            accessor: (passenger) =>
              passenger.orderOptionsActive ? (
                <span className="text-yellow-400">فعال</span>
              ) : (
                <span className="text-slate-500">غیرفعال</span>
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
