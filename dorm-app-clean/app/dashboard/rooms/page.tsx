import { createClient } from '@/lib/supabaseServer'
import { addRoom, updateRoom, deleteRoom } from '../actions'
import '../../style/rooms.css'

export default async function ManageRooms() {
    const supabase = await createClient()

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

    // รูปภาพจำลองสำหรับให้หน้าเว็บดูสวยงาม (ดึงจาก Unsplash แบบ Random ตาม ID)
    const getMockImage = (id: number) => `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80&sig=${id}`;

    return (
        <main className="room-container">
            <header className="room-header">
                <h1 className="room-title">ระบบจัดการห้องพัก</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>จัดการข้อมูลห้องพัก ตรวจสอบสถานะ และอัปเดตรายละเอียดทั้งหมด</p>
            </header>

            {/* ================= ส่วนที่ 1: ฟอร์มเพิ่มห้องพักใหม่ (CREATE) ================= */}
            <section className="room-create-section">
                <h2 className="room-section-title">+ เพิ่มห้องพักใหม่</h2>
                <form action={addRoom} className="room-create-form">

                    <div className="room-form-group">
                        <label className="room-label">เลขห้อง</label>
                        <input name="room_number" className="room-input" placeholder="เช่น 101, A205" required />
                    </div>

                    <div className="room-form-group">
                        <label className="room-label">สถานะ</label>
                        <input name="status" className="room-input" placeholder="เช่น ว่าง, ไม่ว่าง" required />
                    </div>

                    <div className="room-form-group">
                        <label className="room-label">ชั้น (Floor)</label>
                        <select name="floor_id" className="room-input" required>
                            <option value="">-- เลือกชั้น --</option>
                            {floors?.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>

                    <div className="room-form-group">
                        <label className="room-label">โซน (Zone)</label>
                        <select name="zone_id" className="room-input" required>
                            <option value="">-- เลือกโซน --</option>
                            {zones?.map((z: any) => <option key={z.id} value={z.id}>{z.name}</option>)}
                        </select>
                    </div>

                    <div className="room-form-group">
                        <label className="room-label">ประเภทห้อง (Type)</label>
                        <select name="type_room_id" className="room-input" required>
                            <option value="">-- เลือกประเภท --</option>
                            {typeRooms?.map((tr: any) => <option key={tr.id} value={tr.id}>{tr.name} ({tr.month_price}/เดือน)</option>)}
                        </select>
                    </div>

                    <div className="room-form-group">
                        <label className="room-label">สาขาหอพัก (Branch)</label>
                        <select name="dorm_branch_id" className="room-input" required>
                            <option value="">-- เลือกสาขา --</option>
                            {dormBranches?.map((db: any) => <option key={db.id} value={db.id}>{db.name}</option>)}
                        </select>
                    </div>

                    <div className="room-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="room-label">หมายเหตุ (Note)</label>
                        <input name="note" className="room-input" placeholder="รายละเอียดเพิ่มเติม..." />
                    </div>

                    <div className="room-form-group" style={{ gridColumn: '1 / -1' }}>
                        <button type="submit" className="room-btn room-btn-primary">
                            + บันทึกข้อมูลห้องใหม่
                        </button>
                    </div>
                </form>
            </section>

            {/* ================= ส่วนที่ 2: รายการห้องพักทั้งหมด ================= */}
            <section className="room-list-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className="room-section-title" style={{ margin: 0 }}>รายการห้องพักทั้งหมด</h2>
                    <span style={{ backgroundColor: 'var(--muted)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem' }}>
                        รวม {rooms?.length || 0} ห้อง
                    </span>
                </div>

                <div className="room-grid">
                    {rooms?.map((room: any) => (
                        <div key={room.id} className="room-card">

                            {/* ภาพพรีวิว */}
                            <div className="room-preview">
                                {/* เช็คสถานะคร่าวๆ เพื่อเปลี่ยนสี Badge (ปรับแต่งต่อได้) */}
                                <span className="room-status-badge" style={{
                                    backgroundColor: room.status === 'available' ? 'var(--success)' : (room.status === 'occupied' ? 'var(--destructive)' : 'var(--warning)'),
                                    color: 'white'
                                }}>
                                    {room.status}
                                </span>
                                <img src={getMockImage(room.id)} alt={`Room ${room.room_number}`} className="room-preview-img" />
                            </div>

                            <div className="room-card-content">
                                <div className="room-card-header">
                                    <span className="room-card-title">ห้อง {room.room_number}</span>
                                    <span className="room-card-id">ID: {room.id}</span>
                                </div>

                                {/* ฟอร์มสำหรับการแก้ไข */}
                                <form action={updateRoom} className="room-update-form">
                                    <input type="hidden" name="id" value={room.id} />

                                    <div className="room-form-group">
                                        <input name="room_number" className="room-input" defaultValue={room.room_number} placeholder="เลขห้อง" required />
                                    </div>
                                    <div className="room-form-group">
                                        <input name="status" className="room-input" defaultValue={room.status} placeholder="สถานะ" required />
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <select name="floor_id" className="room-input" defaultValue={room.floor_id} required>
                                            <option value="">- ชั้น -</option>
                                            {floors?.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                                        </select>
                                        <select name="zone_id" className="room-input" defaultValue={room.zone_id} required>
                                            <option value="">- โซน -</option>
                                            {zones?.map((z: any) => <option key={z.id} value={z.id}>{z.name}</option>)}
                                        </select>
                                    </div>

                                    <select name="type_room_id" className="room-input" defaultValue={room.type_room_id} required>
                                        <option value="">- ประเภทห้อง -</option>
                                        {typeRooms?.map((tr: any) => <option key={tr.id} value={tr.id}>{tr.name}</option>)}
                                    </select>

                                    <select name="dorm_branch_id" className="room-input" defaultValue={room.dorm_branch_id} required>
                                        <option value="">- สาขาหอพัก -</option>
                                        {dormBranches?.map((db: any) => <option key={db.id} value={db.id}>{db.name}</option>)}
                                    </select>

                                    <input name="note" className="room-input" defaultValue={room.note || ''} placeholder="หมายเหตุ" />

                                    <div className="room-actions">
                                        <button type="submit" className="room-btn room-btn-outline">อัปเดต</button>
                                        <button formAction={deleteRoom} className="room-btn room-btn-danger">ลบ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}