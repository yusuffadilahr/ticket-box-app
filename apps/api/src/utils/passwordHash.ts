import bcrypt from 'bcrypt'

export const hashPassword = async (password:string) => {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
}

export const comparePassword = async (passwordInput: string, passwordDb: string) => {
    return await bcrypt.compare(passwordInput, passwordDb)
}