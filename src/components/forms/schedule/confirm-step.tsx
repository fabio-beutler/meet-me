'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { scheduleConfirmFormSchema } from '@/lib/validations/schedule';

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep(props: ConfirmStepProps) {
  const form = useForm<z.infer<typeof scheduleConfirmFormSchema>>({
    resolver: zodResolver(scheduleConfirmFormSchema),
    defaultValues: {
      name: '',
      email: '',
      observations: '',
    },
  });

  function onSubmit(values: z.infer<typeof scheduleConfirmFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <Box asChild className="mx-auto max-w-[540px] space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div id="form header" className="flex items-center gap-4 pb-2 pt-1">
            <h2 className="flex items-center gap-2">
              <Calendar className="size-4  text-gray-300" />
              {format(props.schedulingDate, "dd 'de' MMMM 'de' yyyy")}
            </h2>
            <h2 className="flex items-center gap-2">
              <Clock className="size-4 text-gray-300" calcMode={20} />
              {format(props.schedulingDate, "HH:mm'h'")}
            </h2>
          </div>
          <Separator orientation="horizontal" className="bg-muted-foreground/15" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pt-1">
                <FormLabel className="text-sm">Seu nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className="-ml-0.5"
                    {...field}
                  />
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
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@example.com"
                    className="-ml-0.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Observações</FormLabel>
                <FormControl>
                  <Textarea className="-ml-0.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p id="form error"></p>
          <div id="form actions" className="flex justify-end gap-4 pt-1">
            <Button
              onClick={props.onCancelConfirmation}
              type="button"
              variant="ghost"
              className="hover:bg-zinc-900"
            >
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </div>
        </form>
      </Box>
    </Form>
  );
}
