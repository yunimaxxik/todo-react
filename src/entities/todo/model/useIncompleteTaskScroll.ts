import { useRef } from 'react';
import { Task } from '@/shared/models/Task';

const useIncompleteTaskScroll = (tasks: Task[]) => {
  const firstIncompleteTaskRef = useRef<HTMLElement>(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId: firstIncompleteTaskId ?? null
  };
};

export default useIncompleteTaskScroll;
