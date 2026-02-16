'use client'

import { signup } from '../actions'
import { useState } from 'react'

export default function Signup() {
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        const result = await signup(formData)
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input name="name" type="text" placeholder="Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}