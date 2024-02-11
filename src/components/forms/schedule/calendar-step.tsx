'use client';

import { Box } from '@/components/ui/box';
import { Calendar } from '@/components/ui/calendar';

export function CalendarStep() {
  return (
    <Box className="relative grid w-[540px] max-w-full grid-cols-1 p-0">
      <Calendar />
    </Box>
  );
}
