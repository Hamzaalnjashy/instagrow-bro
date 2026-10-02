export type ThemeId = 'emerald' | 'sapphire' | 'cyber' | 'obsidian' | 'sunset';

export interface ThemeDefinition {
  id: ThemeId;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientPreview: string;
  bgBase: string;
  bgHero: string;
  bgCard: string;
  bgCardHover: string;
  borderSubtle: string;
  borderActive: string;
  textAccent: string;
  accentGradientText: string;
  accentGradientButton: string;
  accentGradientBar: string;
  shadowGlow: string;
  badgeStyle: string;
  iconGlow: string;
  glowBlob: string;
}

export const APP_THEMES: Record<ThemeId, ThemeDefinition> = {
  emerald: {
    id: 'emerald',
    nameAr: 'الزمرد الملكي والذهب (VIP)',
    nameEn: 'Royal Emerald & Gold',
    descAr: 'تصميم فاخر بألوان الأخضر الزمردي واللمسات الذهبية، يوحي بالثقة والنمو العالي والمكانة الملكية.',
    descEn: 'Prestigious deep emerald & gold palette, inspiring high trust and VIP growth.',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#f59e0b',
    gradientPreview: 'from-emerald-500 via-teal-500 to-amber-400',
    bgBase: 'bg-[#05110b]',
    bgHero: 'from-[#0b2216] via-[#07170f] to-[#05110b]',
    bgCard: 'bg-[#0c2419]/90',
    bgCardHover: 'hover:bg-[#0f2c1f]',
    borderSubtle: 'border-emerald-500/20',
    borderActive: 'border-emerald-500',
    textAccent: 'text-emerald-400',
    accentGradientText: 'from-emerald-400 via-teal-300 to-amber-300',
    accentGradientButton: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600',
    accentGradientBar: 'from-emerald-500 via-teal-400 to-amber-400',
    shadowGlow: 'shadow-emerald-500/20',
    badgeStyle: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    iconGlow: 'from-emerald-500 via-teal-500 to-amber-400',
    glowBlob: 'from-emerald-600/20 via-teal-500/15 to-amber-500/15',
  },
  sapphire: {
    id: 'sapphire',
    nameAr: 'الأزرق الملكي والسيان الكريستالي',
    nameEn: 'Sapphire Ocean & Diamond Cyan',
    descAr: 'طابع تقني فائق الأناقة يجمع بين كحلي السفير الملكي والأزرق السماوي الكريستالي لثقة مطلقة.',
    descEn: 'High-tech executive palette combining deep sapphire and diamond cyan.',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    gradientPreview: 'from-cyan-400 via-blue-500 to-indigo-500',
    bgBase: 'bg-[#060e1c]',
    bgHero: 'from-[#0c1a36] via-[#081226] to-[#060e1c]',
    bgCard: 'bg-[#0e2142]/90',
    bgCardHover: 'hover:bg-[#122852]',
    borderSubtle: 'border-cyan-500/20',
    borderActive: 'border-cyan-400',
    textAccent: 'text-cyan-400',
    accentGradientText: 'from-cyan-400 via-sky-300 to-blue-400',
    accentGradientButton: 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500',
    accentGradientBar: 'from-cyan-400 via-sky-400 to-blue-500',
    shadowGlow: 'shadow-cyan-500/25',
    badgeStyle: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    iconGlow: 'from-cyan-500 via-blue-600 to-indigo-600',
    glowBlob: 'from-cyan-500/20 via-blue-500/15 to-indigo-600/15',
  },
  cyber: {
    id: 'cyber',
    nameAr: 'النيون البنفسجي والسايبر (Electric Cyber)',
    nameEn: 'Electric Cyber & Neon Violet',
    descAr: 'طابع مستقبلي عصري يعتمد على البنفسجي المشع والفوشيا مع لمسات سيان كهرومغناطيسية.',
    descEn: 'Futuristic aesthetic with glowing electric violet, fuchsia, and cyan.',
    primaryColor: '#a855f7',
    secondaryColor: '#d946ef',
    accentColor: '#06b6d4',
    gradientPreview: 'from-purple-500 via-fuchsia-500 to-cyan-400',
    bgBase: 'bg-[#0c0817]',
    bgHero: 'from-[#170e2c] via-[#110a20] to-[#0c0817]',
    bgCard: 'bg-[#1a1233]/90',
    bgCardHover: 'hover:bg-[#221844]',
    borderSubtle: 'border-purple-500/20',
    borderActive: 'border-purple-500',
    textAccent: 'text-purple-400',
    accentGradientText: 'from-purple-400 via-fuchsia-300 to-cyan-300',
    accentGradientButton: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400',
    accentGradientBar: 'from-purple-500 via-fuchsia-500 to-cyan-400',
    shadowGlow: 'shadow-purple-500/25',
    badgeStyle: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    iconGlow: 'from-purple-600 via-fuchsia-600 to-pink-500',
    glowBlob: 'from-purple-600/20 via-fuchsia-500/15 to-cyan-500/15',
  },
  obsidian: {
    id: 'obsidian',
    nameAr: 'الأسود الكربوني والذهب الكهرماني (Stealth Gold)',
    nameEn: 'Stealth Obsidian & Amber Gold',
    descAr: 'تصميم تنفيذي فائق الفخامة والهدوء، أسود كربوني مطفأ مع إشعاع ذهبي كهرماني دافئ.',
    descEn: 'Executive stealth dark aesthetic with deep carbon matte and warm amber gold.',
    primaryColor: '#f59e0b',
    secondaryColor: '#eab308',
    accentColor: '#ea580c',
    gradientPreview: 'from-amber-400 via-yellow-500 to-orange-500',
    bgBase: 'bg-[#09090b]',
    bgHero: 'from-[#16151a] via-[#101014] to-[#09090b]',
    bgCard: 'bg-[#18181f]/90',
    bgCardHover: 'hover:bg-[#202029]',
    borderSubtle: 'border-amber-500/20',
    borderActive: 'border-amber-400',
    textAccent: 'text-amber-400',
    accentGradientText: 'from-amber-300 via-yellow-400 to-orange-400',
    accentGradientButton: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500',
    accentGradientBar: 'from-amber-400 via-yellow-400 to-orange-500',
    shadowGlow: 'shadow-amber-500/25',
    badgeStyle: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    iconGlow: 'from-amber-500 via-orange-500 to-yellow-600',
    glowBlob: 'from-amber-500/20 via-yellow-500/15 to-orange-500/15',
  },
  sunset: {
    id: 'sunset',
    nameAr: 'غروب إنستغرام الكلاسيكي المطور (Sunset)',
    nameEn: 'Modern Sunset & Rose Gold',
    descAr: 'تدرج غروب إنستغرام الدافئ الشهير بألوان التوت والوردي مع لمسات المشمش الذهبي.',
    descEn: 'Signature Instagram sunset warm gradient with berry pink, rose, and peach gold.',
    primaryColor: '#ec4899',
    secondaryColor: '#f43f5e',
    accentColor: '#f59e0b',
    gradientPreview: 'from-pink-500 via-rose-500 to-amber-400',
    bgBase: 'bg-[#0a0d14]',
    bgHero: 'from-[#141824] via-[#0f121c] to-[#0a0d14]',
    bgCard: 'bg-[#131726]/90',
    bgCardHover: 'hover:bg-[#1a1f33]',
    borderSubtle: 'border-pink-500/20',
    borderActive: 'border-pink-500',
    textAccent: 'text-pink-400',
    accentGradientText: 'from-pink-400 via-rose-400 to-amber-300',
    accentGradientButton: 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600',
    accentGradientBar: 'from-pink-500 via-rose-400 to-amber-400',
    shadowGlow: 'shadow-pink-500/25',
    badgeStyle: 'bg-pink-500/15 text-pink-300 border border-pink-500/30',
    iconGlow: 'from-amber-500 via-rose-500 to-fuchsia-600',
    glowBlob: 'from-pink-600/15 via-rose-500/10 to-amber-500/15',
  },
};
