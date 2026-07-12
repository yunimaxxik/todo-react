import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer
} from 'react';
import tasksAPI from '@/shared/api/tasks';
import { Todo } from './TasksContext'; // Используем интерфейс, который создали ранее

// 1. Описываем все возможные экшены для редьюсера (Discriminated Unions)
type TasksAction =
  | { type: 'SET_ALL'; tasks: Todo[] }
  | { type: 'ADD'; task: Todo }
  | { type: 'TOGGLE_COMPLETE'; id: string | number; isDone: boolean }
  | { type: 'DELETE'; id: string | number }
  | { type: 'DELETE_ALL' };

// 2. Типизируем редьюсер: state — это массив Todo, action — наш союз типов TasksAction
const tasksReducer = (state: Todo[], action: TasksAction): Todo[] => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case 'ADD': {
      return [...state, action.task];
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action;
      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id);
    }
    case 'DELETE_ALL': {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  // Указываем редьюсеру тип данных
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [disappearingTaskId, setDisappearingTaskId] = useState<
    string | number | null
  >(null);
  const [appearingTaskId, setAppearingTaskId] = useState<
    string | number | null
  >(null);

  // Явно указываем, что реф привязан к HTML-инпуту
  const newTaskInputRef = useRef<HTMLInputElement>(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?');

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }));
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId: string | number) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        dispatch({ type: 'DELETE', id: taskId });
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback(
    (taskId: string | number, isDone: boolean) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone });
      });
    },
    []
  );

  const addTask = useCallback(
    (title: string, callbackSetTaskTitle: () => void) => {
      const newTask = {
        title,
        isDone: false
      };

      tasksAPI.add(newTask).then((addedTask: Todo) => {
        dispatch({ type: 'ADD', task: addedTask });
        callbackSetTaskTitle();
        setSearchQuery('');
        newTaskInputRef.current?.focus(); // Безопасный вызов через ?. (решает 18047)
        setAppearingTaskId(addedTask.id);
        setTimeout(() => {
          setAppearingTaskId(null);
        }, 400);
      });
    },
    []
  );

  useEffect(() => {
    newTaskInputRef.current?.focus(); // Безопасный вызов через ?. (решает 18047)

    tasksAPI.getAll().then((serverTasks: Todo[]) => {
      dispatch({ type: 'SET_ALL', tasks: serverTasks });
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(
          (
            { title }: Todo // Явно указали, что деструктурируем Todo
          ) => title.toLowerCase().includes(clearSearchQuery)
        )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId
  };
};

export default useTasks;
