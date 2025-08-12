'use server'

export const loginAction = async (formData: FormData) => {
    try {
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/auth/login/user', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(data)
        })

        const response = await res.json()
        if (!res.ok) return response

        return response
    } catch (error) {
        return error
    }
}

export const registerAction = async (formData: FormData) => {
    try {
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            phoneNumber: formData.get('phoneNumber'),
            identityNumber: formData.get('identityNumber'),
            referralBody: formData.get('referralBody')
        }

        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/auth/register/user', {
            cache: 'no-store',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST'
        })

        if (!res.ok) throw new Error('Gagal melakukan registrasi')

        const response = await res.json()
        return response
    } catch (error) { 
        throw error
    }
}