export interface GiphyImage {
  downsized_medium: {
    url: string
    width: string
    height: string
  }
}

export interface GiphyGif {
  id: string
  title: string
  images: GiphyImage
}

export interface GiphySearchResponse {
  data: GiphyGif[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
}

export type TextPosition = "top-center" | "bottom-center" | "below-center"
