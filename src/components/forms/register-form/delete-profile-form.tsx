'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { deleteUser } from '@/lib/actions/user';
import { signOut } from '@/lib/auth';

export function DeleteProfileForm() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await deleteUser();
      if (result.error) {
        return toast.error(result.error);
      }
      toast.success('Conta deletada com sucesso');
      router.replace('/');
      await signOut();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Deletar conta
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <form onSubmit={onSubmit}>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Ao confirmar você irá deletar
                  permanentemente sua conta e remover seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button type="submit" variant="destructive">
                  Deletar conta
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
