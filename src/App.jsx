import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useEffect, useState } from 'react';
import TodoViewForm from './features/TodosViewForm';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const encodeUrl = ({ sortField, sortDirection }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: 'GET', headers: { Authorization: token } };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection }),
          options
        );
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const fetchedTodos = data.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();

      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  /*function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }*/

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    // optimistic update
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      await resp.json();
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // optimistic UI update
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
    );
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      await resp.json();
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  };

  /*function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }
    */

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      <hr />
      <TodoViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
