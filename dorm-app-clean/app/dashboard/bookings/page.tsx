import { createClient } from '@/lib/supabaseServer'
import { bookRoom, cancelBooking } from '../actions'

export default async function BookingSystem() {
    const supabase = await createClient()

    // 1. ดึงข้อมูลผู้เช่าทั้งหมด
    const { data: tenants } = await supabase.from('tenants').select('*').order('id', { ascending: false })

    // 2. ดึงข้อมูลห้องพักที่ "available" พร้อมกับดึงชื่อสาขา (Join กับตาราง dorm_branches)
    const { data: availableRooms } = await supabase
        .from('rooms')
        .select(`
            id, 
            room_number, 
            status, 
            dorm_branches ( id, name )
        `)
        .eq('status', 'available')
        .order('room_number', { ascending: true })

    // จัดกลุ่มห้องพักตามสาขา เพื่อนำไปใส่ใน <optgroup> ของ Dropdown
    const groupedRooms = availableRooms?.reduce((acc: any, room: any) => {
        const branchName = room.dorm_branches?.name || 'ไม่มีสาขา'
        if (!acc[branchName]) acc[branchName] = []
        acc[branchName].push(room)
        return acc
    }, {})

    // 3. ดึงข้อมูลการจองปัจจุบันมาดู
    const { data: currentBookings } = await supabase
        .from('room_tenants')
        .select(`
            id,
            create_at,
            rooms ( id, room_number, dorm_branches (name) ),
            tenants ( id, name, phone )
        `)
        .order('id', { ascending: false })

    return (
        <main style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>ระบบจองห้องพัก (Room Booking)</h1>
            <hr />

            <section style={{ marginBottom: '40px', padding: '15px', border: '2px solid green' }}>
                <h2>+ สร้างการจองใหม่</h2>
                <form action={bookRoom} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>

                    {/* ส่วนที่ 1: จัดการผู้เช่า */}
                    <div style={{ padding: '10px', border: '1px solid gray' }}>
                        <h3>1. เลือกหรือสร้างผู้เช่า (Tenant)</h3>

                        {/* Option A: ผู้เช่าเดิม */}
                        <label>
                            <input type="radio" name="tenant_mode" value="existing" defaultChecked />
                            เลือกผู้เช่าที่มีอยู่แล้ว:
                        </label>
                        <select name="existing_tenant_id" style={{ display: 'block', margin: '5px 0 15px 25px' }}>
                            <option value="">-- เลือกผู้เช่า --</option>
                            {tenants?.map((t: any) => (
                                <option key={t.id} value={t.id}>{t.name} (โทร: {t.phone})</option>
                            ))}
                        </select>

                        {/* Option B: สร้างผู้เช่าใหม่ */}
                        <label>
                            <input type="radio" name="tenant_mode" value="new" />
                            สร้างผู้เช่าใหม่:
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: '25px', marginTop: '5px' }}>
                            <input name="new_tenant_name" placeholder="ชื่อ-นามสกุล" />
                            <input name="new_tenant_phone" placeholder="เบอร์โทรศัพท์" />
                            <input name="new_tenant_move_in" type="datetime-local" placeholder="วันที่ย้ายเข้า" />
                        </div>
                    </div>

                    {/* ส่วนที่ 2: เลือกห้องและสาขา */}
                    <div style={{ padding: '10px', border: '1px solid gray' }}>
                        <h3>2. เลือกสาขาและห้องพัก</h3>
                        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'gray' }}>*แสดงเฉพาะห้องที่สถานะเป็น "ว่าง"</p>
                        <select name="room_id" required style={{ width: '100%', padding: '5px' }}>
                            <option value="">-- เลือกห้องพัก --</option>
                            {groupedRooms && Object.entries(groupedRooms).map(([branchName, rooms]: [string, any]) => (
                                <optgroup key={branchName} label={`สาขา: ${branchName}`}>
                                    {rooms.map((room: any) => (
                                        <option key={room.id} value={room.id}>
                                            ห้อง {room.room_number}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', fontWeight: 'bold' }}>
                        ยืนยันการจอง
                    </button>
                </form>
            </section>

            {/* ส่วนที่ 3: ประวัติการจอง */}
            <section>
                <h2>รายการจองห้องพักปัจจุบัน (Room Tenants)</h2>
                <ul>
                    {currentBookings?.map((booking: any) => (
                        <li key={booking.id} style={{ marginBottom: '10px', padding: '10px', border: '1px dashed gray' }}>
                            <strong>ผู้เช่า:</strong> {booking.tenants?.name} ({booking.tenants?.phone}) <br />
                            <strong>สาขา:</strong> {booking.rooms?.dorm_branches?.name} | <strong>ห้อง:</strong> {booking.rooms?.room_number} <br />

                            <form action={cancelBooking} style={{ marginTop: '10px' }}>
                                <input type="hidden" name="room_tenant_id" value={booking.id} />
                                <input type="hidden" name="room_id" value={booking.rooms?.id} />
                                <button type="submit" style={{ color: 'red' }}>ยกเลิกการจอง (เปลี่ยนสถานะห้องเป็นว่าง)</button>
                            </form>
                        </li>
                    ))}
                </ul>
                {(!currentBookings || currentBookings.length === 0) && <p>ยังไม่มีข้อมูลการจอง</p>}
            </section>
        </main>
    )
}