import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, X } from 'lucide-react';
import { useStore } from '../store';
import { useFormattedDate } from '../hooks/useFormattedDate';
import type { Todo } from '../types';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
}

function TodoModal({ todo, onClose }: TodoModalProps) {
  const updateTodo = useStore((state) => state.updateTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const toggleTodoComplete = useStore((state) => state.toggleTodoComplete);
  const { formatFull } = useFormattedDate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{todo.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Due Date</h3>
              <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar size={16} />
                {formatFull(todo.dueDate, true)}
              </p>
            </div>

            {todo.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{todo.notes}</p>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => toggleTodoComplete(todo.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Mark as {todo.completed ? 'Incomplete' : 'Complete'}
              </button>
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TodoList() {
  const todos = useStore((state) => state.todos);
  const toggleTodoComplete = useStore((state) => state.toggleTodoComplete);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { format } = useFormattedDate();

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-4 ${
            todo.completed ? 'opacity-60' : ''
          }`}
        >
          <button
            onClick={() => toggleTodoComplete(todo.id)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {todo.completed ? <CheckSquare size={20} /> : <Square size={20} />}
          </button>
          
          <button
            onClick={() => setSelectedTodo(todo)}
            className="flex-1 text-left"
          >
            <h3 className={`text-lg font-semibold ${
              todo.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {todo.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <Calendar size={14} />
              {format(todo.dueDate, true)}
            </p>
          </button>
        </div>
      ))}

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}

      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No tasks yet. Add your first task to get started!
        </div>
      )}
    </div>
  );
}