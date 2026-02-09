alter table "User"
  add column if not exists "emailVerifiedAt" timestamptz;

create table if not exists "EmailOtp" (
  "id" text primary key,
  "email" text unique not null,
  "otpHash" text not null,
  "expiresAt" timestamptz not null,
  "attempts" integer not null default 0,
  "createdAt" timestamptz not null default now(),
  "usedAt" timestamptz
);

create table if not exists "EmailOtpSend" (
  "id" text primary key,
  "email" text not null,
  "ip" text not null,
  "createdAt" timestamptz not null default now()
);

create index if not exists "EmailOtpSend_email_createdAt_idx" on "EmailOtpSend" ("email", "createdAt");
create index if not exists "EmailOtpSend_ip_createdAt_idx" on "EmailOtpSend" ("ip", "createdAt");
