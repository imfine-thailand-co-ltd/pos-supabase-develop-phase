'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBranch(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const name = formData.get('name') as string
    const address = formData.get('address') as string

    await supabase.from('dorm_branches').insert({
        name,
        address,
        user_id: user.id
    })

    revalidatePath('/dorm-branches')
    redirect('/dorm-branches')
}

export async function deleteBranch(id: number) {
    const supabase = await createClient()
    await supabase.from('dorm_branches').delete().eq('id', id)
    revalidatePath('/dorm-branches')
}