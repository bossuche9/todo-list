import { useState } from 'react';
import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setworkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    console.dir(event.target.title);
    setworkingTodoTitle('');
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
          value={workingTodoTitle}
          onChange={(event) => setworkingTodoTitle(event.target.value)}
        ></input>
        <button disabled={workingTodoTitle == ''}>Add Todo</button>
      </label>
    </form>
  );
}

export default TodoForm;
