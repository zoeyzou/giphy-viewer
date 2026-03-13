// shared/api/giphy.constants.ts
export const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY!
export const GIPHY_SEARCH_ENDPOINT =
  "https://api.giphy.com/v1/gifs/search" as const
export const GIPHY_DEFAULTS = {
  limit: 3,
  rating: "g" as const,
} as const
export const GIPHY_SEARCH_PARAMS = (
  query: string,
  offset = 0
): URLSearchParams =>
  new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: query,
    limit: GIPHY_DEFAULTS.limit.toString(),
    offset: offset.toString(),
    rating: GIPHY_DEFAULTS.rating,
  })
