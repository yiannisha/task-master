export type FormField = {
    name: string,
    type: string,
    label: string,
    required?: boolean,
    placeholder?: string,
    showCondition?: boolean,
}
export type FormFields = FormField[]

export type LoginFormData = {
    email: null | string,
    password: null | string,
    passwordConfirm?: null | string,
}