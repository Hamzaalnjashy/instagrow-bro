import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Zap, 
  CheckCircle2, 
  Server, 
  Send,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react';
import { InstagramProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

interface DispatchSummaryCardProps {
  profile: InstagramProfile;
  isArabic: boolean;
  serviceType: 'followers' | 'likes';
  providerName?: string;
  serviceId?: string;
  onOpenRechargeModal?: (providerId?: 'jap' | 'peakerr') => void;
}

export const DispatchSummaryCard: React.FC<DispatchSummaryCardProps> = ({
  profile,
  isArabic,
  serviceType,
  providerName,
  serviceId,
  onOpenRechargeModal,
}) => {
  const { theme } = useTheme();
  const cleanUser = profile.username.replace(/^@/, '');
  const instagramUrl = `https://www.instagram.com/${cleanUser}/`;

  const [activeProvider, setActiveProvider] = useState<{ name: string; followerId: string; likesId: string }>({
    name: 'Peakerr API v2',
    followerId: '31929',
    likesId: '31785',
  });

  useEffect(() => {
    fetch('/api/smm/config')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data.config) {
          setActiveProvider({
            name: data.config.providerName || 'Peakerr API v2',
            followerId: data.config.followerServiceId || '31929',
            likesId: data.config.likesServiceId || '31785',
          });
        }
      })
      .catch(() => {});
  }, []);

  const currentProviderName = providerName || activeProvider.name;
  const currentServiceId = serviceId || (serviceType === 'followers' ? activeProvider.followerId : activeProvider.likesId);

  return (
    <div className={`rounded-3xl border ${theme.borderSubtle} ${theme.bgCard} p-6 backdrop-blur-xl shadow-2xl space-y-5 text-start transition-colors duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div 
            className="h-8 w-8 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}22, ${theme.secondaryColor}22)`,
              color: theme.primaryColor,
              border: `1px solid ${theme.primaryColor}44`,
            }}
          >
            <Send className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {isArabic ? 'بيانات أمر التزويد الحقيقي' : 'Live Dispatch Order Details'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {isArabic ? 'ربط مباشر ومعتمد بخوادم التزويد (Direct API Stream)' : 'Direct API Stream - Official Gateway'}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isArabic ? 'جاهز للإرسال' : 'Ready to Dispatch'}</span>
        </span>
      </div>

      {/* Target Account Info */}
      <div className="space-y-3">
        <div className="rounded-2xl bg-black/40 border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              {isArabic ? 'الحساب المستهدف:' : 'Target Account:'}
            </span>
            <span className="text-sm font-mono font-bold text-pink-400">
              @{cleanUser}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              {isArabic ? 'الرابط الفعلي المُرسل للسيرفر:' : 'Exact API Target URL:'}
            </span>
            <span className="text-xs font-mono text-slate-300 truncate max-w-[200px]" dir="ltr">
              {instagramUrl}
            </span>
          </div>

          {/* Quick link to verify real instagram page */}
          <div className="pt-2 border-t border-white/5">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{isArabic ? 'فتح وتأكيد حسابك الفعلي على إنستغرام' : 'Open Real Account on Instagram'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Technical Provider Parameters */}
        <div className="rounded-2xl bg-black/40 border border-white/5 p-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-purple-400" />
              <span>{isArabic ? 'سيرفر المزود:' : 'SMM Provider:'}</span>
            </span>
            <span className="font-semibold text-white">{currentProviderName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>{isArabic ? 'رقم الخدمة المعتمد:' : 'Service ID:'}</span>
            </span>
            <span className="font-mono text-amber-400 font-bold">
              #{currentServiceId}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isArabic ? 'أمان الحساب:' : 'Account Security:'}</span>
            </span>
            <span className="text-emerald-400 font-semibold">{isArabic ? '100% بدون كلمة سر' : '100% Password-free'}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isArabic ? 'حالة الخوادم:' : 'Gateway Status:'}</span>
            </span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isArabic ? 'كلا الموقعين نشطان ومعتمدان 🟢' : 'Both Providers Active 🟢'}</span>
            </span>
          </div>

          {onOpenRechargeModal && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenRechargeModal(serviceType === 'followers' ? 'jap' : 'peakerr')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition shadow-sm"
              >
                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                <span>{isArabic ? `شحن رصيد مزود الخدمة من داخل التطبيق 💳` : `Recharge Provider Balance In-App 💳`}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Honest Transparency Notice */}
      <div className="rounded-2xl bg-sky-500/10 border border-sky-500/20 p-4 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>{isArabic ? 'شفافية وأمان تقني 100%' : '100% Honest & Direct'}</span>
        </div>
        <p className="text-[11px] text-sky-200/90 leading-relaxed">
          {isArabic 
            ? 'يتم إرسال رابط حسابك مباشرة إلى خوادم التزويد (SMM API) لتبدأ الحسابات بمتابعتك وتصل الإشعارات إلى هاتفك على تطبيق إنستغرام فوراً وبأمان كامل.'
            : 'Your link is dispatched directly to the official SMM API. Notifications arrive on your phone via Instagram.'}
        </p>
      </div>
    </div>
  );
};
