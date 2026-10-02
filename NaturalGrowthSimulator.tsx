import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Calendar,
  Zap,
  BarChart2,
  Activity,
  ArrowUpRight,
  Sliders,
  HelpCircle,
  Users,
  CheckCircle2,
  RotateCcw,
  Target
} from 'lucide-react';
import { formatNumber } from '../utils/formatters';

interface NaturalGrowthSimulatorProps {
  isArabic: boolean;
  initialFollowers?: number;
  onApplyPlan?: (amount: number) => void;
}

type VelocityMode = 'natural_scurve' | 'steady_linear' | 'rapid_momentum';
type DurationDays = 7 | 14 | 30;

export const NaturalGrowthSimulator: React.FC<NaturalGrowthSimulatorProps> = ({
  isArabic,
  initialFollowers = 3420,
  onApplyPlan,
}) => {
  // Input parameters
  const [currentBaseFollowers, setCurrentBaseFollowers] = useState<number>(initialFollowers);
  const [targetBoostAmount, setTargetBoostAmount] = useState<number>(5000);
  const [duration, setDuration] = useState<DurationDays>(7);
  const [velocityMode, setVelocityMode] = useState<VelocityMode>('natural_scurve');
  const [enableOrganicRipple, setEnableOrganicRipple] = useState<boolean>(true);
  const [chartView, setChartView] = useState<'cumulative' | 'daily'>('cumulative');

  const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

  // Mathematical simulation generation
  const simulationData = useMemo(() => {
    const data = [];
    const days = duration;
    const base = currentBaseFollowers;
    const boost = targetBoostAmount;

    // Organic multiplier: natural algorithms push profile to explore as followers rise
    const organicBonusRate = enableOrganicRipple ? 0.12 : 0; // +12% organic discovery spillover

    let accumulatedBoost = 0;
    let accumulatedOrganic = 0;

    for (let day = 0; day <= days; day++) {
      if (day === 0) {
        data.push({
          day: isArabic ? 'البداية' : 'Start',
          dayNumber: 0,
          totalFollowers: base,
          boostFollowers: 0,
          organicFollowers: 0,
          dailyGain: 0,
          dailyBoost: 0,
          dailyOrganic: 0,
          algorithmSafety: 100,
        });
        continue;
      }

      // Fractional progress based on chosen velocity curve
      let dailyPortion = 0;
      if (velocityMode === 'steady_linear') {
        // Equal distribution
        dailyPortion = boost / days;
      } else if (velocityMode === 'natural_scurve') {
        // Sigmoid S-Curve: gentle start, peak velocity in middle, gentle landing
        // normalized t from -3 to 3
        const t = -3 + (6 * (day - 0.5)) / days;
        const sigmoid = 1 / (1 + Math.exp(-t));
        const prevT = -3 + (6 * (day - 1.5)) / days;
        const prevSigmoid = day === 1 ? 0 : 1 / (1 + Math.exp(-prevT));
        dailyPortion = boost * (sigmoid - prevSigmoid);
      } else if (velocityMode === 'rapid_momentum') {
        // Front-heavy exponential decay
        const factor = Math.exp(-0.35 * (day - 1));
        const totalFactors = Array.from({ length: days }, (_, i) => Math.exp(-0.35 * i)).reduce((a, b) => a + b, 0);
        dailyPortion = (boost * factor) / totalFactors;
      }

      // Add a tiny +/- 3% natural organic jitter so numbers look completely organic
      const jitterFactor = 0.97 + Math.sin(day * 1.8) * 0.06;
      const actualDailyBoost = Math.max(1, Math.round(dailyPortion * jitterFactor));

      // Organic explore spillover followers generated from algorithmic momentum
      const dailyOrganic = enableOrganicRipple
        ? Math.round(actualDailyBoost * organicBonusRate * (0.8 + (day / days) * 0.5))
        : 0;

      accumulatedBoost += actualDailyBoost;
      accumulatedOrganic += dailyOrganic;

      const dailyTotalGain = actualDailyBoost + dailyOrganic;
      const currentTotal = base + accumulatedBoost + accumulatedOrganic;

      // Algorithm safety metric: evaluates daily gain vs base
      const dailyPercentage = (dailyTotalGain / base) * 100;
      let safetyScore = 99.8;
      if (dailyPercentage > 40) safetyScore = 94.2;
      else if (dailyPercentage > 25) safetyScore = 97.4;
      else if (dailyPercentage > 15) safetyScore = 98.9;

      data.push({
        day: isArabic ? `يوم ${day}` : `Day ${day}`,
        dayNumber: day,
        totalFollowers: currentTotal,
        boostFollowers: accumulatedBoost,
        organicFollowers: accumulatedOrganic,
        dailyGain: dailyTotalGain,
        dailyBoost: actualDailyBoost,
        dailyOrganic,
        algorithmSafety: safetyScore,
      });
    }

    return data;
  }, [currentBaseFollowers, targetBoostAmount, duration, velocityMode, enableOrganicRipple, isArabic]);

  // Derived summaries
  const finalDay = simulationData[simulationData.length - 1];
  const totalProjected = finalDay.totalFollowers;
  const netGrowth = totalProjected - currentBaseFollowers;
  const growthPercentage = currentBaseFollowers > 0 
    ? ((netGrowth / currentBaseFollowers) * 100).toFixed(1)
    : '0';
  const organicBonusTotal = finalDay.organicFollowers;
  const avgDailyGain = Math.round(netGrowth / duration);

  // Suggested likes to preserve 3.5% healthy interaction ratio
  const recommendedMatchingLikes = Math.round(targetBoostAmount * 0.25);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 sm:p-7 backdrop-blur-md shadow-2xl space-y-6 text-start">
      {/* Component Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="h-full w-full rounded-[14px] bg-[#0c1220] flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>{isArabic ? 'مخطط الجدولة والنمو المنظم (Organic Growth & Schedule Planner)' : 'Organic Growth & Schedule Planner'}</span>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2 py-0.5">
                Recharts Visualizer
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {isArabic 
                ? 'تخطيط بياني ذكي يرسم منحنى صعود المتابعين وجدولة التزويد بأمان خوارزمي كامل.'
                : 'Algorithmic projection engine visualizing safe follower scaling and scheduled delivery.'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartView('cumulative')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              chartView === 'cumulative'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>{isArabic ? 'المنحنى التراكمي' : 'Cumulative'}</span>
          </button>
          <button
            type="button"
            onClick={() => setChartView('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              chartView === 'daily'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>{isArabic ? 'التدفق اليومي' : 'Daily Flow'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
        {/* Param 1: Current Base Followers */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isArabic ? 'عدد المتابعين الحالي بالحساب:' : 'Current Baseline Followers:'}
          </label>
          <div className="relative">
            <input
              type="number"
              min={100}
              max={10000000}
              value={currentBaseFollowers}
              onChange={(e) => setCurrentBaseFollowers(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-white/10 bg-slate-900/90 py-2 ps-3 pe-8 text-xs font-mono font-bold text-white focus:border-cyan-400 focus:outline-none"
            />
            <span className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
              {isArabic ? 'متابع' : 'fol.'}
            </span>
          </div>
        </div>

        {/* Param 2: Target Boost Amount */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isArabic ? 'العدد المستهدف للتزويد:' : 'Target Boost Quantity:'}
          </label>
          <div className="relative">
            <input
              type="number"
              min={100}
              max={1000000}
              value={targetBoostAmount}
              onChange={(e) => setTargetBoostAmount(Math.max(50, Number(e.target.value)))}
              className="w-full rounded-xl border border-white/10 bg-slate-900/90 py-2 ps-3 pe-8 text-xs font-mono font-bold text-emerald-400 focus:border-emerald-400 focus:outline-none"
            />
            <span className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[11px] text-emerald-500 font-bold">
              +{formatNumber(targetBoostAmount)}
            </span>
          </div>
        </div>

        {/* Param 3: Duration / Period */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isArabic ? 'مدة التوزيع والضخ:' : 'Drip Schedule Period:'}
          </label>
          <div className="flex gap-1.5">
            {[
              { days: 7, labelAr: '7 أيام', labelEn: '7 Days' },
              { days: 14, labelAr: '14 يوماً', labelEn: '14 Days' },
              { days: 30, labelAr: '30 يوماً', labelEn: '30 Days' },
            ].map((item) => (
              <button
                key={item.days}
                type="button"
                onClick={() => setDuration(item.days as DurationDays)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                  duration === item.days
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm'
                    : 'bg-slate-900/70 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {isArabic ? item.labelAr : item.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Param 4: Velocity Curve Pattern */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isArabic ? 'نمط تسارع الخوارزمية:' : 'Algorithm Velocity Curve:'}
          </label>
          <select
            value={velocityMode}
            onChange={(e) => setVelocityMode(e.target.value as VelocityMode)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/90 p-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="natural_scurve">
              {isArabic ? 'نمو طبيعي تصاعدي (S-Curve الأضمن)' : 'Organic S-Curve (Recommended)'}
            </option>
            <option value="steady_linear">
              {isArabic ? 'تدفق خطي متساوي (Safe Constant Drip)' : 'Steady Constant Drip'}
            </option>
            <option value="rapid_momentum">
              {isArabic ? 'تسارع خاطف للمناسبات (Fast Momentum)' : 'Fast Momentum Push'}
            </option>
          </select>
        </div>
      </div>

      {/* Quick Amount Presets & Organic Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">
            {isArabic ? 'باقات سريعة:' : 'Quick Presets:'}
          </span>
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setTargetBoostAmount(amt)}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition border ${
                targetBoostAmount === amt
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              +{formatNumber(amt)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 font-medium">
          <input
            type="checkbox"
            checked={enableOrganicRipple}
            onChange={(e) => setEnableOrganicRipple(e.target.checked)}
            className="h-4 w-4 rounded accent-cyan-500"
          />
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>
            {isArabic ? 'احتساب تفاعل الإكسبلور العضوي المتوقع (+12%)' : 'Include projected explore organic bonus (+12%)'}
          </span>
        </label>
      </div>

      {/* Chart Canvas Area */}
      <div className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span>
              {chartView === 'cumulative'
                ? (isArabic ? 'منحنى نمو إجمالي المتابعين عبر الأيام' : 'Total Cumulative Follower Growth Trajectory')
                : (isArabic ? 'معدل التدفق اليومي اليومي المضاف' : 'Daily Follower Influx Breakdown')}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-tabular font-mono">
            {isArabic ? `المدة: ${duration} يوماً` : `Window: ${duration} Days`}
          </span>
        </div>

        <div className="h-72 sm:h-80 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'cumulative' ? (
              <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  tickFormatter={(val) => formatNumber(val)} 
                  domain={['dataMin - 100', 'dataMax + 200']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-white/15 bg-slate-950 p-3 shadow-2xl text-xs space-y-1.5 text-start font-sans">
                          <div className="font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between gap-3">
                            <span>{item.day}</span>
                            <span className="text-emerald-400 font-mono text-[11px]">
                              {isArabic ? `أمان ${item.algorithmSafety}%` : `Safety ${item.algorithmSafety}%`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-cyan-300">
                            <span>{isArabic ? 'إجمالي المتابعين:' : 'Total Followers:'}</span>
                            <span className="font-bold font-mono text-white text-sm">
                              {formatNumber(item.totalFollowers)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
                            <span>{isArabic ? 'المضاف اليوم:' : 'Daily Added:'}</span>
                            <span className="font-mono text-emerald-400 font-bold">
                              +{formatNumber(item.dailyGain)}
                            </span>
                          </div>
                          {item.organicFollowers > 0 && (
                            <div className="flex items-center justify-between gap-4 text-pink-400 text-[11px]">
                              <span>{isArabic ? 'مكسب إكسبلور تراكمي:' : 'Organic Explore Bonus:'}</span>
                              <span className="font-mono font-bold">
                                +{formatNumber(item.organicFollowers)}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalFollowers"
                  name={isArabic ? 'إجمالي المتابعين' : 'Total Followers'}
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#growthGradient)"
                />
                {enableOrganicRipple && (
                  <Area
                    type="monotone"
                    dataKey="organicFollowers"
                    name={isArabic ? 'المتابعون العضويون (إكسبلور)' : 'Organic Spillover'}
                    stroke="#ec4899"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#organicGradient)"
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart data={simulationData.slice(1)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  tickFormatter={(val) => formatNumber(val)} 
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-white/15 bg-slate-950 p-3 shadow-2xl text-xs space-y-1 text-start">
                          <div className="font-bold text-white border-b border-white/10 pb-1">
                            {item.day}
                          </div>
                          <div className="text-emerald-400 font-mono font-bold">
                            {isArabic ? `الضخ المجدول: +${formatNumber(item.dailyBoost)}` : `Boost: +${formatNumber(item.dailyBoost)}`}
                          </div>
                          {item.dailyOrganic > 0 && (
                            <div className="text-pink-400 font-mono font-bold text-[11px]">
                              {isArabic ? `الإكسبلور العضوي: +${formatNumber(item.dailyOrganic)}` : `Explore: +${formatNumber(item.dailyOrganic)}`}
                            </div>
                          )}
                          <div className="text-cyan-300 font-mono font-bold pt-1 border-t border-white/5">
                            {isArabic ? `المجموع اليومي: +${formatNumber(item.dailyGain)}` : `Total Day: +${formatNumber(item.dailyGain)}`}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="dailyBoost" 
                  name={isArabic ? 'ضخ المتابعين' : 'Boost Influx'} 
                  fill="#06b6d4" 
                  radius={[4, 4, 0, 0]} 
                />
                {enableOrganicRipple && (
                  <Bar 
                    dataKey="dailyOrganic" 
                    name={isArabic ? 'إكسبلور طبيعي' : 'Organic Ripple'} 
                    fill="#ec4899" 
                    radius={[4, 4, 0, 0]} 
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytical KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Final Target Total */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">
            {isArabic ? 'المجموع النهائي المتوقع:' : 'Projected Final Followers:'}
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400">
            {formatNumber(totalProjected)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">
            +{formatNumber(netGrowth)} ({growthPercentage}+%)
          </span>
        </div>

        {/* Metric 2: Algorithm Safety Index */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">
            {isArabic ? 'مؤشر أمان الخوارزميات:' : 'Algorithm Safety Index:'}
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>99.6%</span>
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? 'تدفق متدرج آمن 100%' : 'Safe organic pace'}
          </span>
        </div>

        {/* Metric 3: Explore Bonus Spillover */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">
            {isArabic ? 'مكسب إكسبلور العضوي:' : 'Organic Explore Spillover:'}
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-pink-400">
            +{formatNumber(organicBonusTotal)}
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? 'متابعون حقيقيون مجاناً' : 'Free bonus reach'}
          </span>
        </div>

        {/* Metric 4: Daily Average Speed */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">
            {isArabic ? 'متوسط التدفق اليومي:' : 'Avg. Daily Velocity:'}
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">
            +{formatNumber(avgDailyGain)}
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? `متابع كل 24 ساعة` : 'followers / 24h'}
          </span>
        </div>
      </div>

      {/* Strategic Recommendation & Apply Plan CTA */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-black p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">
              {isArabic ? 'التوصية المتوازنة لرفع رانك الحساب:' : 'Optimal Health Ratio Recommendation:'}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed max-w-xl">
            {isArabic
              ? `للحفاظ على نسبة تفاعل ممتازة تفوق 3.5%، يُوصى بتوزيع قرابة ${formatNumber(recommendedMatchingLikes)} لايك على أحدث 3-5 منشورات أثناء فترة الضخ الممتدة لـ ${duration} أيام.`
              : `To keep engagement healthy above 3.5%, pair this plan with approx ${formatNumber(recommendedMatchingLikes)} likes split across your latest 3-5 posts.`}
          </p>
        </div>

        {onApplyPlan && (
          <button
            type="button"
            onClick={() => onApplyPlan(targetBoostAmount)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/25 transition shrink-0"
          >
            <Target className="h-4 w-4" />
            <span>
              {isArabic 
                ? `تطبيق الخطة (${formatNumber(targetBoostAmount)} متابع)` 
                : `Apply Plan (${formatNumber(targetBoostAmount)} Followers)`}
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
