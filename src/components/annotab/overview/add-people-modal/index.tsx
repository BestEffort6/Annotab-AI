import { Dialog, Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useState } from 'react';

import Popup from '../../popup';

type RoleMember = {
  role: string;
};

const AddPeopleModal = ({
  loading = false,
  isOpen,
  setIsOpen,
  handleSave,
  title,
  executeBtn,
  size = 'md',
  roleMember,
}: {
  loading?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: () => void;
  title: string;
  executeBtn: string;
  roleMember: RoleMember[];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}) => {
  const [selected, setSelected] = useState(roleMember[0] || undefined);

  return (
    <Popup
      bgColor="bg-grey-purple-white"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={size}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2">
        <form className="flex flex-col gap-y-2 py-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium text-dark-navy-blue">Email</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="focus:dark-navy-blue/50 focus:dark-navy-blue/50 block w-full rounded-lg border border-dark-navy-blue/10 bg-grey-purple-white px-3 py-2 text-sm font-normal text-dark-navy-blue"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="text-sm font-medium text-dark-navy-blue">Role</p>

            <Listbox value={selected} onChange={setSelected}>
              <div className="relative flex flex-col">
                <Listbox.Button className="z-50 flex w-full cursor-default flex-row items-center justify-between rounded-lg border bg-grey-purple-white p-3 py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-navy-blue/10 sm:text-sm">
                  <span className="block truncate">
                    {selected && selected?.role}
                  </span>
                  <span className="pointer-events-non flex items-center">
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
                  <Listbox.Options className="z-10 -mt-8 max-h-44 w-full overflow-auto rounded-md border-x border-b bg-grey-purple-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <div className="pt-8">
                      {roleMember.map((person) => (
                        <Listbox.Option
                          key={person.role}
                          className={({ active }) =>
                            `relative cursor-default select-none p-3 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.role}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </div>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </form>
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <button
          disabled={loading}
          type="button"
          className={clsx(
            loading
              ? 'bg-neon-purple/30 text-gray-300'
              : 'bg-neon-purple text-grey-purple-white hover:bg-neon-purple/80',
            'inline-flex justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
          onClick={handleSave}
        >
          {executeBtn}
        </button>
      </div>
    </Popup>
  );
};

export default AddPeopleModal;
