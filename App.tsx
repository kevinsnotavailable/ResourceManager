import React, { useState } from 'react';
import { GraduationCap, Layout, Calendar, BookOpen, Settings, BarChart, CheckSquare, Clock } from 'lucide-react';
import { WorksheetForm } from './components/WorksheetForm';
import { WorksheetList } from './components/WorksheetList';
import { WorksheetsPage } from './pages/WorksheetsPage';
import { SettingsPage } from './pages/SettingsPage';
import { CalendarPage } from './pages/CalendarPage';
import { TodoPage } from './pages/TodoPage';
import { TimersPage } from './pages/TimersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { WelcomeMessage } from './components/WelcomeMessage';
import { useTheme } from './hooks/useTheme';
import { Calendar as CalendarComponent } from './components/Calendar';
import 'react-day-picker/dist/style.css';

type Page = 'dashboard' | 'worksheets' | 'calendar' | 'analytics' | 'settings' | 'todos' | 'timers';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  
  useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div>
            <WelcomeMessage />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-1">
                <WorksheetForm />
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Recent Resources</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your 10 most recently added resources</p>
                    <WorksheetList showControls={false} limit={10} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming Due Dates</h3>
                    <CalendarComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'worksheets':
        return <WorksheetsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'todos':
        return <TodoPage />;
      case 'timers':
        return <TimersPage />;
      default:
        return <div className="text-center py-8">Page coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex dark:bg-gray-900 dark:text-white transition-colors">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Layout className="w-6 h-6 text-blue-500" />
          <span className="text-lg font-semibold">Study Dashboard</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'dashboard'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Layout size={20} />
            Dashboard
          </button>

          <button
            onClick={() => setCurrentPage('worksheets')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'worksheets'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <GraduationCap size={20} />
            Resources
          </button>

          <button
            onClick={() => setCurrentPage('todos')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'todos'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <CheckSquare size={20} />
            To-Do List
          </button>

          <button
            onClick={() => setCurrentPage('timers')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'timers'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Clock size={20} />
            Timers
          </button>

          <button
            onClick={() => setCurrentPage('calendar')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'calendar'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Calendar size={20} />
            Calendar
          </button>

          <button
            onClick={() => setCurrentPage('analytics')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'analytics'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart size={20} />
            Analytics
          </button>

          <button
            onClick={() => setCurrentPage('settings')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 'settings'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;