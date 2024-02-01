'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'O usuário precisa ter no mínimo 3 letras',
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ClaimUsernameForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid grid-cols-1 gap-2 rounded-lg border border-muted-foreground/30 bg-muted p-6 sm:grid-cols-[1fr_auto]"
      >
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-muted-foreground">
            ignite.com/
          </span>
          <Input
            placeholder="seu usuário"
            className="border-none pl-[83px]"
            autoComplete="username"
            {...form.register('username')}
          />
        </div>
        <Button type="submit" className="flex gap-1 font-bold">
          Reservar
          <ArrowRight className="size-4" />
        </Button>
      </form>
      <span
        className={cn('mt-2 block text-sm text-muted-foreground', {
          'text-red-500': form.formState.errors.username,
        })}
      >
        {form.formState.errors.username?.message ?? 'Digite o nome do usuário desejado'}
      </span>
    </Form>
  );
}
