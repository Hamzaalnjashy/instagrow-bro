import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Zap,
  MoreVertical,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isArabic,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d121d] text-white shadow-2xl overflow-hidden text-start animate-scaleUp"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Glow Header Background */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-cyan-600/20 blur-xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="/pwa-192x192.png" 
              alt="InstaGrow App Icon" 
              className="h-14 w-14 rounded-2xl shadow-lg border border-white/15 object-cover ring-2 ring-pink-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isArabic ? 'تثبيت التطبيق كأيقونة على هاتفك' : 'Install App Icon on Your Phone'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isArabic ? 'تطبيق رسمي PWA' : 'Official PWA'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isArabic 
                  ? 'يعمل كتطبيق هاتف أصلي بدون شريط المتصفح وبسرعة فائقة' 
                  : 'Works as a standalone native app on your home screen'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Platform Tabs Switcher */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActivePlatform('ios')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activePlatform === 'ios'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>{isArabic ? '📱 آيفون (iPhone / Safari)' : 'iPhone (Safari)'}</span>
            </button>

            <button
              onClick={() => setActivePlatform('android')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activePlatform === 'android'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>{isArabic ? '🤖 أندرويد (Android / Chrome)' : 'Android (Chrome)'}</span>
            </button>
          </div>

          {/* Quick 1-Click Install Button if supported by browser */}
          {isInstallable && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isArabic ? 'جهازك يدعم التثبيت الفوري الآن!' : 'Instant Install Supported!'}
                  </span>
                  <span className="text-[11px] text-emerald-300">
                    {isArabic ? 'اضغط لتنزيل الأيقونة مباشرة للشاشة' : 'Click to add icon directly to home screen'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-lg shrink-0 flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>{isArabic ? 'تثبيت الآن' : 'Install Now'}</span>
              </button>
            </div>
          )}

          {/* iOS Safari Steps */}
          {activePlatform === 'ios' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span>{isArabic ? 'خطوات إضافة الأيقونة في متصفح سفاري (Safari):' : 'Steps for iPhone Safari:'}</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                {/* Step 1 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'اضغط على زر المشاركة (Share)' : 'Tap the Share button'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'الأيقونة المربعة مع سهم لأعلى ⎋ في شريط سفاري السفلي.' : 'The square icon with arrow pointing up at the bottom bar.'}
                    </p>
                  </div>
                  <Share className="h-5 w-5 text-pink-400 shrink-0" />
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'اختر "إضافة إلى الصفحة الرئيسية"' : 'Select "Add to Home Screen"'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'مرر قائمة الخيارات لأسفل واضغط على رمز ➕.' : 'Scroll down the options list and tap the ➕ symbol.'}
                    </p>
                  </div>
                  <PlusSquare className="h-5 w-5 text-pink-400 shrink-0" />
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'اضغط "إضافة (Add)" في أعلى الشاشة' : 'Tap "Add" at the top right'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'ستظهر أيقونة InstaGrow Pro فوراً بين تطبيقات هاتفك!' : 'InstaGrow icon will appear on your phone home screen!'}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>
          )}

          {/* Android Chrome Steps */}
          {activePlatform === 'android' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span>{isArabic ? 'خطوات إضافة الأيقونة في متصفح كروم (Google Chrome):' : 'Steps for Android Chrome:'}</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                {/* Step 1 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'اضغط على زر القائمة (النقاط الثلاث ⋮)' : 'Tap the Menu button (Three dots ⋮)'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'الموجودة في أعلى زاوية متصفح كروم.' : 'Located at the top corner of the Chrome browser.'}
                    </p>
                  </div>
                  <MoreVertical className="h-5 w-5 text-cyan-400 shrink-0" />
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'اختر "تثبيت التطبيق" أو "إضافة للشاشة الرئيسية"' : 'Select "Install app" or "Add to Home screen"'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'اضغط خيار Install App أو Add to Home screen.' : 'Tap on the Install or Add to Home screen option.'}
                    </p>
                  </div>
                  <Download className="h-5 w-5 text-cyan-400 shrink-0" />
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      {isArabic ? 'تأكيد التثبيت (Install)' : 'Confirm Install'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {isArabic ? 'سيتم تثبيت التطبيق وفتحه كبرنامج مستقل بدون إطار المتصفح.' : 'The app will be installed and launches standalone.'}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>
          )}

          {/* Benefits summary */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 gap-3 text-[11px]">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{isArabic ? 'فتح سريع بلمسة واحدة' : 'Instant 1-tap launch'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{isArabic ? 'بدون شريط متصفح مزعج' : 'No browser URL bars'}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-black/30 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {isArabic ? 'رابط المشاركة المباشر للهاتف:' : 'Direct Phone URL:'}
          </span>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5"
          >
            <span>{isArabic ? 'تم فهم الطريقة ✔' : 'Got it ✔'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
