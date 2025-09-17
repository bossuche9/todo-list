import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 1rem;
`;

const StyledContainer1 = styled.div`
  padding: 1rem;
`;

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);
  function preventRefresh(e) {
    e.preventDefault();
  }

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledContainer1>
        <label>Search todos</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        ></input>
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </StyledContainer1>
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
    </StyledForm>
  );
}

export default TodosViewForm;
