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


## ASCII file
```
my-dorm-app/
├── .env.local                  # เก็บ API Keys (ห้ามเอาขึ้น Git)
├── middleware.ts               # สำคัญ! ตัวเช็ค Session (ป้องกันคนไม่ได้ Login เข้าใช้งาน)
├── app/
│   ├── auth/                   # Route Handler สำหรับ Auth (เช่น callback)
│   │   └── callback/
│   │       └── route.ts        # รับ Code Exchange จาก Supabase
│   ├── (auth-pages)/           # หน้า Login/Register (วงเล็บคือ Group Route ไม่กระทบ URL)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx          # Layout เฉพาะหน้า Login (เช่น ไม่มี Sidebar)
│   ├── (dashboard)/            # หน้าหลักระบบจัดการ (Protected Routes)
│   │   ├── layout.tsx          # ใส่ Sidebar / Navbar ตรงนี้
│   │   ├── page.tsx            # Dashboard รวม
│   │   ├── rooms/              # จัดการห้องพัก
│   │   │   ├── page.tsx        # รายชื่อห้อง
│   │   │   └── [id]/           # รายละเอียดห้อง
│   │   ├── tenants/            # จัดการผู้เช่า
│   │   │   └── page.tsx
│   │   └── bills/              # จัดการบิล
│   │       └── page.tsx
│   ├── globals.css
│   └── layout.tsx              # Root Layout
├── components/                 # UI Components ที่ใช้ซ้ำ
│   ├── ui/                     # ปุ่ม, input (shadcn/ui สไตล์)
│   └── layout/                 # Sidebar, Header
├── lib/                        # Utility Functions
│   └── supabase/               # Config Supabase Client
│       ├── client.ts           # สำหรับ Client Components (use client)
│       ├── server.ts           # สำหรับ Server Components / Actions
│       └── middleware.ts       # Logic สำหรับ Middleware
├── types/                      # TypeScript Types
│   └── database.types.ts       # Type ที่ generate จาก Supabase (สำคัญมาก)
└── package.json
```