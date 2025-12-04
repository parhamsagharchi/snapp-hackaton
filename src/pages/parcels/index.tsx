import { useForm } from "react-hook-form";
import { useMapStore, type IParcel } from "@/store/map.store";
import {
  TextInput,
  NumberInput,
  SelectInput,
  LocationDisplay,
  FormActions,
} from "@/components/shared/form";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { validationRules } from "@/utils/validation";
import { toastMessages } from "@/utils/toast-messages";
import { useFormWithLocation } from "@/hooks/useFormWithLocation";
import { areCoordinatesEqual, formatCoordinates } from "@/utils/coordinates";

const VENDORS = [
  { value: "اسنپ‌شاپ", label: "اسنپ‌شاپ" },
  { value: "اسنپ‌دکتر", label: "اسنپ‌دکتر" },
  { value: "اسنپ‌مارکت", label: "اسنپ‌مارکت" },
  { value: "اسنپ‌باکس", label: "اسنپ‌باکس" },
];

type ParcelFormData = {
  displayName: string;
  volume: number;
  vendor: string;
};

function ParcelsPage() {
  const parcels = useMapStore((state) => state.parcels);
  const pushParcel = useMapStore((state) => state.pushParcel);
  const removeParcelByIndex = useMapStore((state) => state.removeParcelByIndex);
  const updateParcelByIndex = useMapStore((state) => state.updateParcelByIndex);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);

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
      vendor: "",
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
    setValue("vendor", parcel.vendor || "");
    setActivePin({ lat: parcel.lat, lng: parcel.lng });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const parcel = parcels[index];
    if (selectedParcel && areCoordinatesEqual(selectedParcel, parcel)) {
      setSelectedParcel(null);
    }
    removeParcelByIndex(index);
  };

  const handleCancel = () => {
    handleFormCancel(reset);
  };

  return (
    <PageLayout title="مدیریت بسته‌ها">
      {/* Form */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white">
          {editingIndex !== null ? "ویرایش بسته" : "افزودن بسته جدید"}
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

          <SelectInput
            label="ونچر"
            placeholder="انتخاب ونچر"
            options={VENDORS}
            {...register("vendor")}
            error={errors.vendor}
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
            header: "ونچر",
            accessor: (parcel: IParcel) => (
              <span className="text-white">{parcel.vendor || "-"}</span>
            ),
          },
          {
            header: "موقعیت",
            accessor: (parcel: IParcel) => formatCoordinates(parcel),
          },
          {
            header: "حجم (لیتر)",
            accessor: (parcel: IParcel) => (
              <span className="text-white">{parcel.volume} لیتر</span>
            ),
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
