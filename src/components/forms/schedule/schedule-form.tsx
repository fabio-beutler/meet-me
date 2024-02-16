'use client';

import { useState } from 'react';

import { CalendarStep } from './calendar-step';
import { ConfirmStep } from './confirm-step';

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={() => setSelectedDateTime(null)}
      />
    );
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />;
}
