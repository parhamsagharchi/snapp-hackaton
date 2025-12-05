import clsx from "clsx";
import { ContentOnlyLayout } from "@/components/shared/layout/ContentOnlyLayout";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { SNAPP_SERVICES } from "./pitch.constant";

function PitchPage() {
  const containerRef = useScrollAnimations();

  return (
    <ContentOnlyLayout title="SnappShare – استفاده هوشمند از ظرفیت خالی خودروها برای حمل مرسوله">
      <div ref={containerRef} className="space-y-4 text-xs text-slate-300">
        {/* Hero Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-primary/20 bg-primary/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-primary/70 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-lg font-semibold text-white"
            >
              ایده ما
            </h2>
          </div>
          <p
            data-animate="text"
            className="text-xs leading-relaxed text-slate-200 mb-3"
          >
            در شرایط امروز که قیمت بنزین به‌طور مداوم افزایش یافته و آلودگی هوا
            به یکی از مسائل جدی شهرهای بزرگ تبدیل شده، اهمیت کاهش هزینه‌ها،
            مسئولیت‌پذیری اجتماعی و بهینه‌سازی سفرهای شهری بیش از هر زمان دیگری
            احساس می‌شود.
          </p>
          <p
            data-animate="text"
            className="text-xs leading-relaxed text-slate-200"
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
          className="rounded-lg border border-red-500/20 bg-red-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-red-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              مسئله‌ای که وجود دارد
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-3 text-xs leading-relaxed text-slate-300"
          >
            روزانه هزاران راننده اسنپ مسیرهای طولانی را بدون همراه داشتن هیچ بار
            یا مرسوله‌ای طی می‌کنند؛ در حالی که هم‌زمان در بازار سفارش‌هایی وجود
            دارد که:
          </p>
          <div data-animate="stagger" className="space-y-2">
            <div
              data-animate="stagger-item"
              className="flex items-start gap-2 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30"
            >
              <span data-animate="icon" className="text-red-300 text-base">
                ✗
              </span>
              <div className="flex-1">
                <p className="text-xs text-slate-300">
                  برای بایک بیش از حد بزرگ یا سنگین هستند
                </p>
              </div>
            </div>
            <div
              data-animate="stagger-item"
              className="flex items-start gap-2 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30"
            >
              <span data-animate="icon" className="text-red-300 text-base">
                ✗
              </span>
              <div className="flex-1">
                <p className="text-xs text-slate-300">
                  و برای وانت سبک بسیار کوچک و کم‌وزن‌اند
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-red-900/20 border border-red-500/30">
            <p className="text-xs text-red-200 font-medium">
              در نتیجه بخش بزرگی از یک نیاز واقعی بازار، بی‌پاسخ باقی می‌ماند.
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-green-500/20 bg-green-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-green-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              راه‌حل SnappShare
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-xs leading-relaxed text-slate-300 font-medium"
          >
            ما این ظرفیت خالی و استفاده‌نشده را به یک منبع درآمد جدید، بهینه و
            پایدار تبدیل می‌کنیم. در این طرح:
          </p>
          <div data-animate="stagger" className="grid gap-3 md:grid-cols-2">
            {[
              {
                icon: "👤",
                title: "مسافر",
                desc: "بدون هیچ تغییری در کیفیت سفر جابه‌جا می‌شود",
                color: "bg-blue-900/15",
                border: "border-blue-500/25",
              },
              {
                icon: "🚗",
                title: "راننده",
                desc: "از همان مسیر واقعی خود، درآمد اضافی بدون هزینه اضافی به دست می‌آورد",
                color: "bg-green-900/15",
                border: "border-green-500/25",
              },
              {
                icon: "📱",
                title: "پلتفرم اسنپ",
                desc: "سفارش‌های جدید و ارزشمند جذب می‌کند",
                color: "bg-purple-900/15",
                border: "border-purple-500/25",
              },
              {
                icon: "🌱",
                title: "شهر",
                desc: "از کاهش تردد اضافه و کاهش آلودگی هوا بهره‌مند می‌شود",
                color: "bg-teal-900/15",
                border: "border-teal-500/25",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                data-animate="stagger-item"
                className={clsx(
                  "rounded-lg border p-3",
                  item.color,
                  item.border
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span data-animate="icon" className="text-2xl">
                    {item.icon}
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-blue-500/20 bg-blue-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-blue-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              چطور کار می‌کند؟
            </h2>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg bg-slate-800/40 p-3 border border-slate-700/30">
              <h3 className="text-xs font-medium text-blue-300 mb-2">
                ۱. ثبت سفارش Car Cargo
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                کاربر یک سفارش <strong className="text-white">Car Cargo</strong>{" "}
                ثبت می‌کند؛ سفارش‌هایی در محدوده ابعاد صندوق عقب که بین «Bike
                Box» و «Van Cargo» قرار می‌گیرند.
              </p>
              <div className="mt-3 p-3 rounded-lg bg-blue-900/15 border border-blue-500/25">
                <p className="text-[10px] font-medium text-blue-300 mb-1.5">
                  برای ایجاد اعتماد حداکثری، کاربر جزئیاتی مثل:
                </p>
                <ul className="space-y-0.5 text-[10px] text-blue-200">
                  <li>• نوع و ماهیت بسته</li>
                  <li>• ارزش تقریبی</li>
                  <li>• وزن و ابعاد</li>
                  <li>• شرایط خاص حمل</li>
                </ul>
                <p className="text-[10px] text-blue-200 mt-1.5">
                  را به‌وضوح مشخص می‌کند.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/40 p-3 border border-slate-700/30">
              <h3 className="text-xs font-medium text-purple-300 mb-2">
                ۲. الگوریتم هوشمند تطبیق مسیر
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <p className="mb-2">پس از ثبت سفارش:</p>
                <div className="flex items-start gap-2">
                  <span className="text-purple-300 font-semibold">→</span>
                  <p>
                    سیستم، سفرهایی را که مبدا و مقصدشان در شعاع مناسب با سفارش
                    قرار دارد، شناسایی می‌کند
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-300 font-semibold">→</span>
                  <p>سفارش برای رانندگان نزدیک ارسال می‌شود</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-300 font-semibold">→</span>
                  <p>
                    راننده با مشاهده جزئیات بار، می‌تواند سفارش را بپذیرد یا
                    صرفاً سفر معمولی خود را ادامه دهد
                  </p>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-purple-900/15 border border-purple-500/25">
                  <p className="text-[10px] text-purple-200">
                    <strong className="text-purple-300">الگوریتم ما</strong>{" "}
                    بهترین ترکیب بین سفر مسافر + سفارش کارگو را بدون ایجاد
                    انحراف یا تأخیر ارائه می‌دهد
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/40 p-3 border border-slate-700/30">
              <h3 className="text-xs font-medium text-green-300 mb-2">
                ۳. تحویل بدون اختلال
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                راننده طبق روال مسافر را جابه‌جا کرده و در نهایت بسته را در مقصد
                یا نزدیک‌ترین نقطه تحویل می‌دهد.
              </p>
              <div className="mt-3 p-3 rounded-lg bg-green-900/15 border border-green-500/25">
                <p className="text-[10px] text-green-200">
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
          className="rounded-lg border border-yellow-500/20 bg-yellow-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-yellow-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              مزایای کلیدی طرح
            </h2>
          </div>
          <div data-animate="stagger" className="grid gap-2 md:grid-cols-2">
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
                className="flex items-start gap-2 p-2.5 rounded-lg bg-yellow-900/10 border border-yellow-500/25"
              >
                <span data-animate="icon" className="text-yellow-300 text-base">
                  ✓
                </span>
                <p className="text-xs text-slate-300 flex-1">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section
          data-animate="section"
          className="rounded-lg border border-orange-500/20 bg-orange-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-orange-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              محدودیت‌های فاز اول
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-3 text-xs leading-relaxed text-slate-300"
          >
            برای ارائه یک پروتوتایپ دقیق و پایدار:
          </p>
          <div data-animate="stagger" className="space-y-2">
            <div
              data-animate="stagger-item"
              className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/30"
            >
              <span data-animate="icon" className="text-orange-300 text-sm">
                ⚠
              </span>
              <div className="flex-1">
                <p className="text-xs text-slate-300">
                  سفارش‌های چندمقصدی در این فاز پشتیبانی نمی‌شود
                </p>
              </div>
            </div>
            <div
              data-animate="stagger-item"
              className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/30"
            >
              <span data-animate="icon" className="text-orange-300 text-sm">
                ⚠
              </span>
              <div className="flex-1">
                <p className="text-xs text-slate-300">
                  سفرهای دارای مقصد دوم، توقف میانی یا بار اضافی فعلاً وارد
                  تطبیق نمی‌شوند
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-orange-900/20 border border-orange-500/30">
            <p className="text-xs text-orange-200">
              این محدودیت‌ها باعث می‌شود نسخه اولیه سریع‌تر و با تجربه کاربری
              ساده‌تر ارائه شود.
            </p>
          </div>
        </section>

        {/* Opportunity Section */}
        <section
          data-animate="section"
          className="rounded-lg border border-indigo-500/20 bg-indigo-900/10 p-4 shadow-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-0.5 w-10 bg-indigo-400/60 rounded-full"></div>
            <h2
              data-animate="heading"
              className="text-base font-semibold text-white"
            >
              فرصت بزرگ پیش‌ رو
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-3 text-xs leading-relaxed text-slate-300"
          >
            با SnappShare می‌توانیم بخشی از سفارش‌های پرترافیک و حساس مجموعه‌های
            زیر را به‌صورت هوشمند هندل کنیم:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
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
                      "text-xs font-bold tracking-wide",
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
            className="mb-3 text-xs leading-relaxed text-slate-300"
          >
            به‌خصوص در زمان‌های اوج مانند عید، سال تحویل، بلک‌فرایدی و
            مناسبت‌های پرترافیک.
          </p>
          <div className="space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              از طرفی با افزایش قیمت بنزین، هزینه سفرها بالا رفته و احتمال کاهش
              سفارش‌ها وجود دارد. SnappShare نه‌تنها از کاهش جلوگیری می‌کند،
              بلکه با ایجاد یک مسیر نوآورانه، حجم سفرها و سفارش‌ها را به‌شدت
              افزایش می‌دهد.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              هم‌اکنون بسیاری از رانندگان، هم‌زمان با سفر خود در پلتفرم‌های دیگر
              بار جابه‌جا می‌کنند که باعث خروج درآمد ارزشمند از اکوسیستم اسنپ
              می‌شود. SnappShare این فرایند را قانونمند، ایمن و منسجم می‌کند و
              درآمدی که پیش‌تر از دست می‌رفت را دوباره به پلتفرم بازمی‌گرداند.
            </p>
          </div>
        </section>
      </div>
    </ContentOnlyLayout>
  );
}

export default PitchPage;
