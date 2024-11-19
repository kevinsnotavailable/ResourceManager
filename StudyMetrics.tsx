import React from 'react';
import { Clock, CheckSquare, Target, Flame } from 'lucide-react';
import { useStore } from '../../store';
import { calculateStudyMetrics } from '../../utils/analytics';

export function StudyMetrics() {
  const { worksheets, todos } = useStore();
  const metrics = calculateStudyMetrics(worksheets, todos);

  const cards = [
    {
      title: 'Study Hours',
      value: `${metrics.totalHours}h ${metrics.totalMinutes}m`,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Tasks Completed',
      value: metrics.tasksCompleted,
      icon: CheckSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Current Streak',
      value: `${metrics.currentStreak} days`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Best Streak',
      value: `${metrics.bestStreak} days`,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}