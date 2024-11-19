import { type } from "os";

export interface WorksheetFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  uploadedAt: Date;
}

export interface Worksheet {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  dueDate?: Date;
  reminder?: Date;
  notes?: string;
  completed: boolean;
  createdAt: Date;
  files: WorksheetFile[];
}

export interface Todo {
  id: string;
  title: string;
  dueDate: Date;
  notes?: string;
  completed: boolean;
  createdAt: Date;
}

export interface Timer {
  id: string;
  name: string;
  duration: number;
  isRunning: boolean;
  timeLeft: number;
  createdAt: Date;
}

export type ThemeMode = 'light' | 'dark' | 'auto' | 'custom';
export type DateFormat = 'US' | 'UK';

export interface CustomTheme {
  backgroundColor: string;
  textColor: string;
  timestamp: number;
}

export interface Settings {
  theme: ThemeMode;
  dateFormat: DateFormat;
  customTheme?: CustomTheme;
  recentThemes: CustomTheme[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'resource' | 'reminder' | 'custom' | 'todo';
  worksheetId?: string;
  todoId?: string;
  color?: string;
}

export interface WorksheetStore {
  worksheets: Worksheet[];
  todos: Todo[];
  settings: Settings;
  events: CalendarEvent[];
  timers: Timer[];
  addWorksheet: (worksheet: Omit<Worksheet, 'id' | 'createdAt' | 'files'>) => void;
  updateWorksheet: (id: string, worksheet: Partial<Worksheet>) => void;
  deleteWorksheet: (id: string) => void;
  toggleComplete: (id: string) => void;
  addFile: (worksheetId: string, file: WorksheetFile) => void;
  deleteFile: (worksheetId: string, fileId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodoComplete: (id: string) => void;
  addTimer: (timer: Omit<Timer, 'id' | 'createdAt' | 'isRunning' | 'timeLeft'>) => void;
  updateTimer: (id: string, timer: Partial<Timer>) => void;
  deleteTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
}