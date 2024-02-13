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
import { Input, InputWithPrefix } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export function ConfirmStep() {
  const form = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <Box asChild className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div id="form header" className="flex items-center gap-3">
            <h2 className="flex items-center gap-2">
              <Calendar className="size-4" />
              22 de Setembro de 2022
            </h2>
            <h2 className="flex items-center gap-2">
              <Clock className="size-4" calcMode={20} />
              18:00h
            </h2>
          </div>
          <Separator orientation="horizontal" className="bg-muted-foreground/15" />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu nome</FormLabel>
                <FormControl>
                  <InputWithPrefix prefix="meet.me/" {...field} />
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
                <FormLabel>Endereço de e-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p id="form error"></p>
          <div id="form actions" className="flex justify-end gap-4">
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </div>
        </form>
      </Box>
    </Form>
  );
}
