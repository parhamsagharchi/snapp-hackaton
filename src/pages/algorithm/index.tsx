import clsx from "clsx";
import { ContentOnlyLayout } from "@/components/shared/layout/ContentOnlyLayout";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

function AlgorithmPage() {
  const containerRef = useScrollAnimations();

  return (
    <ContentOnlyLayout title="توضیح الگوریتم">
      <div ref={containerRef} className="space-y-4 text-xs text-slate-300">
        {/* Introduction */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-primary/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              مقدمه
            </h2>
          </div>
          <p
            data-animate="text"
            className="text-xs leading-relaxed text-slate-300"
          >
            این سیستم از الگوریتم TSP و سیستم امتیازدهی برای پیدا کردن بهترین
            بسته‌ها استفاده می‌کند. بسته‌ها ابتدا بر اساس شعاع‌های مبدا و مقصد
            فیلتر می‌شوند، سپس مسیر بهینه محاسبه و امتیازدهی می‌شوند.
          </p>
        </section>

        {/* Overview Flow */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-blue-400/60 rounded-full"></div>
            <h2 className="text-base font-semibold text-white">
              نمای کلی الگوریتم
            </h2>
          </div>
          <div className="space-y-3">
            <div
              data-animate="stagger"
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3"
            >
              {[
                { step: "۰", title: "بررسی وضعیت", color: "text-cyan-300" },
                { step: "۱", title: "فیلتر مبدا", color: "text-green-300" },
                { step: "۲", title: "فیلتر مقصد", color: "text-orange-300" },
                {
                  step: "۳",
                  title: "بهینه‌سازی TSP",
                  color: "text-purple-300",
                },
                { step: "۴", title: "امتیازدهی", color: "text-yellow-300" },
                { step: "۵", title: "مرتب‌سازی", color: "text-blue-300" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-animate="stagger-item"
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <div
                    data-animate="icon"
                    className={clsx(
                      "w-10 h-10 rounded-full bg-slate-700/40 flex items-center justify-center font-semibold text-base border border-slate-600/50 bg-slate-800/40",
                      item.color
                    )}
                  >
                    {item.step}
                  </div>
                  <div className="text-[10px] text-center text-slate-400">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Algorithm Summary */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-indigo-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              مراحل الگوریتم
            </h2>
          </div>
          <div data-animate="stagger" className="space-y-2">
            {[
              {
                num: "۱",
                text: "بررسی وضعیت orderOptionsActive مسافر",
              },
              {
                num: "۲",
                text: "فیلتر بسته‌ها بر اساس شعاع مبدا (R_origin)",
              },
              {
                num: "۳",
                text: "فیلتر بسته‌ها بر اساس شعاع مقصد (R_destination)",
              },
              {
                num: "۴",
                text: "محاسبه مسیر بهینه با TSP برای هر بسته معتبر",
              },
              {
                num: "۵",
                text: "امتیازدهی بسته‌ها بر اساس ۴ معیار",
              },
              {
                num: "۶",
                text: "مرتب‌سازی و برگرداندن N بسته برتر",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                data-animate="stagger-item"
                className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/30 border border-slate-700/30"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                  <span className="text-indigo-300 font-semibold text-[10px]">
                    {item.num}
                  </span>
                </div>
                <div className="flex-1 text-xs text-slate-300 leading-relaxed">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TSP Algorithm */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-purple-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              الگوریتم TSP
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            برای بهینه‌سازی مسیر، تمام ترکیب‌های معتبر از نقاط (مبدا/مقصد مسافر
            و بسته) تولید می‌شود. راننده به ابتدای هر جایگشت اضافه می‌شود و مسیر
            با کمترین فاصله که محدودیت‌ها را رعایت می‌کند انتخاب می‌شود.
          </p>
        </section>

        {/* Scoring Algorithm */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-yellow-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              سیستم امتیازدهی
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            هر بسته بر اساس ۴ معیار نرمال‌سازی شده امتیازدهی می‌شود.{" "}
            <strong className="text-white">امتیاز کمتر بهتر است.</strong>
          </p>
          <div className="rounded-lg bg-slate-900/50 p-3 border border-slate-700/30 mb-3">
            <div className="text-xs font-medium text-yellow-300 mb-3">
              فرمول امتیازدهی:
            </div>
            <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
              <BlockMath math="Score = w_1 \times D_{total}^{norm} + w_2 \times D_{detour}^{norm} + w_3 \times D_{first}^{norm} + w_4 \times A_{norm}" />
            </div>
            <div className="space-y-2 text-[10px] mb-3">
              {[
                {
                  w: "w₁ = 0.35",
                  desc: "فاصله کل مسیر",
                  color: "text-blue-300",
                },
                {
                  w: "w₂ = 0.30",
                  desc: "انحراف از مسیر مستقیم",
                  color: "text-red-300",
                },
                {
                  w: "w₃ = 0.15",
                  desc: "فاصله تا اولین نقطه برداشت",
                  color: "text-green-300",
                },
                {
                  w: "w₄ = 0.20",
                  desc: "هم‌راستایی مسیر",
                  color: "text-orange-300",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-1.5 rounded bg-slate-800/20"
                >
                  <span
                    className={clsx(
                      "font-mono font-semibold min-w-[3.5rem]",
                      item.color
                    )}
                  >
                    {item.w}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-400 flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ContentOnlyLayout>
  );
}

export default AlgorithmPage;
