import { createClient } from '@/lib/supabaseServer'
import * as actions from './actions'
import '../style/dashboard.css'

export default async function Dashboard() {
    const supabase = await createClient()

    const [
        { data: roles }, { data: typeRooms }, { data: tenants }, { data: paymentStatus }, { data: paymentMethod },
        { data: employees }, { data: info }, { data: notifications }, { data: users }, { data: salaries },
        { data: sessions }, { data: dormBranches }, { data: floors }, { data: zones }, { data: rooms },
        { data: roomTenants }, { data: bills }, { data: repairs }
    ] = await Promise.all([
        supabase.from('roles').select('*').order('id', { ascending: false }),
        supabase.from('type_rooms').select('*').order('id', { ascending: false }),
        supabase.from('tenants').select('*').order('id', { ascending: false }),
        supabase.from('payment_status').select('*').order('id', { ascending: false }),
        supabase.from('payment_method').select('*').order('id', { ascending: false }),
        supabase.from('employees').select('*').order('id', { ascending: false }),
        supabase.from('info').select('*').order('id', { ascending: false }),
        supabase.from('notifications').select('*').order('id', { ascending: false }),
        supabase.from('users').select('*').order('create_at', { ascending: false }),
        supabase.from('salaries').select('*').order('id', { ascending: false }),
        supabase.from('sessions').select('*').order('id', { ascending: false }),
        supabase.from('dorm_branches').select('*').order('id', { ascending: false }),
        supabase.from('floors').select('*').order('id', { ascending: false }),
        supabase.from('zones').select('*').order('id', { ascending: false }),
        supabase.from('rooms').select('*').order('id', { ascending: false }),
        supabase.from('room_tenants').select('*').order('id', { ascending: false }),
        supabase.from('bills').select('*').order('id', { ascending: false }),
        supabase.from('repairs').select('*').order('id', { ascending: false })
    ])

    return (
        <main className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Super Admin Dashboard</h1>
                <p className="dashboard-subtitle">ศูนย์กลางจัดการฐานข้อมูลระบบหอพัก (Database Manager) - รวมทั้งหมด 18 ตาราง</p>
            </header>

            {/* ================= MASTER TABLES ================= */}
            <div className="dashboard-section-group">
                <h2 className="dashboard-section-title dashboard-title-master">Master Tables (ข้อมูลหลัก)</h2>

                <div className="dashboard-grid">
                    {/* Roles */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">
                            Roles <span className="dashboard-card-count">{roles?.length || 0}</span>
                        </div>
                        <div className="dashboard-card-body">
                            <form action={actions.addRole} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="code" className="dashboard-input" placeholder="Code" required />
                                    <input name="name" className="dashboard-input" placeholder="Name" required />
                                </div>
                                <button className="dashboard-btn-add">Add Role</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {roles?.map((r: any) => (
                                        <li key={r.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{r.id}]</span> {r.code} - {r.name}</span>
                                            <form action={actions.deleteRole}><input type="hidden" name="id" value={r.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Type Rooms */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Type Rooms <span className="dashboard-card-count">{typeRooms?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addTypeRoom} className="dashboard-form">
                                <input name="name" className="dashboard-input" placeholder="Name" required />
                                <div className="dashboard-form-row-2">
                                    <input name="month_price" type="number" step="0.01" className="dashboard-input" placeholder="Month Price" required />
                                    <input name="daily_price" type="number" step="0.01" className="dashboard-input" placeholder="Daily Price" required />
                                </div>
                                <input name="detail" className="dashboard-input" placeholder='JSON e.g. {"bed":"single"}' required />
                                <button className="dashboard-btn-add">Add Type</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {typeRooms?.map((tr: any) => (
                                        <li key={tr.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{tr.id}]</span> {tr.name} ({tr.month_price}/m)</span>
                                            <form action={actions.deleteTypeRoom}><input type="hidden" name="id" value={tr.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tenants */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Tenants <span className="dashboard-card-count">{tenants?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addTenant} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="name" className="dashboard-input" placeholder="Name" required />
                                    <input name="phone" className="dashboard-input" placeholder="Phone" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="move_in_date" type="datetime-local" className="dashboard-input" required />
                                    <input name="status" className="dashboard-input" placeholder="Status" required />
                                </div>
                                <button className="dashboard-btn-add">Add Tenant</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {tenants?.map((t: any) => (
                                        <li key={t.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{t.id}]</span> {t.name}</span>
                                            <form action={actions.deleteTenant}><input type="hidden" name="id" value={t.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Payment Status <span className="dashboard-card-count">{paymentStatus?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addPaymentStatus} className="dashboard-form">
                                <input name="status_name" className="dashboard-input" placeholder="Status Name" required />
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {paymentStatus?.map((ps: any) => (
                                        <li key={ps.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{ps.id}]</span> {ps.status_name}</span>
                                            <form action={actions.deletePaymentStatus}><input type="hidden" name="id" value={ps.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Payment Method <span className="dashboard-card-count">{paymentMethod?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addPaymentMethod} className="dashboard-form">
                                <input name="method_name" className="dashboard-input" placeholder="Method Name" required />
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {paymentMethod?.map((pm: any) => (
                                        <li key={pm.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{pm.id}]</span> {pm.method_name}</span>
                                            <form action={actions.deletePaymentMethod}><input type="hidden" name="id" value={pm.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Employees */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Employees <span className="dashboard-card-count">{employees?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addEmployee} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="name" className="dashboard-input" placeholder="Name" required />
                                    <input name="phone" className="dashboard-input" placeholder="Phone" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="type" className="dashboard-input" placeholder="Type" required />
                                    <input name="status" className="dashboard-input" placeholder="Status" required />
                                </div>
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {employees?.map((emp: any) => (
                                        <li key={emp.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{emp.id}]</span> {emp.name} ({emp.type})</span>
                                            <form action={actions.deleteEmployee}><input type="hidden" name="id" value={emp.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Info <span className="dashboard-card-count">{info?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addInfo} className="dashboard-form">
                                <input name="info" className="dashboard-input" placeholder='JSON e.g. {"rule":"no pets"}' required />
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {info?.map((i: any) => (
                                        <li key={i.id} className="dashboard-list-item">
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                                <span className="dashboard-item-id">[{i.id}]</span> {JSON.stringify(i.info)}
                                            </span>
                                            <form action={actions.deleteInfo}><input type="hidden" name="id" value={i.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Notifications <span className="dashboard-card-count">{notifications?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addNotification} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="type" className="dashboard-input" placeholder="Type" required />
                                    <input name="room_id" type="number" className="dashboard-input" placeholder="Room ID" />
                                </div>
                                <input name="message" className="dashboard-input" placeholder="Message" required />
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {notifications?.map((n: any) => (
                                        <li key={n.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{n.id}]</span> {n.type}</span>
                                            <form action={actions.deleteNotification}><input type="hidden" name="id" value={n.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Floors & Zones (Combined display for layout efficiency) */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Floors & Zones</div>
                        <div className="dashboard-card-body" style={{ flexDirection: 'row', gap: '1rem' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <form action={actions.addFloor} className="dashboard-form" style={{ padding: '0.5rem' }}>
                                    <input name="name" className="dashboard-input" placeholder="Floor Name" required />
                                    <button className="dashboard-btn-add">Add</button>
                                </form>
                                <div className="dashboard-list-container">
                                    <ul className="dashboard-list">
                                        {floors?.map((f: any) => (
                                            <li key={f.id} className="dashboard-list-item" style={{ padding: '0.5rem' }}>
                                                <span><span className="dashboard-item-id">[{f.id}]</span> {f.name}</span>
                                                <form action={actions.deleteFloor}><input type="hidden" name="id" value={f.id} /><button className="dashboard-btn-del">Del</button></form>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <form action={actions.addZone} className="dashboard-form" style={{ padding: '0.5rem' }}>
                                    <input name="name" className="dashboard-input" placeholder="Zone Name" required />
                                    <button className="dashboard-btn-add">Add</button>
                                </form>
                                <div className="dashboard-list-container">
                                    <ul className="dashboard-list">
                                        {zones?.map((z: any) => (
                                            <li key={z.id} className="dashboard-list-item" style={{ padding: '0.5rem' }}>
                                                <span><span className="dashboard-item-id">[{z.id}]</span> {z.name}</span>
                                                <form action={actions.deleteZone}><input type="hidden" name="id" value={z.id} /><button className="dashboard-btn-del">Del</button></form>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= DEPENDENT TABLES ================= */}
            <div className="dashboard-section-group">
                <h2 className="dashboard-section-title dashboard-title-dependent">Dependent Tables (ข้อมูลที่เชื่อมโยง)</h2>

                <div className="dashboard-grid">
                    {/* Users */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Users <span className="dashboard-card-count">{users?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addUser} className="dashboard-form">
                                <input name="id" className="dashboard-input" placeholder="UUID" required />
                                <div className="dashboard-form-row-2">
                                    <input name="email" type="email" className="dashboard-input" placeholder="Email" required />
                                    <input name="name" className="dashboard-input" placeholder="Name" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="status" className="dashboard-input" placeholder="Status" required />
                                    <input name="role_id" type="number" className="dashboard-input" placeholder="Role ID" required />
                                </div>
                                <button className="dashboard-btn-add">Add User</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {users?.map((u: any) => (
                                        <li key={u.id} className="dashboard-list-item">
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><span className="dashboard-item-id">[{u.id}]</span> {u.email}</span>
                                            <form action={actions.deleteUser}><input type="hidden" name="id" value={u.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Rooms */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Rooms <span className="dashboard-card-count">{rooms?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addRoom} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="room_number" className="dashboard-input" placeholder="Room No" required />
                                    <input name="status" className="dashboard-input" placeholder="Status" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="floor_id" type="number" className="dashboard-input" placeholder="Floor ID" required />
                                    <input name="zone_id" type="number" className="dashboard-input" placeholder="Zone ID" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="type_room_id" type="number" className="dashboard-input" placeholder="Type ID" required />
                                    <input name="dorm_branch_id" type="number" className="dashboard-input" placeholder="Branch ID" required />
                                </div>
                                <button className="dashboard-btn-add">Add Room</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {rooms?.map((r: any) => (
                                        <li key={r.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{r.id}]</span> Room: {r.room_number}</span>
                                            <form action={actions.deleteRoom}><input type="hidden" name="id" value={r.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Room Tenants */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Room Tenants <span className="dashboard-card-count">{roomTenants?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addRoomTenant} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="room_id" type="number" className="dashboard-input" placeholder="Room ID" required />
                                    <input name="tenant_id" type="number" className="dashboard-input" placeholder="Tenant ID" required />
                                </div>
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {roomTenants?.map((rt: any) => (
                                        <li key={rt.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{rt.id}]</span> R: {rt.room_id} | T: {rt.tenant_id}</span>
                                            <form action={actions.deleteRoomTenant}><input type="hidden" name="id" value={rt.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bills */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Bills <span className="dashboard-card-count">{bills?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addBill} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="room_id" type="number" className="dashboard-input" placeholder="Room ID" required />
                                    <input name="tenant_id" type="number" className="dashboard-input" placeholder="Tenant ID" required />
                                </div>
                                <div className="dashboard-form-row-2">
                                    <input name="total_amount" type="number" step="0.01" className="dashboard-input" placeholder="Total" required />
                                    <input name="due_date" type="datetime-local" className="dashboard-input" required />
                                </div>
                                <input name="payment_status_id" type="number" className="dashboard-input" placeholder="Pay Status ID" required />
                                <button className="dashboard-btn-add">Add Bill</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {bills?.map((b: any) => (
                                        <li key={b.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{b.id}]</span> Room {b.room_id} - ฿{b.total_amount}</span>
                                            <form action={actions.deleteBill}><input type="hidden" name="id" value={b.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Repairs */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Repairs <span className="dashboard-card-count">{repairs?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addRepair} className="dashboard-form">
                                <div className="dashboard-form-row-2">
                                    <input name="room_id" type="number" className="dashboard-input" placeholder="Room ID" required />
                                    <input name="status" className="dashboard-input" placeholder="Status" required />
                                </div>
                                <input name="reason" className="dashboard-input" placeholder='JSON e.g. {"issue":"water leak"}' required />
                                <button className="dashboard-btn-add">Add Repair</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {repairs?.map((rp: any) => (
                                        <li key={rp.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{rp.id}]</span> Room {rp.room_id} ({rp.status})</span>
                                            <form action={actions.deleteRepair}><input type="hidden" name="id" value={rp.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Salaries */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Salaries <span className="dashboard-card-count">{salaries?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addSalary} className="dashboard-form">
                                <input name="emp_id" type="number" className="dashboard-input" placeholder="Emp ID" required />
                                <div className="dashboard-form-row-2">
                                    <input name="base_salary" type="number" step="0.01" className="dashboard-input" placeholder="Base" required />
                                    <input name="extra_pay" type="number" step="0.01" className="dashboard-input" placeholder="Extra" required />
                                </div>
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {salaries?.map((s: any) => (
                                        <li key={s.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{s.id}]</span> Emp {s.emp_id}</span>
                                            <form action={actions.deleteSalary}><input type="hidden" name="id" value={s.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Dorm Branches */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Dorm Branches <span className="dashboard-card-count">{dormBranches?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addDormBranch} className="dashboard-form">
                                <input name="name" className="dashboard-input" placeholder="Name" required />
                                <input name="user_id" className="dashboard-input" placeholder="Owner UUID" required />
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {dormBranches?.map((db: any) => (
                                        <li key={db.id} className="dashboard-list-item">
                                            <span><span className="dashboard-item-id">[{db.id}]</span> {db.name}</span>
                                            <form action={actions.deleteDormBranch}><input type="hidden" name="id" value={db.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sessions */}
                    <div className="dashboard-card">
                        <div className="dashboard-card-header">Sessions <span className="dashboard-card-count">{sessions?.length || 0}</span></div>
                        <div className="dashboard-card-body">
                            <form action={actions.addSession} className="dashboard-form">
                                <input name="user_id" className="dashboard-input" placeholder="User UUID" required />
                                <div className="dashboard-form-row-2">
                                    <input name="device_id" className="dashboard-input" placeholder="Device" required />
                                    <input name="browser" className="dashboard-input" placeholder="Browser" required />
                                </div>
                                <button className="dashboard-btn-add">Add</button>
                            </form>
                            <div className="dashboard-list-container">
                                <ul className="dashboard-list">
                                    {sessions?.map((s: any) => (
                                        <li key={s.id} className="dashboard-list-item">
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                <span className="dashboard-item-id">[{s.id}]</span> {s.user_id}
                                            </span>
                                            <form action={actions.deleteSession}><input type="hidden" name="id" value={s.id} /><button className="dashboard-btn-del">Del</button></form>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}