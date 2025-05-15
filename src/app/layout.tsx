import type { Metadata } from 'next';
import './globals.css';

import ThemeProvider from '@/providers/ThemeProvider';
import { MessageBoxProvider } from '@/providers/MessageBoxProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastProvider from '@/providers/ToastProvider';

export const metadata: Metadata = {
  title: '华智出海招聘',
  description: '华智出海招聘',
};

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-foreground bg-background-2">
        <ThemeProvider>
          <MessageBoxProvider>
            <ToastProvider>
              <MainLayout>{children}</MainLayout>
            </ToastProvider>
          </MessageBoxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
