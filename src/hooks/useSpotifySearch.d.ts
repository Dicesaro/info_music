import { useState } from 'react'
import axios from 'axios'

export function useSpotifySearch({
  token,
}: {
  token: string | null
}): {
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[]
  search: (query: string, type: string) => void
} {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const search = async (query: string, type: string) => {
    if (!query) return
    setLoading(true)
    setResults([])
    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setResults(res.data[`${type}s`].items)
    } catch (err) {
      console.error('Error al buscar', err)
    }
    setLoading(false)
  }

  return { loading, results, search }
}
