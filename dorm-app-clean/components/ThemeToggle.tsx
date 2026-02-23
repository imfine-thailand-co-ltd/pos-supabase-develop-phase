'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    // ดึงค่า Theme ปัจจุบันมาเซ็ตตอนโหลด Client
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // 1. อัปเดต State
        setTheme(newTheme);

        // 2. อัปเดต HTML Attribute ทันที
        document.documentElement.setAttribute('data-theme', newTheme);

        // 3. บันทึกลง Cookie (ตั้งอายุไว้ 1 ปี)
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                borderRadius: '8px',
                backgroundColor: 'var(--button-bg)',
                color: 'var(--text-color)',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}