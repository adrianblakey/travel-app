const TRIP_URL = "data/trips/peru-south-america-2027.json";

const TYPE_COLORS = {
  port: "#1d6f5e",
  embark: "#1d6f5e",
  disembark: "#1d6f5e",
  sea: "#4d7ea8",
  scenic: "#8a5fb0",
  hotel: "#b5793a",
  transfer: "#b5793a",
};

const TYPE_LABELS = {
  port: "In port",
  embark: "Embark",
  disembark: "Disembark",
  sea: "At sea",
  scenic: "Scenic sailing",
  hotel: "On land",
  transfer: "Transfer",
};

let trip = null;
let map = null;
let dayLayers = [];

init();

async function init() {
  const res = await fetch(TRIP_URL);
  trip = await res.json();

  document.getElementById("trip-title").textContent = trip.title;
  document.getElementById("trip-subtitle").textContent =
    `${trip.subtitle} · ${formatDateRange(trip.startDate, trip.endDate)}`;

  buildFlightsLink();
  setupTabs();
  buildMap();
  buildTimeline();
  buildShipInfo();
}

function buildFlightsLink() {
  if (!trip.flights || !trip.flights.url) return;
  const link = document.getElementById("flights-link");
  link.href = trip.flights.url;
  link.textContent = `✈ ${trip.flights.label || "Flights"}`;
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
  map = L.map("map", { scrollWheelZoom: true });

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

    marker.bindTooltip(`${shortDate(day.date)} — ${day.title}`, { direction: "top", offset: [0, -6] });
    marker.on("click", () => openDayPanel(index));
    dayLayers.push(marker);
  });

  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [40, 40] });
}

function openDayPanel(index) {
  const day = trip.days[index];
  const panel = document.getElementById("day-panel");
  const content = document.getElementById("day-panel-content");

  const timesHtml = [];
  if (day.arrival) timesHtml.push(`<span>Arrive ${day.arrival}</span>`);
  if (day.departure) timesHtml.push(`<span>Depart ${day.departure}</span>`);

  const activitiesHtml = (day.activities || [])
    .map(
      (a) => `
      <div class="activity-card">
        <h3>${escapeHtml(a.title)}</h3>
        <p class="activity-meta">${escapeHtml(a.duration)} · ${escapeHtml(a.time)}
          <span class="activity-travelers">${(a.travelers || [])
            .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
            .join("")}</span>
        </p>
        <p>${escapeHtml(a.description)}</p>
      </div>`
    )
    .join("");

  content.innerHTML = `
    <span class="type-badge type-${day.type}">${TYPE_LABELS[day.type] || day.type}</span>
    <h2>${escapeHtml(day.title)}</h2>
    <p class="panel-date">${formatDate(day.date)} (${day.day}) · ${escapeHtml(day.location.name)}</p>
    ${timesHtml.length ? `<div class="panel-times">${timesHtml.join("")}</div>` : ""}
    <p class="panel-summary">${escapeHtml(day.summary)}</p>
    ${day.lodging ? `<p class="lodging-note">Staying at: ${escapeHtml(day.lodging)}</p>` : ""}
    ${day.showFlights && trip.flights ? `<p class="lodging-note"><a href="${trip.flights.url}" target="_blank" rel="noopener">✈ ${escapeHtml(trip.flights.label || "Flight itinerary")} &rarr;</a></p>` : ""}
    ${activitiesHtml}
  `;

  panel.classList.remove("hidden");
}

document.getElementById("day-panel-close").addEventListener("click", () => {
  document.getElementById("day-panel").classList.add("hidden");
});

function buildTimeline() {
  const list = document.getElementById("timeline-list");
  list.innerHTML = trip.days
    .map((day, index) => {
      const activityCount = (day.activities || []).length;
      const activitySuffix = activityCount
        ? ` · ${activityCount} excursion${activityCount > 1 ? "s" : ""}`
        : "";
      return `
        <li class="timeline-item" data-index="${index}">
          <div class="timeline-date">
            <strong>${shortDate(day.date)}</strong>
            ${day.day}
          </div>
          <div class="timeline-body">
            <span class="type-badge type-${day.type}">${TYPE_LABELS[day.type] || day.type}</span>
            <p class="timeline-title">${escapeHtml(day.title)}</p>
            <p class="timeline-summary">${escapeHtml(day.location.name)}${activitySuffix}</p>
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
    <p>${escapeHtml(v.operator)} · built ${v.yearBuilt}</p>
    <p>${escapeHtml(v.design)}</p>
    <div class="ship-stats">
      <div class="stat-card"><div class="stat-value">${v.guests}</div><div class="stat-label">Guests</div></div>
      <div class="stat-card"><div class="stat-value">${v.crew}</div><div class="stat-label">Crew</div></div>
      <div class="stat-card"><div class="stat-value">${v.staterooms}</div><div class="stat-label">Staterooms</div></div>
      <div class="stat-card"><div class="stat-value">${v.decks}</div><div class="stat-label">Decks</div></div>
      <div class="stat-card"><div class="stat-value">${v.lengthFt} ft</div><div class="stat-label">Length</div></div>
      <div class="stat-card"><div class="stat-value">${v.beamFt} ft</div><div class="stat-label">Beam</div></div>
      <div class="stat-card"><div class="stat-value">${v.grossTonnage.toLocaleString()}</div><div class="stat-label">Gross tonnage</div></div>
      <div class="stat-card"><div class="stat-value">${v.speedKnots} kn</div><div class="stat-label">Cruising speed</div></div>
    </div>
    <h3>Highlights</h3>
    <ul>${v.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
    <p><a href="${v.moreInfoUrl}" target="_blank" rel="noopener">More on viking.com &rarr;</a></p>
    <p class="source-note">${escapeHtml(v.sourceNote)}</p>
  `;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function shortDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatDateRange(startIso, endIso) {
  const s = new Date(startIso + "T00:00:00");
  const e = new Date(endIso + "T00:00:00");
  const opts = { month: "short", day: "numeric", year: "numeric" };
  return `${s.toLocaleDateString(undefined, opts)} – ${e.toLocaleDateString(undefined, opts)}`;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
