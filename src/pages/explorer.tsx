import { Button } from "@/shared/ui/shadcn/button"

export function ExplorerPage() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Giphy Explorer</h1>
          <p>Search and play with GIFs from Giphy.</p>
          <p>You can start by wiring up the search feature next.</p>
          <Button className="mt-2">Sample Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
