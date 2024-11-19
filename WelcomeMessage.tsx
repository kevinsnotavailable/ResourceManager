import React, { useMemo } from 'react';

const WELCOME_MESSAGES = [
  "Let's make today productive!",
  'Ready to organize your resources?',
  'Time to crush your study goals!',
  'Your dedication will pay off!',
  'Every study session brings you closer to success!',
  'Welcome back to your study dashboard',
  'Keep that momentum going!',
  'Your future self will thank you!',
  'Small steps lead to big achievements!',
  "You've got this!",
  'Excellence is a habit - Aristotle',
  'Today is a great day to learn something new!',
];

export function WelcomeMessage() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTimeBasedEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

  const randomMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
    return WELCOME_MESSAGES[randomIndex];
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getTimeBasedEmoji()}</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getGreeting()}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {randomMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
