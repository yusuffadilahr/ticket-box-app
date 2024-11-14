'use client';
import authStore from '@/zustand/authstore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const token = authStore((state) => state.token);
  const role = authStore((state)=>state.role)
  const setAuth = authStore((state)=> state.setAuth)
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/user/login');
    }
  }, [token]);

  useEffect(()=>{
    if(role && role != 'user') {
      router.push('/user/login')
      setAuth({token: ''})
      Cookies.remove('role')
      Cookies.remove('token')
    }
  }, [role, token])

  return <>{children}</>;
}
