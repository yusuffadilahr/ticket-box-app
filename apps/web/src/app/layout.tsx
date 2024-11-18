import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import TanstackProviders from '@/providers/tanstackProviders';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/providers/authProviders';
import HOCLoading from '@/providers/HOCLoading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tiket Box | Beranda',
  description: 'Welcome to Tiket Box',
};

interface ILayoutChildren {
  children: React.ReactNode;
}
export default function RootLayout({ children }: ILayoutChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProviders>
          <Header />
          <Toaster position="top-center" reverseOrder={false} />
          <AuthProvider>
            <HOCLoading>
              {children}
            </HOCLoading>
          </AuthProvider>
          <Footer />
        </TanstackProviders>
      </body>
    </html>
  );
}
