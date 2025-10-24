import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API Endpoints
const HOME_SECTIONS_LIST_URL = "https://api-ed.zynqor.org/api/p/home";
const HOME_SECTION_DETAIL_URL = (key) =>
  `https://api-ed.zynqor.org/api/p/home/${key}`;

// Function to fetch all detailed home sections data
async function fetchAllHomeData() {
  console.log("Fetching section keys...");
  // 1. جلب قائمة الـ keys أولاً
  const { data: listData } = await axios.get(
    `${HOME_SECTIONS_LIST_URL}?locale=ar`
  );

  if (!listData || !listData.sections || listData.sections.length === 0) {
    console.log("No section keys found.");
    return []; // نرجع مصفوفة فاضية لو مفيش keys
  }

  const sectionKeys = listData.sections.map((section) => section.key);
  console.log("Found section keys:", sectionKeys);

  // 2. جلب تفاصيل كل قسم بناءً على الـ key باستخدام Promise.all
  console.log("Fetching details for each section...");
  const detailPromises = sectionKeys.map((key) =>
    axios
      .get(`${HOME_SECTION_DETAIL_URL(key)}?locale=ar`)
      .then((response) => {
        // الـ API بيرجع { message, locale, section, items }
        // نتأكد إن الرد يحتوي على section و items
        if (response.data && response.data.section) {
          // ندمج الـ section والـ items في object واحد عشان يبقى أسهل
          return {
            ...response.data.section, // بيانات السكشن (id, key, title, etc.)
            items: response.data.items || [], // قائمة العناصر (features, categories, etc.)
          };
        } else {
          console.warn(`Invalid response structure for key: ${key}`);
          return null; // نرجع null لو الرد مش سليم للقسم ده
        }
      })
      .catch((error) => {
        console.error(`Error fetching details for section key: ${key}`, error);
        return null; // نرجع null لو حصل خطأ في جلب تفاصيل قسم معين
      })
  );

  const detailedSectionsResults = await Promise.all(detailPromises);

  // فلترة النتائج عشان نشيل أي nulls (السكاشن اللي فشل جلبها)
  const validDetailedSections = detailedSectionsResults.filter(
    (section) => section !== null
  );

  console.log("Fetched detailed sections:", validDetailedSections);
  return validDetailedSections;
}

// The Custom Hook using React Query
export function useHomeData() {
  const {
    data: detailedSections, // هنسمي الداتا detailedSections
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["homeDataDetailed", "ar"], // مفتاح كاش جديد للتفاصيل
    queryFn: fetchAllHomeData, // الدالة الجديدة اللي بتجيب كل حاجة
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });

  return { detailedSections, isLoading, error, isError };
}
