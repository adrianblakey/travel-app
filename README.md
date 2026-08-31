# travel-app

A static web app for sharing a trip itinerary with friends and family: a route map
(OpenStreetMap via [Leaflet](https://leafletjs.com/)) overlaid with the dates and
places you'll be, day-by-day detail on excursions when ashore, and background on
the ship. No login, no backend — just static files.

## Running locally

The app fetches its trip data as JSON, so it needs to be served over HTTP (not
opened as a `file://` URL). From the project root:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

or with Node:

```sh
npx serve .
```

## Project layout

```
index.html            App shell (three views: map, day-by-day, ship)
css/styles.css
js/app.js              Loads trip data, renders the map/timeline/ship views
data/trips/*.json       One JSON file per trip (see schema below)
```

## Deploying

Everything is static, so any static host works (GitHub Pages, Netlify, etc.).
For GitHub Pages: push to `main` and enable Pages on the repo, serving from the
root of the branch.

## Trip data schema

Each trip lives in its own file under `data/trips/`. The schema isn't
cruise-specific — a hotel-only or road-trip itinerary can reuse the same
`days` array with different `type` values, and can simply omit `vessel`.

```jsonc
{
  "id": "slug",
  "title": "...",
  "subtitle": "...",
  "type": "cruise",            // free-form: "cruise", "trip", etc.
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "travelers": ["First name", "..."],
  "vessel": { ... },            // optional — omit for non-cruise trips
  "days": [
    {
      "date": "YYYY-MM-DD",
      "day": "Mon",
      "type": "port | sea | scenic | hotel | transfer | embark | disembark",
      "phase": "optional grouping label, e.g. 'Peru Extension'",
      "location": { "name": "...", "lat": 0, "lon": 0 },
      "title": "...",
      "summary": "...",
      "arrival": "HH:MM or null",
      "departure": "HH:MM or null",
      "lodging": "optional hotel name",
      "activities": [
        {
          "title": "...",
          "duration": "...",
          "time": "...",
          "travelers": ["First name", "..."],
          "description": "..."
        }
      ]
    }
  ]
}
```

To point the app at a different trip, change `TRIP_URL` at the top of
`js/app.js`. Multi-trip switching (a picker instead of a hardcoded URL) is a
natural next step once there's more than one trip to show.

## A note on privacy

Source booking documents (PDFs with names, addresses, booking numbers, prices,
payment info) are intentionally **not** committed — `.gitignore` excludes
`*.pdf` and a couple of private data paths. Only trip *content* (places,
dates, excursion descriptions) goes into `data/trips/*.json`, and only first
names are used for travelers. Keep it that way for any trip you add: no
addresses, phone numbers, booking/confirmation numbers, or payment details in
committed files.
