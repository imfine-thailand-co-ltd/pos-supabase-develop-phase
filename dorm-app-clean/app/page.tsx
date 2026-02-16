import { supabase } from "@/lib/supabaseClient";

export default async function Home() {

  return (
    <main style={{ padding: '2rem' }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
        <a href="/reset-password">Reset Password</a>
      </nav>
      <h1>Project Initialized 🚀</h1>
      <p>Next.js + TypeScript + Supabase</p>
    </main>
  );
}