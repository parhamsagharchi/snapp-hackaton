import { useMapStore, type IParcel } from "@/store/map.store";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { formatCoordinates } from "@/utils/coordinates";

function ParcelsPage() {
  const parcels = useMapStore((state) => state.parcels);

  return (
    <PageLayout title="مدیریت بسته‌ها">
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
        ]}
        emptyMessage="هیچ بسته‌ای ثبت نشده است"
        showActions={false}
      />
    </PageLayout>
  );
}

export default ParcelsPage;
