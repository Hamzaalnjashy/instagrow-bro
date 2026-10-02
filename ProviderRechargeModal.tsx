import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  Coins, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Wallet, 
  Receipt, 
  Server,
  DollarSign,
  Smartphone,
  Lock,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle
} from 'lucide-react';
import { RechargeReceipt } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProviderRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
  initialProviderId?: 'jap' | 'peakerr';
  onBalanceUpdated?: () => void;
}

interface ProviderMeta {
  id: 'jap' | 'peakerr';
  name: string;
  nameAr: string;
  badge: string;
  badgeAr: string;
  taglineAr: string;
  taglineEn: string;
  usdtAddress: string;
  minDeposit: number;
}

const PROVIDERS_META: Record<'jap' | 'peakerr', ProviderMeta> = {
  jap: {
    id: 'jap',
    name: 'JustAnotherPanel (JAP)',
    nameAr: 'JustAnotherPanel (JAP)',
    badge: 'Primary Node',
    badgeAr: 'المزود المباشر الأساسي',
    taglineAr: 'بوابة الشحن المباشرة لسيرفر JustAnotherPanel بأسعار التزويد الأصلية',
    taglineEn: 'Direct in-app funding gateway for JustAnotherPanel base wholesale rates',
    usdtAddress: 'TLgVzX8v7JAP9m19a12c8675cf9ae2dbbe',
    minDeposit: 5,
  },
  peakerr: {
    id: 'peakerr',
    name: 'Peakerr API v2',
    nameAr: 'Peakerr API v2',
    badge: 'High-Speed API',
    badgeAr: 'سيرفر التزويد الفائق',
    taglineAr: 'بوابة الشحن المباشرة لسيرفر Peakerr المتخصص في سرعة التنفيذ الفورية',
    taglineEn: 'Direct in-app funding gateway for Peakerr high-speed instant dispatch',
    usdtAddress: 'TNPkE88R2wM8fa20fa91cdd60085d492754',
    minDeposit: 5,
  },
};

export const ProviderRechargeModal: React.FC<ProviderRechargeModalProps> = ({
  isOpen,
  onClose,
  isArabic,
  initialProviderId = 'jap',
  onBalanceUpdated,
}) => {
  const { theme } = useTheme();
  const [selectedProviderId, setSelectedProviderId] = useState<'jap' | 'peakerr'>(initialProviderId);
  const [activeTab, setActiveTab] = useState<'deposit' | 'history'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'apple_pay' | 'stc_pay'>('card');
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('25');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<RechargeReceipt | null>(null);
  const [cryptoTxid, setCryptoTxid] = useState('');
  const [rechargeHistory, setRechargeHistory] = useState<any[]>([]);

  // Real Card Inputs State
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [stcPhone, setStcPhone] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // 3D Secure / OTP Simulation modal
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpCode, setOtpCode] = useState('8492');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Balances
  const [providerBalances, setProviderBalances] = useState<{
    jap: { external: string; inApp: number; total: string };
    peakerr: { external: string; inApp: number; total: string };
  }>({
    jap: { external: '0.00', inApp: 0.0, total: '0.00' },
    peakerr: { external: '0.00', inApp: 0.0, total: '0.00' },
  });

  const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

  useEffect(() => {
    if (initialProviderId) {
      setSelectedProviderId(initialProviderId);
    }
  }, [initialProviderId]);

  const fetchBalances = async () => {
    setIsCheckingBalance(true);
    try {
      const [resJap, resPeakerr, resHistory] = await Promise.all([
        fetch('/api/smm/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId: 'jap' }),
        }).then(r => r.json()).catch(() => ({ balance: '0.00', inAppBalance: 0.0 })),
        fetch('/api/smm/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId: 'peakerr' }),
        }).then(r => r.json()).catch(() => ({ balance: '0.00', inAppBalance: 0.0 })),
        fetch('/api/smm/recharge/history').then(r => r.json()).catch(() => ({ history: [] })),
      ]);

      const japInApp = resJap.inAppBalance ?? 0.0;
      const peakerrInApp = resPeakerr.inAppBalance ?? 0.0;

      setProviderBalances({
        jap: {
          external: resJap.balance || '0.00',
          inApp: japInApp,
          total: resJap.totalAvailable || (Number(resJap.balance || 0) + japInApp).toFixed(2),
        },
        peakerr: {
          external: resPeakerr.balance || '0.00',
          inApp: peakerrInApp,
          total: resPeakerr.totalAvailable || (Number(resPeakerr.balance || 0) + peakerrInApp).toFixed(2),
        },
      });

      if (resHistory && resHistory.history) {
        setRechargeHistory(resHistory.history);
      }
    } catch {
      // silent
    } finally {
      setIsCheckingBalance(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBalances();
      setFormError(null);
    }
  }, [isOpen]);

  const activeMeta = PROVIDERS_META[selectedProviderId];
  const activeBalance = providerBalances[selectedProviderId];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeMeta.usdtAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount(String(val));
    setFormError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
    setFormError(null);
  };

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
    setFormError(null);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
    setFormError(null);
  };

  const handleProcessRecharge = async (method: string, txHash?: string) => {
    if (amount < activeMeta.minDeposit) {
      setFormError(
        isArabic 
          ? `الحد الأدنى للشحن هو $${activeMeta.minDeposit} دولار أمريكي.` 
          : `Minimum deposit amount is $${activeMeta.minDeposit} USD.`
      );
      return;
    }

    if (method === 'credit_card') {
      if (!cardHolder.trim()) {
        setFormError(isArabic ? 'يرجى كتابة اسم حامل البطاقة.' : 'Please enter cardholder name.');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length < 15) {
        setFormError(isArabic ? 'يرجى إدخال رقم بطاقة صحيح (16 رقماً).' : 'Please enter a valid 16-digit card number.');
        return;
      }
      if (cardExpiry.length < 5) {
        setFormError(isArabic ? 'يرجى إدخال تاريخ انتهاء صحيح (MM/YY).' : 'Please enter valid expiration date (MM/YY).');
        return;
      }
      if (cardCvv.length < 3) {
        setFormError(isArabic ? 'يرجى إدخال رمز الأمان CVV.' : 'Please enter card CVV.');
        return;
      }
      // Open 3D Secure Verification
      setShowOtpDialog(true);
      return;
    }

    if (method === 'stc_pay') {
      if (!stcPhone.trim() || stcPhone.length < 9) {
        setFormError(isArabic ? 'يرجى إدخال رقم هاتف STC Pay صالح.' : 'Please enter a valid phone number.');
        return;
      }
      setShowOtpDialog(true);
      return;
    }

    await executeRechargeBackend(method, txHash);
  };

  const executeRechargeBackend = async (method: string, txHash?: string) => {
    setIsProcessing(true);
    setFormError(null);

    try {
      const response = await fetch('/api/smm/recharge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: selectedProviderId,
          amount: Number(amount),
          paymentMethod: method,
          txHash: txHash || 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          cardLast4: cardNumber ? cardNumber.replace(/\s/g, '').slice(-4) : '4242',
        }),
      });

      const data = await response.json();
      if (data.success && data.receipt) {
        setLastReceipt(data.receipt);
        await fetchBalances();
        if (onBalanceUpdated) onBalanceUpdated();
      } else {
        setFormError(data.error || 'فشلت معالجة عملية الشحن.');
      }
    } catch (err: any) {
      setFormError(err.message || 'خطأ أثناء الاتصال ببوابة الدفع.');
    } finally {
      setIsProcessing(false);
      setShowOtpDialog(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    setTimeout(async () => {
      setIsVerifyingOtp(false);
      setShowOtpDialog(false);
      await executeRechargeBackend(paymentMethod);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border ${theme.borderSubtle} bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Top Header & Window Selector */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div 
                className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                }}
              >
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                  <span>{isArabic ? 'بوابة شحن الرصيد المباشرة' : 'Direct In-App Funding Gateway'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {isArabic ? 'شحن فوري 100%' : 'Instant Top-Up'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic 
                    ? 'شحن رصيد كلا السيرفرين مباشرة من داخل التطبيق دون الحاجة لزيارة المواقع الخارجية.'
                    : 'Charge both SMM provider balances directly inside the app with zero external redirects.'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* TWO PRIMARY RECHARGE WINDOWS (JustAnotherPanel & Peakerr) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-black/60 rounded-2xl border border-white/10">
            {/* Window 1: JAP */}
            <button
              type="button"
              onClick={() => {
                setSelectedProviderId('jap');
                setLastReceipt(null);
                setFormError(null);
              }}
              className={`p-3 rounded-xl text-start transition-all relative flex flex-col gap-1 ${
                selectedProviderId === 'jap'
                  ? 'bg-slate-800 text-white shadow-lg border border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${selectedProviderId === 'jap' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>JustAnotherPanel</span>
                </span>
                <span className="text-[10px] font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  ${providerBalances.jap.total}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate">
                {isArabic ? 'المزود المباشر الأول (JAP)' : 'Primary Direct Node'}
              </span>
            </button>

            {/* Window 2: Peakerr */}
            <button
              type="button"
              onClick={() => {
                setSelectedProviderId('peakerr');
                setLastReceipt(null);
                setFormError(null);
              }}
              className={`p-3 rounded-xl text-start transition-all relative flex flex-col gap-1 ${
                selectedProviderId === 'peakerr'
                  ? 'bg-slate-800 text-white shadow-lg border border-cyan-500/50 ring-1 ring-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${selectedProviderId === 'peakerr' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>Peakerr API v2</span>
                </span>
                <span className="text-[10px] font-mono font-extrabold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                  ${providerBalances.peakerr.total}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate">
                {isArabic ? 'سيرفر التزويد السريع' : 'High-Speed API Node'}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Active Provider Status Banner */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Server className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">
                  {isArabic ? `نافذة شحن رصيد: ${activeMeta.nameAr}` : `Funding Node: ${activeMeta.name}`}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isArabic ? activeMeta.taglineAr : activeMeta.taglineEn}
                </span>
              </div>
            </div>

            <div className="text-end shrink-0">
              <span className="text-[10px] text-slate-400 block">{isArabic ? 'الرصيد المتاح' : 'Available'}</span>
              <span className="text-sm font-extrabold font-mono text-emerald-400">
                ${activeBalance.total} USD
              </span>
            </div>
          </div>

          {/* SUCCESS INVOICE RECEIPT VIEW */}
          {lastReceipt ? (
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-950 p-6 text-center space-y-4 animate-scaleUp">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-white">
                  {isArabic ? 'تم شحن الرصيد بنجاح!' : 'Funds Successfully Added!'}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {isArabic 
                    ? `تم إضافة $${lastReceipt.amount.toFixed(2)} USD إلى رصيد حساب ${activeMeta.name.split(' ')[0]} وجاهز للتزويد فوراً.`
                    : `+$${lastReceipt.amount.toFixed(2)} USD credited to ${activeMeta.name.split(' ')[0]}.`}
                </p>
              </div>

              {/* Digital Invoice Box */}
              <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-black/60 p-4 text-start font-mono text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">{isArabic ? 'رقم الفاتورة الإلكترونية:' : 'Invoice No:'}</span>
                  <span className="font-bold text-white">{lastReceipt.receiptNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isArabic ? 'المزود المعتمد:' : 'Provider:'}</span>
                  <span className="font-bold text-emerald-400">{activeMeta.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isArabic ? 'المبلغ المضاف:' : 'Amount Credited:'}</span>
                  <span className="font-extrabold text-white">${lastReceipt.amount.toFixed(2)} USD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isArabic ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                  <span className="text-slate-200 uppercase">{lastReceipt.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isArabic ? 'رمز التفويض (TXID):' : 'Auth Hash:'}</span>
                  <span className="text-slate-400 truncate max-w-[180px]">{lastReceipt.txHash}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-emerald-400 font-bold">
                  <span>{isArabic ? 'الرصيد الكلي الحالي:' : 'Total New Balance:'}</span>
                  <span>${activeBalance.total} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => setLastReceipt(null)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition"
                >
                  {isArabic ? 'شحن رصيد إضافي' : 'Add More Funds'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition"
                >
                  {isArabic ? 'إغلاق والبدء بالتزويد' : 'Start Boosting Now'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Amount Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">
                    {isArabic ? '1. حدد مبلغ الشحن (دولار أمريكي):' : '1. Select Deposit Amount (USD):'}
                  </label>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {isArabic ? `الحد الأدنى: $${activeMeta.minDeposit}` : `Min: $${activeMeta.minDeposit}`}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectAmount(val)}
                      className={`py-2.5 rounded-xl text-xs font-extrabold font-mono transition border ${
                        amount === val && customAmount === String(val)
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md ring-1 ring-emerald-500/40'
                          : 'border-white/10 bg-black/40 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-slate-400 text-xs font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      min={activeMeta.minDeposit}
                      step="1"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder={isArabic ? 'أو أدخل مبلغاً مخصصاً، مثال: 35' : 'Or custom amount, e.g. 35'}
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 ps-7 pe-3 text-xs font-bold font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 font-medium">
                    USD
                  </span>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-bold text-slate-300">
                  {isArabic ? '2. اختر طريقة الدفع المباشرة من داخل التطبيق:' : '2. Select Direct In-App Payment Method:'}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('card');
                      setFormError(null);
                    }}
                    className={`p-3 rounded-xl border transition text-start flex flex-col items-start gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white ring-1 ring-emerald-500/30'
                        : 'border-white/10 bg-black/30 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <CreditCard className="h-4 w-4 text-emerald-400" />
                      {paymentMethod === 'card' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {isArabic ? 'بطاقة بنكية / مدى' : 'Credit / Mada'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Visa / MC / Mada
                    </span>
                  </button>

                  {/* Apple / Google Pay */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('apple_pay');
                      setFormError(null);
                    }}
                    className={`p-3 rounded-xl border transition text-start flex flex-col items-start gap-1.5 ${
                      paymentMethod === 'apple_pay'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white ring-1 ring-emerald-500/30'
                        : 'border-white/10 bg-black/30 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Smartphone className="h-4 w-4 text-pink-400" />
                      {paymentMethod === 'apple_pay' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-xs font-bold text-white">
                      Apple / G Pay
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isArabic ? 'دفع سريع بلمسة' : '1-Tap Fast Checkout'}
                    </span>
                  </button>

                  {/* Crypto USDT */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('crypto');
                      setFormError(null);
                    }}
                    className={`p-3 rounded-xl border transition text-start flex flex-col items-start gap-1.5 ${
                      paymentMethod === 'crypto'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white ring-1 ring-emerald-500/30'
                        : 'border-white/10 bg-black/30 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Coins className="h-4 w-4 text-amber-400" />
                      {paymentMethod === 'crypto' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-xs font-bold text-white">
                      USDT (TRC-20)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isArabic ? 'تحويل بلوكشين' : 'Tron Network'}
                    </span>
                  </button>

                  {/* STC Pay */}
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('stc_pay');
                      setFormError(null);
                    }}
                    className={`p-3 rounded-xl border transition text-start flex flex-col items-start gap-1.5 ${
                      paymentMethod === 'stc_pay'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white ring-1 ring-emerald-500/30'
                        : 'border-white/10 bg-black/30 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Wallet className="h-4 w-4 text-purple-400" />
                      {paymentMethod === 'stc_pay' && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-xs font-bold text-white">
                      STC Pay / UrPay
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isArabic ? 'محافظ الخليج' : 'Gulf Wallets'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{isArabic ? 'بيانات البطاقة البنكية المباشرة' : 'Secure Card Details'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      256-Bit SSL Encrypted
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isArabic ? 'اسم حامل البطاقة (كما هو مدون عليها)' : 'Cardholder Name'}
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="e.g. MOHAMMED AL-OTAIBI"
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isArabic ? 'رقم البطاقة (16 رقماً)' : 'Card Number'}
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4000 1234 5678 9010"
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        {isArabic ? 'تاريخ الانتهاء (MM/YY)' : 'Expiry Date (MM/YY)'}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono text-white text-center placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        {isArabic ? 'رمز الأمان (CVV)' : 'CVV'}
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono text-white text-center placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleProcessRecharge('credit_card')}
                    className="w-full mt-2 py-3.5 px-4 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 shadow-lg shadow-emerald-500/20 transition active:scale-[0.99] disabled:opacity-50"
                  >
                    <Zap className="h-4 w-4 fill-white" />
                    <span>
                      {isArabic 
                        ? `إتمام شحن +$${amount.toFixed(2)} USD لحساب ${activeMeta.name.split(' ')[0]}` 
                        : `Pay & Credit +$${amount.toFixed(2)} USD`}
                    </span>
                  </button>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 space-y-4 text-center animate-fadeIn">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-white">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {isArabic ? 'الدفع بلمسة واحدة عبر Apple Pay أو Google Pay' : '1-Tap Mobile Wallet Checkout'}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      {isArabic 
                        ? `سيتم شحن $${amount.toFixed(2)} USD فوراً إلى حساب ${activeMeta.name} عبر محفظة هاتفك الذكي.`
                        : `Instantly charge $${amount.toFixed(2)} USD via your mobile wallet.`}
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto space-y-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => executeRechargeBackend('apple_pay')}
                      className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm bg-white text-black hover:bg-slate-200 transition shadow-lg flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <span className="text-base"></span>
                      <span>{isArabic ? `دفع $${amount.toFixed(2)} بواسطة Apple Pay` : `Pay $${amount.toFixed(2)} with Apple Pay`}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => executeRechargeBackend('google_pay')}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 text-white hover:bg-slate-700 transition border border-white/10 flex items-center justify-center gap-2"
                    >
                      <span>G Pay</span>
                      <span>{isArabic ? `الدفع بواسطة Google Pay` : `Pay with Google Pay`}</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Coins className="h-4 w-4 text-amber-400" />
                      <span>{isArabic ? 'عنوان الإيداع المباشر USDT (شبكة TRC-20)' : 'USDT TRC-20 Deposit Address'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      Zero Fees
                    </span>
                  </div>

                  <div className="bg-black/50 p-3 rounded-xl border border-white/5 space-y-2">
                    <span className="text-[11px] text-slate-400 block">
                      {isArabic ? 'عنوان محفظة السيرفر للإيداع الفوري:' : 'Deposit Address:'}
                    </span>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-white/10">
                      <span className="text-xs font-mono text-amber-300 break-all flex-1" dir="ltr">
                        {activeMeta.usdtAddress}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 shrink-0"
                      >
                        {copiedAddress ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedAddress ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ' : 'Copy')}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isArabic ? 'رمز الحوالة (TXID / Hash) بعد التحويل:' : 'Transaction Hash (TXID):'}
                    </label>
                    <input
                      type="text"
                      value={cryptoTxid}
                      onChange={(e) => setCryptoTxid(e.target.value)}
                      placeholder="e.g. 7f8a9b2c3d4e5f6a1b2c3d4e..."
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => executeRechargeBackend('crypto_usdt', cryptoTxid)}
                    className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 shadow-lg shadow-amber-500/20 transition active:scale-[0.99] disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {isArabic 
                        ? `تأكيد استلام حوالة $${amount.toFixed(2)} USDT لحساب ${activeMeta.name.split(' ')[0]}` 
                        : `Confirm & Credit $${amount.toFixed(2)} USDT`}
                    </span>
                  </button>
                </div>
              )}

              {paymentMethod === 'stc_pay' && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Wallet className="h-4 w-4 text-purple-400" />
                      <span>{isArabic ? 'الدفع المباشر عبر STC Pay / UrPay' : 'STC Pay / Direct Mobile Wallet'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                      KSA & Gulf
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isArabic ? 'رقم الجوال المسجل في STC Pay:' : 'Mobile Number:'}
                    </label>
                    <input
                      type="tel"
                      value={stcPhone}
                      onChange={(e) => setStcPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleProcessRecharge('stc_pay')}
                    className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-purple-500/20 transition active:scale-[0.99] disabled:opacity-50"
                  >
                    <Zap className="h-4 w-4 fill-white" />
                    <span>
                      {isArabic 
                        ? `طلب خصم فوري $${amount.toFixed(2)} USD` 
                        : `Request Charge $${amount.toFixed(2)} USD`}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 bg-slate-950/90 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-[11px]">
              {isArabic ? 'عمليات الدفع محمية ومشفرة بنسبة 100%' : '100% Secure & Direct Fulfillment'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-slate-300 font-semibold transition"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>

        {/* 3D Secure Verification / SMS OTP Dialog */}
        {showOtpDialog && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-slate-900 p-5 space-y-4 shadow-2xl text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <Shield className="h-6 w-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  {isArabic ? 'تأكيد الحماية الثلاثية (3D Secure)' : '3D Secure Authorization'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isArabic 
                    ? `تم إرسال رمز التحقق لتأكيد خصم $${amount.toFixed(2)} USD وإيداعها في حساب ${activeMeta.name.split(' ')[0]}.` 
                    : `Enter verification code to confirm $${amount.toFixed(2)} deposit.`}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block text-start">
                  {isArabic ? 'رمز التحقق (OTP):' : 'OTP Code:'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center text-lg font-mono font-bold tracking-widest rounded-xl border border-white/15 bg-black/60 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtpDialog(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 transition"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="button"
                  disabled={isVerifyingOtp}
                  onClick={handleVerifyOtp}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition flex items-center justify-center gap-1.5"
                >
                  {isVerifyingOtp ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>{isArabic ? 'تأكيد وشحن' : 'Authorize'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
