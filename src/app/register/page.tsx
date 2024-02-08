import { RegisterUserForm } from '@/components/forms/register-form/register-user-form';
import { MultiStep } from '@/components/ui/multi-step';

export default function RegisterPage() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px] px-4">
      <header className="px-6">
        <strong className="text-2xl leading-relaxed">Bem vindo ao Meet Me!</strong>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar
          essas informações depois.
        </p>
        <MultiStep size={4} currentStep={1} />
      </header>

      <div className="mt-6 ">
        <RegisterUserForm />
      </div>
    </main>
  );
}
