import 'server-only'

import { createClient } from '@supabase/supabase-js'

/** Server-only. Bypasses RLS — use only in API routes, never in the browser. */
export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY!
)
