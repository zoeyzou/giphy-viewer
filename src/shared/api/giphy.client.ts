import type { GiphyGif, GiphySearchResponse } from "@/entities/GiphyGif"
import {
  GIPHY_API_KEY,
  GIPHY_SEARCH_ENDPOINT,
  GIPHY_DEFAULTS,
} from "./giphy.constants"

export interface SearchGifsResult {
  gifs: GiphyGif[]
  totalCount: number
}

export async function searchGifs(
  query: string,
  offset = 0
): Promise<SearchGifsResult> {
  const trimmed = query.trim()
  if (!trimmed) {
    return { gifs: [], totalCount: 0 }
  }

  if (!GIPHY_API_KEY) {
    throw new Error("Missing Giphy API key (.env)")
  }

  const params = new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: trimmed,
    limit: GIPHY_DEFAULTS.limit.toString(),
    rating: GIPHY_DEFAULTS.rating,
    offset: String(offset),
  })

  const response = await fetch(`${GIPHY_SEARCH_ENDPOINT}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Giphy API failed: ${response.status}`)
  }

  const json = (await response.json()) as GiphySearchResponse

  const gifs = json.data.slice(0, GIPHY_DEFAULTS.limit).map((item) => ({
    id: String(item.id),
    title: item.title || "Untitled GIF",
    images: {
      downsized_medium: {
        url: item.images?.downsized_medium?.url || "",
        width: item.images?.downsized_medium?.width || "",
        height: item.images?.downsized_medium?.height || "",
      },
    },
  }))

  const totalCount =
    typeof json.pagination?.total_count === "number"
      ? json.pagination.total_count
      : gifs.length

  return { gifs, totalCount }
}
