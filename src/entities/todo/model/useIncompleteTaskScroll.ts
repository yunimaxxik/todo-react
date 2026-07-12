import { useRef } from 'react';
import { Todo } from './TasksContext';

const useIncompleteTaskScroll = (tasks: Todo[]) => {
  const firstIncompleteTaskRef = useRef<HTMLElement>(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId: firstIncompleteTaskId ?? null
  };
};

export default useIncompleteTaskScroll;
