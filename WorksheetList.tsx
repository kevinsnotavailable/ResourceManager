import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Tag, X } from 'lucide-react';
import { useStore } from '../store';
import { FileUpload } from './FileUpload';
import { FileList } from './FileList';
import type { Worksheet } from '../types';

interface WorksheetListProps {
  showControls?: boolean;
  limit?: number;
}

interface WorksheetModalProps {
  worksheet: Worksheet;
  onClose: () => void;
}

function WorksheetModal({ worksheet, onClose }: WorksheetModalProps) {
  const toggleComplete = useStore((state) => state.toggleComplete);
  const deleteWorksheet = useStore((state) => state.deleteWorksheet);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{worksheet.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{worksheet.subject}</p>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <div className="space-y-6">
            {worksheet.dueDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Due Date</h3>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar size={16} />
                  {format(worksheet.dueDate, 'PPP')}
                </p>
              </div>
            )}

            {worksheet.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{worksheet.notes}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {worksheet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <FileList worksheetId={worksheet.id} files={worksheet.files} />
              <FileUpload worksheetId={worksheet.id} />
            </div>

            <div className="flex justify-between pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => toggleComplete(worksheet.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Mark as {worksheet.completed ? 'Incomplete' : 'Complete'}
              </button>
              <button
                onClick={() => {
                  deleteWorksheet(worksheet.id);
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Worksheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorksheetList({ showControls = true, limit }: WorksheetListProps) {
  const worksheets = useStore((state) => state.worksheets);
  const [sortBy, setSortBy] = useState<'title' | 'dueDate'>('title');
  const [filterTag, setFilterTag] = useState<string>('');
  const [selectedWorksheet, setSelectedWorksheet] = useState<Worksheet | null>(null);
  
  const allTags = Array.from(new Set(worksheets.flatMap((w) => w.tags)));

  const sortedWorksheets = [...worksheets].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
  });

  const filteredWorksheets = filterTag
    ? sortedWorksheets.filter((w) => w.tags.includes(filterTag))
    : sortedWorksheets;

  const displayedWorksheets = limit
    ? filteredWorksheets.slice(0, limit)
    : filteredWorksheets;

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex gap-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'dueDate')}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="title">Sort by Title</option>
            <option value="dueDate">Sort by Due Date</option>
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedWorksheets.map((worksheet) => (
          <button
            key={worksheet.id}
            onClick={() => setSelectedWorksheet(worksheet)}
            className="text-left bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className={`text-lg font-semibold ${
              worksheet.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {worksheet.title}
            </h3>
            
            {worksheet.dueDate && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Calendar size={14} />
                {format(worksheet.dueDate, 'MMM d, yyyy')}
              </p>
            )}

            {worksheet.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {worksheet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedWorksheet && (
        <WorksheetModal
          worksheet={selectedWorksheet}
          onClose={() => setSelectedWorksheet(null)}
        />
      )}
    </div>
  );
}