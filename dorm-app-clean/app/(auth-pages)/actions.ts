'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    // 1. สร้าง User ใน Auth System
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        return { error: authError.message }
    }

    // 2. บันทึกลงตาราง users (ถ้า Auth สำเร็จ)
    if (authData.user) {
        const { error: dbError } = await supabase
            .from('users')
            .insert([
                {
                    id: authData.user.id,
                    email: email,
                    name: name,
                    hash_password: password, // หมายเหตุ: การเก็บรหัสผ่านจริงใน DB ไม่แนะนำใน Production
                    status: 'active',
                    role_id: 1,
                },
            ])

        if (dbError) {
            // ถ้า insert db พลาด อาจจะต้องลบ user ใน auth ทิ้ง (Rollback) หรือ log error
            return { error: dbError.message }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=Check email to continue sign in process')
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const origin = (await import('next/headers')).headers().then(h => h.get('origin')) // หา Base URL

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for the password reset link' }
}