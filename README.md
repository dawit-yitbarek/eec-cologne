# Church Website

A multilingual Next.js website for a church community, including pages for donations, ministries, gallery, statement of faith, and an imprint (Impressum).

## Project Structure

- `src/app/[lang]/` - application routes and pages
- `src/components/` - reusable UI components
- `src/lib/` - message loading
- `src/messages/` - localized content for English, German, and Amharic
- `public/images/` - image assets used across the site

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Supported Pages

- Home page
- Donate page with payment handling and verification
- Gallery
- Ministries (Children, Youth)
- Statement of Faith
- Impressum
- About page

## Localization

This project supports multiple languages (English, German, Amharic) using URL-based routing with the `[lang]` dynamic segment. The language is determined from the URL path (e.g., `/en/about`, `/de/about`).

A middleware in `src/proxy.js` handles automatic redirection to the appropriate locale based on user preferences or browser settings.

Localized content is stored in JSON files under `src/messages/`.

## Deployment

Build the production version with:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

For static hosting or deployment platforms, use the built output from `.next`.

## Environment Variables

The donation flow uses PayPal, so you must configure your environment variables before running the app.

Create a `.env.local` file with:

```bash
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_SECRET=your-paypal-secret-key
PAYPAL_MODE="If working with sandbox paypal credentials, use 'sandbox'. If working with real paypal credentials, use 'live'"
APP_URL=your-app-url
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_SECRET=your-cloudinary-secret-key
CLOUDINARY_API_KEY=your-cloudinary-api-key
```

If you use a different environment file setup, make sure the values are accessible to your server and client where required.

## Notes

- The app uses the Next.js App Router with `src/app` pages.
- Donation and order handling are implemented in API routes under `src/app/api/`.
- PayPal is used for donation processing.
