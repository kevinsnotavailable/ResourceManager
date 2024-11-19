import { create } from 'zustand';
import { WorksheetStore, ThemeMode, CustomTheme } from './types';

const MAX_RECENT_THEMES = 5;

export const useStore = create<WorksheetStore>((set) => ({
  worksheets: [],
  todos: [],
  events: [],
  timers: [],
  settings: {
    theme: 'light' as ThemeMode,
    dateFormat: 'US',
    recentThemes: [],
  },
  addWorksheet: (worksheet) =>
    set((state) => ({
      worksheets: [
        ...state.worksheets,
        {
          ...worksheet,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          files: [],
        },
      ],
      events: worksheet.dueDate
        ? [
            ...state.events,
            {
              id: crypto.randomUUID(),
              title: worksheet.title,
              date: worksheet.dueDate,
              type: 'resource',
              worksheetId: crypto.randomUUID(),
            },
          ]
        : state.events,
    })),
  updateWorksheet: (id, worksheet) =>
    set((state) => ({
      worksheets: state.worksheets.map((w) =>
        w.id === id ? { ...w, ...worksheet } : w
      ),
      events: state.events.map((e) =>
        e.worksheetId === id && worksheet.dueDate
          ? { ...e, title: worksheet.title, date: worksheet.dueDate }
          : e
      ),
    })),
  deleteWorksheet: (id) =>
    set((state) => ({
      worksheets: state.worksheets.filter((w) => w.id !== id),
      events: state.events.filter((e) => e.worksheetId !== id),
    })),
  toggleComplete: (id) =>
    set((state) => ({
      worksheets: state.worksheets.map((w) =>
        w.id === id ? { ...w, completed: !w.completed } : w
      ),
    })),
  addFile: (worksheetId, file) =>
    set((state) => ({
      worksheets: state.worksheets.map((w) =>
        w.id === worksheetId
          ? { ...w, files: [...w.files, file] }
          : w
      ),
    })),
  deleteFile: (worksheetId, fileId) =>
    set((state) => ({
      worksheets: state.worksheets.map((w) =>
        w.id === worksheetId
          ? { ...w, files: w.files.filter((f) => f.id !== fileId) }
          : w
      ),
    })),
  updateSettings: (settings) =>
    set((state) => {
      const newSettings = { ...state.settings, ...settings };

      // Handle custom theme updates
      if (settings.customTheme) {
        const existingThemeIndex = state.settings.recentThemes.findIndex(
          (theme) =>
            theme.backgroundColor === settings.customTheme?.backgroundColor &&
            theme.textColor === settings.customTheme?.textColor
        );

        let recentThemes = [...state.settings.recentThemes];
        
        if (existingThemeIndex === -1) {
          // Add new theme to recent themes
          recentThemes = [
            settings.customTheme,
            ...recentThemes.slice(0, MAX_RECENT_THEMES - 1),
          ];
        } else {
          // Move existing theme to top
          const theme = recentThemes[existingThemeIndex];
          recentThemes.splice(existingThemeIndex, 1);
          recentThemes.unshift({ ...theme, timestamp: Date.now() });
        }

        newSettings.recentThemes = recentThemes;
      }

      return { settings: newSettings };
    }),
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: crypto.randomUUID() }],
    })),
  updateEvent: (id, event) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...event } : e
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  addTodo: (todo) => {
    const id = crypto.randomUUID();
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id,
          completed: false,
          createdAt: new Date(),
        },
      ],
      events: [
        ...state.events,
        {
          id: crypto.randomUUID(),
          title: todo.title,
          date: todo.dueDate,
          type: 'todo',
          todoId: id,
        },
      ],
    }));
  },
  updateTodo: (id, todo) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...todo } : t
      ),
      events: state.events.map((e) =>
        e.todoId === id && todo.dueDate
          ? { ...e, title: todo.title || e.title, date: todo.dueDate }
          : e
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
      events: state.events.filter((e) => e.todoId !== id),
    })),
  toggleTodoComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
  addTimer: (timer) =>
    set((state) => ({
      timers: [
        ...state.timers,
        {
          ...timer,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          isRunning: false,
          timeLeft: timer.duration,
        },
      ],
    })),
  updateTimer: (id, timer) =>
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id ? { ...t, ...timer } : t
      ),
    })),
  deleteTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((t) => t.id !== id),
    })),
  startTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id ? { ...t, isRunning: true } : t
      ),
    })),
  pauseTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id ? { ...t, isRunning: false } : t
      ),
    })),
  resetTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((t) =>
        t.id === id ? { ...t, timeLeft: t.duration, isRunning: false } : t
      ),
    })),
}));