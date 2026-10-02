import { SmmServiceOffer, ServiceType } from '../types';

// ==========================================
// 1. INSTAGRAM FOLLOWERS (متابعين إنستغرام)
// ==========================================
export const PROVIDER_FOLLOWER_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '31929',
    name: 'Instagram Followers [Max 10M | Old Accounts | 30 Days Refill | Cancel Enable]',
    nameAr: 'متابعون حسابات قديمة موثوقة (ضمان تعويض 30 يوم - Peakerr)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.40,
    min: 50,
    max: 10000000,
    speedAr: 'سريع وفوري (10K - 50K يومياً)',
    refillAr: 'ضمان تعويض 30 يوم (Auto Refill)',
    badgeAr: 'الأفضل قيمة في Peakerr 🔥',
    descriptionAr: 'حسابات إنستغرام قديمة ومستقرة، ميزة إلغاء وتعديل نشطة وضمان تعويض 30 يوم بسعر جملة منافس.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '31934',
    name: 'Instagram Followers [Max 1M | Real Accounts With Posts | Low Drop]',
    nameAr: 'متابعون حسابات حقيقية ناشطة مع منشورات (أعلى جودة طبيعية)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 1.13,
    min: 50,
    max: 1000000,
    speedAr: 'تدفق طبيعي آمن (5K يومياً)',
    refillAr: 'معدل نقص شبه معدوم (Low Drop)',
    badgeAr: 'حسابات حقيقية بمنشورات ⭐',
    descriptionAr: 'متابعون من حسابات حقيقية تحتوي على صور وبوستات وبيو كامل لتعزيز مظهر الحساب الاحترافي.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '36642',
    name: 'Instagram Followers HQ [Refill-365 Days Warranty]',
    nameAr: 'متابعون جودة VIP (ضمان تعويض سنة كاملة 365 يوم)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 2.24,
    min: 50,
    max: 500000,
    speedAr: 'سرعة منتظمة (20K يومياً)',
    refillAr: 'ضمان سنة كاملة 365 يوم ذهبي',
    badgeAr: 'ضمان 365 يوم 🛡️',
    descriptionAr: 'أقوى ضمان تعويض على الإطلاق لمدة سنة كاملة، ثبات عالي جداً مع زر تعويض فوري عند أي تحديث لإنستغرام.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '31787',
    name: 'Instagram Followers [Max 10M | Old Accounts | Cancel Enable | Eco]',
    nameAr: 'باقة التوفير السريع 10M (أرخص سعر في Peakerr)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.39,
    min: 100,
    max: 10000000,
    speedAr: 'تدفق سريع (50,000 يومياً)',
    refillAr: 'سعر اقتصادي مباشر',
    badgeAr: 'أرخص سعر 💰',
    descriptionAr: 'أكبر سعة استيعابية تصل إلى 10 ملايين متابع بأقل تكلفة لكل ألف متابع.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '10350',
    name: 'Instagram Followers [HQ Real - Speed 20K/D - R30 - Non Drop]',
    nameAr: 'متابعون جودة فائقة (ضمان تعويض 30 يوم - خادم JAP)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.66,
    min: 50,
    max: 100000,
    speedAr: 'فوري (يبدأ خلال دقيقة)',
    refillAr: 'ضمان تعويض 30 يوم (Auto Refill)',
    badgeAr: 'الأكثر طلباً في JAP ⭐',
    descriptionAr: 'حسابات حقيقية ونشطة بمظهر طبيعي وصور بروفايل كاملة، مع ميزة التعويض التلقائي عند أي نقص.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '8410',
    name: 'Instagram Followers [Real Active - Arabic & Gulf Targeted]',
    nameAr: 'متابعون حقيقيون عرب وخليجيون متفاعلون (حسابات عربية)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 1.85,
    min: 50,
    max: 50000,
    speedAr: 'تدفق طبيعي آمن (1K-3K يومياً)',
    refillAr: 'ضمان تعويض 60 يوم ذهبي',
    badgeAr: 'حسابات عربية 🇸🇦🇦🇪',
    descriptionAr: 'متابعون بأسماء وحسابات عربية حقيقية 100% لزيادة التفاعل وبناء المصداقية في الخليج والوطن العربي.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '525',
    name: 'Instagram Followers [500K Mega Pool] [AUTO R30 - Instant]',
    nameAr: 'متابعون سعة ضخمة 500K (ضمان أوتوماتيكي دائم)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.78,
    min: 100,
    max: 500000,
    speedAr: 'سرعة عالية (50,000 يومياً)',
    refillAr: 'ضمان تعويض أوتوماتيكي مستمر',
    badgeAr: 'سعة نصف مليون 🚀',
    descriptionAr: 'مخصص للحسابات الكبيرة والشركات التي تبحث عن سعة عملاقة تصل حتى نصف مليون متابع بثبات تام.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '10420',
    name: 'Instagram Followers [Super Fast - 100K/Day - Instant Start]',
    nameAr: 'متابعون سرعة البرق (بدء فوري خلال 60 ثانية - 100 ألف/يوم)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.95,
    min: 100,
    max: 200000,
    speedAr: 'خارق السرعة (100 ألف يومياً)',
    refillAr: 'ضمان تعويض 30 يوم',
    badgeAr: 'سرعة البرق ⚡',
    descriptionAr: 'أسرع سيرفر في المنصة؛ يبدأ الإرسال فور الضغط مباشرة دون أي تأخير زمني وبسرعات تدفق قصوى.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '3120',
    name: 'Instagram Followers [Eco Budget - Cheap & Stable]',
    nameAr: 'الباقة الاقتصادية المخفضة (أرخص سعر للمبتدئين)',
    category: 'followers',
    platform: 'instagram',
    ratePer1k: 0.48,
    min: 100,
    max: 50000,
    speedAr: 'متوسط (5K-10K يومياً)',
    refillAr: 'بدون تعويض (سعر اقتصادي مخفض)',
    badgeAr: 'أوفر سعر JAP 💰',
    descriptionAr: 'الحل المثالي للتوفير والحصول على أكبر عدد من المتابعين بأقل ميزانية ممكنة.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 2. INSTAGRAM LIKES (إعجابات إنستغرام)
// ==========================================
export const PROVIDER_LIKES_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '31785',
    name: 'Instagram Likes [Max 500K | HQ Real Accounts | Low Drop | 365 Days Refill]',
    nameAr: 'لايكات جودة فائقة HQ (ضمان تعويض 365 يوم - Peakerr)',
    category: 'likes',
    platform: 'instagram',
    ratePer1k: 0.08,
    min: 20,
    max: 500000,
    speedAr: 'فوري وسريع (50K يومياً)',
    refillAr: 'ضمان تعويض 365 يوم',
    badgeAr: 'أقوى جودة لايكات ❤️🔥',
    descriptionAr: 'لايكات من حسابات حقيقية ذات جودة عالية جداً، غير قابلة للنقص مع ضمان تعويض سنة كاملة.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '36643',
    name: 'Instagram Likes [Fast Server - Instant Start]',
    nameAr: 'لايكات فورية فائقة السرعة (أرخص سعر في Peakerr)',
    category: 'likes',
    platform: 'instagram',
    ratePer1k: 0.04,
    min: 50,
    max: 100000,
    speedAr: 'فوري خلال 15 ثانية',
    refillAr: 'ثبات عالي',
    badgeAr: 'أوفر سعر لايكات 💰',
    descriptionAr: 'إعجابات رخيصة وفورية لدعم المنشورات والريلز والصور فور نشرها مباشرة.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '102',
    name: 'Instagram Likes [HQ Real - Instant Start - 50K/Day]',
    nameAr: 'إعجابات فورية حقيقية للمنشورات والريلز (خادم JAP)',
    category: 'likes',
    platform: 'instagram',
    ratePer1k: 0.22,
    min: 50,
    max: 50000,
    speedAr: 'فوري خلال ثوانٍ',
    refillAr: 'ثابتة 100% بدون نقص',
    badgeAr: 'الأكثر طلباً JAP ❤️',
    descriptionAr: 'لايكات فورية تبدأ فوراً على أي بوست أو ريلز لرفع التفاعل وجذب الجمهور.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '105',
    name: 'Instagram Likes [Arab Active - Real Profiles]',
    nameAr: 'لايكات عربية حقيقية من حسابات خليجية وعربية',
    category: 'likes',
    platform: 'instagram',
    ratePer1k: 0.65,
    min: 50,
    max: 25000,
    speedAr: 'فوري خلال 5 دقائق',
    refillAr: 'ضمان مدى الحياة',
    badgeAr: 'لايكات عربية 🇸🇦',
    descriptionAr: 'إعجابات من حسابات عربية حقيقية ترفع تقييم منشورك في خوارزميات إنستغرام.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 3. INSTAGRAM REELS & VIDEO VIEWS (مشاهدات ريلز وفيديو)
// ==========================================
export const PROVIDER_VIEWS_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '32803',
    name: 'Instagram Reels + Video Views [Max 100M | Instant | Normal Speed]',
    nameAr: 'مشاهدات ريلز وفيديو فائقة السرعة (Peakerr)',
    category: 'views',
    platform: 'instagram',
    ratePer1k: 0.001,
    min: 100,
    max: 100000000,
    speedAr: 'فوري (1M يومياً)',
    refillAr: 'ثبات دائم مدى الحياة',
    badgeAr: 'أرخص مشاهدات بالعالم ⚡',
    descriptionAr: 'سعر خرافي 0.001$ فقط لكل ألف مشاهدة! مثالي لدفع الريلز إلى تريند الإكسبلور وجلب متابعين حقيقيين.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '31766',
    name: 'Instagram Video Views [Max Unlimited | All Links | Cancel Enable | Day 1M]',
    nameAr: 'مشاهدات فيديو وريلز سعة غير محدودة (Peakerr Unlimited)',
    category: 'views',
    platform: 'instagram',
    ratePer1k: 0.0011,
    min: 100,
    max: 2147483647,
    speedAr: 'سرعة البرق (1,000,000 يومياً)',
    refillAr: 'ضمان بدون نقص',
    badgeAr: 'سعة مفتوحة 🚀',
    descriptionAr: 'سعة استيعابية مليارية بدون حد أقصى وتدفق عالي السرعة يدعم كل روابط الفيديو والريلز.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '9083',
    name: 'Instagram Reel Views + Impressions + Reach + Profile Visits [Explore Boost]',
    nameAr: 'حزمة الإكسبلور الكاملة: مشاهدات + وصول Reach + ظهور Impressions',
    category: 'views',
    platform: 'instagram',
    ratePer1k: 0.0054,
    min: 100,
    max: 1000000,
    speedAr: 'فوري وسريع (100K يومياً)',
    refillAr: 'ضمان وصول الإكسبلور',
    badgeAr: 'حزمة إكسبلور خوارزمية 📈',
    descriptionAr: 'لا يرفع المشاهدات فقط، بل يضخ زيارات بروفايل ومعدل وصول Reach وظهور خوارزمي لنشر الفيديو.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '201',
    name: 'Instagram Video / Reels Views [Instant - High Retention]',
    nameAr: 'مشاهدات ريلز وفيديو سريعة عالية الاحتفاظ (JAP)',
    category: 'views',
    platform: 'instagram',
    ratePer1k: 0.05,
    min: 100,
    max: 1000000,
    speedAr: 'فوري (500K يومياً)',
    refillAr: 'مدى الحياة',
    badgeAr: 'سرعة عالية JAP 👁️',
    descriptionAr: 'رفع عداد مشاهدات الريلز بنسبة احتفاظ عالية تدعم التفاعل العام للحساب.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '106',
    name: 'Instagram Reels Views + Profile Clicks [Targeted Algorithm]',
    nameAr: 'مشاهدات ريلز + نقرات الملف الشخصي (خوارزميات JAP)',
    category: 'views',
    platform: 'instagram',
    ratePer1k: 0.08,
    min: 100,
    max: 500000,
    speedAr: 'فوري وسريع',
    refillAr: 'ضمان 30 يوم',
    badgeAr: 'دعم الخوارزمية ⭐',
    descriptionAr: 'يدعم مشاهدة الفيديو بالكامل مع محاكاة التفاعل الطبيعي وتصفح الحساب.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 4. INSTAGRAM COMMENTS (تعليقات إنستغرام)
// ==========================================
export const PROVIDER_COMMENTS_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '15662',
    name: 'Instagram Comments [Random Emojis & Positive Engagement - Fast]',
    nameAr: 'تعليقات إيجابية وإيموجي تفاعلية (Peakerr Fast)',
    category: 'comments',
    platform: 'instagram',
    ratePer1k: 0.0885,
    min: 10,
    max: 5000,
    speedAr: 'فوري خلال دقائق',
    refillAr: 'ثابتة 100%',
    badgeAr: 'تعليقات تفاعلية فورية 💬',
    descriptionAr: 'تعليقات سريعة تتضمن إيموجيات وعبارات إيجابية مشجعة لرفع تفاعل المنشور وجذب الزوار.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '30437',
    name: 'Instagram Custom Comments [Max 100K | Real Accounts | Instant Start]',
    nameAr: 'تعليقات مخصصة Custom تكتبها بنفسك (Peakerr Custom)',
    category: 'comments',
    platform: 'instagram',
    ratePer1k: 3.717,
    min: 5,
    max: 100000,
    speedAr: 'تدفق سريع (50K يومياً)',
    refillAr: 'ثابتة بدون حذف',
    badgeAr: 'اكتب نص التعليقات بنفسك ✍️',
    descriptionAr: 'تحكم كامل بنص التعليق؛ اكتب التعليقات التي تريدها سطر بسطر ليتم نشرها من حسابات حقيقية.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '401',
    name: 'Instagram Custom Arabic Comments [Real Gulf Accounts]',
    nameAr: 'تعليقات عربية وخليجية مخصصة وموجهة (JAP Arabic)',
    category: 'comments',
    platform: 'instagram',
    ratePer1k: 2.80,
    min: 10,
    max: 20000,
    speedAr: 'تدفق طبيعي آمن',
    refillAr: 'ضمان دائم',
    badgeAr: 'تعليقات عربية 🇸🇦',
    descriptionAr: 'تعليقات مكتوبة باللغة العربية واللهجات الخليجية من حسابات موثوقة لتعزيز المصداقية والمبيعات.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '402',
    name: 'Instagram Emoji & High Praise Comments [Natural Dispersion]',
    nameAr: 'تعليقات مدح وتفاعل عالي مع إيموجي ناري (JAP Viral)',
    category: 'comments',
    platform: 'instagram',
    ratePer1k: 1.50,
    min: 10,
    max: 10000,
    speedAr: 'فوري خلال 5 دقائق',
    refillAr: 'ثبات دائم',
    badgeAr: 'تفاعل فايرل 🔥',
    descriptionAr: 'مجموعة من التعليقات الحماسية التي تزيد من معدل التحويل وتشجع المستخدمين على التفاعل.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 5. INSTAGRAM STORY VIEWS (مشاهدات ستوري وقصص)
// ==========================================
export const PROVIDER_STORY_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '17649',
    name: 'Instagram Story Views [MQ 30K | Instant Delivery]',
    nameAr: 'مشاهدات ستوري وقصص فورية (Peakerr Instant Story)',
    category: 'story',
    platform: 'instagram',
    ratePer1k: 0.0029,
    min: 10,
    max: 100000,
    speedAr: 'فوري خلال ثوانٍ',
    refillAr: 'ضمان مشاهدة كامل الستوري',
    badgeAr: 'أرخص مشاهدات ستوري ⭕',
    descriptionAr: 'مشاهدات فورية تظهر في قائمة مشاهدي الستوري لجميع القصص النشطة خلال 24 ساعة.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '10564',
    name: 'Instagram Story Views [All Stories | MQ 50K | Real Accounts]',
    nameAr: 'مشاهدات لجميع القصص المنشورة مع تفاعل تصويت واستطلاع (Peakerr)',
    category: 'story',
    platform: 'instagram',
    ratePer1k: 0.0035,
    min: 100,
    max: 1000000,
    speedAr: 'سرعة عالية (50K يومياً)',
    refillAr: 'ثبات كامل',
    badgeAr: 'يشمل كل الستوريات النشطة 📲',
    descriptionAr: 'يقوم بمشاهدة كل قصة منشورة في حسابك بالتساوي ويعزز وصول الستوري إلى المتابعين الحقيقيين.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '301',
    name: 'Instagram Story Views [Instant - Last Story & All Stories]',
    nameAr: 'مشاهدات ستوري فورية فائقة السرعة (خادم JAP)',
    category: 'story',
    platform: 'instagram',
    ratePer1k: 0.12,
    min: 50,
    max: 100000,
    speedAr: 'فوري خلال دقيقة',
    refillAr: 'ثبات 100%',
    badgeAr: 'بدء فوري JAP ⚡',
    descriptionAr: 'تدفق فوري لمشاهدي الستوري يبدأ بمجرد وضع اسم المستخدم فقط بدون الحاجة لكلمة سر.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '302',
    name: 'Instagram Story Poll Votes & Slider Engagement',
    nameAr: 'تفاعل ستوري: تصويت استطلاعات وسحب شريط الإيموجي',
    category: 'story',
    platform: 'instagram',
    ratePer1k: 0.28,
    min: 50,
    max: 20000,
    speedAr: 'فوري خلال دقائق',
    refillAr: 'تفاعل حقيقي',
    badgeAr: 'تصويت ستوري 🗳️',
    descriptionAr: 'يصوت على استطلاعات الرأي في الستوري أو يسحب مقياس الإيموجي لرفع تقييم تفاعل الحساب.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 6. INSTAGRAM SAVES & EXPLORE REACH (حفظ وإكسبلور)
// ==========================================
export const PROVIDER_SAVES_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '36344',
    name: 'Instagram Saves [Instant | Explore Algorithm Driver]',
    nameAr: 'حفظ المنشورات Saves الفوري (محفّز الإكسبلور Peakerr)',
    category: 'saves',
    platform: 'instagram',
    ratePer1k: 0.0028,
    min: 10,
    max: 100000,
    speedAr: 'فوري فائق السرعة',
    refillAr: 'دائم مدى الحياة',
    badgeAr: 'أرخص حفظ منشورات 🔖',
    descriptionAr: 'يعد حفظ المنشور المقياس الأهم لخوارزمية إنستغرام لترشيح المنشور للملايين في صفحة الإكسبلور.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '23076',
    name: 'Instagram Video Views + Impressions + Reach + Watch Hours [Ultra Fast]',
    nameAr: 'حزمة الوصول والظهور الشامل (Reach + Impressions + Watch Hours)',
    category: 'saves',
    platform: 'instagram',
    ratePer1k: 0.0017,
    min: 100,
    max: 2147483647,
    speedAr: 'خارق السرعة',
    refillAr: 'ثبات دائم',
    badgeAr: 'وصول Reach ملياري 📊',
    descriptionAr: 'يرفع إحصائيات المنشور في قسم الرؤى Insights: يزيد الوصول Reach، ومرات الظهور Impressions، وساعات المشاهدة.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '501',
    name: 'Instagram Post Saves + Shares [Viral Accelerator]',
    nameAr: 'حفظ بوستات + مشاركات Shares إلى أصدقاء (JAP Viral)',
    category: 'saves',
    platform: 'instagram',
    ratePer1k: 0.08,
    min: 50,
    max: 50000,
    speedAr: 'فوري خلال دقائق',
    refillAr: 'دائم',
    badgeAr: 'مشاركات وحفظ 🚀',
    descriptionAr: 'محاكاة مشاركة البوست وحفظه مما يعطي إشارة قوية للذكاء الاصطناعي الخاص بإنستغرام لنشره.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 7. TIKTOK SERVICES (خدمات تيك توك)
// ==========================================
export const PROVIDER_TIKTOK_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '24779',
    name: 'TikTok Video Views [Max 2.1B | Instant Start | Day 100M | Ultra Cheap]',
    nameAr: 'مشاهدات تيك توك فائقة السرعة وسعة 2 مليار (Peakerr TikTok Views)',
    category: 'tiktok',
    platform: 'tiktok',
    ratePer1k: 0.0042,
    min: 100,
    max: 2147483647,
    speedAr: 'فوري (100 مليون يومياً)',
    refillAr: 'دائم مدى الحياة',
    badgeAr: 'سعة 2 مليار تيك توك 🎵',
    descriptionAr: 'أرخص وأسرع مشاهدات تيك توك لدفع فيديوهاتك إلى صفحة For You وتصدر التريند العالمي.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '33162',
    name: 'TikTok Live Likes [Max 100M | Start 3 Min | Speed 700K/Day]',
    nameAr: 'لايكات بث مباشر تيك توك TikTok Live Likes (Peakerr)',
    category: 'tiktok',
    platform: 'tiktok',
    ratePer1k: 0.0154,
    min: 50,
    max: 100000000,
    speedAr: 'يبدأ خلال 3 دقائق (700K/يوم)',
    refillAr: 'تدفق حي أثناء البث',
    badgeAr: 'لايكات لايف تيك توك 🔴',
    descriptionAr: 'إرسال نقرات ولايكات للبث المباشر في تيك توك لتثبيت البث في قائمة الاقتراحات وجلب مشاهدين حقيقيين.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '29772',
    name: 'TikTok Followers [Max 300K | Instant Start | Day 100K]',
    nameAr: 'متابعون تيك توك بدء فوري (Peakerr TikTok Followers)',
    category: 'tiktok',
    platform: 'tiktok',
    ratePer1k: 0.2714,
    min: 10,
    max: 300000,
    speedAr: 'فوري (100K يومياً)',
    refillAr: 'بدء مباشر فوري',
    badgeAr: 'متابعو تيك توك سريعي التدفق ⚡',
    descriptionAr: 'زيادة متابعين تيك توك لفتح ميزة البث المباشر (1000 متابع) وتفعيل الربح من المشاهدات.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '601',
    name: 'TikTok Followers [HQ Real - 50K/Day - R30 Guarantee]',
    nameAr: 'متابعون تيك توك جودة عالية وضمان تعويض 30 يوم (JAP TikTok)',
    category: 'tiktok',
    platform: 'tiktok',
    ratePer1k: 1.20,
    min: 50,
    max: 50000,
    speedAr: 'فوري وسريع',
    refillAr: 'ضمان تعويض 30 يوم',
    badgeAr: 'ضمان 30 يوم تيك توك 🛡️',
    descriptionAr: 'حسابات حقيقية وصور بروفايل كاملة لتنمية وتوثيق حسابات تيك توك بموثوقية تامة.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '602',
    name: 'TikTok Likes [Real Active Users - Instant]',
    nameAr: 'إعجابات تيك توك من حسابات نشطة وفورية (JAP Likes)',
    category: 'tiktok',
    platform: 'tiktok',
    ratePer1k: 0.40,
    min: 50,
    max: 50000,
    speedAr: 'فوري خلال 60 ثانية',
    refillAr: 'ثبات دائم',
    badgeAr: 'لايكات تيك توك فورية ❤️',
    descriptionAr: 'إعجابات على مقاطع تيك توك ترفع نسبة وصول المقطع إلى الصفحة الرئيسية.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 8. YOUTUBE SERVICES (خدمات يوتيوب)
// ==========================================
export const PROVIDER_YOUTUBE_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '27583',
    name: 'YouTube Live Stream Views + Likes [15 Minutes Engagement]',
    nameAr: 'مشاهدات ولايكات بث مباشر يوتيوب Live Stream (Peakerr)',
    category: 'youtube',
    platform: 'youtube',
    ratePer1k: 0.051,
    min: 50,
    max: 5000000,
    speedAr: 'فوري أثناء البث',
    refillAr: 'ثبات طوال فترة البث',
    badgeAr: 'بث مباشر يوتيوب 🔴▶️',
    descriptionAr: 'رفع عدد مشاهدي البث المباشر في يوتيوب لرفع تصنيف البث في الصفحة الرئيسية ونتائج البحث.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '30836',
    name: 'YouTube Subscribers [Super Fast - High Retention]',
    nameAr: 'مشتركون يوتيوب حقيقيون (Peakerr Subscribers)',
    category: 'youtube',
    platform: 'youtube',
    ratePer1k: 0.2379,
    min: 10,
    max: 50000,
    speedAr: 'تدفق منتظم',
    refillAr: 'ضمان دائم',
    badgeAr: 'تحقيق شروط الدخل 1000 مشترك 💰',
    descriptionAr: 'مشتركون لقنوات يوتيوب للمساعدة في تفعيل شروط برنامج شركاء يوتيوب وتحقيق الدخل.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '701',
    name: 'YouTube High Retention Views [Monetizable - Real Traffic]',
    nameAr: 'مشاهدات يوتيوب احتفاظ عالي آمنة لتحقيق الدخل (JAP Views)',
    category: 'youtube',
    platform: 'youtube',
    ratePer1k: 0.95,
    min: 100,
    max: 500000,
    speedAr: 'تدفق طبيعي آمن (10K يومياً)',
    refillAr: 'ضمان تعويض مدى الحياة',
    badgeAr: 'ساعات مشاهدة حقيقية ⏳',
    descriptionAr: 'مشاهدات حقيقية ترفع ساعات المشاهدة في استوديو يوتيوب وتساعد في تحقيق الـ 4000 ساعة.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  },
  {
    serviceId: '702',
    name: 'YouTube Subscribers [Non Drop - Lifetime Warranty]',
    nameAr: 'مشتركون يوتيوب ثبات ذهبي مع ضمان تعويض مدى الحياة (JAP VIP)',
    category: 'youtube',
    platform: 'youtube',
    ratePer1k: 3.50,
    min: 50,
    max: 10000,
    speedAr: 'تدفق آمن',
    refillAr: 'ضمان مدى الحياة (Lifetime Refill)',
    badgeAr: 'ضمان مدى الحياة 🛡️',
    descriptionAr: 'أقوى خدمة مشتركين من حسابات مفعلة بالبريد، ثابتة وغير معرضة لحملات الحذف التلقائي.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// 9. TELEGRAM SERVICES (خدمات تليجرام)
// ==========================================
export const PROVIDER_TELEGRAM_OFFERS: SmmServiceOffer[] = [
  // --- Peakerr Offers ---
  {
    serviceId: '31146',
    name: 'Telegram Post Views [Max Unlimited | Instant Start | Last 1 Post]',
    nameAr: 'مشاهدات منشورات وقنوات تليجرام سعة غير محدودة (Peakerr Views)',
    category: 'telegram',
    platform: 'telegram',
    ratePer1k: 0.0018,
    min: 10,
    max: 2147483647,
    speedAr: 'فوري خلال ثوانٍ',
    refillAr: 'دائم مدى الحياة',
    badgeAr: 'أرخص مشاهدات تليجرام ✈️',
    descriptionAr: 'مشاهدات سريعة جداً لأي منشور في قناتك على تليجرام لزيادة مصداقية القناة ونسبة القراءة.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },
  {
    serviceId: '31207',
    name: 'Telegram Members [Max 1M | HQ Accounts | Superinstant | Day 100K]',
    nameAr: 'أعضاء قنوات ومجموعات تليجرام سريعة (Peakerr Telegram Members)',
    category: 'telegram',
    platform: 'telegram',
    ratePer1k: 0.0142,
    min: 10,
    max: 1000000,
    speedAr: 'خارق السرعة (100 ألف يومياً)',
    refillAr: 'بدء مباشر فوري',
    badgeAr: 'أعضاء تليجرام فوريين 👥',
    descriptionAr: 'زيادة عدد المشتركين في قنوات تليجرام العامة والخاصة لرفع مكانة القناة في محركات البحث.',
    providerId: 'peakerr',
    providerName: 'Peakerr API v2'
  },

  // --- JustAnotherPanel (JAP) Offers ---
  {
    serviceId: '801',
    name: 'Telegram Real Arab Members [Targeted Channels]',
    nameAr: 'أعضاء تليجرام عرب وخليجيين مهتمين (JAP Arab Members)',
    category: 'telegram',
    platform: 'telegram',
    ratePer1k: 0.85,
    min: 50,
    max: 25000,
    speedAr: 'تدفق طبيعي',
    refillAr: 'ضمان تعويض 30 يوم',
    badgeAr: 'أعضاء عرب 🇸🇦',
    descriptionAr: 'أعضاء عرب لقنوات الصفقات والتداول والأخبار والتقنية في تليجرام.',
    providerId: 'jap',
    providerName: 'JustAnotherPanel (JAP)'
  }
];

// ==========================================
// ALL OFFERS COMBINED & HELPERS
// ==========================================
export const ALL_SMM_OFFERS: SmmServiceOffer[] = [
  ...PROVIDER_FOLLOWER_OFFERS,
  ...PROVIDER_LIKES_OFFERS,
  ...PROVIDER_VIEWS_OFFERS,
  ...PROVIDER_COMMENTS_OFFERS,
  ...PROVIDER_STORY_OFFERS,
  ...PROVIDER_SAVES_OFFERS,
  ...PROVIDER_TIKTOK_OFFERS,
  ...PROVIDER_YOUTUBE_OFFERS,
  ...PROVIDER_TELEGRAM_OFFERS,
];

export const SERVICE_CATEGORIES = [
  { id: 'followers', nameAr: 'متابعين إنستغرام', nameEn: 'Instagram Followers', icon: 'Users', platform: 'instagram' },
  { id: 'likes', nameAr: 'لايكات وإعجابات', nameEn: 'Instagram Likes', icon: 'Heart', platform: 'instagram' },
  { id: 'views', nameAr: 'مشاهدات ريلز وفيديو', nameEn: 'Reels & Views', icon: 'Eye', platform: 'instagram' },
  { id: 'comments', nameAr: 'تعليقات وتفاعل', nameEn: 'Comments', icon: 'MessageCircle', platform: 'instagram' },
  { id: 'story', nameAr: 'مشاهدات ستوري', nameEn: 'Story Views', icon: 'CircleDot', platform: 'instagram' },
  { id: 'saves', nameAr: 'حفظ وإكسبلور', nameEn: 'Saves & Explore', icon: 'Bookmark', platform: 'instagram' },
  { id: 'tiktok', nameAr: 'خدمات تيك توك', nameEn: 'TikTok Services', icon: 'Music2', platform: 'tiktok' },
  { id: 'youtube', nameAr: 'خدمات يوتيوب', nameEn: 'YouTube Services', icon: 'PlaySquare', platform: 'youtube' },
  { id: 'telegram', nameAr: 'خدمات تليجرام', nameEn: 'Telegram Services', icon: 'Send', platform: 'telegram' },
] as const;

export function getOffersByCategory(category: ServiceType): SmmServiceOffer[] {
  switch (category) {
    case 'followers':
      return PROVIDER_FOLLOWER_OFFERS;
    case 'likes':
      return PROVIDER_LIKES_OFFERS;
    case 'views':
      return PROVIDER_VIEWS_OFFERS;
    case 'comments':
      return PROVIDER_COMMENTS_OFFERS;
    case 'story':
      return PROVIDER_STORY_OFFERS;
    case 'saves':
      return PROVIDER_SAVES_OFFERS;
    case 'tiktok':
      return PROVIDER_TIKTOK_OFFERS;
    case 'youtube':
      return PROVIDER_YOUTUBE_OFFERS;
    case 'telegram':
      return PROVIDER_TELEGRAM_OFFERS;
    default:
      return ALL_SMM_OFFERS.filter(o => o.category === category);
  }
}
