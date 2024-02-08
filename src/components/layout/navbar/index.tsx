'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex h-16 w-full flex-row border-b bg-mostly-white dark:bg-light-purple-grey">
      <div className="w-1/3" />
      <div className="flex w-1/3 flex-row items-center justify-center">
        <div className="flex w-full items-center">
          <div className="absolute rounded-xl border border-[#9EF3FF] bg-gradient-to-r from-[#9EF3FF] to-[#B6BEFF] px-3 py-2">
            <MagnifyingGlassIcon width={20} height={24} color="#fff" />
          </div>
          <input
            type="text"
            className="ml-2 w-full rounded-2xl bg-light-greyish px-4 py-2 pl-16 text-black shadow-inner shadow-black/10 placeholder:text-base placeholder:font-medium placeholder:text-black/50 focus:outline-none focus:ring-1 focus:ring-purple-navy-blue focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex w-1/3 flex-row items-center justify-end gap-x-8 px-5">
        <button
          type="button"
          className="mr-3 rounded-xl bg-gradient-to-r from-ocean-green to-neon-purple p-[1px]"
        >
          <span className="flex w-full rounded-xl bg-white p-1 px-7 text-neon-purple">
            Team
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
