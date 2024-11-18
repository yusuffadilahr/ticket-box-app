'use client';

import { SidebarMenu } from '@/components/Sidebar';
import { TopBar } from '@/components/ui/TopBar';
import authStore from '@/zustand/authstore';
import { Metadata } from 'next';
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
        pathname.startsWith('/event/dashboard/u') ||
        pathname.startsWith('/event/dashboard/transaction'))
    ) {
      router.push('/event/dashboard/profile-event-organizer/profile');
    }
  }, [isVerified, pathname]);

  return (
    <>
      <SidebarMenu />
      <TopBar />
      <main className="lg:pl-72 p-5">{children}</main>
    </>
  );
}
