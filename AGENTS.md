# AI Agent Guide

This repository is the static website for **Ren Creative Solutions** (`rencs.com`). It is intentionally dependency-free after the original template was simplified.

## Project shape

- `index.html` — single-page site content and section markup.
- `css/` — compiled stylesheets used directly by the page.
- `js/` — browser scripts used directly by the page.
- `i18n/tr.json` — Turkish translation strings loaded by the language switcher.
- `img` — production image assets.
- `fonts` — production font assets.
- `favicon.png` — site favicon.
- `img-original/`, `template-original/` — source/reference assets; do not edit unless explicitly requested.
- `CNAME` — GitHub Pages custom domain. Keep it intact.

## How to work here

- There is no build step, package manager, or test runner in the current site.
- Make small, direct edits to the static files.
- Preserve the existing HTML structure, CSS class names, and asset paths unless the issue requires a change.
- Keep content accessible: meaningful `alt` text, valid headings, and no unnecessary JavaScript.
- For text shown on the site, update both the English markup and `i18n/tr.json` when the string is language-switchable.
- Update `AGENTS.md` whenever a website change adds or changes project conventions, integrations, or verification steps.

## Verification

Before opening a PR:

1. Check `git diff` for unintended asset or formatting churn.
2. Confirm `index.html` still references existing local assets.
3. If changing UI or layout, preview the page locally with a static server such as `python3 -m http.server`.
4. For contact form changes, keep the EmailJS browser SDK script in `index.html` and the public key/template IDs in `js/main.js` aligned with the EmailJS project.
5. Contact form success and failure states use inline Magnific Popup modals in `index.html`; avoid replacing them with browser alerts.

## PR notes

- Keep PRs focused on one issue.
- Mention the issue number in the PR body, for example `Closes #1`.
