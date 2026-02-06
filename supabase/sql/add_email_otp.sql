alter table "User"
  add column if not exists "emailVerifiedAt" timestamptz;

create table if not exists "EmailOtp" (
  "id" text primary key,
  "email" text unique not null,
  "otpHash" text not null,
  "expiresAt" timestamptz not null,
  "attempts" integer not null default 0,
  "createdAt" timestamptz not null default now()
);
