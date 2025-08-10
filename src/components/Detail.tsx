import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import type { Params } from 'react-router'
import { useSpotifyToken } from '../hooks/useSpotifyToken.js'
import axios from 'axios'

interface Artist {
  id: string
  name: string
  genres: string[]
  images: { url: string }[]
  followers: { total: number }
  external_urls: { spotify: string }
}

interface Album {
  id: string
  name: string
  release_date: string
  images: { url: string }[]
  artists: { name: string }[]
  external_urls: { spotify: string }
}

interface Track {
  id: string
  name: string
  duration_ms: number
  popularity: number
  preview_url: string | null
  album: Album
  artists: { name: string }[]
  external_urls: { spotify: string }
}

type SpotifyItem = Artist | Album | Track

interface RouteParams extends Params {
  type: 'artist' | 'album' | 'track'
  id: string
}

export default function Detail() {
  const [data, setData] = useState<SpotifyItem | null>(null)
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const token = useSpotifyToken()
  const { type, id } = useParams<RouteParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !type || !id) return
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get<SpotifyItem>(
          `https://api.spotify.com/v1/${type}s/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setData(res.data)
        // Si es artista, obtener top tracks
        if (type === 'artist') {
          const topRes = await axios.get<{ tracks: Track[] }>(
            `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          // Ordenar por popularidad descendente
          const sortedTracks = topRes.data.tracks.sort(
            (a, b) => b.popularity - a.popularity
          )
          setTopTracks(sortedTracks)
        } else {
          setTopTracks([])
        }
      } catch {
        setError('No se pudo cargar la información')
      }
      setLoading(false)
    }
    fetchData()
  }, [type, id, token])

  if (loading)
    return <div className="text-center mt-10">Cargando...</div>
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">{error}</div>
    )
  if (!data) return null

  return (
    <div className="max-w-xl mx-auto p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 text-2xl text-gray-600 hover:text-green-600 transition"
        aria-label="Volver"
      >
        ←
      </button>
      {/* Imagen para track, album o artist */}
      {type === 'track' &&
        'album' in data &&
        data.album.images &&
        data.album.images[0] && (
          <img
            src={data.album.images[0].url}
            alt={data.name}
            className="w-48 h-48 object-cover rounded mx-auto mb-4"
          />
        )}
      {type !== 'track' && 'images' in data && data.images[0] && (
        <img
          src={data.images[0].url}
          alt={data.name}
          className="w-48 h-48 object-cover rounded mx-auto mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2 text-center">
        {data.name}
      </h2>
      {type === 'track' && 'artists' in data && (
        <p className="text-center text-gray-600 mb-2"></p>
      )}
      {type === 'album' && 'artists' in data && (
        <p className="text-center text-gray-600 mb-2">
          Artista: {data.artists.map((a) => a.name).join(', ')}
        </p>
      )}
      {type === 'artist' && 'genres' in data && (
        <p className="text-center text-gray-600 mb-2">
          Géneros: {data.genres.join(', ')}
        </p>
      )}
      {type === 'track' && 'album' in data && (
        <div className="text-center text-gray-600 mb-2">
          <p>Artista: {data.artists.map((a) => a.name).join(', ')}</p>
          <p>Album: {data.album.name}</p>
          <p>Fecha de lanzamiento: {data.album.release_date}</p>
          <p>
            Duración: {Math.floor(data.duration_ms / 60000)}:
            {Math.floor((data.duration_ms % 60000) / 1000)}
          </p>
        </div>
      )}
      {type === 'track' &&
        'preview_url' in data &&
        data.preview_url && (
          <audio controls className="mx-auto mt-4">
            <source src={data.preview_url} type="audio/mpeg" />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        )}
      {type === 'artist' && 'followers' in data && (
        <p className="text-center text-gray-600 mb-2">
          Seguidores: {data.followers.total.toLocaleString()}
        </p>
      )}
      {type === 'album' && 'release_date' in data && (
        <p className="text-center text-gray-600 mb-2">
          Fecha de lanzamiento: {data.release_date}
        </p>
      )}
      {/* Top tracks para artista */}
      {type === 'artist' && topTracks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Top canciones
          </h3>
          <ol className="space-y-2">
            {topTracks.map((track, idx) => (
              <li
                key={track.id}
                className="flex items-center gap-4 bg-gray-100 rounded p-2"
              >
                <span className="font-bold w-6 text-right">
                  {idx + 1}
                </span>
                {track.album &&
                  track.album.images &&
                  track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                <div className="flex-1">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-xs text-gray-500">
                    Popularidad: {track.popularity}
                  </div>
                </div>
                {track.preview_url && (
                  <audio controls className="w-32">
                    <source
                      src={track.preview_url}
                      type="audio/mpeg"
                    />
                  </audio>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="text-center mt-6">
        <a
          href={
            'external_urls' in data
              ? data.external_urls.spotify
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          Ver en Spotify
        </a>
      </div>
    </div>
  )
}
