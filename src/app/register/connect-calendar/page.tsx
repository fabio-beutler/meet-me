import { Metadata } from 'next';

import { ConnectGoogleBox } from '@/components/auth/connect-google-box';
import { MultiStep } from '@/components/ui/multi-step';

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google | Meet Me',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConnectCalendarPage() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Conecte sua agenda!</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Conecte o seu calendário para verificar automaticamente as horas ocupadas e os
          novos eventos à medida em que são agendados.
        </p>
        <MultiStep size={4} currentStep={2} />
      </header>

      <div className="mt-6">
        <ConnectGoogleBox />
      </div>
    </main>
  );
}
