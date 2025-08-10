export type ItemProps = {
  id: string
  name: string
  type?: string
  images?: { url: string }[]
  album?: { images?: { url: string }[] }
  artists?: { name: string }[]
}

export default function SearchResultItem({
  item,
}: {
  item: ItemProps
  id: string
}) {
  return (
    <div className="p-4 dark:bg-gray-800 shadow flex gap-4 items-center">
      {item.images && item.images.length > 0 && (
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}
      {item.album && item.album.images && (
        <img
          src={item.album.images[0]?.url}
          alt="album"
          className="w-16 h-16 object-cover rounded"
        />
      )}
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {item.name}
        </p>
        {item.artists && (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {item.artists.map((a) => a.name).join(', ')}
          </p>
        )}
      </div>
    </div>
  )
}
