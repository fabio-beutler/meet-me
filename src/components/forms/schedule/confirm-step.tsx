'use client';

import { Calendar, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export function ConfirmStep() {
  const form = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <Box asChild className="mx-auto max-w-[540px] space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div id="form header" className="flex items-center gap-4 pb-2 pt-1">
            <h2 className="flex items-center gap-2">
              <Calendar className="size-4 text-gray-300" />
              22 de Setembro de 2022
            </h2>
            <h2 className="flex items-center gap-2">
              <Clock className="size-4 text-gray-300" calcMode={20} />
              18:00h
            </h2>
          </div>
          <Separator orientation="horizontal" className="bg-muted-foreground/15" />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="pt-1">
                <FormLabel className="text-sm">Seu nome</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Endereço de e-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="obs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Observações</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p id="form error"></p>
          <div id="form actions" className="flex justify-end gap-4 pt-1">
            <Button type="button" variant="ghost" className="hover:bg-zinc-900">
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </div>
        </form>
      </Box>
    </Form>
  );
}
