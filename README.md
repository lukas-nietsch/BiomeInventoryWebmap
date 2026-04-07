# BiomeInventoryWebmap
This project aims to demonstrate how vibe coding can improve the accessibility and transparency of ecological research.

## Introduction

In this project the aim is to demonstrate how vibe coding can improve the accessibility and transparency of ecological research. Therefore we demonstrate how to create an interactive web tool to visualize the global catalogue of biome classifications (Fischer et al., 2022).

Before starting to build an application, it is important to be clear which kind of data and which functionalities the application should include. The data in our example for the global biome inventory is a spatial raster stack from Fischer et al., 2022. The raster stack was preprocessed in R to single Cloud-Optimized-GeoTIFFs COG, within this step there was also a legend entry written to store the legend text and the color provided by Fischer et al., 2022.

Furthermore, we define the purpose and the target group from the very first start: The biome inventory should stay simple, with a dropdown menu to select single biome maps, a legend and additional metadata information. The aim should be to give a quick overlook of the distribution and metadata of the global biomes, hence interested researchers have a tool to evaluate the data, get the differences between the biome maps and choose suited ones for their projects.

There are plenty possibilities to realize a project like this (e.g. Shiny or Leaflet). We choose to build a webmap based on MapLibre, embedded in a HTML, JavaScript Homepage. This way it can be published easily via Github pages and the MapLibre library has a good support for raster maps and global visualizations.

We used Visual Studio Code with Github Copilot as LLM. 


## First Prompt

With all our considerations we came up with this first prompt:


> Hello,
> I want to create a interactive Webmap to display the cloud optimized geotiffs stored in the cog folder. For each cog there is a json file containing color and legend information for each value of the cog. These information should be used for symbolisation of the cog and for creating the legend.
>
> The interactive Webmap should be build as a homepage built with html, css for styles. Packages to include should be:
>
> MapLibre GL - https://unpkg.com/maplibre-gl@5.22.0/dist/maplibre-gl.js https://maplibre.org/maplibre-gl-js/docs/
> MapLibre COG Protocol  https://unpkg.com/@geomatico/maplibre-cog-protocol@0.8.0/dist/index.js https://github.com/geomatico/maplibre-cog-protocol
> Geotiff.js https://cdn.jsdelivr.net/npm/geotiff https://geotiffjs.github.io/geotiff.js/index.html 
>
> With these JavaScript Libraries it should be easy to create a interactive map that shows the globe (as a round globe projection!!) with the cog on top. Next to the Map there should be a sidebar that has a dropdown menu to select the cog layer to display (first cog as default!), the legend (build based on the corresponding json file) and a box with additional metadata (derived from the BiomesInformation.txt file. Please arrange it in a tabular way).
>
> The cog files and json files are named with numbers 01 – 31 representing the cog layers. The BiomesInformation.txt file doesn´t have these numbers as ID column. But the Information is stored also in the order from 01-31. So please use the Info from the “Publication” Column of the txt file to name the cog files on the frontend of the webmap. I mean, I want to select the cog to be displayed with a readable name and not just a number.

The basic interactive map was fully functioning after the first prompt. We did some smaller adjustments within 4 extra prompts, just to add a popup function and adjust the appearance a bit.

The complete Chat can be found in the ChatExport folder.

## Citation:

Fischer J-C, Waltenowitz A, Beierkuhnlein C (2022) The biome inventory - Standardizing global biogeographical units. Global Ecology and Biogeography31(11):2172-2183: https://doi.org/10.1111/geb.13574 For the compilation of the biome layers.

Groß H, Zizka A (2025): biomes: Analysis of Taxon Distributions in Global Biomes. R package, Version 0.9. https://github.com/azizka/biomes. For the Rpackage.
