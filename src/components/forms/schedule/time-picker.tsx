import { format } from 'date-fns';

interface TimePickerProps {
  selectedDate: Date | null;
}

export function TimePicker(props: TimePickerProps) {
  const weekDay = props.selectedDate ? format(props.selectedDate, 'EEEE') : null;
  const month = props.selectedDate ? format(props.selectedDate, "dd 'de' MMMM") : null;
  return (
    <div className="border-l-1 absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-zinc-600 px-6 pt-6">
      <p className="font-medium">
        {weekDay}, <span className="text-zinc-200">{month}</span>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1">
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          08:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          09:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          10:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          11:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          12:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          13:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          14:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          15:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          16:00h
        </button>
        <button
          className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900"
          disabled
        >
          17:00h
        </button>
        <button className="rounded-sm bg-zinc-600 py-2 text-sm leading-relaxed text-zinc-100 ring-zinc-100 last:mb-6 hover:bg-zinc-500 focus:ring-2 disabled:cursor-default disabled:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900">
          18:00h
        </button>
      </div>
    </div>
  );
}
