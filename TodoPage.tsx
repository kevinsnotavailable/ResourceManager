import React from 'react';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

export function TodoPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <TodoForm />
      </div>
      <div className="lg:col-span-2">
        <TodoList />
      </div>
    </div>
  );
}