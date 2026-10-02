import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ChevronDown, 
  Sparkles,
  Zap
} from 'lucide-react';

interface SafetyGuideProps {
  isArabic: boolean;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ isArabic }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isArabic ? 'هل أحتاج لإدخال كلمة سر حسابي في إنستغرام؟' : 'Do I ever need to enter my Instagram password?',
      a: isArabic 
        ? 'قطعاً لا! نظامنا لا يطلب ولا يحتاج كلمة المرور إطلاقاً. نحتاج فقط اسم المستخدم (اليوزر) أو رابط المنشور المراد تزويده باللايكات، مما يجعل العملية آمنة 100% ويستحيل أن تتعرض للاختراق.'
        : 'Never! We strictly operate 100% password-free. All we need is your public username or post URL, keeping your account entirely safe.'
    },
    {
      q: isArabic ? 'هل يمكن أن يتعرض حسابي للحظر أو Shadowban؟' : 'Is there any risk of account suspension or shadowban?',
      a: isArabic 
        ? 'لا. نعتمد تقنية Smart Drip-Feed التي تضخ المتابعين والتفاعل تدريجياً وبمعدلات متوافقة بدقة مع حدود خوارزميات إنستغرام الرسمية لتبدو حركة الزيادة طبيعية 100% كأنها حملة إعلانية مروّجة.'
        : 'No risk. Our Smart Drip-Feed delivery throttles account delivery within official Instagram velocity boundaries to simulate organic promotion.'
    },
    {
      q: isArabic ? 'هل ينقص عدد المتابعين بعد التزويد؟ وما هو الضمان؟' : 'Do followers drop over time? What is the warranty?',
      a: isArabic 
        ? 'نحن نستخدم حسابات عالية الجودة (High Retention). نقدم ضمان تعويض مجاني لمدة 365 يوماً؛ في حال حدوث أي نقص طفيف يتم التعويض تلقائياً بنقرة زر واحدة من صفحة سجل الطلبات.'
        : 'We use high-retention profiles backed by an automatic 365-day refill warranty if any drop occurs.'
    },
    {
      q: isArabic ? 'كم يستغرق وصول المتابعين واللايكات؟' : 'How long does delivery take?',
      a: isArabic 
        ? 'في وضع "التسليم الفوري تيربو"، يبدأ التدفق خلال 2 إلى 5 دقائق من تأكيد الطلب، ويكتمل حسب الكمية (عادة من 15 دقيقة إلى ساعتين للكميات الكبيرة).'
        : 'In Turbo mode, delivery kicks off within 2 to 5 minutes, usually finishing within 15-45 minutes depending on quantity.'
    },
    {
      q: isArabic ? 'كيف أستفيد من زيادة اللايكات لرفع المنشور إلى Explore؟' : 'How do likes help my post get on the Explore page?',
      a: isArabic 
        ? 'خوارزمية إنستغرام تراقب سرعة التفاعل في أول ساعتين من نشر البوست. عندما يحصل منشورك على لايكات وحفظ (Saves) فور نشره، يصنفه النظام كمحتوى فيروسي (Viral) ويعرضه في صفحة استكشاف لآلاف المستخدمين الجدد.'
        : 'Instagram prioritizes early velocity. High likes + saves within the first hour signal viral potential, pushing your media onto the Explore grid.'
    }
  ];

  return (
    <div className="space-y-8 text-start max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isArabic ? 'سياسة الأمان الفائق وضمان 365 يوم' : 'Security Standards & 365-Day Guarantee'}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {isArabic 
            ? 'كل ما يهمك معرفته حول حماية حسابك من قيود الخوارزميات وكيفية عمل شبكة التزويد الآمنة.' 
            : 'Everything you need to know regarding algorithm compliance and account safety.'}
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-white">
            {isArabic ? 'بدون كلمة سر نهائياً' : 'Zero Password Required'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isArabic 
              ? 'لا نطلب ولن نطلب أبداً كلمة مرور حسابك. يوزرك العام فقط يكفي لإرسال المتابعين واللايكات.' 
              : 'Public username or post link is all that is ever required. Your credentials stay 100% private.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-white">
            {isArabic ? 'ضمان تعويض 365 يوماً' : '365-Day Refill Warranty'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isArabic 
              ? 'تزويد ذو ثبات عالي جداً مع حماية كاملة وتعويض مجاني تلقائي في حال حدوث أي نقص في المتابعين.' 
              : 'High retention profiles with zero-friction automatic refill anytime within a full year.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-white">
            {isArabic ? 'خوارزمية التنقيط الطبيعي' : 'Natural Drip-Feed Algorithm'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isArabic 
              ? 'توزيع التفاعل على فترات متباعدة لمنع أي تنبيهات أمنية وتوافق تام مع تحديثات إنستغرام لسنة 2026.' 
              : 'Smart pacing mimics natural viral spikes without triggering security rate-limits.'}
          </p>
        </div>
      </div>

      {/* Safety Checklist */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3">
        <h3 className="text-sm font-bold text-white">
          {isArabic ? 'إرشادات ذهبية لحماية وتنشيط حسابك:' : 'Golden Rules for Safe Instagram Growth:'}
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{isArabic ? 'تأكد من أن حسابك "عام" (Public) وليس خاصاً (Private) أثناء تنفيذ طلب المتابعين أو اللايكات.' : 'Ensure your profile is set to Public while delivery is in flight.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{isArabic ? 'انشر صورة أو ريلز جديد بالتزامن مع تزويد المتابعين لمضاعفة التفاعل الأولي ورفع نسبة المشاهدة.' : 'Post fresh content concurrently with follower delivery to capitalize on new incoming views.'}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{isArabic ? 'لا تقم بتغيير اسم المستخدم (Username) الخاص بالحساب حتى تكتمل عملية التزويد بنجاح.' : 'Avoid renaming your username until the delivery status shows 100% completed.'}</span>
          </li>
        </ul>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white">
          {isArabic ? 'الأسئلة الشائعة والأكثر تكراراً' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-slate-900/60 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-start text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
