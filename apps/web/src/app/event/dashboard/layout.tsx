'use client';

import { SidebarMenu } from '@/components/Sidebar';
import authStore from '@/zustand/authstore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ILayoutChildren {
  children: React.ReactNode;
}
export default function Layout({ children }: ILayoutChildren) {
  const token = authStore((state) => state.token);
  const isVerified = authStore((state) => state.isVerified);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.push('/event-organizer/login');
    }
  }, [token]);

  useEffect(() => {
    if (
      (isVerified == false) &&
      (pathname == '/event/dashboard' ||
        pathname.startsWith('/event/dashboard/c') ||
        pathname.startsWith('/event/dashboard/u'))
    ) {
      router.push('/event/dashboard/profile-event-organizer/profile');
    }
  }, [isVerified, pathname]);

  return (
    <>
      <SidebarMenu />
      <main className="pl-72 p-5">{children}</main>
    </>
  );
}
