# travel-app

A static web app for sharing a trip itinerary with friends and family: a route map
(OpenStreetMap via [Leaflet](https://leafletjs.com/)) overlaid with the dates and
places you'll be, day-by-day detail on excursions when ashore, and background on
the ship. No login, no backend — just static files. Content renders in English
or German via a switch in the header.

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

Any text a visitor reads is **bilingual**: instead of a plain string, it's an
object with `en` and `de` keys, e.g. `"title": { "en": "...", "de": "..." }`.
Fields that aren't shown as prose — dates, coordinates, `type` — stay plain
strings, as does the proper-noun `name` inside `lodging` (hotel names aren't
translated). The `js/app.js` helper `t(field)` reads the right language out
of a bilingual field, falling back to `en` if a `de` key is missing, so a new
trip can be added in English only and translated later without breaking
anything.

```jsonc
{
  "id": "slug",
  "title": { "en": "...", "de": "..." },
  "subtitle": { "en": "...", "de": "..." },
  "type": "cruise",            // free-form: "cruise", "trip", etc.
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "travelers": ["First name", "..."],
  "flights": { "label": { "en": "...", "de": "..." }, "url": "..." },  // optional
  "vessel": { ... },            // optional — omit for non-cruise trips
  "days": [
    {
      "date": "YYYY-MM-DD",
      "type": "port | sea | scenic | hotel | transfer | embark | disembark | excursion",
      "location": {
        "lat": 0, "lon": 0,
        "name": { "en": "...", "de": "..." }
      },
      "title": { "en": "...", "de": "..." },
      "summary": { "en": "...", "de": "..." },
      "arrival": "HH:MM",       // omit if not applicable
      "departure": "HH:MM",     // omit if not applicable
      "lodging": {               // optional; name is a plain string (proper noun, not translated)
        "name": "Hotel name",
        "url": "https://..."     // optional — omit for no link. A bare string is still accepted.
      },
      "showFlights": true,      // optional — surfaces the flights link on this day
      "note": { "en": "...", "de": "..." },  // optional — small italic caveat shown under the day's detail, e.g. flagging content that was inferred rather than taken verbatim from a booking document
      "activities": [
        {
          "title": { "en": "...", "de": "..." },
          "duration": { "en": "...", "de": "..." },
          "time": { "en": "...", "de": "..." },
          "travelers": ["First name", "..."],
          "description": { "en": "...", "de": "..." }
        }
      ]
    }
  ]
}
```

The weekday abbreviation shown next to each date (e.g. "Sun" / "So") isn't
stored — it's derived from `date` at render time via
`Date.prototype.toLocaleDateString`, so it's automatically correct in
whichever language is selected.

To add a UI language beyond English/German, extend the `UI` dictionary and
the `.lang-btn` markup in `index.html`; the app doesn't hardcode a
two-language assumption anywhere except that toggle.

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
