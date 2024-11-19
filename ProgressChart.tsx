import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { useStore } from '../../store';
import { getStudyHeatmap } from '../../utils/analytics';

export function ProgressChart() {
  const { worksheets, todos } = useStore();
  const heatmap = useMemo(() => getStudyHeatmap(worksheets, todos), [worksheets, todos]);

  const getIntensityClass = (value: number) => {
    if (value === 0) return 'bg-gray-100 dark:bg-gray-700';
    if (value <= 2) return 'bg-green-100 dark:bg-green-900';
    if (value <= 4) return 'bg-green-300 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Study Activity
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {heatmap.map((day, index) => (
          <div
            key={index}
            className={`aspect-square rounded-sm ${getIntensityClass(day.value)}`}
            title={`${day.date.toLocaleDateString()}: ${day.value} activities`}
          />
        ))}
      </div>

      <div className="flex justify-end items-center gap-2 mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">Less</span>
        <div className="flex gap-1">
          {[0, 2, 4, 6].map((value) => (
            <div
              key={value}
              className={`w-3 h-3 rounded-sm ${getIntensityClass(value)}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">More</span>
      </div>
    </div>
  );
}