# Gif Results Acceptance

**Scenario 1: Show basic results summary**
Given: 3 GIFs from search, total_count = 42  
When: GifResults renders  
Then: A "Results" heading is visible  
And: A label "Showing 3 of 42" is visible  
And: Exactly 3 GIF tiles are rendered.

**Scenario 2: Caption below image by default**
Given: GifResults renders with default settings  
When: A GIF tile is shown  
Then: The GIF title is rendered as text below the image.

**Scenario 3: Caption overlaid at top / bottom**
Given: The user selects "Top center" or "Bottom center" in Caption position  
When: GifResults re-renders  
Then: The GIF title is rendered as an overlay inside the image area  
And: The text is aligned near the top or bottom respectively.

**Scenario 4: No results state**
Given: GifResults renders with no GIFs  
When: GifResults re-renders  
Then: A "No results" message is visible  
And: The message encourages a search term.
