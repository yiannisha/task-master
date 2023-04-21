import type { Session } from "@supabase/auth-helpers-react"
import type { GlobalSupabaseClient } from "../types"

/**
 * 
 * Get supabase auth session.
 * Created to be used in getStaticProps & getServerSideProps where
 * useUser cannot be used.
 * 
 * @param client supabase client
 * @returns current session if user is signed in, undefined otherwise
 */
export async function getSession (client: GlobalSupabaseClient): Promise<Session | null> {
    const {
        data: { session },
    } = await client.auth.getSession()
    
    return session
}