import { createClient } from '@/lib/supabaseServer'
import {
    addEmployee, updateEmployee, deleteEmployee,
    addSalary, updateSalary, deleteSalary
} from '../actions'

export default async function ManageEmployees() {
    const supabase = await createClient()

    // 1. ดึงข้อมูลพนักงานทั้งหมด
    const { data: employees } = await supabase
        .from('employees')
        .select('*')
        .order('id', { ascending: false })

    // 2. ดึงข้อมูลเงินเดือน (Join กับตาราง employees เพื่อเอาชื่อมาแสดง)
    const { data: salaries } = await supabase
        .from('salaries')
        .select(`
            *,
            employees ( name )
        `)
        .order('id', { ascending: false })

    return (
        <main style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>ระบบจัดการพนักงานและเงินเดือน</h1>
            <hr />

            {/* ================= SECTION 1: EMPLOYEES ================= */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'blue' }}>1. จัดการข้อมูลพนักงาน (Employees)</h2>

                {/* ฟอร์มเพิ่มพนักงาน */}
                <div style={{ padding: '10px', border: '1px solid blue', marginBottom: '20px', maxWidth: '600px' }}>
                    <h3>+ เพิ่มพนักงานใหม่</h3>
                    <form action={addEmployee} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input name="name" placeholder="ชื่อ-นามสกุล" required />
                        <input name="phone" placeholder="เบอร์โทรศัพท์" required />
                        <input name="type" placeholder="ประเภท (เช่น รปภ, แม่บ้าน, ธุรการ)" required />
                        <input name="status" placeholder="สถานะ (เช่น ทำงาน, ลาออก)" required />
                        <button type="submit" style={{ background: 'blue', color: 'white' }}>บันทึกพนักงาน</button>
                    </form>
                </div>

                {/* รายการพนักงาน */}
                <div>
                    <h3>รายชื่อพนักงานทั้งหมด ({employees?.length || 0} คน)</h3>
                    {employees?.map((emp: any) => (
                        <div key={emp.id} style={{ padding: '10px', border: '1px dashed gray', marginBottom: '10px' }}>
                            <form action={updateEmployee} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input type="hidden" name="id" value={emp.id} />
                                <strong>ID: {emp.id}</strong>
                                <input name="name" defaultValue={emp.name} placeholder="ชื่อ" required />
                                <input name="phone" defaultValue={emp.phone} placeholder="เบอร์โทร" required />
                                <input name="type" defaultValue={emp.type} placeholder="ประเภท" required />
                                <input name="status" defaultValue={emp.status} placeholder="สถานะ" required />
                                <button type="submit">อัปเดต</button>
                            </form>

                            <form action={deleteEmployee} style={{ marginTop: '5px' }}>
                                <input type="hidden" name="id" value={emp.id} />
                                <button type="submit" style={{ color: 'red' }}>ลบพนักงาน</button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

            <hr />

            {/* ================= SECTION 2: SALARIES ================= */}
            <section>
                <h2 style={{ color: 'green' }}>2. จัดการเงินเดือน (Salaries)</h2>

                {/* ฟอร์มเพิ่มเงินเดือน */}
                <div style={{ padding: '10px', border: '1px solid green', marginBottom: '20px', maxWidth: '600px' }}>
                    <h3>+ เพิ่มข้อมูลเงินเดือน</h3>
                    <form action={addSalary} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <select name="emp_id" required>
                            <option value="">-- เลือกพนักงาน --</option>
                            {employees?.map((emp: any) => (
                                <option key={emp.id} value={emp.id}>{emp.name} ({emp.type})</option>
                            ))}
                        </select>
                        <input name="base_salary" type="number" step="0.01" placeholder="เงินเดือนพื้นฐาน (Base Salary)" required />
                        <input name="extra_pay" type="number" step="0.01" placeholder="ค่าล่วงเวลา/พิเศษ (Extra Pay)" required />
                        <button type="submit" style={{ background: 'green', color: 'white' }}>บันทึกเงินเดือน</button>
                    </form>
                </div>

                {/* รายการเงินเดือน */}
                <div>
                    <h3>ประวัติเงินเดือนทั้งหมด ({salaries?.length || 0} รายการ)</h3>
                    {salaries?.map((salary: any) => (
                        <div key={salary.id} style={{ padding: '10px', border: '1px dashed gray', marginBottom: '10px' }}>
                            <form action={updateSalary} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input type="hidden" name="id" value={salary.id} />
                                <strong>ID: {salary.id}</strong>

                                <select name="emp_id" defaultValue={salary.emp_id} required>
                                    {employees?.map((emp: any) => (
                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                    ))}
                                </select>

                                <span>Base:</span>
                                <input name="base_salary" type="number" step="0.01" defaultValue={salary.base_salary} required />

                                <span>Extra:</span>
                                <input name="extra_pay" type="number" step="0.01" defaultValue={salary.extra_pay} required />

                                <strong>รวม: {(salary.base_salary + salary.extra_pay).toLocaleString()} บาท</strong>

                                <button type="submit">อัปเดต</button>
                            </form>

                            <form action={deleteSalary} style={{ marginTop: '5px' }}>
                                <input type="hidden" name="id" value={salary.id} />
                                <button type="submit" style={{ color: 'red' }}>ลบข้อมูลเงินเดือน</button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    )
}