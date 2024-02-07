import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

import { ClassBarChart } from '@/components/class-management/class-bar-chart';
import ClassTable from '@/components/class-management/class-table';

const Class = () => {
  return (
    <div className="ml-7 mt-3.5 flex flex-col gap-5">
      <div className="flex items-center gap-3 text-purple-grey">
        <Link href="/classes">Classes</Link>
        <ChevronDoubleRightIcon height={18} color="#9798AD" />
        Class 01
      </div>
      <ClassTable />
      <ClassBarChart />
    </div>
  );
};

export default Class;
