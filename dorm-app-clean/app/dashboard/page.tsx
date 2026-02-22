import { createClient } from '@/lib/supabaseServer'
import * as actions from './actions'

export default async function Dashboard() {
    const supabase = await createClient()

    // ใช้ Promise.all เพื่อดึงข้อมูลทั้ง 18 ตารางพร้อมกันแบบขนาน (Parallel Fetching)
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
        <main style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Super Admin Dashboard - All 18 Tables</h1>

            {/* ================= MASTER TABLES ================= */}
            <h2 style={{ color: 'blue' }}>--- Master Tables ---</h2>

            <section><h3>Roles</h3>
                <form action={actions.addRole}> <input name="code" placeholder="Code" required /> <input name="name" placeholder="Name" required /> <button>Add</button> </form>
                <ul>{roles?.map((r: any) => <li key={r.id}>[{r.id}] {r.code} - {r.name} <form action={actions.deleteRole} style={{ display: 'inline' }}><input type="hidden" name="id" value={r.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Type Rooms</h3>
                <form action={actions.addTypeRoom}> <input name="name" placeholder="Name" required /> <input name="month_price" type="number" step="0.01" placeholder="Month Price" required /> <input name="daily_price" type="number" step="0.01" placeholder="Daily Price" required /> <input name="detail" placeholder='JSON e.g. {"bed":"single"}' required /> <button>Add</button> </form>
                <ul>{typeRooms?.map((tr: any) => <li key={tr.id}>[{tr.id}] {tr.name} ({tr.month_price}/m) <form action={actions.deleteTypeRoom} style={{ display: 'inline' }}><input type="hidden" name="id" value={tr.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Tenants</h3>
                <form action={actions.addTenant}> <input name="name" placeholder="Name" required /> <input name="phone" placeholder="Phone" required /> <input name="move_in_date" type="datetime-local" required /> <input name="move_out_date" type="datetime-local" /> <input name="status" placeholder="Status" required /> <button>Add</button> </form>
                <ul>{tenants?.map((t: any) => <li key={t.id}>[{t.id}] {t.name} - {t.phone} <form action={actions.deleteTenant} style={{ display: 'inline' }}><input type="hidden" name="id" value={t.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Payment Status</h3>
                <form action={actions.addPaymentStatus}> <input name="status_name" placeholder="Status Name" required /> <button>Add</button> </form>
                <ul>{paymentStatus?.map((ps: any) => <li key={ps.id}>[{ps.id}] {ps.status_name} <form action={actions.deletePaymentStatus} style={{ display: 'inline' }}><input type="hidden" name="id" value={ps.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Payment Method</h3>
                <form action={actions.addPaymentMethod}> <input name="method_name" placeholder="Method Name" required /> <button>Add</button> </form>
                <ul>{paymentMethod?.map((pm: any) => <li key={pm.id}>[{pm.id}] {pm.method_name} <form action={actions.deletePaymentMethod} style={{ display: 'inline' }}><input type="hidden" name="id" value={pm.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Employees</h3>
                <form action={actions.addEmployee}> <input name="name" placeholder="Name" required /> <input name="phone" placeholder="Phone" required /> <input name="type" placeholder="Type" required /> <input name="status" placeholder="Status" required /> <button>Add</button> </form>
                <ul>{employees?.map((emp: any) => <li key={emp.id}>[{emp.id}] {emp.name} ({emp.type}) <form action={actions.deleteEmployee} style={{ display: 'inline' }}><input type="hidden" name="id" value={emp.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Info</h3>
                <form action={actions.addInfo}> <input name="info" placeholder='JSON e.g. {"rule":"no pets"}' required /> <button>Add</button> </form>
                <ul>{info?.map((i: any) => <li key={i.id}>[{i.id}] {JSON.stringify(i.info)} <form action={actions.deleteInfo} style={{ display: 'inline' }}><input type="hidden" name="id" value={i.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Notifications</h3>
                <form action={actions.addNotification}> <input name="type" placeholder="Type" required /> <input name="room_id" type="number" placeholder="Room ID (opt)" /> <input name="tenant_id" type="number" placeholder="Tenant ID (opt)" /> <input name="message" placeholder="Message" required /> <input name="image" placeholder="Image URL (opt)" /> <button>Add</button> </form>
                <ul>{notifications?.map((n: any) => <li key={n.id}>[{n.id}] {n.type} - {n.message} <form action={actions.deleteNotification} style={{ display: 'inline' }}><input type="hidden" name="id" value={n.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            {/* ================= DEPENDENT TABLES ================= */}
            <h2 style={{ color: 'red' }}>--- Dependent Tables ---</h2>

            <section><h3>Users</h3>
                <form action={actions.addUser}> <input name="id" placeholder="UUID" required /> <input name="email" placeholder="Email" required /> <input name="name" placeholder="Name" required /> <input name="status" placeholder="Status" required /> <input name="role_id" type="number" placeholder="Role ID" required /> <button>Add</button> </form>
                <ul>{users?.map((u: any) => <li key={u.id}>[{u.id}] {u.email} (Role: {u.role_id}) <form action={actions.deleteUser} style={{ display: 'inline' }}><input type="hidden" name="id" value={u.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Salaries</h3>
                <form action={actions.addSalary}> <input name="base_salary" type="number" step="0.01" placeholder="Base Salary" required /> <input name="extra_pay" type="number" step="0.01" placeholder="Extra Pay" required /> <input name="emp_id" type="number" placeholder="Emp ID" required /> <button>Add</button> </form>
                <ul>{salaries?.map((s: any) => <li key={s.id}>[{s.id}] Emp {s.emp_id} : {s.base_salary} + {s.extra_pay} <form action={actions.deleteSalary} style={{ display: 'inline' }}><input type="hidden" name="id" value={s.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Sessions</h3>
                <form action={actions.addSession}> <input name="user_id" placeholder="User UUID" required /> <input name="device_id" placeholder="Device ID" required /> <input name="browser" placeholder="Browser" required /> <button>Add</button> </form>
                <ul>{sessions?.map((s: any) => <li key={s.id}>[{s.id}] User: {s.user_id} <form action={actions.deleteSession} style={{ display: 'inline' }}><input type="hidden" name="id" value={s.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Dorm Branches</h3>
                <form action={actions.addDormBranch}> <input name="name" placeholder="Name" required /> <input name="address" placeholder="Address" required /> <input name="user_id" placeholder="User UUID" required /> <button>Add</button> </form>
                <ul>{dormBranches?.map((db: any) => <li key={db.id}>[{db.id}] {db.name} <form action={actions.deleteDormBranch} style={{ display: 'inline' }}><input type="hidden" name="id" value={db.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Floors & Zones</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <h4>Floors</h4>
                        <form action={actions.addFloor}> <input name="name" placeholder="Name" required /> <input name="detail" placeholder="Detail" required /> <button>Add</button> </form>
                        <ul>{floors?.map((f: any) => <li key={f.id}>[{f.id}] {f.name} <form action={actions.deleteFloor} style={{ display: 'inline' }}><input type="hidden" name="id" value={f.id} /><button>Del</button></form></li>)}</ul>
                    </div>
                    <div>
                        <h4>Zones</h4>
                        <form action={actions.addZone}> <input name="name" placeholder="Name" required /> <input name="detail" placeholder="Detail" required /> <button>Add</button> </form>
                        <ul>{zones?.map((z: any) => <li key={z.id}>[{z.id}] {z.name} <form action={actions.deleteZone} style={{ display: 'inline' }}><input type="hidden" name="id" value={z.id} /><button>Del</button></form></li>)}</ul>
                    </div>
                </div>
            </section><hr />

            <section><h3>Rooms</h3>
                <form action={actions.addRoom}> <input name="room_number" placeholder="Room No" required /> <input name="note" placeholder="Note" /> <input name="status" placeholder="Status" required /> <input name="floor_id" type="number" placeholder="Floor ID" required /> <input name="zone_id" type="number" placeholder="Zone ID" required /> <input name="type_room_id" type="number" placeholder="Type Room ID" required /> <input name="dorm_branch_id" type="number" placeholder="Dorm Branch ID" required /> <button>Add</button> </form>
                <ul>{rooms?.map((r: any) => <li key={r.id}>[{r.id}] Room: {r.room_number} <form action={actions.deleteRoom} style={{ display: 'inline' }}><input type="hidden" name="id" value={r.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Room Tenants</h3>
                <form action={actions.addRoomTenant}> <input name="room_id" type="number" placeholder="Room ID" required /> <input name="tenant_id" type="number" placeholder="Tenant ID" required /> <button>Add</button> </form>
                <ul>{roomTenants?.map((rt: any) => <li key={rt.id}>[{rt.id}] Room: {rt.room_id}, Tenant: {rt.tenant_id} <form action={actions.deleteRoomTenant} style={{ display: 'inline' }}><input type="hidden" name="id" value={rt.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Bills</h3>
                <form action={actions.addBill}> <input name="room_id" type="number" placeholder="Room ID" required /> <input name="tenant_id" type="number" placeholder="Tenant ID" required /> <input name="payment_status_id" type="number" placeholder="Pay Status ID" required /> <input name="payment_method_id" type="number" placeholder="Pay Method ID" required /> <input name="total_amount" type="number" step="0.01" placeholder="Total" required /> <input name="water_bill" type="number" step="0.01" placeholder="Water" required /> <input name="room_bill" type="number" step="0.01" placeholder="Room" required /> <input name="electricity_bill" type="number" step="0.01" placeholder="Elect" required /> <input name="other_bill" type="number" step="0.01" placeholder="Other" required /> <input name="remark" placeholder="Remark" /> <input name="due_date" type="datetime-local" required /> <button>Add</button> </form>
                <ul>{bills?.map((b: any) => <li key={b.id}>[{b.id}] Room {b.room_id} - Total: {b.total_amount} <form action={actions.deleteBill} style={{ display: 'inline' }}><input type="hidden" name="id" value={b.id} /><button>Del</button></form></li>)}</ul>
            </section><hr />

            <section><h3>Repairs</h3>
                <form action={actions.addRepair}> <input name="tenant_id" type="number" placeholder="Tenant ID" required /> <input name="room_id" type="number" placeholder="Room ID" required /> <input name="status" placeholder="Status" required /> <input name="note" placeholder="Note" /> <input name="reason" placeholder='JSON e.g. {"issue":"water leak"}' required /> <button>Add</button> </form>
                <ul>{repairs?.map((rp: any) => <li key={rp.id}>[{rp.id}] Room {rp.room_id} - Status: {rp.status} <form action={actions.deleteRepair} style={{ display: 'inline' }}><input type="hidden" name="id" value={rp.id} /><button>Del</button></form></li>)}</ul>
            </section>

        </main>
    )
}