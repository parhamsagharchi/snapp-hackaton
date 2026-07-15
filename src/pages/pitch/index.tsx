import clsx from "clsx";
import { ContentOnlyLayout } from "@/components/shared/layout/ContentOnlyLayout";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { SNAPP_SERVICES } from "./pitch.constant";
import { useTranslation } from "@/i18n";

function PitchPage() {
  const containerRef = useScrollAnimations();
  const { t, tName, tDigits } = useTranslation();

  return (
    <ContentOnlyLayout title={t("pitch.pageTitle")}>
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
              {t("pitch.hero.heading")}
            </h2>
          </div>
          <p
            data-animate="text"
            className="text-sm leading-relaxed text-slate-200 mb-4"
          >
            {t("pitch.hero.p1")}
          </p>
          <p
            data-animate="text"
            className="text-sm leading-relaxed text-slate-200"
          >
            {t("pitch.hero.p2Before")}
            <strong className="text-primary">SnappShare</strong>
            {t("pitch.hero.p2After")}
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
              {t("pitch.problem.heading")}
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            {t("pitch.problem.intro")}
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
                  {t("pitch.problem.item1")}
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
                  {t("pitch.problem.item2")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-red-900/25 border border-red-500/40">
            <p className="text-sm text-red-100 font-medium">
              {t("pitch.problem.conclusion")}
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
              {t("pitch.solution.heading")}
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-5 text-sm leading-relaxed text-slate-200 font-medium"
          >
            {t("pitch.solution.intro")}
          </p>
          <div data-animate="stagger" className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: "👤",
                title: t("pitch.solution.passengerTitle"),
                desc: t("pitch.solution.passengerDesc"),
                color: "bg-blue-900/20",
                border: "border-blue-500/30",
              },
              {
                icon: "🚗",
                title: t("pitch.solution.driverTitle"),
                desc: t("pitch.solution.driverDesc"),
                color: "bg-green-900/20",
                border: "border-green-500/30",
              },
              {
                icon: "📱",
                title: t("pitch.solution.platformTitle"),
                desc: t("pitch.solution.platformDesc"),
                color: "bg-purple-900/20",
                border: "border-purple-500/30",
              },
              {
                icon: "🌱",
                title: t("pitch.solution.cityTitle"),
                desc: t("pitch.solution.cityDesc"),
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
              {t("pitch.how.heading")}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-blue-300 mb-3">
                {t("pitch.how.step1Title")}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-3">
                {t("pitch.how.step1Before")}
                <strong className="text-white">Car Cargo</strong>
                {t("pitch.how.step1After")}
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-blue-900/20 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-200 mb-2">
                  {t("pitch.how.step1TrustIntro")}
                </p>
                <ul className="space-y-1.5 text-sm text-blue-100">
                  <li>• {t("pitch.how.step1Detail1")}</li>
                  <li>• {t("pitch.how.step1Detail2")}</li>
                  <li>• {t("pitch.how.step1Detail3")}</li>
                  <li>• {t("pitch.how.step1Detail4")}</li>
                </ul>
                <p className="text-sm text-blue-100 mt-2">
                  {t("pitch.how.step1TrustOutro")}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-purple-300 mb-3">
                {t("pitch.how.step2Title")}
              </h3>
              <div className="space-y-2.5 text-sm text-slate-200">
                <p className="mb-2">{t("pitch.how.step2AfterOrder")}</p>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">{t("pitch.how.step2B1")}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">{t("pitch.how.step2B2")}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple-300 font-semibold text-base">
                    →
                  </span>
                  <p className="leading-relaxed">{t("pitch.how.step2B3")}</p>
                </div>
                <div className="mt-3 p-3.5 rounded-lg bg-purple-900/20 border border-purple-500/30">
                  <p className="text-sm text-purple-100 leading-relaxed">
                    <strong className="text-purple-200 font-semibold">
                      {t("pitch.how.step2HighlightStrong")}
                    </strong>
                    {t("pitch.how.step2HighlightRest")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700/40">
              <h3 className="text-sm font-medium text-green-300 mb-3">
                {t("pitch.how.step3Title")}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-3">
                {t("pitch.how.step3P")}
              </p>
              <div className="mt-3 p-3.5 rounded-lg bg-green-900/20 border border-green-500/30">
                <p className="text-sm text-green-100 leading-relaxed">
                  {t("pitch.how.step3Note")}
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
              {t("pitch.benefits.heading")}
            </h2>
          </div>
          <div data-animate="stagger" className="grid gap-3 md:grid-cols-2">
            {[
              t("pitch.benefits.b1"),
              t("pitch.benefits.b2"),
              t("pitch.benefits.b3"),
              t("pitch.benefits.b4"),
              t("pitch.benefits.b5"),
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
              {t("pitch.limits.heading")}
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            {t("pitch.limits.intro")}
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
                  {t("pitch.limits.item1")}
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
                  {t("pitch.limits.item2")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-orange-900/25 border border-orange-500/40">
            <p className="text-sm text-orange-100 leading-relaxed">
              {t("pitch.limits.note")}
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
              {t("pitch.opportunity.heading")}
            </h2>
          </div>
          <p
            data-animate="text"
            className="mb-4 text-sm leading-relaxed text-slate-200"
          >
            {t("pitch.opportunity.intro")}
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
                    alt={tName(item.name)}
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <p
                    className={clsx(
                      "text-sm font-bold tracking-wide",
                      item.textColor
                    )}
                  >
                    {tName(item.name)}
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
            {t("pitch.opportunity.peak")}
          </p>
          <div className="space-y-3">
            <p className="text-sm text-slate-200 leading-relaxed">
              {t("pitch.opportunity.p1")}
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              {t("pitch.opportunity.p2")}
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
                {t("pitch.algo.heading")}
              </h2>
            </div>
            <p
              data-animate="text"
              className="text-sm leading-relaxed text-slate-100 mb-6 bg-slate-900/30 rounded-lg p-4 border border-slate-700/30"
            >
              {t("pitch.algo.introBefore")}
              <strong className="text-primary font-semibold">
                Nearest Neighbor
              </strong>
              {t("pitch.algo.introMiddle")}
              <strong className="text-primary font-semibold">2-opt</strong>
              {t("pitch.algo.introAfter")}
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-1 w-14 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-md shadow-indigo-500/20"></div>
              <h2
                data-animate="heading"
                className="text-xl font-bold text-white"
              >
                {t("pitch.algo.stepsHeading")}
              </h2>
            </div>
            <div data-animate="stagger" className="space-y-4">
              {[
                { num: 1, text: t("pitch.algo.step1") },
                { num: 2, text: t("pitch.algo.step2") },
                { num: 3, text: t("pitch.algo.step3") },
                { num: 4, text: t("pitch.algo.step4") },
                { num: 5, text: t("pitch.algo.step5") },
                { num: 6, text: t("pitch.algo.step6") },
                { num: 7, text: t("pitch.algo.step7") },
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-animate="stagger-item"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900/60 via-slate-900/50 to-slate-900/60 border border-slate-700/50 shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/70"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 border-2 border-indigo-400/50 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-indigo-100 font-bold text-sm">
                      {tDigits(item.num)}
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
              {t("pitch.algo.scoreIntroBefore")}
              <strong className="text-green-300 font-semibold">
                {t("pitch.algo.scoreIntroStrong")}
              </strong>
              {t("pitch.algo.scoreIntroAfter")}
            </p>
            <div className="mt-5 pt-5 border-t border-slate-700/50 bg-slate-900/20 rounded-lg p-4 border-r-4 border-r-indigo-400/50">
              <p className="text-sm text-slate-200 leading-relaxed">
                <strong className="text-indigo-200 font-semibold">
                  {t("pitch.algo.noteLabel")}
                </strong>{" "}
                {t("pitch.algo.noteText")}
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80 p-5 border border-slate-700/50 shadow-xl mt-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-1 w-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                <div className="text-base font-bold text-yellow-200 drop-shadow-sm">
                  {t("pitch.algo.formulaLabel")}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/70 to-slate-800/50 rounded-xl p-5 mb-5 border border-slate-700/40 shadow-inner">
                <BlockMath math="Score = w_1 \times D_{total}^{norm} + w_2 \times D_{detour}^{norm} + w_3 \times D_{first}^{norm} + w_4 \times A_{norm}" />
              </div>
              <div className="space-y-3">
                {[
                  {
                    w: "w₁ = 0.35",
                    desc: t("pitch.algo.w1Desc"),
                    color: "text-blue-300",
                    bgColor: "from-blue-500/10 to-blue-600/5",
                    borderColor: "border-blue-500/30",
                  },
                  {
                    w: "w₂ = 0.30",
                    desc: t("pitch.algo.w2Desc"),
                    color: "text-red-300",
                    bgColor: "from-red-500/10 to-red-600/5",
                    borderColor: "border-red-500/30",
                  },
                  {
                    w: "w₃ = 0.15",
                    desc: t("pitch.algo.w3Desc"),
                    color: "text-green-300",
                    bgColor: "from-green-500/10 to-green-600/5",
                    borderColor: "border-green-500/30",
                  },
                  {
                    w: "w₄ = 0.20",
                    desc: t("pitch.algo.w4Desc"),
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
