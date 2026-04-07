# BiomeInventoryWebmap
This project aims to demonstrate how vibe coding can improve the accessibility and transparency of ecological research.

## Interactive Webmap

This repository now includes a static interactive webmap homepage:

- `index.html` for layout and script loading
- `styles.css` for UI styling and responsive layout
- `app.js` for map, COG, legend, and metadata logic

### Run locally

Because COG and JSON files are loaded with `fetch` and HTTP range requests, open this project through a local web server (not directly via `file://`).

Examples:

- `python -m http.server 8000`
- `npx serve .`

Then open `http://localhost:8000`.
