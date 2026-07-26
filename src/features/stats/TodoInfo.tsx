import React, { memo, useContext, useMemo } from 'react';
import { TasksContext } from '@/entities/todo';
import { Task } from '@/shared/models/Task';
import './TodoInfo.scss';

const TodoInfo: React.FC = () => {
  const { tasks, deleteAllTasks } = useContext(TasksContext)!;

  const total = tasks.length;
  const hasTasks = total > 0;

  const done = useMemo(() => {
    return tasks.filter((task: Task) => task.isDone).length;
  }, [tasks]);

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Выполнено {done} из {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Удалить все
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
