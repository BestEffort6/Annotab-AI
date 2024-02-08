'use client';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

const people = [
  { name: 'Dataset 1' },
  { name: 'Dataset 2' },
  { name: 'Dataset 3' },
  { name: 'Dataset 4' },
  { name: 'Dataset 5' },
  { name: 'Dataset 6' },
];

const masks = [
  { name: 'Class 1', number: 20, type: 'polygon' },
  { name: 'Class 2', number: 20, type: 'bounding_box' },
  { name: 'Class 3', number: 20, type: 'polygon' },
  { name: 'Class 4', number: 20, type: 'bounding_box' },
  { name: 'Class 5', number: 20, type: 'polygon' },
  { name: 'Class 6', number: 20, type: 'polygon' },
];

const ListChart = () => {
  const [selected, setSelected] = useState(people[0] || undefined);

  return (
    <div className="flex w-full flex-row gap-x-5">
      <div className="flex h-full w-1/4 flex-col gap-y-4 rounded-lg bg-mostly-white p-5">
        <div className="w-full">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg border bg-mostly-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-navy-blue/10 sm:text-sm">
                <span className="block truncate">
                  {selected && selected?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.name}
                      className={({ active }) =>
                        `relative cursor-default select-none p-3 ${active}
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${selected} ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {person.name}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex h-full w-full flex-col gap-y-3 overflow-y-auto">
          {masks.map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-center justify-between pr-2"
            >
              <div className="flex flex-row items-center justify-center gap-x-3">
                <div className="h-5 w-9 rounded bg-black" />

                <p className="text-sm font-semibold text-dark-navy-blue">
                  {item.name}
                </p>
              </div>
              <p className="text-sm font-semibold text-dark-navy-blue">
                {item.number}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-full w-3/4 rounded-lg bg-mostly-white" />
    </div>
  );
};
export default ListChart;
