import { useEffect } from 'react';
import { useStore } from '../store';
import { calculateContrast } from '../utils/theme';

export function useTheme() {
  const { theme, customTheme } = useStore((state) => state.settings);

  const getCurrentTheme = () => {
    if (theme === 'auto') {
      const hour = new Date().getHours();
      return hour >= 21 || hour < 9 ? 'dark' : 'light';
    }
    return theme;
  };

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = getCurrentTheme();
      document.documentElement.classList.remove('light', 'dark', 'custom');
      
      if (theme === 'custom' && customTheme) {
        document.documentElement.classList.add('custom');
        document.documentElement.style.setProperty('--custom-bg', customTheme.backgroundColor);
        document.documentElement.style.setProperty('--custom-text', customTheme.textColor);
      } else {
        document.documentElement.classList.add(currentTheme);
        document.documentElement.style.removeProperty('--custom-bg');
        document.documentElement.style.removeProperty('--custom-text');
      }
    };

    updateTheme();

    if (theme === 'auto') {
      const interval = setInterval(updateTheme, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [theme, customTheme]);

  return getCurrentTheme();
}