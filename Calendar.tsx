import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useStore } from '../store';
import type { CalendarEvent } from '../types';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const EVENT_COLORS = {
  resource: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  reminder: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  custom: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  todo: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
};

interface DayEventsProps {
  date: Date;
  events: CalendarEvent[];
  maxEvents?: number;
}

function DayEvents({ date, events, maxEvents = 3 }: DayEventsProps) {
  const dayEvents = events.filter((event) => isSameDay(new Date(event.date), date));
  const displayEvents = dayEvents.slice(0, maxEvents);
  const remainingCount = dayEvents.length - maxEvents;

  return (
    <div className="space-y-1">
      {displayEvents.map((event) => (
        <div
          key={event.id}
          className={`px-2 py-1 rounded-md text-xs truncate ${EVENT_COLORS[event.type]}`}
          title={event.title}
        >
          {event.title}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
}

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const events = useStore((state) => state.events);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Adjust days array to start from Monday
  const firstDayOfWeek = monthStart.getDay();
  const prefixDays = Array((firstDayOfWeek + 6) % 7).fill(null);
  const allDays = [...prefixDays, ...days];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            {day}
          </div>
        ))}

        {allDays.map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                className="bg-gray-50 dark:bg-gray-800 p-2 min-h-[100px]"
              />
            );
          }

          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toISOString()}
              className={`bg-white dark:bg-gray-800 p-2 min-h-[100px] ${
                !isCurrentMonth ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(day, 'd')}
                </span>
                <button
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  aria-label="Add event"
                >
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <DayEvents date={day} events={events} />
            </div>
          );
        })}
      </div>
    </div>
  );
}