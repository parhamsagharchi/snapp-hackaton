import clsx from "clsx";
import { ContentOnlyLayout } from "@/components/shared/layout/ContentOnlyLayout";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SNAPP_SERVICES } from "./pitch.constant";

function PitchPage() {
  const containerRef = useScrollAnimations();

  return (
    <ContentOnlyLayout title="SnappShare – استفاده هوشمند از ظرفیت خالی خودروها برای حمل مرسوله">
      <div ref={containerRef} className="space-y-5 text-sm text-slate-300">
        {/* Hero Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-primary/20 bg-primary/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-primary/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-xl font-semibold text-white"
            >
              ایده ما
            </h2>
          </div>
          <p
            data-animate="text"
            className="text-sm leading-relaxed text-slate-200 mb-4"
          >
            در شرایط امروز که قیمت بنزین به‌طور مداوم افزایش یافته و آلودگی هوا
            به یکی از مسائل جدی شهرهای بزرگ تبدیل شده، اهمیت کاهش هزینه‌ها،
            مسئولیت‌پذیری اجتماعی و بهینه‌سازی سفرهای شهری بیش از هر زمان دیگری
            احساس می‌شود.
          </p>
          <p
            data-animate="text"
            className="text-sm leading-relaxed text-slate-200"
          >
            تیم ما با همین نگاه، طرح{" "}
            <strong className="text-primary">SnappShare</strong> را طراحی کرده
            است؛ راهکاری هوشمند که از ظرفیت بلااستفاده صندوق عقب خودروهای اسنپ،
            بدون ایجاد کوچک‌ترین اختلال در سفر مسافر، برای حمل مرسولات کوچک و
            میان‌رده استفاده می‌کند.
          </p>
        </section>

        {/* Problem Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-red-500/20 bg-red-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-red-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              مسئله‌ای که وجود دارد
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            روزانه هزاران راننده اسنپ مسیرهای طولانی را بدون همراه داشتن هیچ بار
            یا مرسوله‌ای طی می‌کنند؛ در حالی که هم‌زمان در بازار سفارش‌هایی وجود
            دارد که:
          </p>
          <div data-animate="stagger" className="space-y-3">
            <div
              data-animate="stagger-item"
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/40"
            >
              <span data-animate="icon" className="text-red-300 text-lg">
                ✗
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-200">
                  برای بایک بیش از حد بزرگ یا سنگین هستند
                </p>
              </div>
            </div>
            <div
              data-animate="stagger-item"
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/40"
            >
              <span data-animate="icon" className="text-red-300 text-lg">
                ✗
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-200">
                  و برای وانت سبک بسیار کوچک و کم‌وزن‌اند
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-red-900/25 border border-red-500/40">
            <p className="text-sm text-red-100 font-medium">
              در نتیجه بخش بزرگی از یک نیاز واقعی بازار، بی‌پاسخ باقی می‌ماند.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-green-500/20 bg-green-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-green-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              راه‌حل SnappShare
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-5 text-sm leading-relaxed text-slate-200 font-medium"
          >
            ما این ظرفیت خالی و استفاده‌نشده را به یک منبع درآمد جدید، بهینه و
            پایدار تبدیل می‌کنیم. در این طرح:
          </p>
          <div data-animate="stagger" className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: "👤",
                title: "مسافر",
                desc: "بدون هیچ تغییری در کیفیت سفر جابه‌جا می‌شود",
                color: "bg-blue-900/20",
                border: "border-blue-500/30",
              },
              {
                icon: "🚗",
                title: "راننده",
                desc: "از همان مسیر واقعی خود، درآمد اضافی بدون هزینه اضافی به دست می‌آورد",
                color: "bg-green-900/20",
                border: "border-green-500/30",
              },
              {
                icon: "📱",
                title: "پلتفرم اسنپ",
                desc: "سفارش‌های جدید و ارزشمند جذب می‌کند",
                color: "bg-purple-900/20",
                border: "border-purple-500/30",
              },
              {
                icon: "🌱",
                title: "شهر",
                desc: "از کاهش تردد اضافه و کاهش آلودگی هوا بهره‌مند می‌شود",
                color: "bg-teal-900/20",
                border: "border-teal-500/30",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                data-animate="stagger-item"
                className={clsx(
                  "rounded-lg border p-4",
                  item.color,
                  item.border
                )}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span data-animate="icon" className="text-2xl">
                    {item.icon}
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-blue-500/20 bg-blue-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-blue-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              چطور کار می‌کند؟
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-blue-300 mb-3">
                ۱. ثبت سفارش Car Cargo
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-3">
                کاربر یک سفارش <strong className="text-white">Car Cargo</strong>{" "}
                ثبت می‌کند؛ سفارش‌هایی در محدوده ابعاد صندوق عقب که بین «Bike
                Box» و «Van Cargo» قرار می‌گیرند.
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-blue-900/20 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-200 mb-2">
                  برای ایجاد اعتماد حداکثری، کاربر جزئیاتی مثل:
                </p>
                <ul className="space-y-1.5 text-sm text-blue-100">
                  <li>• نوع و ماهیت بسته</li>
                  <li>• ارزش تقریبی</li>
                  <li>• وزن و ابعاد</li>
                  <li>• شرایط خاص حمل</li>
                </ul>
                <p className="text-sm text-blue-100 mt-2">
                  را به‌وضوح مشخص می‌کند.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-purple-300 mb-3">
                ۲. الگوریتم هوشمند تطبیق مسیر
              </h3>
              <div className="space-y-2.5 text-sm text-slate-200">
                <p className="mb-2">پس از ثبت سفارش:</p>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">
                    سیستم، سفرهایی را که مبدا و مقصدشان در شعاع مناسب با سفارش
                    قرار دارد، شناسایی می‌کند
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">
                    سفارش برای رانندگان نزدیک ارسال می‌شود
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">
                    راننده با مشاهده جزئیات بار، می‌تواند سفارش را بپذیرد یا
                    صرفاً سفر معمولی خود را ادامه دهد
                  </p>
                </div>
                <div className="mt-3 p-3.5 rounded-lg bg-purple-900/20 border border-purple-500/30">
                  <p className="text-sm text-purple-100 leading-relaxed">
                    <strong className="text-purple-200 font-semibold">
                      الگوریتم ما
                    </strong>{" "}
                    بهترین ترکیب بین سفر مسافر + سفارش کارگو را بدون ایجاد
                    انحراف یا تأخیر ارائه می‌دهد
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-green-300 mb-3">
                ۳. تحویل بدون اختلال
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-3">
                راننده طبق روال مسافر را جابه‌جا کرده و در نهایت بسته را در مقصد
                یا نزدیک‌ترین نقطه تحویل می‌دهد.
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-green-900/20 border border-green-500/30">
                <p className="text-sm text-green-100 leading-relaxed">
                  این فرآیند بدون هیچ اختلالی در تجربه سفر مسافر طراحی شده و
                  کاملاً با مسیر طبیعی راننده هماهنگ است.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section
          data-animate="section"
          className="rounded-lg border border-yellow-500/20 bg-yellow-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-yellow-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              مزایای کلیدی طرح
            </h2>
          </div>
          <div data-animate="stagger" className="grid gap-3 md:grid-cols-2">
            {[
              "درآمد اضافه و بدون هزینه برای راننده",
              "افزایش سفارش و درآمد برای پلتفرم",
              "کاهش سفرهای اضافه و کمک به کاهش آلودگی",
              "پاسخ دقیق به نیاز بازار در بازه‌ی «بین موتور و وانت»",
              "ایجاد یک شبکه هوشمند، کارآمد و پایدار در حمل‌ونقل شهری",
            ].map((benefit, idx) => (
              <div
                key={idx}
                data-animate="stagger-item"
                className="flex items-start gap-3 p-3.5 rounded-lg bg-yellow-900/15 border border-yellow-500/30"
              >
                <span data-animate="icon" className="text-yellow-300 text-lg">
                  ✓
                </span>
                <p className="text-sm text-slate-200 flex-1 leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section
          data-animate="section"
          className="rounded-lg border border-orange-500/20 bg-orange-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-orange-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              محدودیت‌های فاز اول
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            برای ارائه یک پروتوتایپ دقیق و پایدار:
          </p>
          <div data-animate="stagger" className="space-y-3">
            <div
              data-animate="stagger-item"
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/40"
            >
              <span data-animate="icon" className="text-orange-300 text-base">
                ⚠
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-200 leading-relaxed">
                  سفارش‌های چندمقصدی در این فاز پشتیبانی نمی‌شود
                </p>
              </div>
            </div>
            <div
              data-animate="stagger-item"
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/40"
            >
              <span data-animate="icon" className="text-orange-300 text-base">
                ⚠
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-200 leading-relaxed">
                  سفرهای دارای مقصد دوم، توقف میانی یا بار اضافی فعلاً وارد
                  تطبیق نمی‌شوند
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-orange-900/25 border border-orange-500/40">
            <p className="text-sm text-orange-100 leading-relaxed">
              این محدودیت‌ها باعث می‌شود نسخه اولیه سریع‌تر و با تجربه کاربری
              ساده‌تر ارائه شود.
            </p>
          </div>
        </section>

        {/* Opportunity Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-indigo-500/20 bg-indigo-900/10 p-5 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-indigo-400/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              فرصت بزرگ پیش‌ رو
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            با SnappShare می‌توانیم بخشی از سفارش‌های پرترافیک و حساس مجموعه‌های
            زیر را به‌صورت هوشمند هندل کنیم:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {SNAPP_SERVICES?.map((item, idx) => (
              <div
                key={idx}
                data-animate="stagger-item"
                className={clsx(
                  "group relative p-4 rounded-xl bg-gradient-to-br border-2 text-center transition-all duration-300",
                  // "hover:scale-105 hover:shadow-xl hover:-translate-y-1",
                  "backdrop-blur-sm overflow-hidden",
                  item.color,
                  item.borderColor,
                  "hover:border-opacity-70"
                )}
              >
                <div className="relative z-10 flex flex-col items-center gap-2.5">
                  <img
                    src={item.iconUrl}
                    alt={item.name}
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <p
                    className={clsx(
                      "text-sm font-bold tracking-wide",
                      item.textColor
                    )}
                  >
                    {item.name}
                  </p>
                </div>
                <div
                  className={clsx(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                    "bg-gradient-to-br",
                    item.color.replace("/20", "/40").replace("/20", "/40")
                  )}
                />
              </div>
            ))}
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            به‌خصوص در زمان‌های اوج مانند عید، سال تحویل، بلک‌فرایدی و
            مناسبت‌های پرترافیک.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-slate-200 leading-relaxed">
              از طرفی با افزایش قیمت بنزین، هزینه سفرها بالا رفته و احتمال کاهش
              سفارش‌ها وجود دارد. SnappShare نه‌تنها از کاهش جلوگیری می‌کند،
              بلکه با ایجاد یک مسیر نوآورانه، حجم سفرها و سفارش‌ها را به‌شدت
              افزایش می‌دهد.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              هم‌اکنون بسیاری از رانندگان، هم‌زمان با سفر خود در پلتفرم‌های دیگر
              بار جابه‌جا می‌کنند که باعث خروج درآمد ارزشمند از اکوسیستم اسنپ
              می‌شود. SnappShare این فرایند را قانونمند، ایمن و منسجم می‌کند و
              درآمدی که پیش‌تر از دست می‌رفت را دوباره به پلتفرم بازمی‌گرداند.
            </p>
          </div>
        </section>

        {/* Algorithm Section */}
        <section
          data-animate="section"
          className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 p-6 shadow-lg backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-1 w-16 bg-gradient-to-r from-primary via-indigo-400 to-purple-400 rounded-full shadow-lg shadow-primary/30"></div>
              <h2
                data-animate="heading"
                className="text-2xl font-bold text-white drop-shadow-sm"
              >
                الگوریتم TSP فروشنده دور گرد
              </h2>
            </div>
            <p
              data-animate="text"
              className="text-sm leading-relaxed text-slate-100 mb-6 bg-slate-900/30 rounded-lg p-4 border border-slate-700/30"
            >
              این سیستم از الگوریتم TSP (فروشنده دورگرد) با روش{" "}
              <strong className="text-primary font-semibold">
                Nearest Neighbor
              </strong>{" "}
              و بهبود{" "}
              <strong className="text-primary font-semibold">2-opt</strong> برای
              محاسبه مسیر بهینه استفاده می‌کند. بسته‌ها ابتدا بر اساس شعاع‌های
              مبدا و مقصد فیلتر می‌شوند، سپس مسیر بهینه محاسبه و بر اساس ۴ معیار
              نرمال‌سازی شده امتیازدهی می‌شوند.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-1 w-14 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-md shadow-indigo-500/20"></div>
              <h2
                data-animate="heading"
                className="text-xl font-bold text-white"
              >
                مراحل الگوریتم
              </h2>
            </div>
            <div data-animate="stagger" className="space-y-4">
              {[
                {
                  num: "۱",
                  text: "فیلتر بسته‌ها بر اساس شعاع مبدا: فاصله بین مبدا مسافر و مبدا بسته باید کمتر یا مساوی R_origin + tolerance (پیش‌فرض: 2 کیلومتر) باشد",
                },
                {
                  num: "۲",
                  text: "فیلتر بسته‌ها بر اساس شعاع مقصد: فاصله بین مقصد مسافر و مقصد بسته باید کمتر یا مساوی R_destination + tolerance (پیش‌فرض: 2 کیلومتر) باشد",
                },
                {
                  num: "۳",
                  text: "محاسبه مسیر بهینه با TSP: برای هر بسته معتبر، تمام ترکیبات معتبر مسیر (با رعایت محدودیت‌های ترتیب: مبدا مسافر قبل از مقصد، مبدا بسته قبل از مقصد) تولید و کوتاه‌ترین مسیر انتخاب می‌شود",
                },
                {
                  num: "۴",
                  text: "بهبود مسیر با الگوریتم 2-opt: مسیر اولیه با Nearest Neighbor به‌دست آمده و سپس با الگوریتم 2-opt بهبود داده می‌شود تا مسیر بهینه‌تر شود",
                },
                {
                  num: "۵",
                  text: "محاسبه ۴ معیار برای هر بسته: فاصله کل مسیر، انحراف از مسیر مستقیم، فاصله تا اولین نقطه برداشت، و هم‌راستایی مقصد بسته با مسیر مسافر",
                },
                {
                  num: "۶",
                  text: "نرمال‌سازی و امتیازدهی: تمام معیارها به بازه 0-1 نرمال‌سازی شده و با وزن‌های مشخص ترکیب می‌شوند",
                },
                {
                  num: "۷",
                  text: "مرتب‌سازی و برگرداندن N بسته برتر: بسته‌ها بر اساس امتیاز (کمتر بهتر است) مرتب شده و N بسته برتر برگردانده می‌شود",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-animate="stagger-item"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900/60 via-slate-900/50 to-slate-900/60 border border-slate-700/50 shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/70"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 border-2 border-indigo-400/50 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-indigo-100 font-bold text-sm">
                      {item.num}
                    </span>
                  </div>
                  <div className="flex-1 text-sm text-slate-100 leading-relaxed pt-0.5">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <p
              data-animate="text"
              className="mb-6 mt-6 text-sm leading-relaxed text-slate-100 bg-slate-900/30 rounded-lg p-4 border border-slate-700/30"
            >
              هر بسته بر اساس ۴ معیار نرمال‌سازی شده امتیازدهی می‌شود.{" "}
              <strong className="text-green-300 font-semibold">
                امتیاز کمتر بهتر است.
              </strong>{" "}
              فاصله‌ها با فرمول Haversine (با در نظر گیری کروی بودن زمین) محاسبه
              می‌شوند.
            </p>
            <div className="mt-5 pt-5 border-t border-slate-700/50 bg-slate-900/20 rounded-lg p-4 border-r-4 border-r-indigo-400/50">
              <p className="text-sm text-slate-200 leading-relaxed">
                <strong className="text-indigo-200 font-semibold">نکته:</strong>{" "}
                تمام معیارها به بازه 0-1 نرمال‌سازی می‌شوند (تقسیم بر حداکثر
                مقدار در بین تمام بسته‌های معتبر) تا مقایسه عادلانه انجام شود.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80 p-5 border border-slate-700/50 shadow-xl mt-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-1 w-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                <div className="text-base font-bold text-yellow-200 drop-shadow-sm">
                  فرمول امتیازدهی:
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/70 to-slate-800/50 rounded-xl p-5 mb-5 border border-slate-700/40 shadow-inner">
                <BlockMath math="Score = w_1 \times D_{total}^{norm} + w_2 \times D_{detour}^{norm} + w_3 \times D_{first}^{norm} + w_4 \times A_{norm}" />
              </div>
              <div className="space-y-3">
                {[
                  {
                    w: "w₁ = 0.35",
                    desc: "فاصله کل مسیر (D_total): مجموع فاصله تمام نقاط مسیر بهینه شده با TSP",
                    color: "text-blue-300",
                    bgColor: "from-blue-500/10 to-blue-600/5",
                    borderColor: "border-blue-500/30",
                  },
                  {
                    w: "w₂ = 0.30",
                    desc: "انحراف از مسیر مستقیم (D_detour): تفاوت بین مسیر بهینه و مسیر مستقیم مسافر (max(0, totalDistance - directPassengerRoute))",
                    color: "text-red-300",
                    bgColor: "from-red-500/10 to-red-600/5",
                    borderColor: "border-red-500/30",
                  },
                  {
                    w: "w₃ = 0.15",
                    desc: "فاصله تا اولین نقطه برداشت (D_first): کمترین فاصله بین راننده تا مبدا بسته یا مبدا مسافر",
                    color: "text-green-300",
                    bgColor: "from-green-500/10 to-green-600/5",
                    borderColor: "border-green-500/30",
                  },
                  {
                    w: "w₄ = 0.20",
                    desc: "هم‌راستایی مسیر (A): فاصله عمود از مقصد بسته تا خط مستقیم بین مبدا و مقصد مسافر",
                    color: "text-orange-300",
                    bgColor: "from-orange-500/10 to-orange-600/5",
                    borderColor: "border-orange-500/30",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      "flex items-start gap-3 p-3.5 rounded-lg bg-gradient-to-r border shadow-sm hover:shadow-md transition-all duration-200",
                      item.bgColor,
                      item.borderColor
                    )}
                  >
                    <span
                      className={clsx(
                        "font-mono font-bold min-w-[4.5rem] text-sm",
                        item.color
                      )}
                    >
                      {item.w}
                    </span>
                    <span className="text-slate-400 text-lg mt-0.5">→</span>
                    <span className="text-slate-200 flex-1 leading-relaxed text-sm pt-0.5">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ContentOnlyLayout>
  );
}

export default PitchPage;
