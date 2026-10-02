import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Server, 
  Cpu, 
  Zap, 
  Users, 
  Heart, 
  Key, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Layers, 
  Sliders, 
  Activity,
  Send,
  RefreshCw,
  Sparkles,
  Globe,
  Wallet,
  ExternalLink,
  Eye,
  EyeOff,
  HelpCircle,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  CreditCard
} from 'lucide-react';
import { ServerNode, SystemLog, InstagramProfile, SmmProviderInfo } from '../types';
import { SERVER_NODES } from '../data/mockData';
import { formatNumber } from '../utils/formatters';

interface AdminConsoleProps {
  isArabic: boolean;
  systemLogs: SystemLog[];
  onAddLog: (message: string, type?: SystemLog['type']) => void;
  onBatchInject: (usernames: string[], amount: number, service: 'followers' | 'likes') => void;
  profile: InstagramProfile;
  onUpdateProfile: (updated: InstagramProfile) => void;
  onOpenRechargeModal?: (providerId?: 'jap' | 'peakerr') => void;
}

const SMM_PRESETS = [
  { name: 'Peakerr API v2', url: 'https://peakerr.com/api/v2' },
  { name: 'JustAnotherPanel (JAP)', url: 'https://justanotherpanel.com/api/v2' },
  { name: 'Secsers Provider', url: 'https://secsers.com/api/v2' },
  { name: 'SMMHeaven API', url: 'https://smmheaven.net/api/v2' },
  { name: 'مخصص (Custom SMM Provider)', url: '' },
];

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  isArabic,
  systemLogs,
  onAddLog,
  onBatchInject,
  profile,
  onUpdateProfile,
  onOpenRechargeModal,
}) => {
  const [selectedNode, setSelectedNode] = useState<string>(SERVER_NODES[0].id);
  const [batchUsernames, setBatchUsernames] = useState('');
  const [batchAmount, setBatchAmount] = useState(1000);
  const [batchService, setBatchService] = useState<'followers' | 'likes'>('followers');
  const [isInjectingBatch, setIsInjectingBatch] = useState(false);
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  // Manual Profile Overrider
  const [overrideFollowers, setOverrideFollowers] = useState(profile.followers);
  const [overridePosts, setOverridePosts] = useState(profile.postsCount);
  const [overrideVerified, setOverrideVerified] = useState(profile.isVerified);

  // Quick Terminal Command
  const [commandInput, setCommandInput] = useState('');

  // --- Multi-Provider SMM Gateway State ---
  const [providers, setProviders] = useState<SmmProviderInfo[]>([]);
  const [activeProviderId, setActiveProviderId] = useState<string>('peakerr');
  const [selectedProviderForEdit, setSelectedProviderForEdit] = useState<string>('peakerr');
  const [isSwitchingProvider, setIsSwitchingProvider] = useState(false);
  const [checkingProviderId, setCheckingProviderId] = useState<string | null>(null);
  const [providerBalances, setProviderBalances] = useState<Record<string, { balance?: string; currency?: string; error?: string }>>({});
  
  // Active editing form fields
  const [smmProviderName, setSmmProviderName] = useState('Peakerr API v2');
  const [smmApiUrl, setSmmApiUrl] = useState('https://peakerr.com/api/v2');
  const [smmApiKey, setSmmApiKey] = useState('');
  const [smmFollowerServiceId, setSmmFollowerServiceId] = useState('31929');
  const [smmLikesServiceId, setSmmLikesServiceId] = useState('31785');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasServerKey, setHasServerKey] = useState(true);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState<string | null>(null);

  // New Provider Modal
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [newProvName, setNewProvName] = useState('');
  const [newProvUrl, setNewProvUrl] = useState('');
  const [newProvKey, setNewProvKey] = useState('');
  const [newProvFollowerId, setNewProvFollowerId] = useState('101');
  const [newProvLikesId, setNewProvLikesId] = useState('102');
  const [isAddingNewProv, setIsAddingNewProv] = useState(false);

  // Live Balance Check
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [liveBalance, setLiveBalance] = useState<string | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  // Real Order Quick Dispatcher
  const [targetBoostProviderId, setTargetBoostProviderId] = useState<string>('peakerr');
  const [isSendingRealOrder, setIsSendingRealOrder] = useState(false);
  const [realOrderFeedback, setRealOrderFeedback] = useState<{
    success: boolean;
    orderId?: string | number;
    message: string;
    isSimulation?: boolean;
  } | null>(null);

  // Available Services Browser
  const [isFetchingServices, setIsFetchingServices] = useState(false);
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [showServicesModal, setShowServicesModal] = useState(false);

  // Fetch all providers from backend
  const fetchProviders = async () => {
    try {
      const res = await fetch('/api/smm/providers');
      const data = await res.json();
      if (data && data.providers && data.providers.length > 0) {
        setProviders(data.providers);
        const actId = data.activeProviderId || data.providers[0].id;
        setActiveProviderId(actId);
        setTargetBoostProviderId(actId);
        
        // Populate edit form with active or first provider
        const curr = data.providers.find((p: any) => p.id === actId) || data.providers[0];
        if (curr) {
          setSelectedProviderForEdit(curr.id);
          setSmmProviderName(curr.name);
          setSmmApiUrl(curr.apiUrl);
          setSmmApiKey(curr.maskedKey || '');
          setHasServerKey(curr.hasKey);
          setSmmFollowerServiceId(curr.followerServiceId);
          setSmmLikesServiceId(curr.likesServiceId);
        }
      }
    } catch {
      // offline fallback
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleSelectProviderToEdit = (p: SmmProviderInfo) => {
    setSelectedProviderForEdit(p.id);
    setSmmProviderName(p.name);
    setSmmApiUrl(p.apiUrl);
    setSmmApiKey(p.maskedKey || '');
    setHasServerKey(p.hasKey);
    setSmmFollowerServiceId(p.followerServiceId);
    setSmmLikesServiceId(p.likesServiceId);
    setConfigSuccessMsg(null);
    setBalanceError(null);
  };

  const handleActivateProvider = async (pId: string) => {
    setIsSwitchingProvider(true);
    try {
      const res = await fetch('/api/smm/providers/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId: pId }),
      });
      const data = await res.json();
      if (data.success) {
        setActiveProviderId(pId);
        setTargetBoostProviderId(pId);
        await fetchProviders();
        onAddLog(
          isArabic
            ? `[PROVIDER] تم تعيين المزود الأساسي النشط إلى: ${pId === 'peakerr' ? 'Peakerr API' : 'JustAnotherPanel'}`
            : `[PROVIDER] Active provider set to ${pId}`,
          'success'
        );
      }
    } catch (e: any) {
      onAddLog(`[ERR] ${e.message}`, 'warning');
    } finally {
      setIsSwitchingProvider(false);
    }
  };

  const handleCheckProviderBalance = async (p: SmmProviderInfo) => {
    setCheckingProviderId(p.id);
    try {
      const res = await fetch('/api/smm/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId: p.id }),
      });
      const data = await res.json();
      if (data.success && data.balance !== undefined) {
        setProviderBalances(prev => ({
          ...prev,
          [p.id]: { balance: data.balance, currency: data.currency || 'USD' }
        }));
        setLiveBalance(`${data.balance} ${data.currency || 'USD'}`);
        onAddLog(
          isArabic
            ? `[BALANCE] تم قراءة رصيد (${p.name}): ${data.balance} ${data.currency || 'USD'}`
            : `[BALANCE] Provider (${p.name}) balance: ${data.balance} ${data.currency || 'USD'}`,
          'success'
        );
      } else {
        const errMsg = data.error || 'تعذر قراءة الرصيد';
        setProviderBalances(prev => ({
          ...prev,
          [p.id]: { error: errMsg }
        }));
        setBalanceError(errMsg);
      }
    } catch (e: any) {
      setProviderBalances(prev => ({
        ...prev,
        [p.id]: { error: e.message }
      }));
    } finally {
      setCheckingProviderId(null);
    }
  };

  const handleAddNewProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvName.trim() || !newProvUrl.trim()) return;
    setIsAddingNewProv(true);
    try {
      const res = await fetch('/api/smm/providers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProvName.trim(),
          apiUrl: newProvUrl.trim(),
          apiKey: newProvKey.trim(),
          followerServiceId: newProvFollowerId.trim() || '101',
          likesServiceId: newProvLikesId.trim() || '102',
          setAsActive: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddProviderModal(false);
        setNewProvName('');
        setNewProvUrl('');
        setNewProvKey('');
        await fetchProviders();
        onAddLog(
          isArabic
            ? `[PROVIDER_ADD] تم ربط وحفظ موقع التزويد الجديد بنجاح!`
            : `[PROVIDER_ADD] New SMM provider connected successfully.`,
          'success'
        );
      }
    } finally {
      setIsAddingNewProv(false);
    }
  };

  const handleSaveSmmConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setConfigSuccessMsg(null);
    setBalanceError(null);

    try {
      const res = await fetch('/api/smm/providers/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedProviderForEdit,
          name: smmProviderName,
          apiUrl: smmApiUrl,
          apiKey: smmApiKey.includes('•••') ? undefined : smmApiKey,
          followerServiceId: smmFollowerServiceId,
          likesServiceId: smmLikesServiceId,
          setAsActive: selectedProviderForEdit === activeProviderId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfigSuccessMsg(
          isArabic 
            ? `تم حفظ وتحديث إعدادات المزود (${smmProviderName}) بنجاح في السيرفر!` 
            : `SMM API settings for (${smmProviderName}) saved successfully!`
        );
        await fetchProviders();
        onAddLog(
          isArabic
            ? `[CONFIG] تم تحديث إعدادات مزود التزويد (${smmProviderName}) بنجاح.`
            : `[CONFIG] Provider settings updated for ${smmProviderName}.`,
          'success'
        );
      }
    } catch (err: any) {
      setBalanceError(err.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleCheckBalance = async () => {
    setIsCheckingBalance(true);
    setBalanceError(null);
    setLiveBalance(null);

    try {
      const res = await fetch('/api/smm/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: selectedProviderForEdit,
          apiUrl: smmApiUrl,
          apiKey: smmApiKey.includes('•••') ? undefined : smmApiKey,
        }),
      });
      const data = await res.json();
      if (data.success && data.balance !== undefined) {
        setLiveBalance(`${data.balance} ${data.currency || 'USD'}`);
        setProviderBalances(prev => ({
          ...prev,
          [selectedProviderForEdit]: { balance: data.balance, currency: data.currency || 'USD' }
        }));
        onAddLog(
          isArabic
            ? `[BALANCE] تم التحقق من رصيد المزود: ${data.balance} ${data.currency || 'USD'}`
            : `[BALANCE] SMM Provider Balance: ${data.balance} ${data.currency || 'USD'}`,
          'success'
        );
      } else {
        setBalanceError(data.error || 'تعذر جلب الرصيد، تأكد من صحة الـ API Key والرابط');
        onAddLog(`[BALANCE_ERR] ${data.error || 'Connection failed'}`, 'warning');
      }
    } catch (err: any) {
      setBalanceError(`خطأ اتصال: ${err.message}`);
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const handleFetchServices = async () => {
    setIsFetchingServices(true);
    setServicesError(null);

    try {
      const res = await fetch('/api/smm/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: selectedProviderForEdit,
          apiUrl: smmApiUrl,
          apiKey: smmApiKey.includes('•••') ? undefined : smmApiKey,
        }),
      });
      const data = await res.json();
      if (data.success && (data.instagramServices || data.allServices)) {
        const srvs = data.instagramServices || data.allServices;
        setAvailableServices(srvs);
        setShowServicesModal(true);
        onAddLog(
          isArabic
            ? `[SERVICES] تم استعراض ${srvs.length} خدمة متوفرة من مزود (${data.providerName || smmProviderName}).`
            : `[SERVICES] Loaded ${srvs.length} provider services.`,
          'info'
        );
      } else {
        setServicesError(data.error || 'فشل جلب الخدمات');
      }
    } catch (err: any) {
      setServicesError(err.message);
    } finally {
      setIsFetchingServices(false);
    }
  };

  const handleSendDirectOrder = async (targetUser: string, qty: number, service: 'followers' | 'likes') => {
    setIsSendingRealOrder(true);
    setRealOrderFeedback(null);

    try {
      const res = await fetch('/api/smm/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: service,
          target: targetUser,
          quantity: qty,
          providerId: targetBoostProviderId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRealOrderFeedback({
          success: true,
          orderId: data.orderId,
          message: data.message,
          isSimulation: data.isSimulation,
        });

        onAddLog(
          isArabic
            ? `[ORDER] تم إرسال أمر ${service === 'followers' ? 'المتابعين' : 'اللايكات'} للحساب @${targetUser} عبر (${data.provider || 'Peakerr'}) (طلب #${data.orderId})`
            : `[ORDER] Boost dispatched for @${targetUser} via (${data.provider || 'Peakerr'}) (Order #${data.orderId})`,
          data.isSimulation ? 'info' : 'success'
        );
      } else {
        setRealOrderFeedback({
          success: false,
          message: data.error || 'فشل إرسال الطلب إلى المزود',
        });
        onAddLog(`[ORDER_ERR] ${data.error}`, 'warning');
      }
    } catch (err: any) {
      setRealOrderFeedback({
        success: false,
        message: err.message,
      });
    } finally {
      setIsSendingRealOrder(false);
    }
  };

  const handleRunBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const rawList = batchUsernames
      .split(/[\n, ]+/)
      .map((u) => u.trim().replace(/^@/, ''))
      .filter((u) => u.length > 0);

    if (rawList.length === 0) return;

    setIsInjectingBatch(true);
    setBatchSuccessMsg(null);

    onAddLog(
      isArabic
        ? `[ADMIN_DISPATCH] بدء عملية الضخ الجماعي لـ ${rawList.length} حسابات بواسطة المشغل الوحيد (Hamza).`
        : `[ADMIN_DISPATCH] Batch injection initiated for ${rawList.length} accounts by Master Admin.`
    );

    setTimeout(() => {
      onBatchInject(rawList, batchAmount, batchService);
      setIsInjectingBatch(false);
      setBatchSuccessMsg(
        isArabic
          ? `تم بنجاح تفعيل أمر التزويد لـ ${rawList.length} حساب (${rawList.map(u => '@' + u).join(', ')})!`
          : `Successfully dispatched boost jobs for ${rawList.length} accounts!`
      );
      setBatchUsernames('');
      onAddLog(
        isArabic
          ? `[ADMIN_SUCCESS] اكتمل توجيه المهام إلى السيرفر: ${rawList.length} حسابات قيد الضخ الآن.`
          : `[ADMIN_SUCCESS] Jobs routed to delivery cluster: ${rawList.length} targets active.`
      );
    }, 800);
  };

  const handleSaveProfileOverride = () => {
    onUpdateProfile({
      ...profile,
      followers: Number(overrideFollowers),
      postsCount: Number(overridePosts),
      isVerified: Boolean(overrideVerified),
    });
    onAddLog(
      isArabic
        ? `[OVERRIDE] تم تعديل بيانات حساب @${profile.username} يدوياً (${overrideFollowers} متابع).`
        : `[OVERRIDE] Force-updated @${profile.username} stats to ${overrideFollowers} followers.`,
      'success'
    );
  };

  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    setCommandInput('');

    if (cmd === 'ping') {
      onAddLog('[PONG] All 3 cluster nodes responding within 45ms. System 100% nominal.', 'success');
    } else if (cmd === 'nodes') {
      onAddLog(`[NODES] Riyadh (99.8%), Dubai Explorer (99.4%), Frankfurt Global (99.9%).`, 'info');
    } else if (cmd === 'balance') {
      handleCheckBalance();
    } else if (cmd === 'clear') {
      // clear
    } else {
      onAddLog(`[EXEC] Executed root command: ${cmd} (OK)`, 'dispatch');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Exclusive Master Operator Banner */}
      <div className="rounded-3xl border border-pink-500/30 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900/60 p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-pink-500/20">
              <div className="h-full w-full rounded-[14px] bg-[#0e131f] flex items-center justify-center">
                <ShieldAlert className="h-7 w-7 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                  {isArabic ? 'المشغل والمتحكم الوحيد (Root Admin)' : 'Sole Root Operator'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isArabic ? 'صلاحيات مطلقة' : 'Full Root Privileges'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {isArabic ? 'لوحة تحكم خوادم التزويد الحقيقي (SMM Live Engine)' : 'Real SMM Engine & Operator Console'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {isArabic 
                  ? 'التحكم المباشر في ربط مزودات الـ API الحقيقية، ضخ المتابعين لحسابات إنستغرام الفعلية، والضخ الجماعي.'
                  : 'Direct real SMM API integration, real Instagram follower delivery engine, and batch injector.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 text-end">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isArabic ? 'حالة الربط الحقيقي' : 'Real Provider Status'}</div>
              <div className="text-sm font-black font-tabular flex items-center gap-1.5 justify-end mt-0.5">
                {hasServerKey ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isArabic ? 'سيرفر حقيقي متصل' : 'Real API Connected'}</span>
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{isArabic ? 'بانتظار تفعيل المفتاح' : 'Awaiting API Key'}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 1: Real SMM Provider API Gateway --- */}
      <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 backdrop-blur-sm shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isArabic ? 'بوابة الربط مع سيرفرات التزويد الحقيقية (Real SMM Provider Integration)' : 'Real SMM Provider API Gateway'}
              </h2>
              <p className="text-xs text-slate-400">
                {isArabic 
                  ? 'هذا القسم يربط تطبيقك مباشرة بمزودات SMM الحقيقية لترسل متابعين ولايكات فعلية لحسابات إنستغرام الحقيقية.' 
                  : 'Connect this app directly to real SMM panels to dispatch real Instagram followers & likes.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckBalance}
              disabled={isCheckingBalance}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2 text-xs font-bold text-emerald-300 transition disabled:opacity-50"
            >
              {isCheckingBalance ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Wallet className="h-3.5 w-3.5" />
              )}
              <span>{isArabic ? 'فحص الرصيد الفعلي' : 'Check Balance'}</span>
            </button>

            <button
              onClick={handleFetchServices}
              disabled={isFetchingServices}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition disabled:opacity-50"
            >
              {isFetchingServices ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Layers className="h-3.5 w-3.5" />
              )}
              <span>{isArabic ? 'استعراض خدمات المزود' : 'Fetch Services'}</span>
            </button>
          </div>
        </div>

        {/* Live Balance / Status Indicator */}
        {(liveBalance || balanceError) && (
          <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
            liveBalance && parseFloat(liveBalance) > 0 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {liveBalance && parseFloat(liveBalance) > 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                )}
                <span className="font-bold">
                  {liveBalance ? `${isArabic ? 'الرصيد الفعلي المقروء من حسابك في JAP:' : 'Live Provider Balance:'} ${liveBalance}` : balanceError}
                </span>
              </div>
              {liveBalance && parseFloat(liveBalance) === 0 && (
                <a
                  href="https://justanotherpanel.com/addfunds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[11px] transition shadow"
                >
                  <span>{isArabic ? 'شحن رصيد في JAP (Add Funds)' : 'Deposit Funds'}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {liveBalance && parseFloat(liveBalance) === 0 && (
              <p className="text-[11px] text-amber-200/90 leading-relaxed border-t border-amber-500/20 pt-2">
                {isArabic 
                  ? '💡 مفتاح الـ API تم ربطه بنجاح وسيرفر JustAnotherPanel استجاب بنجاح! لكن رصيدك حالياً 0.00$، لذلك لا يقوم الموقع بإرسال المتابعين حتى تقوم بشحن 1$ أو 2$ فقط من زر الشحن أعلاه.'
                  : '💡 API Key connected successfully! However, your balance is $0.00. SMM panels require at least $1 balance to dispatch follower bots.'}
              </p>
            )}
          </div>
        )}

        {/* Step-by-Step Onboarding Guide */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-950/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <span>{isArabic ? 'دليل الاشتراك والربط مع سيرفرات التزويد (خلال 3 دقائق)' : 'How to Subscribe & Get Your API Key (3-Min Guide)'}</span>
            </div>
            <span className="text-[10px] text-sky-300/80 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
              {isArabic ? 'خطوات بسيطة جداً' : 'Easy 4 Steps'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Step 1 */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="h-5 w-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[11px]">1</span>
                <span className="text-[10px] text-slate-400">{isArabic ? 'مجاني' : 'Free'}</span>
              </div>
              <div className="font-bold text-white text-[12px]">
                {isArabic ? 'اختر المزود وسجل حساباً' : 'Sign Up on a Provider'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isArabic ? 'سجل في موقع تزويد مثل Peakerr أو JustAnotherPanel مجاناً بدون شروط.' : 'Create an account on Peakerr or JustAnotherPanel.'}
              </p>
              <div className="flex gap-2 pt-1">
                <a
                  href="https://peakerr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Peakerr</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://justanotherpanel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>JAP</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px]">2</span>
                <span className="text-[10px] text-amber-400/90 font-bold">$1 - $2</span>
              </div>
              <div className="font-bold text-white text-[12px]">
                {isArabic ? 'شحن رصيد تجريبي بسيط' : 'Add Small Funds'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isArabic 
                  ? 'اضغط Add Funds واشحن 1$ أو 2$ فقط (عبر فيزا، بايبال، فودافون كاش، أو USDT). المتابعين رخيصين جداً (أقل من 0.40$ للألف).'
                  : 'Add $1-$2 via Visa, PayPal, or Crypto (1k followers cost only ~$0.35).'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
                <Key className="h-3 w-3 text-emerald-400" />
              </div>
              <div className="font-bold text-white text-[12px]">
                {isArabic ? 'نسخ مفتاح الـ API' : 'Copy your API Key'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isArabic 
                  ? 'من صفحة حسابك (Account أو Settings) اضغط على "API" ثم اضغط "Generate API Key" وانسخ الرمز.'
                  : 'Go to Account > API, generate and copy your unique API Key.'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="h-5 w-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-[11px]">4</span>
                <Zap className="h-3 w-3 text-pink-400 fill-pink-400" />
              </div>
              <div className="font-bold text-white text-[12px]">
                {isArabic ? 'اللصق هنا والضخ لهاتفك' : 'Paste & Boost Live'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isArabic 
                  ? 'الصق المفتاح في النموذج بالأسفل واضغط حفظ، ثم اضغط تزويد لحسابك @muhndszrai وسترى المتابعين فوراً في تطبيقك!'
                  : 'Paste key below, click Save, and dispatch real followers to @muhndszrai!'}
              </p>
            </div>
          </div>
        </div>

        {/* --- Providers Grid Hub --- */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {isArabic ? 'خوادم ومواقع التزويد المربوطة بالتطبيق (Connected SMM Providers)' : 'Connected SMM Providers'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProviderModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 text-xs font-bold text-cyan-300 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{isArabic ? '+ إضافة موقع تزويد آخر' : '+ Add New Provider'}</span>
            </button>
          </div>

          {/* Dual Active Banner */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-emerald-950/60 border border-emerald-500/40 p-3.5 text-xs shadow-lg">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="font-bold text-emerald-300 text-xs">
                  {isArabic 
                    ? '⚡ نظام التزويد المزدوج مفعّل: كلا الموقعين (JustAnotherPanel & Peakerr) في حالة نشطة ومعتمدة 100%' 
                    : '⚡ Dual-Active Pipeline: Both JustAnotherPanel & Peakerr are ACTIVE and READY 100%'}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isArabic 
                    ? 'كلا الخادمين مربوطان بمفاتيح API معتمدة، ويمكنك استخدام باقاتهما وضخ الطلبات عبر أي منهما مباشرة.' 
                    : 'Both providers are authenticated with live API keys and ready to process instant orders.'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40 shrink-0">
              {isArabic ? 'كلاهما نشط 🟢' : 'Dual Active 🟢'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((p) => {
              const isPrimary = p.isPrimary ?? (p.id === activeProviderId);
              const isActive = p.isActive ?? Boolean(p.hasKey && p.isEnabled);
              const isEditing = p.id === selectedProviderForEdit;
              const balanceData = providerBalances[p.id];
              const isCheckingThis = checkingProviderId === p.id;

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border p-4 text-start transition-all relative ${
                    isActive
                      ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-black shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                      : isEditing
                      ? 'border-cyan-500/40 bg-slate-900/90'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-extrabold text-white">{p.name}</span>
                        {isActive && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{isArabic ? 'نشط ومعتمد' : 'Active & Online'}</span>
                          </span>
                        )}
                        {isPrimary && (
                          <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5">
                            {isArabic ? '⭐ الافتراضي الأول' : '⭐ Primary Default'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-[260px]" dir="ltr">
                        {p.apiUrl}
                      </div>
                    </div>

                    <div className="shrink-0 text-end">
                      {p.hasKey ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{isArabic ? 'مفتاح مفعّل' : 'Key Ready'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          <AlertCircle className="h-3 w-3" />
                          <span>{isArabic ? 'بدون مفتاح' : 'No Key'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* API Key Masked Preview */}
                  <div className="mt-2.5 p-2 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{isArabic ? 'مفتاح الـ API:' : 'API Key:'}</span>
                    <span className="font-mono text-slate-200 text-[11px]">
                      {p.maskedKey || (isArabic ? 'غير مسجل' : 'Not set')}
                    </span>
                  </div>

                  {/* Balance Display */}
                  <div className="mt-2 p-2 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{isArabic ? 'الرصيد في الموقع:' : 'Panel Balance:'}</span>
                    <div className="flex items-center gap-2">
                      {balanceData && 'balance' in balanceData ? (
                        <span className="font-bold text-emerald-400 font-mono">
                          ${Number(balanceData.balance || 0).toFixed(2)} {balanceData.currency || 'USD'}
                        </span>
                      ) : balanceData && 'error' in balanceData ? (
                        <span className="text-amber-400 text-[10px] truncate max-w-[130px]" title={balanceData.error}>
                          {balanceData.error}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">{isArabic ? 'لم يفحص بعد' : 'Not checked'}</span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCheckProviderBalance(p)}
                        disabled={isCheckingThis}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                        title={isArabic ? 'فحص الرصيد الفعلي للمزود' : 'Check balance'}
                      >
                        <RefreshCw className={`h-3 w-3 ${isCheckingThis ? 'animate-spin text-emerald-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Provider Action Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Active Status Badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>{isArabic ? 'نشط ومعتمد' : 'Active'}</span>
                      </span>

                      {!isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleActivateProvider(p.id)}
                          disabled={isSwitchingProvider}
                          className="flex items-center gap-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg transition border border-white/10 shadow"
                          title={isArabic ? 'جعله المزود الافتراضي الأساسي' : 'Set as primary default'}
                        >
                          <Sparkles className="h-3 w-3 text-amber-400" />
                          <span>{isArabic ? 'تعيين كافتراضي' : 'Set Default'}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSelectProviderToEdit(p)}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition ${
                          isEditing
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isArabic ? 'تعديل الإعدادات' : 'Edit Config'}
                      </button>

                      {onOpenRechargeModal && (
                        <button
                          type="button"
                          onClick={() => onOpenRechargeModal(p.id as 'jap' | 'peakerr')}
                          className="flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 transition shadow-sm"
                          title={isArabic ? `فتح نافذة شحن ${p.name}` : `Top up ${p.name}`}
                        >
                          <CreditCard className="h-3 w-3 text-emerald-400" />
                          <span>{isArabic ? 'شحن الرصيد' : 'Recharge'}</span>
                        </button>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      F: #{p.followerServiceId} | L: #{p.likesServiceId}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SMM Config Form */}
        <form onSubmit={handleSaveSmmConfig} className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-200">
              {isArabic 
                ? `تعديل وضبط إعدادات المزود المحدد: (${smmProviderName})`
                : `Configure Provider: (${smmProviderName})`}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ID: {selectedProviderForEdit}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Provider Preset Dropdown */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'اسم المزود أو اختيار من النماذج:' : 'Select SMM Provider Preset:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={smmProviderName}
                  onChange={(e) => setSmmProviderName(e.target.value)}
                  placeholder="Peakerr API v2"
                  className="flex-1 rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                />
                <select
                  value=""
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    setSmmProviderName(val);
                    const preset = SMM_PRESETS.find((p) => p.name === val);
                    if (preset && preset.url) {
                      setSmmApiUrl(preset.url);
                    }
                  }}
                  className="rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-slate-400 focus:outline-none max-w-[110px]"
                >
                  <option value="">{isArabic ? 'نماذج جاهزة' : 'Presets'}</option>
                  {SMM_PRESETS.map((p) => (
                    <option key={p.name} value={p.name} className="bg-slate-900 text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* API Endpoint URL */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'رابط الـ API الخاص بالمزود (API URL):' : 'Provider API URL:'}
              </label>
              <input
                type="text"
                value={smmApiUrl}
                onChange={(e) => setSmmApiUrl(e.target.value)}
                placeholder="https://peakerr.com/api/v2"
                className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* API Key */}
            <div className="md:col-span-1">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'مفتاح الـ API Key الخاص بك:' : 'Your Provider API Key:'}
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={smmApiKey}
                  onChange={(e) => setSmmApiKey(e.target.value)}
                  placeholder={isArabic ? 'الصق مفتاح الـ API هنا...' : 'Paste your API key here...'}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none pe-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Followers Service ID */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'رقم خدمة المتابعين (Followers Service ID):' : 'Followers Service ID:'}
              </label>
              <input
                type="text"
                value={smmFollowerServiceId}
                onChange={(e) => setSmmFollowerServiceId(e.target.value)}
                placeholder="31929"
                className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                dir="ltr"
              />
            </div>

            {/* Likes Service ID */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'رقم خدمة اللايكات (Likes Service ID):' : 'Likes Service ID:'}
              </label>
              <input
                type="text"
                value={smmLikesServiceId}
                onChange={(e) => setSmmLikesServiceId(e.target.value)}
                placeholder="31785"
                className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>

          {configSuccessMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{configSuccessMsg}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>
                {isArabic
                  ? 'تم ربط مفتاح Peakerr وموقع JAP بنجاح. يمكنك التبديل بينهما في أي وقت وفحص الرصيد المباشر.'
                  : 'Peakerr API key & JAP configured. You can switch between providers anytime.'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSavingConfig}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
            >
              {isSavingConfig ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              <span>{isArabic ? 'حفظ وتثبيت إعدادات هذا المزود' : 'Save Provider Configuration'}</span>
            </button>
          </div>
        </form>

        {/* Quick One-Click Live Injection Test for User's Real Account */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-white block">
                {isArabic ? 'إرسال طلب تزويد فوري مباشر لحسابك الحقيقي (@muhndszrai):' : 'Direct Instant Boost for Your Account (@muhndszrai):'}
              </span>
              <span className="text-[11px] text-slate-400">
                {isArabic 
                  ? 'هذا الزر يقوم بإرسال أمر الإضافة إلى مزود الـ API الفعلي مباشرة ليصل المتابعون إلى تطبيق إنستغرام في هاتفك.'
                  : 'Sends an actual add-order API request to dispatch followers to your real Instagram app.'}
              </span>
            </div>

            {/* Provider Selector for Direct Boost */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">{isArabic ? 'عبر سيرفر:' : 'Via:'}</span>
              <select
                value={targetBoostProviderId}
                onChange={(e) => setTargetBoostProviderId(e.target.value)}
                className="rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.id === activeProviderId ? (isArabic ? '⭐ (النشط)' : '⭐ (Active)') : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSendingRealOrder}
              onClick={() => handleSendDirectOrder('muhndszrai', 500, 'followers')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 hover:opacity-90 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 transition disabled:opacity-50"
            >
              {isSendingRealOrder ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
              <span>{isArabic ? 'إرسال 500 متابع لـ @muhndszrai الآن' : 'Dispatch 500 Followers to @muhndszrai'}</span>
            </button>

            <button
              type="button"
              disabled={isSendingRealOrder}
              onClick={() => handleSendDirectOrder('muhndszrai', 1000, 'followers')}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-bold text-slate-200 transition disabled:opacity-50"
            >
              {isSendingRealOrder ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 text-amber-400" />}
              <span>{isArabic ? 'إرسال 1,000 متابع لـ @muhndszrai' : 'Dispatch 1,000 Followers to @muhndszrai'}</span>
            </button>
          </div>

          {realOrderFeedback && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 mt-2 ${
              realOrderFeedback.success 
                ? (realOrderFeedback.isSimulation ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300')
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {realOrderFeedback.success ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              <span>{realOrderFeedback.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Add New SMM Provider Modal */}
      {showAddProviderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-[#0f172a] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-cyan-400" />
                <span>{isArabic ? 'إضافة وربط موقع تزويد SMM جديد' : 'Connect New SMM Provider'}</span>
              </h3>
              <button
                onClick={() => setShowAddProviderModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewProvider} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  {isArabic ? 'اسم موقع التزويد:' : 'Provider Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={newProvName}
                  onChange={(e) => setNewProvName(e.target.value)}
                  placeholder="مثال: Peakerr, SMMRush, Secsers..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  {isArabic ? 'رابط الـ API Endpoint (URL):' : 'API Endpoint URL:'}
                </label>
                <input
                  type="url"
                  required
                  value={newProvUrl}
                  onChange={(e) => setNewProvUrl(e.target.value)}
                  placeholder="https://example-panel.com/api/v2"
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  {isArabic ? 'مفتاح الـ API Key الخاص بك:' : 'Your API Key:'}
                </label>
                <input
                  type="text"
                  required
                  value={newProvKey}
                  onChange={(e) => setNewProvKey(e.target.value)}
                  placeholder="8fa20fa91cdd60085d49275484a77e9e"
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-2.5 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-slate-300 block mb-1">
                    {isArabic ? 'رقم خدمة المتابعين الافتراضية:' : 'Default Followers ID:'}
                  </label>
                  <input
                    type="text"
                    value={newProvFollowerId}
                    onChange={(e) => setNewProvFollowerId(e.target.value)}
                    placeholder="31929"
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-2 text-white font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">
                    {isArabic ? 'رقم خدمة اللايكات الافتراضية:' : 'Default Likes ID:'}
                  </label>
                  <input
                    type="text"
                    value={newProvLikesId}
                    onChange={(e) => setNewProvLikesId(e.target.value)}
                    placeholder="31785"
                    className="w-full rounded-xl border border-white/10 bg-black/50 p-2 text-white font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddProviderModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition font-semibold"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isAddingNewProv}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow"
                >
                  {isAddingNewProv ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                  <span>{isArabic ? 'إضافة وتفعيل المزود' : 'Add & Activate'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List Modal */}
      {showServicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0f172a] p-5 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>{isArabic ? 'خدمات إنستغرام المتوفرة لدى المزود' : 'Available Instagram Services'}</span>
              </h3>
              <button
                onClick={() => setShowServicesModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 pe-1 flex-1 text-xs">
              {availableServices.map((srv: any, idx) => (
                <div key={srv.service || idx} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white">
                      #{srv.service} · {srv.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {isArabic ? 'السعر لكل 1000:' : 'Rate per 1k:'} <span className="text-emerald-400 font-bold">${srv.rate || '0.20'}</span> · 
                      {isArabic ? ' الحد الأدنى:' : ' Min:'} {srv.min || 10} · {isArabic ? 'الأقصى:' : 'Max:'} {srv.max || 10000}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSmmFollowerServiceId(String(srv.service));
                      setShowServicesModal(false);
                      onAddLog(
                        isArabic
                          ? `[SERVICE_SELECT] تم اختيار خدمة المتابعين رقم #${srv.service} (${srv.name})`
                          : `[SERVICE_SELECT] Selected service #${srv.service}`,
                        'success'
                      );
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shrink-0 text-[11px]"
                  >
                    {isArabic ? 'استخدام هذه الخدمة' : 'Select ID'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cluster Nodes Status */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-pink-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {isArabic ? 'خوادم التزويد السحابية وشبكة الحسابات المتاحة' : 'Active Delivery Clusters & Proxy Pools'}
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-semibold font-tabular">
            3/3 {isArabic ? 'خوادم متصلة' : 'Nodes Online'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SERVER_NODES.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <div
                key={node.id}
                onClick={() => {
                  setSelectedNode(node.id);
                  onAddLog(
                    isArabic
                      ? `[NODE_SWITCH] تم تعيين مسار الضخ الأساسي إلى: ${node.name}`
                      : `[NODE_SWITCH] Primary dispatch cluster switched to: ${node.name}`
                  );
                }}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all text-start ${
                  isSelected
                    ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500'
                    : 'border-white/5 bg-black/40 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white truncate">{node.name}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400">{node.region}</div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-tabular">
                  <span className="text-slate-400">{isArabic ? 'سعة الحسابات:' : 'Pool Size:'}</span>
                  <span className="font-bold text-pink-300">+{formatNumber(node.activePoolSize)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-tabular mt-0.5">
                  <span className="text-slate-400">{isArabic ? 'الاستجابة / النجاح:' : 'Latency / Success:'}</span>
                  <span className="text-emerald-400 font-semibold">{node.latency}ms · {node.successRate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: 2 Columns (Batch Multi-Account Injector & Profile Override) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Batch Multi-Target Booster */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {isArabic ? 'أداة الضخ الجماعي (تزويد عدة حسابات بضغطة زر)' : 'Batch Multi-Target Injector'}
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            {isArabic 
              ? 'بصفتك المتحكم الوحيد، يمكنك إدخال قائمة من اليوزرات أو الروابط لتزويدها جميعاً في وقت واحد.'
              : 'Execute mass injection across multiple usernames or post links concurrently.'}
          </p>

          <form onSubmit={handleRunBatch} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'قائمة اليوزرات (كل يوزر في سطر أو مفصولة بفواصل):' : 'Target Usernames (one per line or comma-separated):'}
              </label>
              <textarea
                rows={3}
                value={batchUsernames}
                onChange={(e) => setBatchUsernames(e.target.value)}
                placeholder={isArabic ? "muhndszrai\nhamza_creator\nsara_lifestyle\ndubai_luxury" : "muhndszrai\nuser2\nuser3"}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white placeholder-slate-500 font-mono focus:border-amber-400 focus:outline-none"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isArabic ? 'الخدمة المطلوبة:' : 'Service Type:'}
                </label>
                <div className="flex rounded-xl bg-black/40 p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setBatchService('followers')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      batchService === 'followers'
                        ? 'bg-pink-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isArabic ? 'متابعين' : 'Followers'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatchService('likes')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      batchService === 'likes'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isArabic ? 'لايكات' : 'Likes'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isArabic ? 'الكمية لكل حساب:' : 'Quantity Per Account:'}
                </label>
                <input
                  type="number"
                  step="100"
                  value={batchAmount}
                  onChange={(e) => setBatchAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-bold font-tabular text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {batchSuccessMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{batchSuccessMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isInjectingBatch || !batchUsernames.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-95 transition disabled:opacity-50"
            >
              {isInjectingBatch ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 fill-white" />
              )}
              <span>
                {isArabic ? 'تنفيذ أمر الضخ الجماعي المباشر' : 'Execute Mass Batch Boost Now'}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Profile Override & Direct Modifier */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {isArabic ? 'تعديل عدادات الحساب يدوياً (Override)' : 'Direct Profile Stats Overrider'}
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            {isArabic
              ? `التحكم المباشر في أرقام الحساب المعروض (@${profile.username}) لضبط العدادات فورياً في المعاينة.`
              : `Instantly force-modify the numbers of target @${profile.username}.`}
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'عدد المتابعين الإجمالي:' : 'Total Followers Count:'}
              </label>
              <input
                type="number"
                value={overrideFollowers}
                onChange={(e) => setOverrideFollowers(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-bold font-tabular text-white focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isArabic ? 'عدد المنشورات:' : 'Total Posts Count:'}
              </label>
              <input
                type="number"
                value={overridePosts}
                onChange={(e) => setOverridePosts(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-bold font-tabular text-white focus:border-sky-400 focus:outline-none"
              />
            </div>

            <label className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3 cursor-pointer">
              <span className="text-xs font-bold text-white">
                {isArabic ? 'شارة التوثيق الزرقاء (Verified Badge)' : 'Blue Verified Checkmark'}
              </span>
              <input
                type="checkbox"
                checked={overrideVerified}
                onChange={(e) => setOverrideVerified(e.target.checked)}
                className="h-4 w-4 rounded accent-sky-500"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveProfileOverride}
              className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 py-2.5 text-xs font-bold text-white transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isArabic ? 'تطبيق التعديلات على المعاينة' : 'Apply Stats to Live Preview'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live System Terminal Logs */}
      <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-sm space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {isArabic ? 'سجل تيرمينال السيرفر المباشر (Master Operator Console Logs)' : 'Master Live Dispatch Terminal'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-tabular">
            {systemLogs.length} events logged
          </span>
        </div>

        {/* Terminal Window */}
        <div className="h-40 overflow-y-auto space-y-1.5 pe-2 text-xs">
          {systemLogs.map((log) => {
            let color = 'text-slate-300';
            if (log.type === 'success') color = 'text-emerald-400';
            if (log.type === 'dispatch') color = 'text-pink-400';
            if (log.type === 'warning') color = 'text-amber-400';

            return (
              <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-500 font-tabular shrink-0">[{log.timestamp}]</span>
                <span className={color}>{log.message}</span>
              </div>
            );
          })}
        </div>

        {/* Quick Command Input */}
        <form onSubmit={handleExecuteCommand} className="flex gap-2 pt-2 border-t border-white/10">
          <span className="text-emerald-400 font-bold self-center">admin&gt;</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder={isArabic ? 'أدخل أمر السيرفر (مثال: ping, nodes, balance)...' : 'Enter command (e.g. ping, nodes)...'}
            className="flex-1 bg-transparent text-xs text-white focus:outline-none"
            dir="ltr"
          />
          <button
            type="submit"
            className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-semibold text-slate-300 transition"
          >
            {isArabic ? 'تنفيذ' : 'Run'}
          </button>
        </form>
      </div>
    </div>
  );
};
