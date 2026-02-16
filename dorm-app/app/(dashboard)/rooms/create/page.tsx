import { createClient } from '@/lib/supabase/server'
import { createRoom } from '../actions'

export default async function CreateRoomPage() {
    const supabase = await createClient()
    // ต้องดึงข้อมูล Branch และ Type มาทำ Dropdown
    const { data: branches } = await supabase.from('dorm_branches').select('id, name')
    const { data: types } = await supabase.from('type_rooms').select('id, name, month_price')

    return (
        <div>
            <h1>เพิ่มห้องพัก</h1>
            <form action={createRoom}>
                <label>เลขห้อง:</label><br />
                <input name="room_number" required /><br />

                <label>ชั้นที่:</label><br />
                <input name="floor" required /><br />

                <label>โซน:</label><br />
                <input name="zone" required /><br />

                <label>เลือกหอพัก:</label><br />
                <select name="dorm_branch_id" required>
                    {branches?.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select><br />

                <label>เลือกประเภทห้อง:</label><br />
                <select name="type_room_id" required>
                    {types?.map(t => <option key={t.id} value={t.id}>{t.name} ({t.month_price})</option>)}
                </select><br /><br />

                <button type="submit">บันทึกห้องพัก</button>
            </form>
        </div>
    )
}