import React, { useContext, useState } from 'react';
import Button from '@/shared/ui/Button';
import Field from '@/shared/ui/Field';
import { TasksContext } from '@/entities/todo';

const AddTaskForm: React.FC = () => {
  const { addTask, newTaskInputRef } = useContext(TasksContext)!;

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle, () => setNewTaskTitle(''));
    }
  };

  const onInput = (event: React.InputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
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
