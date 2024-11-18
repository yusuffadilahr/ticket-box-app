import instance from './../../../../utils/axiosInstance/axiosInstance'
import { IRegisterOrganizer } from '../../../../app/(auth)/event-organizer/register/type'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const useMutateRegisterEventOrganizer = () => {
    const router= useRouter()
    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: async ({ organizerName, ownerName, email, password, phoneNumber, identityNumber }: IRegisterOrganizer) => {
            return await instance.post('/auth/register/event-organizer', {
                organizerName, ownerName, email, password, phoneNumber, identityNumber
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res?.data?.message)
            router.push('/event-organizer/login')
        },
        onError: (err: any) => {
            console.log(err?.response?.data?.message)
            toast.error(err?.response?.data?.message)
        }
    })

    return {
        handleRegister,
        isPending
    }
}

export default useMutateRegisterEventOrganizer