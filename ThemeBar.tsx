import React from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId } from '../data/themes';

interface ThemeBarProps {
  isArabic: boolean;
  onOpenModal: () => void;
}

export const ThemeBar: React.FC<ThemeBarProps> = ({ isArabic, onOpenModal }) => {
  const { currentThemeId, setThemeId, availableThemes, theme } = useTheme();

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/30 p-2.5 sm:p-3 backdrop-blur-md mb-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <div 
            className="flex h-6 w-6 items-center justify-center rounded-lg text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
          >
            <Palette className="h-3.5 w-3.5" />
          </div>
          <span>{isArabic ? 'تصميم وألوان المظهر:' : 'Color Theme:'}</span>
          <span 
            className="font-bold text-xs px-2 py-0.5 rounded-md"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}22, ${theme.secondaryColor}22)`,
              color: theme.primaryColor,
              border: `1px solid ${theme.primaryColor}44`,
            }}
          >
            {isArabic ? theme.nameAr : theme.nameEn}
          </span>
        </div>

        {/* Theme Swatch Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {availableThemes.map((item) => {
            const isSelected = currentThemeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setThemeId(item.id as ThemeId)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'text-white shadow-sm font-bold scale-[1.03]'
                    : 'text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
                style={{
                  background: isSelected 
                    ? `linear-gradient(135deg, ${item.primaryColor}33, ${item.secondaryColor}22)` 
                    : undefined,
                  borderColor: isSelected ? item.primaryColor : undefined,
                  borderWidth: isSelected ? '1px' : undefined,
                }}
                title={isArabic ? item.nameAr : item.nameEn}
              >
                <span 
                  className="h-3 w-3 rounded-full border border-white/30 shrink-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${item.primaryColor}, ${item.secondaryColor})`,
                  }}
                >
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span className="hidden md:inline">
                  {isArabic ? item.nameAr.split(' ')[0] : item.nameEn.split(' ')[0]}
                </span>
              </button>
            );
          })}

          <button
            onClick={onOpenModal}
            className="ms-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>{isArabic ? 'المزيد...' : 'All Themes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
