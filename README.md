# TMG Ministries — Premium Church Website & Management System

A production-oriented React/Vite church website for **Throne of Mercy and Glory Ministries (TMG Ministries)**, with an Express/MongoDB API and protected admin management console.

## What is included

### Public website
- Premium cinematic homepage
- Scroll progress + Framer Motion reveal/parallax animations
- Home / About / Ministries / Sermons / Events / Media / Give / Prayer / Visit / Contact
- Responsive navigation
- Real TMG logo and supplied photography
- Google Maps location and directions
- Prayer request form
- Contact form
- Giving page ready for official church-approved payment information
- Media gallery
- Mobile/tablet/desktop layouts

### Management system
- Secure admin login
- Dashboard overview
- Sermon management
- Event management
- Ministry management
- Leadership management
- Announcement management
- Media management
- Prayer request inbox
- Contact message inbox
- Subscriber area
- Site settings
- Analytics integration placeholder
- JWT authentication + bcrypt password hashing
- MongoDB Atlas persistence

## 1. Requirements

Install:
- Node.js 20+ recommended
- VS Code
- Git
- MongoDB Atlas account
- GitHub account
- Vercel account

Check Node and npm:

```bash
node -v
npm -v
```

## 2. Install dependencies

Open a terminal in the project root:

```bash
npm install
```

If you see a network timeout, make sure your internet connection is stable and run the command again.

## 3. Environment variables

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Mac/Linux:

```bash
cp .env.example .env
```

Set:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=use_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose-a-strong-password
API_PORT=5000
```

Never commit `.env` to GitHub.

## 4. MongoDB Atlas

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Add your development IP under Network Access.
5. Copy the connection string.
6. Put it in `MONGODB_URI`.
7. Do not expose this value in React or public code.

## 5. Create the first admin

After the database variables are configured:

```bash
npm run seed:admin
```

This hashes the admin password before saving it.

## 6. Run the website and API

Run both:

```bash
npm run dev:all
```

Frontend:

`http://localhost:5173`

API:

`http://localhost:5000`

The Vite development proxy forwards `/api/*` to the API, so this should work from the browser:

`http://localhost:5173/api/health`

A successful response looks like:

```json
{
  "ok": true,
  "service": "TMG Ministries API"
}
```

If you receive `Database unavailable`, the API is running but MongoDB is not connected yet.

## 7. Admin login

Open:

`http://localhost:5173/admin/login`

Use the email/password configured for the seed command.

## 8. Important project structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Reveal.jsx
│   ├── PageTransition.jsx
│   ├── ScrollProgress.jsx
│   └── SectionHeading.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── ContentPage.jsx
│   ├── Visit.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── Admin.jsx
├── lib/
│   └── api.js
├── styles/
│   └── global.css
└── App.jsx

api/
├── index.js
├── db.js
├── middleware/
└── models/

public/images/
├── tmg-logo-banner.jpg
├── preacher.jpg
├── worship-service.jpg
├── children-event.jpg
└── leaders.jpg
```

## 9. TMG brand information

Official address:

**KM 14 Warri-Patani Rd, Ughelli 333105, Delta, Nigeria**

Phone:

**0803 060 5791**

Google Maps:

https://www.google.com/maps/place/TMG+MINISTRIES/@5.5472703,5.9167004,924m/

Coordinates:

- Latitude: `5.5472703`
- Longitude: `5.9187453`

Use `tmg-logo-banner.jpg` as the official website logo asset. Do not replace it with the other logo file unless specifically requested.

## 10. Animations

The public website uses Framer Motion for:

- Hero entrance choreography
- Scroll reveals
- Image parallax
- Page transitions
- Hover movement
- CTA shine effects
- Scroll progress indicator

Animations intentionally use a premium easing curve rather than generic linear movement. Keep animations subtle enough that they do not hurt performance or accessibility.

## 11. Production build

```bash
npm run build
```

Then preview the production build locally:

```bash
npm run preview
```

## 12. GitHub

```bash
git init
git add .
git commit -m "Build premium TMG Ministries website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 13. Vercel

Import the GitHub repository into Vercel.

Add the production environment variables in Vercel:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- any API/storage keys added later

MongoDB Atlas must allow the production connection. Review your Atlas Network Access rules before launch.

## 14. Before client launch

Do not launch with placeholder information. Obtain and enter:

- Official church vision
- Mission
- Beliefs
- Service times
- Leadership biographies
- Ministries
- Official email
- Social media links
- Giving methods
- Upcoming events
- Approved sermon/video links
- Any official church motto/tagline

Also test:

- Mobile navigation
- Forms
- Admin authentication
- Every admin CRUD module
- MongoDB connection
- Production API
- Vercel deployment
- Google Maps directions
- SEO metadata
- Image loading/performance

## 15. Roadmap

### V1 — Website + CMS
Already structured for:
- Public website
- Content management
- Prayer/contact inboxes
- Church settings

### V2 — Advanced management
Recommended next:
- Full edit/update UI for every content module
- Publishing controls
- Role/permission management
- Activity log
- Event registration
- Subscriber export
- Media storage integration
- SEO editor
- Notifications

### V3 — Full church management
Only build these when TMG confirms they need them:
- Member records
- Attendance
- Departments
- Small groups
- Volunteers
- Follow-up/visitor care
- Child check-in
- Giving records
- Financial reporting
- SMS/email automation

Build around the church's real workflow instead of adding complexity for its own sake.

# TMG V2 + V3 Church Management Platform

This build includes the advanced management modules in one project, including church content, member records, attendance, groups, volunteers, follow-up, children check-in, event registrations, documents, notifications, activity logs, administrator roles, reporting, and giving records.

## Paystack Giving (Tithe & Offering)

The giving page uses a server-side Paystack transaction initialization flow. The Paystack secret key is never placed in the React frontend. Paystack's documentation recommends keeping secret-key API calls on the server and verifying successful transactions before treating them as completed.

### Environment variables

Add these to `.env` locally and to Vercel Project Settings in production:

```env
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-strong-password
SITE_URL=https://your-production-domain.vercel.app
PAYSTACK_SECRET_KEY=sk_test_xxx
PAYSTACK_PUBLIC_KEY=pk_test_xxx
VITE_API_URL=/api
```

For initial testing, use Paystack **test** keys. Switch to live keys only after the integration has been tested and the church's Paystack account is approved for live transactions.

### Paystack webhook

Set the webhook URL in the Paystack dashboard to:

`https://YOUR-DOMAIN/api/payments/webhook`

The server validates Paystack's `x-paystack-signature` HMAC-SHA512 signature before processing payment events.

### Giving flow

1. Visitor selects Tithe, Offering, Special Giving, or Other.
2. Visitor enters email and amount.
3. React sends the request to `/api/payments/initialize`.
4. The server creates a unique donation reference and initializes Paystack.
5. The visitor is redirected to Paystack Checkout.
6. Paystack redirects back to `/give?reference=...`.
7. The server verifies the reference and amount with Paystack.
8. Paystack webhook events can also mark the donation successful.
9. Successful donations appear in the Admin > Donations area.

Never mark a payment successful merely because a visitor reached the callback URL.

## Vercel deployment

Vercel supports Node.js serverless functions and this project exposes `api/index.js` as the server entry point.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "TMG Ministries V2 V3 platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### 2. Import into Vercel

1. Open Vercel.
2. Add a new project.
3. Import the GitHub repository.
4. Keep the project root at the repository root.
5. Use the build command `npm run build`.
6. Use `dist` as the output directory.
7. Deploy.

### 3. Add production environment variables

Add every variable from `.env.example` in Vercel Project Settings > Environment Variables. Never commit `.env`.

### 4. MongoDB Atlas

Allow the deployed application to reach the Atlas cluster and use the production MongoDB URI in Vercel. For a first deployment, confirm the Atlas network-access policy allows your deployment environment according to MongoDB Atlas' current networking guidance.

### 5. Paystack

After the Vercel deployment has a stable URL:

- Put the URL in `SITE_URL`.
- Add the Paystack test secret/public keys first.
- Set the Paystack webhook to `https://YOUR-DOMAIN/api/payments/webhook`.
- Test successful and failed payments.
- Verify the donation appears in Admin > Donations.
- Only after testing, switch to Paystack live keys and configure the live webhook.

## Important security rules

- Do not put `PAYSTACK_SECRET_KEY` in any `VITE_*` variable.
- Do not commit `.env`.
- Do not store raw passwords in MongoDB.
- Do not trust the Paystack callback alone.
- Verify both payment status and expected amount.
- Keep prayer requests and child-check-in records restricted to authorized administrators.
- Use the Super Admin role only for trusted church leadership/staff.
