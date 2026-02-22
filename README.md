This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# SQL Command
```sql
-- 1. Master Tables (ไม่มีการอ้างอิง Foreign Key ไปตารางอื่น)
CREATE TABLE "roles" ( 
  "id" SERIAL PRIMARY KEY,
  "code" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "type_rooms" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "month_price" DOUBLE PRECISION NOT NULL,
  "daily_price" DOUBLE PRECISION NOT NULL,
  "detail" JSONB NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "tenants" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "move_in_date" TIMESTAMPTZ NOT NULL,
  "move_out_date" TIMESTAMPTZ,
  "status" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "payment_status" (
  "id" SERIAL PRIMARY KEY,
  "status_name" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "payment_method" (
  "id" SERIAL PRIMARY KEY,
  "method_name" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "info" (
  "id" SERIAL PRIMARY KEY,
  "info" JSONB NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "room_id" INTEGER,
  "tenant_id" INTEGER,
  "message" TEXT NOT NULL,
  "image" TEXT,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Dependent Tables (ตารางที่มีการอ้างอิง Foreign Key)
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "role_id" INTEGER NOT NULL REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "salaries" (
  "id" SERIAL PRIMARY KEY,
  "base_salary" DOUBLE PRECISION NOT NULL,
  "extra_pay" DOUBLE PRECISION NOT NULL,
  "emp_id" INTEGER NOT NULL REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "device_id" TEXT NOT NULL,
  "browser" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "dorm_branches" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "floors" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "detail" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "zones" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "detail" TEXT NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "rooms" (
  "id" SERIAL PRIMARY KEY,
  "room_number" TEXT NOT NULL,
  "note" TEXT,
  "status" TEXT NOT NULL,
  "floor_id" INTEGER NOT NULL REFERENCES "floors"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "zone_id" INTEGER NOT NULL REFERENCES "zones"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "type_room_id" INTEGER NOT NULL REFERENCES "type_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "dorm_branch_id" INTEGER NOT NULL REFERENCES "dorm_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "room_tenants" (
  "id" SERIAL PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "tenant_id" INTEGER NOT NULL REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "bills" (
  "id" SERIAL PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "tenant_id" INTEGER NOT NULL REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "payment_status_id" INTEGER NOT NULL REFERENCES "payment_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "payment_method_id" INTEGER NOT NULL REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "total_amount" DOUBLE PRECISION NOT NULL,
  "water_bill" DOUBLE PRECISION NOT NULL,
  "room_bill" DOUBLE PRECISION NOT NULL,
  "electricity_bill" DOUBLE PRECISION NOT NULL,
  "other_bill" DOUBLE PRECISION NOT NULL,
  "remark" TEXT,
  "due_date" TIMESTAMPTZ NOT NULL,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "repairs" (
  "id" SERIAL PRIMARY KEY,
  "tenant_id" INTEGER NOT NULL REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "room_id" INTEGER NOT NULL REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "reason" JSONB NOT NULL,
  "status" TEXT NOT NULL,
  "note" TEXT,
  "create_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
