import { useEffect, useState } from 'react';
import tasksAPI from '@/shared/api/tasks';

const TaskPage = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
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

  if (hasError) {
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
