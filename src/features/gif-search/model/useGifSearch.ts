import { useCallback, useState } from "react"
import type { GiphyGif } from "@/entities/GiphyGif"
import { searchGifs } from "@/shared/api/giphy.client"
import { GIPHY_DEFAULTS } from "@/shared/api/giphy.constants"

export function useGifSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GiphyGif[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const pageSize = GIPHY_DEFAULTS.limit
  const totalPages =
    totalCount && totalCount > 0
      ? Math.max(1, Math.ceil(totalCount / pageSize))
      : 0

  const search = useCallback(
    async (overrideQuery?: string) => {
      const q = (overrideQuery ?? query).trim()

      if (!q) {
        setError("Please enter a search term")
        setResults([])
        setTotalCount(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const offset = (page - 1) * pageSize
        const { gifs, totalCount } = await searchGifs(q, offset)
        setResults(gifs)
        setTotalCount(totalCount)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GIFs")
        setResults([])
        setTotalCount(null)
      } finally {
        setIsLoading(false)
      }
    },
    [page, pageSize, query]
  )

  const canGoNext = totalPages > 0 && page < totalPages
  const canGoPrev = page > 1

  const goToNextPage = useCallback(async () => {
    if (!canGoNext) return
    setPage((prev) => prev + 1)
    await search()
  }, [canGoNext, search])

  const goToPrevPage = useCallback(async () => {
    if (!canGoPrev) return
    setPage((prev) => Math.max(1, prev - 1))
    await search()
  }, [canGoPrev, search])

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    totalCount,
    page,
    pageSize,
    totalPages,
    canGoNext,
    canGoPrev,
    search,
    goToNextPage,
    goToPrevPage,
  }
}
