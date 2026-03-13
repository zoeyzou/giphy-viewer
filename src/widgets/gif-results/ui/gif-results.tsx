import { useState } from "react"
import type { GiphyGif, TextPosition } from "@/entities/GiphyGif"
import { Select } from "@/shared/ui/shadcn/select"
import { Button } from "@/shared/ui/shadcn/button"

interface GifResultsProps {
  gifs: GiphyGif[]
  isLoading?: boolean
  totalCount: number | null
  page: number
  totalPages: number
  canGoNext: boolean
  canGoPrev: boolean
  onNextPage: () => void
  onPrevPage: () => void
}

export function GifResults({
  gifs,
  isLoading,
  totalCount,
  page,
  totalPages,
  canGoNext,
  canGoPrev,
  onNextPage,
  onPrevPage,
}: GifResultsProps) {
  const [captionPosition, setCaptionPosition] =
    useState<TextPosition>("below-center")
  const hasResults = gifs.length > 0

  return (
    <section aria-label="GIF results" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-medium">Results</h2>
        {hasResults && totalCount !== null && (
          <p className="text-xs text-muted-foreground">
            Showing {gifs.length} of {totalCount}
          </p>
        )}
      </div>

      {totalPages > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="ml-auto flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={!canGoPrev || isLoading}
              onClick={onPrevPage}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={!canGoNext || isLoading}
              onClick={onNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <label className="flex max-w-xs flex-col gap-1 text-sm">
        <span className="font-medium">Caption position</span>
        <Select
          value={captionPosition}
          onChange={(event) =>
            setCaptionPosition(event.target.value as TextPosition)
          }
        >
          <option value="top-center">Top center</option>
          <option value="bottom-center">Bottom center</option>
          <option value="below-center">Below image</option>
        </Select>
      </label>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading GIFs…</p>
      )}

      {!isLoading && !hasResults && (
        <p className="text-sm text-muted-foreground">
          Enter a search term to see GIFs.
        </p>
      )}

      {!isLoading && hasResults && (
        <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {gifs.map((gif) => (
            <figure
              key={gif.id}
              className="relative flex flex-col gap-2 overflow-hidden rounded-md border bg-card p-2 shadow-sm"
            >
              <div className="relative">
                <img
                  src={gif.images.downsized_medium.url}
                  alt={gif.title}
                  className="aspect-square w-full rounded-md object-cover"
                />

                {captionPosition !== "below-center" && (
                  <figcaption
                    className={`pointer-events-none absolute left-1/2 z-10 w-full -translate-x-1/2 px-2 text-center text-xs font-semibold text-white drop-shadow ${
                      captionPosition === "top-center" ? "top-2" : "bottom-2"
                    }`}
                  >
                    {gif.title}
                  </figcaption>
                )}
              </div>

              {captionPosition === "below-center" && (
                <figcaption className="truncate text-xs text-muted-foreground">
                  {gif.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
