function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      <input
        type="text"
        placeholder="Search image..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 flex-1"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="All">All</option>
        <option value="Shirt">Shirt</option>
        <option value="Jeans">Jeans</option>
        <option value="Dress">Dress</option>
        <option value="T-Shirt">T-Shirt</option>
      </select>

    </div>
  );
}

export default SearchFilter;