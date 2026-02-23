import { createClient } from '@/lib/supabaseServer'
import {
    addEmployee, updateEmployee, deleteEmployee,
    addSalary, updateSalary, deleteSalary
} from '../actions'
import '../../style/employees.css'

export default async function ManageEmployees() {
    const supabase = await createClient()

    // 1. ดึงข้อมูลพนักงานทั้งหมด
    const { data: employees } = await supabase
        .from('employees')
        .select('*')
        .order('id', { ascending: false })

    // 2. ดึงข้อมูลเงินเดือน
    const { data: salaries } = await supabase
        .from('salaries')
        .select(`
            *,
            employees ( name, type )
        `)
        .order('id', { ascending: false })

    return (
        <main className="employees-container">
            <header className="employees-header">
                <h1 className="employees-title">ระบบจัดการพนักงานและเงินเดือน</h1>
                <p className="employees-subtitle">จัดการข้อมูลส่วนตัวพนักงาน ตำแหน่ง และประวัติการจ่ายเงินเดือน</p>
            </header>

            {/* ================= SECTION 1: EMPLOYEES ================= */}
            <section className="employees-section">
                <h2 className="employees-section-title">
                    <span style={{ color: 'var(--primary)' }}>👥</span> 1. จัดการข้อมูลพนักงาน (Employees)
                </h2>

                {/* ฟอร์มเพิ่มพนักงาน */}
                <div className="employees-form-card">
                    <h3 className="employees-form-header">+ เพิ่มพนักงานใหม่</h3>
                    <form action={addEmployee} className="employees-grid-form">
                        <div className="employees-input-group">
                            <label className="employees-label">ชื่อ-นามสกุล</label>
                            <input name="name" className="employees-input" placeholder="ระบุชื่อพนักงาน" required />
                        </div>
                        <div className="employees-input-group">
                            <label className="employees-label">เบอร์โทรศัพท์</label>
                            <input name="phone" className="employees-input" placeholder="08x-xxx-xxxx" required />
                        </div>
                        <div className="employees-input-group">
                            <label className="employees-label">ประเภท / ตำแหน่ง</label>
                            <input name="type" className="employees-input" placeholder="เช่น รปภ, แม่บ้าน" required />
                        </div>
                        <div className="employees-input-group">
                            <label className="employees-label">สถานะ</label>
                            <select name="status" className="employees-input" required>
                                <option value="ทำงาน">ทำงาน</option>
                                <option value="ลาออก">ลาออก</option>
                                <option value="พักงาน">พักงาน</option>
                            </select>
                        </div>
                        <button type="submit" className="employees-btn employees-btn-primary" style={{ height: '42px' }}>
                            บันทึกข้อมูล
                        </button>
                    </form>
                </div>

                {/* รายการพนักงาน */}
                <div>
                    <h3 className="employees-form-header" style={{ marginBottom: '1rem' }}>
                        รายชื่อพนักงานทั้งหมด ({employees?.length || 0} คน)
                    </h3>
                    <div className="employees-list">
                        {employees?.map((emp: any) => (
                            <div key={emp.id} className="employees-item">
                                <div className="employees-item-header">
                                    <strong>{emp.name}</strong>
                                    <span className="employees-badge">ID: EMP-{emp.id.toString().padStart(4, '0')}</span>
                                </div>

                                <form action={updateEmployee} className="employees-update-form">
                                    <input type="hidden" name="id" value={emp.id} />

                                    <input name="name" className="employees-input" defaultValue={emp.name} placeholder="ชื่อ" required />
                                    <input name="phone" className="employees-input" defaultValue={emp.phone} placeholder="เบอร์โทร" required />
                                    <input name="type" className="employees-input" defaultValue={emp.type} placeholder="ตำแหน่ง" required />
                                    <select name="status" className="employees-input" defaultValue={emp.status} required>
                                        <option value="ทำงาน">ทำงาน</option>
                                        <option value="ลาออก">ลาออก</option>
                                        <option value="พักงาน">พักงาน</option>
                                    </select>

                                    <div className="employees-actions">
                                        <button type="submit" className="employees-btn employees-btn-outline">อัปเดต</button>
                                        <button formAction={deleteEmployee} className="employees-btn employees-btn-danger">ลบ</button>
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= SECTION 2: SALARIES ================= */}
            <section className="employees-section">
                <h2 className="employees-section-title">
                    <span style={{ color: 'var(--success)' }}>💰</span> 2. จัดการเงินเดือน (Salaries)
                </h2>

                {/* ฟอร์มเพิ่มเงินเดือน */}
                <div className="employees-form-card">
                    <h3 className="employees-form-header">+ เพิ่มข้อมูลเงินเดือน</h3>
                    <form action={addSalary} className="employees-grid-form">
                        <div className="employees-input-group">
                            <label className="employees-label">พนักงาน</label>
                            <select name="emp_id" className="employees-input" required>
                                <option value="">-- เลือกพนักงาน --</option>
                                {employees?.map((emp: any) => (
                                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.type})</option>
                                ))}
                            </select>
                        </div>
                        <div className="employees-input-group">
                            <label className="employees-label">เงินเดือนพื้นฐาน (฿)</label>
                            <input name="base_salary" type="number" step="0.01" className="employees-input" placeholder="0.00" required />
                        </div>
                        <div className="employees-input-group">
                            <label className="employees-label">ค่าล่วงเวลา / พิเศษ (฿)</label>
                            <input name="extra_pay" type="number" step="0.01" className="employees-input" placeholder="0.00" required />
                        </div>
                        <button type="submit" className="employees-btn employees-btn-primary" style={{ height: '42px' }}>
                            บันทึกเงินเดือน
                        </button>
                    </form>
                </div>

                {/* รายการเงินเดือน */}
                <div>
                    <h3 className="employees-form-header" style={{ marginBottom: '1rem' }}>
                        ประวัติเงินเดือน ({salaries?.length || 0} รายการ)
                    </h3>
                    <div className="employees-list">
                        {salaries?.map((salary: any) => (
                            <div key={salary.id} className="employees-item">
                                <div className="employees-item-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <strong>{salary.employees?.name}</strong>
                                        <span className="employees-badge" style={{ backgroundColor: 'transparent', border: '1px solid var(--border)' }}>
                                            {salary.employees?.type}
                                        </span>
                                    </div>
                                    <span className="employees-badge">SLR-{salary.id.toString().padStart(4, '0')}</span>
                                </div>

                                <form action={updateSalary} className="employees-update-form">
                                    <input type="hidden" name="id" value={salary.id} />

                                    <div className="employees-input-group">
                                        <label className="employees-label">เปลี่ยนพนักงาน</label>
                                        <select name="emp_id" className="employees-input" defaultValue={salary.emp_id} required>
                                            {employees?.map((emp: any) => (
                                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="employees-input-group">
                                        <label className="employees-label">เงินเดือนพื้นฐาน (Base)</label>
                                        <input name="base_salary" type="number" step="0.01" className="employees-input" defaultValue={salary.base_salary} required />
                                    </div>

                                    <div className="employees-input-group">
                                        <label className="employees-label">ค่าพิเศษ (Extra)</label>
                                        <input name="extra_pay" type="number" step="0.01" className="employees-input" defaultValue={salary.extra_pay} required />
                                    </div>

                                    <div className="employees-input-group" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <label className="employees-label">ยอดสุทธิ</label>
                                        <div className="employees-total-salary">
                                            ฿{(Number(salary.base_salary) + Number(salary.extra_pay)).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="employees-actions" style={{ alignSelf: 'flex-end' }}>
                                        <button type="submit" className="employees-btn employees-btn-outline">อัปเดต</button>
                                        <button formAction={deleteSalary} className="employees-btn employees-btn-danger">ลบ</button>
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}