function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle">
        Todo
        <input type="text" id="todoTitle"></input>
        <button>Add Todo</button>
      </label>
    </form>
  );
}

export default TodoForm;
