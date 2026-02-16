export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            dorm_branches: {
                Row: { id: number; name: string; address: string; user_id: string; create_at: string }
                Insert: { id?: number; name: string; address: string; user_id?: string; create_at?: string }
                Update: { id?: number; name?: string; address?: string; user_id?: string; create_at?: string }
            }
            rooms: {
                Row: { id: number; room_number: string; ชั้นที่: string; โซน: string; status: string; type_room_id: number; dorm_branch_id: number }
                Insert: { room_number: string; ชั้นที่: string; โซน: string; status: string; type_room_id: number; dorm_branch_id: number }
                Update: { room_number?: string; ชั้นที่?: string; โซน?: string; status?: string; type_room_id?: number; dorm_branch_id?: number }
            }
            tenants: {
                Row: { id: number; name: string; phone: string; move_in_date: string; status: string }
                Insert: { name: string; phone: string; move_in_date: string; status: string }
                Update: { name?: string; phone?: string; move_in_date?: string; status?: string }
            }
            // ... (เพิ่มตารางอื่นตาม Pattern นี้ได้เลย)
        }
    }
}