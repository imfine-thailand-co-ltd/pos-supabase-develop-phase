'use client'

import { useState } from 'react'
import { resetPassword } from '../actions'
import Link from 'next/link'

export default function ResetPassword() {
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [loading, setLoading] = useState(false)

    const handleReset = async (formData: FormData) => {
        setLoading(true)
        setMessage(null)

        const result = await resetPassword(formData)

        if (result?.error) {
            setMessage({ type: 'error', text: result.error })
        } else if (result?.success) {
            setMessage({ type: 'success', text: result.success as string })
        }

        setLoading(false)
    }

    return (
        <div style={{ maxWidth: '320px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ marginBottom: '20px' }}>Reset Password</h1>

            {message && (
                <div style={{
                    padding: '10px',
                    marginBottom: '15px',
                    backgroundColor: message.type === 'error' ? '#ffe6e6' : '#e6ffe6',
                    color: message.type === 'error' ? 'red' : 'green',
                    fontSize: '14px'
                }}>
                    {message.text}
                </div>
            )}

            <form action={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Enter your email address</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="example@mail.com"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none' }}
                >
                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '14px' }}>
                <Link href="/login">← Back to Login</Link>
            </div>
        </div>
    )
}