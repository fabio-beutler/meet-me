import Image from 'next/image';
import { redirect } from 'next/navigation';

import { BgGrid } from '@/assets/bg-grid';
import calendarImg from '@/assets/calendar-bg.png';
import { ConnectWithGoogle } from '@/components/auth/connect-with-google';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  if (session && session.user) {
    const response = await fetch(
      `http://localhost:3000/api/user/${session?.user.username}/timeIntervals`,
    ).then((res) => res.json());
    if (response.timeIntervals.length === 0) {
      console.log('no time intervals');
      return redirect('/register/time-intervals');
    }
  }

  return (
    <main className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20 overflow-hidden">
      <div className="max-w-[580px] px-10">
        <h1 className="text-4xl font-extrabold sm:text-7.3xl">
          Agendamento descomplicado
        </h1>
        <p className="mt-2 text-xl leading-relaxed text-muted-foreground">
          Conecte seu calendário e permita que as pessoas marquem agendamentos no seu
          tempo livre.
        </p>
        <div className="mt-6">
          <ConnectWithGoogle />
        </div>
        <BgGrid className="fixed left-[max(0px,calc(100vw-1160px)/2)] top-1/2 -z-10 -translate-y-1/2" />
      </div>
      <Image
        src={calendarImg}
        height={400}
        quality={100}
        priority
        alt="a calendar to simbolize the app functionality"
        className="hidden sm:block"
      />
    </main>
  );
}
