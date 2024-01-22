'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Sidebar = () => {
  const router = useRouter();

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
          <div className="justify-top flex h-1/3 flex-col items-center gap-y-4 overflow-y-auto overflow-x-hidden" />
          <div className="flex h-2/3 flex-col items-center justify-end gap-y-4 pb-3" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
