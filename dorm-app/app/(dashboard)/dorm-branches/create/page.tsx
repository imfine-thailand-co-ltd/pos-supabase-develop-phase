import { createBranch } from '../actions'

export default function CreateBranchPage() {
    return (
        <div>
            <h1>เพิ่มหอพักใหม่</h1>
            <form action={createBranch}>
                <label>ชื่อหอพัก:</label><br />
                <input name="name" required /><br /><br />

                <label>ที่อยู่:</label><br />
                <textarea name="address" required /><br /><br />

                <button type="submit">บันทึก</button>
            </form>
        </div>
    )
}