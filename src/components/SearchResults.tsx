import SearchResultItem from './SearchResultItem'
import { Link } from 'react-router'

interface ItemProps {
  id: string
  name: string
  artists?: { name: string }[]
  type: 'track' | 'artist' | 'album'
  album_type?: string
  // ...otros campos necesarios
}

interface SearchResultsProps {
  results: ItemProps[]
}

export default function SearchResults({
  results,
}: SearchResultsProps) {
  // Detectar el tipo del resultado (track, artist, album) usando la estructura del primer item
  const getType = (item: ItemProps) => {
    if (item.type) return item.type
    if (item.album_type) return 'album'
    if (item.artists) return 'track'
    return 'artist'
  }

  return (
    <ul className="space-y-4">
      {results.map((item: ItemProps) => (
        <li key={item.id}>
          <Link
            to={`/detail/${getType(item)}/${item.id}`}
            className="block rounded-lg transition"
          >
            <SearchResultItem item={item} id={item.id} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
