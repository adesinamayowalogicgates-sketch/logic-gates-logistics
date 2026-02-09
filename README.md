# Logic Gates Logistics

## Run locally

```bash
npm install
npx prisma generate
npm run dev
```

Then open `http://localhost:3000`.

## Database setup (Supabase)

- Do not run `prisma db push` (port 5432 is blocked on the network).
- Apply schema changes via Supabase SQL Editor:
  - Run `supabase/sql/add_email_otp.sql` to create the Email OTP table + `emailVerifiedAt`.

## Customer app

- Login: `/app/login`
- Register: `/app/register`
- Dashboard: `/app/dashboard`
- New booking: `/app/bookings/new`
- Wallet: `/app/wallet`

## Admin app

- Dashboard: `/admin/dashboard`
- Bookings: `/admin/bookings`
- Customers + wallet adjustments: `/admin/customers`

### Create an admin (local)

Set `ADMIN_EMAIL` in `.env` to the email address you want to promote. On next login, that user will be upgraded to role `admin`.

## Environment variables

Copy `.env.example` to `.env` and fill in values:

- `DATABASE_URL` (SQLite for local dev)
- `NEXTAUTH_SECRET` or `AUTH_SECRET`
- `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_EMAIL` (optional, promotes the matching account to admin on login)
- `RESEND_API_KEY` and `FROM_EMAIL` (email OTP)
- `OTP_SALT` (optional, defaults to `logic-gates-otp`)

## Wallet testing

1. Create a booking and note the booking ID.
2. As admin, go to `/admin/customers/[id]` and credit the wallet.
3. As the customer, open `/app/checkout/[bookingId]` and choose “Pay with wallet”.

## Admin testing

1. Login with the admin email and visit `/admin/bookings`.
2. Open a booking detail, update status, assign a driver, and set an override amount.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. In Vercel, click "New Project" and import the repo.
3. Keep the default Next.js settings and deploy.

Vercel will detect `npm run build` and `npm run start` automatically.
