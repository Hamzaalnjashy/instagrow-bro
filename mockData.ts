import { InstagramProfile, InstagramPost, IncomingAccount, ServerNode, SystemLog } from '../types';

export const DEFAULT_INSTAGRAM_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2318181b'/><circle cx='50' cy='38' r='18' fill='%2352525b'/><path d='M20 86 C24 64 36 58 50 58 C64 58 76 64 80 86 Z' fill='%2352525b'/></svg>";

export const SAMPLE_AVATAR = DEFAULT_INSTAGRAM_AVATAR;
export const SAMPLE_POST_IMAGE = '/src/assets/images/sample_instagram_post_1790110992783.jpg';
export const HERO_IMAGE = '/src/assets/images/hero_social_growth_1790110969145.jpg';

export const DEFAULT_PROFILES: Record<string, InstagramProfile> = {
  'muhndszrai': {
    username: 'muhndszrai',
    fullName: 'muhndsHamza',
    avatarUrl: DEFAULT_INSTAGRAM_AVATAR,
    followers: 0,
    following: 0,
    postsCount: 0,
    bio: '',
    isVerified: false,
    isPrivate: false,
  },
  'hamza_creator': {
    username: 'hamza_creator',
    fullName: 'حمزة النعيمي | Hamza',
    avatarUrl: DEFAULT_INSTAGRAM_AVATAR,
    followers: 0,
    following: 0,
    postsCount: 0,
    bio: '',
    isVerified: false,
    isPrivate: false,
  }
};

export function getDefaultProfileForUsername(cleanHandle: string): InstagramProfile {
  const lower = cleanHandle.toLowerCase();
  if (DEFAULT_PROFILES[lower]) {
    return DEFAULT_PROFILES[lower];
  }

  // Generate consistent realistic baseline profile metrics based on username hash
  let hash = 0;
  for (let i = 0; i < cleanHandle.length; i++) {
    hash = (hash << 5) - hash + cleanHandle.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const followers = 1200 + (absHash % 4800);
  const following = 180 + (absHash % 420);
  const postsCount = 12 + (absHash % 68);

  const initial = (cleanHandle.charAt(0) || 'U').toUpperCase();
  const initialAvatar = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ec4899'/><stop offset='100%' stop-color='%238b5cf6'/></linearGradient></defs><circle cx='50' cy='50' r='50' fill='url(%23g)'/><text x='50%' y='56%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, -apple-system, sans-serif' font-size='42' font-weight='800' fill='%23ffffff'>${initial}</text></svg>`;

  return {
    username: cleanHandle,
    fullName: cleanHandle.includes('_') ? cleanHandle.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : cleanHandle,
    avatarUrl: initialAvatar,
    followers,
    following,
    postsCount,
    bio: `حساب رسمي موثق | @${cleanHandle} • جاهز للتزويد الفوري الآمن`,
    isVerified: absHash % 5 === 0,
    isPrivate: false,
  };
}

export const SAMPLE_POSTS: InstagramPost[] = [
  {
    id: 'post_1',
    url: 'https://instagram.com/p/DB94kL1sX9/',
    imageUrl: SAMPLE_POST_IMAGE,
    caption: 'غروب ساحر من قلب دبي، الأفق يتجدد كل يوم بإلهام جديد 🌆✨ #دبي #سياحة #تصوير #فخامة',
    likes: 1240,
    commentsCount: 86,
    timestamp: 'منذ ساعتين',
    authorUsername: 'hamza_creator',
  },
  {
    id: 'post_2',
    url: 'https://instagram.com/p/DC12mN8vK2/',
    imageUrl: SAMPLE_POST_IMAGE,
    caption: 'النجاح ليس صدفة، بل عمل مستمر وشغف لا ينتهي 💡 ما هي أهدافكم لهذا الأسبوع؟',
    likes: 840,
    commentsCount: 42,
    timestamp: 'منذ يوم',
    authorUsername: 'hamza_creator',
  },
  {
    id: 'post_3',
    url: 'https://instagram.com/p/DC89qR3pZ4/',
    imageUrl: SAMPLE_POST_IMAGE,
    caption: 'تفاصيل معمارية مذهلة تعكس مستقبل الابتكار والتصميم العالمي ✨',
    likes: 2150,
    commentsCount: 130,
    timestamp: 'منذ 3 أيام',
    authorUsername: 'hamza_creator',
  }
];

export const INCOMING_ACCOUNTS_POOL: IncomingAccount[] = [
  {
    id: 'acc_1',
    username: 'faisal_alotaibi',
    name: 'فيصل العتيبي',
    avatar: SAMPLE_AVATAR,
    country: 'السعودية 🇸🇦',
    timeAgo: 'الآن',
    tier: 'خليجي نشط',
  },
  {
    id: 'acc_2',
    username: 'nour_alsharif',
    name: 'نور الشريف',
    avatar: SAMPLE_AVATAR,
    country: 'الإمارات 🇦🇪',
    timeAgo: 'منذ ثانيتين',
    tier: 'حساب موثق',
  },
  {
    id: 'acc_3',
    username: 'tariq_lifestyle',
    name: 'طارق الزهراني',
    avatar: SAMPLE_AVATAR,
    country: 'الكويت 🇰🇼',
    timeAgo: 'منذ 5 ثوانٍ',
    tier: 'عربي نشط',
  },
  {
    id: 'acc_4',
    username: 'mariam.designs',
    name: 'مريم القحطاني',
    avatar: SAMPLE_AVATAR,
    country: 'قطر 🇶🇦',
    timeAgo: 'منذ 8 ثوانٍ',
    tier: 'خليجي متفاعل',
  },
  {
    id: 'acc_5',
    username: 'alexandra_wanderlust',
    name: 'Alexandra K.',
    avatar: SAMPLE_AVATAR,
    country: 'عالمي 🌍',
    timeAgo: 'منذ 10 ثوانٍ',
    tier: 'عالمي نشط',
  },
  {
    id: 'acc_6',
    username: 'dr_khalid_md',
    name: 'د. خالد العمري',
    avatar: SAMPLE_AVATAR,
    country: 'البحرين 🇧🇭',
    timeAgo: 'منذ 12 ثانية',
    tier: 'عالي الجودة',
  },
  {
    id: 'acc_7',
    username: 'reem_aesthetic',
    name: 'ريم الدوسري',
    avatar: SAMPLE_AVATAR,
    country: 'عمان 🇴🇲',
    timeAgo: 'منذ 15 ثانية',
    tier: 'خليجي نشط',
  },
  {
    id: 'acc_8',
    username: 'lucas_photographer',
    name: 'Lucas Meyer',
    avatar: SAMPLE_AVATAR,
    country: 'عالمي 🌍',
    timeAgo: 'منذ 18 ثانية',
    tier: 'عالمي موثوق',
  },
  {
    id: 'acc_9',
    username: 'bader_tech',
    name: 'بدر التميمي',
    avatar: SAMPLE_AVATAR,
    country: 'السعودية 🇸🇦',
    timeAgo: 'منذ 20 ثانية',
    tier: 'صانع محتوى',
  }
];

export const SERVER_NODES: ServerNode[] = [
  {
    id: 'node_riyadh_01',
    name: 'سيرفر الرياض والخليج #1 (Arab High-Speed Cluster)',
    region: 'الرياض، المملكة العربية السعودية 🇸🇦',
    activePoolSize: 245000,
    status: 'optimal',
    latency: 18,
    successRate: 99.8,
  },
  {
    id: 'node_dubai_02',
    name: 'سيرفر دبي السحابي #2 (UAE & Explore Acceleration)',
    region: 'دبي، الإمارات العربية المتحدة 🇦🇪',
    activePoolSize: 180000,
    status: 'optimal',
    latency: 24,
    successRate: 99.6,
  },
  {
    id: 'node_global_03',
    name: 'سيرفر فرانكفورت الدولي #3 (Global 365-Day Retention)',
    region: 'فرانكفورت، ألمانيا 🇩🇪',
    activePoolSize: 520000,
    status: 'optimal',
    latency: 42,
    successRate: 99.9,
  }
];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log_1',
    timestamp: '14:02:18',
    type: 'success',
    message: 'المتحكم الرئيسي متصل بنجاح: Hamza (ha888mza0@gmail.com) - صلاحيات كاملة غير محدودة.',
  },
  {
    id: 'log_2',
    timestamp: '14:02:22',
    type: 'info',
    message: 'تمت مزامنة 3 خوادم ضخ (Riyadh, Dubai, Frankfurt) بإجمالي 945,000 حساب نشط.',
  },
  {
    id: 'log_3',
    timestamp: '14:02:25',
    type: 'dispatch',
    message: 'جاهز لتنفيذ أي أمر تزويد متابعين أو لايكات فورياً بدون أي قيود أو اشتراكات.',
  }
];

export const HASHTAG_PRESETS = [
  {
    category: 'لايف ستايل وتصوير (Lifestyle & Photo)',
    tags: [
      '#اكسبلور_فولو', '#انستغرام', '#تصويري', '#لايف_ستايل', '#فوتوغرافي',
      '#explore', '#instagram', '#picoftheday', '#lifestyle', '#vibes'
    ],
    reach: '98K - 240K'
  },
  {
    category: 'أعمال وتجارة رقمية (Business & Growth)',
    tags: [
      '#ريادة_أعمال', '#تسويق_إلكتروني', '#نجاح', '#بزنس', '#تجارة_رقمية',
      '#entrepreneur', '#businessgrowth', '#digitalmarketing', '#success', '#mindset'
    ],
    reach: '65K - 180K'
  },
  {
    category: 'السياحة والسفر الفاخر (Travel & Luxury)',
    tags: [
      '#سياحة', '#سفر', '#دبي', '#الرياض', '#فخامة',
      '#travelgram', '#luxury', '#wanderlust', '#dubailife', '#beautifuldestinations'
    ],
    reach: '120K - 350K'
  },
  {
    category: 'ريلز وتيك توك فايرل (Viral Reels)',
    tags: [
      '#ريلز_explor', '#ترند', '#ريلز_جديد', '#فيديوهات_ترند', '#اكسبلور',
      '#reelsinstagram', '#viralreels', '#trending', '#explorepage', '#reelsvideo'
    ],
    reach: '250K - 700K'
  }
];


