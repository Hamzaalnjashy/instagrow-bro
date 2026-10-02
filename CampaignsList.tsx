import React, { useState } from 'react';
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
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Download, 
  RefreshCw,
  Search,
  FileText,
  Sparkles
} from 'lucide-react';
import { BoostCampaign } from '../types';
import { formatNumber } from '../utils/formatters';

interface CampaignsListProps {
  campaigns: BoostCampaign[];
  onOpenLiveModal: (campaign: BoostCampaign) => void;
  onRestartCampaign: (campaign: BoostCampaign) => void;
  isArabic: boolean;
  onNavigateToBooster: (service: 'followers' | 'likes' | 'services') => void;
}

export const CampaignsList: React.FC<CampaignsListProps> = ({
  campaigns,
  onOpenLiveModal,
  onRestartCampaign,
  isArabic,
  onNavigateToBooster,
}) => {
  const [filter, setFilter] = useState<'all' | 'followers' | 'likes'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [receiptCampaign, setReceiptCampaign] = useState<BoostCampaign | null>(null);

  const filtered = campaigns.filter((c) => {
    if (filter !== 'all' && c.serviceType !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.targetUsername.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalFollowersDelivered = campaigns
    .filter((c) => c.serviceType === 'followers')
    .reduce((acc, curr) => acc + curr.quantityDelivered, 0);

  const totalLikesDelivered = campaigns
    .filter((c) => c.serviceType === 'likes')
    .reduce((acc, curr) => acc + curr.quantityDelivered, 0);

  const activeCount = campaigns.filter((c) => c.status === 'delivering').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-start">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isArabic ? 'سجل الطلبات والحملات' : 'Orders & Delivery History'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {isArabic 
              ? 'متابعة كافة طلبات زيادة المتابعين واللايكات مع شاشة البث المباشر والإيصالات الرسمية.' 
              : 'Track all active and past follower & likes boosts in real time with receipts.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateToBooster('followers')}
            className="rounded-xl bg-pink-600 hover:bg-pink-700 px-3.5 py-2 text-xs font-semibold text-white transition flex items-center gap-1.5"
          >
            <Users className="h-3.5 w-3.5" />
            <span>{isArabic ? '+ طلب متابعين' : '+ Boost Followers'}</span>
          </button>
          <button
            onClick={() => onNavigateToBooster('likes')}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 px-3.5 py-2 text-xs font-semibold text-white transition flex items-center gap-1.5"
          >
            <Heart className="h-3.5 w-3.5 fill-white" />
            <span>{isArabic ? '+ طلب لايكات' : '+ Boost Likes'}</span>
          </button>
          <button
            onClick={() => onNavigateToBooster('services')}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-3.5 py-2 text-xs font-semibold text-white transition flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isArabic ? '+ بقية الخدمات والمنصات ⚡' : '+ All Services & Platforms'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-start">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400 font-medium">{isArabic ? 'إجمالي المتابعين المسلَمين' : 'Total Followers Delivered'}</div>
          <div className="text-2xl font-bold font-tabular text-pink-400 mt-1">
            +{formatNumber(totalFollowersDelivered)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{isArabic ? 'حسابات نشطة ومضمونة' : 'active high-retention'}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400 font-medium">{isArabic ? 'إجمالي اللايكات المسلَمة' : 'Total Likes Delivered'}</div>
          <div className="text-2xl font-bold font-tabular text-rose-400 mt-1">
            +{formatNumber(totalLikesDelivered)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{isArabic ? 'تفاعل وتأثير إكسبلور' : 'explore reach engagement'}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="text-xs text-slate-400 font-medium">{isArabic ? 'الحملات الجارية الآن' : 'Active Orders In-Flight'}</div>
          <div className="text-2xl font-bold font-tabular text-emerald-400 mt-1 flex items-center gap-2">
            <span>{activeCount}</span>
            {activeCount > 0 && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{isArabic ? 'تسليم حي مباشر' : 'real-time streaming'}</div>
        </div>
      </div>

      {/* Controls: Segmented Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-white/10 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex-1 sm:flex-none ${
              filter === 'all'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'جميع الطلبات' : 'All Orders'} ({campaigns.length})
          </button>
          <button
            onClick={() => setFilter('followers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5 ${
              filter === 'followers'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-3 w-3" />
            <span>{isArabic ? 'المتابعين' : 'Followers'}</span>
          </button>
          <button
            onClick={() => setFilter('likes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5 ${
              filter === 'likes'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="h-3 w-3 fill-white" />
            <span>{isArabic ? 'اللايكات' : 'Likes'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute inset-y-0 start-3 my-auto h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isArabic ? 'بحث باليوزر أو المعرّف...' : 'Search by username...'}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2 ps-9 pe-3 text-xs text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Campaigns Table or Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400">
            <Clock className="h-6 w-6" />
          </div>
          <div className="text-white font-bold text-base">
            {isArabic ? 'لا توجد طلبات مطابقة حالياً' : 'No orders found'}
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isArabic 
              ? 'ابدأ الآن بطلبك الأول لزيادة المتابعين أو لايكات المنشورات وسيظهر تقدم التسليم الحي هنا.' 
              : 'Start your first follower or likes boost to monitor real-time delivery.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateToBooster('followers')}
              className="rounded-xl bg-pink-600 hover:bg-pink-700 px-4 py-2 text-xs font-semibold text-white transition"
            >
              {isArabic ? 'بدء زيادة المتابعين الآن' : 'Start Follower Boost'}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="border-b border-white/10 bg-black/40 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3.5 text-start">{isArabic ? 'الخدمة والحساب' : 'Service & Target'}</th>
                  <th className="px-4 py-3.5 text-start">{isArabic ? 'الكمية المطلوبة' : 'Quantity'}</th>
                  <th className="px-4 py-3.5 text-start">{isArabic ? 'التقدم المسلم' : 'Progress'}</th>
                  <th className="px-4 py-3.5 text-start">{isArabic ? 'النوعية والسرعة' : 'Tier & Speed'}</th>
                  <th className="px-4 py-3.5 text-start">{isArabic ? 'الحالة' : 'Status'}</th>
                  <th className="px-4 py-3.5 text-end">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => {
                  const pct = Math.min(
                    100,
                    Math.round((item.quantityDelivered / item.quantityRequested) * 100)
                  );
                  const isDone = item.status === 'completed';

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Service & Target */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                            item.serviceType === 'followers'
                              ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                              : item.serviceType === 'likes'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : item.serviceType === 'views'
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                              : item.serviceType === 'comments'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : item.serviceType === 'story'
                              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                              : item.serviceType === 'saves'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.serviceType === 'tiktok'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : item.serviceType === 'youtube'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          }`}>
                            {item.serviceType === 'followers' && <Users className="h-4 w-4" />}
                            {item.serviceType === 'likes' && <Heart className="h-4 w-4 fill-current" />}
                            {item.serviceType === 'views' && <Eye className="h-4 w-4" />}
                            {item.serviceType === 'comments' && <MessageCircle className="h-4 w-4" />}
                            {item.serviceType === 'story' && <CircleDot className="h-4 w-4" />}
                            {item.serviceType === 'saves' && <Bookmark className="h-4 w-4" />}
                            {item.serviceType === 'tiktok' && <Music2 className="h-4 w-4" />}
                            {item.serviceType === 'youtube' && <PlaySquare className="h-4 w-4" />}
                            {item.serviceType === 'telegram' && <Send className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>@{item.targetUsername}</span>
                              <span className="font-tabular text-[10px] text-slate-500">{item.id}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {item.serviceType === 'followers' && (isArabic ? 'تزويد متابعين' : 'Follower Boost')}
                              {item.serviceType === 'likes' && (isArabic ? 'تزويد لايكات المنشور' : 'Post Likes Boost')}
                              {item.serviceType === 'views' && (isArabic ? 'مشاهدات ريلز وفيديو' : 'Reels / Video Views')}
                              {item.serviceType === 'comments' && (isArabic ? 'تعليقات وتفاعل' : 'Comments')}
                              {item.serviceType === 'story' && (isArabic ? 'مشاهدات ستوري وقصص' : 'Story Views')}
                              {item.serviceType === 'saves' && (isArabic ? 'حفظ بوستات وإكسبلور' : 'Saves & Explore')}
                              {item.serviceType === 'tiktok' && (isArabic ? 'خدمات تيك توك' : 'TikTok Service')}
                              {item.serviceType === 'youtube' && (isArabic ? 'خدمات يوتيوب' : 'YouTube Service')}
                              {item.serviceType === 'telegram' && (isArabic ? 'خدمات تليجرام' : 'Telegram Service')}
                              {item.providerName && (
                                <span className="ms-1 text-slate-500 font-mono">({item.providerName})</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-3.5 font-tabular font-bold text-white">
                        +{formatNumber(item.quantityRequested)}
                      </td>

                      {/* Progress */}
                      <td className="px-4 py-3.5 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] font-tabular mb-1">
                          <span className="text-slate-300 font-semibold">
                            {formatNumber(item.quantityDelivered)}
                          </span>
                          <span className="text-slate-400">
                            {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-pink-500 to-amber-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>

                      {/* Tier & Speed */}
                      <td className="px-4 py-3.5">
                        <div className="text-slate-200 font-medium">
                          {item.qualityTier === 'arab_gulf' ? (isArabic ? 'عربي خليجي 🇸🇦' : 'Arab Gulf') : (isArabic ? 'عالمي فائق الثبات' : 'Global Safe')}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.deliverySpeed === 'instant' ? (isArabic ? 'تيربو فوري' : 'Turbo Instant') : (isArabic ? 'تنقيط تدريجي' : 'Drip Feed')}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span>{isArabic ? 'مكتمل' : 'Completed'}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 text-[11px] font-semibold text-pink-400 animate-pulse">
                            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                            <span>{isArabic ? 'جاري التسليم' : 'Delivering'}</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenLiveModal(item)}
                            className="rounded-lg bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 px-2.5 py-1 text-[11px] font-semibold text-pink-300 transition flex items-center gap-1"
                            title={isArabic ? 'فتح التتبع المباشر للسيرفر' : 'Open Live Tracker'}
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>{isArabic ? 'التتبع الحي' : 'Live Tracker'}</span>
                          </button>

                          <button
                            onClick={() => setReceiptCampaign(item)}
                            className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition"
                            title={isArabic ? 'عرض الإيصال' : 'View Receipt'}
                          >
                            <FileText className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0f1422] p-6 text-start space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider block">
                  {isArabic ? 'إيصال تأكيد التزويد الرسمي' : 'Official Delivery Receipt'}
                </span>
                <span className="font-bold text-white text-base">
                  {receiptCampaign.id}
                </span>
              </div>
              <button
                onClick={() => setReceiptCampaign(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'الحساب المستهدف:' : 'Target Account:'}</span>
                <span className="font-bold text-white">@{receiptCampaign.targetUsername}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'نوع الخدمة:' : 'Service:'}</span>
                <span className="font-semibold text-white">
                  {receiptCampaign.serviceType === 'followers' 
                    ? (isArabic ? 'متابعين إنستغرام نشطين' : 'Instagram Followers') 
                    : (isArabic ? 'لايكات للمنشور' : 'Post Likes')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'الكمية المطلوبة:' : 'Requested Amount:'}</span>
                <span className="font-bold font-tabular text-pink-400">+{formatNumber(receiptCampaign.quantityRequested)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'الكمية المسلَمة:' : 'Delivered Amount:'}</span>
                <span className="font-bold font-tabular text-emerald-400">+{formatNumber(receiptCampaign.quantityDelivered)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'حالة التزويد:' : 'Status:'}</span>
                <span className="font-semibold text-emerald-400">
                  {receiptCampaign.status === 'completed' 
                    ? (isArabic ? 'تم التسليم 100% بنجاح' : 'Fulfilled 100%') 
                    : (isArabic ? 'جاري البث والتسليم' : 'In Flight')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">{isArabic ? 'الضمان:' : 'Guarantee:'}</span>
                <span className="text-white">{isArabic ? 'ضمان تعويض 365 يوماً ضد النقص' : '365 Days Refill Guarantee'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{isArabic ? 'تاريخ الطلب:' : 'Date:'}</span>
                <span className="font-tabular text-slate-300">{receiptCampaign.createdAt}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setReceiptCampaign(null)}
                className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 py-2.5 text-xs font-semibold text-white transition"
              >
                {isArabic ? 'إغلاق الإيصال' : 'Close Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
