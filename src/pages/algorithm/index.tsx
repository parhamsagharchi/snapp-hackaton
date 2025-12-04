import { PageLayout } from "@/components/shared/layout/PageLayout";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function AlgorithmPage() {
  return (
    <PageLayout title="توضیح الگوریتم">
      <div className="space-y-3 text-sm text-slate-300">
        {/* Introduction */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            مقدمه
          </h2>
          <p className="text-xs leading-relaxed">
            این سیستم از الگوریتم‌های بهینه‌سازی مسیر برای پیدا کردن بهترین
            بسته‌ها برای راننده استفاده می‌کند. الگوریتم اصلی بر اساس مسئله
            فروشنده دوره‌گرد (TSP) و فیلتر کردن بر اساس شعاع‌های انتخاب است.
          </p>
        </section>

        {/* Haversine Formula */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۱. محاسبه فاصله با فرمول Haversine
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            برای محاسبه فاصله بین دو نقطه جغرافیایی از فرمول Haversine استفاده
            می‌شود که دقت بالایی برای فواصل کوتاه تا متوسط دارد.
          </p>
          <div className="rounded-md bg-slate-900/50 p-3">
            <div className="mb-3 text-xs text-slate-400">فرمول Haversine:</div>
            <div className="space-y-3">
              <div>
                <BlockMath math="a = \sin^2\left(\frac{\Delta lat}{2}\right) + \cos(lat_1) \times \cos(lat_2) \times \sin^2\left(\frac{\Delta lng}{2}\right)" />
              </div>
              <div>
                <BlockMath math="c = 2 \times \atan2(\sqrt{a}, \sqrt{1-a})" />
              </div>
              <div>
                <BlockMath math="d = R \times c" />
              </div>
              <div className="mt-3 text-xs text-slate-400">
                که در آن:
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>
                    <InlineMath math="R = 6371" /> کیلومتر (شعاع زمین)
                  </li>
                  <li>
                    <InlineMath math="\Delta lat = lat_2 - lat_1" />
                  </li>
                  <li>
                    <InlineMath math="\Delta lng = lng_2 - lng_1" />
                  </li>
                  <li>
                    <InlineMath math="d" /> = فاصله نهایی بر حسب کیلومتر
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Filtering Algorithm */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۲. فیلتر کردن بسته‌ها بر اساس شعاع‌های انتخاب
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            برای اینکه یک بسته قابل انتخاب باشد، باید دو شرط را برآورده کند:
          </p>
          <div className="space-y-3">
            <div className="rounded-md bg-slate-900/50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-green-400">
                شرط ۱: شعاع انتخاب مبدا
              </h3>
              <div className="text-slate-200">
                <BlockMath math="d(P_p, P_{par}) \leq R_{ori} + tolerance" />
              </div>
              <div className="mt-2 text-xs text-slate-400">
                که در آن:
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Pₚ = موقعیت مبدا مسافر</li>
                  <li>Pₚₐᵣ = موقعیت مبدا بسته</li>
                  <li>Rₒᵣᵢ = شعاع انتخاب مبدا (پیش‌فرض: 1500 متر)</li>
                  <li>tolerance = 50 متر (برای خطاهای محاسباتی)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-md bg-slate-900/50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-orange-400">
                شرط ۲: شعاع انتخاب مقصد
              </h3>
              <div className="text-slate-200">
                <BlockMath math="d(D_p, D_{par}) \leq R_{dest} + tolerance" />
              </div>
              <div className="mt-2 text-xs text-slate-400">
                که در آن:
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Dₚ = موقعیت مقصد مسافر</li>
                  <li>Dₚₐᵣ = موقعیت مقصد بسته</li>
                  <li>Rₑₛₜ = شعاع انتخاب مقصد (پیش‌فرض: 1500 متر)</li>
                  <li>tolerance = 50 متر</li>
                </ul>
              </div>
            </div>

            <div className="rounded-md bg-blue-900/20 border border-blue-500/30 p-3">
              <p className="text-xs text-blue-300">
                <strong>نکته:</strong> یک بسته فقط زمانی در لیست پیشنهادات قرار
                می‌گیرد که هر دو شرط را برآورده کند.
              </p>
            </div>
          </div>
        </section>

        {/* TSP Algorithm */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۳. الگوریتم TSP (مسئله فروشنده دوره‌گرد)
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            برای بهینه‌سازی مسیر از ترکیب دو الگوریتم استفاده می‌شود:
          </p>

          <div className="space-y-3">
            <div className="rounded-md bg-slate-900/50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-purple-400">
                ۳.۱. الگوریتم Nearest Neighbor (همسایه نزدیک)
              </h3>
              <p className="mb-2 text-xs text-slate-300">
                این الگوریتم یک راه‌حل اولیه سریع ایجاد می‌کند:
              </p>
              <div className="font-mono text-xs text-slate-200">
                <div className="mb-1">1. شروع از نقطه اول (راننده)</div>
                <div className="mb-1">
                  2. پیدا کردن نزدیک‌ترین نقطه بازدید نشده
                </div>
                <div className="mb-1">3. رفتن به آن نقطه</div>
                <div>4. تکرار تا تمام نقاط بازدید شوند</div>
              </div>
              <div className="mt-3 rounded bg-slate-800/50 p-2 text-xs">
                <div className="text-slate-400 mb-1">پیچیدگی زمانی:</div>
                <div className="text-slate-200">O(n²)</div>
              </div>
            </div>

            <div className="rounded-md bg-slate-900/50 p-3">
              <h3 className="mb-2 text-xs font-semibold text-yellow-400">
                ۳.۲. بهبود 2-Opt
              </h3>
              <p className="mb-2 text-xs text-slate-300">
                این الگوریتم راه‌حل اولیه را بهبود می‌دهد:
              </p>
              <div className="font-mono text-xs text-slate-200">
                <div className="mb-1">
                  برای هر جفت یال (i, i+1) و (j, j+1):
                </div>
                <div className="mb-1">
                  اگر d(i, j) + d(i+1, j+1) &lt; d(i, i+1) + d(j, j+1):
                </div>
                <div>برعکس کردن بخش بین i+1 و j</div>
              </div>
              <div className="mt-3 rounded bg-slate-800/50 p-2 text-xs">
                <div className="text-slate-400 mb-1">پیچیدگی زمانی:</div>
                <div className="text-slate-200">O(n² × iterations)</div>
                <div className="text-slate-400 mt-1">حداکثر iterations: 100</div>
              </div>
            </div>
          </div>
        </section>

        {/* Route Optimization */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۴. بهینه‌سازی مسیر با محدودیت‌ها
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            مسیر باید محدودیت‌های زیر را رعایت کند:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>
                مبدا مسافر باید قبل از مقصد مسافر باشد: Pₚ → Dₚ
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>
                مبدا بسته باید قبل از مقصد بسته باشد: Pₚₐᵣ → Dₚₐᵣ
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>
                ترتیب اولیه بر اساس تنظیمات کاربر (مسافر اول یا بسته اول)
              </span>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-slate-900/50 p-3">
            <div className="text-xs text-slate-200">
              <div className="mb-3">
                برای هر ترتیب معتبر، فاصله کل محاسبه می‌شود:
              </div>
              <div>
                <BlockMath math="D_{total} = \sum_{i=1}^{n-1} d(point_i, point_{i+1})" />
              </div>
              <div className="mt-3 text-slate-400">
                ترتیبی که کمترین <InlineMath math="D_{total}" /> را دارد انتخاب
                می‌شود.
              </div>
            </div>
          </div>
        </section>

        {/* Scoring Algorithm */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۵. سیستم امتیازدهی بسته‌ها
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            هر بسته بر اساس معیارهای زیر امتیازدهی می‌شود (امتیاز کمتر بهتر
            است):
          </p>
          <div className="rounded-md bg-slate-900/50 p-3">
            <div className="text-xs text-slate-200 space-y-3">
              <div>
                <BlockMath math="Score = w_1 \times D_{total} + w_2 \times D_{detour} + w_3 \times D_{first} + w_4 \times V_{norm} + w_5 \times A_{norm}" />
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-green-400">
                    <InlineMath math="w_1 = 0.30" />
                  </span>{" "}
                  → <InlineMath math="D_{total}" />: فاصله کل مسیر (کیلومتر)
                </div>
                <div>
                  <span className="text-green-400">
                    <InlineMath math="w_2 = 0.25" />
                  </span>{" "}
                  → <InlineMath math="D_{detour}" />: انحراف از مسیر مستقیم
                  مسافر (کیلومتر)
                </div>
                <div>
                  <span className="text-green-400">
                    <InlineMath math="w_3 = 0.15" />
                  </span>{" "}
                  → <InlineMath math="D_{first}" />: فاصله راننده تا اولین نقطه
                  برداشت (کیلومتر)
                </div>
                <div>
                  <span className="text-green-400">
                    <InlineMath math="w_4 = 0.10" />
                  </span>{" "}
                  → <InlineMath math="V_{norm}" />: حجم نرمال‌شده بسته (حداکثر
                  500 لیتر)
                </div>
                <div>
                  <span className="text-green-400">
                    <InlineMath math="w_5 = 0.20" />
                  </span>{" "}
                  → <InlineMath math="A_{norm}" />: هم‌راستایی مسیر (فاصله مقصد
                  بسته تا وسط مسیر مسافر)
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-blue-900/20 border border-blue-500/30 p-3">
            <div className="text-xs text-blue-300 space-y-2">
              <div>
                <BlockMath math="V_{norm} = \min\left(\frac{volume}{500}, 1\right)" />
              </div>
              <div>
                <BlockMath math="A_{norm} = \min\left(\frac{distance\_to\_route}{10}, 1\right)" />
              </div>
              <div>
                <BlockMath math="D_{detour} = \max(D_{total} - D_{direct}, 0)" />
              </div>
            </div>
          </div>
        </section>

        {/* Time Estimation */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۶. تخمین زمان سفر
          </h2>
          <p className="mb-2 text-xs leading-relaxed">
            زمان سفر بر اساس فاصله کل و سرعت متوسط محاسبه می‌شود:
          </p>
          <div className="rounded-md bg-slate-900/50 p-3">
            <div className="text-xs text-slate-200">
              <div className="mb-3">
                <BlockMath math="Time = \frac{D_{total}}{V_{avg}} \times 60" />
              </div>
              <div className="mt-3 text-xs text-slate-400">
                که در آن:
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>
                    <InlineMath math="D_{total}" /> = فاصله کل مسیر (کیلومتر)
                  </li>
                  <li>
                    <InlineMath math="V_{avg} = 50" /> کیلومتر بر ساعت (سرعت
                    متوسط)
                  </li>
                  <li>
                    <InlineMath math="Time" /> = زمان تخمینی (دقیقه)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Summary */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۷. خلاصه الگوریتم
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">1.</span>
              <span>فیلتر کردن بسته‌ها بر اساس شعاع‌های انتخاب</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">2.</span>
              <span>
                برای هر بسته معتبر، محاسبه مسیر بهینه با TSP و رعایت محدودیت‌ها
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">3.</span>
              <span>محاسبه امتیاز برای هر بسته</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">4.</span>
              <span>مرتب‌سازی بر اساس امتیاز (صعودی)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">5.</span>
              <span>برگرداندن N بسته برتر (پیش‌فرض: 5)</span>
            </div>
          </div>
        </section>

        {/* Complexity */}
        <section className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            ۸. پیچیدگی الگوریتم
          </h2>
          <div className="space-y-2 text-xs">
            <div className="rounded-md bg-slate-900/50 p-3">
              <div className="text-slate-200">
                <div className="mb-2">
                  <span className="text-blue-400">زمانی:</span>{" "}
                  <InlineMath math="O(m \times n^2)" />
                </div>
                <div className="text-xs text-slate-400">
                  که در آن <InlineMath math="m" /> = تعداد بسته‌های فیلتر شده،{" "}
                  <InlineMath math="n" /> = تعداد نقاط در مسیر (حداکثر 5)
                </div>
              </div>
            </div>
            <div className="rounded-md bg-slate-900/50 p-3">
              <div className="text-slate-200">
                <div className="mb-2">
                  <span className="text-blue-400">مکانی:</span>{" "}
                  <InlineMath math="O(m)" />
                </div>
                <div className="text-xs text-slate-400">
                  برای ذخیره لیست بسته‌های فیلتر شده و امتیازها
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default AlgorithmPage;

