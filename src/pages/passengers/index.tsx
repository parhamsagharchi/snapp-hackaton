import { useMapStore, type IPassenger } from "@/store/map.store";
import { DataTable } from "@/components/shared/table/DataTable";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { formatCoordinates } from "@/utils/coordinates";

function PassengersPage() {
  const passengers = useMapStore((state) => state.passengers);

  return (
    <PageLayout title="مسافر‌ها">
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
            accessor: (passenger: IPassenger) => formatCoordinates(passenger),
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
        showActions={false}
      />
    </PageLayout>
  );
}

export default PassengersPage;
