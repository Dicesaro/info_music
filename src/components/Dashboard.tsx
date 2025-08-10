import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches')
    if (stored) setRecentSearches(JSON.parse(stored))
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6">
      <h3 className="text-lg font-semibold mb-2">
        Últimas búsquedas
      </h3>
      <ul className="list-disc pl-6">
        {recentSearches.length === 0 && (
          <li>No hay búsquedas recientes.</li>
        )}
        {recentSearches.map((search, idx) => (
          <li key={idx}>{search}</li>
        ))}
      </ul>
    </div>
  )
}
