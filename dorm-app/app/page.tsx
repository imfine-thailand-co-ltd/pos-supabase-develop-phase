

export default function Home() {
  return (
    <>
      <nav style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
        <ul>
          <li><a href="/dorm-branches">จัดการหอพัก</a></li>
          <li><a href="/rooms">จัดการห้องพัก</a></li>
          <li><a href="/tenants/create">แจ้งย้ายเข้า/จอง</a></li>
          <li><a href="/tenants">รายชื่อผู้เช่า</a></li>
        </ul>
      </nav>
    </>
  );
}
