'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateTimeInterval } from '@/lib/actions/time-intervals';
import { api } from '@/lib/axios';
import { timeIntervalsSchema, WeekDay } from '@/lib/validations/datetime';

const timeIntervalsSelector = Array.from({ length: 11 }).map(
  (_, index) => `${(index + 8).toString().padStart(2, '0')}:00`,
);

interface TimeIntervalsFormProps {
  isInRegister?: boolean;
  username: string;
}

interface TimeIntervalsQueryResponse {
  timeIntervals: {
    id: string;
    week_day: number;
    time_start_in_minutes: number;
    time_end_in_minutes: number;
    user_id: string;
    created_at: string;
  }[];
}

export function TimeIntervalsForm({
  isInRegister = false,
  username,
}: TimeIntervalsFormProps) {
  const router = useRouter();

  const timeIntervalsQuery = useQuery({
    queryKey: ['time-intervals'],
    queryFn: async () => {
      return api
        .get<TimeIntervalsQueryResponse>(`/user/${username}/time-intervals`)
        .then((response) => response.data);
    },
  });

  const intervals = useMemo(() => {
    const intervals = [
      { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 1, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 2, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 3, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 4, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 5, enabled: false, startTime: '08:00', endTime: '18:00' },
      { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
    ];
    if (timeIntervalsQuery.isSuccess) {
      timeIntervalsQuery.data.timeIntervals.map((timeInterval) => {
        const index = intervals.findIndex(
          (interval) => interval.weekDay === timeInterval.week_day,
        );
        if (index !== -1) {
          intervals[index] = {
            ...intervals[index],
            enabled: true,
            startTime:
              (timeInterval.time_start_in_minutes / 60).toString().padStart(2, '0') +
              ':00',
            endTime:
              (timeInterval.time_end_in_minutes / 60).toString().padStart(2, '0') + ':00',
          };
        }
      });
    }
    return intervals;
  }, [timeIntervalsQuery.data, timeIntervalsQuery.isSuccess]);

  const form = useForm<
    z.input<typeof timeIntervalsSchema>,
    any,
    z.output<typeof timeIntervalsSchema>
  >({
    resolver: zodResolver(timeIntervalsSchema),
    values: {
      intervals: intervals,
    },
  });

  const { fields } = useFieldArray({ control: form.control, name: 'intervals' });

  const watchingIntervals = form.watch('intervals');

  async function onSubmit(values: z.output<typeof timeIntervalsSchema>) {
    try {
      const createdTimeIntervalResponse = await updateTimeInterval(values);
      if (createdTimeIntervalResponse.error) {
        return toast.error(createdTimeIntervalResponse.error);
      }
      if (isInRegister) {
        router.push('/register/update-profile');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
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
                          defaultValue={value}
                          disabled={!watchingIntervals[index].enabled}
                          onValueChange={onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                          defaultValue={value}
                          disabled={!watchingIntervals[index].enabled}
                          onValueChange={onChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
          </CardContent>
          <CardFooter>
            {isInRegister ? (
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Próximo passo <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Salvar{' '}
                {form.formState.isSubmitting && (
                  <Loader2 className="size-4 animate-spin" />
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
