type SearchFormProps = {
  query: string
  setQuery: (q: string) => void
  type: string
  setType: (t: string) => void
  onSearch: (e: React.FormEvent) => void
}

export default function SearchForm({
  query,
  setQuery,
  type,
  setType,
  onSearch,
}: SearchFormProps) {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col sm:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Jbalvin, KISS, Queen ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-500"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-gray-500"
      >
        <option value="track">Canciones</option>
        <option value="artist">Artistas</option>
        <option value="album">Álbumes</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Buscar
      </button>
    </form>
  )
}
