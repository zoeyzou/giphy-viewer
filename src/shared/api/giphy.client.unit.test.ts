import { beforeEach, describe, expect, it, vi } from "vitest"
import { searchGifs } from "./giphy.client"

const mockGifs = [
  { id: "1", title: "cat", images: { downsized_medium: { url: "img.gif" } } },
]

describe("giphy.client", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns empty for empty query", async () => {
    const result = await searchGifs("")
    expect(result).toEqual({ gifs: [], totalCount: 0 })
  })

  it("fetches and normalizes 3 GIFs", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: mockGifs,
        pagination: { total_count: 10, count: 1, offset: 0 },
      }),
    })
    vi.spyOn(globalThis, "fetch").mockImplementation(mockFetch)

    const result = await searchGifs("cat")

    expect(result.gifs).toHaveLength(1)
    expect(result.gifs[0].images.downsized_medium.url).toBe("img.gif")
    expect(result.totalCount).toBe(10)
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("q=cat"))
  })
})
