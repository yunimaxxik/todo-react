import { useContext } from 'react';
import Field from '@/shared/ui/Field';
import { TasksContext } from '@/entities/todo';
import './SearchTaskForm.scss';

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form
      className="todo__form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field
        className="todo__field"
        label="Найти задачу"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={({ target }) => setSearchQuery(target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
