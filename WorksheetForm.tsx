import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar, Tag, X } from 'lucide-react';
import { useStore } from '../store';
import { useFormattedDate } from '../hooks/useFormattedDate';

export function WorksheetForm() {
  const addWorksheet = useStore((state) => state.addWorksheet);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [notes, setNotes] = useState('');
  const { format } = useFormattedDate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorksheet({
      title,
      subject,
      tags,
      dueDate,
      notes,
      completed: false,
    });
    setTitle('');
    setSubject('');
    setTags([]);
    setDueDate(undefined);
    setNotes('');
  };

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
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

      <div>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          required
        />
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Add tags"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addTag())
            }
            className="flex-1 min-w-0 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={addTag}
            className="shrink-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <Tag size={16} /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-2 dark:text-gray-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="w-full px-4 py-2 border rounded-md text-left flex items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <Calendar size={16} />
          {dueDate ? format(dueDate) : 'Select Due Date'}
        </button>
        {showDatePicker && (
          <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
            <DayPicker
              mode="single"
              selected={dueDate}
              onSelect={(date) => {
                setDueDate(date);
                setShowDatePicker(false);
              }}
              className="dark:text-white"
            />
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
        Add Worksheet
      </button>
    </form>
  );
}
