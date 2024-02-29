import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { UpdateProfileForm } from '@/components/forms/register-form/update-profile-form';
import { MultiStep } from '@/components/ui/multi-step';
import { authOptions } from '@/lib/next-auth';

export const metadata: Metadata = {
  title: 'Atualize seu perfil | Meet Me',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function UpdateProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Bem vindo ao Meet Me!</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar
          essas informações depois.
        </p>
        <MultiStep size={4} currentStep={4} />
      </header>

      <div className="mt-6 ">
        <UpdateProfileForm session={session} />
      </div>
    </main>
  );
}
