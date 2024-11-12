'use client'

import { SidebarMenu } from '@/components/Sidebar';
import authStore from '@/zustand/authstore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ILayoutChildren {
  children: React.ReactNode;
}
export default function Layout({ children }: ILayoutChildren) {
  const token = authStore((state) => state.token)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/event-organizer/login')
    }
  }, [token])
  return (
    <>
      <SidebarMenu />
      <main className="pl-72 p-5">
        {children}
      </main>
    </>
  );
}
