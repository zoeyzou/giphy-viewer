# Gif Search Acceptance

**Scenario 1: Basic Search**
Given: "cat" query, "Fun cats!", "top-center"
When: Submit
Then: 3 GIFs load (images.downsized_medium.url)
Text overlays top-center
"Showing 3 of X" visible

**Scenario 2: Responsive**
Desktop: 3-col grid
Mobile: 1-col stack
