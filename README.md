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
js/app.js              Loads the trip manifest + trip data, renders the map/timeline/ship views
data/trips/index.json  Manifest listing every trip (see "Multiple trips" below)
data/trips/*.json      One JSON file per trip (see schema below)
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
  "flights": { "label": { "en": "...", "de": "..." }, "url": "..." },  // optional;
                                 // set "url" to null for a not-yet-booked
                                 // placeholder — shows the label as a
                                 // non-clickable "(not yet booked)" tab/note
                                 // instead of hiding it or linking nowhere
  "vessel": { ... },            // optional — omit for non-cruise trips
  "reminders": [                // optional — pre-trip action items with a deadline
    {
      "date": "2026-11-13T20:00:00Z",  // full ISO timestamp with an explicit
                                 // UTC offset — always shown/compared in UTC
                                 // (labeled "GMT" in the UI), not the
                                 // visitor's own timezone, since these are
                                 // real-world deadlines (e.g. a reservations
                                 // desk opening at a specific clock time)
      "label": { "en": "...", "de": "..." }
    }
  ],                             // shown as a banner while `date` is still in
                                 // the future; past reminders disappear
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
      "endDate": "YYYY-MM-DD", // optional — for a multi-night stay covered by
                                 // one entry (e.g. two nights in one hotel)
                                 // instead of a separate entry per night.
                                 // Marks the LAST NIGHT spent, not a checkout
                                 // date — date=Jan 20, endDate=Jan 21 means
                                 // two nights (the 20th and 21st), with
                                 // checkout the next day handled by whatever
                                 // day entry comes next. Both the calendar
                                 // and this day's own detail panel mark/cover
                                 // every date in between; without it the
                                 // entry is a single day as before.
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
      "links": [                 // optional — curated links specific to this day
                                 // (trains, ferries, car rental, anything worth
                                 // pointing at from a free/flexible day). Unlike
                                 // the weather/advisory links, these come straight
                                 // from the trip data rather than being derived —
                                 // verify each URL (e.g. `curl -o /dev/null -w
                                 // '%{http_code}'`) before adding it.
        {
          "icon": "🚆",          // optional single emoji; falls back to 🔗
          "label": { "en": "...", "de": "..." },
          "url": "https://..."
        }
      ],
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

## Multiple trips

`data/trips/index.json` is a manifest of every trip the app can show:

```jsonc
[
  {
    "id": "slug",                 // must match the trip file's own "id"
    "file": "slug.json",          // filename under data/trips/
    "label": { "en": "...", "de": "..." }
  }
]
```

At startup, `init()` (in `js/app.js`) fetches the manifest and picks a trip
— the one saved in `localStorage` (`tripId`) if present, otherwise the first
entry — then `loadTrip(entry)` fetches that trip's JSON and rebuilds the map,
timeline, ship view, and legend from it. The header's trip `<select>`
(`setupTripSwitcher()`) lists every manifest entry and calls `loadTrip()` on
change; switching trips persists the choice to `localStorage` so a reload
comes back to the same trip.

Because trips can be structurally different (a cruise vs. a land coach tour),
several parts of the UI adapt to what a trip actually contains rather than
assuming cruise-shaped data:

- The map **legend** (`buildLegend()`) only renders rows for `day.type`
  values actually present in the current trip — a land trip with no
  `port`/`sea`/`scenic`/`embark`/`disembark` days won't show swatches for
  them. `LEGEND_ITEMS` entries each carry a `types` array used for this
  filtering.
- The **Ship tab** and **flights link** are hidden entirely for a trip with
  no `vessel` / no `flights` (`loadTrip()` toggles `shipTabBtn.hidden`;
  `buildFlightsLink()` hides the link rather than leaving a stale one from
  the previously-loaded trip).
- `loadTrip()` always switches to the Route Map tab before tearing down and
  rebuilding the Leaflet map. Leaflet sizes its tiles from the container's
  on-screen dimensions at init time, so building the map into a hidden
  (`display:none`) view — e.g. if the user was on "Day by Day" when they
  switched trips — leaves it permanently broken (tiles never load, even
  after switching to the map tab afterwards). Forcing the map tab active
  first avoids this; don't remove that `.click()` call when touching
  `loadTrip()`.

To add a new trip: drop a new `data/trips/<slug>.json` file following the
schema above, then add one entry for it to `data/trips/index.json`.

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
- **Travel advisories.** Days with a `country` field get a link to that
  country's official advisory page — UK FCDO in English, German
  Auswärtiges Amt in German (falling back to FCDO where no AA page exists,
  e.g. the Falklands) — see `COUNTRY_ADVISORIES` in `js/app.js`. Add a
  country there before tagging a new day with it.
- **Live ship traffic (AIS).** A 🛰 button (top-left, next to the zoom
  controls) opens a floating panel embedding MarineTraffic's free live-AIS
  map, centered on whichever day's detail panel is open (or the route's
  overall center if none is). This is **click-to-load by design**: nothing
  from marinetraffic.com is fetched until the button is pressed, and the
  iframe's `src` is cleared back to `about:blank` on close — see
  `toggleAisPanel()`. There's no free, keyless, static-site-friendly way to
  pull raw AIS data directly (that needs a backend or a paid API), so this
  embeds the one provider that offers a free, no-signup embeddable map.
  The panel is both **draggable** (by its header/title bar — `setupAisDrag()`)
  and **resizable** (by the small grip in its bottom-right corner —
  `setupAisResize()`), both via Pointer Events so mouse and touch work the
  same way; resize also takes arrow keys when the grip is focused. Either
  interaction, whichever happens first, freezes the panel from its default
  CSS-centered position into an explicit `top`/`left`/`width`/`height` box
  via the shared `freezeAisPanel()`. The resize floor (200×160px) lives
  only in that JS, not in CSS — don't reintroduce a `min-width`/`min-height`
  on `.ais-panel`; an earlier version had one that silently overrode the
  JS floor with a larger value.

To add a UI language beyond English/German, extend the `UI` dictionary and
the `.lang-btn` markup in `index.html`; the app doesn't hardcode a
two-language assumption anywhere except that toggle.

## Calendar

The Calendar tab shows a month grid with a colored dot on every date that
falls on a trip day, across **all** trips in the manifest — not just the one
currently loaded. This is built from `dateIndex`, a `Map<"YYYY-MM-DD",
Array<{tripId, dayIndex, type}>>` populated once at startup by
`buildDateIndex()` (it fetches every trip file in the manifest just to read
their `days[].date` values). A date input lets you jump straight to a date;
clicking a marked date does the same. Either one opens that day's panel on
the map, switching to that day's trip first via `loadTrip()` if it isn't the
one currently showing (`goToDate()`).

Days that fall on the currently-loaded trip get an outlined cell
(`.current-trip`); any trip day gets a colored dot matching its `type`
(`TYPE_COLORS`, same palette as the map markers and legend). Switching trips
via the header dropdown jumps the calendar to that trip's start month;
searching or clicking a date instead jumps to that date's own month — see
the comment on `calendarViewDate` resets in `setupTripSwitcher()` vs.
`goToDate()` if touching this logic, since the two "reset the visible month"
paths are easy to make fight each other.

## Shareable per-trip URLs

Every trip gets its own link via a `?trip=<id>` query param, e.g.
`?trip=amalfi-2026`. `init()` checks it (ahead of the last-viewed trip saved
in `localStorage`) so a shared link always opens on the trip it names, and
`loadTrip()` keeps it in sync via `updateUrlForTrip()` — using
`history.replaceState`, not `pushState`, so switching trips doesn't clutter
the back-button history.

## Trip countdown

The header shows a small badge under the title/subtitle: "N days to go"
before the trip starts, or "Day N of M" while it's underway — computed from
`trip.startDate`/`endDate` against today's date at render time
(`buildCountdown()`). No stored state; it's always live. Once the trip is
over the badge clears itself entirely (empty text, hidden by the `:empty`
CSS rule) rather than leaving a "completed" label showing forever.

## Reminders

A trip's optional `reminders` (see the schema above) show as a small 🔔 in
the header, top-right next to the language switch — visible only while at
least one reminder hasn't passed yet, with a small dot marking it as
active. Hovering (or focusing, for keyboard use) shows the reminder text,
its deadline, and a live "in N days" countdown in a tooltip
(`buildReminders()`); there's no persistent banner, so it stays out of the
way until you actually want to check it.

Reminders are pooled across **every** trip in the manifest (`allReminders`,
built alongside `dateIndex` in `buildDateIndex()`), not just the one
currently loaded — a reminder is a personal to-do, not something tied to
whichever trip page happens to be open, so it stays visible regardless of
which trip you're viewing.

The bell's wrapper is hidden via the `hidden` attribute (`wrap.hidden =
true`), not a class — if you add CSS for it, keep any `display` rule scoped
to `.reminder-bell-wrap:not([hidden])`. Setting `display` on the bare
`.reminder-bell-wrap` selector would out-specificity the browser's own
`[hidden] { display: none }` default and silently defeat `wrap.hidden =
true` (this happened once already — the bell stayed visible-but-empty
instead of hiding).

### Alerts: browser notification + sound

Two alerts fire per reminder while a browser tab has this page open
(`checkReminderAlerts()`, in `js/app.js`, run once at startup and then every
`REMINDER_CHECK_INTERVAL_MS` — 30s):

- **Same day.** The first time the page is open on the reminder's own UTC
  calendar date, it plays a short chime and shows a browser Notification.
  Re-arms the next calendar day (its localStorage key includes the date).
- **5 minutes before.** Once the reminder is within
  `REMINDER_WARNING_WINDOW_MS` (5 minutes) of its exact time, it plays a
  louder four-beep alarm and shows a Notification. Fires once per reminder.

Both browser Notifications and Web Audio playback require a prior user
gesture in most browsers — a tab that's merely open and untouched can't pop
a notification or play audio out of nowhere. `setupReminderAlerts()` hooks
the first click/keydown/touch anywhere on the page (and the bell
specifically) to create/resume the shared `AudioContext` and request
Notification permission, so alerts can actually fire once the visitor has
interacted at all. If the page is never interacted with, or notification
permission is denied, the alert simply never becomes audible/visible — there
is no fallback in-page toast, so don't rely on this for anything
time-critical.

Reminder dates are UTC/GMT-anchored throughout ("same day" is checked
against UTC calendar date, not the visitor's local one), matching how the
reminder's own displayed time is always labeled "GMT" — see the note on
`formatReminderDateTime` above.

## App version

The footer shows a small `v<N>` before the copyright line, from the
`APP_VERSION` constant at the top of `js/app.js`. Bump it by 1 in every
commit that changes the app, so the deployed version is visible at a glance
without checking git history.

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
