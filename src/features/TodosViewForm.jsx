import { useEffect, useState } from 'react';

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect;
  function preventRefresh(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>Search todos</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        ></input>
        <button onClick={() => setLocalQueryString('')}>Clear</button>
      </div>
      <div>
        <label>
          {' '}
          Sort by
          <select
            onChange={(event) => setSortField(event.target.value)}
            value={sortField}
          >
            <option value="title"> Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </label>
        <label>
          {' '}
          Direction
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default TodosViewForm;
