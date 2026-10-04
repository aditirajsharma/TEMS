# IEEE TEMSMET 2026 — Conference Website

## How to Run

This is a plain HTML/CSS/JS site with **no build step required**.

1. Open the project folder: `c:\Users\LOLITA_Projects\TEMS\`
2. Double-click **`index.html`** — it opens directly in your browser.

> **Tip:** For the Google Maps embed to load correctly, open the site over a local server. You can use VS Code's [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, or run:
> ```bash
> npx serve .
> ```
> Then visit `http://localhost:3000`.

---

## File Structure

```
TEMS/
├── index.html              ← All page content
├── css/
│   └── style.css           ← All styles + design tokens
├── js/
│   └── main.js             ← Countdown, menu, scroll, etc.
├── assets/
│   └── images/
│       └── hero-campus.jpg ← Hero background image
└── README.md
```

---

## How to Edit Common Things

### 1. Change the IEEE Record Number
Open `js/main.js` and find the `CONFIG` block at the top:
```js
const CONFIG = {
  ieeeRecordNumber: 'XXXXX',   // ← Replace XXXXX with real number
  ...
};
```

### 2. Change the Countdown Date / Conference Start
In the same `CONFIG` block:
```js
conferenceStart: '2026-10-29T09:00:00+05:30',  // ← Edit date and time (IST)
```
Keep the `+05:30` suffix for Indian Standard Time.

### 3. Set the Registration URL
```js
registrationUrl: '#register',   // ← Replace with actual URL, e.g. 'https://cmt3.research.microsoft.com/...'
```
All "Register Now" CTA buttons will update automatically.

### 4. Update Important Dates
Open `index.html` and find Section 7 (Important Dates). Each date looks like:
```html
<time class="tl-date" datetime="[TBD]">[DATE TBD]</time>
```
Replace `[TBD]` in the `datetime` attribute with an ISO date (e.g. `2026-06-15`) and replace `[DATE TBD]` with the readable date (e.g. `15 June 2026`).

### 5. Replace `[VERIFY]` Placeholders
Search the HTML for `[VERIFY]` or `[TBD]` and fill in confirmed data:
- NAAC Accreditation grade
- NIRF ranking
- Student/programme count
- Contact email and phone
- Postal address

### 6. Swap the Hero Image
Replace the file at:
```
assets/images/hero-campus.jpg
```
Keep the same filename, or update the `src` attribute in `index.html` (`<img src="assets/images/hero-campus.jpg" ...>`).

---

## Lighthouse Targets
| Category       | Target |
|----------------|--------|
| Performance    | 90+    |
| Accessibility  | 95+    |
| Best Practices | 95+    |
| SEO            | 95+    |

---

## Credits
- Fonts: [Google Fonts — Poppins & Inter](https://fonts.google.com/)
- Icons: [Lucide Icons](https://lucide.dev/) (MIT License)
- Maps: Google Maps Embed API
