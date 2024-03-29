import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { TimeIntervalsForm } from '@/components/forms/register-form/time-intervals-form';
import { MultiStep } from '@/components/ui/multi-step';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade | Meet Me',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function TimeIntervalsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }
  const timeIntervals = await fetch(
    `http://localhost:3000/api/${session.user.username}/time-intervals`,
  );

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Quase lá</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </p>
        <MultiStep size={2} currentStep={1} />
      </header>

      <div className="mt-6">
        <TimeIntervalsForm isInRegister username={session.user.username} />
      </div>
    </main>
  );
}
