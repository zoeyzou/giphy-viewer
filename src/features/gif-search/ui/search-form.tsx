import type { SubmitEvent } from "react"
import { Button } from "@/shared/ui/shadcn/button"
import { Input } from "@/shared/ui/shadcn/input"

interface SearchFormProps {
  query: string
  isLoading: boolean
  error: string | null
  onQueryChange: (value: string) => void
  onSubmit: () => Promise<void> | void
}

export function SearchForm({
  query,
  isLoading,
  error,
  onQueryChange,
  onSubmit,
}: SearchFormProps) {
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit()
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      aria-label="GIF search"
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Search term</span>
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try cats, dogs, or memes"
          disabled={isLoading}
        />
      </label>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching…" : "Search GIFs"}
        </Button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  )
}
