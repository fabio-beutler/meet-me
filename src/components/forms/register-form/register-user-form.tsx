'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputWithPrefix } from '@/components/ui/input';

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
  name: z
    .string()
    .min(1, {
      message: 'O nome é obrigatório',
    })
    .refine((name) => name.trim().split(' ').length > 1, {
      message: 'Digite seu nome completo',
    }),
});

type FormData = z.infer<typeof formSchema>;

export function RegisterUserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: '',
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <Box asChild className="mt-6 space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <InputWithPrefix
                    prefix="ignite.com/"
                    placeholder="seu-usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">
                  <FormDescription className="text-xs">
                    Digite o nome do usuário desejado
                  </FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage className="text-xs">
                  <FormDescription className="text-xs">
                    Digite o seu nome completo
                  </FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex w-full items-center gap-2"
            disabled={form.formState.isSubmitting}
          >
            Próximo passo <ArrowRight className="size-4" />
          </Button>
        </form>
      </Box>
    </Form>
  );
}
