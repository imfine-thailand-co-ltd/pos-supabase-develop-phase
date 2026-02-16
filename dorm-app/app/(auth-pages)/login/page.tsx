import { login, signup } from '../actions'

export default function LoginPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Login / Sign Up</h1>

      {/* ใช้ form เดียวแต่มี 2 ปุ่ม */}
      <form>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        {/* ปุ่ม Login: เรียกฟังก์ชัน login */}
        <button formAction={login} >
          Log in
        </button>

        {/* ปุ่ม Sign up: เรียกฟังก์ชัน signup */}
        <button formAction={signup} >
          Sign up
        </button>

      </form>
    </div>
  )
}