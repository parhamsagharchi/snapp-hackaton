import { useForm } from "react-hook-form";
import { useMapStore, type IParcel } from "@/store/map.store";
import {
  TextInput,
  NumberInput,
  LocationDisplay,
  FormActions,
} from "@/components/shared/form";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { validationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";
import { useFormWithLocation } from "@/hooks/useFormWithLocation";
import { useSettingsStore } from "@/store/settings.store";
import { calculateDistance } from "@/utils/tsp";

type ParcelFormData = {
  displayName: string;
  volume: number;
};

function ParcelsPage() {
  const parcels = useMapStore((state) => state.parcels);
  const pushParcel = useMapStore((state) => state.pushParcel);
  const removeParcelByIndex = useMapStore((state) => state.removeParcelByIndex);
  const updateParcelByIndex = useMapStore((state) => state.updateParcelByIndex);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);
  const packageSelectionRadius = useSettingsStore(
    (state) => state.packageSelectionRadius
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ParcelFormData>({
    defaultValues: {
      displayName: "",
      volume: 0,
    },
  });

  const {
    activePin,
    editingIndex,
    setEditingIndex,
    handleSubmit: handleFormSubmit,
    handleCancel: handleFormCancel,
  } = useFormWithLocation<IParcel>({
    onAdd: pushParcel,
    onUpdate: updateParcelByIndex,
    successMessages: {
      add: toastMessages.success.parcelAdded,
      update: toastMessages.success.parcelUpdated,
    },
  });

  const onSubmit = (data: ParcelFormData) => {
    handleFormSubmit(data, reset);
  };

  const handleEdit = (index: number) => {
    const parcel = parcels[index];
    setValue("displayName", parcel.displayName || "");
    setValue("volume", parcel.volume);
    setActivePin({ lat: parcel.lat, lng: parcel.lng });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const parcel = parcels[index];
    if (selectedParcel && selectedParcel.lat === parcel.lat && selectedParcel.lng === parcel.lng) {
      setSelectedParcel(null);
    }
    removeParcelByIndex(index);
  };

  const handleSelect = (index: number) => {
    if (!selectedPassenger) {
      return; // Can't select parcel without passenger
    }

    const parcel = parcels[index];
    const distance = calculateDistance(selectedPassenger, parcel) * 1000; // Convert to meters

    if (distance > packageSelectionRadius) {
      // Parcel is outside selection radius
      return;
    }

    if (selectedParcel && selectedParcel.lat === parcel.lat && selectedParcel.lng === parcel.lng) {
      setSelectedParcel(null);
    } else {
      setSelectedParcel(parcel);
      setActivePin({ lat: parcel.lat, lng: parcel.lng });
    }
  };

  const handleCancel = () => {
    handleFormCancel(reset);
  };

  return (
    <PageLayout title="مدیریت بسته‌ها">
      {/* Form */}
      <div className="space-y-4">
        <h2 className="text-base font-medium text-white">
          {editingIndex !== null ? "ویرایش بسته" : "افزودن بسته جدید"}
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
            placeholder="نام بسته"
            autoFocus
            {...register("displayName", validationRules.displayName)}
            error={errors.displayName}
          />

          <NumberInput
            label="حجم (لیتر) *"
            placeholder="حجم بسته به لیتر"
            {...register("volume", validationRules.volume)}
            error={errors.volume}
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
        data={parcels}
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
            accessor: (parcel: IParcel) =>
              `${parcel.lat.toFixed(4)}, ${parcel.lng.toFixed(4)}`,
          },
          {
            header: "حجم (لیتر)",
            accessor: (parcel: IParcel) => (
              <span className="text-white">{parcel.volume} لیتر</span>
            ),
          },
          {
            header: "عملیات",
            accessor: (parcel, index) => {
              const isSelected =
                selectedParcel &&
                selectedParcel.lat === parcel.lat &&
                selectedParcel.lng === parcel.lng;
              
              if (!selectedPassenger) {
                return (
                  <span className="text-xs text-slate-500">
                    ابتدا مسافر انتخاب کنید
                  </span>
                );
              }

              const distance = calculateDistance(selectedPassenger, parcel) * 1000;
              const isInRange = distance <= packageSelectionRadius;

              if (!isInRange) {
                return (
                  <span className="text-xs text-red-400">
                    خارج از محدوده
                  </span>
                );
              }

              return (
                <button
                  onClick={() => handleSelect(index)}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {isSelected ? "لغو انتخاب" : "انتخاب"}
                </button>
              );
            },
          },
        ]}
        emptyMessage="هیچ بسته‌ای ثبت نشده است"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageLayout>
  );
}

export default ParcelsPage;
