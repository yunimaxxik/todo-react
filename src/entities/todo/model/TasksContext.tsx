import { createContext, RefObject } from 'react';

export interface Todo {
  id: string | number;
  title: string;
  isDone: boolean;
}

export interface TasksContextType {
  tasks: Todo[];
  filteredTasks: Todo[] | null;
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

const TasksContext = createContext<TasksContextType | null>(null);

export default TasksContext;
