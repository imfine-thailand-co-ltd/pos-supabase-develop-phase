import { createClient } from '@/lib/supabase/server'
import { checkInTenant } from '../actions'

export default async function CheckInPage() {
    const supabase = await createClient()
    // ดึงเฉพาะห้องที่ "ว่าง" มาแสดง
    const { data: rooms } = await supabase.from('rooms').select('*').eq('status', 'ว่าง')

    return (
        <div>
            <h1>แจ้งย้ายเข้า / จองห้อง</h1>
            <form action={checkInTenant}>
                <h3>ข้อมูลผู้เช่า</h3>
                <label>ชื่อ-นามสกุล:</label><br />
                <input name="name" required /><br />
                <label>เบอร์โทร:</label><br />
                <input name="phone" required /><br />
                <label>วันที่ย้ายเข้า:</label><br />
                <input type="date" name="move_in_date" required /><br />

                <h3>เลือกห้องพัก</h3>
                <select name="room_id" required>
                    <option value="">-- กรุณาเลือกห้องว่าง --</option>
                    {rooms?.map(room => (
                        <option key={room.id} value={room.id}>
                            ห้อง {room.room_number} (ชั้น {room['ชั้นที่']})
                        </option>
                    ))}
                </select><br /><br />

                <button type="submit">ยืนยันการจอง</button>
            </form>
        </div>
    )
}