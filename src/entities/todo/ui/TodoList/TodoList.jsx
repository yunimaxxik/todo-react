import { memo, useContext } from 'react';
import TodoItem from '../TodoItem';
import { TasksContext } from '@/entities/todo';
import './TodoList.scss';

const TodoList = () => {
  const { tasks = [], filteredTasks } = useContext(TasksContext);

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
      {(filteredTasks ?? tasks).map((task) => (
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
