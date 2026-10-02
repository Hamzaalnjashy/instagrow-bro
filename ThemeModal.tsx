import React from 'react';
import { X, Check, Palette, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId } from '../data/themes';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic: boolean;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, isArabic }) => {
  const { currentThemeId, setThemeId, availableThemes, theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl p-6 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: theme.primaryColor }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
            >
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isArabic ? 'تخصيص ألوان وتصميم التطبيق' : 'Customize Application Theme & Colors'}
              </h2>
              <p className="text-xs text-slate-400">
                {isArabic 
                  ? 'اختر النمط والباليت اللوني المفضل لديك، يتم التطبيق فورياً عبر كل الأقسام.' 
                  : 'Select your preferred visual style and color palette, applied instantly across all views.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-white/5 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="mt-5 space-y-3 max-h-[62vh] overflow-y-auto pr-1">
          {availableThemes.map((item) => {
            const isSelected = currentThemeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setThemeId(item.id as ThemeId)}
                className={`w-full text-start p-4 rounded-xl border transition-all relative overflow-hidden flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-white/30 bg-white/[0.08] shadow-lg ring-1'
                    : 'border-white/10 bg-slate-950/40 hover:bg-white/[0.04] hover:border-white/20'
                }`}
                style={{
                  borderColor: isSelected ? item.primaryColor : undefined,
                }}
              >
                {/* Left Side: Color preview circle & details */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Swatch circle */}
                  <div 
                    className="h-11 w-11 rounded-xl shadow-md shrink-0 flex items-center justify-center border border-white/20 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${item.primaryColor}, ${item.secondaryColor}, ${item.accentColor})`,
                    }}
                  >
                    {isSelected && <Check className="h-5 w-5 text-white drop-shadow-md stroke-[3]" />}
                  </div>

                  {/* Texts */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white truncate">
                        {isArabic ? item.nameAr : item.nameEn}
                      </span>
                      {isSelected && (
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                          style={{ background: item.primaryColor }}
                        >
                          {isArabic ? 'المحدد حالياً' : 'Active'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {isArabic ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>

                {/* Right Side: Visual Swatch Bar */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: item.primaryColor }} title="Primary" />
                  <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: item.secondaryColor }} title="Secondary" />
                  <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: item.accentColor }} title="Accent" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isArabic ? 'يتم حفظ اختيارك تلقائياً في المتصفح' : 'Your preference is saved automatically'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white transition shadow-md"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            }}
          >
            {isArabic ? 'تم وتطبيق اللون' : 'Done & Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};
