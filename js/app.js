// Bump this by 1 with every commit that changes the app (shown in the footer).
const APP_VERSION = 6;

const TRIPS_INDEX_URL = "data/trips/index.json";

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
  tabCalendar: { en: "Calendar", de: "Kalender" },
  tabShip: { en: "The Ship", de: "Das Schiff" },
  calendarSearchLabel: { en: "Jump to a date", de: "Zu Datum springen" },
  calendarSearchBtn: { en: "Go", de: "Los" },
  calendarNoTrip: { en: "No trip on this date.", de: "Keine Reise an diesem Datum." },
  calendarPrevMonth: { en: "Previous month", de: "Vorheriger Monat" },
  calendarNextMonth: { en: "Next month", de: "Nächster Monat" },
  flightsFallback: { en: "Flights", de: "Flüge" },
  flightsTbd: { en: "not yet booked", de: "noch nicht gebucht" },
  arrive: { en: "Arrive", de: "Ankunft" },
  depart: { en: "Depart", de: "Abfahrt" },
  stayingAt: { en: "Staying at:", de: "Unterkunft:" },
  oneNight: { en: "1 night", de: "1 Nacht" },
  multiNights: { en: "{n} nights", de: "{n} Nächte" },
  daysToGo: { en: "{n} days to go", de: "Noch {n} Tage" },
  oneDayToGo: { en: "1 day to go", de: "Noch 1 Tag" },
  dayOfTrip: { en: "Day {day} of {total}", de: "Tag {day} von {total}" },
  reminderToday: { en: "today", de: "heute" },
  reminderInOneDay: { en: "in 1 day", de: "in 1 Tag" },
  reminderInDays: { en: "in {n} days", de: "in {n} Tagen" },
  remindersLabel: { en: "Reminders", de: "Erinnerungen" },
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
  legendLand: { en: "On land", de: "An Land" },
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
  stateroomDeck: { en: "Deck for this category", de: "Deck für diese Kategorie" },
  stateroomSize: { en: "Size", de: "Größe" },
  stateroomBed: { en: "Bed", de: "Bett" },
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

// `types` lists which day.type values a legend row covers, so buildLegend()
// can show only the rows relevant to whichever trip is currently loaded
// (e.g. a coach tour never has "sea" or "port" days).
const LEGEND_ITEMS = [
  { types: ["port", "embark", "disembark"], color: TYPE_COLORS.port, key: "legendOnshore" },
  { types: ["hotel", "transfer"], color: TYPE_COLORS.hotel, key: "legendLand" },
  { types: ["excursion"], color: TYPE_COLORS.excursion, key: "legendExcursion" },
  { types: ["scenic"], color: TYPE_COLORS.scenic, key: "legendScenic" },
  { types: ["sea"], color: TYPE_COLORS.sea, key: "legendSea" },
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
  italy: { fcdo: "https://www.gov.uk/foreign-travel-advice/italy", aa: "https://www.auswaertiges-amt.de/de/service/laender/italien-node" },
};

// Windy's waves layer is offered as a "shipping forecast" for days actually
// spent at sea or sailing scenic waters — not for days ashore.
const SHIPPING_FORECAST_TYPES = new Set(["sea", "scenic"]);

let trip = null;
let map = null;
let dayLayers = [];
let openPanelIndex = null;
let lang = "en";
let tripManifest = [];
let currentTripId = null;

// Flat index of every day across every trip in the manifest, built once at
// startup so the calendar can mark/find trip days without switching which
// trip is currently loaded. Map<"YYYY-MM-DD", Array<{ tripId, dayIndex, type }>>.
let dateIndex = new Map();
let calendarViewDate = null; // first-of-month Date currently shown in the calendar grid

try {
  const saved = localStorage.getItem("tripLang");
  if (saved === "en" || saved === "de") lang = saved;
} catch (e) {
  /* localStorage unavailable — default to English */
}

init();

async function init() {
  const res = await fetch(TRIPS_INDEX_URL);
  tripManifest = await res.json();

  // A trip's own URL (?trip=<id>) takes priority over the last-viewed trip
  // in localStorage, so a shared link always opens on the trip it names.
  const urlTripId = new URLSearchParams(window.location.search).get("trip");
  let savedTripId = null;
  try {
    savedTripId = localStorage.getItem("tripId");
  } catch (e) {
    /* localStorage unavailable */
  }
  const initialEntry =
    tripManifest.find((entry) => entry.id === urlTripId) ||
    tripManifest.find((entry) => entry.id === savedTripId) ||
    tripManifest[0];

  setupLangToggle();
  setupTabs();
  setupTripSwitcher();
  setupCalendarControls();
  await loadTrip(initialEntry);

  // Fetches every trip's own JSON just to index its days' dates — done once,
  // after the initial trip is already showing, so it never blocks first
  // paint. The calendar re-renders once this resolves to pick up the dots.
  await buildDateIndex();
  buildCalendar();
}

async function buildDateIndex() {
  const tripsData = await Promise.all(
    tripManifest.map((entry) => fetch(`data/trips/${entry.file}`).then((r) => r.json()))
  );
  dateIndex = new Map();
  tripsData.forEach((tripData) => {
    tripData.days.forEach((day, dayIndex) => {
      dayDates(day).forEach((iso) => {
        if (!dateIndex.has(iso)) dateIndex.set(iso, []);
        dateIndex.get(iso).push({ tripId: tripData.id, dayIndex, type: day.type });
      });
    });
  });
}

// A day entry normally covers just its own `date`, but an optional
// `endDate` lets one entry represent a multi-day stay (e.g. two nights in
// one hotel) without needing a separate, duplicate entry for each night —
// this returns every ISO date the entry spans, inclusive.
function dayDates(day) {
  if (!day.endDate || day.endDate === day.date) return [day.date];
  const dates = [];
  const cur = new Date(day.date + "T00:00:00");
  const end = new Date(day.endDate + "T00:00:00");
  while (cur <= end) {
    // Build the ISO string from local date parts, not toISOString() (which
    // converts to UTC and can shift the date by a day depending on the
    // visitor's timezone) — every other date in this file is local-time.
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const d = String(cur.getDate()).padStart(2, "0");
    dates.push(`${y}-${m}-${d}`);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function setupTripSwitcher() {
  const select = document.getElementById("trip-select");
  select.innerHTML = tripManifest
    .map((entry) => `<option value="${entry.id}">${escapeHtml(t(entry.label))}</option>`)
    .join("");
  select.addEventListener("change", () => {
    const entry = tripManifest.find((e) => e.id === select.value);
    if (entry) {
      // Explicit trip switch via the dropdown — jump the calendar to this
      // trip's own start month. (goToDate() sets calendarViewDate itself
      // before triggering a trip switch, so this doesn't run in that case.)
      calendarViewDate = null;
      loadTrip(entry);
    }
  });
}

async function loadTrip(entry) {
  currentTripId = entry.id;
  try {
    localStorage.setItem("tripId", entry.id);
  } catch (e) {
    /* ignore persistence failures */
  }
  updateUrlForTrip(entry.id);

  const res = await fetch(`data/trips/${entry.file}`);
  trip = await res.json();

  // Reset per-trip UI state before rebuilding.
  openPanelIndex = null;
  document.getElementById("day-panel").classList.add("hidden");
  if (aisOpen) toggleAisPanel();

  // Leaflet computes tile positions from the container's on-screen size at
  // init time, so #view-map must actually be visible (not display:none)
  // before L.map()/fitBounds() run below — switch to it first, otherwise a
  // trip loaded while on another tab renders into a zero-size box and the
  // tiles never recover even after switching to the map tab afterwards.
  document.querySelector('.tab-btn[data-view="map"]').click();

  if (map) {
    map.remove();
    map = null;
  }
  dayLayers = [];
  buildMap();

  // Not every trip has a ship (e.g. a coach tour) — hide that tab.
  const shipTabBtn = document.querySelector('.tab-btn[data-view="ship"]');
  shipTabBtn.hidden = !trip.vessel;

  const select = document.getElementById("trip-select");
  if (select.value !== entry.id) select.value = entry.id;

  renderAll();
}

// Keeps the URL's ?trip= param in sync with whichever trip is loaded, so
// the browser's address bar is always a shareable, bookmarkable link
// straight to that trip. replaceState (not pushState) so switching trips
// doesn't clutter the back-button history — the trip switcher already has
// its own persisted state (localStorage) for "last viewed."
function updateUrlForTrip(id) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("trip", id);
    window.history.replaceState(null, "", url);
  } catch (e) {
    /* ignore — e.g. sandboxed/file:// contexts where history API is restricted */
  }
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
  document.querySelector('.tab-btn[data-view="calendar"]').textContent = tr("tabCalendar");
  document.querySelector('.tab-btn[data-view="ship"]').textContent = tr("tabShip");
  document.getElementById("footer-copyright").textContent =
    `v${APP_VERSION} · ` + tr("copyright").replace("{year}", String(new Date().getFullYear()));
  updateTripSelectLabels();
  document.getElementById("calendar-search-label").textContent = tr("calendarSearchLabel");
  document.getElementById("calendar-search-btn").textContent = tr("calendarSearchBtn");
  document.getElementById("calendar-prev").setAttribute("aria-label", tr("calendarPrevMonth"));
  document.getElementById("calendar-next").setAttribute("aria-label", tr("calendarNextMonth"));

  buildFlightsLink();
  updateMapLabels();
  buildLegend();
  buildTimeline();
  buildCalendar();
  buildShipInfo();
  buildCountdown();
  buildReminders();
  updateAisLabels();

  if (openPanelIndex !== null) {
    openDayPanel(openPanelIndex);
  }
}

function updateTripSelectLabels() {
  const select = document.getElementById("trip-select");
  [...select.options].forEach((opt) => {
    const entry = tripManifest.find((e) => e.id === opt.value);
    if (entry) opt.textContent = t(entry.label);
  });
}

function buildCountdown() {
  const el = document.getElementById("trip-countdown");
  const msPerDay = 86400000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(trip.startDate + "T00:00:00");
  const end = new Date(trip.endDate + "T00:00:00");

  if (today < start) {
    const days = Math.round((start - today) / msPerDay);
    el.textContent = days === 1 ? tr("oneDayToGo") : tr("daysToGo").replace("{n}", days);
  } else if (today <= end) {
    const dayNum = Math.round((today - start) / msPerDay) + 1;
    const totalDays = Math.round((end - start) / msPerDay) + 1;
    el.textContent = tr("dayOfTrip").replace("{day}", dayNum).replace("{total}", totalDays);
  } else {
    // Trip is over — clear the badge entirely rather than leaving a
    // "completed" label showing forever; the :empty CSS rule hides it.
    el.textContent = "";
  }
}

// Populates the header bell's hover tooltip with reminders whose date/time
// hasn't passed yet (the bell itself is hidden once there are none left).
// Dates are stored as full ISO timestamps with an explicit UTC offset (e.g.
// a booking window that opens at a specific real-world clock time, not
// "sometime that day"), so comparisons and the displayed time both use UTC
// — matching GMT exactly for the November dates these are used for, since
// GMT has no DST offset.
function buildReminders() {
  const wrap = document.getElementById("reminder-bell-wrap");
  const tooltip = document.getElementById("reminder-tooltip");
  document.getElementById("reminder-bell").setAttribute("aria-label", tr("remindersLabel"));

  const reminders = trip.reminders || [];
  const now = new Date();
  const upcoming = reminders.filter((r) => new Date(r.date) > now);

  if (!upcoming.length) {
    wrap.hidden = true;
    tooltip.innerHTML = "";
    return;
  }

  wrap.hidden = false;
  tooltip.innerHTML = upcoming
    .map((r) => {
      const target = new Date(r.date);
      const days = Math.ceil((target - now) / 86400000);
      const countdown =
        days <= 0 ? tr("reminderToday") : days === 1 ? tr("reminderInOneDay") : tr("reminderInDays").replace("{n}", days);
      return `<p>${escapeHtml(t(r.label))} — ${escapeHtml(formatReminderDateTime(r.date))} (${escapeHtml(countdown)})</p>`;
    })
    .join("");
}

function formatReminderDateTime(iso) {
  const d = new Date(iso);
  const formatted = d.toLocaleString(localeTag(), {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return `${formatted} GMT`;
}

function updateAisLabels() {
  document.getElementById("ais-panel-title").textContent = tr("aisPanelTitle");
  document.getElementById("ais-privacy-note").textContent = tr("aisPrivacyNote");
  const toggleLink = document.getElementById("ais-toggle-link");
  if (toggleLink) toggleLink.title = tr("aisToggleTitle");
}

function buildFlightsLink() {
  const link = document.getElementById("flights-link");
  if (!trip.flights) {
    link.hidden = true;
    return;
  }
  const label = trip.flights.label ? t(trip.flights.label) : tr("flightsFallback");
  if (trip.flights.url) {
    link.href = trip.flights.url;
    link.removeAttribute("aria-disabled");
    link.classList.remove("flights-link-tbd");
    link.textContent = `✈ ${label}`;
  } else {
    // Flight details aren't booked/confirmed yet — show a placeholder tab
    // instead of hiding it, so the trip page doesn't look incomplete.
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.classList.add("flights-link-tbd");
    link.textContent = `✈ ${label} (${tr("flightsTbd")})`;
  }
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

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [10, 10] });

  // Multiple days can share the exact same spot (e.g. several free days at
  // the same hotel) — spreading their markers apart on screen keeps every
  // one visible and clickable instead of stacking identically and hiding
  // all but the last one drawn.
  const markerLatLngs = spreadOverlappingMarkers(trip.days, map);

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
    const marker = L.marker(markerLatLngs[index], { icon }).addTo(map);

    marker.bindTooltip("", { direction: "top", offset: [0, -(size / 2 + 2)] });
    marker.on("click", () => openDayPanel(index));
    dayLayers.push(marker);
  });

  addAisControl();
}

// Days that share the exact same coordinates (e.g. several free days at one
// hotel) get their marker nudged into a small circle around the true point,
// in screen pixels at the map's current zoom, so every marker stays visible
// and clickable instead of stacking exactly on top of each other. This only
// affects where the numbered badge is drawn — everywhere else (weather
// links, map centering, the route line) keeps using the real coordinates.
function spreadOverlappingMarkers(days, map) {
  const groups = new Map();
  days.forEach((day, index) => {
    const key = `${day.location.lat.toFixed(4)},${day.location.lon.toFixed(4)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });

  const latlngs = days.map((day) => L.latLng(day.location.lat, day.location.lon));
  const MARKER_SPACING = 26; // px between adjacent marker centers — tight enough to read as one cluster

  groups.forEach((indices) => {
    if (indices.length < 2) return;
    const n = indices.length;
    const angleStep = (2 * Math.PI) / n;
    const radius = MARKER_SPACING / (2 * Math.sin(angleStep / 2));
    const center = map.latLngToLayerPoint(latlngs[indices[0]]);
    indices.forEach((dayIndex, i) => {
      const angle = angleStep * i - Math.PI / 2; // start pointing up
      const point = L.point(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
      latlngs[dayIndex] = map.layerPointToLatLng(point);
    });
  });

  return latlngs;
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

// The AIS panel starts centered via CSS (inset + margin:auto). The first
// resize freezes it into an explicit top/left/width/height box (dropping
// the CSS centering), then subsequent drags just adjust width/height —
// same freeze-on-first-interaction approach as the legend's drag.
// Shared by drag and resize: converts the panel from its default CSS
// centering (inset + margin:auto) into an explicit top/left/width/height
// box, anchored at its current on-screen position, so either interaction
// can adjust it from wherever it already is/whichever happens first.
function freezeAisPanel() {
  const panel = document.getElementById("ais-panel");
  const container = document.getElementById("map");
  const rect = panel.getBoundingClientRect();
  const mapRect = container.getBoundingClientRect();
  const left = rect.left - mapRect.left;
  const top = rect.top - mapRect.top;
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
  panel.style.right = "auto";
  panel.style.bottom = "auto";
  panel.style.margin = "0";
  panel.style.maxWidth = "none";
  panel.style.maxHeight = "none";
  panel.style.width = `${rect.width}px`;
  panel.style.height = `${rect.height}px`;
  return { left, top, width: rect.width, height: rect.height };
}

function setupAisDrag() {
  const panel = document.getElementById("ais-panel");
  const header = document.querySelector(".ais-panel-header");
  const container = document.getElementById("map");
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  header.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#ais-close")) return; // let the close button work normally
    const frozen = freezeAisPanel();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = frozen.left;
    startTop = frozen.top;
    header.setPointerCapture(e.pointerId);
  });

  header.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const mapRect = container.getBoundingClientRect();
    const maxLeft = Math.max(0, mapRect.width - panel.offsetWidth);
    const maxTop = Math.max(0, mapRect.height - panel.offsetHeight);
    panel.style.left = `${Math.min(Math.max(startLeft + (e.clientX - startX), 0), maxLeft)}px`;
    panel.style.top = `${Math.min(Math.max(startTop + (e.clientY - startY), 0), maxTop)}px`;
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    try {
      header.releasePointerCapture(e.pointerId);
    } catch (err) {
      /* already released */
    }
  }
  header.addEventListener("pointerup", endDrag);
  header.addEventListener("pointercancel", endDrag);
}
setupAisDrag();

function setupAisResize() {
  const panel = document.getElementById("ais-panel");
  const handle = document.getElementById("ais-resize-handle");
  const container = document.getElementById("map");
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 160;
  let resizing = false;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let startLeft = 0;
  let startTop = 0;

  function resizeTo(width, height, left, top) {
    const mapRect = container.getBoundingClientRect();
    const maxWidth = mapRect.width - left - 8;
    const maxHeight = mapRect.height - top - 8;
    panel.style.width = `${Math.min(Math.max(width, MIN_WIDTH), maxWidth)}px`;
    panel.style.height = `${Math.min(Math.max(height, MIN_HEIGHT), maxHeight)}px`;
  }

  handle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const frozen = freezeAisPanel();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = frozen.width;
    startHeight = frozen.height;
    startLeft = frozen.left;
    startTop = frozen.top;
    handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener("pointermove", (e) => {
    if (!resizing) return;
    resizeTo(startWidth + (e.clientX - startX), startHeight + (e.clientY - startY), startLeft, startTop);
  });

  function endResize(e) {
    if (!resizing) return;
    resizing = false;
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch (err) {
      /* already released */
    }
  }
  handle.addEventListener("pointerup", endResize);
  handle.addEventListener("pointercancel", endResize);

  handle.addEventListener("keydown", (e) => {
    const step = 20;
    let dw = 0;
    let dh = 0;
    if (e.key === "ArrowRight") dw = step;
    else if (e.key === "ArrowLeft") dw = -step;
    else if (e.key === "ArrowDown") dh = step;
    else if (e.key === "ArrowUp") dh = -step;
    else return;
    e.preventDefault();
    const frozen = freezeAisPanel();
    resizeTo(frozen.width + dw, frozen.height + dh, frozen.left, frozen.top);
  });
}
setupAisResize();

function updateMapLabels() {
  trip.days.forEach((day, index) => {
    const marker = dayLayers[index];
    marker.setTooltipContent(`${index + 1}. ${shortDate(day.date)} — ${t(day.title)}`);
  });
}

function buildLegend() {
  const el = document.getElementById("map-legend");
  const usedTypes = new Set(trip.days.map((d) => d.type));
  const rows = LEGEND_ITEMS.filter((item) => item.types.some((type) => usedTypes.has(type)))
    .map(
      (item) => `
      <div class="legend-row">
        <span class="legend-swatch" style="background:${item.color}"></span>
        <span>${tr(item.key)}</span>
      </div>`
    )
    .join("");
  el.innerHTML = `
    <div class="legend-label">${tr("legendLabel")}</div>
    <div class="legend-rows">${rows}</div>
  `;
}

// Legend starts expanded and can be dragged (mouse or touch) anywhere over
// the map; a tap/click that doesn't move it toggles the collapsed state
// (just the "Legend" label visible) instead.
function setupLegendInteractions() {
  const el = document.getElementById("map-legend");
  const container = document.getElementById("map");
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    moved = false;
    const rect = el.getBoundingClientRect();
    const mapRect = container.getBoundingClientRect();
    startLeft = rect.left - mapRect.left;
    startTop = rect.top - mapRect.top;
    startX = e.clientX;
    startY = e.clientY;
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) > 5) {
      moved = true;
      el.classList.add("dragging");
    }
    if (!moved) return;
    const mapRect = container.getBoundingClientRect();
    const maxLeft = Math.max(0, mapRect.width - el.offsetWidth);
    const maxTop = Math.max(0, mapRect.height - el.offsetHeight);
    el.style.left = `${Math.min(Math.max(startLeft + dx, 0), maxLeft)}px`;
    el.style.top = `${Math.min(Math.max(startTop + dy, 0), maxTop)}px`;
    el.style.bottom = "auto";
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    el.classList.remove("dragging");
    if (!moved) {
      el.classList.toggle("collapsed");
    }
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (err) {
      /* already released */
    }
  }

  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      el.classList.toggle("collapsed");
    }
  });
}
setupLegendInteractions();

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
  // The Wikipedia edition matches the current UI language, so the query
  // must be the name in that SAME language — mixing them (e.g. querying
  // en.wikipedia.org for "Amalia-Gletscher") 404s. Every article slug used
  // here (both editions) was verified to exist before shipping this.
  const domain = lang === "de" ? "de.wikipedia.org" : "en.wikipedia.org";
  const query = t(day.location.weatherQuery) || t(day.location.name).split(",")[0].trim();
  return `https://${domain}/wiki/${encodeURIComponent(query.replace(/\s+/g, "_"))}`;
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
  // Show the advisory that matches the current UI language — German
  // (Auswärtiges Amt) in German mode, falling back to FCDO where no AA
  // page exists for that country (e.g. the Falklands).
  const useAA = lang === "de" && advisory.aa;
  const url = useAA ? advisory.aa : advisory.fcdo;
  const labelKey = useAA ? "advisoryAA" : "advisoryFcdo";
  return `<div class="weather-links"><a class="weather-link" href="${url}" target="_blank" rel="noopener">🛂 ${tr(labelKey)}</a></div>`;
}

function nightsLabel(day) {
  // `endDate` marks the last night spent, not a checkout date, so the
  // number of nights equals the count of calendar dates the entry spans
  // (e.g. date=Jan 20, endDate=Jan 21 covers two nights — the 20th and the
  // 21st — with checkout the next day handled by a separate day entry).
  const nights = dayDates(day).length;
  return nights <= 1 ? tr("oneNight") : tr("multiNights").replace("{n}", nights);
}

function flightsNoteHtml() {
  const label = trip.flights.label ? t(trip.flights.label) : tr("flightsFallback");
  if (trip.flights.url) {
    return `<p class="lodging-note"><a href="${trip.flights.url}" target="_blank" rel="noopener">✈ ${escapeHtml(label)} &rarr;</a></p>`;
  }
  return `<p class="lodging-note">✈ ${escapeHtml(label)} — <em>${tr("flightsTbd")}</em></p>`;
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
  const dateHtml = day.endDate && day.endDate !== day.date
    ? `${formatDateRange(day.date, day.endDate)} <span class="stat-sub">(${nightsLabel(day)})</span>`
    : formatDate(day.date);

  content.innerHTML = `
    <span class="type-badge type-${day.type}">${typeKey ? tr(typeKey) : day.type}</span>
    <h2>${escapeHtml(t(day.title))}</h2>
    <p class="panel-date">${dateHtml} · ${escapeHtml(t(day.location.name))}</p>
    ${timesHtml.length ? `<div class="panel-times">${timesHtml.join("")}</div>` : ""}
    <p class="panel-summary">${escapeHtml(t(day.summary))}</p>
    ${day.lodging ? `<p class="lodging-note">${tr("stayingAt")} ${lodgingHtml(day.lodging)}</p>` : ""}
    ${day.showFlights && trip.flights ? flightsNoteHtml() : ""}
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
      const dateLabel = day.endDate && day.endDate !== day.date
        ? `${shortDate(day.date)}–${shortDate(day.endDate)}`
        : shortDate(day.date);
      return `
        <li class="timeline-item" data-index="${index}">
          <div class="timeline-date">
            <strong>${dateLabel}</strong>
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

function setupCalendarControls() {
  document.getElementById("calendar-prev").addEventListener("click", () => {
    calendarViewDate.setMonth(calendarViewDate.getMonth() - 1);
    buildCalendar();
  });
  document.getElementById("calendar-next").addEventListener("click", () => {
    calendarViewDate.setMonth(calendarViewDate.getMonth() + 1);
    buildCalendar();
  });
  document.getElementById("calendar-search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const iso = document.getElementById("calendar-search-input").value;
    if (!iso) return;
    const resultEl = document.getElementById("calendar-search-result");
    const matches = dateIndex.get(iso);
    if (!matches || !matches.length) {
      resultEl.textContent = tr("calendarNoTrip");
      resultEl.hidden = false;
      return;
    }
    resultEl.hidden = true;
    const [y, m, d] = iso.split("-").map(Number);
    calendarViewDate = new Date(y, m - 1, 1);
    buildCalendar();
    goToDate(iso);
  });
}

function weekdayShortLabels() {
  const monday = new Date(2023, 0, 2); // a known Monday
  const fmt = new Intl.DateTimeFormat(localeTag(), { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return fmt.format(d);
  });
}

function buildCalendar() {
  const grid = document.getElementById("calendar-grid");
  const label = document.getElementById("calendar-month-label");
  if (!calendarViewDate) {
    calendarViewDate = new Date(trip.startDate + "T00:00:00");
    calendarViewDate.setDate(1);
  }
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  label.textContent = calendarViewDate.toLocaleDateString(localeTag(), { month: "long", year: "numeric" });

  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Mon..6=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let cellsHtml = "";
  for (let i = 0; i < firstWeekday; i++) {
    cellsHtml += `<div class="calendar-cell empty"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const matches = dateIndex.get(iso) || [];
    const isCurrentTrip = trip && matches.some((m) => m.tripId === trip.id);
    const dotColor = matches.length ? TYPE_COLORS[matches[0].type] || "#555" : null;
    const classes = ["calendar-cell"];
    if (matches.length) classes.push("has-trip");
    if (isCurrentTrip) classes.push("current-trip");
    cellsHtml += `
      <div class="${classes.join(" ")}" data-date="${iso}"${matches.length ? ' role="button" tabindex="0"' : ""}>
        <span class="calendar-daynum">${d}</span>
        ${dotColor ? `<span class="calendar-dot" style="background:${dotColor}"></span>` : ""}
      </div>`;
  }

  grid.innerHTML = `
    <div class="calendar-weekdays">${weekdayShortLabels().map((w) => `<div>${escapeHtml(w)}</div>`).join("")}</div>
    <div class="calendar-days">${cellsHtml}</div>
  `;

  grid.querySelectorAll(".calendar-cell.has-trip").forEach((cell) => {
    cell.addEventListener("click", () => goToDate(cell.dataset.date));
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToDate(cell.dataset.date);
      }
    });
  });
}

// Jumps to a specific date: switches to that date's trip first if it isn't
// the one currently loaded, then opens that day's panel on the map — the
// same landing behaviour as clicking a day in the timeline.
function goToDate(iso) {
  const matches = dateIndex.get(iso);
  if (!matches || !matches.length) return;
  const match = matches[0];

  const openMatchedDay = () => {
    document.querySelector('.tab-btn[data-view="map"]').click();
    const day = trip.days[match.dayIndex];
    map.setView([day.location.lat, day.location.lon], Math.max(map.getZoom(), 6), { animate: true });
    openDayPanel(match.dayIndex);
  };

  if (match.tripId !== trip.id) {
    const entry = tripManifest.find((e) => e.id === match.tripId);
    if (!entry) return;
    loadTrip(entry).then(openMatchedDay);
  } else {
    openMatchedDay();
  }
}

function buildShipInfo() {
  const container = document.getElementById("ship-info");
  const v = trip.vessel;
  if (!v) {
    container.innerHTML = "";
    return;
  }
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
  const sizeValue = s.sizeSqFt ? `${s.sizeSqFt} ft² <span class="stat-sub">(${s.sizeM2} m²)</span>` : null;
  return `
    <h3>${tr("ourStateroom")}</h3>
    <div class="ship-stats">
      <div class="stat-card"><div class="stat-value">${escapeHtml(s.category)}</div><div class="stat-label">${tr("stateroomCategory")}</div></div>
      <div class="stat-card"><div class="stat-value">${s.cabinNumber ? escapeHtml(s.cabinNumber) : tr("stateroomCabinTbd")}</div><div class="stat-label">${tr("stateroomCabin")}</div></div>
      <div class="stat-card"><div class="stat-value">${escapeHtml(s.typicalDeck)}</div><div class="stat-label">${tr("stateroomDeck")}</div></div>
      ${sizeValue ? `<div class="stat-card"><div class="stat-value">${sizeValue}</div><div class="stat-label">${tr("stateroomSize")}</div></div>` : ""}
      ${s.bed ? `<div class="stat-card"><div class="stat-value">${escapeHtml(t(s.bed))}</div><div class="stat-label">${tr("stateroomBed")}</div></div>` : ""}
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
