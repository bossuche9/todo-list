function TodoViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  return (
    <form>
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

export default TodoViewForm;
