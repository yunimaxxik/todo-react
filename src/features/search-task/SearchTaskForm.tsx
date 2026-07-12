import React, { useContext } from 'react';
import Field from '@/shared/ui/Field';
import { TasksContext } from '@/entities/todo';
import './SearchTaskForm.scss';

const SearchTaskForm: React.FC = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext)!;

  return (
    <form
      className="todo__form"
      onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
      }}
    >
      <Field
        className="todo__field"
        label="Найти задачу"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event: React.InputEvent<HTMLInputElement>) => {
          const { currentTarget } = event;
          setSearchQuery(currentTarget.value);
        }}
      />
    </form>
  );
};

export default SearchTaskForm;
