import React, { memo } from 'react';
import { TasksContext } from '@/entities/todo';
import RouterLink from '@/shared/ui/RouterLink';
import { highlightCaseInsensitive } from '@/shared/utils/highlight';
import './TodoItem.scss';

interface TodoItemProps {
  className?: string;
  id: string;
  title: string;
  isDone: boolean;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { className = '', id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery
  } = React.useContext(TasksContext)!;

  const filteredTitle = highlightCaseInsensitive(title, searchQuery);

  return (
    <li
      className={`
        todo-item 
        ${className} 
        ${disappearingTaskId === id ? 'is-disappearing' : ''}
        ${appearingTaskId === id ? 'is-appearing' : ''}
        `}
      // TypeScript теперь знает типы id и firstIncompleteTaskId и разрешит это сравнение
      ref={
        id === firstIncompleteTaskId
          ? (firstIncompleteTaskRef as React.RefObject<HTMLLIElement | null>)
          : null
      }
    >
      <input
        className="todo-item__checkbox"
        id={String(id)} // Приводим к строке для HTML id属性
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => toggleTaskComplete(id, target.checked)}
      />
      <label
        className="todo-item__label visually-hidden"
        htmlFor={String(id)}
      >
        {title}
      </label>

      <RouterLink
        to={`tasks/${id}`}
        aria-label="Task detail page"
      >
        <span dangerouslySetInnerHTML={{ __html: filteredTitle }}></span>
      </RouterLink>

      <button
        className="todo-item__delete-button"
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};

export default memo(TodoItem);
