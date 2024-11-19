import { Worksheet, Todo } from '../types';
import { isToday, isYesterday, subDays, startOfYear, differenceInDays } from 'date-fns';

export function calculateStudyMetrics(worksheets: Worksheet[], todos: Todo[]) {
  const now = new Date();
  const startDate = startOfYear(now);
  
  // Calculate total study time (mock data - replace with actual tracking)
  const totalMinutes = worksheets.length * 45; // Assuming 45 min per worksheet
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Calculate completed tasks
  const tasksCompleted = worksheets.filter(w => w.completed).length + 
                        todos.filter(t => t.completed).length;

  // Calculate streaks
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;
  let streakStart: Date | null = null;

  // Create activity map for last 365 days
  const activityMap = new Map<string, boolean>();
  
  for (let i = 0; i < 365; i++) {
    const date = subDays(now, i);
    const dateStr = date.toISOString().split('T')[0];
    
    const hasWorksheetActivity = worksheets.some(w => 
      w.completed && isDateEqual(w.createdAt, date)
    );
    
    const hasTodoActivity = todos.some(t => 
      t.completed && isDateEqual(t.createdAt, date)
    );
    
    activityMap.set(dateStr, hasWorksheetActivity || hasTodoActivity);
  }

  // Calculate streaks
  let counting = true;
  for (let i = 0; i < 365; i++) {
    const date = subDays(now, i);
    const dateStr = date.toISOString().split('T')[0];
    
    if (activityMap.get(dateStr)) {
      tempStreak++;
      if (counting && (isToday(date) || isYesterday(date))) {
        currentStreak = tempStreak;
        if (!streakStart) {
          streakStart = date;
        }
      }
    } else {
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
      }
      tempStreak = 0;
      if (counting) {
        counting = false;
      }
    }
  }

  // Update best streak if current streak is higher
  if (tempStreak > bestStreak) {
    bestStreak = tempStreak;
  }

  return {
    totalHours,
    totalMinutes: remainingMinutes,
    tasksCompleted,
    currentStreak,
    bestStreak,
    streakStart,
  };
}

export function getStudyHeatmap(worksheets: Worksheet[], todos: Todo[]) {
  const now = new Date();
  const heatmap = [];

  for (let i = 0; i < 365; i++) {
    const date = subDays(now, i);
    const worksheetCount = worksheets.filter(w => 
      isDateEqual(w.createdAt, date)
    ).length;
    
    const todoCount = todos.filter(t => 
      isDateEqual(t.createdAt, date)
    ).length;

    heatmap.push({
      date,
      value: worksheetCount + todoCount,
    });
  }

  return heatmap.reverse();
}

export function calculateProgress(worksheets: Worksheet[], todos: Todo[]) {
  const yearStart = startOfYear(new Date());
  const daysPassed = differenceInDays(new Date(), yearStart);
  const daysInYear = 365;

  return {
    'Study Hours': Math.min(100, (worksheets.length * 45 / (200 * 60)) * 100),
    'Tasks Completed': Math.min(100, ((worksheets.filter(w => w.completed).length + 
      todos.filter(t => t.completed).length) / 200) * 100),
    'Year Progress': Math.min(100, (daysPassed / daysInYear) * 100),
  };
}

function isDateEqual(date1: Date, date2: Date): boolean {
  return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
}