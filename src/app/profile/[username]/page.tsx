import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ConnectWithGoogleForm } from '@/components/forms/register-form/connect-with-google-form';
import { DeleteProfileForm } from '@/components/forms/register-form/delete-profile-form';
import { TimeIntervalsForm } from '@/components/forms/register-form/time-intervals-form';
import { UpdateProfileForm } from '@/components/forms/register-form/update-profile-form';
import { auth } from '@/lib/auth';

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  return {
    title: `Atualize seu perfil | ${session?.user.name} | Meet Me`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const session = await auth();

  if (!session || session.user.username !== params.username) {
    return notFound();
  }

  const response = await fetch(
    `http://localhost:3000/api/user/${session.user.username}/time-intervals`,
  ).then((res) => res.json());

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <div className="fixed right-16 top-3 z-10">
        <ConnectWithGoogleForm />
      </div>

      <header className="flex items-center justify-between px-6">
        <h1 className="text-xl leading-relaxed">
          Atualize seu perfil, {session?.user.name}
        </h1>
      </header>

      <div className="mt-6 space-y-2">
        <UpdateProfileForm session={session} />
        <TimeIntervalsForm username={params.username} />

        <DeleteProfileForm />
      </div>
    </main>
  );
}
