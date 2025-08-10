import { useEffect, useState } from 'react'
import { clientId, clientSecret } from '../data'
import axios from 'axios'

export function useSpotifyToken() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      const headers = {
        headers: {
          Authorization: `Basic ${btoa(
            `${clientId}:${clientSecret}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      try {
        const res = await axios.post(
          'https://accounts.spotify.com/api/token',
          params,
          headers
        )
        setToken(res.data.access_token)
      } catch (err) {
        console.error('Error obteniendo el token', err)
      }
    }
    getToken()
  }, [])

  return token
}
