import React, { useState } from 'react';
import { Moon, Sun, Monitor, Calendar, Palette, RotateCcw, AlertTriangle } from 'lucide-react';
import { useStore } from '../store';
import { useFormattedDate } from '../hooks/useFormattedDate';
import { calculateContrast, isValidHexColor } from '../utils/theme';
import type { ThemeMode, DateFormat, CustomTheme } from '../types';

export function SettingsPage() {
  const { theme, dateFormat, customTheme, recentThemes } = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const { format, formatFull } = useFormattedDate();
  const now = new Date();

  const [bgColor, setBgColor] = useState(customTheme?.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(customTheme?.textColor || '#000000');
  const [showContrastWarning, setShowContrastWarning] = useState(false);

  const handleThemeChange = (newTheme: ThemeMode) => {
    updateSettings({ theme: newTheme });
  };

  const handleDateFormatChange = (newFormat: DateFormat) => {
    updateSettings({ dateFormat: newFormat });
  };

  const handleColorChange = (type: 'bg' | 'text', color: string) => {
    const newColor = color.toUpperCase();
    if (!isValidHexColor(newColor)) return;

    const otherColor = type === 'bg' ? textColor : bgColor;
    const contrast = calculateContrast(newColor, otherColor);
    setShowContrastWarning(contrast < 4.5);

    if (type === 'bg') {
      setBgColor(newColor);
    } else {
      setTextColor(newColor);
    }

    if (theme === 'custom') {
      updateSettings({
        customTheme: {
          backgroundColor: type === 'bg' ? newColor : bgColor,
          textColor: type === 'text' ? newColor : textColor,
          timestamp: Date.now(),
        },
      });
    }
  };

  const applyCustomTheme = () => {
    handleThemeChange('custom');
    updateSettings({
      customTheme: {
        backgroundColor: bgColor,
        textColor: textColor,
        timestamp: Date.now(),
      },
    });
  };

  const applyRecentTheme = (theme: CustomTheme) => {
    setBgColor(theme.backgroundColor);
    setTextColor(theme.textColor);
    handleThemeChange('custom');
    updateSettings({ customTheme: theme });
  };

  const resetCustomTheme = () => {
    setBgColor('#ffffff');
    setTextColor('#000000');
    setShowContrastWarning(false);
    handleThemeChange('light');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Theme Settings</h2>
        
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              theme === 'light'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Sun size={24} className="text-yellow-500" />
            <span className="font-medium dark:text-white">Light</span>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Moon size={24} className="text-blue-500" />
            <span className="font-medium dark:text-white">Dark</span>
          </button>

          <button
            onClick={() => handleThemeChange('auto')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              theme === 'auto'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Monitor size={24} className="text-purple-500" />
            <span className="font-medium dark:text-white">Auto</span>
          </button>

          <button
            onClick={() => handleThemeChange('custom')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              theme === 'custom'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Palette size={24} className="text-green-500" />
            <span className="font-medium dark:text-white">Custom</span>
          </button>
        </div>

        {theme === 'custom' && (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Background Color
                </label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => handleColorChange('bg', e.target.value)}
                    className="h-10 w-20"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => handleColorChange('bg', e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Text Color
                </label>
                <div className="flex gap-4">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="h-10 w-20"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {showContrastWarning && (
                <div className="flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                  <AlertTriangle size={16} />
                  <span className="text-sm">
                    Warning: The contrast ratio between these colors may make text difficult to read
                  </span>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={applyCustomTheme}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply Colors
                </button>
                <button
                  onClick={resetCustomTheme}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              {recentThemes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recent Themes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentThemes.map((theme, index) => (
                      <button
                        key={index}
                        onClick={() => applyRecentTheme(theme)}
                        className="w-8 h-8 rounded border"
                        style={{
                          backgroundColor: theme.backgroundColor,
                          borderColor: theme.textColor,
                        }}
                        title={`${theme.backgroundColor} / ${theme.textColor}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <p>This is how your custom theme will look.</p>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Auto theme switches based on time:
          <br />
          Dark mode: 7 PM - 9 AM
          <br />
          Light mode: 9 AM - 7 PM
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Date Format</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleDateFormatChange('US')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              dateFormat === 'US'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Calendar size={24} className="text-green-500" />
            <span className="font-medium dark:text-white">US Format</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">MM/DD/YYYY</span>
          </button>

          <button
            onClick={() => handleDateFormatChange('UK')}
            className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              dateFormat === 'UK'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Calendar size={24} className="text-green-500" />
            <span className="font-medium dark:text-white">UK Format</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">DD/MM/YYYY</span>
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>Short: {format(now)}</p>
            <p>Full: {formatFull(now)}</p>
            <p>With Time: {format(now, true)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}