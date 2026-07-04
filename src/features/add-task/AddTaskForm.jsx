import { useContext, useState } from 'react';
import Button from '@/shared/ui/Button';
import Field from '@/shared/ui/Field';
import { TasksContext } from '@/entities/todo';

const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const [error, setError] = useState('');

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle);
    }
  };

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    const hasOnlySpaces = clearValue.length === 0 && value.length > 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? 'Задача не может быть пустой...' : '');
  };

  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <Field
        className="todo__field"
        label="Новая задача"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button
        type="submit"
        isDisabled={isNewTaskTitleEmpty}
      >
        Внести
      </Button>
    </form>
  );
};

export default AddTaskForm;
