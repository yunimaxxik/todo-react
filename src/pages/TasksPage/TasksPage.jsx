import Todo from '@/widgets/todo';
import { TasksProvider } from '@/entities/todo';

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;
