import { createClient } from '@/lib/supabase/server'
import { deleteRoom } from './actions'
import Link from 'next/link'

export default async function RoomsPage() {
    const supabase = await createClient()

    // Join ตารางเพื่อเอาชื่อหอพักมาโชว์ด้วย
    const { data: rooms } = await supabase
        .from('rooms')
        .select('*, dorm_branches(name), type_rooms(name, month_price)')

    return (
        <div>
            <h1>จัดการห้องพัก</h1>
            <Link href="/rooms/create"><button>+ เพิ่มห้องพัก</button></Link>
            <br /><br />
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>เลขห้อง</th>
                        <th>ชั้น</th>
                        <th>ราคา/เดือน</th>
                        <th>หอพัก</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms?.map((room: any) => (
                        <tr key={room.id}>
                            <td>{room.room_number}</td>
                            <td>{room['ชั้นที่']}</td>
                            <td>{room.type_rooms?.month_price}</td>
                            <td>{room.dorm_branches?.name}</td>
                            <td>{room.status}</td>
                            <td>
                                <form action={deleteRoom.bind(null, room.id)}>
                                    <button type="submit">ลบ</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}