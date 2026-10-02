import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeDefinition, APP_THEMES } from '../data/themes';
import { safeStorage } from '../utils/storage';

const STORAGE_THEME_KEY = 'instagrow_theme_v1';

interface ThemeContextType {
  currentThemeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  theme: ThemeDefinition;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    const saved = safeStorage.getItem(STORAGE_THEME_KEY) as ThemeId;
    if (saved && APP_THEMES[saved]) {
      return saved;
    }
    // Default to the breathtaking Royal Emerald VIP theme
    return 'emerald';
  });

  const setThemeId = (id: ThemeId) => {
    if (APP_THEMES[id]) {
      setCurrentThemeId(id);
      safeStorage.setItem(STORAGE_THEME_KEY, id);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentThemeId);
  }, [currentThemeId]);

  const theme = APP_THEMES[currentThemeId] || APP_THEMES.emerald;
  const availableThemes = Object.values(APP_THEMES);

  return (
    <ThemeContext.Provider value={{ currentThemeId, setThemeId, theme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
