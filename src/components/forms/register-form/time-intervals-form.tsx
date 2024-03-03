'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createTimeInterval } from '@/lib/actions/time-intervals';
import { timeIntervalsSchema, WeekDay } from '@/lib/validations/datetime';

const timeIntervalsSelector = Array.from({ length: 11 }).map(
  (_, index) => `${(index + 8).toString().padStart(2, '0')}:00`,
);

export function TimeIntervalsForm() {
  const router = useRouter();

  const form = useForm<
    z.input<typeof timeIntervalsSchema>,
    any,
    z.output<typeof timeIntervalsSchema>
  >({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  });

  const { fields } = useFieldArray({ control: form.control, name: 'intervals' });

  const watchingIntervals = form.watch('intervals');

  async function onSubmit(values: z.output<typeof timeIntervalsSchema>) {
    try {
      const createdTimeIntervalResponse = await createTimeInterval(values);
      if (createdTimeIntervalResponse.error) {
        return toast.error(createdTimeIntervalResponse.error);
      }
      router.push('/register/update-profile');
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <Box asChild className="flex flex-col gap-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="divide-y divide-muted-foreground/20 rounded-md border border-muted-foreground/20">
            {fields.map((arrayField, index) => (
              <div
                key={arrayField.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <FormField
                  control={form.control}
                  name={`intervals.${index}.enabled`}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            {...field}
                            checked={value}
                            onCheckedChange={(value) => onChange(value)}
                            title={`Habilitar intervalo de horário para ${WeekDay[arrayField.weekDay]}`}
                          />
                        </FormControl>
                        <FormLabel>{WeekDay[arrayField.weekDay]}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`intervals.${index}.startTime`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <Select
                        defaultValue="08:00"
                        disabled={!watchingIntervals[index].enabled}
                        onValueChange={onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeIntervalsSelector.map((time) => (
                            <SelectItem key={time} value={time} showIndicator={false}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`intervals.${index}.endTime`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <Select
                        defaultValue="08:00"
                        disabled={!watchingIntervals[index].enabled}
                        onValueChange={onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeIntervalsSelector.map((time) => (
                            <SelectItem key={time} value={time} showIndicator={false}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          {form.formState.errors.intervals && (
            <p className="text-destructive brightness-150">
              {form.formState.errors?.intervals.root?.message}
            </p>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Próximo passo <ArrowRight className="ml-2 size-4" />
          </Button>
        </form>
      </Box>
    </Form>
  );
}
