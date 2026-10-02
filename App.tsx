import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { FollowerBooster } from './components/FollowerBooster';
import { LikesBooster } from './components/LikesBooster';
import { DispatchSummaryCard } from './components/DispatchSummaryCard';
import { LiveDeliveryModal } from './components/LiveDeliveryModal';
import { CampaignsList } from './components/CampaignsList';
import { GrowthTools } from './components/GrowthTools';
import { SafetyGuide } from './components/SafetyGuide';
import { FreeCreditsModal } from './components/FreeCreditsModal';
import { AdminConsole } from './components/AdminConsole';
import { MultiServiceBooster } from './components/MultiServiceBooster';
import { ThemeModal } from './components/ThemeModal';
import { ThemeBar } from './components/ThemeBar';
import { ProviderRechargeModal } from './components/ProviderRechargeModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { 
  Language, 
  InstagramProfile, 
  InstagramPost, 
  BoostCampaign,
  SystemLog 
} from './types';
import { DEFAULT_PROFILES, SAMPLE_POSTS, HERO_IMAGE, INITIAL_SYSTEM_LOGS } from './data/mockData';
import { ShieldCheck, Zap, Users, Heart, Sparkles, TrendingUp, ShieldAlert, Palette, CreditCard, Download, ArrowRight } from 'lucide-react';
import { formatNumber } from './utils/formatters';
import { safeStorage } from './utils/storage';

const STORAGE_CAMPAIGNS_KEY = 'instagrow_campaigns_v1';
const STORAGE_LANG_KEY = 'instagrow_lang_v1';

function MainApp() {
  const { theme } = useTheme();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [rechargeModalProvider, setRechargeModalProvider] = useState<'jap' | 'peakerr'>('jap');
  const [walletBalances, setWalletBalances] = useState<{
    jap: number;
    peakerr: number;
    total: number;
  }>({
    jap: 0.0,
    peakerr: 0.0,
    total: 0.0,
  });

  const refreshWalletBalances = useCallback(async () => {
    try {
      const [resJap, resPeakerr] = await Promise.all([
        fetch('/api/smm/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId: 'jap' }),
        }).then(r => r.json()).catch(() => ({ totalAvailable: '0.00' })),
        fetch('/api/smm/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId: 'peakerr' }),
        }).then(r => r.json()).catch(() => ({ totalAvailable: '0.00' })),
      ]);

      const japBal = Number(resJap.totalAvailable ?? 0);
      const peakBal = Number(resPeakerr.totalAvailable ?? 0);
      setWalletBalances({
        jap: isNaN(japBal) ? 0 : japBal,
        peakerr: isNaN(peakBal) ? 0 : peakBal,
        total: Number(((isNaN(japBal) ? 0 : japBal) + (isNaN(peakBal) ? 0 : peakBal)).toFixed(2)),
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    refreshWalletBalances();
  }, [refreshWalletBalances]);

  const handleOpenRechargeModal = (providerId?: 'jap' | 'peakerr') => {
    if (providerId) {
      setRechargeModalProvider(providerId);
    }
    setIsRechargeModalOpen(true);
  };

  const [language, setLanguage] = useState<Language>(() => {
    return (safeStorage.getItem(STORAGE_LANG_KEY) as Language) || 'ar';
  });

  const [currentTab, setCurrentTab] = useState<'followers' | 'likes' | 'services' | 'admin' | 'campaigns' | 'tools' | 'safety'>('followers');

  const [selectedProfile, setSelectedProfile] = useState<InstagramProfile>(
    DEFAULT_PROFILES['muhndszrai'] || DEFAULT_PROFILES['hamza_creator']
  );

  const [selectedPost, setSelectedPost] = useState<InstagramPost>(
    SAMPLE_POSTS[0]
  );

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(INITIAL_SYSTEM_LOGS);

  const addSystemLog = (message: string, type: SystemLog['type'] = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    const newLog: SystemLog = {
      id: 'log_' + Date.now() + Math.random().toString(36).substr(2, 4),
      timestamp: time,
      type,
      message,
    };
    setSystemLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const [campaigns, setCampaigns] = useState<BoostCampaign[]>(() => {
    const saved = safeStorage.getItem(STORAGE_CAMPAIGNS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'IG-7489',
        serviceType: 'followers',
        targetUsername: 'hamza_creator',
        quantityRequested: 1000,
        quantityDelivered: 1000,
        qualityTier: 'arab_gulf',
        deliverySpeed: 'instant',
        status: 'completed',
        createdAt: '2026-09-21 18:30',
        estimatedCompletionTime: '15 دقيقة',
      },
      {
        id: 'IG-8120',
        serviceType: 'likes',
        targetUsername: 'hamza_creator',
        targetPostUrl: 'https://instagram.com/p/DB94kL1sX9/',
        postThumbnail: SAMPLE_POSTS[0].imageUrl,
        quantityRequested: 500,
        quantityDelivered: 500,
        qualityTier: 'arab_gulf',
        deliverySpeed: 'instant',
        status: 'completed',
        createdAt: '2026-09-22 10:15',
        estimatedCompletionTime: '10 دقائق',
      }
    ];
  });

  const [activeLiveCampaign, setActiveLiveCampaign] = useState<BoostCampaign | null>(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [dailyCreditsAvailable, setDailyCreditsAvailable] = useState(true);

  // Sync language with document dir & lang
  useEffect(() => {
    safeStorage.setItem(STORAGE_LANG_KEY, language);
    try {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    } catch {
      // ignore
    }
  }, [language]);

  // Persist campaigns
  useEffect(() => {
    safeStorage.setItem(STORAGE_CAMPAIGNS_KEY, JSON.stringify(campaigns));
  }, [campaigns]);

  const isArabic = language === 'ar';

  const handleStartCampaign = async (
    data: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>
  ) => {
    const newId = 'IG-' + Math.floor(1000 + Math.random() * 9000);
    const newCampaign: BoostCampaign = {
      ...data,
      id: newId,
      quantityDelivered: 0,
      status: 'delivering',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setActiveLiveCampaign(newCampaign);
    setIsLiveModalOpen(true);

    addSystemLog(
      isArabic
        ? `[DISPATCH] أمر ضخ جديد #${newId} للحساب @${data.targetUsername} (${data.quantityRequested} ${data.serviceType === 'followers' ? 'متابع' : 'لايك'}).`
        : `[DISPATCH] New boost job #${newId} for @${data.targetUsername} (${data.quantityRequested} ${data.serviceType}).`,
      'dispatch'
    );

    // Communicate with backend SMM engine
    try {
      const response = await fetch('/api/smm/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: data.serviceType,
          target: (data.serviceType === 'followers' || data.serviceType === 'story')
            ? data.targetUsername 
            : (data.targetPostUrl || data.targetUsername),
          quantity: data.quantityRequested,
          customServiceId: data.serviceId,
          providerId: data.providerId,
          comments: data.customCommentsText,
          localCampaignId: newId,
        }),
      });
      const resJson = await response.json();
      if (resJson.success) {
        if (!resJson.isSimulation) {
          addSystemLog(
            isArabic
              ? `[REAL_SMM] تم إرسال الطلب بنجاح إلى مزود الخدمة (${resJson.provider || 'Peakerr'}) برقم طلب خارجي #${resJson.orderId}.`
              : `[REAL_SMM] Successfully transmitted to live SMM provider (${resJson.provider || 'Peakerr'}) #${resJson.orderId}.`,
            'success'
          );
        } else {
          addSystemLog(
            isArabic
              ? `[SYSTEM] الطلب قيد المعالجة في محاكي المنصة الخاص بـ (${resJson.provider || 'Peakerr'}).`
              : `[SYSTEM] Order running in simulator for (${resJson.provider || 'Peakerr'}).`,
            'warning'
          );
        }
      } else if (resJson.error) {
        addSystemLog(
          `[SMM_ERROR] ${resJson.error}`,
          'warning'
        );
      }
    } catch {
      // offline / fallback
    }
  };

  const handleBatchInject = async (usernames: string[], amount: number, service: 'followers' | 'likes') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newCampaigns: BoostCampaign[] = usernames.map((user, idx) => ({
      id: 'IG-B' + (Math.floor(1000 + Math.random() * 9000) + idx),
      serviceType: service,
      targetUsername: user,
      quantityRequested: amount,
      quantityDelivered: 0,
      qualityTier: 'arab_gulf',
      deliverySpeed: 'instant',
      status: 'delivering',
      createdAt: timestamp,
      estimatedCompletionTime: '5-15 دقيقة',
    }));

    setCampaigns((prev) => [...newCampaigns, ...prev]);
    if (newCampaigns.length > 0) {
      setActiveLiveCampaign(newCampaigns[0]);
      setIsLiveModalOpen(true);
    }

    // Dispatch batch to real backend
    for (const user of usernames) {
      try {
        await fetch('/api/smm/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceType: service,
            target: user,
            quantity: amount,
          }),
        });
      } catch {
        // silent
      }
    }
  };

  const handleUpdateCampaign = useCallback((updated: BoostCampaign) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setActiveLiveCampaign((prev) => (prev?.id === updated.id ? updated : prev));
  }, []);

  const handleOpenLiveModal = (campaign: BoostCampaign) => {
    setActiveLiveCampaign(campaign);
    setIsLiveModalOpen(true);
  };

  const handleClaimFreeBoost = (
    data: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>
  ) => {
    setDailyCreditsAvailable(false);
    handleStartCampaign(data);
  };

  const activeOrdersCount = campaigns.filter((c) => c.status === 'delivering').length;

  return (
    <div className={`min-h-screen ${theme.bgBase} text-slate-100 flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        activeOrdersCount={activeOrdersCount}
        dailyCreditsAvailable={dailyCreditsAvailable}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenRechargeModal={handleOpenRechargeModal}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        walletBalances={walletBalances}
      />

      {/* Hero Strip */}
      <section className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-b ${theme.bgHero} py-8 sm:py-10 transition-colors duration-300`}>
        {/* Subtle dynamic background glow */}
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r ${theme.glowBlob} blur-3xl pointer-events-none`} 
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-start max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                <span 
                  className="h-2 w-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <span style={{ color: theme.primaryColor }}>
                  {isArabic ? 'المنصة رقم 1 لتزويد وتنمية حسابات إنستغرام' : '#1 Instagram Growth & SMM Engine'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {isArabic ? (
                  <>
                    ضِاعف <span className={`bg-gradient-to-r ${theme.accentGradientText} bg-clip-text text-transparent`}>المتابعين واللايكات</span> بضمان الأمان وسرعة التنفيذ
                  </>
                ) : (
                  <>
                    Scale Your <span className={`bg-gradient-to-r ${theme.accentGradientText} bg-clip-text text-transparent`}>Followers & Likes</span> With Guaranteed Safety
                  </>
                )}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                {isArabic 
                  ? 'اكتب اسم المستخدم وحدد عدد المتابعين المطلوب، أو الصق رابط المنشور لزيادة اللايكات فوراً. لا نطلب كلمة السر إطلاقاً وبأعلى معايير الحماية.' 
                  : 'Specify username to inject followers or paste post link to boost likes. 100% password-free, real-time live simulation.'}
              </p>

              {/* Trust Indicators */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>{isArabic ? 'بدون كلمة سر نهائياً' : 'Zero Password Required'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>{isArabic ? 'تسليم فوري أو تدريجي' : 'Instant & Drip Feed'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" style={{ color: theme.accentColor }} />
                  <span>{isArabic ? 'ضمان تعويض 365 يوم' : '365-Day Refill Guarantee'}</span>
                </div>
              </div>

              {/* PWA Phone Install Quick Pill */}
              <div className="mt-4">
                <button
                  onClick={() => setIsInstallModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 text-xs font-bold transition shadow-sm"
                >
                  <Download className="h-3.5 w-3.5 text-pink-400" />
                  <span>{isArabic ? '📱 تثبيت التطبيق كأيقونة على شاشة هاتفك (آيفون / أندرويد)' : '📱 Install App to Phone Screen (iOS / Android)'}</span>
                  <ArrowRight className="h-3 w-3 rtl:rotate-180 text-pink-400" />
                </button>
              </div>
            </div>

            {/* Live Target Status Badge */}
            <div className="hidden lg:flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
              <div 
                className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${theme.iconGlow} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                @
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span>@{selectedProfile.username.replace(/^@/, '')}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({isArabic ? 'الحساب المحدد' : 'Target Account'})</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                  instagram.com/{selectedProfile.username.replace(/^@/, '')}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isArabic ? 'رابط التزويد المباشر جاهز' : 'Direct API Link Active'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Interactive Color Themes Strip */}
        <ThemeBar isArabic={isArabic} onOpenModal={() => setIsThemeModalOpen(true)} />

        {/* --- IN-APP RECHARGE DUAL QUICK BAR --- */}
        <div className="w-full rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/30 p-3 sm:p-4 backdrop-blur-md mb-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {isArabic ? 'نافذتا شحن الرصيد المباشرة لكلا الموقعين' : 'Direct Recharge Windows for Both Sites'}
                </span>
                <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isArabic ? `الرصيد الفعلي المتاح: $${walletBalances.total.toFixed(2)} USD` : `Live Balance: $${walletBalances.total.toFixed(2)} USD`}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {isArabic 
                  ? 'رصيدك الفعلي يبدأ من 0.00 $ ولا يرتفع إلا بعد الشحن الفعلي عبر البطاقة أو الكريبتو لضمان حقيقية ومصداقية التطبيق 100%.' 
                  : 'Your live balance starts at $0.00 and only increases upon top-up via card or crypto to ensure 100% real operation.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenRechargeModal('jap')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-md"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>{isArabic ? `شحن JAP ($${walletBalances.jap.toFixed(2)})` : `Top Up JAP ($${walletBalances.jap.toFixed(2)})`}</span>
            </button>

            <button
              onClick={() => handleOpenRechargeModal('peakerr')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 transition shadow-md"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>{isArabic ? `شحن Peakerr ($${walletBalances.peakerr.toFixed(2)})` : `Top Up Peakerr ($${walletBalances.peakerr.toFixed(2)})`}</span>
            </button>
          </div>
        </div>

        {currentTab === 'followers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Follower booster form */}
            <div className="lg:col-span-7">
              <FollowerBooster
                onStartCampaign={handleStartCampaign}
                isArabic={isArabic}
                selectedProfile={selectedProfile}
                onSelectProfile={setSelectedProfile}
              />
            </div>
            {/* Direct Dispatch & Technical Verification Card */}
            <div className="lg:col-span-5 sticky top-24">
              <DispatchSummaryCard
                profile={selectedProfile}
                isArabic={isArabic}
                serviceType="followers"
                onOpenRechargeModal={handleOpenRechargeModal}
              />
            </div>
          </div>
        )}

        {currentTab === 'likes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Likes booster form */}
            <div className="lg:col-span-7">
              <LikesBooster
                onStartCampaign={handleStartCampaign}
                isArabic={isArabic}
                profile={selectedProfile}
                selectedPost={selectedPost}
                onSelectPost={setSelectedPost}
              />
            </div>
            {/* Direct Dispatch & Technical Verification Card */}
            <div className="lg:col-span-5 sticky top-24">
              <DispatchSummaryCard
                profile={selectedProfile}
                isArabic={isArabic}
                serviceType="likes"
                onOpenRechargeModal={handleOpenRechargeModal}
              />
            </div>
          </div>
        )}

        {currentTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* All Multi-Provider Services Hub */}
            <div className="lg:col-span-8">
              <MultiServiceBooster
                onStartCampaign={handleStartCampaign}
                isArabic={isArabic}
                selectedProfile={selectedProfile}
              />
            </div>
            {/* Direct Dispatch & Technical Verification Card */}
            <div className="lg:col-span-4 sticky top-24">
              <DispatchSummaryCard
                profile={selectedProfile}
                isArabic={isArabic}
                serviceType="followers"
                onOpenRechargeModal={handleOpenRechargeModal}
              />
            </div>
          </div>
        )}

        {currentTab === 'admin' && (
          <AdminConsole
            isArabic={isArabic}
            systemLogs={systemLogs}
            onAddLog={addSystemLog}
            onBatchInject={handleBatchInject}
            profile={selectedProfile}
            onUpdateProfile={setSelectedProfile}
            onOpenRechargeModal={handleOpenRechargeModal}
          />
        )}

        {currentTab === 'campaigns' && (
          <CampaignsList
            campaigns={campaigns}
            onOpenLiveModal={handleOpenLiveModal}
            onRestartCampaign={handleStartCampaign}
            isArabic={isArabic}
            onNavigateToBooster={(service) => setCurrentTab(service)}
          />
        )}

        {currentTab === 'tools' && (
          <GrowthTools 
            isArabic={isArabic} 
            profileFollowers={selectedProfile.followers}
            onNavigateToBooster={() => setCurrentTab('followers')}
          />
        )}

        {currentTab === 'safety' && (
          <SafetyGuide isArabic={isArabic} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-6 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">InstaGrow Pro</span>
            <span>·</span>
            <span>{isArabic ? 'منصة تنمية وتزويد إنستغرام الذكية' : 'Smart Instagram Growth Platform'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="hover:text-slate-300 transition flex items-center gap-1.5"
            >
              <Palette className="h-3.5 w-3.5 text-amber-400" />
              <span>{isArabic ? 'تغيير ألوان المظهر' : 'Change Theme'}</span>
            </button>
            <span>·</span>
            <span>{isArabic ? 'جميع الحقوق محفوظة © 2026 · لا نتبع لشركة Meta أو Instagram بشكل رسمي' : 'All rights reserved © 2026 · Independent Social SMM Tool'}</span>
          </div>
        </div>
      </footer>

      {/* Live Simulation Modal */}
      {activeLiveCampaign && (
        <LiveDeliveryModal
          campaign={activeLiveCampaign}
          isOpen={isLiveModalOpen}
          onClose={() => setIsLiveModalOpen(false)}
          onUpdateCampaign={handleUpdateCampaign}
          profile={selectedProfile}
          post={selectedPost}
          isArabic={isArabic}
        />
      )}

      {/* Daily Free Credits Modal */}
      <FreeCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        onClaimFreeBoost={handleClaimFreeBoost}
        currentProfile={selectedProfile}
        isArabic={isArabic}
      />

      {/* Theme Customizer Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        isArabic={isArabic}
      />

      {/* Dual Provider In-App Recharge Modal */}
      <ProviderRechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        isArabic={isArabic}
        initialProviderId={rechargeModalProvider}
        onBalanceUpdated={refreshWalletBalances}
      />

      {/* PWA Phone Icon Installation Guide Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isArabic={isArabic}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
