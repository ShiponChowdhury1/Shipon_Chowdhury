'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/hooks/use-theme';
import { ToastProvider } from '@/components/providers/toast-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </SessionProvider>
  );
}
