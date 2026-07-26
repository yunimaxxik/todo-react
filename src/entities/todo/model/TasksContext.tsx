import { createContext } from 'react';
import { TasksContextType } from '@/shared/models/Task';

const TasksContext = createContext<TasksContextType | null>(null);

export default TasksContext;
