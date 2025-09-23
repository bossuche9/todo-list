const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: 'Test error on Load',
};

const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case action.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case action.loadTodos:
      const fetchedTodos = action.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };
        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }
        return todo;
      });
      return {
        ...state,
        todoList: fetchedTodos,
        isLoading: false,
      };
    case action.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case action.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case action.addTodo:
      const record = action.records[0];
      const savedTodo = {
        id: record.id,
        ...record.fields,
      };
      if (!savedTodo.isCompleted) savedTodo.isCompleted = false;
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    case action.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.completeTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, isCompleted: true } : todo
        ),
      };
    case action.updateTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.editedTodo.id
            ? { ...todo, ...action.editedTodo }
            : todo
        ),
      };
    case action.revertTodo:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.originalTodo.id ? action.originalTodo : todo
        ),
      };
    case action.clearError:
      return {
        ...state,
        errorMessage: '',
      };
  }
}

export default [initialState, actions, reducer];
