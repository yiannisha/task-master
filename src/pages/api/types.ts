import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

export type GlobalSupabaseClient = SupabaseClient<any, "public", any>