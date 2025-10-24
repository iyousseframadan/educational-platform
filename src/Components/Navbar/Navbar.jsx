import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // <<< استيراد axios
// تأكد من أن هيكل الملفات هو كالتالي:
// src/
// ├── Components/
// │   ├── Navbar/
// │   │   └── Navbar.jsx  <-- (هذا الملف)
// │   └── Context/
// │       └── UserContext.jsx <-- (الملف المطلوب)
import { UserContext } from "../../context/UserContext.jsx";

// --- أيقونات Emojis (لحل مشكلة react-icons مؤقتًا) ---
const Icons = {
  GraduationCap: (props) => <span {...props}>🎓</span>,
  User: (props) => <span {...props}>👤</span>,
  Star: (props) => <span {...props}>⭐</span>,
  Newspaper: (props) => <span {...props}>📰</span>,
  Book: (props) => <span {...props}>📚</span>,
  Flask: (props) => <span {...props}>🧪</span>,
  Pencil: (props) => <span {...props}>✏️</span>,
  Desktop: (props) => <span {...props}>💻</span>,
  Lightbulb: (props) => <span {...props}>💡</span>,
  Gift: (props) => <span {...props}>🎁</span>,
  Home: (props) => <span {...props}>🏠</span>,
  CaretDown: (props) => <span {...props}>▼</span>,
  Bars: (props) => <span {...props}>☰</span>,
  Times: (props) => <span {...props}>✕</span>,
  ShoppingCart: (props) => <span {...props}>🛒</span>,
  Exclamation: (props) => <span {...props}>❗️</span>,
  Logout: (props) => <span {...props}>🚪</span>, // أيقونة للخروج
};
// --------------------------------------------------------

// --- عنوان API ---
const BASE_URL = "https://api-ed.zynqor.org/api/auth";
// -----------------

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // <<< حالة للـ Loading عند الخروج

  // --- استخدام الـ Context والـ Navigation ---
  const { userData, setUserData } = useContext(UserContext); // <<< جلب حالة المستخدم وطريقة تعديلها
  const navigate = useNavigate(); // <<< عشان نوجه المستخدم بعد الخروج
  // -----------------------------------------

  const dropdowns = {
    قدرات: [
      { name: "قدرات كمي", icon: <Icons.Book className="text-red-400" /> },
      { name: "قدرات لفظي", icon: <Icons.Pencil className="text-blue-400" /> },
      {
        name: "باقة القدرات الشاملة (تأسيس وتدريب)",
        icon: <Icons.Gift className="text-orange-400" />,
      },
    ],
    تحصيلي: [
      {
        name: "تحصيلي رياضيات",
        icon: <Icons.Book className="text-blue-500" />,
      },
      {
        name: "تحصيلي فيزياء",
        icon: <Icons.Lightbulb className="text-purple-500" />,
      },
      {
        name: "تحصيلي كيمياء",
        icon: <Icons.Flask className="text-green-500" />,
      },
      { name: "تحصيلي أحياء", icon: <Icons.Pencil className="text-red-500" /> },
      {
        name: "باقة التحصيلي الشاملة (تأسيس وتدريب)",
        icon: <Icons.Gift className="text-orange-400" />,
      },
    ],
    "البرامج التقنية": [
      {
        name: "مهارات تقنية",
        icon: <Icons.Desktop className="text-teal-500" />,
      },
      {
        name: "مهارات المستقبل",
        icon: <Icons.Lightbulb className="text-yellow-500" />,
      },
    ],
  };

  const navLinks = [
    {
      name: "الرئيسية",
      active: true,
      icon: <Icons.Home className="text-blue-500" />,
      path: "/",
    }, // <<< إضافة مسار
    {
      name: "خطتي",
      icon: <Icons.Book className="text-green-500" />,
      path: "/my-plan",
    }, // <<< إضافة مسار افتراضي
    { name: "قدرات", dropdown: dropdowns["قدرات"] },
    { name: "تحصيلي", dropdown: dropdowns["تحصيلي"] },
    { name: "البرامج التقنية", dropdown: dropdowns["البرامج التقنية"] },
    {
      name: "دورات مُميزة",
      icon: <Icons.Star className="text-yellow-400" />,
      path: "/featured-courses",
    }, // <<< إضافة مسار افتراضي
    {
      name: "من نحن",
      icon: <Icons.Exclamation className="text-blue-400 font-bold" />,
      path: "/about-us",
    }, // <<< إضافة مسار افتراضي
    {
      name: "المقالات",
      icon: <Icons.Newspaper className="text-purple-500" />,
      path: "/articles",
    }, // <<< إضافة مسار افتراضي
  ];

  // --- دالة تسجيل الخروج ---
  async function handleLogout() {
    setIsLoggingOut(true); // <<< بدء الـ Loading
    const token = localStorage.getItem("userToken");

    if (!token) {
      // لو مفيش توكن أصلاً (احتياطي)
      setUserData(null);
      setIsLoggingOut(false);
      navigate("/login");
      return;
    }

    try {
      // إرسال طلب الـ Logout للـ API
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          // Body فارغ
          headers: {
            Authorization: `Bearer ${token}`, // إرسال التوكن في الهيدر
          },
        }
      );
      console.log("Logout successful on API.");
    } catch (error) {
      console.error("Logout API Error:", error);
      // حتى لو فشل الطلب للـ API، نسجل خروج المستخدم من الفرونت إند
      // ممكن نضيف رسالة للمستخدم هنا لو حابين
    } finally {
      // دائماً ننفذ الخطوات دي سواء نجح الطلب أو فشل
      localStorage.removeItem("userToken"); // <<< مسح التوكن
      setUserData(null); // <<< تفريغ الكونتكست
      setIsLoggingOut(false); // <<< إيقاف الـ Loading
      navigate("/login"); // <<< توجيه لصفحة الدخول
      closeMobileMenu(); // <<< إغلاق قائمة الموبايل لو مفتوحة
    }
  }
  // -------------------------

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 p-3 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-1">
          {/* Right Side: Logo */}
          <NavLink to="/" className="flex items-center cursor-pointer">
            {" "}
            {/* <<< جعل اللوجو لينك */}
            <Icons.GraduationCap className="text-gray-700 ml-4 text-4xl" />
            <div className="text-right">
              <div className="text-primary text-2xl font-extrabold ml-3">
                المئة
              </div>
              <div className="text-xs text-gray-500">التعليمية</div>
            </div>
          </NavLink>

          {/* Center: Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-2 font-semibold text-sm text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {/* <<< استخدام NavLink لو فيه مسار */}
                <NavLink
                  to={link.path || "#"} // لو مفيش path يبقى لينك عادي
                  // className يعتمد على active لو هو NavLink
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md transition-colors text-center ${
                      // نستخدم isActive لو link.path موجود
                      (link.path && isActive) ||
                      (link.name === "الرئيسية" &&
                        window.location.pathname === "/") // حالة خاصة للهوم
                        ? " bg-primary text-white font-bold "
                        : "hover:bg-gray-100"
                    }`
                  }
                  // لو هو dropdown مش هنعتبره active
                  end={link.path === "/"} // نضيف end للهوم عشان ميبقاش active في الصفحات التانية
                >
                  {link.icon && <span className="ml-1.5">{link.icon}</span>}
                  <span>{link.name}</span>
                  {link.dropdown && <Icons.CaretDown className="mr-1.5" />}
                </NavLink>

                {/* Desktop Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible transform group-hover:translate-y-0 translate-y-2 z-50">
                    <ul className="py-2">
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          {/* <<< ممكن نخلي دي NavLink لو ليها صفحات */}
                          <NavLink
                            to="#" // <<< مسار افتراضي مؤقت
                            className="flex items-center px-4 py-3 text-right text-gray-800 hover:bg-indigo-50 transition-colors"
                          >
                            <span className="ml-3">{item.icon}</span>
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Left Side: Desktop Login/Logout & Cart */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/cart"
              className="text-gray-500 hover:text-indigo-600 relative"
            >
              {" "}
              {/* <<< جعل السلة لينك */}
              <Icons.ShoppingCart className="text-2xl" />
              {/* ممكن نضيف عدد المنتجات هنا لو فيه cart context */}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span> */}
            </NavLink>

            {/* --- التحقق من حالة المستخدم --- */}
            {userData ? (
              // <<< حالة تسجيل الدخول
              <button
                onClick={handleLogout}
                disabled={isLoggingOut} // <<< تعطيل الزرار أثناء الخروج
                className="bg-red-500 text-white font-semibold flex items-center px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-red-600 disabled:opacity-50 disabled:cursor-wait"
              >
                {isLoggingOut ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <Icons.Logout className="ml-2 text-sm" />
                )}
                <span className="text-sm">
                  {isLoggingOut ? "جاري الخروج..." : "تسجيل خروج"}
                </span>
              </button>
            ) : (
              // <<< حالة عدم تسجيل الدخول
              <NavLink to="/login">
                <button className="bg-primary text-white font-semibold flex items-center px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                  <Icons.User className="ml-2 text-sm" />
                  <span className="text-sm">تسجيل دخول</span>
                </button>
              </NavLink>
            )}
            {/* ------------------------------- */}
          </div>

          {/* Mobile Burger Button */}
          <div className="lg:hidden flex items-center">
            {/* --- إضافة أيقونة السلة للموبايل --- */}
            <NavLink
              to="/cart"
              className="text-gray-700 hover:text-indigo-600 relative ml-4"
            >
              <Icons.ShoppingCart className="text-2xl" />
            </NavLink>
            {/* --------------------------------- */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="">
              <Icons.Bars className="text-gray-700 text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 bg-white z-[999] p-6 transition-transform duration-300 ease-in-out
                   flex flex-col
                   ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        // style={{ left: isMobileMenuOpen ? 0 : "-100%" }} // نستخدم translate أفضل
        dir="rtl" // <<< تأكيد الاتجاه
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <button onClick={closeMobileMenu}>
            <Icons.Times className="text-gray-700 text-2xl" />
          </button>
          <div className="flex items-center">
            <Icons.GraduationCap className="text-gray-700 ml-4 text-4xl" />
            <div className="text-right">
              <div className="text-primary text-2xl font-extrabold">المئة</div>
              <div className="text-xs text-gray-500">التعليمية</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div className="grow overflow-y-auto">
          <ul className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="border-b border-gray-100 last:border-b-0"
              >
                {!link.dropdown ? (
                  // <<< لو لينك عادي، استخدم NavLink
                  <NavLink
                    to={link.path || "#"}
                    onClick={closeMobileMenu} // <<< إغلاق القائمة عند الضغط
                    className={({ isActive }) =>
                      `flex items-center w-full py-4 text-lg ${
                        isActive && link.path ? "font-bold text-primary" : ""
                      }`
                    }
                    end={link.path === "/"}
                  >
                    {link.icon && <span className="ml-3">{link.icon}</span>}
                    {link.name}
                  </NavLink>
                ) : (
                  // <<< لو dropdown
                  <div>
                    <div
                      className="flex justify-between items-center w-full py-4 text-lg cursor-pointer"
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                    >
                      <div className="flex items-center">
                        {link.icon && <span className="ml-3">{link.icon}</span>}
                        <span>{link.name}</span>
                      </div>
                      <Icons.CaretDown
                        className={`transition-transform ${
                          openMobileDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {/* Mobile Submenu */}
                    {openMobileDropdown === link.name && (
                      <ul className="pr-8 pb-2">
                        {link.dropdown.map((item) => (
                          <li key={item.name} className="py-2">
                            {/* <<< ممكن نخلي دي NavLink لو ليها صفحات */}
                            <NavLink
                              to="#" // <<< مسار افتراضي مؤقت
                              onClick={closeMobileMenu} // <<< إغلاق القائمة
                              className="flex items-center text-gray-700"
                            >
                              {item.icon && (
                                <span className="ml-3">{item.icon}</span>
                              )}
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}

            {/* --- Login/Logout Button in Mobile Menu --- */}
            <li className="mt-6">
              {userData ? (
                // <<< حالة تسجيل الدخول
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-red-500 text-white font-semibold flex items-center justify-center px-6 py-4 rounded-lg text-lg disabled:opacity-50 disabled:cursor-wait"
                >
                  {isLoggingOut ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      {/* Spinner SVG */}
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <Icons.Logout className="ml-2 text-base" />
                  )}
                  <span>{isLoggingOut ? "جاري الخروج..." : "تسجيل خروج"}</span>
                </button>
              ) : (
                // <<< حالة عدم تسجيل الدخول
                <NavLink to="/login" onClick={closeMobileMenu}>
                  <button className="w-full bg-primary text-white font-semibold flex items-center justify-center px-6 py-4 rounded-lg text-lg">
                    <Icons.User className="ml-2 text-base" />
                    <span>تسجيل دخول</span>
                  </button>
                </NavLink>
              )}
            </li>
            {/* ------------------------------------------ */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
