'use client';

import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function TimeIntervalsForm() {
  const form = useForm();

  async function onSubmit(values: any) {
    try {
      console.log(values);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <Box asChild className="flex flex-col gap-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            id="intervals container"
            className="divide-y divide-muted-foreground rounded-md border border-muted-foreground"
          >
            <div
              id="interval item"
              className="flex items-center justify-between px-4 py-3"
            >
              <div id="interval day" className="flex items-center gap-3">
                <Checkbox name="monday" id="monday" />
                <Label htmlFor="monday">Segunda-feira</Label>
              </div>
              <div id="interval inputs" className="flex items-center gap-2">
                <Input type="time" step={60} className="invert-calendar-picker" />
                <Input type="time" step={60} className="invert-calendar-picker" />
              </div>
            </div>
            <div
              id="interval item"
              className="flex items-center justify-between px-4 py-3"
            >
              <div id="interval day" className="flex items-center gap-3">
                <Checkbox name="tuesday" id="tuesday" />
                <Label htmlFor="tuesday">Terça-feira</Label>
              </div>
              <div id="interval inputs" className="flex items-center gap-2">
                <Input type="time" step={60} className="invert-calendar-picker" />
                <Input type="time" step={60} className="invert-calendar-picker" />
              </div>
            </div>
          </div>
          <Button type="submit">
            Próximo passo <ArrowRight className="ml-2 size-4" />
          </Button>
        </form>
      </Box>
    </Form>
  );
}
