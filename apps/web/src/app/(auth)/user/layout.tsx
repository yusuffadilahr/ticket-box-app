import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'Tiket Box | User Autentikasi',
    description: 'Welcome to Tiket Box',
  };

export default function Layout({children}: {children: ReactNode}) {
    return (
        <>
            {children}
        </>
    );
}