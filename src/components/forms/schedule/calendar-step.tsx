'use client';

import { Box } from '@/components/ui/box';
import { Calendar } from '@/components/ui/calendar';

export function CalendarStep() {
  return (
    <Box className="relative grid max-w-full p-0">
      <Calendar />
    </Box>
  );
}
