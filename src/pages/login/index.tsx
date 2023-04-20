import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Inter } from 'next/font/google'
import { Container, Row, Col } from 'reactstrap'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useRouter } from 'next/router'
import type { ChangeEvent, ReactNode } from 'react'

import { registerAtom, loginFormAtom } from './atoms'
import Title from '@/components/Title'
import type { FormField, FormFields } from '@/types'

const inter = Inter({ subsets: ['latin'] })

function login() {
    
    // router
    const router = useRouter()

    // current session (user logged in or not)
    const session = useSession()
    // supabase client
    const supabase = useSupabaseClient()
    
    const [register, setRegister] = useAtom(registerAtom)
    const [loginForm, setLoginForm] = useAtom(loginFormAtom)
    const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => setLoginForm({ ...loginForm, [key]: e.target.value })
    const clearForm = () => setLoginForm(RESET)
    
    const loginUser = async (email: string | null, password: string | null) => {
        // ideally here we could skip checking with if, by setting another
        // type for the validated form data that doesn't have any nullable elements
        if (email && password) {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (!error) {
                router.push('/tasks')
            }
        }
    }

    const registerUser = async (email: string | null, password: string | null) => {
        // ideally here we could skip checking with if, by setting another
        // type for the validated form data that doesn't have any nullable elements
        if (email && password) {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
        }
    }

    const formFields: FormFields = [
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            required: true,
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            required: true,
        },
        {
            name: 'passwordConfirm',
            type: 'password',
            label: 'Confirm Password',
            required: true,
            showCondition: register,
        },
    ]
  
    const fields: ReactNode[] = formFields.map((field: FormField, index: number) => (
        <Row key={index} className='flex flex-row align-items-center px-4'>
        {   (field.showCondition === true || field.showCondition === undefined) &&
            <>
                <Col xs={{ size: 3 }} md={{ size: 6 }}>
                    <label htmlFor={ field.name } className='w-full text-left md:text-lg text-xs transition-all'>{ field.label }&nbsp;:</label>
                </Col>
                <Col xs={{ size: 9 }} md={{ size: 6 }}>
                    <input
                    className='w-full my-2 rounded-lg py-1 px-2 md:text-lg text-xs bg-gray-200 text-gray-400 focus:bg-white focus:text-black transition-all'
                    value={ loginForm[field.name as 'email' | 'password' | 'passwordConfirm'] || '' }
                    type={ field.type }
                    placeholder={ field.placeholder || field.label }
                    required={field?.required}
                    onChange={handleChange(field.name)}
                    />
                </Col>
            </>
        }
        </Row>
    ))

    return (
    <>
        {
            !session && <p>Not logged in</p>
        }
        <Title>Login</Title>
        <Row className='my-5'>
            <Container>
                { fields }
            </Container>
        </Row>
            <button
            className='transition-all bg-green-500 hover:bg-green-600 px-2 py-1 my-2 rounded text-white'
            onClick={() => {
                if (register) {
                    setRegister(false)
                    clearForm()
                    return
                }
                // here we could use the data in validatedLoginFormAtom
                loginUser(loginForm.email, loginForm.password)
                clearForm()
            }}
            >Login</button>
            <button
            className='transition-all bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-white'
            onClick={() => {
                if (!register) {
                    setRegister(true)
                    clearForm()
                    return
                }
                // here we could use the data in validatedLoginFormAtom
                registerUser(loginForm.email, loginForm.password)
                clearForm()
            }}
            >Create Account</button>
        <Row>

        </Row>
    </>
  )

}

// set page title
login.title = 'Login'

export default login