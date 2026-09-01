# Ruben Dsouza — Portfolio

A personal portfolio site built with plain HTML/CSS/JS. No frameworks, no build step.

## Structure

```
.
├── index.html                          # page content
├── style.css                           # design system + layout
├── script.js                           # mobile nav + footer date
├── assets/
│   └── Ruben-Dsouza-Resume.pdf         # downloadable résumé
└── README.md
```

## Running locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Save — your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/` within a minute or two.

## Before you publish

- [ ] Replace `YOUR-LINKEDIN-HANDLE` in `index.html` (search for `linkedin-link`) with your real LinkedIn URL.
- [ ] If you update your résumé later, just replace `assets/Ruben-Dsouza-Resume.pdf` with the new file (keep the same filename, or update the two `href` references in `index.html`).
- [ ] Double check the phone number / email are ones you're comfortable listing publicly.
- [ ] Update the footer year in `index.html` if needed.

## Customizing

- Colors, fonts, and spacing are defined as CSS custom properties at the top of `style.css` under `:root`.
- Each resume section (Experience, Skills, Education) is a clearly labeled block in `index.html` — edit the text directly there.
