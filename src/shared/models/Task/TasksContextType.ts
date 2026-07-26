import { RefObject } from 'react';
import { Task } from '@/shared/models/Task';

export interface TasksContextType {
  tasks: Task[];
  filteredTasks: Task[] | null;
  deleteTask: (id: string | number) => void;
  deleteAllTasks: () => void;
  toggleTaskComplete: (id: string | number, isDone: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  newTaskInputRef: RefObject<HTMLInputElement | null>;
  addTask: (title: string, callbackSetTaskTitle: () => void) => void;
  disappearingTaskId: string | number | null;
  appearingTaskId: string | number | null;
  firstIncompleteTaskRef: RefObject<HTMLElement | null>;
  firstIncompleteTaskId: string | number | null;
}
