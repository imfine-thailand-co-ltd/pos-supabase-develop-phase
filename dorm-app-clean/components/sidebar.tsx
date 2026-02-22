'use client';

import { LayoutDashboard, Building2, Users, UserCog, Wrench, DollarSign, CalendarCheck, LogIn, LogOut, } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import './sidebar.css'

const menuItems = [
    {
        title: 'แดชบอร์ด',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'จัดการห้องพัก',
        href: '/dashboard/rooms',
        icon: Building2,
    },
    {
        title: 'จัดการพนักงาน',
        href: '/dashboard/employees',
        icon: Users,
    },
    {
        title: 'จัดการแม่บ้าน',
        href: '/dashboard/housekeepers',
        icon: UserCog,
    },
    {
        title: 'จัดการช่าง',
        href: '/dashboard/technicians',
        icon: Wrench,
    },
    {
        title: 'ระบบบัญชี',
        href: '/dashboard/accounting',
        icon: DollarSign,
    },
    {
        title: 'จองห้อง',
        href: '/dashboard/bookings',
        icon: CalendarCheck,
    },
    {
        title: 'เช็คอิน',
        href: '/dashboard/checkin',
        icon: LogIn,
    },
    {
        title: 'เช็คเอาท์',
        href: '/dashboard/checkout',
        icon: LogOut,
    },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <aside className="sidebar">
                <div>
                    <div className="sidebar-header">
                        {!collapsed && (
                            <>
                                <h1 className="sidebar-title">
                                    Dorm
                                </h1>
                            </>
                        )}
                        <button onClick={() => setCollapsed(!collapsed)}></button>
                    </div>
                    <nav>
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <ul className="nav-list" key={index}>
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        {!collapsed && <span>{item.title}</span>}
                                    </Link>
                                </ul>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}
