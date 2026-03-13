import { describe, expect, it, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { GiphyGif } from "@/entities/GiphyGif"
import { ExplorerPage } from "./explorer"
import { searchGifs } from "@/shared/api/giphy.client"

vi.mock("@/shared/api/giphy.client", () => {
  return {
    searchGifs: vi.fn(),
  }
})

const mockedSearchGifs = searchGifs as unknown as ReturnType<typeof vi.fn>

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

describe("ExplorerPage (integration)", () => {
  it("performs a basic GIF search and shows 3 results", async () => {
    mockedSearchGifs.mockResolvedValueOnce({
      gifs: mockGifs,
      totalCount: 3,
    })

    const user = userEvent.setup()
    render(<ExplorerPage />)

    // Header content
    expect(screen.getByText(/Giphy Explorer/i)).toBeTruthy()

    // Type query
    const inputs = screen.getAllByLabelText(/Search term/i)
    await user.type(inputs[0], "cats")

    // Submit search
    const button = screen.getByRole("button", { name: /Search GIFs/i })
    await user.click(button)

    // Wait for results summary and tiles
    await waitFor(() => {
      expect(screen.getByText(/Showing 3 of 3/i)).toBeTruthy()
    })

    expect(screen.getByText("Cat 1")).toBeTruthy()
    expect(screen.getByText("Cat 2")).toBeTruthy()
    expect(screen.getByText("Cat 3")).toBeTruthy()
  })

  it("shows pagination info and updates page when Next is clicked", async () => {
    // First search (page 1)
    mockedSearchGifs
      .mockResolvedValueOnce({
        gifs: mockGifs,
        totalCount: 10,
      })
      // Second search (page 2)
      .mockResolvedValueOnce({
        gifs: mockGifs,
        totalCount: 10,
      })

    const user = userEvent.setup()
    render(<ExplorerPage />)

    const inputs = screen.getAllByLabelText(/Search term/i)
    await user.type(inputs[0], "cats")
    const buttons = screen.getAllByRole("button", { name: /Search GIFs/i })
    await user.click(buttons[0])

    // Page 1 of N with summary visible
    await waitFor(() => {
      expect(screen.getByText(/Showing 3 of 10/i)).toBeTruthy()
      expect(screen.getByText(/Page 1 of/i)).toBeTruthy()
    })

    const nextButton = screen.getByRole("button", { name: /Next/i })
    const prevButton = screen.getByRole("button", { name: /Previous/i })

    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()

    // Go to page 2
    await user.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText(/Page 2 of/i)).toBeTruthy()
    })
  })
})
