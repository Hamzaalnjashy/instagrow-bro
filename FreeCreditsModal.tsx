import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  X, 
  Users, 
  Heart, 
  CheckCircle2, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { InstagramProfile, BoostCampaign } from '../types';
import { formatNumber } from '../utils/formatters';

interface FreeCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimFreeBoost: (campaign: Omit<BoostCampaign, 'id' | 'quantityDelivered' | 'status' | 'createdAt'>) => void;
  currentProfile: InstagramProfile;
  isArabic: boolean;
}

export const FreeCreditsModal: React.FC<FreeCreditsModalProps> = ({
  isOpen,
  onClose,
  onClaimFreeBoost,
  currentProfile,
  isArabic,
}) => {
  const [selectedService, setSelectedService] = useState<'followers' | 'likes'>('followers');
  const [targetUsername, setTargetUsername] = useState(currentProfile.username);

  if (!isOpen) return null;

  const handleClaim = () => {
    const cleanUser = targetUsername.trim().replace(/^@/, '') || currentProfile.username;
    if (selectedService === 'followers') {
      onClaimFreeBoost({
        serviceType: 'followers',
        targetUsername: cleanUser,
        quantityRequested: 50,
        qualityTier: 'arab_gulf',
        deliverySpeed: 'instant',
        estimatedCompletionTime: isArabic ? '3 - 8 دقائق' : '3 - 8 mins',
      });
    } else {
      onClaimFreeBoost({
        serviceType: 'likes',
        targetUsername: cleanUser,
        targetPostUrl: 'https://instagram.com/p/DB94kL1sX9/',
        quantityRequested: 100,
        qualityTier: 'arab_gulf',
        deliverySpeed: 'instant',
        estimatedCompletionTime: isArabic ? '2 - 5 دقائق' : '2 - 5 mins',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-amber-500/30 bg-[#0e1320] p-6 text-start shadow-2xl shadow-amber-500/10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isArabic ? 'هدية التجربة المجانية اليومية' : 'Daily Free Boost Gift'}
              </h3>
              <span className="text-xs text-amber-400">
                {isArabic ? 'بدون دفع وبدون بطاقة ائتمانية' : '100% Free · No Credit Card Required'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Gift Options */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 block">
            {isArabic ? 'اختر هديتك المجانية لهذا اليوم:' : 'Select Your Daily Free Gift:'}
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedService('followers')}
              className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                selectedService === 'followers'
                  ? 'border-pink-500 bg-pink-500/10 text-white ring-1 ring-pink-500'
                  : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/20'
              }`}
            >
              <Users className="h-5 w-5 text-pink-400" />
              <div className="text-base font-bold font-tabular text-pink-300">+50 {isArabic ? 'متابع' : 'Followers'}</div>
              <span className="text-[10px] text-slate-400">{isArabic ? 'حسابات عربية مجاناً' : 'Free Arab tier'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedService('likes')}
              className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                selectedService === 'likes'
                  ? 'border-rose-500 bg-rose-500/10 text-white ring-1 ring-rose-500'
                  : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/20'
              }`}
            >
              <Heart className="h-5 w-5 text-rose-400 fill-rose-400" />
              <div className="text-base font-bold font-tabular text-rose-300">+100 {isArabic ? 'لايك' : 'Likes'}</div>
              <span className="text-[10px] text-slate-400">{isArabic ? 'تفاعل سريع للمنشور' : 'Fast engagement'}</span>
            </button>
          </div>
        </div>

        {/* Username Confirmation */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">
            {isArabic ? 'اليوزر المراد إرسال التجربة إليه:' : 'Target Username:'}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-500 font-bold">@</span>
            <input
              type="text"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 ps-8 pe-3 text-sm text-white focus:border-amber-400 focus:outline-none"
              dir="ltr"
            />
          </div>
        </div>

        {/* Assurance */}
        <div className="rounded-xl bg-white/5 p-3 flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            {isArabic 
              ? 'يتم تفعيل الهدية فوراً وتتبع وصولها حياً من خلال لوحة التتبع المباشر.' 
              : 'Activated instantly and viewable in the live tracker.'}
          </span>
        </div>

        {/* Claim Button */}
        <button
          type="button"
          onClick={handleClaim}
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:opacity-95 transition"
        >
          {isArabic ? 'استلام وبدء التجربة المجانية فوراً 🚀' : 'Claim & Start Free Boost Now 🚀'}
        </button>
      </div>
    </div>
  );
};
