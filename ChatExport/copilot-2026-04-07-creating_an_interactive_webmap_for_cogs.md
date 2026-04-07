---
date: 2026-04-07
title: "Creating an Interactive Webmap for COGs"
tags: [copilot, chat-export]
workspace: "BiomeInventoryWebmap"
---

# Creating an Interactive Webmap for COGs

**User**
Hello,
I want to create a interactive Webmap to display the cloud optimized geotiffs stored in the cog folder. For each cog there is a json file containing color and legend information for each value of the cog. These information should be used for symbolisation of the cog and for creating the legend.

The interactive Webmap should be build as a homepage built with html, css for styles. Packages to include should be:

MapLibre GL - https://unpkg.com/maplibre-gl@5.22.0/dist/maplibre-gl.js https://maplibre.org/maplibre-gl-js/docs/
MapLibre COG Protocol  https://unpkg.com/@geomatico/maplibre-cog-protocol@0.8.0/dist/index.js 
https://github.com/geomatico/maplibre-cog-protocol
Geotiff.js https://cdn.jsdelivr.net/npm/geotiff  https://geotiffjs.github.io/geotiff.js/index.html 

With these JavaScript Libraries it should be easy to create a interactive map that shows the globe (as a round globe projection!!) with the cog on top. Next to the Map there should be a sidebar that has a dropdown menu to select the cog layer to display (first cog as default!), the legend (build based on the corresponding json file) and a box with additional metadata (derived from the BiomesInformation.txt file. Please arrange it in a tabular way).

The cog files and json files are named with numbers 01 – 31 representing the cog layers. The BiomesInformation.txt file doesn´t have these numbers as ID column. But the Information is stored also in the order from 01-31. So please use the Info from the “Publication” Column of the txt file to name the cog files on the frontend of the webmap. I mean, I want to select the cog to be displayed with a readable name and not just a number.

**Copilot**
I will scaffold a complete static webmap app in this workspace and wire it to your COG, JSON, and metadata files; first I am checking the current files to match the real data formats before I implement.

> **[copilot_listDirectory]** Read [](file://BiomeInventoryWebmap)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/README.md)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/legend/BiomesInformation.txt)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/json/Biome_Inventory_layer_01.json)
I verified the metadata and legend formats; next I am checking the exact COG filenames and protocol usage details so I can wire the map source correctly on first pass.

> **[copilot_fetchWebPage]** Used tool


> **[copilot_listDirectory]** Read [](file://BiomeInventoryWebmap/BiomeInventoryWebmap/cog)


> **[copilot_findFiles]** Searched for files matching `BiomeInventoryWebmap` · `*.html`, no matches


> **[vscode_fetchWebPage_internal]** Fetched https://github.com/geomatico/maplibre-cog-protocol


> **[copilot_listDirectory]** Read [](file://BiomeInventoryWebmap/cog)


> **[copilot_findFiles]** Searched for files matching `BiomeInventoryWebmap` · `*.html`, no matches


> **[vscode_fetchWebPage_internal]** Fetched https://github.com/geomatico/maplibre-cog-protocol
I now have enough context and will implement the full homepage in three files, then connect layer selection, JSON-driven color rendering, dynamic legend, and tabular metadata from the TXT file.

Plan:
1. Create a responsive layout with a left sidebar and globe map view.
2. Load MapLibre, COG protocol, and geotiff.js via CDN exactly as requested.
3. Parse  as semicolon-delimited quoted text, using row order as IDs 01-31 and Publication for dropdown labels.
4. For the selected layer, load matching JSON legend, apply custom pixel color mapping to the selected COG, and rebuild the legend panel.
5. Render metadata for the selected publication in a two-column table.
6. Set layer 01 as default and verify the map/layer switching logic works without page  as semicolon-delimited quoted text, using row order as IDs 01-31 and Publication for dropdown labels.
4. For the selected layer, load matching JSON legend, apply custom pixel color mapping to the selected COG, and rebuild the legend panel.
5. Render metadata for the selected publication in a two-column table.
6. Set layer 01 as default and verify the map/layer switching logic works without page reload.

> **[copilot_createFile]** Created [](file://BiomeInventoryWebmap/index.html)


> **[copilot_createFile]** Created [](file://BiomeInventoryWebmap/styles.css)


> **[copilot_createFile]** Created [](file://BiomeInventoryWebmap/app.js)
I have created the full app files and next I am validating for syntax/issues and then I will add brief run instructions so you can launch it easily.

> **[copilot_applyPatch]** Generating patch (25 lines) in [](file://BiomeInventoryWebmap/README.md)


> **[copilot_getErrors]** Checked [](file://BiomeInventoryWebmap/index.html), [](file://BiomeInventoryWebmap/styles.css), [](file:///BiomeInventoryWebmap/app.js), no problems found

```

```
Implementation is complete and lint diagnostics are clean; I will quickly list changed files and then summarize exactly what is now working and how to run it.

> **[copilot_getChangedFiles]** Read changed files in the active git repository
I found one robustness improvement before finishing: I am patching the color mapping so class values still render even if raster values arrive as near-integers like 1.0000001 instead of exact integers.

> **[copilot_applyPatch]** Generating patch (9 lines) in [](file://BiomeInventoryWebmap/app.js)

```

```


> **[copilot_getErrors]** Checked [](file://BiomeInventoryWebmap/app.js), no problems found


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#1-1), lines 1 to 280


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/README.md)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#281-281), lines 281 to 294


> **[copilot_getErrors]** Checked [](file://BiomeInventoryWebmap/app.js), no problems found


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#1-1), lines 1 to 280


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/README.md)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#281-281), lines 281 to 294
**Final response formatting decided**

Preparing a concise final summary with clickable markdown links to changed workspace files using relative paths and optional line references. Commands will be quoted without code blocks or backticks. Output of commands won’t be shown due to repository state. Optional next steps may include asking about adding hover pixel value features. This ensures clarity and compliance with formatting instructions.Implemented a complete interactive globe webmap homepage that uses your COG and JSON files directly, with readable publication names from the TXT metadata.

Updated files:
- 
- 
- 
- 

What is now working:
- Round globe map (MapLibre globe projection) with COG rendering via maplibre-cog-protocol.
- Layer dropdown defaults to layer 01 and lists entries as:
  - 01 - Allen et al., 2020
  - 02 - Buchhorn et al., 2019
  - etc., based on Publication in .
- Dynamic legend panel generated from the matching JSON file for each layer.
- Dynamic metadata table (tabular view) generated from the corresponding TXT row by layer order 01-31.
- Class-based COG symbolization using your JSON value-color pairs, including alpha-aware hex colors.

Key implementation points:
- COG protocol registration and globe map setup: 
- Publication-driven dropdown population: 
- Legend rendering from JSON: 
- Metadata table rendering from TXT: 
- Per-pixel color mapping using JSON classes: 
- Layer switch logic (remove/add source and layer): 

Run:
- Start a local server from the project folder (required for fetch and range requests), for example:
  - python -m http.server 8000
- Open:
  - http://localhost:8000

If you want, I can add layer search, hover pixel value readout, and a download/export button for the active legend and metadata.

**User**
Perfect, that works well. 
There´s one addition I´d like you to add. If I klick somewhere on the Map there should open a popup with this content: “According to {“Publication”} this area is assigned to the biome class: {“Legend entry of the clicked pixel”} “

**Copilot**
I’ll add a click handler on the map that reads the clicked COG pixel value and opens a popup using the active layer’s Publication plus the matching legend label.

> **[copilot_applyPatch]** Generating patch (70 lines) in [](file://BiomeInventoryWebmap/app.js)

```

```
The popup behavior is now wired in; I’m running a quick error check to ensure the new click-query code is clean.

> **[copilot_getErrors]** Checked [](file://BiomeInventoryWebmap/app.js), no problems found
Added. Clicking on the map now opens a popup with:

According to {Publication} this area is assigned to the biome class: {Legend entry of the clicked pixel}

What I changed:
- Added COG pixel query on click using .
- Tracked active , active COG URL, and a  lookup map for the selected layer.
- Rounded the clicked pixel value to match class values and displayed the matching legend text in a popup.

Updated file:
- 

Notes:
- Popup only appears when the clicked pixel maps to a known legend class.
- If a click is outside valid raster data or no class match exists, no popup is shown.

**User**
Super!
Now please adjust the design of the interactive map a little bit so that it looks good with this color #009260 as background.
Also please add the favicon of the University of Bayreuth: https://www.biogeo.uni-bayreuth.de/biogeo/?lang=de 

**Copilot**
I’ll restyle the page around #009260 so the UI harmonizes with that background, and then I’ll fetch the Bayreuth page to locate a valid favicon URL to embed in the head.

> **[copilot_fetchWebPage]** Used tool


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/styles.css)


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/index.html)


> **[vscode_fetchWebPage_internal]** Fetched https://www.biogeo.uni-bayreuth.de/biogeo/?lang=de
I found the current style and will now apply a green-centric theme plus add the favicon link; I’ll use the university favicon URL from their main domain for reliability.

> **[copilot_applyPatch]** Generating patch (12 lines) in [](file://BiomeInventoryWebmap/index.html)

```

```


> **[copilot_applyPatch]** Generating patch (70 lines) in [](file://BiomeInventoryWebmap/styles.css)

```

```
I’ve applied the design refresh and favicon link; next I’m doing a quick validation pass for markup/style I’ve applied the design refresh and favicon link; next I’m doing a quick validation pass for markup/style issues.

> **[copilot_getErrors]** Checked [](file://BiomeInventoryWebmap/index.html), [](file://BiomeInventoryWebmap/styles.css), no problems found


> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/index.html#1-1), lines 1 to 30
Done. I adjusted the visual design so it works with #009260 as the page background and added the University of Bayreuth favicon.

Updated files:
- 
- 

What changed:
- Re-themed the color system around #009260.
- Updated gradients and panel/map surfaces to harmonize with the green background.
- Refined borders/shadows for better contrast and readability.
- Added popup styling so click popups match the new theme.
- Added favicon link in the head:
  - https://www.uni-bayreuth.de/favicon.ico

If you want, I can do one more pass to make the sidebar look more “University-brand-like” (for example with a subtle yellow accent matching UBT colors).

**User**
Good, please adjust the colors a little bit that the background color of the map box and the sidebar box are a light grey and not a light green.

**Copilot**
The user wants the background colors of the map box and sidebar box to be light grey instead of light green. Let me first check the current file contents to see what colors are currently being used.

I should read the current styles.css file to see what the current colors are.I'll check the current file contents first to see what needs adjusting. 

> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/styles.css#1-1), lines 1 to 180
I can see the current colors:
- `.sidebar` has a light green gradient background: `linear-gradient(180deg, rgba(243, 255, 249, 0.98), rgba(225, 248, 238, 0.95))` 
- `.panel` has a white background: `rgba(255, 255, 255, 0.82)` - this is already light, but uses white with opacity
- `#map` has a light green background: `#c6eedf`

The user wants the sidebar and map box backgrounds to be light grey instead of light green. I need to change:
1. `.sidebar` background to a light grey gradient
2. `#map` background to light grey

I should use a neutral light grey color. Something like #e8e8e8, #f0f0f0, or #d9d9d9 would work well.

Let me update these colors.I'll change the sidebar and map box backgrounds from light green to light grey. 

> **[copilot_multiReplaceString]** Replacing 15 lines with 15 lines in [](file://BiomeInventoryWebmap/styles.css)

```

```
Good, I've updated the background colors. Let me verify the changes look good by checking the updated file.Updated. The sidebar and map box backgrounds are now light grey instead of light green:

- Sidebar: changed from light green gradient to grey gradient (#f5f5f5 → #e8e8e8)
- Map box: changed from light green (#c6eedf) to light grey (#ececec)

The green accent color (#009260) remains as the page background, and the borders also retain their green tone for a cohesive design.

**User**
Please format the contents of the popup a bit better. I give you an example here:
"According to {Publication} this area is assigned to the biome class:

{Biome Class}"
Please put the Publication and Biomeclass in bold and make a new line before the Biome Class.

**Copilot**
The user wants me to improve the popup formatting. They want:
1. Put the Publication and Biome Class in bold
2. Make a new line before the Biome Class
3. The format should be: "According to {Publication} this area is assigned to the biome class:\n\n{Biome Class}"

I need to find where the popup text is generated in app.js and update it to use HTML formatting (bold tags and line breaks).

Let me check the current popup code first.

> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#280-280), lines 280 to 333
I found the popup code. I need to change line around 308-312 where the popupText is created. The current format is:
```
const popupText = `According to ${currentPublication} this area is assigned to the biome class: ${legendEntry}`;
```

I need to change it to include HTML formatting with bold tags

> **[copilot_readFile]** Read [](file://BiomeInventoryWebmap/app.js#280-280), lines 280 to 333
I found the popup code. I need to change line around 308-312 where the popupText is created. The current format is:
```
const popupText = `According to ${currentPublication} this area is assigned to the biome class: ${legendEntry}`;
```

I need to change it to include HTML formatting with bold tags and a line break. The new format should be:
```
const popupHTML = `<p>According to <strong>${currentPublication}</strong> this area is assigned to the biome class:</p><p><strong>${legendEntry}</strong></p>`;
```

Then update the setHTML call to use popupHTML instead of wrapping popupText in a p tag.

Let me do this replacement now.

> **[copilot_replaceString]** Replacing 13 lines with 13 lines in [](file:///BiomeInventoryWebmap/app.js)

```

```
Good, I've updated the popup formatting. Now the popup will display:
- "According to {Publication} this area is assigned to the biome class:" on the first line
- A line break
- The biome class name in bold on the second paragraph

And both the Publication and Biome Class are now in bold using <strong> tags.Done. The popup now displays with improved formatting:
- Publication and Biome Class in bold
- Line break between the description and the class name
- Each in its own paragraph for better visual separation

