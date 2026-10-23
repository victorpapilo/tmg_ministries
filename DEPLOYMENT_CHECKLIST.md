# TMG Ministries Production Deployment Checklist

## Before Vercel
- [ ] `npm install` succeeds locally
- [ ] `npm run build` succeeds
- [ ] MongoDB Atlas cluster created
- [ ] Production database user created
- [ ] Strong JWT secret generated
- [ ] Paystack test account/keys available
- [ ] Official church giving approval/details confirmed
- [ ] Official service times confirmed
- [ ] Official church email/social links confirmed

## Vercel environment variables
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] ADMIN_EMAIL
- [ ] ADMIN_PASSWORD
- [ ] SITE_URL
- [ ] PAYSTACK_SECRET_KEY
- [ ] PAYSTACK_PUBLIC_KEY
- [ ] VITE_API_URL=/api

## After deployment
- [ ] `/api/health` returns database connected
- [ ] `/admin/login` works
- [ ] Admin seed completed
- [ ] Public forms work
- [ ] Admin CRUD works
- [ ] Event registration works
- [ ] Donation test transaction works
- [ ] Paystack webhook is configured at `/api/payments/webhook`
- [ ] Donation appears as successful only after verification/webhook
- [ ] Mobile layout tested
- [ ] 404 handling tested
- [ ] No secrets are visible in frontend source

## Going live with Paystack
- [ ] Test transactions completed successfully
- [ ] Failed/cancelled payment behavior tested
- [ ] Amount verification tested
- [ ] Live Paystack keys added only in Vercel production environment
- [ ] Live webhook configured
- [ ] Church has confirmed its approved tithe/offering payment account
