import instance from '@/utils/axiosInstance/axiosInstance';
import authStore from '@/zustand/authstore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const useHandleLogin = () => {
    const setAuth = authStore((state) => state.setAuth);
    const router = useRouter();
    const { mutate: handleLogin, isPending } = useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return await instance.post('/auth/login/event-organizer', {
                email,
                password,
            });
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message);
            setAuth({ token: res.data.data.token });
            console.log(res);
            router.push('/event/dashboard');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
            console.log(error);
        },
    });

    return {
        handleLogin, isPending
    }
}

export default useHandleLogin