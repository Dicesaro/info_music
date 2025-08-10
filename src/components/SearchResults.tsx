import SearchResultItem from './SearchResultItem'
import { Link } from 'react-router'

export default function SearchResults({ results }) {
  // Detectar el tipo del resultado (track, artist, album) usando la estructura del primer item
  const getType = (item) => {
    if (item.type) return item.type
    if (item.album_type) return 'album'
    if (item.artists) return 'track'
    return 'artist'
  }

  return (
    <ul className="space-y-4">
      {results.map((item) => (
        <li key={item.id}>
          <Link
            to={`/detail/${getType(item)}/${item.id}`}
            className="block rounded-lg transition"
          >
            <SearchResultItem item={item} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
