import React from 'react';
import { TimerList } from '../components/TimerList';
import { TimerForm } from '../components/TimerForm';

export function TimersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <TimerForm />
      </div>
      <div className="lg:col-span-2">
        <TimerList />
      </div>
    </div>
  );
}