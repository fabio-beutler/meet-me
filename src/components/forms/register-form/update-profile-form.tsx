'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateUser } from '@/lib/actions/user';
import { updateProfileSchema } from '@/lib/validations/user';

interface UpdateProfileFormProps {
  session: Session | null;
}

export function UpdateProfileForm(props: UpdateProfileFormProps) {
  const router = useRouter();

  if (!props.session) {
    redirect('/');
  }

  const userInitials =
    props.session.user.name
      ?.split(' ')
      .map((word) => word[0])
      .join('') || '';

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: props.session.user.name ?? '',
      username: props.session.user.username ?? '',
      bio: props.session.user.bio ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    try {
      const updatedUser = await updateUser(values);
      if (updatedUser.error) {
        return toast.error(updatedUser.error);
      }
      router.push(`/schedule/${props.session?.user.username}`);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between">
              <FormItem className="w-1/3">
                <FormLabel>Foto de perfil</FormLabel>
                <div className="flex items-center gap-4">
                  <Avatar className="size-28">
                    <AvatarImage
                      src={props.session?.user.avatar_url}
                      alt={props.session?.user.name ?? userInitials}
                    />
                    <AvatarFallback className="bg-primary-foreground text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </FormItem>
              <div className="w-2/3 space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobre você</FormLabel>
                  <FormControl>
                    <Textarea autoFocus className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs">
                    <FormDescription className="text-xs">
                      Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                    </FormDescription>
                  </FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="flex w-full items-center gap-2"
              disabled={form.formState.isSubmitting}
            >
              Finalizar
              {form.formState.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
