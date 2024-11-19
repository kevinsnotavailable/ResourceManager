import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { useStore } from '../../store';
import { calculateStudyMetrics } from '../../utils/analytics';

export function StudyStreak() {
  const { worksheets, todos } = useStore();
  const { currentStreak, bestStreak, streakStart } = calculateStudyMetrics(worksheets, todos);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Study Streak
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Streak
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentStreak}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                days
              </p>
            </div>
          </div>
          {streakStart && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Started {streakStart.toLocaleDateString()}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Best Streak
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {bestStreak}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}