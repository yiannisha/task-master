import { GlobalSupabaseClient } from "@/pages/api/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { UseQueryResult } from "react-query/types/react"

/**
 * 
 * Executes `fn` function passing the supabase client as a parameter.
 * Used with selectors from `src/selectors`.
 * 
 * @param fn function to run
 * @returns whatever `fn` would return
 */
const withSupabase = (fn: (client: GlobalSupabaseClient) => UseQueryResult) => {
    const client = useSupabaseClient()
    return fn(client)
}

export {
    withSupabase
}