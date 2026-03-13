import type { ReactNode } from "react"
import { useGifSearch } from "@/features/gif-search/model/useGifSearch"
import type { GiphyGif } from "@/entities/GiphyGif"
import { SearchForm } from "./search-form"

export interface GifSearchRenderState {
  query: string
  results: GiphyGif[]
  isLoading: boolean
  error: string | null
  totalCount: number | null
  page: number
  pageSize: number
  totalPages: number
  canGoNext: boolean
  canGoPrev: boolean
  goToNextPage: () => Promise<void> | void
  goToPrevPage: () => Promise<void> | void
}

interface GifSearchProps {
  children: (state: GifSearchRenderState) => ReactNode
}

export function GifSearch({ children }: GifSearchProps) {
  const {
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
  } = useGifSearch()

  return (
    <>
      <SearchForm
        query={query}
        isLoading={isLoading}
        error={error}
        onQueryChange={(value) => {
          setQuery(value)
        }}
        onSubmit={search}
      />
      {children({
        query,
        results,
        isLoading,
        error,
        totalCount,
        page,
        pageSize,
        totalPages,
        canGoNext,
        canGoPrev,
        goToNextPage,
        goToPrevPage,
      })}
    </>
  )
}
