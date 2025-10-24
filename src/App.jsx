import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// استيراد الـ Providers
import UserContextProvider from "./context/UserContext.jsx";

// استيراد الـ Layout والصفحات
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";

// 1. إنشاء الـ Query Client
const queryClient = new QueryClient();

// 2. تعريف الراوتر
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // الغلاف الأساسي (نافبار + فوتر)
    children: [
      {
        index: true, // الصفحة الافتراضية
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // ... ضيف باقي الصفحات هنا
    ],
  },
]);

export default function App() {
  // 3. تجميع الـ Providers وتمرير الراوتر
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
