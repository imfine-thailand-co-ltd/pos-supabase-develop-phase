'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function checkInTenant(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const move_in_date = formData.get('move_in_date') as string
    const room_id = Number(formData.get('room_id'))

    // 1. สร้างผู้เช่า (Tenants)
    const { data: tenant, error } = await supabase.from('tenants').insert({
        name,
        phone,
        move_in_date: new Date(move_in_date).toISOString(),
        status: 'active'
    }).select().single()

    if (error || !tenant) return // Error handling แบบง่าย

    // 2. ผูกห้องกับผู้เช่า (Room Tenants)
    await supabase.from('room_tenants').insert({
        room_id,
        tenant_id: tenant.id
    })

    // 3. อัพเดทสถานะห้องเป็น "ไม่ว่าง"
    await supabase.from('rooms').update({ status: 'ไม่ว่าง' }).eq('id', room_id)

    revalidatePath('/tenants')
    redirect('/tenants')
}