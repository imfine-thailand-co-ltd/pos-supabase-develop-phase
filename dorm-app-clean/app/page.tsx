
export default async function Home() {

  return (
    <main style={{ padding: '2rem' }}>
      <p style={{ position: 'fixed', bottom: '10px', right: '10px', margin: '0' }}>DEMO VERSION 0.0.1</p>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
        <a href="/reset-password">Reset Password</a>
        <a href="/dashboard">Dashboard</a>
      </nav>
      <h1>Project Initialized 🚀</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sit nihil quis veritatis modi? Nam quaerat, totam error officia enim voluptatibus culpa provident recusandae magni cum ipsa itaque ad ea consectetur ratione cupiditate, maiores voluptatem commodi. Commodi nobis nihil voluptatibus quisquam accusamus et placeat, atque facere eius. Non, unde culpa.</p>
    </main>
  );
}