'use client';

import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

const ConsensusModal = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-y-2 px-4">
        <Tab.Group
          defaultIndex={0}
          as="div"
          className="relative rounded-2xl border bg-grey-purple-white shadow-inner"
        >
          <div className="w-full rounded-t-2xl bg-purple-grey">
            <p className="rounded-full bg-light-purple-grey px-3 py-1 text-base font-bold text-white">
              IoU
            </p>
          </div>
          <Tab.List className="flex w-full flex-row justify-center bg-transparent">
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-1/3 py-2 text-sm font-bold',
                  '',
                  selected
                    ? 'bg-transparent text-dark-navy-blue'
                    : 'bg-purple-grey text-white'
                )
              }
            >
              General
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-1/3 py-2 text-sm font-bold',
                  '',
                  selected
                    ? 'bg-transparent text-dark-navy-blue'
                    : 'bg-purple-grey text-white'
                )
              }
            >
              Types
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-1/3 py-2 text-sm font-bold',
                  '',
                  selected
                    ? 'bg-transparent text-dark-navy-blue'
                    : 'bg-purple-grey text-white'
                )
              }
            >
              Classes
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>

            <Tab.Panel>Content 2</Tab.Panel>

            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="flex flex-col gap-y-2 rounded-2xl bg-light-purple-grey px-4 py-2 shadow-lg">
        <button
          type="button"
          className="rounded-full bg-purple-grey py-1 text-base font-bold text-grey-purple-white"
        >
          Connect Models
        </button>
        <button
          type="button"
          className="rounded-full bg-grey-purple-white py-1 text-base font-bold text-dark-navy-blue shadow-inner"
        >
          Manage Models
        </button>
      </div>
    </div>
  );
};

export default ConsensusModal;
