'use client'

import { SidebarMenu } from '@/components/Sidebar';
import KeepLoginEventOrganizer from '@/providers/keepLoginEventOrganizer';
import authStore from '@/zustand/authstore';

interface ILayoutChildren {
  children: React.ReactNode;
}
export default function Layout({ children }: ILayoutChildren) {
  return (
    <>
      <SidebarMenu />
      <main className="pl-72 p-5">
        {children}
      </main>
    </>
  );
}
