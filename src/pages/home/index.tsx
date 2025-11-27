import { PageLayout } from "@/components/shared/layout/PageLayout";

function HomePage() {
  return (
    <PageLayout title="صفحه اصلی">
      <p className="mt-2 text-xs text-slate-300">
        این صفحه اصلی است. از این بخش برای محتوای داشبورد استفاده کنید.
      </p>
    </PageLayout>
  );
}

export default HomePage;
