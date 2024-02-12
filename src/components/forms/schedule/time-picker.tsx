export function TimePicker() {
  return (
    <div className="border-l-1 absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-gray-600 px-6 pt-6">
      <p className="font-medium">
        terça-feira <span className="text-gray-200">20 de setembro</span>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1">
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          08:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          09:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          10:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          11:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          12:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          13:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          14:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          15:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100">
          16:00h
        </button>
        <button
          className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100 ring-gray-100 last:mb-6 hover:bg-gray-500 focus:ring-2 disabled:cursor-default disabled:bg-none disabled:opacity-40 disabled:hover:bg-gray-600"
          disabled
        >
          17:00h
        </button>
        <button className="rounded-sm bg-gray-600 py-2 text-sm leading-relaxed text-gray-100 ring-gray-100 last:mb-6 hover:bg-gray-500 focus:ring-2 disabled:cursor-default disabled:bg-none disabled:opacity-40 disabled:hover:bg-gray-600">
          18:00h
        </button>
      </div>
    </div>
  );
}
