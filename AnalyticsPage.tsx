import React from 'react';
import { StudyMetrics } from '../components/analytics/StudyMetrics';
import { ProgressChart } from '../components/analytics/ProgressChart';
import { StudyStreak } from '../components/analytics/StudyStreak';
import { YearlyGoals } from '../components/analytics/YearlyGoals';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StudyMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <StudyStreak />
      </div>

      <YearlyGoals />
    </div>
  );
}