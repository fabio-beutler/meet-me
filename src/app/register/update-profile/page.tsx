import { Metadata } from 'next';

import { UpdateProfileForm } from '@/components/forms/register-form/update-profile-form';
import { MultiStep } from '@/components/ui/multi-step';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Atualize seu perfil | Meet Me',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function UpdateProfilePage() {
  const session = await auth();

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Bem vindo ao Meet Me!</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Seu perfil está criado! Ah, você pode editar essas informações depois.
        </p>
        <MultiStep size={2} currentStep={2} />
      </header>

      <div className="mt-6 ">
        <UpdateProfileForm session={session} />
      </div>
    </main>
  );
}
