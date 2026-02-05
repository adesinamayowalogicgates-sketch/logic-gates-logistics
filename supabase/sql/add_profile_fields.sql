alter table "User"
  add column if not exists "firstName" text,
  add column if not exists "lastName" text,
  add column if not exists "gender" text,
  add column if not exists "dateOfBirth" text,
  add column if not exists "nationality" text,
  add column if not exists "nextOfKinName" text,
  add column if not exists "nextOfKinGender" text,
  add column if not exists "nextOfKinPhone" text;
