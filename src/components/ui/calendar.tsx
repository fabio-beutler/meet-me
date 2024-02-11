'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<'div'>;

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div data-id="calendar container" className={cn(className)} {...props}>
      <div data-id="calendar header">
        <p data-id="calendar title">
          Fevereiro <span>2024</span>
        </p>
        <div data-id="calendar actions">
          <button>
            <ChevronLeft />
          </button>
          <button>
            <ChevronRight />
          </button>
        </div>
      </div>
      <table data-id="calendar body">
        <thead>
          <tr>
            <th>DOM.</th>
            <th>SEG.</th>
            <th>TER.</th>
            <th>QUA.</th>
            <th>SEX.</th>
            <th>SÁB.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button data-id="calendar day"></button>
            </td>
            <td>
              <button data-id="calendar day"></button>
            </td>
            <td>
              <button data-id="calendar day"></button>
            </td>
            <td>
              <button data-id="calendar day"></button>
            </td>
            <td>
              <button data-id="calendar day">1</button>
            </td>
            <td>
              <button data-id="calendar day">2</button>
            </td>
            <td>
              <button data-id="calendar day">3</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
