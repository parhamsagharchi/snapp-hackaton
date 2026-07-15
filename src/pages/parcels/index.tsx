import { useMapStore, type IParcel } from "@/store/map.store";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { formatCoordinates } from "@/utils/coordinates";
import { useTranslation } from "@/i18n";

function ParcelsPage() {
  const { t, tName } = useTranslation();
  const parcels = useMapStore((state) => state.parcels);

  return (
    <PageLayout title={t("parcelsPage.title")}>
      <DataTable
        data={parcels}
        columns={[
          {
            header: "#",
            accessor: (_, index) => index + 1,
          },
          {
            header: t("parcelsPage.colName"),
            accessor: (parcel: IParcel) => tName(parcel.displayName),
            className: "text-white",
          },
          {
            header: t("parcelsPage.colVendor"),
            accessor: (parcel: IParcel) => (
              <span className="text-white">
                {parcel.vendor ? tName(parcel.vendor) : "-"}
              </span>
            ),
          },
          {
            header: t("parcelsPage.colLocation"),
            accessor: (parcel: IParcel) => formatCoordinates(parcel),
          },
        ]}
        emptyMessage={t("parcelsPage.empty")}
        showActions={false}
      />
    </PageLayout>
  );
}

export default ParcelsPage;
