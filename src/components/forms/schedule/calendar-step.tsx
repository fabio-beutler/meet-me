'use client';

import { Box } from '@/components/ui/box';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import { TimePicker } from './time-picker';

export function CalendarStep() {
  const isDateSelected = true;

  return (
    <Box
      className={cn('relative grid max-w-full p-0', {
        'w-[540px] grid-cols-1': !isDateSelected,
        'w-[] grid-cols-1 md:grid-cols-[1fr_280px]': isDateSelected,
      })}
    >
      <Calendar />

      {isDateSelected && <TimePicker />}
    </Box>
  );
}
