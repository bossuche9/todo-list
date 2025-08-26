import { useState } from 'react';
import { useRef } from 'react';
import TextTnputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setworkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: workingTodoTitle, isCompleted: false });
    console.dir(event.target.title);
    setworkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextTnputWithLabel
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setworkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />
      <button disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
