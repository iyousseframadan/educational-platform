import React from "react";
import { NavLink } from "react-router-dom";
// <<< تأكد من المسار الصحيح للهوك
import { useHomeData } from "../../hooks/useHomeData.jsx";

// --- كومبوننتس الأقسام (مؤقتاً هنا، ممكن ننقلهم لملفات منفصلة بعدين) ---

// 1. Hero Section (تستقبل كل بياناتها كـ props)
const HeroSection = ({ sectionData }) => {
  // بيانات ثابتة مؤقتة لو الـ API مرجعش items (احتياطي)
  const defaultFeatureCards = [
    { icon: "📈", title: "اختبارات تفاعلية", subtitle: "أكثر من 5000 سؤال" },
    { icon: "🎓", title: "معلمون خبراء", subtitle: "خبرة أكثر من 10 سنوات" },
    { icon: "👨‍🏫", title: "تدريب مكثف", subtitle: "متابعة يومية مستمرة" },
  ];
  const defaultStatsData = [
    { number: "150+", text: "دورة تدريبية" },
    { number: "98%", text: "نسبة النجاح" },
    { number: "10K+", text: "طالب شغوف" },
  ];

  // استخدام بيانات الـ API لو موجودة، وإلا نستخدم البيانات الافتراضية
  // الـ API بتاع الـ Hero مش بيرجع items حالياً، هنستخدم title/subtitle/description بس
  const title = sectionData?.title || "أهلاً بكم في منصة المئة التعليمية";
  const subtitle = sectionData?.subtitle || "✨ الأفضل في المملكة";
  const description =
    sectionData?.description || "انضم لأكثر من 10,000 طالب...";
  const featureCards = sectionData?.items?.featureCards || defaultFeatureCards; // افتراض لو الـ API هيرجع items كده
  const statsData = sectionData?.items?.statsData || defaultStatsData; // افتراض لو الـ API هيرجع items كده

  return (
    <div className="bg-gradient-to-tl from-purple-300 to-purple-600 text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 ">
          {/* Right Side */}
          <div className="w-full lg:w-6/12 text-center lg:text-right">
            <span className=" bg-primary text-white border border-white/20 font-bold px-6 py-3 rounded-full text-sm inline-block mb-4">
              {subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black my-6 leading-tight ">
              {/* ممكن نقسم العنوان لو فيه \n */}
              {title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <span className="text-yellow-300 text-3xl font-bold mb-4 inline-block">
              تأسيس من البداية وتدريب حتى الإتقان. {/* (نص ثابت في الديزاين) */}
            </span>
            <p className="text-lg text-white/80 mb-8 whitespace-pre-line">
              {description}
            </p>
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <NavLink to="/register" className="w-full">
                <button className="bg-gradient-to-l from-purple-600 to-purple-500 text-white font-bold px-6 py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-xl hover:from-purple-700 hover:to-purple-600 hover:scale-105 transition-all duration-300 w-full">
                  <span>👤</span> <span>التسجيل بالموقع</span>
                </button>
              </NavLink>
              <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-xl hover:bg-yellow-500 hover:scale-105 transition-all duration-300">
                <span>🎁</span> <span>العروض الخاصة</span>
              </button>
              <button className="bg-white/20 bg-opacity-20 border-2 border-white/40 text-white font-bold px-6 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300 hover:bg-opacity-30">
                <span>📋</span> <span>أنشئ خطتك</span>
              </button>
              <button className="bg-gradient-to-l from-purple-500 to-purple-400 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 ">
                <span>🎯</span> <span>حدد مستواك</span>
              </button>
            </div>
            {/* Stats */}
            <div className="mt-20 flex justify-around items-center text-center divv relative">
              {statsData.map((stat, index) => (
                <div key={index}>
                  <p className="text-5xl font-bold text-yellow-300">
                    {stat.number}
                  </p>
                  <p className="text-white/80 mt-2">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Left Side: Feature Cards */}
          <div className="w-full lg:w-5/12 grid grid-cols-1 gap-5">
            {/* نعرض الـ featureCards */}
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl px-10 py-7 flex items-center gap-5 hover:border-white/40 transition-all hover:scale-105 duration-300 justify-between"
              >
                <div>
                  <h3 className="font-bold text-2xl">{card.title}</h3>
                  <p className="text-white/80 mt-2 font-semibold">
                    {card.subtitle}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-lg text-white shadow-lg ">
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Categories Section (تستقبل items كـ props)
const CategoriesSection = ({ sectionData }) => {
  const title = sectionData?.title || "الأقسام";
  const description = sectionData?.description || "اختر المسار المناسب لك";
  // نفترض أن الـ API بيرجع الـ items بالشكل ده: [{ name: "قدرات", icon: "📖", ... }, ...]
  const categories = sectionData?.items || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-500 mb-12">{description}</p>
        {/* نعرض الـ categories اللي جاية من الـ API */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-gray-100 duration-300 "
              >
                <div className="flex justify-center mb-5 h-12 items-center">
                  {/* ممكن نعرض icon لو الـ API بيرجعه، أو نستخدم emoji */}
                  <span className="text-4xl font-extrabold text-gray-700">
                    {cat.icon || "📚"} {/* Icon from API or fallback */}
                  </span>
                </div>
                <h3 className="font-semibold text-xl text-gray-700">
                  {cat.name}
                </h3>
                {/* ممكن نضيف description لو الـ API بيرجعه */}
                {/* <p className="text-sm text-gray-500 mt-1">{cat.description}</p> */}
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              لا توجد أقسام لعرضها حالياً.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// 3. Features Section (تستقبل items كـ props)
const FeaturesSection = ({ sectionData }) => {
  const title = sectionData?.title || "مميزات المنصة";
  const description = sectionData?.description || "";
  // نفترض أن الـ API بيرجع الـ items بالشكل ده: [{ title: "تأسيس", subtitle: "من البداية", icon: "📚", ... }, ...]
  const features = sectionData?.items || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-500 mb-12">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="bg-purple-600 text-white p-10 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer "
              >
                <div className="mb-5 text-yellow-500">
                  <span className="text-5xl">{feature.icon || "⭐"}</span>{" "}
                  {/* Icon or fallback */}
                </div>
                <h3 className="font-bold text-2xl mb-1">{feature.title}</h3>
                <p className="text-white/80 text-base">{feature.subtitle}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              لا توجد مميزات لعرضها حالياً.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// --- باقي السكاشن (Packages, Testimonials, Partners) ---
// هنعدلهم بنفس الطريقة: استقبال sectionData واستخدام items منها

const PackagesSection = ({ sectionData }) => {
  const title = sectionData?.title || "الباقات الخاصة";
  const description = sectionData?.description || "";
  const packages = sectionData?.items || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg text-gray-500 mb-12">{description}</p>
        <div className="mb-12">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-2 mx-auto mb-10">
            <span>🎁</span> <span className="text-3xl">{title}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.length > 0 ? (
            packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-3xl shadow-xl text-center flex flex-col items-center transition-all duration-300 hover:scale-105"
              >
                <div className="text-amber-600 mb-6">
                  <span className="text-6xl">{pkg.icon || "📦"}</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-800">
                  {pkg.title}
                </h3>
                <p className="text-gray-500 mb-8">{pkg.description}</p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 rounded-lg mt-auto flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:brightness-110 hover:scale-105 ">
                  <span>⚡️</span>{" "}
                  <span>{pkg.button_text || "اشترك الآن"}</span>
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              لا توجد باقات لعرضها حالياً.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ sectionData }) => {
  const title = sectionData?.title || "آراء الطلاب";
  const description = sectionData?.description || "ماذا يقول طلابنا عنا؟";
  const testimonials = sectionData?.items || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-500 mb-12">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer "
              >
                <div className="flex justify-center text-yellow-500 mb-8">
                  <span className="text-3xl">
                    {"⭐".repeat(testimonial.rating || 5)}
                  </span>
                </div>
                <p className="text-gray-600 text-center mb-6 text-base leading-relaxed font-semibold ">
                  {testimonial.comment}
                </p>
                <div className="flex items-center mt-6">
                  <div className="bg-purple-600 p-3 rounded-full shadow-md text-gray-700">
                    {/* ممكن نستخدم صورة لو الـ API بيرجعها */}
                    {/* <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full" /> */}
                    <span className="text-xl">👤</span>
                  </div>
                  <div className="mr-3">
                    <p className="font-bold text-gray-800">
                      {testimonial.name}
                    </p>
                    <span className="text-sm text-gray-500 px-3 py-1 rounded-md font-medium">
                      {testimonial.course}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              لا توجد آراء لعرضها حالياً.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = ({ sectionData }) => {
  const title = sectionData?.title || "شركاء النجاح";
  const description =
    sectionData?.description || "نفخر بثقة عملائنا وشركائنا...";
  const partners = sectionData?.items || [];

  // بيانات افتراضية لو الـ API مرجعش items
  const defaultPartnersData = [
    { id: 4, icon: "🏢", bgColor: "white" },
    { id: 3, icon: "🏛️", bgColor: "purple" },
    { id: 2, icon: "🎓", bgColor: "white" },
    { id: 1, icon: "🤝", bgColor: "purple" },
  ];
  const partnersToDisplay =
    partners.length > 0 ? partners : defaultPartnersData;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-500 mb-12">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {partnersToDisplay.map((partner) => (
            <div
              key={partner.id || partner.icon} // استخدام icon كمفتاح احتياطي
              className={`p-12 rounded-3xl shadow-lg flex justify-center items-center
                                         transition-all duration-300 hover:scale-105 cursor-pointer
                                         ${
                                           partner.bgColor === "purple"
                                             ? "bg-purple-600"
                                             : "bg-white"
                                         }`}
            >
              {/* ممكن نستخدم صورة لو الـ API بيرجع logo_url */}
              {/* <img src={partner.logo_url} alt="Partner Logo" className="h-16 object-contain" /> */}
              <span className="text-6xl">{partner.icon}</span>
            </div>
          ))}
          {partnersToDisplay.length === 0 && (
            <p className="col-span-full text-gray-500">
              لا يوجد شركاء لعرضهم حالياً.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
// -------------------------------------------------------------------

// --- الكومبوننت الأساسي لصفحة الهوم ---
export default function Home() {
  // <<< استخدام الهوك لجلب البيانات التفصيلية
  const { detailedSections, isLoading, error, isError } = useHomeData();

  // <<< حالة الـ Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <svg className="animate-spin h-10 w-10 text-purple-600" /*...*/></svg>
        <p className="text-xl font-semibold ml-4">
          جارِ تحميل الصفحة الرئيسية...
        </p>
      </div>
    );
  }

  // <<< حالة الـ Error
  if (isError) {
    console.error("Home Page API Error:", error);
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center px-4">
        <p className="text-2xl text-red-600 font-bold mb-4">😕 حدث خطأ</p>
        <p className="text-lg text-gray-700 mb-2">
          عذراً، لم نتمكن من تحميل بيانات الصفحة الرئيسية.
        </p>
        <p className="text-sm text-gray-500">
          ({error?.message || "يرجى المحاولة مرة أخرى لاحقاً"})
        </p>
      </div>
    );
  }

  // <<< لو البيانات وصلت بنجاح
  // Function to find detailed section data by key
  const getSectionData = (key) =>
    detailedSections?.find((section) => section.key === key);

  // Check if detailed sections data is available before rendering
  if (!detailedSections || detailedSections.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center px-4">
        <p className="text-xl text-gray-700 font-semibold">
          لا توجد بيانات لعرضها في الصفحة الرئيسية حالياً.
        </p>
      </div>
    );
  }

  console.log("Rendering Home with detailed sections:", detailedSections);

  // --- Mapping Keys to Components ---
  // ده بيخلينا نعرض السكاشن بالترتيب اللي جاي من الـ API الأول (لو حبينا)
  // أو ممكن نرصهم بالترتيب اللي عايزينه زي ما عملنا تحت
  // eslint-disable-next-line no-unused-vars
  const sectionComponentMap = {
    hero: HeroSection,
    categories: CategoriesSection,
    features: FeaturesSection,
    packages: PackagesSection,
    testimonials: TestimonialsSection,
    partners: PartnersSection,
    // ... نضيف أي keys تانية لو موجودة
  };
  // ---------------------------------

  return (
    <>
      {/* هنعرض السكاشن بالترتيب اللي عايزينه */}
      {/* ونتأكد إن السكشن موجود قبل ما نحاول نعرض الكومبوننت بتاعه */}
      {getSectionData("hero") && (
        <HeroSection sectionData={getSectionData("hero")} />
      )}
      {getSectionData("categories") && (
        <CategoriesSection sectionData={getSectionData("categories")} />
      )}
      {getSectionData("features") && (
        <FeaturesSection sectionData={getSectionData("features")} />
      )}
      {getSectionData("packages") && (
        <PackagesSection sectionData={getSectionData("packages")} />
      )}
      {getSectionData("testimonials") && (
        <TestimonialsSection sectionData={getSectionData("testimonials")} />
      )}
      {getSectionData("partners") && (
        <PartnersSection sectionData={getSectionData("partners")} />
      )}

      {/* // طريقة تانية لعرض السكاشن بالترتيب اللي جاي من الـ API
        detailedSections.map(section => {
          const SectionComponent = sectionComponentMap[section.key];
          return SectionComponent ? <SectionComponent key={section.key} sectionData={section} /> : null;
        }) 
      */}
    </>
  );
}
// -------------------------------------------------------------------
