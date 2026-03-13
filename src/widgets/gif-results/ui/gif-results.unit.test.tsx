import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { GiphyGif } from "@/entities/GiphyGif"
import { GifResults } from "./gif-results"

const mockGifs: GiphyGif[] = [
  {
    id: "1",
    title: "Cat 1",
    images: {
      downsized_medium: {
        url: "https://example.com/cat1.gif",
        width: "200",
        height: "200",
      },
    },
  },
  {
    id: "2",
    title: "Cat 2",
    images: {
      downsized_medium: {
        url: "https://example.com/cat2.gif",
        width: "200",
        height: "200",
      },
    },
  },
  {
    id: "3",
    title: "Cat 3",
    images: {
      downsized_medium: {
        url: "https://example.com/cat3.gif",
        width: "200",
        height: "200",
      },
    },
  },
]

const defaultProps = {
  gifs: mockGifs,
  isLoading: false,
  totalCount: 42,
  page: 1,
  totalPages: 1,
  canGoNext: false,
  canGoPrev: false,
  onNextPage: () => {},
  onPrevPage: () => {},
}

describe("GifResults", () => {
  it("shows results heading, summary label, and 3 GIF tiles", () => {
    render(<GifResults {...defaultProps} />)

    expect(screen.getByText("Results")).toBeTruthy()
    expect(screen.getByText("Showing 3 of 42")).toBeTruthy()
    expect(screen.getByText("Cat 1")).toBeTruthy()
    expect(screen.getByText("Cat 2")).toBeTruthy()
    expect(screen.getByText("Cat 3")).toBeTruthy()
  })

  it("renders caption below image by default", () => {
    render(<GifResults {...defaultProps} gifs={[mockGifs[0]]} />)

    const caption = screen.getAllByText("Cat 1")[0] as HTMLElement
    expect(caption).toBeTruthy()
    // Default: below-center, so no overlay class
    expect(caption.className).not.toContain("absolute left-1/2")
    // Uses the non-overlay caption styling
    expect(caption.className).toContain("truncate")
    expect(caption.className).toContain("text-xs")
    expect(caption.className).toContain("text-muted-foreground")
  })

  // renders caption position selector
  it("renders caption position selector", () => {
    render(<GifResults {...defaultProps} gifs={[mockGifs[0]]} />)

    const selects = screen.getAllByLabelText(/Caption position/i)
    expect(selects).toHaveLength(3)
  })

  // renders loading state
  it("renders loading state", () => {
    render(
      <GifResults {...defaultProps} gifs={[mockGifs[0]]} isLoading={true} />
    )

    expect(screen.getByText("Loading GIFs…")).toBeTruthy()
  })

  // renders no results state
  it("renders no results state", () => {
    render(<GifResults {...defaultProps} gifs={[]} />)

    expect(screen.getByText("Enter a search term to see GIFs.")).toBeTruthy()
  })

  it("allows changing caption position to top-center (overlay)", async () => {
    const user = userEvent.setup()
    render(<GifResults {...defaultProps} gifs={[mockGifs[0]]} />)

    const selects = screen.getAllByLabelText(/Caption position/i)
    const firstSelect = selects[1] as HTMLSelectElement
    await user.selectOptions(firstSelect, "top-center")

    expect(firstSelect.value).toBe("top-center")
  })

  it("allows changing caption position to bottom-center (overlay)", async () => {
    const user = userEvent.setup()
    render(
      <>
        <GifResults {...defaultProps} gifs={[mockGifs[0]]} />
        {/* second instance to ensure multiple widgets don't break */}
        <GifResults {...defaultProps} gifs={[mockGifs[0]]} />
      </>
    )

    const selects = screen.getAllByLabelText(/Caption position/i)
    const firstSelect = selects[0] as HTMLSelectElement

    await user.selectOptions(firstSelect, "bottom-center")

    // Ensure the select reflects the chosen value
    expect(firstSelect.value).toBe("bottom-center")
  })
})
