import { createClient } from '@/lib/supabaseServer'
import { addRoom, updateRoom, deleteRoom } from '../actions'

export default async function ManageRooms() {
    const supabase = await createClient()

    // ดึงข้อมูลตารางห้องพัก และตารางที่เป็น Foreign Key ทั้งหมดมาพร้อมกัน
    const [
        { data: rooms },
        { data: floors },
        { data: zones },
        { data: typeRooms },
        { data: dormBranches }
    ] = await Promise.all([
        supabase.from('rooms').select('*').order('id', { ascending: false }),
        supabase.from('floors').select('*').order('id', { ascending: true }),
        supabase.from('zones').select('*').order('id', { ascending: true }),
        supabase.from('type_rooms').select('*').order('id', { ascending: true }),
        supabase.from('dorm_branches').select('*').order('id', { ascending: true })
    ])

    return (
        <main style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>ระบบจัดการห้องพัก (Manage Rooms)</h1>
            <hr />

            {/* ================= ส่วนที่ 1: ฟอร์มเพิ่มห้องพักใหม่ (CREATE) ================= */}
            <section style={{ marginBottom: '40px', padding: '10px', border: '1px solid black' }}>
                <h2>+ เพิ่มห้องพักใหม่</h2>
                <form action={addRoom} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                    
                    <input name="room_number" placeholder="เลขห้อง (Room Number)" required />
                    <input name="status" placeholder="สถานะ (เช่น ว่าง, ไม่ว่าง, ซ่อมแซม)" required />
                    <input name="note" placeholder="หมายเหตุ (Note)" />

                    {/* Dropdown สำหรับ Foreign Keys */}
                    <select name="floor_id" required>
                        <option value="">-- เลือกชั้น (Floor) --</option>
                        {floors?.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>

                    <select name="zone_id" required>
                        <option value="">-- เลือกโซน (Zone) --</option>
                        {zones?.map((z: any) => <option key={z.id} value={z.id}>{z.name}</option>)}
                    </select>

                    <select name="type_room_id" required>
                        <option value="">-- เลือกประเภทห้อง (Type Room) --</option>
                        {typeRooms?.map((tr: any) => <option key={tr.id} value={tr.id}>{tr.name} ({tr.month_price}/เดือน)</option>)}
                    </select>

                    <select name="dorm_branch_id" required>
                        <option value="">-- เลือกสาขาหอพัก (Dorm Branch) --</option>
                        {dormBranches?.map((db: any) => <option key={db.id} value={db.id}>{db.name}</option>)}
                    </select>

                    <button type="submit" style={{ padding: '5px', background: '#e0e0e0' }}>บันทึกข้อมูลห้องใหม่</button>
                </form>
            </section>

            {/* ================= ส่วนที่ 2: รายการห้องพักทั้งหมด (READ, UPDATE, DELETE) ================= */}
            <section>
                <h2>รายการห้องพักทั้งหมด</h2>
                <p>จำนวนทั้งหมด: {rooms?.length || 0} ห้อง</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {rooms?.map((room: any) => (
                        <div key={room.id} style={{ padding: '10px', border: '1px dashed gray' }}>
                            
                            {/* ฟอร์มสำหรับการแก้ไข (Update) ในแต่ละรายการ */}
                            <form action={updateRoom} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                <input type="hidden" name="id" value={room.id} />
                                
                                <strong>ID: {room.id}</strong>
                                
                                <input name="room_number" defaultValue={room.room_number} placeholder="เลขห้อง" required />
                                <input name="status" defaultValue={room.status} placeholder="สถานะ" required />
                                <input name="note" defaultValue={room.note || ''} placeholder="หมายเหตุ" />

                                <select name="floor_id" defaultValue={room.floor_id} required>
                                    {floors?.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                                </select>

                                <select name="zone_id" defaultValue={room.zone_id} required>
                                    {zones?.map((z: any) => <option key={z.id} value={z.id}>{z.name}</option>)}
                                </select>

                                <select name="type_room_id" defaultValue={room.type_room_id} required>
                                    {typeRooms?.map((tr: any) => <option key={tr.id} value={tr.id}>{tr.name}</option>)}
                                </select>

                                <select name="dorm_branch_id" defaultValue={room.dorm_branch_id} required>
                                    {dormBranches?.map((db: any) => <option key={db.id} value={db.id}>{db.name}</option>)}
                                </select>

                                <button type="submit">อัปเดต (Update)</button>
                            </form>

                            {/* ปุ่มสำหรับลบ (Delete) แยกฟอร์มออกมาเพื่อไม่ให้ตีกับฟอร์ม Update */}
                            <form action={deleteRoom} style={{ marginTop: '10px' }}>
                                <input type="hidden" name="id" value={room.id} />
                                <button type="submit" style={{ color: 'red' }}>ลบ (Delete)</button>
                            </form>
                            
                        </div>
                    ))}
                </div>
            </section>

        </main>
    )
}