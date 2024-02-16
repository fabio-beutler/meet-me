'use client';

import { set } from 'date-fns';
import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { cn } from '@/lib/utils';

import { Calendar } from './calendar';
import { TimePicker } from './time-picker';

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep(props: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDateSelected = !!selectedDate;

  function handleSelectTime(hour: number) {
    if (!selectedDate) return;
    const dateWithTime = set(selectedDate, {
      hours: hour,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    props.onSelectDateTime(dateWithTime);
  }

  return (
    <Box
      className={cn('relative mx-auto grid max-w-full p-0', {
        'w-[540px] grid-cols-1': !isDateSelected,
        'w-[] grid-cols-1 md:grid-cols-[1fr_280px]': isDateSelected,
      })}
    >
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {isDateSelected && (
        <TimePicker onSelectTime={handleSelectTime} selectedDate={selectedDate} />
      )}
    </Box>
  );
}
