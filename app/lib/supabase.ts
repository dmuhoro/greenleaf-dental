import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 DEBUG - Supabase URL:', supabaseUrl)
console.log('🔍 DEBUG - Key exists:', !!supabaseAnonKey)
console.log('🔍 DEBUG - Key length:', supabaseAnonKey?.length)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)