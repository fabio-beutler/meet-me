'use client';

import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { toast } from 'sonner';

import { getUserAvailability } from '@/lib/actions/availability';

interface TimePickerProps {
  selectedDate: Date | null;
}

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function TimePicker(props: TimePickerProps) {
  const id = useId();
  const { username } = useParams<{ username: string }>();
  const [availability, setAvailability] = useState<Availability | null>(null);

  useEffect(() => {
    if (!props.selectedDate) return;
    getUserAvailability({
      username,
      date: props.selectedDate,
    })
      .then((result) => {
        if (result.error) {
          toast.error('Não foi possível carregar os horários disponíveis');
          return;
        }
        setAvailability(result.availability);
      })
      .catch((error) => console.error(error.message));
  }, [props.selectedDate, username]);

  const weekDay = props.selectedDate ? format(props.selectedDate, 'EEEE') : null;
  const month = props.selectedDate ? format(props.selectedDate, "dd 'de' MMMM") : null;

  return (
    <div className="border-l-1 absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-zinc-600 px-6 pt-6">
      <p className="font-medium">
        {weekDay}, <span className="text-zinc-200">{month}</span>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1">
        {availability?.possibleTimes.map((hour) => (
          <button
            key={`${hour}-${id}`}
            disabled={!availability.availableTimes.includes(hour)}
            className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900"
          >
            {String(hour).padStart(2, '0')}:00h
          </button>
        ))}
      </div>
    </div>
  );
}
