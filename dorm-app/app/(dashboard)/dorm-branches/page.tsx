import { createClient } from '@/lib/supabase/server'
import { deleteBranch } from './actions'
import Link from 'next/link'

export default async function DormBranchesPage() {
    const supabase = await createClient()
    const { data: branches } = await supabase.from('dorm_branches').select('*')

    return (
        <div>
            <h1>รายชื่อหอพัก</h1>
            <Link href="/dorm-branches/create"><button>+ เพิ่มหอพักใหม่</button></Link>
            <br /><br />
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อหอพัก</th>
                        <th>ที่อยู่</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {branches?.map((branch) => (
                        <tr key={branch.id}>
                            <td>{branch.id}</td>
                            <td>{branch.name}</td>
                            <td>{branch.address}</td>
                            <td>
                                <form action={deleteBranch.bind(null, branch.id)}>
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