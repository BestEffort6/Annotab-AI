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
          <div className=" justify-top flex cursor-pointer flex-col items-center gap-y-4 overflow-y-auto overflow-x-hidden">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-3xl border bg-[#31374A0D] text-center text-xl font-semibold text-[#31374A] transition-all hover:bg-[#76799B]">
              O
            </div>
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border bg-[#76799B] text-center text-xl font-semibold text-[#31374A]">
              A
            </div>
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-3xl border bg-[#31374A0D] text-center text-xl font-semibold text-[#31374A]  transition-all hover:bg-[#76799B]">
              G
            </div>
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-3xl border bg-[#31374A0D] text-center text-xl font-semibold text-[#31374A]  transition-all hover:bg-[#76799B]">
              M
            </div>
          </div>
          <div className="flex h-2/3 flex-col items-center justify-end gap-y-4 pb-3">
            <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
              <LazyLoadImage
                src="/images/svg/icon-help-greypuplewhite-light.svg"
                className="flex h-[19px] w-[19px] "
              />
            </div>
            <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
              <LazyLoadImage
                src="/images/svg/icon-policy-greypuplewhite-light.svg"
                className="flex h-[17px] w-[17px] "
              />
            </div>
            <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
              <LazyLoadImage
                src="/images/svg/icon-settings-greypuplewhite-light.svg"
                className="flex h-[25px] w-[25px] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
