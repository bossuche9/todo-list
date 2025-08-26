import { useEffect, useState } from 'react';
import TextTnputWithLabel from './shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setworkingTitle] = useState(todo.title);

  useEffect(() => {
    setworkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setworkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setworkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (!isEditing) return;
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextTnputWithLabel value={workingTitle} onChange={handleEdit} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox{}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
        <button type="button" onClick={handleCancel}>
          {' '}
          Cancel{' '}
        </button>
        <button type="button" onClick={handleUpdate}>
          {' '}
          Update
        </button>
      </form>
    </li>
  );
}

export default TodoListItem;
