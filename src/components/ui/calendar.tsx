'use client';

import {
  addDays,
  addMonths,
  endOfDay,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isBefore,
  isToday,
  set,
  subDays,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { getUserBlockedDates } from '@/lib/actions/availability';
import { cn } from '@/lib/utils';

export type CalendarProps = ComponentProps<'div'> & {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

type CalendarWeek = {
  week: number;
  days: Array<{
    date: Date;
    disabled: boolean;
  }>;
};

type CalendarWeeks = Array<CalendarWeek>;

function Calendar({ className, selectedDate, onSelectDate, ...props }: CalendarProps) {
  const { username } = useParams<{ username: string }>();
  const [currentDate, setCurrentDate] = useState(set(new Date(), { date: 1 }));
  const [blockedDays, setBlockedDays] = useState<number[] | null>(null);

  const currentMonth = format(currentDate, 'MMMM');
  const currentYear = format(currentDate, 'y');

  function handlePreviousMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleNextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }

  const calendarWeeks = useMemo(() => {
    if (blockedDays === null) return [];

    const daysInMonthArray = Array.from({ length: getDaysInMonth(currentDate) }).map(
      (_, index) => set(currentDate, { date: index + 1 }),
    );
    const firstWeekDay = getDay(currentDate);
    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, index) => subDays(currentDate, index + 1))
      .reverse();
    const lastDayInCurrentMonth = set(currentDate, { date: getDaysInMonth(currentDate) });
    const lastWeekDay = getDay(lastDayInCurrentMonth);
    const nextMonthFillArray = Array.from({ length: 6 - lastWeekDay }).map((_, index) =>
      addDays(lastDayInCurrentMonth, index + 1),
    );
    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonthArray.map((date) => ({
        date,
        disabled:
          isBefore(endOfDay(date), new Date()) || blockedDays.includes(getDay(date)),
      })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ];
    return calendarDays.reduce<CalendarWeeks>((weeks, _, index, original) => {
      const isNewWeek = index % 7 === 0;

      if (isNewWeek) {
        weeks.push({
          week: index / 7 + 1,
          days: original.slice(index, index + 7),
        });
      }
      return weeks;
    }, []);
  }, [currentDate, blockedDays]);

  useEffect(() => {
    if (!currentDate) return;
    getUserBlockedDates({
      username,
      year: getYear(currentDate),
      month: getMonth(currentDate),
    })
      .then((result) => {
        if (result.error) {
          toast.error('Não foi possível carregar os horários disponíveis');
          return;
        }
        setBlockedDays(result.blockedWeekDays);
      })
      .catch((error) => console.error(error.message));
  }, [username, currentDate]);

  return (
    <div className={cn('flex flex-col gap-6 p-6', className)} {...props}>
      <div className="flex items-center justify-between px-1">
        <p className="font-medium capitalize">
          {currentMonth} <span className="text-muted-foreground">{currentYear}</span>
        </p>
        <div className="flex gap-2 text-muted-foreground">
          <button
            type="button"
            onClick={handlePreviousMonth}
            title="Mês anterior"
            className="rounded-sm leading-[0] ring-gray-100 hover:text-gray-100 focus:ring-2"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            title="Próximo mês"
            className="rounded-sm leading-[0] ring-gray-100 hover:text-gray-100 focus:ring-2"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
      <table className="w-full table-fixed border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-sm font-medium text-gray-200">DOM.</th>
            <th className="text-sm font-medium text-gray-200">SEG.</th>
            <th className="text-sm font-medium text-gray-200">TER.</th>
            <th className="text-sm font-medium text-gray-200">QUA.</th>
            <th className="text-sm font-medium text-gray-200">QUI.</th>
            <th className="text-sm font-medium text-gray-200">SEX.</th>
            <th className="text-sm font-medium text-gray-200">SÁB.</th>
          </tr>
        </thead>
        <tbody className="before:block before:bg-muted before:leading-3 before:text-transparent before:content-['.']">
          {calendarWeeks.map(({ week, days }, index) => (
            <tr key={`${week}-${index}`}>
              {days.map((day) => (
                <td key={day.date.toString()} className="relative">
                  <button
                    disabled={day.disabled}
                    onClick={() => onSelectDate(day.date)}
                    className={cn(
                      'aspect-square w-full rounded-sm bg-zinc-600 text-center ring-zinc-100 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 hover:disabled:bg-zinc-900',
                      {
                        'after:absolute after:bottom-3 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-white':
                          isToday(day.date),
                        'ring-2 ring-white': selectedDate === day.date,
                      },
                    )}
                  >
                    {getDate(day.date)}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Calendar };
