const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');

  const saveTasks = (tasks) => {
    if (tasks === undefined) {
      console.warn('saveTasks called with undefined, ignoring');
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  console.log(savedTasks);
  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks
  };
};
export default useTasksLocalStorage;
