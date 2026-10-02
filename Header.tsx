import React, { useState } from 'react';
import { Sparkles, Globe, ShieldCheck, Flame, Gift, ShieldAlert, Crown, Palette, CreditCard, ChevronDown, Wallet, Download, FolderArchive, FileText } from 'lucide-react';
import { Language } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentTab: 'followers' | 'likes' | 'services' | 'admin' | 'campaigns' | 'tools' | 'safety';
  setCurrentTab: (tab: 'followers' | 'likes' | 'services' | 'admin' | 'campaigns' | 'tools' | 'safety') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeOrdersCount: number;
  dailyCreditsAvailable: boolean;
  onOpenCreditsModal: () => void;
  onOpenThemeModal: () => void;
  onOpenRechargeModal: (providerId?: 'jap' | 'peakerr') => void;
  onOpenInstallModal?: () => void;
  walletBalances?: {
    jap: number;
    peakerr: number;
    total: number;
  };
}

interface NavItem {
  id: 'followers' | 'likes' | 'services' | 'admin' | 'campaigns' | 'tools' | 'safety';
  label: string;
  badge?: number | string;
  isSpecial?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  activeOrdersCount,
  dailyCreditsAvailable,
  onOpenCreditsModal,
  onOpenThemeModal,
  onOpenRechargeModal,
  onOpenInstallModal,
  walletBalances = { jap: 0, peakerr: 0, total: 0 },
}) => {
  const isAr = language === 'ar';
  const { theme, currentThemeId } = useTheme();
  const [isRechargeMenuOpen, setIsRechargeMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'followers', label: isAr ? 'زيادة المتابعين' : 'Boost Followers' },
    { id: 'likes', label: isAr ? 'زيادة اللايكات' : 'Boost Likes' },
    { 
      id: 'services', 
      label: isAr ? 'بقية الخدمات والمنصات' : 'All Services & Platforms',
      badge: isAr ? 'جديد ⚡' : 'NEW ⚡',
    },
    { 
      id: 'campaigns', 
      label: isAr ? 'سجل الطلبات' : 'Orders History',
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined
    },
    { id: 'tools', label: isAr ? 'أدوات النمو' : 'Growth Tools' },
    { 
      id: 'admin', 
      label: isAr ? 'تحكم المشغّل الوحيد' : 'Master Admin Console',
      badge: isAr ? 'الرئيسي' : 'Root',
      isSpecial: true
    },
    { id: 'safety', label: isAr ? 'الأمان والضمان' : 'Safety & Guarantee' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentTab('followers')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div 
              className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${theme.iconGlow} shadow-lg shadow-black/40`}
            >
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              InstaGrow<span className={`bg-gradient-to-r ${theme.accentGradientText} bg-clip-text text-transparent`}>Pro</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive
                    ? 'text-white'
                    : item.isSpecial
                    ? 'text-rose-400 hover:text-rose-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.isSpecial && <Crown className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ms-1 inline-flex items-center justify-center rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    item.isSpecial
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : theme.badgeStyle
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r ${theme.accentGradientBar}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          {/* Live Real Available Balance Indicator */}
          <button
            onClick={() => onOpenRechargeModal()}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 text-xs font-mono transition shadow-sm"
            title={isAr ? 'الرصيد الفعلي المتاح - اضغط للشحن' : 'Real Live Balance - Click to Recharge'}
          >
            <Wallet className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-slate-300 font-sans text-[11px] hidden sm:inline">{isAr ? 'الرصيد:' : 'Bal:'}</span>
            <span className="font-extrabold text-emerald-300">${walletBalances.total.toFixed(2)}</span>
          </button>

          {/* Dual In-App Recharge Windows Buttons (Both Sites) */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => onOpenRechargeModal('jap')}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-1.5 text-xs font-bold text-emerald-300 transition shadow-sm"
              title={isAr ? 'نافذة شحن JustAnotherPanel' : 'Recharge JustAnotherPanel'}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'شحن JAP' : 'Top Up JAP'}</span>
            </button>

            <button
              onClick={() => onOpenRechargeModal('peakerr')}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 px-2.5 py-1.5 text-xs font-bold text-cyan-300 transition shadow-sm"
              title={isAr ? 'نافذة شحن Peakerr API' : 'Recharge Peakerr API'}
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{isAr ? 'شحن Peakerr' : 'Top Up Peakerr'}</span>
            </button>
          </div>

          {/* Mobile / Compact Dual Recharge Dropdown */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsRechargeMenuOpen(!isRechargeMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-1.5 text-xs font-extrabold text-emerald-300 transition-colors shadow-sm"
              title={isAr ? 'شحن رصيد كلا الموقعين (JAP & Peakerr)' : 'Top Up Providers Balance'}
            >
              <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isAr ? 'شحن الرصيد' : 'Recharge'}</span>
              <ChevronDown className={`h-3 w-3 text-emerald-400 transition-transform ${isRechargeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown to pick provider recharge window */}
            {isRechargeMenuOpen && (
              <div 
                className="absolute end-0 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl"
                onClick={() => setIsRechargeMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 border-b border-white/10 flex items-center justify-between">
                  <span>{isAr ? 'الرصيد الفعلي المتاح:' : 'Live Balance:'}</span>
                  <span className="font-mono text-emerald-400">${walletBalances.total.toFixed(2)}</span>
                </div>

                <div className="mt-1 space-y-1">
                  <button
                    onClick={() => onOpenRechargeModal('jap')}
                    className="w-full text-start p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <span className="font-bold text-white block group-hover:text-emerald-400">
                          {isAr ? '1. شحن JustAnotherPanel' : '1. Recharge JAP'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isAr ? 'المزود المباشر الأول' : 'Primary Direct Provider'}
                        </span>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs font-mono">
                      💳
                    </span>
                  </button>

                  <button
                    onClick={() => onOpenRechargeModal('peakerr')}
                    className="w-full text-start p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition text-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <div>
                        <span className="font-bold text-white block group-hover:text-cyan-400">
                          {isAr ? '2. شحن Peakerr API v2' : '2. Recharge Peakerr'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isAr ? 'سيرفر التزويد السريع' : 'High-Speed API Node'}
                        </span>
                      </div>
                    </div>
                    <span className="text-cyan-400 font-bold text-xs font-mono">
                      ⚡
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PWA Phone Install Button */}
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 rounded-lg border border-pink-500/40 bg-pink-500/15 hover:bg-pink-500/25 px-2.5 py-1.5 text-xs font-bold text-pink-300 transition-colors shadow-sm"
              title={isAr ? 'تثبيت التطبيق كأيقونة على هاتفك (آيفون وأندرويد)' : 'Install App to Phone (iPhone & Android)'}
            >
              <Download className="h-3.5 w-3.5 text-pink-400" />
              <span className="hidden sm:inline">{isAr ? 'أيقونة الهاتف' : 'Install App'}</span>
            </button>
          )}

          {/* Download Unified All-In-One Code File */}
          <a
            href="/instagrow-all-code.txt"
            download="instagrow-all-code.txt"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-1.5 text-xs font-bold text-emerald-300 transition-colors shadow-sm"
            title={isAr ? 'تنزيل جميع أكواد التطبيق مدمجة في ملف نصي واحد (.txt)' : 'Download All Code in One File (.txt)'}
          >
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isAr ? 'ملف الكود الموحد' : 'All-in-One'}</span>
          </a>

          {/* Download Project Source Code ZIP */}
          <a
            href="/instagrow-pro.zip"
            download="instagrow-pro.zip"
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 px-2.5 py-1.5 text-xs font-bold text-cyan-300 transition-colors shadow-sm"
            title={isAr ? 'تنزيل سورس كود وملفات التطبيق كاملة (ZIP)' : 'Download Project Source Code (ZIP)'}
          >
            <FolderArchive className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{isAr ? 'حزمة ZIP' : 'Source ZIP'}</span>
          </a>

          {/* Theme Palette Switcher Button */}
          <button
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
            title={isAr ? 'تغيير ألوان وتصميم التطبيق' : 'Change theme & colors'}
          >
            <div 
              className="h-3.5 w-3.5 rounded-full border border-white/40 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
            />
            <span className="hidden sm:inline">{isAr ? 'الألوان' : 'Theme'}</span>
          </button>

          {/* Master Admin Live Badge */}
          <button
            onClick={() => setCurrentTab('admin')}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
            title="Master Operator ha888mza0@gmail.com"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="whitespace-nowrap">{isAr ? 'المتحكم الوحيد: حمزة' : 'Operator: Hamza'}</span>
          </button>

          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="font-semibold uppercase">{isAr ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="flex md:hidden overflow-x-auto border-t border-white/5 px-4 py-2 gap-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? `${theme.badgeStyle} font-bold`
                  : item.isSpecial
                  ? 'text-rose-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
              {item.badge && <span className="ms-1 text-[10px]">({item.badge})</span>}
            </button>
          );
        })}
      </div>
    </header>
  );
};

