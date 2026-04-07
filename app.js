const SOURCE_ID = "biome-cog-source";
const LAYER_ID = "biome-cog-layer";
const LAYER_COUNT = 31;

function buildLayerCatalog() {
  return Array.from({ length: LAYER_COUNT }, (_, i) => {
    const index = i + 1;
    const layerId = String(index).padStart(2, "0");
    return {
      index,
      layerId,
      cogPath: `./cog/Biome_Inventory_layer_${layerId}.tif`,
      jsonPath: `./json/Biome_Inventory_layer_${layerId}.json`
    };
  });
}

function splitSemicolonLine(line) {
  const out = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      const isEscapedQuote = inQuotes && line[i + 1] === '"';
      if (isEscapedQuote) {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ";" && !inQuotes) {
      out.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  out.push(current);
  return out.map((v) => v.trim());
}

function parseBiomesInformation(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = splitSemicolonLine(lines[0]);

  return lines.slice(1).map((line, idx) => {
    const values = splitSemicolonLine(line);
    const record = {};

    headers.forEach((h, i) => {
      record[h] = values[i] ?? "";
    });

    record.__index = idx + 1;
    return record;
  });
}

function hexToRgbaArray(hex) {
  const normalized = hex.trim().replace("#", "");
  const hasAlpha = normalized.length === 8;
  const fullHex = hasAlpha ? normalized : `${normalized}FF`;

  const r = Number.parseInt(fullHex.slice(0, 2), 16);
  const g = Number.parseInt(fullHex.slice(2, 4), 16);
  const b = Number.parseInt(fullHex.slice(4, 6), 16);
  const a = Number.parseInt(fullHex.slice(6, 8), 16);

  return [r, g, b, a];
}

function buildLegend(container, legendItems) {
  container.innerHTML = "";

  legendItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = item.color;

    const label = document.createElement("span");
    label.textContent = item.legend;

    const value = document.createElement("span");
    value.className = "legend-value";
    value.textContent = String(item.value);

    row.appendChild(swatch);
    row.appendChild(label);
    row.appendChild(value);
    container.appendChild(row);
  });
}

function buildMetadataTable(container, metadataRow) {
  if (!metadataRow) {
    container.innerHTML = "<p>No metadata found for this layer.</p>";
    return;
  }

  const table = document.createElement("table");
  table.className = "meta-table";

  Object.entries(metadataRow)
    .filter(([key]) => key !== "__index")
    .forEach(([key, value]) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const td = document.createElement("td");

      th.textContent = key;
      td.textContent = value;

      tr.appendChild(th);
      tr.appendChild(td);
      table.appendChild(tr);
    });

  container.innerHTML = "";
  container.appendChild(table);
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.json();
}

async function fetchText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.text();
}

function applyColorMappingToCog(cogUrl, legendItems) {
  const colorMap = new Map();

  legendItems.forEach((item) => {
    colorMap.set(Number(item.value), hexToRgbaArray(item.color));
  });

  MaplibreCOGProtocol.setColorFunction(cogUrl, (pixel, color, metadata) => {
    const value = pixel[0];

    if (Number.isNaN(value) || (metadata && value === metadata.noData)) {
      color.set([0, 0, 0, 0]);
      return;
    }

    const mapped = colorMap.get(value) ?? colorMap.get(Math.round(value));
    if (mapped) {
      color.set(mapped);
      return;
    }

    color.set([0, 0, 0, 0]);
  });
}

function ensureGlobeProjection(map) {
  try {
    map.setProjection({ type: "globe" });
  } catch (_) {
    try {
      map.setProjection("globe");
    } catch (_) {
      // Keep default projection if globe is unavailable.
    }
  }
}

async function init() {
  const layers = buildLayerCatalog();
  const layerSelect = document.getElementById("layerSelect");
  const legendContainer = document.getElementById("legend");
  const metadataContainer = document.getElementById("metadata");

  maplibregl.addProtocol("cog", MaplibreCOGProtocol.cogProtocol);

  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    projection: { type: "globe" },
    center: [10, 15],
    zoom: 1.3,
    renderWorldCopies: false,
    attributionControl: true
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  const infoText = await fetchText("./legend/BiomesInformation.txt");
  const metadataRows = parseBiomesInformation(infoText);

  layers.forEach((layer) => {
    const row = metadataRows[layer.index - 1];
    const publication = row ? row.Publication || row["Publication"] : "";

    const option = document.createElement("option");
    option.value = layer.layerId;
    option.textContent = publication
      ? `${layer.layerId} - ${publication}`
      : `${layer.layerId} - Layer ${layer.layerId}`;
    layerSelect.appendChild(option);
  });

  let currentLayerId = "01";

  async function renderLayer(layerId) {
    const layer = layers.find((l) => l.layerId === layerId);
    if (!layer) {
      return;
    }

    currentLayerId = layerId;

    const legendItems = await fetchJson(layer.jsonPath);
    buildLegend(legendContainer, legendItems);

    const metadataRow = metadataRows[layer.index - 1];
    buildMetadataTable(metadataContainer, metadataRow);

    const absoluteCogUrl = new URL(layer.cogPath, window.location.href).href;
    applyColorMappingToCog(absoluteCogUrl, legendItems);

    if (map.getLayer(LAYER_ID)) {
      map.removeLayer(LAYER_ID);
    }

    if (map.getSource(SOURCE_ID)) {
      map.removeSource(SOURCE_ID);
    }

    map.addSource(SOURCE_ID, {
      type: "raster",
      url: `cog://${absoluteCogUrl}`,
      tileSize: 256
    });

    map.addLayer({
      id: LAYER_ID,
      source: SOURCE_ID,
      type: "raster",
      paint: {
        "raster-opacity": 0.92
      }
    });
  }

  map.on("style.load", () => {
    ensureGlobeProjection(map);
  });

  map.on("load", async () => {
    ensureGlobeProjection(map);
    await renderLayer(currentLayerId);
  });

  layerSelect.addEventListener("change", async (event) => {
    const selected = event.target.value;
    await renderLayer(selected);
  });
}

init().catch((error) => {
  console.error(error);
  const metadataContainer = document.getElementById("metadata");
  if (metadataContainer) {
    metadataContainer.innerHTML = `<p>Initialization failed: ${error.message}</p>`;
  }
});
