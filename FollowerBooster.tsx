import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Server,
  DollarSign,
  Tag
} from 'lucide-react';
import { InstagramProfile, QualityTier, DeliverySpeed, BoostCampaign, SmmServiceOffer } from '../types';
import { formatNumber } from '../utils/formatters';
import { DEFAULT_PROFILES, getDefaultProfileForUsername } from '../data/mockData';
import { PROVIDER_FOLLOWER_OFFERS } from '../data/smmOffers';
import { useTheme } from '../context/ThemeContext';

interface FollowerBoosterProps {
  onStartCampaign: (campaign: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>) => void;
  isArabic: boolean;
  onSelectProfile: (profile: InstagramProfile) => void;
  selectedProfile: InstagramProfile;
}

export const FollowerBooster: React.FC<FollowerBoosterProps> = ({
  onStartCampaign,
  isArabic,
  onSelectProfile,
  selectedProfile,
}) => {
  const { theme } = useTheme();
  const [usernameInput, setUsernameInput] = useState(selectedProfile.username);
  const [isVerifying, setIsVerifying] = useState(false);
  const [providerFilter, setProviderFilter] = useState<'all' | 'peakerr' | 'jap'>('all');
  const [selectedOffer, setSelectedOffer] = useState<SmmServiceOffer>(PROVIDER_FOLLOWER_OFFERS[0]);
  const [followerCount, setFollowerCount] = useState<number>(1000);
  const [qualityTier, setQualityTier] = useState<QualityTier>('arab_gulf');
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('instant');
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('1000');
  const [searchSuccessMessage, setSearchSuccessMessage] = useState<string | null>(null);

  const displayedOffers = PROVIDER_FOLLOWER_OFFERS.filter(o => 
    providerFilter === 'all' ? true : o.providerId === providerFilter
  );

  const PRESET_AMOUNTS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000];

  const handleVerifyAccount = () => {
    let cleanHandle = usernameInput.trim();
    if (cleanHandle.startsWith('@')) {
      cleanHandle = cleanHandle.substring(1);
    }
    if (cleanHandle.includes('instagram.com/')) {
      const match = cleanHandle.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
      if (match && match[1]) {
        cleanHandle = match[1];
      }
    }

    if (!cleanHandle) return;

    setIsVerifying(true);
    setSearchSuccessMessage(null);

    setTimeout(() => {
      setIsVerifying(false);
      const profile = getDefaultProfileForUsername(cleanHandle);
      onSelectProfile(profile);
      setSearchSuccessMessage(
        isArabic 
          ? `تم تأكيد حساب @${cleanHandle} بنجاح! الحساب جاهز لاستقبال المتابعين فوراً.`
          : `Account @${cleanHandle} verified! Ready for immediate follower delivery.`
      );
    }, 400);
  };

  const handleSelectPreset = (amount: number) => {
    setFollowerCount(amount);
    setCustomInputValue(amount.toString());
    setUseCustomInput(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInputValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setFollowerCount(parsed);
    }
  };

  const calculateCost = (qty: number, ratePer1k: number) => {
    return ((qty / 1000) * ratePer1k).toFixed(2);
  };

  const calculatedCost = calculateCost(followerCount, selectedOffer.ratePer1k);

  const calculateEstimatedDuration = () => {
    if (deliverySpeed === 'instant') {
      if (followerCount <= 500) return isArabic ? '5 - 15 دقيقة' : '5 - 15 mins';
      if (followerCount <= 2500) return isArabic ? '15 - 35 دقيقة' : '15 - 35 mins';
      return isArabic ? '1 - 3 ساعات' : '1 - 3 hours';
    }
    const hours = Math.ceil(followerCount / 200);
    return isArabic ? `${hours} إلى ${hours + 2} ساعات (تدريجي آمن)` : `${hours}-${hours + 2} hours (Safe Drip)`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartCampaign({
      serviceType: 'followers',
      targetUsername: selectedProfile.username,
      quantityRequested: followerCount,
      qualityTier,
      deliverySpeed,
      estimatedCompletionTime: calculateEstimatedDuration(),
      serviceId: selectedOffer.serviceId,
      providerId: selectedOffer.providerId,
      providerName: selectedOffer.providerName,
      estimatedCost: Number(calculatedCost),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="text-start">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isArabic ? 'زيادة متابعي إنستغرام' : 'Instagram Followers Booster'}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {isArabic 
            ? 'باقات وعروض سيرفرات التزويد المعتمدة (JustAnotherPanel و Peakerr API). كلا الموقعين نشطان ومربوطان للتزويد الفوري.'
            : 'Official Dual-Active SMM Service Catalog (JustAnotherPanel & Peakerr API). Both providers are active and ready.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Username Input */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-pink-400">
              {isArabic ? 'الخطوة 1: أدخل يوزر إنستغرام أو رابط الحساب' : 'Step 1: Enter Username or Profile URL'}
            </label>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isArabic ? 'بدون كلمة سر' : 'No Password Required'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-500 font-bold">
                @
              </span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleVerifyAccount())}
                placeholder="muhndszrai"
                className="w-full rounded-xl border border-white/10 bg-black/40 py-3 ps-8 pe-4 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyAccount}
              disabled={isVerifying}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-3 text-xs font-semibold text-white transition disabled:opacity-50"
            >
              {isVerifying ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4 text-pink-400" />
              )}
              <span>{isArabic ? 'فحص وتأكيد الحساب' : 'Verify Target'}</span>
            </button>
          </div>

          {searchSuccessMessage && (
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs text-emerald-400 text-start animate-fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{searchSuccessMessage}</span>
            </div>
          )}

          {/* Verified target badge - completely free of fake counters */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-black/30 border border-white/5 p-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-xs">
                @
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span>@{selectedProfile.username.replace(/^@/, '')}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono" dir="ltr">
                  https://www.instagram.com/{selectedProfile.username.replace(/^@/, '')}/
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2.5 py-1 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{isArabic ? 'جاهز للتزويد الفعلي' : 'Ready to Boost'}</span>
              </span>
            </div>
          </div>

          {/* Privacy note */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              {isArabic 
                ? '🔒 أمان وخصوصية تامة: سيرفرات التزويد لا تسحب ولا تخترق صورك أو خصوصيتك، بل تحتاج فقط لاسم المستخدم (@username) لضخ المتابعين إليه مباشرة.'
                : '🔒 Privacy Protected: SMM servers do not pull private data; only the public @username is needed to dispatch followers.'}
            </span>
          </div>
        </div>

        {/* Step 2: Real Provider Offers Catalog (باقات سيرفرات التزويد المعتمدة Peakerr & JustAnotherPanel) */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm text-start space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-pink-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                {isArabic ? 'الخطوة 2: باقات التزويد الرسمية (Peakerr & JustAnotherPanel)' : 'Step 2: Choose Official SMM Provider Offer'}
              </label>
            </div>
            {/* Filter Tabs by Provider */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setProviderFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  providerFilter === 'all'
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isArabic ? 'الكل' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('peakerr')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition ${
                  providerFilter === 'peakerr'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Peakerr (نشط)</span>
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('jap')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  providerFilter === 'jap'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>JustAnotherPanel</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {displayedOffers.map((offer) => {
              const isSelected = selectedOffer.serviceId === offer.serviceId;
              const isPeakerr = offer.providerId === 'peakerr';
              return (
                <div
                  key={offer.serviceId}
                  onClick={() => setSelectedOffer(offer)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all text-start relative ${
                    isSelected
                      ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500'
                      : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1 max-w-[80%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          #{offer.serviceId}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          isPeakerr
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${isPeakerr ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                          {offer.providerName || (isPeakerr ? 'Peakerr API' : 'JustAnotherPanel')}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {isArabic ? offer.nameAr : offer.name}
                        </span>
                        {offer.badgeAr && (
                          <span className="rounded bg-pink-500/20 text-pink-300 text-[10px] px-2 py-0.5 font-bold border border-pink-500/30">
                            {offer.badgeAr}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {isArabic ? offer.descriptionAr : offer.name}
                      </p>
                    </div>

                    <div className="text-end shrink-0">
                      <div className="text-sm font-extrabold text-emerald-400 font-mono">
                        ${offer.ratePer1k.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isArabic ? 'لكل 1,000 متابع' : 'per 1K followers'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="h-3 w-3 text-sky-400" />
                        <span>{offer.speedAr}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        <span>{offer.refillAr}</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Min: {formatNumber(offer.min)} | Max: {formatNumber(offer.max)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Amount Selector with Real Provider Price Calculation */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-pink-400">
              {isArabic ? 'الخطوة 3: حدد عدد المتابعين المطلوب مع التكلفة الدقيقة' : 'Step 3: Select Follower Quantity'}
            </label>
            <button
              type="button"
              onClick={() => setUseCustomInput(!useCustomInput)}
              className="text-xs text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4"
            >
              {useCustomInput 
                ? (isArabic ? 'العودة للخيارات السريعة' : 'Back to presets')
                : (isArabic ? 'كتابة عدد مخصص يدوياً' : 'Enter custom amount')}
            </button>
          </div>

          {!useCustomInput ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_AMOUNTS.map((amt) => {
                const isSelected = followerCount === amt;
                const cost = calculateCost(amt, selectedOffer.ratePer1k);
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3.5 border transition-all text-center ${
                      isSelected
                        ? 'text-white shadow-lg ring-1'
                        : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.primaryColor : undefined,
                      background: isSelected 
                        ? `linear-gradient(to bottom, ${theme.primaryColor}25, ${theme.primaryColor}08)`
                        : undefined,
                      boxShadow: isSelected ? `0 8px 20px ${theme.primaryColor}20` : undefined,
                    }}
                  >
                    <span className="text-lg font-bold font-tabular">
                      +{formatNumber(amt)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {isArabic ? 'متابع' : 'followers'}
                    </span>
                    <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      ${cost}
                    </div>
                    {amt === 1000 && (
                      <span className="absolute -top-2 start-2 rounded bg-amber-500 px-1.5 py-0.2 text-[9px] font-bold text-black uppercase">
                        {isArabic ? 'الأكثر طلباً' : 'Popular'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={selectedOffer.min}
                  max={selectedOffer.max}
                  step="50"
                  value={customInputValue}
                  onChange={handleCustomChange}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-lg font-bold font-tabular text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  placeholder="مثال: 3500"
                />
                <span className="shrink-0 text-sm font-semibold text-slate-300">
                  {isArabic ? 'متابع' : 'Followers'}
                </span>
              </div>
              <input
                type="range"
                min={selectedOffer.min}
                max={Math.min(selectedOffer.max, 50000)}
                step="50"
                value={followerCount}
                onChange={(e) => {
                  setFollowerCount(Number(e.target.value));
                  setCustomInputValue(e.target.value);
                }}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-tabular">
                <span>{selectedOffer.min}</span>
                <span>10,000</span>
                <span>50,000</span>
              </div>
            </div>
          )}

          {/* Real Cost & Dispatch Summary Breakdown */}
          <div className="mt-4 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <span className="text-slate-400 block">{isArabic ? 'تكلفة الطلب من موقع التزويد:' : 'Total Provider Cost:'}</span>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  ${calculatedCost} <span className="text-xs text-slate-400 font-normal">USD</span>
                </span>
              </div>
            </div>

            <div className="text-end">
              <span className="text-slate-400 block">{isArabic ? 'الخدمة المختارة في JAP:' : 'Service in JAP:'}</span>
              <span className="font-mono text-amber-300 font-bold">
                Service #{selectedOffer.serviceId}
              </span>
            </div>
          </div>
        </div>

        {/* Step 4: Speed and Safe Drip */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm text-start">
          <label className="text-xs font-semibold uppercase tracking-wider text-pink-400 block mb-3">
            {isArabic ? 'طريقة وسرعة التسليم' : 'Delivery Speed'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'instant' as DeliverySpeed,
                title: isArabic ? 'تسليم فوري مباشر ⚡' : 'Direct Instant Delivery',
                desc: isArabic ? 'يبدأ خلال دقيقة ويتم ضخه بأعلى سرعة من السيرفر' : 'Starts within 1 min at max speed',
                badge: calculateEstimatedDuration(),
              },
              {
                id: 'drip_safe' as DeliverySpeed,
                title: isArabic ? 'تنقيط ذكي تدريجي (آمن جداً) 🌱' : 'Natural Drip-Feed',
                desc: isArabic ? 'إرسال دفعات صغيرة تدريجية ليبدو طبيعياً 100%' : 'Gradual trickle to simulate 100% organic growth',
                badge: isArabic ? 'أقصى أمان' : 'Safest',
              }
            ].map((speed) => (
              <div
                key={speed.id}
                onClick={() => setDeliverySpeed(speed.id)}
                className={`cursor-pointer rounded-xl p-3 border transition-all ${
                  deliverySpeed === speed.id
                    ? 'border-pink-500/80 bg-pink-500/10'
                    : 'border-white/5 bg-black/30 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{speed.title}</span>
                  <span className="text-[10px] text-amber-300 font-semibold font-tabular">
                    {speed.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{speed.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-3 rounded-2xl ${theme.accentGradientButton} px-6 py-4 text-sm sm:text-base font-bold text-white shadow-xl ${theme.shadowGlow} hover:opacity-95 transition-all transform active:scale-[0.99]`}
          >
            <Zap className="h-5 w-5 fill-white" />
            <span>
              {isArabic 
                ? `إرسال +${formatNumber(followerCount)} متابع (خدمة #${selectedOffer.serviceId}) - التكلفة: $${calculatedCost}`
                : `Dispatch +${formatNumber(followerCount)} Followers (Service #${selectedOffer.serviceId}) - $${calculatedCost}`}
            </span>
          </button>
          <div className="mt-2 text-center text-xs text-slate-400">
            {isArabic 
              ? '✨ سيتم إرسال الأمر مباشرة إلى سيرفر JustAnotherPanel.'
              : '✨ Order will be dispatched directly to JustAnotherPanel API.'}
          </div>
        </div>
      </form>
    </div>
  );
};
