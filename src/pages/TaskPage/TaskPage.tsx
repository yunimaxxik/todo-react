import React, { useEffect, useState } from 'react';
import tasksAPI from '@/shared/api/tasks';
import { Todo } from '@/entities/todo';

interface TaskPageProps {
  params: {
    id?: string | number;
  };
}

const TaskPage: React.FC<TaskPageProps> = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (taskId === undefined) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    tasksAPI
      .getById(taskId)
      .then((taskData: Todo) => {
        if (taskData && taskData.id) {
          setTask(taskData);
          setHasError(false);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [taskId]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError || !task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      {task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}
    </div>
  );
};

export default TaskPage;
