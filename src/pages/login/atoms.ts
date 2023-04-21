// State used in login page

import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { LoginFormData } from '@/pages/login/types'

export const registerAtom = atom<boolean>(false)

export const loginFormAtom = atomWithReset<LoginFormData>({
    email: null,
    password: null,
    passwordConfirm: null,
})

// can use derived atoms to create a validated login form state
/*
e.g.
export const validatedLoginFormAtom = atom(
    (get) => {
        const loginFormData = get(loginFormAtom)
        
        // validation logic

        return valid ? loginFormData : { error: ... }
    }
)
*/
// just remember to use the data from useAtom(validatedLoginForm) before querying for user authenication.

export const formError = atomWithReset<string | null>(null)