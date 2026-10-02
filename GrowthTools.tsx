import React, { useState } from 'react';
import { 
  Hash, 
  Copy, 
  Check, 
  Calculator, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Flame,
  Globe2
} from 'lucide-react';
import { HASHTAG_PRESETS } from '../data/mockData';
import { formatNumber } from '../utils/formatters';
import { NaturalGrowthSimulator } from './NaturalGrowthSimulator';

interface GrowthToolsProps {
  isArabic: boolean;
  profileFollowers?: number;
  onNavigateToBooster?: (amount?: number) => void;
}

export const GrowthTools: React.FC<GrowthToolsProps> = ({ 
  isArabic,
  profileFollowers,
  onNavigateToBooster,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Engagement calculator state
  const [calcFollowers, setCalcFollowers] = useState<number>(profileFollowers || 10000);
  const [calcLikes, setCalcLikes] = useState<number>(450);
  const [calcComments, setCalcComments] = useState<number>(35);

  const handleCopy = async (tags: string[], index: number) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tags.join(' '));
      }
    } catch {
      // Clipboard permission denied in iframe
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Engagement rate formula: ((Likes + Comments) / Followers) * 100
  const engagementRate = calcFollowers > 0 
    ? (((calcLikes + calcComments) / calcFollowers) * 100).toFixed(2)
    : '0.00';

  const rateNumber = parseFloat(engagementRate);
  let rateRating = isArabic ? 'متوسط' : 'Average';
  let rateColor = 'text-amber-400';
  if (rateNumber >= 4.0) {
    rateRating = isArabic ? 'استثنائي / فايرل 🔥' : 'Exceptional / Viral 🔥';
    rateColor = 'text-emerald-400';
  } else if (rateNumber >= 2.0) {
    rateRating = isArabic ? 'جيد جداً ✨' : 'Very Good ✨';
    rateColor = 'text-sky-400';
  } else {
    rateRating = isArabic ? 'يحتاج إلى تعزيز ولايكات إضافية' : 'Needs Boost';
    rateColor = 'text-rose-400';
  }

  return (
    <div className="space-y-8 text-start">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isArabic ? 'أدوات النمو الذكية والهاشتاقات' : 'Organic Growth & Creator Tools'}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {isArabic 
            ? 'أدوات استراتيجية لتخطيط نمو المتابعين، جدولة منحنيات الصعود الآمنة، وحساب معدل التفاعل التلقائي.'
            : 'Strategic tools to project natural follower trajectories, schedule safe algorithmic drip curves, and optimize engagement.'}
        </p>
      </div>

      {/* Flagship Feature: Natural Growth Simulator (محاكي النمو الطبيعي الذكي) */}
      <NaturalGrowthSimulator
        isArabic={isArabic}
        initialFollowers={profileFollowers || 3420}
        onApplyPlan={onNavigateToBooster}
      />

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool 1: Viral Hashtags Generator */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Hash className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isArabic ? 'حزم الهاشتاقات الفايرل المتصدرة' : 'Viral Explore Hashtag Bundles'}
              </h2>
              <span className="text-xs text-slate-400">
                {isArabic ? 'مخصصة للظهور في صفحة Explore بالخليج والوطن العربي' : 'Curated for maximum algorithmic reach in Arab region'}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {HASHTAG_PRESETS.map((preset, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-black/40 p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{preset.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-tabular">
                      {isArabic ? 'الوصول المتوقع:' : 'Est. Reach:'} <span className="text-amber-300 font-semibold">{preset.reach}</span>
                    </span>
                    <button
                      onClick={() => handleCopy(preset.tags, idx)}
                      className="flex items-center gap-1 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 px-2 py-1 text-[11px] font-semibold text-pink-300 transition"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">{isArabic ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{isArabic ? 'نسخ الكل' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs text-slate-300" dir="ltr">
                  {preset.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool 2: Engagement Rate Calculator */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isArabic ? 'حاسبة معدل التفاعل (Engagement Rate)' : 'Engagement Rate Calculator'}
              </h2>
              <span className="text-xs text-slate-400">
                {isArabic ? 'المقياس الأساسي الذي تحدد به العلامات التجارية قوة حسابك' : 'The #1 metric brands look for when sponsoring creators'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {isArabic ? 'عدد المتابعين:' : 'Total Followers:'}
              </label>
              <input
                type="number"
                value={calcFollowers}
                onChange={(e) => setCalcFollowers(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-sm font-bold font-tabular text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  {isArabic ? 'متوسط اللايكات لكل منشور:' : 'Avg. Likes per Post:'}
                </label>
                <input
                  type="number"
                  value={calcLikes}
                  onChange={(e) => setCalcLikes(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-sm font-bold font-tabular text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  {isArabic ? 'متوسط التعليقات:' : 'Avg. Comments per Post:'}
                </label>
                <input
                  type="number"
                  value={calcComments}
                  onChange={(e) => setCalcComments(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-sm font-bold font-tabular text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Calculated Result Display */}
            <div className="rounded-xl border border-white/10 bg-black/50 p-4 text-center mt-4">
              <span className="text-xs font-semibold text-slate-400 block">
                {isArabic ? 'معدل التفاعل الفعلي لحسابك' : 'Calculated Engagement Rate'}
              </span>
              <div className="text-4xl font-black font-tabular text-white mt-1">
                <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  {engagementRate}%
                </span>
              </div>
              <div className={`text-xs font-bold mt-1 ${rateColor}`}>
                {rateRating}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {isArabic 
                  ? '💡 نصيحة: إذا قمت بتزويد 1,000 متابع، يُوصى بتزويد 200 إلى 400 لايك لمنشوراتك للحفاظ على معدل تفاعل مثالي فوق 3%.' 
                  : '💡 Pro Tip: Whenever boosting 1,000 followers, match with 200-400 post likes to maintain a healthy 3%+ ratio.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Posting Times Section */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm text-start space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {isArabic ? 'أفضل أوقات النشر على إنستغرام لزيادة التفاعل تلقائياً' : 'Best Times to Post for Maximum Engagement'}
            </h2>
            <span className="text-xs text-slate-400">
              {isArabic ? 'بتوقيت مكة المكرمة ودول الخليج العربي (+3 GMT)' : 'Based on peak Arabian Gulf user activity (GMT+3)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="rounded-xl border border-white/5 bg-black/40 p-4 space-y-1">
            <span className="text-xs font-bold text-amber-300 block">
              {isArabic ? 'الفترة المسائية الذهبية (ذروة التفاعل)' : 'Peak Evening Hours'}
            </span>
            <div className="text-lg font-bold font-tabular text-white">08:00 PM – 11:30 PM</div>
            <p className="text-[11px] text-slate-400">
              {isArabic ? 'أعلى وقت لتواجد المتابعين ومشاهدة الريلز بعد الدوام والعمل.' : 'Highest active scroll volume on Reels & feed.'}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/40 p-4 space-y-1">
            <span className="text-xs font-bold text-pink-300 block">
              {isArabic ? 'فترة الظهيرة واستراحة العمل' : 'Afternoon Lunch Window'}
            </span>
            <div className="text-lg font-bold font-tabular text-white">01:00 PM – 03:30 PM</div>
            <p className="text-[11px] text-slate-400">
              {isArabic ? 'تفاعل سريع ممتاز لصور الستوري والمنشورات السريعة.' : 'Great for quick story interactions & single-image posts.'}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/40 p-4 space-y-1">
            <span className="text-xs font-bold text-sky-300 block">
              {isArabic ? 'عطلة نهاية الأسبوع (الجمعة والسبت)' : 'Weekend Viral Window'}
            </span>
            <div className="text-lg font-bold font-tabular text-white">04:00 PM – 12:00 AM</div>
            <p className="text-[11px] text-slate-400">
              {isArabic ? 'الوقت الأنسب لنشر الفيديوهات الطويلة ومحتوى السفر والمطاعم.' : 'Best for travel, lifestyle, and lifestyle reels.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
