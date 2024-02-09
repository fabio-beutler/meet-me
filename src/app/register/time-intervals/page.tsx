import { TimeIntervalsForm } from '@/components/forms/register-form/time-intervals-form';
import { MultiStep } from '@/components/ui/multi-step';

export default function TimeIntervalsPage() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Quase lá</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </p>
        <MultiStep size={4} currentStep={3} />
      </header>

      <div className="mt-6">
        <TimeIntervalsForm />
      </div>
    </main>
  );
}
