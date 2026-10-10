# AMIFY Waitlist — rebuilt static website

Responsive multi-page website built with plain HTML, CSS and JavaScript for GitHub Pages.

## Files
- `index.html` — Home
- `farmers.html` — For farmers and producers
- `buyers.html` — For buyers and food businesses
- `trust.html` — Trust, quality and delivery
- `how-it-works.html` — What AMIFY is exploring
- `research.html` — Research mission
- `join.html` — Guided three-step research/waitlist form
- `thank-you.html` — Thank-you page
- `css/styles.css` — All site styles
- `js/main.js` — Mobile navigation and conditional form behaviour
- `js/config.js` — Form endpoint configuration

## Run locally
Open the folder in VS Code and use Live Server, or open `index.html` in a browser.

## Form integration
The form uses FormSubmit (email submission), not a database. The current destination is `https://formsubmit.co/iadesanya539@gmail.com`, based on the email address in the available project context. If your existing FormSubmit setup uses a different recipient, update `js/config.js` and the form action in `join.html`. FormSubmit may require a one-time email activation; test after deployment and check spam.

## Deploy
Put the contents of this folder in the root of the existing `AMIFY-WAITLIST` GitHub repository and commit/push to the branch GitHub Pages serves. Links are relative and should work at `https://ifrosh.github.io/AMIFY-WAITLIST/`.

## Images
Photos load from Unsplash URLs. Verify the selected image and usage terms before launch, or download approved images and host them locally.
