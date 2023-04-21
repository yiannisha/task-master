import { QueryClient, dehydrate } from 'react-query'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { Row, Col } from 'reactstrap'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

import { authApi, tasksApi } from '../api'
import Title from '@/components/Title'
import { useTasks } from '../../selectors'

export const getServerSideProps = async (ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }) => {

    // NOTE: I could propably create a wrapper for getServerSideProps
    // to pass the supabase server client, the react-query client and 
    // also check the session if the user is signed in.

    // ideally move to a wrapper function
    // --------------------
    const client = createServerSupabaseClient(ctx)
    const queryClient = new QueryClient()

    const session = await queryClient.fetchQuery({ queryKey: 'session', queryFn: () => authApi.getSession(client) })

    // server side redirection
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    // --------------------

    await queryClient.prefetchQuery({ queryKey: 'tasks', queryFn: () => tasksApi.getTasks(client, session.user.id) })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

function tasks() {

    const { isLoading, data } = useTasks()

    // navigation
    // const router = useRouter()

    // client side redirection
    // doesn't work on refresh because initial value of session/user
    // is null so it redirects back to login even if signed in.
    // useEffect(() => {
    //     if (!session) {
    //         router.push('/login')
    //     }
    //     console.log('session changed')
    // }, [session])

    // possible solutions:
    // - use react query for client side data fetching (if server side is not possible)
    // - supabase sdk docs
  
    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <Title>Tasks</Title>
            <Row className='relative my-3 bg-gray-200 h-full w-full rounded-xl'>
            {/* Create Task Button */}
                <button
                className='absolute w-fit-content right-0 bg-gray-100 rounded px-2 py-0 m-2 hover:bg-gray-400 hover:text-white'
                >+</button>
            {/* TASKS */}
            </Row>
        </>
    )
}

// set page title
tasks.title = 'Tasks'

export default tasks