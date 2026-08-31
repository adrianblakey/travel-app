# travel-app

A static web app for sharing a trip itinerary with friends and family: a route map
(OpenStreetMap via [Leaflet](https://leafletjs.com/)) with numbered, color-coded
stops and directional arrows, day-by-day detail on excursions when ashore, and
background on the ship. Each stop links out to live and seasonal weather. No
login, no backend — just static files. Content renders in English or German
via a switch in the header.

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
  "stateroom": {                // optional — cruise-specific, rendered on the Ship tab
    "category": "PV3 — Penthouse Veranda",  // plain string, Viking's own product name
    "cabinNumber": null,        // set once known; shows "to be assigned" while null
    "typicalDeck": "Deck 4",
    "deckPlanUrl": "https://...",  // link to the official deck plan PDF
    "note": { "en": "...", "de": "..." }
  },
  "days": [
    {
      "date": "YYYY-MM-DD",
      "type": "port | sea | scenic | hotel | transfer | embark | disembark | excursion",
      "location": {
        "lat": 0, "lon": 0,
        "name": { "en": "...", "de": "..." },
        "weatherQuery": { "en": "...", "de": "..." }  // optional override for the
                                              // Wikipedia link — used when `name` isn't
                                              // a clean, searchable article title
                                              // (parentheticals, a region suffix like
                                              // "X, Sacred Valley, Peru", or a name that
                                              // isn't the actual German article title,
                                              // e.g. "Patagonia" -> "Patagonien"). Without
                                              // it, the app defaults to name split at the
                                              // first comma, in whichever language is
                                              // selected.
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
      "country": "peru",        // optional plain string key into COUNTRY_ADVISORIES
                                 // (js/app.js) — adds travel-advisory links to this
                                 // day. Omit for sea/scenic days where no border
                                 // is crossed.
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

## Map features

- **Numbered stops.** Every day gets a numbered marker (1, 2, 3…) in
  itinerary order, so the sequence of the trip is legible even where the
  route doubles back on itself.
- **Color-coded by kind.** Marker color follows `TYPE_COLORS` in
  `js/app.js`; the on-map legend (bottom-left, `#map-legend`, built by
  `buildLegend()`) explains what each color means and stays in sync with
  the language switch. `LEGEND_ITEMS` groups the seven `day.type` values
  into five legend rows — extend that array if a new `type` needs its own
  swatch.
- **Direction-of-travel arrows** are drawn along the route with the
  [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator)
  plugin (loaded via CDN in `index.html`). They work automatically because
  the polyline's vertices are just the days in chronological order.
- **Weather links** on every day's detail panel: a Windy.com link built
  straight from `location.lat`/`lon` (always resolves, since it needs no
  place-name lookup), and a Wikipedia link for climate/seasonal context
  (see `weatherQuery` above). The Wikipedia link's edition (`en.wikipedia.org`
  vs `de.wikipedia.org`) and article name both follow the selected UI
  language — every slug used here was checked to exist on **both** editions
  before shipping, since a mismatch (querying `en.wikipedia.org` for a German
  name, or vice versa) 404s. Both links are computed in `js/app.js`
  (`windyUrl`, `wikipediaUrl`) rather than stored in the trip data. Sea and
  scenic-sailing days get a third link, a Windy "waves" layer, as a shipping
  forecast (`shippingForecastUrl`, gated by `SHIPPING_FORECAST_TYPES`).
- **Travel advisories.** Days with a `country` field get links to the UK
  FCDO and (where available) German Auswärtiges Amt advisory pages for that
  country — see `COUNTRY_ADVISORIES` in `js/app.js`. Add a country there
  before tagging a new day with it.
- **Live ship traffic (AIS).** A 🛰 button (top-left, next to the zoom
  controls) opens a panel embedding MarineTraffic's free live-AIS map,
  centered on whichever day's detail panel is open (or the route's overall
  center if none is). This is **click-to-load by design**: nothing from
  marinetraffic.com is fetched until the button is pressed, and the iframe's
  `src` is cleared back to `about:blank` on close — see `toggleAisPanel()`.
  There's no free, keyless, static-site-friendly way to pull raw AIS data
  directly (that needs a backend or a paid API), so this embeds the one
  provider that offers a free, no-signup embeddable map.

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

### Keeping the site out of search engines & social platforms

`robots.txt` (`Disallow: /`) and a `<meta name="robots" content="noindex, ...">`
tag in `index.html` ask crawlers not to index the site or generate link
previews. This is **honesty-based, not access control**: well-behaved bots
(Google, Bing, Facebook's/Instagram's preview crawlers) respect it, so the
site won't turn up in search results or generate a rich card when a link is
shared — but plain GitHub Pages has no real authentication, so anyone who has
the direct URL can still open it. That's presumably fine for a link only
shared with family and friends; if it ever needs actual access control
(a login, a password that isn't just decorative), that means moving off
plain GitHub Pages to something with real auth in front of it (e.g.
Cloudflare Access) — a bigger change, not done here.

### Cookies

No cookie-consent banner is included, and none is needed for the site as it
stands: no cookies or tracking are set by the app's own code, the one piece
of browser storage (`tripLang`, remembering the language toggle) is
strictly-necessary/functional and exempt from consent requirements under
GDPR/ePrivacy guidance, and third-party sites (Windy, Wikipedia, hotels,
advisories, MarineTraffic) are only ever reached by the visitor clicking an
outbound link — nothing from them loads inside this page. The one exception,
the AIS panel's MarineTraffic embed, is deliberately click-to-load (see
above) specifically so it never fires without an explicit action, which
keeps it out of "requires a consent banner" territory. If a future addition
embeds third-party content automatically (analytics, ads, an always-on
embed), revisit this.
