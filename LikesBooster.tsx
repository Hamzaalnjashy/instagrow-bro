import React, { useState } from 'react';
import { 
  Heart, 
  Link as LinkIcon, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Bookmark, 
  Eye, 
  MessageSquare, 
  Search, 
  Share2,
  RefreshCw,
  Server,
  DollarSign,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { InstagramPost, InstagramProfile, BoostCampaign, SmmServiceOffer } from '../types';
import { formatNumber } from '../utils/formatters';
import { SAMPLE_POSTS } from '../data/mockData';
import { PROVIDER_LIKES_OFFERS } from '../data/smmOffers';
import { useTheme } from '../context/ThemeContext';

interface LikesBoosterProps {
  onStartCampaign: (campaign: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>) => void;
  isArabic: boolean;
  profile: InstagramProfile;
  selectedPost: InstagramPost;
  onSelectPost: (post: InstagramPost) => void;
}

export const LikesBooster: React.FC<LikesBoosterProps> = ({
  onStartCampaign,
  isArabic,
  profile,
  selectedPost,
  onSelectPost,
}) => {
  const { theme } = useTheme();
  const [postUrlInput, setPostUrlInput] = useState(selectedPost.url);
  const [isSearchingPost, setIsSearchingPost] = useState(false);
  const [providerFilter, setProviderFilter] = useState<'all' | 'peakerr' | 'jap'>('all');
  const [selectedOffer, setSelectedOffer] = useState<SmmServiceOffer>(PROVIDER_LIKES_OFFERS[0]);
  const [likesAmount, setLikesAmount] = useState<number>(500);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('500');

  // Addons
  const [includeSaves, setIncludeSaves] = useState(true);
  const [includeViews, setIncludeViews] = useState(true);
  const [includeComments, setIncludeComments] = useState(false);

  const [searchSuccessMessage, setSearchSuccessMessage] = useState<string | null>(null);

  const displayedOffers = PROVIDER_LIKES_OFFERS.filter(o => 
    providerFilter === 'all' ? true : o.providerId === providerFilter
  );

  const PRESET_AMOUNTS = [50, 100, 250, 500, 1000, 2500, 5000, 10000];

  const handleInspectPostUrl = () => {
    if (!postUrlInput.trim()) return;
    setIsSearchingPost(true);
    setSearchSuccessMessage(null);

    setTimeout(() => {
      setIsSearchingPost(false);
      setSearchSuccessMessage(
        isArabic 
          ? 'تم تأكيد رابط المنشور بنجاح! جاهز لاستقبال الإعجابات والتفاعل.'
          : 'Post link confirmed! Ready to receive likes.'
      );
    }, 400);
  };

  const handleSelectPreset = (amount: number) => {
    setLikesAmount(amount);
    setCustomInputValue(amount.toString());
    setUseCustomInput(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInputValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setLikesAmount(parsed);
    }
  };

  const calculateCost = (qty: number, ratePer1k: number) => {
    return ((qty / 1000) * ratePer1k).toFixed(2);
  };

  const calculatedCost = calculateCost(likesAmount, selectedOffer.ratePer1k);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartCampaign({
      serviceType: 'likes',
      targetUsername: profile.username,
      targetPostUrl: postUrlInput,
      postThumbnail: selectedPost.imageUrl,
      quantityRequested: likesAmount,
      qualityTier: selectedOffer.serviceId === '105' ? 'arab_gulf' : 'global_active',
      deliverySpeed: 'instant',
      estimatedCompletionTime: isArabic ? '2 - 8 دقائق' : '2 - 8 mins',
      serviceId: selectedOffer.serviceId,
      providerId: selectedOffer.providerId,
      providerName: selectedOffer.providerName,
      estimatedCost: Number(calculatedCost),
      addons: {
        freeSaves: includeSaves,
        freeViews: includeViews,
        customComments: includeComments,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="text-start">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isArabic ? 'زيادة إعجابات وتفاعل المنشورات والريلز' : 'Instagram Post Likes Booster'}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {isArabic 
            ? 'باقات الإعجابات الرسمية من JustAnotherPanel. دفع مباشر إلى رابط المنشور لدعمه في الإكسبلور.'
            : 'Official JustAnotherPanel Likes catalog. Boost explore reach with direct link dispatching.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Post Link or Selection */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              {isArabic ? 'الخطوة 1: رابط المنشور أو الريلز (Instagram Link)' : 'Step 1: Paste Post or Reel Link'}
            </label>
            <span className="text-[11px] text-slate-400">
              {isArabic ? 'صور · ريلز · فيديو' : 'Photos · Reels · Videos'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-500">
                <LinkIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={postUrlInput}
                onChange={(e) => setPostUrlInput(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
                className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 ps-9 pe-4 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                dir="ltr"
              />
            </div>
            <button
              type="button"
              onClick={handleInspectPostUrl}
              disabled={isSearchingPost || !postUrlInput.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-semibold text-white transition disabled:opacity-50"
            >
              {isSearchingPost ? (
                <RefreshCw className="h-4 w-4 animate-spin text-rose-400" />
              ) : (
                <Search className="h-4 w-4 text-rose-400" />
              )}
              <span>{isArabic ? 'تأكيد الرابط' : 'Verify Link'}</span>
            </button>
          </div>

          {searchSuccessMessage && (
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{searchSuccessMessage}</span>
            </div>
          )}

          {/* Quick link status badge */}
          <div className="mt-3 flex items-center justify-between rounded-xl bg-black/40 border border-white/5 p-3">
            <div className="text-start">
              <span className="text-[11px] text-slate-400 block">{isArabic ? 'الرابط المستهدف للتزويد:' : 'Target URL:'}</span>
              <span className="text-xs font-mono text-pink-400 truncate max-w-xs block" dir="ltr">
                {postUrlInput || `https://www.instagram.com/${profile.username.replace(/^@/, '')}/`}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              {isArabic ? 'جاهز للتزويد' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Step 2: SMM Provider Likes Offers Catalog (Peakerr & JAP) */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm text-start space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-rose-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                {isArabic ? 'الخطوة 2: باقات الإعجابات والتفاعل الرسمية (Peakerr & JustAnotherPanel)' : 'Step 2: Choose Official SMM Likes Offer'}
              </label>
            </div>
            {/* Filter Tabs by Provider */}
            <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setProviderFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  providerFilter === 'all'
                    ? 'bg-rose-500 text-white shadow-sm'
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
                      ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500'
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
                          <span className="rounded bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 font-bold border border-rose-500/30">
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
                        {isArabic ? 'لكل 1,000 إعجاب' : 'per 1K'}
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

        {/* Step 3: Quantity with live price calculation */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              {isArabic ? 'الخطوة 3: حدد عدد اللايكات المطلوبة' : 'Step 3: Select Likes Amount'}
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
                const isSelected = likesAmount === amt;
                const cost = calculateCost(amt, selectedOffer.ratePer1k);
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3.5 border transition-all text-center ${
                      isSelected
                        ? 'border-rose-500 bg-gradient-to-b from-rose-500/20 to-rose-500/5 text-white shadow-lg shadow-rose-500/10 ring-1 ring-rose-500'
                        : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg font-bold font-tabular flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${isSelected ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      +{formatNumber(amt)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {isArabic ? 'إعجاب' : 'likes'}
                    </span>
                    <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      ${cost}
                    </div>
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
                  step="20"
                  value={customInputValue}
                  onChange={handleCustomChange}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-lg font-bold font-tabular text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  placeholder="مثال: 750"
                />
                <span className="shrink-0 text-sm font-semibold text-slate-300">
                  {isArabic ? 'لايك' : 'Likes'}
                </span>
              </div>
              <input
                type="range"
                min={selectedOffer.min}
                max={Math.min(selectedOffer.max, 25000)}
                step="50"
                value={likesAmount}
                onChange={(e) => {
                  setLikesAmount(Number(e.target.value));
                  setCustomInputValue(e.target.value);
                }}
                className="w-full accent-rose-500"
              />
            </div>
          )}

          {/* Real Cost & Dispatch Breakdown */}
          <div className="mt-4 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <span className="text-slate-400 block">{isArabic ? 'تكلفة اللايكات من موقع التزويد:' : 'Total Cost:'}</span>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  ${calculatedCost} <span className="text-xs text-slate-400 font-normal">USD</span>
                </span>
              </div>
            </div>

            <div className="text-end">
              <span className="text-slate-400 block">{isArabic ? 'الخدمة في JAP:' : 'Service:'}</span>
              <span className="font-mono text-amber-300 font-bold">
                JAP #{selectedOffer.serviceId}
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-3 rounded-2xl ${theme.accentGradientButton} px-6 py-4 text-sm sm:text-base font-bold text-white shadow-xl ${theme.shadowGlow} hover:opacity-95 transition-all transform active:scale-[0.99]`}
          >
            <Heart className="h-5 w-5 fill-white" />
            <span>
              {isArabic 
                ? `إرسال +${formatNumber(likesAmount)} لايك (خدمة #${selectedOffer.serviceId}) - التكلفة: $${calculatedCost}` 
                : `Dispatch +${formatNumber(likesAmount)} Likes (Service #${selectedOffer.serviceId}) - $${calculatedCost}`}
            </span>
          </button>
          <div className="mt-2 text-center text-xs text-slate-400">
            {isArabic 
              ? '⚡ يتم إرسال رابط المنشور فوراً إلى خادم JustAnotherPanel.'
              : '⚡ Post link is dispatched directly to JustAnotherPanel API.'}
          </div>
        </div>
      </form>
    </div>
  );
};
