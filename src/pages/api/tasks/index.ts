import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import type { GlobalSupabaseClient } from '../types'

export async function getTasksDelayed () {
    return (await axios.get('http://localhost:3001/tasks')).data
}

export async function getTasks (client: GlobalSupabaseClient, userId: string) {
    const { data, error } = await client.from('Tasks').select('*').eq('creator', userId)
    return {
        data: data,
        error: error,
    }
}