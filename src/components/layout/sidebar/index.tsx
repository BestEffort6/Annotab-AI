'use client';

import { FolderIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import SidebarItem from '../sidebar-item';

const Sidebar = () => {
  const router = useRouter();

  const menuItemsTop = [
    {
      value: 'Workspace',
      link: '/',
      icon: <FolderIcon />,
    },
  ];

  const menuItemsBottom = [
    {
      value: 'information',
      src: '/images/svg/icon/left-side-bar/icon-help-greypuplewhite-light.svg',
      link: 'https://docs.annotab.com',
    },
    {
      value: 'privacy',
      src: '/images/svg/icon/left-side-bar/icon-policy-greypuplewhite-light.svg',
      link: 'https://annotab.com',
    },
    {
      value: 'setting',
      link: '/',
      src: '/images/svg/icon/left-side-bar/icon-settings-greypuplewhite-light.svg',
    },
  ];

  return (
    <div className="h-screen w-[71px] bg-gradient-to-t from-grey-purple-white to-mostly-white">
      <div className="flex h-full w-full flex-col items-center gap-y-10 rounded-r-lg border-r bg-mostly-white py-3 dark:bg-purple-grey">
        <LazyLoadImage
          src="/images/svg/logo-icon-dark.svg"
          className="z-20 mb-3 h-11 w-11 cursor-pointer"
          effect="blur"
          onClick={() => router.push('/')}
        />
        <div className="h-full w-full">
          <div className="justify-top flex h-1/3 flex-col items-center gap-y-4 overflow-y-auto overflow-x-hidden">
            {menuItemsTop.map((item) => (
              <SidebarItem key={item.value} item={item} />
            ))}
          </div>
          <div className="flex h-2/3 flex-col items-center justify-end gap-y-4 pb-3">
            {menuItemsBottom.map((item) => (
              <a
                aria-label={item.value}
                target="_blank"
                href={item.link}
                key={item.value}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-light-greyish text-left text-grey-purple-white shadow-inner transition-all duration-75 ease-in-out"
              >
                <LazyLoadImage src={item.src} effect="blur" alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
