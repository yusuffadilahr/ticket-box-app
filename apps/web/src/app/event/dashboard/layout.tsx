'use client'

import { SidebarMenu } from '@/components/Sidebar';
import KeepLoginEventOrganizer from '@/providers/keepLoginEventOrganizer';
import authStore from '@/zustand/authstore';

interface ILayoutChildren {
  children: React.ReactNode;
}
export default function RootLayout({ children }: ILayoutChildren) {
  // const router = useRouter();
  // const role = authStore((state) => state.role);
  const token = authStore((state) => state.token);
  console.log(!token, '<<< token');

  // useEffect(() => {
  //   if (!token && !role) {
  //     router.push('/auth/event-organizer/login-organizer');
  //   }
  // }, [token, role]);

  // useEffect(() => {
  //   if (role && role != 'EO') {
  //     router.push('/');
  //   }
  // }, [role]);

  return (
    <>
      <SidebarMenu />
      <main className="pl-72 p-5">
        {children}
      </main>
    </>
  );
}
