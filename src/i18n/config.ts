import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Login
      login: "Login",
      email: "Email",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      welcomeBack: "Welcome Back",
      loginSubtitle: "Enter your credentials to access the admin dashboard",
      complaints: "Complaints",
      governmentSystem: "Government Complaints System",

      // Dashboard
      dashboard: "Dashboard",
      overview: "Overview",
      allComplaints: "All Complaints",
      pending: "Pending",
      inProgress: "In Progress",
      resolved: "Resolved",
      statistics: "Statistics",
      users: "Users",
      settings: "Settings",
      logout: "Logout",
      profile: "Profile",

      // Theme & Language
      theme: "Theme",
      language: "Language",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },
  },
  ar: {
    translation: {
      // Login
      login: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      welcomeBack: "مرحباً بعودتك",
      loginSubtitle: "أدخل بيانات الاعتماد للوصول إلى لوحة الإدارة",
      complaints: "الشكاوى",
      governmentSystem: "نظام الشكاوى الحكومي",

      // Dashboard
      dashboard: "لوحة التحكم",
      overview: "نظرة عامة",
      allComplaints: "جميع الشكاوى",
      pending: "قيد الانتظار",
      inProgress: "قيد المعالجة",
      resolved: "محلولة",
      statistics: "الإحصائيات",
      users: "المستخدمون",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",

      // Theme & Language
      theme: "المظهر",
      language: "اللغة",
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع الداكن",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
