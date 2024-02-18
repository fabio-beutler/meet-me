import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Crie uma conta | Meet Me',
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
