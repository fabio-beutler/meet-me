'use client';

import { addMonths, format, set, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<'div'>;

function Calendar({ className, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(set(new Date(), { date: 1 }));

  const currentMonth = format(currentDate, 'MMMM');
  const currentYear = format(currentDate, 'y');

  function handlePreviousMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleNextMonth() {
    setCurrentDate(addMonths(currentDate, 1));
  }

  return (
    <div className={cn('flex flex-col gap-6 p-6', className)} {...props}>
      <div className="flex items-center justify-between">
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
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            title="Próximo mês"
            className="rounded-sm leading-[0] ring-gray-100 hover:text-gray-100 focus:ring-2"
          >
            <ChevronRight className="size-5" />
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
            <th className="text-sm font-medium text-gray-200">SEX.</th>
            <th className="text-sm font-medium text-gray-200">SÁB.</th>
          </tr>
        </thead>
        <tbody className="before:block before:bg-muted before:leading-3 before:text-transparent before:content-['.']">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="aspect-square w-full rounded-sm bg-gray-600 text-center ring-gray-100 hover:bg-gray-500 focus:ring-2 disabled:cursor-default disabled:bg-none disabled:opacity-40 disabled:hover:bg-gray-600">
                1
              </button>
            </td>
            <td>
              <button
                disabled
                className="aspect-square w-full rounded-sm bg-gray-600 text-center ring-gray-100 hover:bg-gray-500 focus:ring-2 disabled:cursor-default disabled:bg-none disabled:opacity-40 disabled:hover:bg-gray-600"
              >
                2
              </button>
            </td>
            <td>
              <button
                disabled
                className="aspect-square w-full rounded-sm bg-gray-600 text-center ring-gray-100 hover:bg-gray-500 focus:ring-2 disabled:cursor-default disabled:bg-none disabled:opacity-40 disabled:hover:bg-gray-600"
              >
                3
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
