import { Todo } from './TasksContext';

const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');

  const saveTasks = (tasks: Todo[]) => {
    if (tasks === undefined) {
      console.warn('saveTasks called with undefined, ignoring');
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  console.log(savedTasks);

  return {
    savedTasks: savedTasks ? (JSON.parse(savedTasks) as Todo[]) : null,
    saveTasks
  };
};

export default useTasksLocalStorage;
