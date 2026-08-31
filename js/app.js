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
  guests: { en: "Guests", de: "Gäste" },
  crew: { en: "Crew", de: "Besatzung" },
  staterooms: { en: "Staterooms", de: "Kabinen" },
  decks: { en: "Decks", de: "Decks" },
  length: { en: "Length", de: "Länge" },
  beam: { en: "Beam", de: "Breite" },
  grossTonnage: { en: "Gross tonnage", de: "Bruttoraumzahl" },
  cruisingSpeed: { en: "Cruising speed", de: "Reisegeschwindigkeit" },
  footer: {
    en: "A shared trip itinerary — built for planning, kept for the memories.",
    de: "Ein gemeinsamer Reiseplan — zur Planung erstellt, für die Erinnerung bewahrt.",
  },
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
  document.getElementById("footer-tagline").textContent = tr("footer");
  document.getElementById("footer-copyright").textContent = tr("copyright").replace(
    "{year}",
    String(new Date().getFullYear())
  );

  buildFlightsLink();
  updateMapLabels();
  buildTimeline();
  buildShipInfo();

  if (openPanelIndex !== null) {
    openDayPanel(openPanelIndex);
  }
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

  L.polyline(latlngs, {
    color: "#1d6f5e",
    weight: 2.5,
    opacity: 0.75,
    dashArray: "1 8",
    lineCap: "round",
  }).addTo(map);

  trip.days.forEach((day, index) => {
    const color = TYPE_COLORS[day.type] || "#555";
    const marker = L.circleMarker([day.location.lat, day.location.lon], {
      radius: day.type === "sea" ? 5 : 8,
      fillColor: color,
      color: "#fff",
      weight: 2,
      fillOpacity: 0.95,
      className: "trip-marker",
    }).addTo(map);

    marker.bindTooltip("", { direction: "top", offset: [0, -6] });
    marker.on("click", () => openDayPanel(index));
    dayLayers.push(marker);
  });

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [10, 10] });
}

function updateMapLabels() {
  trip.days.forEach((day, index) => {
    const marker = dayLayers[index];
    marker.setTooltipContent(`${shortDate(day.date)} — ${t(day.title)}`);
  });
}

function lodgingHtml(lodging) {
  if (typeof lodging === "string") return escapeHtml(lodging);
  if (lodging.url) {
    return `<a href="${lodging.url}" target="_blank" rel="noopener">${escapeHtml(lodging.name)}</a>`;
  }
  return escapeHtml(lodging.name);
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
    ${activitiesHtml}
  `;

  panel.classList.remove("hidden");
}

document.getElementById("day-panel-close").addEventListener("click", () => {
  document.getElementById("day-panel").classList.add("hidden");
  openPanelIndex = null;
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
    <p class="source-note">${escapeHtml(t(v.sourceNote))}</p>
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
