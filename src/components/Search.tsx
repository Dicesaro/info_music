import { useState } from 'react'
import { useSpotifyToken } from '../hooks/useSpotifyToken'
import { useSpotifySearch } from '../hooks/useSpotifySearch'
import SearchForm from './SearchForm'
import Loader from './Loader'
import SearchResults from './SearchResults'

export default function Search() {
  const token = useSpotifyToken()
  const [query, setQuery] = useState('')
  const [type, setType] = useState('track')
  const { loading, results, search } = useSpotifySearch({ token })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    search(query, type)
    // Guardar búsqueda en localStorage
    if (query.trim()) {
      const stored = localStorage.getItem('recentSearches')
      const arr: string[] = stored ? JSON.parse(stored) : []
      if (!arr.includes(query)) {
        arr.unshift(query)
        if (arr.length > 10) arr.pop()
        localStorage.setItem('recentSearches', JSON.stringify(arr))
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 ">
      <SearchForm
        query={query}
        setQuery={setQuery}
        type={type}
        setType={setType}
        onSearch={handleSearch}
      />
      {loading ? <Loader /> : <SearchResults results={results} />}
    </div>
  )
}
