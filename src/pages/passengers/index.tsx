import { useMapStore, type IPassenger } from "@/store/map.store";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { formatCoordinates } from "@/utils/coordinates";
import { useTranslation } from "@/i18n";

function PassengersPage() {
  const { t, tName } = useTranslation();
  const passengers = useMapStore((state) => state.passengers);

  return (
    <PageLayout title={t("passengersPage.title")}>
      <DataTable
        data={passengers}
        columns={[
          {
            header: "#",
            accessor: (_, index) => index + 1,
          },
          {
            header: t("passengersPage.colName"),
            accessor: (passenger: IPassenger) => tName(passenger.displayName),
            className: "text-white",
          },
          {
            header: t("passengersPage.colLocation"),
            accessor: (passenger: IPassenger) => formatCoordinates(passenger),
          },
          {
            header: t("passengersPage.colOrderOptions"),
            accessor: (passenger) =>
              passenger.orderOptionsActive ? (
                <span className="text-yellow-400">{t("common.active")}</span>
              ) : (
                <span className="text-slate-500">{t("common.inactive")}</span>
              ),
          },
        ]}
        emptyMessage={t("passengersPage.empty")}
        showActions={false}
      />
    </PageLayout>
  );
}

export default PassengersPage;
