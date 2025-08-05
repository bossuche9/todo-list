import { use } from 'react';
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef(null);

  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    console.dir(event.target.title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">
        Todo
        <input
          type="text"
          id="todoTitle"
          name="title"
          ref={todoTitleInput}
        ></input>
        <button>Add Todo</button>
      </label>
    </form>
  );
}

export default TodoForm;
