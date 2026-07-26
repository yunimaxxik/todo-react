import { RefObject } from 'react';
import { Task } from '@/shared/models/Task';

export interface TasksContextType {
  tasks: Task[];
  filteredTasks: Task[] | null;
  deleteTask: (id: string) => void;
  deleteAllTasks: () => void;
  toggleTaskComplete: (id: string, isDone: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  newTaskInputRef: RefObject<HTMLInputElement | null>;
  addTask: (title: string, callbackSetTaskTitle: () => void) => void;
  disappearingTaskId: string | null;
  appearingTaskId: string | null;
  firstIncompleteTaskRef: RefObject<HTMLElement | null>;
  firstIncompleteTaskId: string | null;
}
