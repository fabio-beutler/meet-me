'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { createUser } from '@/lib/actions/user';
import { userSchema } from '@/lib/validations/user';

export function RegisterUserForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: searchParams.get('username') ?? '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const createdUser = await createUser(values);
      if (createdUser.error) {
        return toast.error(createdUser.error);
      }
      router.push('/register/connect-calendar');
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <Box asChild className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <InputWithPrefix
                    prefix="meet.me/"
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Seu nome" {...field} />
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
            Próximo passo
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </form>
      </Box>
    </Form>
  );
}
