'use client';

import {
    LayoutDashboard, Building2, Users, UserCog,
    Wrench, DollarSign, CalendarCheck, LogIn, LogOut,
    PanelLeftClose, PanelLeftOpen // เพิ่ม Icon สำหรับปุ่มเปิด/ปิด
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import './sidebar.css'
import ThemeToggle from './ThemeToggle';

const menuItems = [
    { title: 'แดชบอร์ด', href: '/dashboard', icon: LayoutDashboard },
    { title: 'จัดการห้องพัก', href: '/dashboard/rooms', icon: Building2 },
    { title: 'จองห้อง', href: '/dashboard/bookings', icon: CalendarCheck },
    { title: 'จัดการพนักงาน', href: '/dashboard/employees', icon: Users },
    { title: 'จัดการแม่บ้าน', href: '/dashboard/housekeepers', icon: UserCog },
    { title: 'จัดการช่าง', href: '/dashboard/technicians', icon: Wrench },
    { title: 'ระบบบัญชี', href: '/dashboard/accounting', icon: DollarSign },
    { title: 'เช็คอิน', href: '/dashboard/checkin', icon: LogIn },
    { title: 'เช็คเอาท์', href: '/dashboard/checkout', icon: LogOut },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside className={`sidebar-container ${collapsed ? 'sidebar-collapsed' : ''}`}>

            {/* ส่วนหัว: โลโก้ และ ปุ่มย่อขยาย */}
            <div className="sidebar-header">
                {!collapsed && (
                    <h2 className="sidebar-title">Dorm System</h2>
                )}
                <button
                    className="sidebar-toggle-btn"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle Sidebar"
                >
                    {collapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
                </button>
            </div>

            {/* ส่วนรายการเมนู */}
            <nav className="sidebar-nav-container">
                <ul className="sidebar-nav-list">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li className="sidebar-nav-item" key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`sidebar-nav-link ${isActive ? 'sidebar-active' : ''}`}
                                    title={collapsed ? item.title : ''} // เพื่อให้ชี้แล้วขึ้นชื่อเมนูตอนพับ
                                >
                                    <Icon size={20} className="shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="sidebar-nav-text">{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ส่วนล่างสุด: สลับธีม หรือ โปรไฟล์ */}
            <div className="sidebar-footer">
                {/* ถ้าอยากให้ ThemeToggle หดตาม Sidebar ได้ อาจจะต้องไปปรับแต่งตัว Component ThemeToggle นิดหน่อย */}
                {/* แต่ผมวางโครงให้มันอยู่ตรงกลางสวยๆ ไว้ให้แล้วครับ */}
                <ThemeToggle />
            </div>

        </aside>
    );
}