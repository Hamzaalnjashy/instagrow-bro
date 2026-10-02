# InstaGrow Pro 🚀
### منصة زيادة وتزويد المتابعين واللايكات الاحترافية | Professional Instagram Growth & SMM Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-success.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 نبذة عن المشروع / Overview

**InstaGrow Pro** هو تطبيق ويب متكامل ومتقدم (Full-Stack PWA) مخصص لإدارة وتزويد خدمات التواصل الاجتماعي (Instagram Followers & Likes) عبر الربط المباشر مع مزودي الـ SMM المعتمدين عالمياً (مثل **JustAnotherPanel** و **Peakerr API**)، مع نظام شحن داخلي متعدد الخيارات وتتبع لحظي مباشر لتنفيذ الطلبات وحساب الرصيد الحقيقي بدقة 100%.

---

## ✨ المميزات الرئيسية / Key Features

- **⚡ ربط مباشر مع مزودي الـ SMM (Direct API Integration)**:
  - دعم كامل لمزودي الخدمة `JustAnotherPanel (JAP)` و `Peakerr API v2`.
  - جلب الأسعار والخدمات والأرصدة الفعلية عبر الـ API الرسمي.
- **💳 نظام شحن الرصيد الداخلي الحقيقي (In-App Wallet & Recharge)**:
  - الرصيد يبدأ من `$0.00 USD` ولا يرتفع إلا بعد الشحن الفعلي.
  - دعم الدفع بالبطاقات الائتمانية، Apple Pay، العملات الرقمية (USDT TRC-20)، ومحفظة STC Pay.
  - إصدار إيصالات دفع مشفرة وسجل كامل لعمليات التعبئة.
- **📡 لوحة تتبع السيرفر المباشرة (Live Order Execution Tracker)**:
  - تتبع حي لتنفيذ أوامر التزويد، قراءة العداد الابتدائي، الكمية المستلمة، والمتبقية لحظة بلحظة.
- **📱 تطبيق هاتف تقدمي معتمد (Progressive Web App - PWA)**:
  - إمكانية تثبيت التطبيق مباشرة كأيقونة على شاشة الهاتف الرئيسية (iPhone Safari & Android Chrome).
  - يعمل بملء الشاشة وبسرعة التطبيقات الأصلية بدون إطار المتصفح.
- **🎨 مظهر تفاعلي متقدم وتخصيص الألوان (Theme Switcher)**:
  - دعم أنماط وألوان متعددة (Instagram Neon, Cyberpunk, Dark Luxury, Sunset, Emerald, Royal Purple).
- **🛡️ أمان كامل وحماية الخصوصية**:
  - تنفيذ الطلبات بدون الحاجة لكلمات المرور نهائياً.

---

## 🛠️ التقنيات المستخدمة / Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, Motion.
- **Backend**: Node.js, Express.js (REST API Proxy & SMM Integration).
- **Build & Dev Tooling**: Vite, TSX, ImageMagick/PWA Asset Generator.
- **Architecture**: Single Page Application (SPA) with integrated backend proxy for secure SMM API handling.

---

## 🚀 التشغيل والتثبيت المحلي / Local Setup & Installation

### 1. المتطلبات / Prerequisites
- Node.js (v18.0.0 أو أحدث / or newer)
- npm أو pnpm أو yarn

### 2. استنساخ المشروع / Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 3. تثبيت الحزم / Install dependencies
```bash
npm install
```

### 4. إعداد المتغيرات البيئية / Environment Variables
قم بإنشاء ملف `.env` استناداً إلى `.env.example`:
```bash
cp .env.example .env
```

### 5. تشغيل بيئة التطوير / Run development server
```bash
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

### 6. بناء المشروع للإنتاج / Production Build
```bash
npm run build
npm start
```

---

## 📁 هيكل المجلدات / Project Structure

```text
├── public/                 # PWA Manifest, Service Worker, and App Icons
│   ├── manifest.json
│   ├── sw.js
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png
├── src/                    # Frontend source code
│   ├── components/         # Modular React UI components
│   ├── context/            # Theme & Application State
│   ├── data/               # Baseline data & mock models
│   ├── hooks/              # Custom hooks (PWA install, etc.)
│   ├── types.ts            # TypeScript interfaces & types
│   └── App.tsx             # Main App Layout
├── server.ts               # Express backend proxy for SMM APIs
├── smm-config.json         # Real SMM provider configurations
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```

---

## 📄 الترخيص / License

هذا المشروع مرخص بموجب رخصة [MIT License](LICENSE).
