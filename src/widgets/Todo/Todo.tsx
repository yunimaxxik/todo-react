import { useContext } from 'react';
import AddTaskForm from '@/features/add-task';
import SearchTaskForm from '@/features/search-task';
import TodoInfo from '@/features/stats';
import { TodoList, TasksContext } from '@/entities/todo';
import Button from '@/shared/ui/Button';
import './Todo.scss';

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext)!;

  return (
    <div className="todo">
      <h1 className="todo__title">Список дел</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Показать первую невыполненную задачу
      </Button>
      <TodoList />
    </div>
  );
};

export default Todo;
