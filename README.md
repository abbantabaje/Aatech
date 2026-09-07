# AATECH INTEGRATED SOLUTIONS LTD — Website

## Files
- `index.html` — public company website
- `styles.css` — public website styling
- `script.js` — loads projects into the public website
- `admin.html` — admin login/dashboard
- `admin.css` — dashboard styling
- `admin.js` — project management

## Run locally
Open `index.html` in a browser. No build step is required.

## Admin
Open `admin.html`.

Demo credentials:
- Username: `admin`
- Password: `AATech@2026`

### Important security note
This version is a static website. Projects are saved in the browser's `localStorage`, and the login is client-side. It is suitable for a prototype/simple personal admin workflow, but **it is not secure authentication for a production business website**. Anyone with access to the source can inspect the credentials.

For a production deployment, connect the admin area to a real authentication/database service (for example Supabase or Firebase) and store projects/images remotely.

## Deploy to GitHub + Netlify
1. Create a GitHub repository.
2. Upload all files and the `assets` folder.
3. In Netlify, import the GitHub repository.
4. Build command: leave empty.
5. Publish directory: `/` (or the repository root).
6. Deploy.

## Add project photos
Use the Admin Dashboard. The browser stores the selected image as data. Keep photos reasonably compressed.


## Project Request Form
The public website now includes **Request a Project**. Visitors can submit:
- Name and phone
- Email
- Location
- Service needed
- Project title
- Detailed project description
- Preferred date

The form:
1. Saves a local copy in the browser.
2. Opens WhatsApp with the complete request addressed to AATECH (09035673722).
3. Provides an email link to send the same request to `aatechsolutionltd@gmail.com`.
4. Shows saved requests in the Admin Dashboard when using the same browser/device.

### Production note
For requests to reliably reach you from every visitor/device, a backend/form service should be connected later. The current static version does not provide guaranteed server-side storage or automatic email delivery.
