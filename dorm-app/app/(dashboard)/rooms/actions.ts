'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createRoom(formData: FormData) {
    const supabase = await createClient()

    const room_number = formData.get('room_number') as string
    const floor = formData.get('floor') as string // ชั้นที่
    const zone = formData.get('zone') as string // โซน
    const dorm_branch_id = Number(formData.get('dorm_branch_id'))
    const type_room_id = Number(formData.get('type_room_id'))
    const status = 'ว่าง' // Default status

    await supabase.from('rooms').insert({
        room_number,
        'ชั้นที่': floor,
        'โซน': zone,
        dorm_branch_id,
        type_room_id,
        status
    })

    revalidatePath('/rooms')
    redirect('/rooms')
}

export async function deleteRoom(id: number) {
    const supabase = await createClient()
    await supabase.from('rooms').delete().eq('id', id)
    revalidatePath('/rooms')
}