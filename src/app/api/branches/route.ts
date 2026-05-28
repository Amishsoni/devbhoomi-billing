import { NextResponse } from 'next/server'

import { adminSupabase } from '@/lib/supabase/admin'

export async function GET() {
  try {
    const { data, error } = await adminSupabase
      .from('branches')
      .select('id, name')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    const options = (data ?? []).map(branch => ({
      value: branch.id,
      label: branch.name
    }))

    return NextResponse.json({ success: true, data: options })
  } catch {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
