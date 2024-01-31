import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--roboto' });

export const metadata: Metadata = {
  title: 'Meet Me',
  description: 'An application to schedule meetings with your customers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          roboto.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
