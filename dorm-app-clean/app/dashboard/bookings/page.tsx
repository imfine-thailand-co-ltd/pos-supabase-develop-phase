import { createClient } from '@/lib/supabaseServer'
import { bookRoom, cancelBooking } from '../actions'
import '../../style/bookings.css'

export default async function BookingSystem() {
    const supabase = await createClient()

    // 1. ดึงข้อมูลผู้เช่าทั้งหมด
    const { data: tenants } = await supabase.from('tenants').select('*').order('id', { ascending: false })

    // 2. ดึงข้อมูลห้องพักที่ "available"
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

    // จัดกลุ่มห้องพักตามสาขา
    const groupedRooms = availableRooms?.reduce((acc: any, room: any) => {
        const branchName = room.dorm_branches?.name || 'ไม่มีสาขา'
        if (!acc[branchName]) acc[branchName] = []
        acc[branchName].push(room)
        return acc
    }, {})

    // 3. ดึงข้อมูลการจองปัจจุบัน
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
        <main className="booking-container">
            <header className="booking-header">
                <h1 className="booking-title">ระบบจองห้องพัก</h1>
                <p className="booking-subtitle">จัดการการทำสัญญาเช่าและกำหนดห้องพักให้ลูกบ้าน</p>
            </header>

            <div className="booking-layout">
                {/* ================= ส่วนซ้าย: ฟอร์มสร้างการจอง ================= */}
                <section>
                    <div className="booking-card">
                        <h2 className="booking-card-title">📝 สร้างการจองใหม่</h2>

                        <form action={bookRoom}>
                            {/* ส่วนที่ 1: จัดการผู้เช่า */}
                            <div className="booking-section-box">
                                <h3 className="booking-section-title">1. ข้อมูลผู้เช่า (Tenant)</h3>

                                <div className="booking-radio-group">
                                    {/* Option A */}
                                    <div>
                                        <label className="booking-radio-label">
                                            <input type="radio" name="tenant_mode" value="existing" defaultChecked />
                                            เลือกลูกบ้านที่มีในระบบ
                                        </label>
                                        <div className="booking-input-group">
                                            <select name="existing_tenant_id" className="booking-select">
                                                <option value="">-- เลือกผู้เช่า --</option>
                                                {tenants?.map((t: any) => (
                                                    <option key={t.id} value={t.id}>{t.name} (โทร: {t.phone})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Option B */}
                                    <div>
                                        <label className="booking-radio-label">
                                            <input type="radio" name="tenant_mode" value="new" />
                                            เพิ่มลูกบ้านใหม่
                                        </label>
                                        <div className="booking-input-group">
                                            <input name="new_tenant_name" className="booking-input" placeholder="ชื่อ-นามสกุล" />
                                            <input name="new_tenant_phone" className="booking-input" placeholder="เบอร์โทรศัพท์" />
                                            <input name="new_tenant_move_in" type="datetime-local" className="booking-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ส่วนที่ 2: เลือกห้อง */}
                            <div className="booking-section-box">
                                <h3 className="booking-section-title">2. เลือกห้องพัก</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--success)', marginBottom: '1rem' }}>
                                    *แสดงเฉพาะห้องที่พร้อมเข้าอยู่
                                </p>
                                <select name="room_id" className="booking-select" required>
                                    <option value="">-- เลือกสาขาและห้องพัก --</option>
                                    {groupedRooms && Object.entries(groupedRooms).map(([branchName, rooms]: [string, any]) => (
                                        <optgroup key={branchName} label={`📍 สาขา: ${branchName}`}>
                                            {rooms.map((room: any) => (
                                                <option key={room.id} value={room.id}>
                                                    ห้อง {room.room_number}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="booking-btn booking-btn-primary">
                                ยืนยันการเข้าพัก
                            </button>
                        </form>
                    </div>
                </section>

                {/* ================= ส่วนขวา: ประวัติการจอง ================= */}
                <section>
                    <div className="booking-card" style={{ backgroundColor: 'var(--secondary)', borderColor: 'transparent' }}>
                        <h2 className="booking-card-title" style={{ marginBottom: '1rem' }}>
                            🔑 รายชื่อผู้เข้าพักปัจจุบัน
                        </h2>

                        {(!currentBookings || currentBookings.length === 0) ? (
                            <div className="booking-empty">
                                <p>ยังไม่มีข้อมูลการเข้าพัก</p>
                            </div>
                        ) : (
                            <ul className="booking-list">
                                {currentBookings.map((booking: any) => (
                                    <li key={booking.id} className="booking-list-item">
                                        <div className="booking-info-row">
                                            <span className="booking-tenant-name">{booking.tenants?.name}</span>
                                            <span className="booking-tenant-phone">📞 {booking.tenants?.phone}</span>
                                        </div>

                                        <div className="booking-room-badge">
                                            📍 {booking.rooms?.dorm_branches?.name} | ห้อง {booking.rooms?.room_number}
                                        </div>

                                        <form action={cancelBooking}>
                                            <input type="hidden" name="room_tenant_id" value={booking.id} />
                                            <input type="hidden" name="room_id" value={booking.rooms?.id} />
                                            <button type="submit" className="booking-btn booking-btn-danger">
                                                ยกเลิกสัญญา (คืนห้องว่าง)
                                            </button>
                                        </form>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}