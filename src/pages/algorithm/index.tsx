import { ContentOnlyLayout } from "@/components/shared/layout/ContentOnlyLayout";
import { InlineMath, BlockMath } from "react-katex";
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
            این سیستم از ترکیب الگوریتم‌های بهینه‌سازی مسیر و سیستم امتیازدهی
            هوشمند برای پیدا کردن بهترین بسته‌ها برای راننده استفاده می‌کند.
            الگوریتم اصلی بر اساس مسئله فروشنده دوره‌گرد (TSP) با بهبود 2-Opt و
            فیلتر کردن دو مرحله‌ای بر اساس شعاع‌های انتخاب مبدا و مقصد است.
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
                    className={`w-10 h-10 rounded-full bg-slate-700/40 flex items-center justify-center ${item.color} font-semibold text-base border border-slate-600/50 bg-slate-800/40`}
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

        {/* Haversine Formula */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-green-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              ۱. محاسبه فاصله با فرمول Haversine
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-3 text-xs leading-relaxed text-slate-300"
          >
            برای محاسبه دقیق فاصله بین دو نقطه جغرافیایی روی کره زمین از فرمول
            Haversine استفاده می‌شود. این فرمول دقت بالایی برای فواصل کوتاه تا
            متوسط دارد و در محاسبات مسیریابی استفاده می‌شود.
          </p>
          <div className="rounded-lg bg-slate-900/50 p-3 border border-slate-700/30">
            <div className="mb-3 text-xs font-medium text-green-300">
              فرمول Haversine:
            </div>
            <div className="space-y-2">
              <div className="bg-slate-800/40 rounded-lg p-3">
                <BlockMath math="a = \sin^2\left(\frac{\Delta lat}{2}\right) + \cos(lat_1) \times \cos(lat_2) \times \sin^2\left(\frac{\Delta lng}{2}\right)" />
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3">
                <BlockMath math="c = 2 \times \atan2(\sqrt{a}, \sqrt{1-a})" />
              </div>
              <div className="bg-slate-800/40 rounded-lg p-3">
                <BlockMath math="d = R \times c" />
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/40">
                <div className="text-[10px] text-slate-400 mb-2">
                  پارامترها:
                </div>
                <div className="grid gap-1.5 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 font-mono">R</span>
                    <span className="text-slate-300">=</span>
                    <InlineMath math="6371" />
                    <span className="text-slate-400 mr-2">
                      کیلومتر (شعاع زمین)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 font-mono">Δlat</span>
                    <span className="text-slate-400">=</span>
                    <InlineMath math="lat_2 - lat_1" />
                    <span className="text-slate-500 mr-2">
                      (تفاضل عرض جغرافیایی)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 font-mono">Δlng</span>
                    <span className="text-slate-400">=</span>
                    <InlineMath math="lng_2 - lng_1" />
                    <span className="text-slate-500 mr-2">
                      (تفاضل طول جغرافیایی)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-300 font-mono">d</span>
                    <span className="text-slate-300">=</span>
                    <span className="text-slate-400">
                      فاصله نهایی بر حسب کیلومتر
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtering Algorithm */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-orange-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              ۲. فیلتر کردن بسته‌ها بر اساس شعاع‌های انتخاب
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            برای اینکه یک بسته در لیست پیشنهادات قرار گیرد، باید{" "}
            <strong className="text-white">هر دو شرط</strong> زیر را به طور
            همزمان برآورده کند. این فیلتر دو مرحله‌ای باعث می‌شود فقط بسته‌هایی
            که در مسیر مناسب قرار دارند انتخاب شوند.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-green-900/10 border border-green-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
                <h3 className="text-xs font-medium text-green-300">
                  شرط ۱: فیلتر بر اساس شعاع انتخاب مبدا
                </h3>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-2">
                <BlockMath math="d(P_{passenger}, P_{parcel}) \leq R_{origin} + tolerance" />
              </div>
              <div className="text-[10px] text-slate-400 space-y-1.5">
                <div className="grid gap-1.5">
                  <div>
                    <span className="text-green-300 font-mono">
                      P_passenger
                    </span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = موقعیت مبدا مسافر
                    </span>
                  </div>
                  <div>
                    <span className="text-green-300 font-mono">P_parcel</span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = موقعیت مبدا بسته
                    </span>
                  </div>
                  <div>
                    <span className="text-green-300 font-mono">R_origin</span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = شعاع انتخاب مبدا (پیش‌فرض: 1500 متر، محدوده: 1000-2000
                      متر)
                    </span>
                  </div>
                  <div>
                    <span className="text-green-300 font-mono">tolerance</span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = 50 متر (برای خطاهای محاسباتی و کاربرپسندی)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-orange-900/10 border border-orange-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div>
                <h3 className="text-xs font-medium text-orange-300">
                  شرط ۲: فیلتر بر اساس شعاع انتخاب مقصد
                </h3>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-2">
                <BlockMath math="d(D_{passenger}, D_{parcel}) \leq R_{destination} + tolerance" />
              </div>
              <div className="text-[10px] text-slate-400 space-y-1.5">
                <div className="grid gap-1.5">
                  <div>
                    <span className="text-orange-300 font-mono">
                      D_passenger
                    </span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = موقعیت مقصد مسافر
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-300 font-mono">D_parcel</span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = موقعیت مقصد بسته
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-300 font-mono">
                      R_destination
                    </span>
                    <span className="text-slate-500 mr-2">
                      {" "}
                      = شعاع انتخاب مقصد (پیش‌فرض: 1500 متر، محدوده: 1000-2000
                      متر)
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-300 font-mono">tolerance</span>
                    <span className="text-slate-500 mr-2"> = 50 متر</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-900/15 border border-blue-500/25 p-3">
              <div className="flex items-start gap-2">
                <div className="text-blue-300 text-base">💡</div>
                <div>
                  <p className="text-xs font-medium text-blue-300 mb-1">
                    نکته مهم:
                  </p>
                  <p className="text-[10px] text-blue-200/80">
                    یک بسته فقط زمانی در لیست پیشنهادات قرار می‌گیرد که{" "}
                    <strong>هر دو شرط</strong> را به طور همزمان برآورده کند. این
                    رویکرد دو مرحله‌ای باعث می‌شود بسته‌هایی که هم در مبدا و هم
                    در مقصد در مسیر مناسب هستند انتخاب شوند.
                  </p>
                </div>
              </div>
            </div>
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
              ۳. الگوریتم TSP (مسئله فروشنده دوره‌گرد)
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            برای بهینه‌سازی مسیر از ترکیب دو الگوریتم استفاده می‌شود: ابتدا
            الگوریتم Nearest Neighbor برای ایجاد راه‌حل اولیه سریع، سپس بهبود
            2-Opt برای بهینه‌سازی بیشتر مسیر.
          </p>

          <div className="space-y-3">
            <div className="rounded-lg bg-purple-900/10 border border-purple-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-300"></div>
                <h3 className="text-xs font-medium text-purple-300">
                  ۳.۱. الگوریتم Nearest Neighbor (همسایه نزدیک)
                </h3>
              </div>
              <p className="mb-3 text-[10px] text-slate-400 leading-relaxed">
                این الگوریتم یک راه‌حل اولیه سریع ایجاد می‌کند:
              </p>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-3">
                <div className="font-mono text-[10px] text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-semibold">1.</span>
                    <span>شروع از نقطه اول (موقعیت راننده)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-semibold">2.</span>
                    <span>پیدا کردن نزدیک‌ترین نقطه بازدید نشده</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-semibold">3.</span>
                    <span>رفتن به آن نقطه و اضافه کردن به مسیر</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-semibold">4.</span>
                    <span>تکرار تا تمام نقاط بازدید شوند</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-800/40 p-2 border border-slate-700/40">
                <div className="text-[10px] text-slate-400 mb-1">
                  پیچیدگی زمانی:
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  <InlineMath math="O(n^2)" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  که در آن <InlineMath math="n" /> = تعداد نقاط در مسیر
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-yellow-900/10 border border-yellow-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-300"></div>
                <h3 className="text-xs font-medium text-yellow-300">
                  ۳.۲. بهبود 2-Opt
                </h3>
              </div>
              <p className="mb-3 text-[10px] text-slate-400 leading-relaxed">
                این الگوریتم راه‌حل اولیه را با جستجوی محلی بهبود می‌دهد:
              </p>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-3">
                <div className="font-mono text-[10px] text-slate-300 space-y-1.5">
                  <div className="mb-2">
                    برای هر جفت یال <InlineMath math="(i, i+1)" /> و{" "}
                    <InlineMath math="(j, j+1)" />:
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 font-semibold">if</span>
                    <span>
                      <InlineMath math="d(i, j) + d(i+1, j+1) < d(i, i+1) + d(j, j+1)" />
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mt-1.5">
                    <span className="text-yellow-300 font-semibold">then</span>
                    <span>
                      برعکس کردن بخش مسیر بین <InlineMath math="i+1" /> و{" "}
                      <InlineMath math="j" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-800/40 p-2 border border-slate-700/40">
                <div className="text-[10px] text-slate-400 mb-1">
                  پیچیدگی زمانی:
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  <InlineMath math="O(n^2 \times iterations)" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  حداکثر iterations:{" "}
                  <strong className="text-yellow-300">100</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Optimization */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-blue-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              ۴. بهینه‌سازی مسیر با محدودیت‌ها
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            مسیر باید محدودیت‌های زیر را رعایت کند تا منطقی و قابل اجرا باشد:
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2 p-2 rounded-lg bg-green-900/10 border border-green-500/20">
              <span className="text-green-300 text-sm">✓</span>
              <div className="flex-1">
                <div className="text-[10px] font-medium text-green-300 mb-0.5">
                  محدودیت ۱:
                </div>
                <div className="text-[10px] text-slate-400">
                  مبدا مسافر باید قبل از مقصد مسافر باشد:{" "}
                  <InlineMath math="P_{passenger} \rightarrow D_{passenger}" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-lg bg-green-900/10 border border-green-500/20">
              <span className="text-green-300 text-sm">✓</span>
              <div className="flex-1">
                <div className="text-[10px] font-medium text-green-300 mb-0.5">
                  محدودیت ۲:
                </div>
                <div className="text-[10px] text-slate-400">
                  مبدا بسته باید قبل از مقصد بسته باشد:{" "}
                  <InlineMath math="P_{parcel} \rightarrow D_{parcel}" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-lg bg-green-900/10 border border-green-500/20">
              <span className="text-green-300 text-sm">✓</span>
              <div className="flex-1">
                <div className="text-[10px] font-medium text-green-300 mb-0.5">
                  محدودیت ۳:
                </div>
                <div className="text-[10px] text-slate-400">
                  ترتیب اولیه بر اساس تنظیمات کاربر (مسافر اول یا بسته اول)
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-900/50 p-3 border border-slate-700/30">
            <div className="text-[10px] text-slate-300 mb-3">
              برای هر ترتیب معتبر، فاصله کل مسیر محاسبه می‌شود:
            </div>
            <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
              <BlockMath math="D_{total} = \sum_{i=1}^{n-1} d(point_i, point_{i+1})" />
            </div>
            <div className="text-[10px] text-slate-500">
              ترتیبی که کمترین <InlineMath math="D_{total}" /> را دارد به عنوان
              مسیر بهینه انتخاب می‌شود.
            </div>
          </div>
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
              ۵. سیستم امتیازدهی هوشمند بسته‌ها
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            هر بسته بر اساس ۵ معیار مختلف امتیازدهی می‌شود.{" "}
            <strong className="text-white">امتیاز کمتر بهتر است</strong> و
            نشان‌دهنده مناسب‌تر بودن بسته برای راننده است.
          </p>
          <div className="rounded-lg bg-slate-900/50 p-3 border border-slate-700/30 mb-3">
            <div className="text-xs font-medium text-yellow-300 mb-3">
              فرمول امتیازدهی:
            </div>
            <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
              <BlockMath math="Score = w_1 \times D_{total} + w_2 \times D_{detour} + w_3 \times D_{first} + w_4 \times V_{norm} + w_5 \times A_{norm}" />
            </div>
            <div className="space-y-2 text-[10px]">
              {[
                {
                  w: "w₁ = 0.30",
                  desc: "D_total: فاصله کل مسیر (کیلومتر)",
                  color: "text-blue-300",
                },
                {
                  w: "w₂ = 0.25",
                  desc: "D_detour: انحراف از مسیر مستقیم مسافر (کیلومتر)",
                  color: "text-red-300",
                },
                {
                  w: "w₃ = 0.15",
                  desc: "D_first: فاصله راننده تا اولین نقطه برداشت (کیلومتر)",
                  color: "text-green-300",
                },
                {
                  w: "w₄ = 0.10",
                  desc: "V_norm: حجم نرمال‌شده بسته (حداکثر 500 لیتر)",
                  color: "text-purple-300",
                },
                {
                  w: "w₅ = 0.20",
                  desc: "A_norm: هم‌راستایی مسیر (فاصله مقصد بسته تا وسط مسیر مسافر)",
                  color: "text-orange-300",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-1.5 rounded bg-slate-800/20"
                >
                  <span
                    className={`font-mono font-semibold ${item.color} min-w-[3.5rem]`}
                  >
                    {item.w}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-400 flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-blue-900/15 border border-blue-500/25 p-3">
            <div className="text-[10px] font-medium text-blue-300 mb-2">
              فرمول‌های نرمال‌سازی:
            </div>
            <div className="space-y-2">
              <div className="bg-slate-900/40 rounded-lg p-2">
                <BlockMath math="V_{norm} = \min\left(\frac{volume}{500}, 1\right)" />
                <div className="text-[10px] text-slate-500 mt-1">
                  حجم بسته نرمال‌شده (حداکثر 500 لیتر)
                </div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-2">
                <BlockMath math="A_{norm} = \min\left(\frac{distance\_to\_route}{10}, 1\right)" />
                <div className="text-[10px] text-slate-500 mt-1">
                  هم‌راستایی مسیر (حداکثر 10 کیلومتر)
                </div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-2">
                <BlockMath math="D_{detour} = \max(D_{total} - D_{direct}, 0)" />
                <div className="text-[10px] text-slate-500 mt-1">
                  انحراف از مسیر مستقیم (همیشه مثبت)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Time Estimation */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-cyan-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              ۶. تخمین زمان سفر
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300"
          >
            زمان سفر بر اساس فاصله کل مسیر و سرعت متوسط محاسبه می‌شود:
          </p>
          <div className="rounded-lg bg-slate-900/50 p-3 border border-slate-700/30">
            <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
              <BlockMath math="Time = \frac{D_{total}}{V_{avg}} \times 60" />
            </div>
            <div className="text-[10px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-mono">D_total</span>
                <span className="text-slate-500">
                  = فاصله کل مسیر (کیلومتر)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-mono">V_avg</span>
                <span className="text-slate-500">
                  = 50 کیلومتر بر ساعت (سرعت متوسط در شهر)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-mono">Time</span>
                <span className="text-slate-500">= زمان تخمینی (دقیقه)</span>
              </div>
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
              ۷. خلاصه مراحل الگوریتم
            </h2>
          </div>
          <div data-animate="stagger" className="space-y-2">
            {[
              {
                num: "۱",
                text: "فیلتر کردن بسته‌ها بر اساس شعاع انتخاب مبدا (R_origin)",
              },
              {
                num: "۲",
                text: "فیلتر کردن بسته‌های باقی‌مانده بر اساس شعاع انتخاب مقصد (R_destination)",
              },
              {
                num: "۳",
                text: "برای هر بسته معتبر، محاسبه مسیر بهینه با TSP و رعایت محدودیت‌ها",
              },
              { num: "۴", text: "محاسبه امتیاز برای هر بسته بر اساس ۵ معیار" },
              {
                num: "۵",
                text: "مرتب‌سازی بسته‌ها بر اساس امتیاز (صعودی - امتیاز کمتر بهتر است)",
              },
              { num: "۶", text: "برگرداندن N بسته برتر (پیش‌فرض: 5 بسته)" },
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

        {/* Complexity */}
        <section
          data-animate="section"
          className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-pink-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              ۸. تحلیل پیچیدگی الگوریتم
            </h2>
          </div>
          <div data-animate="stagger" className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-pink-900/10 border border-pink-500/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-300"></div>
                <h3 className="text-xs font-medium text-pink-300">
                  پیچیدگی زمانی
                </h3>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-2">
                <div className="text-sm font-mono text-pink-300 mb-1.5">
                  <InlineMath math="O(m \times n^2)" />
                </div>
                <div className="text-[10px] text-slate-500 space-y-1">
                  <div>
                    <InlineMath math="m" /> = تعداد بسته‌های فیلتر شده
                  </div>
                  <div>
                    <InlineMath math="n" /> = تعداد نقاط در مسیر (حداکثر 5:
                    راننده، مبدا/مقصد مسافر، مبدا/مقصد بسته)
                  </div>
                </div>
              </div>
            </div>
            <div
              data-animate="stagger-item"
              className="rounded-lg bg-teal-900/10 border border-teal-500/20 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  data-animate="icon"
                  className="w-1.5 h-1.5 rounded-full bg-teal-300"
                ></div>
                <h3 className="text-xs font-medium text-teal-300">
                  پیچیدگی مکانی
                </h3>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-3 mb-2">
                <div className="text-sm font-mono text-teal-300 mb-1.5">
                  <InlineMath math="O(m)" />
                </div>
                <div className="text-[10px] text-slate-500">
                  برای ذخیره لیست بسته‌های فیلتر شده و امتیازهای محاسبه شده
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ContentOnlyLayout>
  );
}

export default AlgorithmPage;
