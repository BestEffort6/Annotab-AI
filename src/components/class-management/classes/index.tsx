'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

import { useClasses } from '@/hooks/queries/useClasses';
import type { Classes } from '@/interfaces/classes';

const ClassesName = () => {
  const { data: session } = useSession();
  const { data: classesData } = useClasses(session?.user.access.token);

  return (
    <>
      <div className="flex items-center justify-between pb-7">
        <h1 className=" text-dark_navy_blue text-base font-semibold leading-5">
          Classes
        </h1>
        <button
          type="button"
          className="text-dark_navy_blue border-dark_navy_blue rounded-lg border border-opacity-10 bg-white px-6 py-2 text-sm font-semibold"
        >
          + Create New Class
        </button>
      </div>
      <div className="flex w-full flex-wrap gap-11">
        {classesData?.data?.map((item: Classes) => (
          <Link
            href={`/class/${item.id}`}
            className="w-full max-w-card-width"
            key={item.id}
          >
            <div className="border-dark_navy_blue h-card-height w-full max-w-card-width rounded-lg border border-opacity-10 bg-white">
              <div
                className="mb-1 ml-3 mr-3 mt-3 h-inner-card-height rounded-lg border"
                style={{ backgroundColor: item.color }}
              />
              <h1 className="text-dark_navy_blue ml-3 w-full text-sm font-semibold">
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ClassesName;
