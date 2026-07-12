import React, { useMemo } from 'react';
import TasksContext from './TasksContext';
import useTasks from './useTasks';
import useIncompleteTaskScroll from './useIncompleteTaskScroll';

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
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
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(tasks);

  const value = useMemo(
    () => ({
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
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId
    }),
    [
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
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId
    ]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
