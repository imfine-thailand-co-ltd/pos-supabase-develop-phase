'use client'

import { useState } from 'react'
import { login } from '../actions'
import Link from 'next/link'

export default function Login() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (formData: FormData) => {
        setLoading(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: '320px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ marginBottom: '20px' }}>Login</h1>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
                    {error}
                </div>
            )}

            <form action={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <Link href="/signup">Create Account</Link>
                <Link href="/reset-password">Forgot Password?</Link>
            </div>
        </div>
    )
}