import React from 'react';
import { Target } from 'lucide-react';
import { useStore } from '../../store';
import { calculateProgress } from '../../utils/analytics';

export function YearlyGoals() {
  const { worksheets, todos } = useStore();
  const progress = calculateProgress(worksheets, todos);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Yearly Goals
        </h2>
      </div>

      <div className="space-y-6">
        {Object.entries(progress).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {key}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {value}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}