/**
 * Central translation dictionary.
 *
 * Persian (`fa`) is the source of truth; English (`en`) mirrors the same keys.
 * Values may contain `{{param}}` placeholders that are filled in by `t()`.
 */
export const translations = {
  fa: {
    common: {
      loading: "در حال بارگذاری...",
      loadingMap: "در حال بارگذاری نقشه...",
      loadingAria: "در حال بارگذاری",
      active: "فعال",
      inactive: "غیرفعال",
      edit: "ویرایش",
      delete: "حذف",
      add: "افزودن",
      cancel: "انصراف",
      save: "ویرایش",
      actions: "عملیات",
      name: "نام",
      location: "موقعیت",
      selected: "انتخاب شده",
      km: "کیلومتر",
      meter: "متر",
      minute: "دقیقه",
    },
    nav: {
      home: "صفحه اصلی",
      passengers: "مسافر‌ها",
      parcels: "بسته‌ها",
      driver: "راننده",
      settings: "تنظیمات",
      pitch: "ارائه ایده",
    },
    header: {
      logoAlt: "اسنپ",
      hackathonLogoAlt: "لوگوی هکاتون اسنپ",
      teamLabel: "تیم شماره",
      teamNumber: "۲۷",
      switchLanguage: "تغییر زبان",
    },
    home: {
      title: "شبیه‌سازی مسیر",
      sim: {
        title: "کنترل شبیه‌سازی",
        subtitle: "ابتدا مسافر را انتخاب کنید (انتخاب بسته اختیاری است)",
        stop: "توقف شبیه‌سازی",
        start: "شروع شبیه‌سازی",
        clear: "پاک کردن انتخاب‌ها",
        selectedPassenger: "مسافر انتخاب شده",
        selectedParcel: "بسته انتخاب شده",
        optimizedRoute: "مسیر بهینه‌سازی شده",
        routeInfo: "تعداد نقاط: {{count}} | فاصله کل: {{distance}} کیلومتر",
      },
      passengerSelection: {
        title: "انتخاب مسافر",
        none: "هیچ مسافری موجود نیست",
        count: "{{count}} مسافر موجود است",
      },
      passengerCard: {
        distance: "فاصله:",
        destination: "مقصد:",
      },
      offers: {
        title: "پیشنهادات بسته (الگوریتم TSP)",
        orderActiveWarning:
          "این مسافر گزینه‌های سفارش فعال دارد و راننده نمی‌تواند بسته دریافت کند. می‌توانید شبیه‌سازی را بدون بسته شروع کنید.",
        none: "بسته مناسبی در محدوده انتخاب شده یافت نشد. می‌توانید شبیه‌سازی را بدون بسته شروع کنید.",
      },
      offerCard: {
        best: "بهترین",
        selected: "انتخاب شده",
        distanceToPassenger: "فاصله تا مسافر:",
        totalDistance: "فاصله کل:",
        detour: "انحراف:",
        time: "زمان:",
        score: "امتیاز:",
      },
    },
    driver: {
      titleLoading: "مدیریت راننده",
      titleEdit: "ویرایش اطلاعات راننده",
      nameLabel: "نام *",
      namePlaceholder: "نام راننده",
      latLabel: "عرض جغرافیایی (Latitude) *",
      latPlaceholder: "مثال: 35.72",
      lngLabel: "طول جغرافیایی (Longitude) *",
      lngPlaceholder: "مثال: 51.45",
      submit: "ویرایش",
      notFound: "راننده یافت نشد",
      latRequired: "عرض جغرافیایی الزامی است",
      latRange: "عرض جغرافیایی باید بین -90 تا 90 باشد",
      lngRequired: "طول جغرافیایی الزامی است",
      lngRange: "طول جغرافیایی باید بین -180 تا 180 باشد",
    },
    settings: {
      title: "تنظیمات",
      routeOrder: {
        title: "ترتیب مسیر",
        desc: "انتخاب کنید که راننده ابتدا مسافر را سوار کند یا ابتدا بسته را بردارد",
        passengerFirstTitle: "ابتدا مسافر را سوار کن",
        passengerFirstDesc:
          "راننده ابتدا مسافر را سوار می‌کند، سپس بسته را برمی‌دارد",
        packageFirstTitle: "ابتدا بسته را بردار",
        packageFirstDesc:
          "راننده ابتدا بسته را برمی‌دارد، سپس مسافر را سوار می‌کند",
      },
      originRadius: {
        title: "شعاع انتخاب مبدا (بین مبدا مسافر و مبدا بسته)",
        desc: "تعیین کنید که مبدا بسته‌ها باید در چه شعاعی از مبدا مسافر باشند",
      },
      destRadius: {
        title: "شعاع انتخاب مقصد (بین مقصد مسافر و مقصد بسته)",
        desc: "تعیین کنید که مقصد بسته‌ها باید در چه شعاعی از مقصد مسافر باشند",
      },
      kmValue: "{{km}} کیلومتر",
      currentRange: "محدوده فعلی: {{meters}} متر ({{km}} کیلومتر)",
    },
    passengersPage: {
      title: "مسافر‌ها",
      colName: "نام",
      colLocation: "موقعیت",
      colOrderOptions: "گزینه های سفارش",
      empty: "هیچ مسافری ثبت نشده است",
    },
    parcelsPage: {
      title: "بسته‌ها",
      colName: "نام",
      colVendor: "ونچر",
      colLocation: "موقعیت",
      empty: "هیچ بسته‌ای ثبت نشده است",
    },
    form: {
      locationSelected: "موقعیت انتخاب شده: {{coords}}",
      locationPrompt: "لطفاً موقعیت را از نقشه انتخاب کنید *",
    },
    map: {
      driver: "راننده",
      driverInitial: "ر",
      passengerN: "مسافر {{n}}",
      parcelN: "بسته {{n}}",
      passengerFallback: "مسافر",
      parcelFallback: "بسته",
      originLabel: "مبدا {{name}}",
      destLabel: "مقصد {{name}}",
      selectedMark: "✓ انتخاب شده",
      orderOptions: "گزینه های سفارش:",
      carAlt: "ماشین",
    },
    route: {
      step: "مرحله {{number}}",
      point: {
        driver: "راننده",
        passenger: "مسافر",
        parcel: "بسته",
        passengerDest: "مقصد مسافر",
        parcelDest: "مقصد بسته",
      },
      movement: {
        passenger: "راننده به سمت مبدا مسافر حرکت کرد",
        parcel: "راننده به سمت مبدا بسته حرکت کرد",
        passengerDest: "راننده به سمت مقصد مسافر حرکت کرد",
        parcelDest: "راننده به سمت مقصد بسته حرکت کرد",
      },
      arrival: {
        passenger: "راننده به مبدا مسافر رسیده است",
        parcel: "راننده بسته را تحویل گرفته است",
        passengerDest: "راننده به مقصد مسافر رسیده است",
        parcelDest: "راننده بسته را تحویل داده است",
      },
      complete: "شبیه‌سازی کامل شد! 🎉",
    },
    circle: {
      originTooltip: "شعاع مبدا",
      destTooltip: "شعاع مقصد",
      originTitle: "شعاع انتخاب مبدا",
      destTitle: "شعاع انتخاب مقصد",
      originBetween: "فاصله بین مبدا مسافر و مبدا بسته",
      destBetween: "فاصله بین مقصد مسافر و مقصد بسته",
      currentRadius: "شعاع فعلی: {{km}} کیلومتر",
      metersParen: "({{meters}} متر)",
      radius: "شعاع: {{km}} کیلومتر",
      originInRange: "مبدا بسته باید در این محدوده از مبدا مسافر باشد",
      destInRange: "مقصد بسته باید در این محدوده از مقصد مسافر باشد",
    },
    toast: {
      locationRequired: "لطفاً موقعیت را از نقشه انتخاب کنید",
      driverUpdated: "اطلاعات راننده با موفقیت ویرایش شد",
      passengerAdded: "مسافر با موفقیت اضافه شد",
      passengerUpdated: "مسافر با موفقیت ویرایش شد",
      parcelAdded: "بسته با موفقیت اضافه شد",
      parcelUpdated: "بسته با موفقیت ویرایش شد",
      selectPassengerFirst: "ابتدا یک مسافر انتخاب کنید",
      orderActiveNoParcel:
        "این مسافر گزینه‌های سفارش فعال دارد و نمی‌تواند بسته دریافت کند",
      routeNotOptimized: "مسیر بهینه‌سازی نشده است",
      startedWithParcel: "شبیه‌سازی با مسافر و بسته شروع شد",
      startedWithoutParcel: "شبیه‌سازی با مسافر (بدون بسته) شروع شد",
      stopped: "شبیه‌سازی متوقف شد",
      selectionsCleared: "انتخاب‌ها پاک شد",
      passengerSelected: "مسافر {{name}} انتخاب شد",
      passengerSelectedOrderOptions:
        "مسافر {{name}} انتخاب شد (این مسافر گزینه‌های سفارش را فعال کرده است)",
      parcelSelected: "بسته {{name}} انتخاب شد",
      parcelOriginOutOfRange:
        "مبدا این بسته خارج از محدوده انتخاب است ({{km}} کیلومتر)",
      parcelDestOutOfRange:
        "مقصد این بسته خارج از محدوده انتخاب است ({{km}} کیلومتر)",
    },
    validation: {
      nameRequired: "نام الزامی است",
      nameEmpty: "نام نمی‌تواند خالی باشد",
    },
    pitch: {
      pageTitle:
        "SnappShare – استفاده هوشمند از ظرفیت خالی خودروها برای حمل مرسوله",
      hero: {
        heading: "ایده ما",
        p1: "در شرایط امروز که قیمت بنزین به‌طور مداوم افزایش یافته و آلودگی هوا به یکی از مسائل جدی شهرهای بزرگ تبدیل شده، اهمیت کاهش هزینه‌ها، مسئولیت‌پذیری اجتماعی و بهینه‌سازی سفرهای شهری بیش از هر زمان دیگری احساس می‌شود.",
        p2Before: "تیم ما با همین نگاه، طرح ",
        p2After:
          " را طراحی کرده است؛ راهکاری هوشمند که از ظرفیت بلااستفاده صندوق عقب خودروهای اسنپ، بدون ایجاد کوچک‌ترین اختلال در سفر مسافر، برای حمل مرسولات کوچک و میان‌رده استفاده می‌کند.",
      },
      problem: {
        heading: "مسئله‌ای که وجود دارد",
        intro:
          "روزانه هزاران راننده اسنپ مسیرهای طولانی را بدون همراه داشتن هیچ بار یا مرسوله‌ای طی می‌کنند؛ در حالی که هم‌زمان در بازار سفارش‌هایی وجود دارد که:",
        item1: "برای بایک بیش از حد بزرگ یا سنگین هستند",
        item2: "و برای وانت سبک بسیار کوچک و کم‌وزن‌اند",
        conclusion:
          "در نتیجه بخش بزرگی از یک نیاز واقعی بازار، بی‌پاسخ باقی می‌ماند.",
      },
      solution: {
        heading: "راه‌حل SnappShare",
        intro:
          "ما این ظرفیت خالی و استفاده‌نشده را به یک منبع درآمد جدید، بهینه و پایدار تبدیل می‌کنیم. در این طرح:",
        passengerTitle: "مسافر",
        passengerDesc: "بدون هیچ تغییری در کیفیت سفر جابه‌جا می‌شود",
        driverTitle: "راننده",
        driverDesc:
          "از همان مسیر واقعی خود، درآمد اضافی بدون هزینه اضافی به دست می‌آورد",
        platformTitle: "پلتفرم اسنپ",
        platformDesc: "سفارش‌های جدید و ارزشمند جذب می‌کند",
        cityTitle: "شهر",
        cityDesc: "از کاهش تردد اضافه و کاهش آلودگی هوا بهره‌مند می‌شود",
      },
      how: {
        heading: "چطور کار می‌کند؟",
        step1Title: "۱. ثبت سفارش Car Cargo",
        step1Before: "کاربر یک سفارش ",
        step1After:
          " ثبت می‌کند؛ سفارش‌هایی در محدوده ابعاد صندوق عقب که بین «Bike Box» و «Van Cargo» قرار می‌گیرند.",
        step1TrustIntro: "برای ایجاد اعتماد حداکثری، کاربر جزئیاتی مثل:",
        step1Detail1: "نوع و ماهیت بسته",
        step1Detail2: "ارزش تقریبی",
        step1Detail3: "وزن و ابعاد",
        step1Detail4: "شرایط خاص حمل",
        step1TrustOutro: "را به‌وضوح مشخص می‌کند.",
        step2Title: "۲. الگوریتم هوشمند تطبیق مسیر",
        step2AfterOrder: "پس از ثبت سفارش:",
        step2B1:
          "سیستم، سفرهایی را که مبدا و مقصدشان در شعاع مناسب با سفارش قرار دارد، شناسایی می‌کند",
        step2B2: "سفارش برای رانندگان نزدیک ارسال می‌شود",
        step2B3:
          "راننده با مشاهده جزئیات بار، می‌تواند سفارش را بپذیرد یا صرفاً سفر معمولی خود را ادامه دهد",
        step2HighlightStrong: "الگوریتم ما",
        step2HighlightRest:
          " بهترین ترکیب بین سفر مسافر + سفارش کارگو را بدون ایجاد انحراف یا تأخیر ارائه می‌دهد",
        step3Title: "۳. تحویل بدون اختلال",
        step3P:
          "راننده طبق روال مسافر را جابه‌جا کرده و در نهایت بسته را در مقصد یا نزدیک‌ترین نقطه تحویل می‌دهد.",
        step3Note:
          "این فرآیند بدون هیچ اختلالی در تجربه سفر مسافر طراحی شده و کاملاً با مسیر طبیعی راننده هماهنگ است.",
      },
      benefits: {
        heading: "مزایای کلیدی طرح",
        b1: "درآمد اضافه و بدون هزینه برای راننده",
        b2: "افزایش سفارش و درآمد برای پلتفرم",
        b3: "کاهش سفرهای اضافه و کمک به کاهش آلودگی",
        b4: "پاسخ دقیق به نیاز بازار در بازه‌ی «بین موتور و وانت»",
        b5: "ایجاد یک شبکه هوشمند، کارآمد و پایدار در حمل‌ونقل شهری",
      },
      limits: {
        heading: "محدودیت‌های فاز اول",
        intro: "برای ارائه یک پروتوتایپ دقیق و پایدار:",
        item1: "سفارش‌های چندمقصدی در این فاز پشتیبانی نمی‌شود",
        item2:
          "سفرهای دارای مقصد دوم، توقف میانی یا بار اضافی فعلاً وارد تطبیق نمی‌شوند",
        note: "این محدودیت‌ها باعث می‌شود نسخه اولیه سریع‌تر و با تجربه کاربری ساده‌تر ارائه شود.",
      },
      opportunity: {
        heading: "فرصت بزرگ پیش‌ رو",
        intro:
          "با SnappShare می‌توانیم بخشی از سفارش‌های پرترافیک و حساس مجموعه‌های زیر را به‌صورت هوشمند هندل کنیم:",
        peak: "به‌خصوص در زمان‌های اوج مانند عید، سال تحویل، بلک‌فرایدی و مناسبت‌های پرترافیک.",
        p1: "از طرفی با افزایش قیمت بنزین، هزینه سفرها بالا رفته و احتمال کاهش سفارش‌ها وجود دارد. SnappShare نه‌تنها از کاهش جلوگیری می‌کند، بلکه با ایجاد یک مسیر نوآورانه، حجم سفرها و سفارش‌ها را به‌شدت افزایش می‌دهد.",
        p2: "هم‌اکنون بسیاری از رانندگان، هم‌زمان با سفر خود در پلتفرم‌های دیگر بار جابه‌جا می‌کنند که باعث خروج درآمد ارزشمند از اکوسیستم اسنپ می‌شود. SnappShare این فرایند را قانونمند، ایمن و منسجم می‌کند و درآمدی که پیش‌تر از دست می‌رفت را دوباره به پلتفرم بازمی‌گرداند.",
      },
      algo: {
        heading: "الگوریتم TSP فروشنده دور گرد",
        introBefore:
          "این سیستم از الگوریتم TSP (فروشنده دورگرد) با روش ",
        introMiddle: " و بهبود ",
        introAfter:
          " برای محاسبه مسیر بهینه استفاده می‌کند. بسته‌ها ابتدا بر اساس شعاع‌های مبدا و مقصد فیلتر می‌شوند، سپس مسیر بهینه محاسبه و بر اساس ۴ معیار نرمال‌سازی شده امتیازدهی می‌شوند.",
        stepsHeading: "مراحل الگوریتم",
        step1:
          "فیلتر بسته‌ها بر اساس شعاع مبدا: فاصله بین مبدا مسافر و مبدا بسته باید کمتر یا مساوی R_origin + tolerance (پیش‌فرض: 2 کیلومتر) باشد",
        step2:
          "فیلتر بسته‌ها بر اساس شعاع مقصد: فاصله بین مقصد مسافر و مقصد بسته باید کمتر یا مساوی R_destination + tolerance (پیش‌فرض: 2 کیلومتر) باشد",
        step3:
          "محاسبه مسیر بهینه با TSP: برای هر بسته معتبر، تمام ترکیبات معتبر مسیر (با رعایت محدودیت‌های ترتیب: مبدا مسافر قبل از مقصد، مبدا بسته قبل از مقصد) تولید و کوتاه‌ترین مسیر انتخاب می‌شود",
        step4:
          "بهبود مسیر با الگوریتم 2-opt: مسیر اولیه با Nearest Neighbor به‌دست آمده و سپس با الگوریتم 2-opt بهبود داده می‌شود تا مسیر بهینه‌تر شود",
        step5:
          "محاسبه ۴ معیار برای هر بسته: طول کل مسیر، مسافت اضافی، فاصله تا اولین توقف، و هم‌راستایی با مسیر مسافر",
        step6:
          "نرمال‌سازی و امتیازدهی: تمام معیارها به بازه 0-1 نرمال‌سازی شده و با وزن‌های مشخص ترکیب می‌شوند",
        step7:
          "مرتب‌سازی و برگرداندن N بسته برتر: بسته‌ها بر اساس امتیاز (کمتر بهتر است) مرتب شده و N بسته برتر برگردانده می‌شود",
        scoreIntroBefore: "هر بسته بر اساس ۴ معیار نرمال‌سازی شده امتیازدهی می‌شود. ",
        scoreIntroStrong: "امتیاز کمتر بهتر است.",
        scoreIntroAfter:
          " فاصله‌ها با فرمول Haversine (با در نظر گیری کروی بودن زمین) محاسبه می‌شوند.",
        noteLabel: "نکته:",
        noteText:
          "تمام معیارها به بازه 0-1 نرمال‌سازی می‌شوند (تقسیم بر حداکثر مقدار در بین تمام بسته‌های معتبر) تا مقایسه عادلانه انجام شود.",
        formulaLabel: "فرمول امتیازدهی:",
        w1Desc:
          "طول کل مسیر: مجموع فاصله تمام نقاط مسیر بهینه شده با الگوریتم TSP",
        w2Desc:
          "مسافت اضافی: اگر راننده فقط مسافر را برساند، مسیر مستقیم است. اما با اضافه کردن بسته، مسیر طولانی‌تر می‌شود. این تفاوت همان مسافت اضافی است",
        w3Desc:
          "فاصله تا اولین توقف: کمترین فاصله بین راننده تا مبدا بسته یا مبدا مسافر (نزدیک‌ترین نقطه برای شروع)",
        w4Desc:
          "هم‌راستایی با مسیر مسافر: فاصله عمود از مقصد بسته تا خط مستقیم بین مبدا و مقصد مسافر (هرچه کمتر، بهتر)",
      },
    },
  },

  en: {
    common: {
      loading: "Loading...",
      loadingMap: "Loading map...",
      loadingAria: "Loading",
      active: "Active",
      inactive: "Inactive",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      cancel: "Cancel",
      save: "Save",
      actions: "Actions",
      name: "Name",
      location: "Location",
      selected: "Selected",
      km: "km",
      meter: "m",
      minute: "min",
    },
    nav: {
      home: "Home",
      passengers: "Passengers",
      parcels: "Parcels",
      driver: "Driver",
      settings: "Settings",
      pitch: "Pitch",
    },
    header: {
      logoAlt: "Snapp",
      hackathonLogoAlt: "Snapp Hackathon logo",
      teamLabel: "Team",
      teamNumber: "27",
      switchLanguage: "Change language",
    },
    home: {
      title: "Route Simulation",
      sim: {
        title: "Simulation Controls",
        subtitle: "First select a passenger (selecting a parcel is optional)",
        stop: "Stop Simulation",
        start: "Start Simulation",
        clear: "Clear Selections",
        selectedPassenger: "Selected Passenger",
        selectedParcel: "Selected Parcel",
        optimizedRoute: "Optimized Route",
        routeInfo: "Points: {{count}} | Total distance: {{distance}} km",
      },
      passengerSelection: {
        title: "Select Passenger",
        none: "No passengers available",
        count: "{{count}} passengers available",
      },
      passengerCard: {
        distance: "Distance:",
        destination: "Destination:",
      },
      offers: {
        title: "Parcel Suggestions (TSP Algorithm)",
        orderActiveWarning:
          "This passenger has order options enabled, so the driver cannot carry a parcel. You can start the simulation without a parcel.",
        none: "No suitable parcel was found within the selected range. You can start the simulation without a parcel.",
      },
      offerCard: {
        best: "Best",
        selected: "Selected",
        distanceToPassenger: "Distance to passenger:",
        totalDistance: "Total distance:",
        detour: "Detour:",
        time: "Time:",
        score: "Score:",
      },
    },
    driver: {
      titleLoading: "Driver Management",
      titleEdit: "Edit Driver Details",
      nameLabel: "Name *",
      namePlaceholder: "Driver name",
      latLabel: "Latitude *",
      latPlaceholder: "e.g. 35.72",
      lngLabel: "Longitude *",
      lngPlaceholder: "e.g. 51.45",
      submit: "Save",
      notFound: "Driver not found",
      latRequired: "Latitude is required",
      latRange: "Latitude must be between -90 and 90",
      lngRequired: "Longitude is required",
      lngRange: "Longitude must be between -180 and 180",
    },
    settings: {
      title: "Settings",
      routeOrder: {
        title: "Route Order",
        desc: "Choose whether the driver should pick up the passenger first or collect the parcel first",
        passengerFirstTitle: "Pick up the passenger first",
        passengerFirstDesc:
          "The driver picks up the passenger first, then collects the parcel",
        packageFirstTitle: "Collect the parcel first",
        packageFirstDesc:
          "The driver collects the parcel first, then picks up the passenger",
      },
      originRadius: {
        title: "Origin selection radius (between passenger origin and parcel origin)",
        desc: "Set the radius within which parcel origins must fall from the passenger's origin",
      },
      destRadius: {
        title:
          "Destination selection radius (between passenger destination and parcel destination)",
        desc: "Set the radius within which parcel destinations must fall from the passenger's destination",
      },
      kmValue: "{{km}} km",
      currentRange: "Current range: {{meters}} m ({{km}} km)",
    },
    passengersPage: {
      title: "Passengers",
      colName: "Name",
      colLocation: "Location",
      colOrderOptions: "Order Options",
      empty: "No passengers have been added",
    },
    parcelsPage: {
      title: "Parcels",
      colName: "Name",
      colVendor: "Vendor",
      colLocation: "Location",
      empty: "No parcels have been added",
    },
    form: {
      locationSelected: "Selected location: {{coords}}",
      locationPrompt: "Please select a location on the map *",
    },
    map: {
      driver: "Driver",
      driverInitial: "D",
      passengerN: "Passenger {{n}}",
      parcelN: "Parcel {{n}}",
      passengerFallback: "Passenger",
      parcelFallback: "Parcel",
      originLabel: "Origin: {{name}}",
      destLabel: "Destination: {{name}}",
      selectedMark: "✓ Selected",
      orderOptions: "Order options:",
      carAlt: "Car",
    },
    route: {
      step: "Step {{number}}",
      point: {
        driver: "Driver",
        passenger: "Passenger",
        parcel: "Parcel",
        passengerDest: "Passenger destination",
        parcelDest: "Parcel destination",
      },
      movement: {
        passenger: "The driver is heading to the passenger's pickup point",
        parcel: "The driver is heading to the parcel's pickup point",
        passengerDest: "The driver is heading to the passenger's destination",
        parcelDest: "The driver is heading to the parcel's destination",
      },
      arrival: {
        passenger: "The driver has arrived at the passenger's pickup point",
        parcel: "The driver has picked up the parcel",
        passengerDest: "The driver has arrived at the passenger's destination",
        parcelDest: "The driver has delivered the parcel",
      },
      complete: "Simulation complete! 🎉",
    },
    circle: {
      originTooltip: "Origin radius",
      destTooltip: "Destination radius",
      originTitle: "Origin selection radius",
      destTitle: "Destination selection radius",
      originBetween: "Distance between the passenger's origin and the parcel's origin",
      destBetween:
        "Distance between the passenger's destination and the parcel's destination",
      currentRadius: "Current radius: {{km}} km",
      metersParen: "({{meters}} m)",
      radius: "Radius: {{km}} km",
      originInRange:
        "The parcel's origin must be within this range of the passenger's origin",
      destInRange:
        "The parcel's destination must be within this range of the passenger's destination",
    },
    toast: {
      locationRequired: "Please select a location on the map",
      driverUpdated: "Driver details updated successfully",
      passengerAdded: "Passenger added successfully",
      passengerUpdated: "Passenger updated successfully",
      parcelAdded: "Parcel added successfully",
      parcelUpdated: "Parcel updated successfully",
      selectPassengerFirst: "Please select a passenger first",
      orderActiveNoParcel:
        "This passenger has order options enabled and cannot receive a parcel",
      routeNotOptimized: "The route has not been optimized",
      startedWithParcel: "Simulation started with a passenger and a parcel",
      startedWithoutParcel: "Simulation started with a passenger (no parcel)",
      stopped: "Simulation stopped",
      selectionsCleared: "Selections cleared",
      passengerSelected: "Passenger {{name}} selected",
      passengerSelectedOrderOptions:
        "Passenger {{name}} selected (this passenger has enabled order options)",
      parcelSelected: "Parcel {{name}} selected",
      parcelOriginOutOfRange:
        "This parcel's origin is outside the selection range ({{km}} km)",
      parcelDestOutOfRange:
        "This parcel's destination is outside the selection range ({{km}} km)",
    },
    validation: {
      nameRequired: "Name is required",
      nameEmpty: "Name cannot be empty",
    },
    pitch: {
      pageTitle:
        "SnappShare – Smart use of the empty capacity of cars to carry parcels",
      hero: {
        heading: "Our Idea",
        p1: "In today's world, where fuel prices keep rising and air pollution has become one of the serious problems of large cities, cutting costs, acting with social responsibility, and optimizing urban trips matter more than ever.",
        p2Before: "With this vision, our team designed the ",
        p2After:
          " initiative — a smart solution that uses the unused trunk capacity of Snapp cars to carry small and medium-sized parcels, without causing the slightest disruption to the passenger's trip.",
      },
      problem: {
        heading: "The Problem",
        intro:
          "Every day, thousands of Snapp drivers travel long routes without carrying any load or parcel, while at the same time there are orders in the market that:",
        item1: "are too large or too heavy for a motorbike",
        item2: "and are too small and too light for a pickup truck",
        conclusion:
          "As a result, a large part of a genuine market need remains unmet.",
      },
      solution: {
        heading: "The SnappShare Solution",
        intro:
          "We turn this empty, unused capacity into a new, efficient, and sustainable source of income. In this plan:",
        passengerTitle: "Passenger",
        passengerDesc: "travels with no change to the quality of their trip",
        driverTitle: "Driver",
        driverDesc:
          "earns extra income from their existing route, at no additional cost",
        platformTitle: "The Snapp platform",
        platformDesc: "attracts new and valuable orders",
        cityTitle: "The city",
        cityDesc: "benefits from less extra traffic and reduced air pollution",
      },
      how: {
        heading: "How Does It Work?",
        step1Title: "1. Placing a Car Cargo order",
        step1Before: "The user places a ",
        step1After:
          " order — orders that fit the trunk's dimensions and sit between «Bike Box» and «Van Cargo».",
        step1TrustIntro: "To build maximum trust, the user clearly specifies details such as:",
        step1Detail1: "the type and nature of the parcel",
        step1Detail2: "the approximate value",
        step1Detail3: "the weight and dimensions",
        step1Detail4: "any special handling requirements",
        step1TrustOutro: "The user states all of these clearly.",
        step2Title: "2. The smart route-matching algorithm",
        step2AfterOrder: "After an order is placed:",
        step2B1:
          "the system identifies trips whose origin and destination fall within a suitable radius of the order",
        step2B2: "the order is sent to nearby drivers",
        step2B3:
          "after reviewing the load details, the driver can accept the order or simply continue their normal trip",
        step2HighlightStrong: "Our algorithm",
        step2HighlightRest:
          " offers the best combination of a passenger trip plus a cargo order, without creating any detour or delay",
        step3Title: "3. Delivery without disruption",
        step3P:
          "The driver transports the passenger as usual and finally delivers the parcel at its destination or the nearest point.",
        step3Note:
          "This process is designed without any disruption to the passenger's travel experience, and it is fully aligned with the driver's natural route.",
      },
      benefits: {
        heading: "Key Benefits",
        b1: "Extra income for the driver at no cost",
        b2: "More orders and revenue for the platform",
        b3: "Fewer extra trips and help in reducing pollution",
        b4: "A precise answer to the market need in the «between motorbike and pickup truck» range",
        b5: "Building a smart, efficient, and sustainable network in urban transport",
      },
      limits: {
        heading: "First-Phase Limitations",
        intro: "To deliver an accurate and stable prototype:",
        item1: "Multi-destination orders are not supported in this phase",
        item2:
          "Trips with a second destination, an intermediate stop, or extra load are not yet included in the matching",
        note: "These limitations let the first version launch faster and with a simpler user experience.",
      },
      opportunity: {
        heading: "The Big Opportunity Ahead",
        intro:
          "With SnappShare, we can smartly handle part of the high-traffic, sensitive orders of the following services:",
        peak: "Especially during peak times such as Nowruz, the New Year moment, Black Friday, and other high-traffic occasions.",
        p1: "At the same time, as fuel prices rise, travel costs go up and orders may drop. SnappShare not only prevents this decline but, by creating an innovative path, sharply increases the volume of trips and orders.",
        p2: "Right now, many drivers carry loads on other platforms during their own trips, which drains valuable revenue out of Snapp's ecosystem. SnappShare makes this process regulated, safe, and coherent, and brings the revenue that used to be lost back to the platform.",
      },
      algo: {
        heading: "The TSP (Travelling Salesman) Algorithm",
        introBefore:
          "This system uses the TSP (Travelling Salesman Problem) algorithm with the ",
        introMiddle: " method and a ",
        introAfter:
          " improvement to compute the optimal route. Parcels are first filtered by their origin and destination radii, then the optimal route is computed and scored based on four normalized criteria.",
        stepsHeading: "Algorithm Steps",
        step1:
          "Filter parcels by origin radius: the distance between the passenger's origin and the parcel's origin must be less than or equal to R_origin + tolerance (default: 2 km)",
        step2:
          "Filter parcels by destination radius: the distance between the passenger's destination and the parcel's destination must be less than or equal to R_destination + tolerance (default: 2 km)",
        step3:
          "Compute the optimal route with TSP: for each valid parcel, all valid route combinations (respecting the order constraints: passenger origin before destination, parcel origin before destination) are generated and the shortest route is chosen",
        step4:
          "Improve the route with the 2-opt algorithm: the initial route is obtained with Nearest Neighbor and then improved with the 2-opt algorithm to make it more optimal",
        step5:
          "Compute four criteria for each parcel: total route length, extra distance, distance to the first stop, and alignment with the passenger's route",
        step6:
          "Normalize and score: all criteria are normalized to the 0–1 range and combined with defined weights",
        step7:
          "Sort and return the top N parcels: parcels are sorted by score (lower is better) and the top N parcels are returned",
        scoreIntroBefore: "Each parcel is scored based on four normalized criteria. ",
        scoreIntroStrong: "A lower score is better.",
        scoreIntroAfter:
          " Distances are calculated with the Haversine formula (accounting for the Earth's curvature).",
        noteLabel: "Note:",
        noteText:
          "All criteria are normalized to the 0–1 range (divided by the maximum value among all valid parcels) to allow a fair comparison.",
        formulaLabel: "Scoring Formula:",
        w1Desc:
          "Total route length: the sum of the distances of all points on the route optimized by the TSP algorithm",
        w2Desc:
          "Extra distance: if the driver only drops off the passenger, the route is direct. Adding a parcel makes the route longer, and this difference is the extra distance",
        w3Desc:
          "Distance to the first stop: the shortest distance from the driver to the parcel's origin or the passenger's origin (the nearest starting point)",
        w4Desc:
          "Alignment with the passenger's route: the perpendicular distance from the parcel's destination to the straight line between the passenger's origin and destination (the smaller, the better)",
      },
    },
  },
} as const;

export type TranslationTree = (typeof translations)["fa"];
