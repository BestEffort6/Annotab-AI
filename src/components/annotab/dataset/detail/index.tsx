'use client';

import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

import DataList from './dataList';

interface ListTabProps {
  label: string;
  layout: JSX.Element;
}

interface DatasetDetailProps {
  datasetId: string;
}

const DatasetDetail = ({ datasetId }: DatasetDetailProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  const listTab = useMemo(
    () => [
      {
        label: 'Data',
        layout: <DataList datasetId={datasetId} />,
      },
      {
        label: 'Workflow',
        layout: <div>Workflow</div>,
      },
      {
        label: 'Version',
        layout: <div>Version</div>,
      },
    ],
    []
  );

  return (
    <div className="block h-full w-full">
      <Tab.Group as="div" className="h-full w-full">
        <Tab.List className="flex w-full flex-row">
          {listTab.map((item: ListTabProps, index: number) => (
            <Tab
              key={item.label}
              onClick={() => setCurrentTab(index)}
              className={({ selected }) =>
                clsx(
                  ' w-1/3 py-3 text-base font-bold leading-5 text-dark-navy-blue focus:outline-none',
                  selected
                    ? 'relative bg-transparent'
                    : 'bg-mostly-white dark:bg-purple-grey'
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels as="div" className="h-full w-full">
          {listTab.map((item: ListTabProps, index: number) => (
            <Tab.Panel key={item.label} className="h-full w-full">
              {currentTab === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.3 }}
                  className="h-[calc(100vh-104px)] w-full overflow-y-auto overflow-x-hidden px-7 py-4 text-black"
                >
                  {item.layout}
                </motion.div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DatasetDetail;
