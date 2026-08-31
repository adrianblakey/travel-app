const TRIP_URL = "data/trips/peru-south-america-2027.json";

const TYPE_COLORS = {
  port: "#1d6f5e",
  embark: "#1d6f5e",
  disembark: "#1d6f5e",
  sea: "#4d7ea8",
  scenic: "#8a5fb0",
  hotel: "#b5793a",
  transfer: "#b5793a",
  excursion: "#b3392b",
};

const UI = {
  appTitle: { en: "Our Trip", de: "Unsere Reise" },
  loading: { en: "Loading trip…", de: "Reise wird geladen…" },
  tabMap: { en: "Route Map", de: "Karte" },
  tabTimeline: { en: "Day by Day", de: "Tag für Tag" },
  tabShip: { en: "The Ship", de: "Das Schiff" },
  flightsFallback: { en: "Flights", de: "Flüge" },
  arrive: { en: "Arrive", de: "Ankunft" },
  depart: { en: "Depart", de: "Abfahrt" },
  stayingAt: { en: "Staying at:", de: "Unterkunft:" },
  excursion: { en: "excursion", de: "Ausflug" },
  excursions: { en: "excursions", de: "Ausflüge" },
  highlights: { en: "Highlights", de: "Highlights" },
  moreInfo: { en: "More on viking.com →", de: "Mehr auf viking.com →" },
  moreInfoShipsAtSea: { en: "Photos & specs on shipsatsea.de →", de: "Fotos & Daten auf shipsatsea.de →" },
  guests: { en: "Guests", de: "Gäste" },
  crew: { en: "Crew", de: "Besatzung" },
  staterooms: { en: "Staterooms", de: "Kabinen" },
  decks: { en: "Decks", de: "Decks" },
  length: { en: "Length", de: "Länge" },
  beam: { en: "Beam", de: "Breite" },
  grossTonnage: { en: "Gross tonnage", de: "Bruttoraumzahl" },
  cruisingSpeed: { en: "Cruising speed", de: "Reisegeschwindigkeit" },
  copyright: {
    en: "© {year} Adrian Blakey. All rights reserved. This site and its content — text, itinerary details and photos — are the author's own work, shared for personal, non-commercial viewing only. No part of it may be reproduced, republished or used for commercial purposes without prior written permission.",
    de: "© {year} Adrian Blakey. Alle Rechte vorbehalten. Diese Website und ihre Inhalte — Texte, Reisedetails und Fotos — sind das eigene Werk des Autors und werden ausschließlich zur persönlichen, nicht-kommerziellen Ansicht bereitgestellt. Eine Vervielfältigung, Weiterveröffentlichung oder kommerzielle Nutzung ist ohne vorherige schriftliche Genehmigung nicht gestattet.",
  },
  typePort: { en: "In port", de: "Im Hafen" },
  typeEmbark: { en: "Embark", de: "Einschiffung" },
  typeDisembark: { en: "Disembark", de: "Ausschiffung" },
  typeSea: { en: "At sea", de: "Auf See" },
  typeScenic: { en: "Scenic sailing", de: "Landschaftliche Fahrt" },
  typeHotel: { en: "On land", de: "An Land" },
  typeTransfer: { en: "Transfer", de: "Transfer" },
  typeExcursion: { en: "Excursion", de: "Ausflug" },
  legendOnshore: { en: "Port, embark & disembark", de: "Hafen, Ein- & Ausschiffung" },
  legendSea: { en: "At sea", de: "Auf See" },
  legendScenic: { en: "Scenic sailing", de: "Landschaftliche Fahrt" },
  legendLand: { en: "Pre-cruise — on land", de: "Vor der Kreuzfahrt — an Land" },
  legendExcursion: { en: "Excursion", de: "Ausflug" },
  legendLabel: { en: "Legend", de: "Legende" },
  weatherNow: { en: "Current & forecast (Windy)", de: "Aktuell & Vorhersage (Windy)" },
  weatherTypical: { en: "Climate & typical weather (Wikipedia)", de: "Klima & typisches Wetter (Wikipedia)" },
  shippingForecast: { en: "Shipping forecast — waves (Windy)", de: "Seewetterbericht — Wellen (Windy)" },
  advisoryFcdo: { en: "UK travel advice (FCDO)", de: "Reisehinweise (FCDO, UK)" },
  advisoryAA: { en: "German travel advice (Auswärtiges Amt)", de: "Reisehinweise (Auswärtiges Amt)" },
  ourStateroom: { en: "Our Stateroom", de: "Unsere Kabine" },
  stateroomCategory: { en: "Category", de: "Kategorie" },
  stateroomCabin: { en: "Cabin number", de: "Kabinennummer" },
  stateroomCabinTbd: { en: "To be assigned", de: "Wird noch zugeteilt" },
  stateroomDeck: { en: "Typical deck for this category", de: "Übliches Deck für diese Kategorie" },
  deckPlanLink: { en: "View deck plan (PDF) →", de: "Deckplan ansehen (PDF) →" },
  aisToggleTitle: { en: "Show nearby ships (AIS)", de: "Schiffe in der Nähe zeigen (AIS)" },
  aisPanelTitle: { en: "Ships nearby", de: "Schiffe in der Nähe" },
  aisPrivacyNote: {
    en: "Live map from marinetraffic.com — loads only while open.",
    de: "Live-Karte von marinetraffic.com — lädt nur bei geöffnetem Fenster.",
  },
  aisClose: { en: "Close", de: "Schließen" },
};

const TYPE_LABEL_KEYS = {
  port: "typePort",
  embark: "typeEmbark",
  disembark: "typeDisembark",
  sea: "typeSea",
  scenic: "typeScenic",
  hotel: "typeHotel",
  transfer: "typeTransfer",
  excursion: "typeExcursion",
};

const LEGEND_ITEMS = [
  { color: TYPE_COLORS.port, key: "legendOnshore" },
  { color: TYPE_COLORS.hotel, key: "legendLand" },
  { color: TYPE_COLORS.excursion, key: "legendExcursion" },
  { color: TYPE_COLORS.scenic, key: "legendScenic" },
  { color: TYPE_COLORS.sea, key: "legendSea" },
];

// Official government travel-advisory pages, keyed by the `country` field on
// a day. Only real ashore/entry days carry a `country` — sea/scenic days
// don't, since no border is crossed. `aa` (Auswärtiges Amt) is left out
// where no dedicated country page exists (e.g. the Falklands, a UK
// territory not covered separately by the German Foreign Office).
const COUNTRY_ADVISORIES = {
  peru: { fcdo: "https://www.gov.uk/foreign-travel-advice/peru", aa: "https://www.auswaertiges-amt.de/de/service/laender/peru-node" },
  chile: { fcdo: "https://www.gov.uk/foreign-travel-advice/chile", aa: "https://www.auswaertiges-amt.de/de/service/laender/chile-node" },
  argentina: { fcdo: "https://www.gov.uk/foreign-travel-advice/argentina", aa: "https://www.auswaertiges-amt.de/de/service/laender/argentinien-node" },
  uruguay: { fcdo: "https://www.gov.uk/foreign-travel-advice/uruguay", aa: "https://www.auswaertiges-amt.de/de/service/laender/uruguay-node" },
  falklands: { fcdo: "https://www.gov.uk/foreign-travel-advice/falkland-islands", aa: null },
};

// Windy's waves layer is offered as a "shipping forecast" for days actually
// spent at sea or sailing scenic waters — not for days ashore.
const SHIPPING_FORECAST_TYPES = new Set(["sea", "scenic"]);

let trip = null;
let map = null;
let dayLayers = [];
let openPanelIndex = null;
let lang = "en";

try {
  const saved = localStorage.getItem("tripLang");
  if (saved === "en" || saved === "de") lang = saved;
} catch (e) {
  /* localStorage unavailable — default to English */
}

init();

async function init() {
  const res = await fetch(TRIP_URL);
  trip = await res.json();

  setupLangToggle();
  setupTabs();
  buildMap();
  renderAll();
}

function tr(key) {
  return (UI[key] && UI[key][lang]) || (UI[key] && UI[key].en) || "";
}

function t(field) {
  if (field === null || field === undefined) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field.en ?? "";
}

function setupLangToggle() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      lang = btn.dataset.lang;
      try {
        localStorage.setItem("tripLang", lang);
      } catch (e) {
        /* ignore persistence failures */
      }
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
      renderAll();
    });
  });
}

function renderAll() {
  document.documentElement.lang = lang;
  document.title = tr("appTitle");
  document.getElementById("trip-title").textContent = t(trip.title);
  document.getElementById("trip-subtitle").textContent =
    `${t(trip.subtitle)} · ${formatDateRange(trip.startDate, trip.endDate)}`;

  document.querySelector('.tab-btn[data-view="map"]').textContent = tr("tabMap");
  document.querySelector('.tab-btn[data-view="timeline"]').textContent = tr("tabTimeline");
  document.querySelector('.tab-btn[data-view="ship"]').textContent = tr("tabShip");
  document.getElementById("footer-copyright").textContent = tr("copyright").replace(
    "{year}",
    String(new Date().getFullYear())
  );

  buildFlightsLink();
  updateMapLabels();
  buildLegend();
  buildTimeline();
  buildShipInfo();
  updateAisLabels();

  if (openPanelIndex !== null) {
    openDayPanel(openPanelIndex);
  }
}

function updateAisLabels() {
  document.getElementById("ais-panel-title").textContent = tr("aisPanelTitle");
  document.getElementById("ais-privacy-note").textContent = tr("aisPrivacyNote");
  const toggleLink = document.getElementById("ais-toggle-link");
  if (toggleLink) toggleLink.title = tr("aisToggleTitle");
}

function buildFlightsLink() {
  const link = document.getElementById("flights-link");
  if (!trip.flights || !trip.flights.url) return;
  link.href = trip.flights.url;
  link.textContent = `✈ ${trip.flights.label ? t(trip.flights.label) : tr("flightsFallback")}`;
  link.hidden = false;
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
      document.getElementById(`view-${btn.dataset.view}`).classList.add("active");
      if (btn.dataset.view === "map" && map) {
        setTimeout(() => map.invalidateSize(), 50);
      }
    });
  });
}

function buildMap() {
  map = L.map("map", { scrollWheelZoom: true, zoomSnap: 0.25, zoomDelta: 0.5 });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const latlngs = trip.days.map((d) => [d.location.lat, d.location.lon]);

  const routeLine = L.polyline(latlngs, {
    color: "#1d6f5e",
    weight: 2.5,
    opacity: 0.75,
    dashArray: "1 8",
    lineCap: "round",
  }).addTo(map);

  // Arrowheads along the route show direction of travel (vertices are in
  // chronological day order, so each arrow points from earlier to later).
  if (window.L && L.polylineDecorator) {
    L.polylineDecorator(routeLine, {
      patterns: [
        {
          offset: "4%",
          repeat: "9%",
          symbol: L.Symbol.arrowHead({
            pixelSize: 9,
            headAngle: 50,
            pathOptions: { color: "#1d6f5e", fillOpacity: 0.9, weight: 0 },
          }),
        },
      ],
    }).addTo(map);
  }

  trip.days.forEach((day, index) => {
    const color = TYPE_COLORS[day.type] || "#555";
    const isSea = day.type === "sea";
    const size = isSea ? 20 : 27;
    const icon = L.divIcon({
      className: "trip-marker-icon",
      html: `<div class="trip-marker-badge" style="background:${color};width:${size}px;height:${size}px;font-size:${isSea ? 10 : 12}px;">${index + 1}</div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    const marker = L.marker([day.location.lat, day.location.lon], { icon }).addTo(map);

    marker.bindTooltip("", { direction: "top", offset: [0, -(size / 2 + 2)] });
    marker.on("click", () => openDayPanel(index));
    dayLayers.push(marker);
  });

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [10, 10] });

  addAisControl();
}

function addAisControl() {
  const control = L.control({ position: "topleft" });
  control.onAdd = function () {
    const div = L.DomUtil.create("div", "leaflet-bar ais-control");
    div.innerHTML = `<a href="#" id="ais-toggle-link" role="button" title="${tr("aisToggleTitle")}">🛰</a>`;
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.on(div, "click", (e) => {
      e.preventDefault();
      toggleAisPanel();
    });
    return div;
  };
  control.addTo(map);
}

let aisOpen = false;

function aisCenter() {
  if (openPanelIndex !== null) {
    const d = trip.days[openPanelIndex];
    return { lat: d.location.lat, lon: d.location.lon };
  }
  const bounds = L.latLngBounds(trip.days.map((d) => [d.location.lat, d.location.lon]));
  const c = bounds.getCenter();
  return { lat: c.lat, lon: c.lng };
}

function toggleAisPanel() {
  aisOpen = !aisOpen;
  const panel = document.getElementById("ais-panel");
  const iframe = document.getElementById("ais-iframe");
  const toggleLink = document.getElementById("ais-toggle-link");

  if (aisOpen) {
    const center = aisCenter();
    iframe.src = `https://www.marinetraffic.com/en/ais/embed/zoom:7/centery:${center.lat.toFixed(2)}/centerx:${center.lon.toFixed(2)}/maptype:4/shownames:false`;
    panel.classList.remove("hidden");
    if (toggleLink) toggleLink.classList.add("active");
  } else {
    iframe.src = "about:blank"; // stop loading the third-party embed once closed
    panel.classList.add("hidden");
    if (toggleLink) toggleLink.classList.remove("active");
  }
}

document.getElementById("ais-close").addEventListener("click", () => {
  if (aisOpen) toggleAisPanel();
});

function updateMapLabels() {
  trip.days.forEach((day, index) => {
    const marker = dayLayers[index];
    marker.setTooltipContent(`${index + 1}. ${shortDate(day.date)} — ${t(day.title)}`);
  });
}

function buildLegend() {
  const el = document.getElementById("map-legend");
  const rows = LEGEND_ITEMS.map(
    (item) => `
      <div class="legend-row">
        <span class="legend-swatch" style="background:${item.color}"></span>
        <span>${tr(item.key)}</span>
      </div>`
  ).join("");
  el.innerHTML = `
    <div class="legend-label">${tr("legendLabel")}</div>
    <div class="legend-rows">${rows}</div>
  `;
}

// Legend starts expanded; tapping/clicking it toggles a collapsed state
// (just the "Legend" label visible) so it can be tucked out of the way.
const mapLegendEl = document.getElementById("map-legend");
mapLegendEl.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("collapsed");
});
mapLegendEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.currentTarget.classList.toggle("collapsed");
  }
});

function lodgingHtml(lodging) {
  if (typeof lodging === "string") return escapeHtml(lodging);
  if (lodging.url) {
    return `<a href="${lodging.url}" target="_blank" rel="noopener">${escapeHtml(lodging.name)}</a>`;
  }
  return escapeHtml(lodging.name);
}

function windyUrl(day) {
  return `https://www.windy.com/?${day.location.lat.toFixed(3)},${day.location.lon.toFixed(3)},8`;
}

function wikipediaUrl(day) {
  // Always the English Wikipedia, so the query must always be the English
  // name — t(day.location.name) would pick the German name in German mode
  // (e.g. "Amalia-Gletscher"), which doesn't exist as an en.wikipedia title.
  const nameEn = typeof day.location.name === "string" ? day.location.name : day.location.name.en;
  const query = day.location.weatherQuery || nameEn.split(",")[0].trim();
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g, "_"))}`;
}

function shippingForecastUrl(day) {
  return `https://www.windy.com/-Waves-waves?waves,${day.location.lat.toFixed(3)},${day.location.lon.toFixed(3)},7`;
}

function weatherLinksHtml(day) {
  const links = [
    `<a class="weather-link" href="${windyUrl(day)}" target="_blank" rel="noopener">🌬 ${tr("weatherNow")}</a>`,
    `<a class="weather-link" href="${wikipediaUrl(day)}" target="_blank" rel="noopener">📖 ${tr("weatherTypical")}</a>`,
  ];
  if (SHIPPING_FORECAST_TYPES.has(day.type)) {
    links.push(
      `<a class="weather-link" href="${shippingForecastUrl(day)}" target="_blank" rel="noopener">⚓ ${tr("shippingForecast")}</a>`
    );
  }
  return `<div class="weather-links">${links.join("")}</div>`;
}

function advisoryLinksHtml(day) {
  if (!day.country) return "";
  const advisory = COUNTRY_ADVISORIES[day.country];
  if (!advisory) return "";
  const links = [
    `<a class="weather-link" href="${advisory.fcdo}" target="_blank" rel="noopener">🛂 ${tr("advisoryFcdo")}</a>`,
  ];
  if (advisory.aa) {
    links.push(`<a class="weather-link" href="${advisory.aa}" target="_blank" rel="noopener">🛂 ${tr("advisoryAA")}</a>`);
  }
  return `<div class="weather-links">${links.join("")}</div>`;
}

function openDayPanel(index) {
  openPanelIndex = index;
  const day = trip.days[index];
  const panel = document.getElementById("day-panel");
  const content = document.getElementById("day-panel-content");

  const timesHtml = [];
  if (day.arrival) timesHtml.push(`<span>${tr("arrive")} ${day.arrival}</span>`);
  if (day.departure) timesHtml.push(`<span>${tr("depart")} ${day.departure}</span>`);

  const activitiesHtml = (day.activities || [])
    .map(
      (a) => `
      <div class="activity-card">
        <h3>${escapeHtml(t(a.title))}</h3>
        <p class="activity-meta">${escapeHtml(t(a.duration))} · ${escapeHtml(t(a.time))}
          <span class="activity-travelers">${(a.travelers || [])
            .map((tv) => `<span class="chip">${escapeHtml(tv)}</span>`)
            .join("")}</span>
        </p>
        <p>${escapeHtml(t(a.description))}</p>
      </div>`
    )
    .join("");

  const typeKey = TYPE_LABEL_KEYS[day.type];

  content.innerHTML = `
    <span class="type-badge type-${day.type}">${typeKey ? tr(typeKey) : day.type}</span>
    <h2>${escapeHtml(t(day.title))}</h2>
    <p class="panel-date">${formatDate(day.date)} · ${escapeHtml(t(day.location.name))}</p>
    ${timesHtml.length ? `<div class="panel-times">${timesHtml.join("")}</div>` : ""}
    <p class="panel-summary">${escapeHtml(t(day.summary))}</p>
    ${day.lodging ? `<p class="lodging-note">${tr("stayingAt")} ${lodgingHtml(day.lodging)}</p>` : ""}
    ${day.showFlights && trip.flights ? `<p class="lodging-note"><a href="${trip.flights.url}" target="_blank" rel="noopener">✈ ${escapeHtml(trip.flights.label ? t(trip.flights.label) : tr("flightsFallback"))} &rarr;</a></p>` : ""}
    ${day.note ? `<p class="day-note">${escapeHtml(t(day.note))}</p>` : ""}
    ${weatherLinksHtml(day)}
    ${advisoryLinksHtml(day)}
    ${activitiesHtml}
  `;

  panel.classList.remove("hidden");
}

document.getElementById("day-panel-close").addEventListener("click", () => {
  document.getElementById("day-panel").classList.add("hidden");
  openPanelIndex = null;
});

// Footer shows only its first line by default; a tap/click toggles the
// full text open or closed. Deliberately not driven by :hover/:focus-within
// — on touch devices those can get "stuck" active after a tap, which made
// the second tap fail to collapse it. The class toggle below is the only
// thing that opens or closes it, so it's reliable on every input type.
const appFooter = document.getElementById("app-footer");
appFooter.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("expanded");
});
appFooter.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.currentTarget.classList.toggle("expanded");
  }
});

function buildTimeline() {
  const list = document.getElementById("timeline-list");
  list.innerHTML = trip.days
    .map((day, index) => {
      const activityCount = (day.activities || []).length;
      const activitySuffix = activityCount
        ? ` · <span class="excursion-link">${activityCount} ${activityCount > 1 ? tr("excursions") : tr("excursion")}</span>`
        : "";
      const typeKey = TYPE_LABEL_KEYS[day.type];
      return `
        <li class="timeline-item" data-index="${index}">
          <div class="timeline-date">
            <strong>${shortDate(day.date)}</strong>
            ${weekday(day.date)}
          </div>
          <div class="timeline-body">
            <span class="type-badge type-${day.type}">${typeKey ? tr(typeKey) : day.type}</span>
            <p class="timeline-title">${escapeHtml(t(day.title))}</p>
            <p class="timeline-summary">${escapeHtml(t(day.location.name))}${activitySuffix}</p>
          </div>
        </li>`;
    })
    .join("");

  list.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => {
      const index = Number(item.dataset.index);
      document.querySelector('.tab-btn[data-view="map"]').click();
      const day = trip.days[index];
      map.setView([day.location.lat, day.location.lon], Math.max(map.getZoom(), 6), { animate: true });
      openDayPanel(index);
    });
  });
}

function buildShipInfo() {
  const v = trip.vessel;
  const container = document.getElementById("ship-info");
  container.innerHTML = `
    <h2>${escapeHtml(v.name)}</h2>
    <p>${escapeHtml(v.operator)} · ${lang === "de" ? "Baujahr" : "built"} ${v.yearBuilt}</p>
    <p>${escapeHtml(t(v.design))}</p>
    <div class="ship-stats">
      <div class="stat-card"><div class="stat-value">${v.guests}</div><div class="stat-label">${tr("guests")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.crew}</div><div class="stat-label">${tr("crew")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.staterooms}</div><div class="stat-label">${tr("staterooms")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.decks}</div><div class="stat-label">${tr("decks")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.lengthFt} ft</div><div class="stat-label">${tr("length")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.beamFt} ft</div><div class="stat-label">${tr("beam")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.grossTonnage.toLocaleString()}</div><div class="stat-label">${tr("grossTonnage")}</div></div>
      <div class="stat-card"><div class="stat-value">${v.speedKnots} kn</div><div class="stat-label">${tr("cruisingSpeed")}</div></div>
    </div>
    <h3>${tr("highlights")}</h3>
    <ul>${v.highlights.map((h) => `<li>${escapeHtml(t(h))}</li>`).join("")}</ul>
    <p><a href="${v.moreInfoUrl}" target="_blank" rel="noopener">${tr("moreInfo")}</a></p>
    ${v.shipsAtSeaUrl ? `<p><a href="${v.shipsAtSeaUrl}" target="_blank" rel="noopener">${tr("moreInfoShipsAtSea")}</a></p>` : ""}
    <p class="source-note">${escapeHtml(t(v.sourceNote))}</p>
    ${stateroomHtml()}
  `;
}

function stateroomHtml() {
  const s = trip.stateroom;
  if (!s) return "";
  return `
    <h3>${tr("ourStateroom")}</h3>
    <div class="ship-stats">
      <div class="stat-card"><div class="stat-value">${escapeHtml(s.category)}</div><div class="stat-label">${tr("stateroomCategory")}</div></div>
      <div class="stat-card"><div class="stat-value">${s.cabinNumber ? escapeHtml(s.cabinNumber) : tr("stateroomCabinTbd")}</div><div class="stat-label">${tr("stateroomCabin")}</div></div>
      <div class="stat-card"><div class="stat-value">${escapeHtml(s.typicalDeck)}</div><div class="stat-label">${tr("stateroomDeck")}</div></div>
    </div>
    ${s.note ? `<p class="source-note">${escapeHtml(t(s.note))}</p>` : ""}
    ${s.deckPlanUrl ? `<p><a href="${s.deckPlanUrl}" target="_blank" rel="noopener">${tr("deckPlanLink")}</a></p>` : ""}
  `;
}

function localeTag() {
  return lang === "de" ? "de-DE" : "en-US";
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(localeTag(), { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function shortDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(localeTag(), { month: "short", day: "numeric" });
}

function weekday(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(localeTag(), { weekday: "short" });
}

function formatDateRange(startIso, endIso) {
  const s = new Date(startIso + "T00:00:00");
  const e = new Date(endIso + "T00:00:00");
  const opts = { month: "short", day: "numeric", year: "numeric" };
  return `${s.toLocaleDateString(localeTag(), opts)} – ${e.toLocaleDateString(localeTag(), opts)}`;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
