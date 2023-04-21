import { useQuery } from "react-query"
import { useUser } from "@supabase/auth-helpers-react"

import { tasksApi } from "../pages/api"
import { withSupabase } from "@/utils"
import { GlobalSupabaseClient } from "../pages/api/types"

export const useTasksDelayed = () => {
    return useQuery({ queryKey: 'tasksDelayed', queryFn: () => tasksApi.getTasksDelayed() })
}

/**
 * 
 * Hook to get `tasks` query using react-query.
 * 
 * Uses logged in user's id if `userId` is falsy. 
 * 
 * @param userId user's id
 * @returns user's tasks f successful.
 */
export const useTasks = (userId?: string) => withSupabase(
    (client: GlobalSupabaseClient) => {
        var id = userId || useUser()?.id
        return useQuery({ 
            queryKey: 'tasks',
            queryFn: () => tasksApi.getTasks(client, id as string),
        // run only if id is valid -- this allows us to be sure that id will be a string on the line above
            enabled: !!id
        })
    }
)