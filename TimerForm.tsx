import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useStore } from '../store';

export function TimerForm() {
  const addTimer = useStore((state) => state.addTimer);
  const [name, setName] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = 
      parseInt(hours) * 3600 + 
      parseInt(minutes) * 60 + 
      parseInt(seconds);
    
    if (duration > 0) {
      addTimer({
        name,
        duration,
      });
      setName('');
      setHours('0');
      setMinutes('0');
      setSeconds('0');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Timer Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Study Session"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hours
          </label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Minutes
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Seconds
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        <Clock size={16} />
        Create Timer
      </button>
    </form>
  );
}