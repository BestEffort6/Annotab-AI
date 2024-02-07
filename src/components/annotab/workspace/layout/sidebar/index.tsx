'use client';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import SidebarItem from '../sidebar-item';

const WorkspaceSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const menuItemsBottom = [
    {
      value: 'Settings',
      link: '/settings/billing',
      src: '/images/svg/icon/left-side-bar/icon-settings-greypuplewhite-light.svg',
      srcActive:
        '/images/svg/icon/left-side-bar/icon-settings-greypuplewhite-light.svg',
    },
  ];

  return (
    <div
      className={clsx(
        'relative flex h-full flex-col justify-between rounded-r-lg bg-mostly-white',
        !isOpen
          ? 'right-0 w-full max-w-16 justify-start transition-all duration-1000 ease-in'
          : 'left-0 w-full max-w-64 justify-start transition-all duration-1000 ease-out'
      )}
    >
      <div className="flex flex-col gap-y-6 py-12">
        <div className="ml-3 flex cursor-pointer items-center py-2 pl-3">
          <LazyLoadImage src="/images/svg/icon-overview-darknavyblue-light.svg" />
          <h1 className="ml-4 max-w-[64px] text-sm  font-semibold text-[#31374A] transition-all">
            {isOpen && 'Overview'}
          </h1>
        </div>

        <div className="ml-3 flex cursor-pointer items-center py-2 pl-3">
          <LazyLoadImage src="/images/svg/icon-dataset-darknavyblue-light.svg" />
          <h1 className="ml-4 max-w-[53px] text-sm  font-semibold text-[#31374A] transition-all">
            {isOpen && 'Dataset'}
          </h1>
        </div>

        <div className="ml-3 flex cursor-pointer items-center py-2 pl-3">
          <LazyLoadImage src="/images/svg/icon-workflow-darknavyblue-light.svg" />
          <h1 className="ml-4 max-w-[65px]  text-sm font-semibold text-[#31374A] transition-all">
            {isOpen && 'Workflow'}
          </h1>
        </div>
        <Link href="/classes">
          <div className="ml-3 flex cursor-pointer items-center rounded-s-full border bg-[#F8F8FB] py-2 pl-3">
            <LazyLoadImage src="/images/svg/icon-classmanagement-darknavyblue-light.svg" />
            <h1 className=" ml-4 text-sm font-semibold text-[#6821FF]">
              {isOpen && 'Class Management'}
            </h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-end gap-y-5 py-12">
        {menuItemsBottom.map((item) => (
          <SidebarItem key={item.value} item={item} isOpen={isOpen} />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={handleOpen}
          className="flex w-5 items-end justify-center rounded-l-xl rounded-r-sm bg-beacon-gray py-10 text-purple-grey"
        >
          {!isOpen ? (
            <ChevronDoubleRightIcon width={20} height={20} />
          ) : (
            <ChevronDoubleLeftIcon width={20} height={20} />
          )}
        </button>
      </div>
    </div>
  );
};
export default WorkspaceSidebar;
