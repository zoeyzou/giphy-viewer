import { GifSearch, type GifSearchRenderState } from "@/features/gif-search"
import { GifResults } from "@/widgets/gif-results"

export function ExplorerPage() {
  return (
    <div className="flex min-h-svh flex-col gap-8 p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Giphy Explorer</h1>
          <p>Search and play with GIFs from Giphy.</p>
        </div>
        <GifSearch>
          {({
            results,
            isLoading,
            totalCount,
            page,
            totalPages,
            canGoNext,
            canGoPrev,
            goToNextPage,
            goToPrevPage,
          }: GifSearchRenderState) => (
            <GifResults
              gifs={results}
              isLoading={isLoading}
              totalCount={totalCount}
              page={page}
              totalPages={totalPages}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
              onNextPage={goToNextPage}
              onPrevPage={goToPrevPage}
            />
          )}
        </GifSearch>
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
