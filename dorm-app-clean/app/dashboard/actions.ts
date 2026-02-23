'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabaseServer'

// --- Helper Function ---
async function deleteRecord(table: string, id: number | string) {
    const supabase = await createClient()
    await supabase.from(table).delete().eq('id', id)
    revalidatePath('/dashboard')
}

// ==========================================
// 1. MASTER TABLES ACTIONS
// ==========================================

export async function addRole(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('roles').insert({ code: formData.get('code'), name: formData.get('name') })
    revalidatePath('/dashboard')
}
export async function deleteRole(formData: FormData) { await deleteRecord('roles', Number(formData.get('id'))) }

export async function addTypeRoom(formData: FormData) {
    const supabase = await createClient()
    const detail = formData.get('detail') as string
    await supabase.from('type_rooms').insert({
        name: formData.get('name'), month_price: Number(formData.get('month_price')), daily_price: Number(formData.get('daily_price')),
        detail: detail ? JSON.parse(detail) : {}
    })
    revalidatePath('/dashboard')
}
export async function deleteTypeRoom(formData: FormData) { await deleteRecord('type_rooms', Number(formData.get('id'))) }

export async function addTenant(formData: FormData) {
    const supabase = await createClient()
    const moveOut = formData.get('move_out_date')
    await supabase.from('tenants').insert({
        name: formData.get('name'), phone: formData.get('phone'), status: formData.get('status'),
        move_in_date: formData.get('move_in_date'), move_out_date: moveOut ? moveOut : null
    })
    revalidatePath('/dashboard')
}
export async function deleteTenant(formData: FormData) { await deleteRecord('tenants', Number(formData.get('id'))) }

export async function addPaymentStatus(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('payment_status').insert({ status_name: formData.get('status_name') })
    revalidatePath('/dashboard')
}
export async function deletePaymentStatus(formData: FormData) { await deleteRecord('payment_status', Number(formData.get('id'))) }

export async function addPaymentMethod(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('payment_method').insert({ method_name: formData.get('method_name') })
    revalidatePath('/dashboard')
}
export async function deletePaymentMethod(formData: FormData) { await deleteRecord('payment_method', Number(formData.get('id'))) }

export async function addEmployee(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('employees').insert({
        name: formData.get('name'), phone: formData.get('phone'), type: formData.get('type'), status: formData.get('status')
    })
    revalidatePath('/dashboard')
}
export async function deleteEmployee(formData: FormData) { await deleteRecord('employees', Number(formData.get('id'))) }

export async function addInfo(formData: FormData) {
    const supabase = await createClient()
    const info = formData.get('info') as string
    await supabase.from('info').insert({ info: info ? JSON.parse(info) : {} })
    revalidatePath('/dashboard')
}
export async function deleteInfo(formData: FormData) { await deleteRecord('info', Number(formData.get('id'))) }

export async function addNotification(formData: FormData) {
    const supabase = await createClient()
    const roomId = formData.get('room_id'); const tenantId = formData.get('tenant_id');
    await supabase.from('notifications').insert({
        type: formData.get('type'), message: formData.get('message'), image: formData.get('image') || null,
        room_id: roomId ? Number(roomId) : null, tenant_id: tenantId ? Number(tenantId) : null
    })
    revalidatePath('/dashboard')
}
export async function deleteNotification(formData: FormData) { await deleteRecord('notifications', Number(formData.get('id'))) }

// ==========================================
// 2. DEPENDENT TABLES ACTIONS
// ==========================================

export async function addUser(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('users').insert({
        id: formData.get('id'), email: formData.get('email'), name: formData.get('name'),
        status: formData.get('status'), role_id: Number(formData.get('role_id'))
    })
    revalidatePath('/dashboard')
}
export async function deleteUser(formData: FormData) { await deleteRecord('users', formData.get('id') as string) }

export async function addSalary(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('salaries').insert({
        base_salary: Number(formData.get('base_salary')), extra_pay: Number(formData.get('extra_pay')), emp_id: Number(formData.get('emp_id'))
    })
    revalidatePath('/dashboard')
}
export async function deleteSalary(formData: FormData) { await deleteRecord('salaries', Number(formData.get('id'))) }

export async function addSession(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('sessions').insert({
        user_id: formData.get('user_id'), device_id: formData.get('device_id'), browser: formData.get('browser')
    })
    revalidatePath('/dashboard')
}
export async function deleteSession(formData: FormData) { await deleteRecord('sessions', Number(formData.get('id'))) }

export async function addDormBranch(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('dorm_branches').insert({
        name: formData.get('name'), address: formData.get('address'), user_id: formData.get('user_id')
    })
    revalidatePath('/dashboard')
}
export async function deleteDormBranch(formData: FormData) { await deleteRecord('dorm_branches', Number(formData.get('id'))) }

export async function addFloor(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('floors').insert({ name: formData.get('name'), detail: formData.get('detail') })
    revalidatePath('/dashboard')
}
export async function deleteFloor(formData: FormData) { await deleteRecord('floors', Number(formData.get('id'))) }

export async function addZone(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('zones').insert({ name: formData.get('name'), detail: formData.get('detail') })
    revalidatePath('/dashboard')
}
export async function deleteZone(formData: FormData) { await deleteRecord('zones', Number(formData.get('id'))) }

export async function addRoom(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('rooms').insert({
        room_number: formData.get('room_number'), note: formData.get('note'), status: formData.get('status'),
        floor_id: Number(formData.get('floor_id')), zone_id: Number(formData.get('zone_id')),
        type_room_id: Number(formData.get('type_room_id')), dorm_branch_id: Number(formData.get('dorm_branch_id'))
    })
    revalidatePath('/dashboard')
}
export async function deleteRoom(formData: FormData) { await deleteRecord('rooms', Number(formData.get('id'))) }

export async function addRoomTenant(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('room_tenants').insert({ room_id: Number(formData.get('room_id')), tenant_id: Number(formData.get('tenant_id')) })
    revalidatePath('/dashboard')
}
export async function deleteRoomTenant(formData: FormData) { await deleteRecord('room_tenants', Number(formData.get('id'))) }

export async function addBill(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('bills').insert({
        room_id: Number(formData.get('room_id')), tenant_id: Number(formData.get('tenant_id')),
        payment_status_id: Number(formData.get('payment_status_id')), payment_method_id: Number(formData.get('payment_method_id')),
        total_amount: Number(formData.get('total_amount')), water_bill: Number(formData.get('water_bill')),
        room_bill: Number(formData.get('room_bill')), electricity_bill: Number(formData.get('electricity_bill')),
        other_bill: Number(formData.get('other_bill')), remark: formData.get('remark'), due_date: formData.get('due_date')
    })
    revalidatePath('/dashboard')
}
export async function deleteBill(formData: FormData) { await deleteRecord('bills', Number(formData.get('id'))) }

export async function addRepair(formData: FormData) {
    const supabase = await createClient()
    const reason = formData.get('reason') as string
    await supabase.from('repairs').insert({
        tenant_id: Number(formData.get('tenant_id')), room_id: Number(formData.get('room_id')),
        status: formData.get('status'), note: formData.get('note'), reason: reason ? JSON.parse(reason) : {}
    })
    revalidatePath('/dashboard')
}
export async function deleteRepair(formData: FormData) { await deleteRecord('repairs', Number(formData.get('id'))) }















// ==========================================
// 1. ROOMs (Update)
// ==========================================

export async function updateRoom(formData: FormData) {
    const supabase = await createClient()
    const roomId = Number(formData.get('id'))
    
    await supabase.from('rooms').update({
        room_number: formData.get('room_number'),
        note: formData.get('note'),
        status: formData.get('status'),
        floor_id: Number(formData.get('floor_id')),
        zone_id: Number(formData.get('zone_id')),
        type_room_id: Number(formData.get('type_room_id')),
        dorm_branch_id: Number(formData.get('dorm_branch_id'))
    }).eq('id', roomId)
    
    revalidatePath('/manage-rooms')
}



// ==========================================
// 2. BOOKINGS
// ==========================================

export async function bookRoom(formData: FormData) {
    const supabase = await createClient()

    const tenantMode = formData.get('tenant_mode') // 'existing' หรือ 'new'
    let finalTenantId = formData.get('existing_tenant_id')

    // 1. จัดการข้อมูลผู้เช่า (Tenant)
    if (tenantMode === 'new') {
        const { data: newTenant, error: tenantError } = await supabase.from('tenants').insert({
            name: formData.get('new_tenant_name'),
            phone: formData.get('new_tenant_phone'),
            move_in_date: formData.get('new_tenant_move_in'),
            status: 'active'
        }).select('id').single()

        if (tenantError) throw new Error('Failed to create tenant: ' + tenantError.message)
        finalTenantId = newTenant.id
    }

    // 2. สร้างการจอง (Room Tenants)
    const roomId = Number(formData.get('room_id'))
    const { error: bookingError } = await supabase.from('room_tenants').insert({
        room_id: roomId,
        tenant_id: Number(finalTenantId)
    })
    
    if (bookingError) throw new Error('Failed to book room: ' + bookingError.message)

    // 3. อัปเดตสถานะห้องให้เป็น "occupied"
    const { error: roomError } = await supabase.from('rooms').update({
        status: 'occupied'
    }).eq('id', roomId)

    if (roomError) throw new Error('Failed to update room status: ' + roomError.message)

    revalidatePath('/booking')
}

export async function cancelBooking(formData: FormData) {
    const supabase = await createClient()
    const roomTenantId = Number(formData.get('room_tenant_id'))
    const roomId = Number(formData.get('room_id'))

    // ลบประวัติการจองออก
    await supabase.from('room_tenants').delete().eq('id', roomTenantId)

    // คืนค่าสถานะห้องกลับเป็น "ว่าง"
    await supabase.from('rooms').update({ status: 'ว่าง' }).eq('id', roomId)

    revalidatePath('/booking')
}




// ==========================================
// 3. EMPLOYEES and SALARIES ACTIONS 
// ==========================================

export async function updateEmployee(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('employees').update({
        name: formData.get('name'),
        phone: formData.get('phone'),
        type: formData.get('type'),
        status: formData.get('status')
    }).eq('id', Number(formData.get('id')))
    revalidatePath('/manage-employees')
}

export async function updateSalary(formData: FormData) {
    const supabase = await createClient()
    await supabase.from('salaries').update({
        emp_id: Number(formData.get('emp_id')),
        base_salary: Number(formData.get('base_salary')),
        extra_pay: Number(formData.get('extra_pay'))
    }).eq('id', Number(formData.get('id')))
    revalidatePath('/manage-employees')
}