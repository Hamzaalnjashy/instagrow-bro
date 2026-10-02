import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Heart, 
  Eye, 
  MessageCircle, 
  CircleDot, 
  Bookmark, 
  Music2, 
  PlaySquare, 
  Send, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ExternalLink, 
  Layers, 
  Check, 
  Flame, 
  TrendingUp, 
  Filter, 
  Sliders, 
  Info,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  ServiceType, 
  SmmServiceOffer, 
  BoostCampaign, 
  QualityTier, 
  DeliverySpeed, 
  InstagramProfile 
} from '../types';
import { 
  ALL_SMM_OFFERS, 
  SERVICE_CATEGORIES, 
  getOffersByCategory 
} from '../data/smmOffers';
import { formatNumber } from '../utils/formatters';

interface MultiServiceBoosterProps {
  onStartCampaign: (
    campaign: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>
  ) => void;
  isArabic: boolean;
  selectedProfile?: InstagramProfile;
}

export const MultiServiceBooster: React.FC<MultiServiceBoosterProps> = ({
  onStartCampaign,
  isArabic,
  selectedProfile,
}) => {
  // Active category & provider filter
  const [activeCategory, setActiveCategory] = useState<ServiceType>('views');
  const [providerFilter, setProviderFilter] = useState<'all' | 'peakerr' | 'jap'>('all');

  // Filtered offers for the current category
  const categoryOffers = useMemo(() => {
    const list = getOffersByCategory(activeCategory);
    if (providerFilter === 'all') return list;
    return list.filter(o => o.providerId === providerFilter);
  }, [activeCategory, providerFilter]);

  // Selected offer
  const [selectedOffer, setSelectedOffer] = useState<SmmServiceOffer>(() => {
    const defaultList = getOffersByCategory('views');
    return defaultList[0] || ALL_SMM_OFFERS[0];
  });

  // When active category changes, default to the first offer of that category
  const handleCategoryChange = (cat: ServiceType) => {
    setActiveCategory(cat);
    const newOffers = getOffersByCategory(cat);
    const filtered = providerFilter === 'all' 
      ? newOffers 
      : newOffers.filter(o => o.providerId === providerFilter);
    if (filtered.length > 0) {
      setSelectedOffer(filtered[0]);
    } else if (newOffers.length > 0) {
      setSelectedOffer(newOffers[0]);
    }
  };

  // Quantity state
  const [quantity, setQuantity] = useState<number>(1000);

  // Target input
  const defaultTarget = useMemo(() => {
    if (activeCategory === 'followers' || activeCategory === 'story') {
      return selectedProfile ? `@${selectedProfile.username.replace(/^@/, '')}` : '@hamza_creator';
    } else if (activeCategory === 'tiktok') {
      return 'https://www.tiktok.com/@creator/video/7391823490';
    } else if (activeCategory === 'youtube') {
      return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    } else if (activeCategory === 'telegram') {
      return 'https://t.me/arab_creators_hub';
    } else {
      return 'https://www.instagram.com/p/DB94kL1sX9/';
    }
  }, [activeCategory, selectedProfile]);

  const [targetInput, setTargetInput] = useState<string>(defaultTarget);

  // When category changes, update default target suggestion if field was unedited
  React.useEffect(() => {
    setTargetInput(defaultTarget);
  }, [defaultTarget]);

  // Custom comments text
  const [customComments, setCustomComments] = useState<string>(
    'محتوى رائع واستثنائي جداً! 🔥\nأبدعت كالعادة، استمر بالتميز 👏\nأفضل حساب في مجاله بدون منازع ⭐\nما شاء الله عمل متقن وجميل جداً ❤️\nمنتظرين البوست الجاي بشغف! 🚀'
  );

  // Auto sync comments count if activeCategory is comments and custom service is selected
  const isCustomCommentsService = activeCategory === 'comments' && selectedOffer.serviceId === '30437';
  const customCommentsLines = useMemo(() => {
    return customComments.split('\n').filter(line => line.trim().length > 0);
  }, [customComments]);

  // Calculated cost
  const calculatedCost = useMemo(() => {
    const qty = isCustomCommentsService ? customCommentsLines.length : quantity;
    return ((qty / 1000) * selectedOffer.ratePer1k).toFixed(4);
  }, [quantity, selectedOffer, isCustomCommentsService, customCommentsLines.length]);

  // Quantity presets
  const presets = useMemo(() => {
    if (activeCategory === 'comments') {
      return [10, 25, 50, 100, 250, 500];
    }
    if (activeCategory === 'views' || activeCategory === 'saves' || activeCategory === 'tiktok') {
      return [1000, 5000, 10000, 25000, 50000, 100000];
    }
    return [500, 1000, 2500, 5000, 10000, 25000];
  }, [activeCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalQty = isCustomCommentsService ? customCommentsLines.length : quantity;

    onStartCampaign({
      serviceType: activeCategory,
      targetUsername: targetInput.startsWith('@') ? targetInput.replace(/^@/, '') : (selectedProfile?.username || 'user'),
      targetPostUrl: targetInput.startsWith('http') ? targetInput : undefined,
      quantityRequested: finalQty,
      qualityTier: 'arab_gulf',
      deliverySpeed: 'instant',
      estimatedCompletionTime: '3-10 دقائق',
      serviceId: selectedOffer.serviceId,
      providerId: selectedOffer.providerId,
      providerName: selectedOffer.providerName,
      estimatedCost: parseFloat(calculatedCost),
      customCommentsText: isCustomCommentsService ? customComments : undefined,
      targetPlatform: selectedOffer.platform || 'instagram',
    });
  };

  // Helper icons
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'followers': return <Users className="h-4 w-4" />;
      case 'likes': return <Heart className="h-4 w-4" />;
      case 'views': return <Eye className="h-4 w-4" />;
      case 'comments': return <MessageCircle className="h-4 w-4" />;
      case 'story': return <CircleDot className="h-4 w-4" />;
      case 'saves': return <Bookmark className="h-4 w-4" />;
      case 'tiktok': return <Music2 className="h-4 w-4" />;
      case 'youtube': return <PlaySquare className="h-4 w-4" />;
      case 'telegram': return <Send className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header Banner */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span>{isArabic ? 'كتالوج الخدمات الشامل لسيرفرات Peakerr و JAP' : 'Full Multi-Provider Service Hub'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {isArabic ? 'بقية الخدمات والمنصات المعتمدة' : 'Extended SMM Services & Platforms'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              {isArabic 
                ? 'استكشف كافة الخدمات المتوفرة من كلا الموقعين: مشاهدات ريلز وفيديو بأسعار تبدأ من 0.001$، تعليقات، ستوري، وحفظ، بالإضافة لخدمات تيك توك ويوتيوب وتليجرام.'
                : 'Access all services from Peakerr & JAP: Reels views, custom comments, story views, saves, and multi-platform expansion.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">{isArabic ? 'مزود Peakerr نشط ومربوط بالـ API' : 'Peakerr API Key Connected'}</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-6 flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id as ServiceType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg shadow-pink-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/5'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{isArabic ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Order Engine */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Provider Filter & Offers Catalog */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
                1
              </span>
              <span className="font-bold text-white text-sm">
                {isArabic ? 'اختر باقة السيرفر المعتمدة' : 'Select Provider Offer'}
              </span>
              <span className="text-xs text-slate-400">
                ({categoryOffers.length} {isArabic ? 'باقات متاحة' : 'offers'})
              </span>
            </div>

            {/* Provider Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setProviderFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  providerFilter === 'all'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isArabic ? 'الكل' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('peakerr')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  providerFilter === 'peakerr'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Peakerr API v2</span>
              </button>
              <button
                type="button"
                onClick={() => setProviderFilter('jap')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  providerFilter === 'jap'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>JustAnotherPanel</span>
              </button>
            </div>
          </div>

          {/* Offers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {categoryOffers.map((offer) => {
              const isSelected = selectedOffer.serviceId === offer.serviceId;
              const isPeakerr = offer.providerId === 'peakerr';

              return (
                <div
                  key={offer.serviceId + offer.providerId}
                  onClick={() => setSelectedOffer(offer)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all text-start relative ${
                    isSelected
                      ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10'
                      : 'border-white/5 bg-slate-950/60 hover:border-white/20 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                        isPeakerr 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {isPeakerr ? '⚡ Peakerr' : '🌐 JAP'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        #{offer.serviceId}
                      </span>
                    </div>

                    <div className="text-end">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        ${offer.ratePer1k.toFixed(offer.ratePer1k < 0.01 ? 4 : 2)}
                      </span>
                      <span className="text-[10px] text-slate-400 ms-1">/ 1K</span>
                    </div>
                  </div>

                  <h3 className="mt-2 text-xs font-bold text-white line-clamp-2">
                    {isArabic ? offer.nameAr : offer.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                    {offer.descriptionAr}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    <span className="text-pink-300 font-semibold">{offer.speedAr}</span>
                    <span>•</span>
                    <span className="text-emerald-300">{offer.refillAr}</span>
                    {offer.badgeAr && (
                      <span className="ms-auto font-bold text-amber-300">
                        {offer.badgeAr}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white shadow-md">
                        <Check className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Target Link or Username Input */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
              2
            </span>
            <span className="font-bold text-white text-sm">
              {activeCategory === 'followers' || activeCategory === 'story'
                ? (isArabic ? 'اسم المستخدم المستهدف' : 'Target Username')
                : (isArabic ? 'رابط المنشور أو الفيديو أو القناة' : 'Target URL / Link')}
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              required
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder={
                activeCategory === 'followers' || activeCategory === 'story'
                  ? '@username أو رابط البروفايل'
                  : 'https://instagram.com/p/... أو رابط الفيديو'
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono"
              dir="ltr"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {isArabic 
              ? 'لا يُطلب كلمة مرور إطلاقاً. تأكد أن الحساب أو المنشور عام (Public) لكي تصل الخدمة فوراً.' 
              : 'Zero password required. Ensure the profile or post is public for instant execution.'}
          </p>
        </div>

        {/* Step 3: Custom Comments Editor (if custom comments selected) */}
        {isCustomCommentsService && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  ✍️
                </span>
                <span className="font-bold text-white text-sm">
                  {isArabic ? 'اكتب نصوص التعليقات المخصصة (تعليق في كل سطر)' : 'Custom Comments (One per line)'}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-300">
                {customCommentsLines.length} {isArabic ? 'تعليق مكتوب' : 'comments'}
              </span>
            </div>

            <textarea
              rows={5}
              value={customComments}
              onChange={(e) => setCustomComments(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed font-sans"
              placeholder={isArabic ? 'اكتب كل تعليق في سطر منفصل...' : 'Type each comment on a separate line...'}
            />
            <p className="text-[11px] text-amber-300/80">
              {isArabic 
                ? 'سيتم نشر كل سطر كتعليق منفصل من حساب حقيقي مختلف.' 
                : 'Each line will be posted as an independent comment from real accounts.'}
            </p>
          </div>
        )}

        {/* Step 4: Quantity Selection (if not custom comments) */}
        {!isCustomCommentsService && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
                  3
                </span>
                <span className="font-bold text-white text-sm">
                  {isArabic ? 'حدد الكمية المطلوبة' : 'Select Quantity'}
                </span>
              </div>

              <div className="text-end">
                <span className="text-lg font-extrabold text-pink-400 font-mono">
                  {formatNumber(quantity)}
                </span>
                <span className="text-xs text-slate-400 ms-1">
                  {isArabic ? 'طلب' : 'units'}
                </span>
              </div>
            </div>

            {/* Presets Chips */}
            <div className="flex flex-wrap gap-2">
              {presets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setQuantity(amount)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    quantity === amount
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  +{formatNumber(amount)}
                </button>
              ))}
            </div>

            {/* Range Slider */}
            <div className="space-y-1 pt-2">
              <input
                type="range"
                min={Math.max(selectedOffer.min, 10)}
                max={Math.min(selectedOffer.max, 50000)}
                step={selectedOffer.min > 50 ? 50 : 10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{formatNumber(selectedOffer.min)}</span>
                <span>{formatNumber(Math.min(selectedOffer.max, 50000))}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Summary & Dispatch Button */}
        <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-b from-slate-900 via-pink-950/20 to-slate-900 p-5 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <span className="text-xs text-slate-400">{isArabic ? 'سيرفر التنفيذ المعتمد:' : 'Execution Server:'}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-bold text-white text-sm">{selectedOffer.providerName}</span>
                <span className="text-xs font-mono text-slate-400">(#{selectedOffer.serviceId})</span>
              </div>
            </div>

            <div className="text-start sm:text-end">
              <span className="text-xs text-slate-400">{isArabic ? 'التكلفة الإجمالية التقديرية:' : 'Estimated Cost:'}</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                ${calculatedCost}
                <span className="text-xs text-slate-400 ms-1 font-normal">USD</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>{selectedOffer.speedAr}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{selectedOffer.refillAr}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Flame className="h-5 w-5 text-white animate-bounce" />
            <span>
              {isArabic 
                ? `إطلاق وتأكيد طلب التزويد (${formatNumber(isCustomCommentsService ? customCommentsLines.length : quantity)}) عبر ${selectedOffer.providerName}` 
                : `Dispatch Boost Order (${formatNumber(isCustomCommentsService ? customCommentsLines.length : quantity)}) via ${selectedOffer.providerName}`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
