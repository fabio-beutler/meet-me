'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input, InputWithPrefix } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'O usuário precisa ter no mínimo 3 letras',
    })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário só pode conter letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
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
      <Box asChild className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputWithPrefix
            prefix="ignite.com/"
            type="text"
            placeholder="seu-usuario"
            className="border-none"
            autoComplete="username"
            {...form.register('username')}
          />
          <Button type="submit" className="flex gap-1 font-bold">
            Reservar
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Box>

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
