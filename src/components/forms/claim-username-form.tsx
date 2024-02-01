'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'O nome de usuário é obrigatório',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function ClaimUsernameForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid grid-cols-1 gap-2 rounded-lg border border-muted-foreground/30 bg-muted p-6 sm:grid-cols-[1fr_auto]"
      >
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-muted-foreground">
            ignite.com/
          </span>
          <Input
            placeholder="seu usuário"
            className="border-none pl-[83px]"
            autoComplete="username"
            {...form.register('username')}
          />
          <span className="absolute -bottom-[1.4rem] left-0 text-sm text-red-500">
            {form.formState.errors.username?.message}
          </span>
        </div>
        <Button type="submit" className="flex gap-1 font-bold">
          Reservar
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
