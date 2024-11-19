import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar } from 'lucide-react';
import { useStore } from '../store';
import { useFormattedDate } from '../hooks/useFormattedDate';

export function TodoForm() {
  const addTodo = useStore((state) => state.addTodo);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [notes, setNotes] = useState('');
  const { format } = useFormattedDate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return;

    addTodo({
      title,
      dueDate,
      notes,
    });

    setTitle('');
    setDueDate(undefined);
    setNotes('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          required
        />
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="w-full px-4 py-2 border rounded-md text-left flex items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <Calendar size={16} />
          {dueDate ? format(dueDate, true) : 'Select Due Date and Time'}
        </button>
        {showDatePicker && (
          <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
            <DayPicker
              mode="single"
              selected={dueDate}
              onSelect={(date) => {
                if (date) {
                  const now = new Date();
                  date.setHours(now.getHours());
                  date.setMinutes(now.getMinutes());
                }
                setDueDate(date);
                setShowDatePicker(false);
              }}
              className="dark:text-white"
            />
            {dueDate && (
              <div className="p-4 border-t dark:border-gray-700">
                <input
                  type="time"
                  value={
                    dueDate
                      ? `${String(dueDate.getHours()).padStart(
                          2,
                          '0'
                        )}:${String(dueDate.getMinutes()).padStart(2, '0')}`
                      : ''
                  }
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value
                      .split(':')
                      .map(Number);
                    const newDate = new Date(dueDate);
                    newDate.setHours(hours);
                    newDate.setMinutes(minutes);
                    setDueDate(newDate);
                  }}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}
