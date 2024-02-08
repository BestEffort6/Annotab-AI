import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const listUser = [
  {
    name: 'James Adams',
  },
  {
    name: 'Henry Worker',
  },
  {
    name: 'Henry Worker 1',
  },
  {
    name: 'Henry Worker 2',
  },
  {
    name: 'Henry Worker 3',
  },
  {
    name: 'Henry Worker 4',
  },
  {
    name: 'Henry Worker 5',
  },
];

const listClass = [
  {
    name: 'Head',
    icon: '/images/svg/icon/model/icon-polygon-seagreen-light.svg',
  },
  {
    name: 'Wings',
    icon: '/images/svg/icon/model/icon-polygon-seagreen-light.svg',
  },
  {
    name: 'Claws',
    icon: '/images/svg/icon/model/icon-polygon-seagreen-light.svg',
  },
];

const AnnotateModal = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const listTab = useMemo(
    () => [
      {
        label: 'Classes',
      },
      {
        label: 'Annotators',
      },
    ],
    []
  );
  return (
    <div className="flex w-full px-4 py-2">
      <Tab.Group as="div" className="w-full rounded-lg border">
        <Tab.List
          className={clsx(
            'relative block w-full rounded-3xl ',
            currentTab === 0 || currentTab === 3
              ? 'bg-grey-purple-white'
              : 'bg-light-purple-grey'
          )}
        >
          {listTab.map((item: any, index: number) => (
            <Tab
              key={item.label}
              onClick={() => setCurrentTab(index)}
              className={({ selected }) =>
                clsx(
                  'w-1/2 py-3 text-base font-bold leading-5 ',
                  'focus:outline-none',
                  selected
                    ? 'rounded-r-lg bg-grey-purple-white text-dark-navy-blue'
                    : 'bg-light-purple-grey text-grey-purple-white dark:bg-purple-grey',
                  !selected && index === 0
                    ? 'rounded-l-lg'
                    : !selected && index === 1
                      ? 'rounded-r-lg'
                      : ''
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels as="div" className="w-full">
          <Tab.Panel className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="w-full overflow-y-auto overflow-x-hidden px-6 py-2 text-black"
            >
              <div className="flex flex-col gap-y-2">
                <input
                  type="search"
                  name="search"
                  className="w-full rounded-lg border px-4 shadow-inner placeholder:font-medium placeholder:text-dark-navy-blue/25 focus:border-dark-navy-blue focus:outline-none focus:ring-1 focus:ring-dark-navy-blue"
                  placeholder="Search classes"
                />
                <div className="flex flex-col gap-y-1">
                  {listClass.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-row items-center gap-x-3"
                    >
                      <LazyLoadImage src={item.icon} alt="" effect="blur" />
                      <p className="text-base font-medium text-dark-navy-blue">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tab.Panel>
          <Tab.Panel className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="w-full overflow-y-auto overflow-x-hidden px-6 py-2 text-black"
            >
              <div className="flex flex-col gap-y-2">
                <input
                  type="search"
                  name="search"
                  className="w-full rounded-lg border px-4 shadow-inner placeholder:font-medium placeholder:text-dark-navy-blue/25 focus:border-dark-navy-blue focus:outline-none focus:ring-1 focus:ring-dark-navy-blue"
                  placeholder="Search users"
                />
                <div className="flex flex-col gap-y-1">
                  {listUser.map((item) => (
                    <p
                      key={item.name}
                      className="text-base font-medium text-dark-navy-blue"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AnnotateModal;
