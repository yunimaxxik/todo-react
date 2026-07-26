import React, { memo, useContext } from 'react';
import { TodoItem, TasksContext } from '@/entities/todo';
import { Task } from '@/shared/models/Task';
import './TodoList.scss';

const TodoList: React.FC = () => {
  const { tasks = [], filteredTasks } = useContext(TasksContext)!;

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">Задач еще нет</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Задач не найдено</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task: Task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  );
};

export default memo(TodoList);
