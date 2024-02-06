import Link from 'next/link';
import React from 'react';

import ClassBarChart from '@/components/class-management/class-bar-chart';
import ClassTable from '@/components/class-management/class-table';

const Class = () => {
  return (
    <div className="ml-7 mt-3.5 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Link href="/classes">Classes</Link>
        <img src="/images/svg/right.png" alt="" className="h-4 w-4" />
        Class 01
      </div>
      <ClassTable />
      <ClassBarChart />
    </div>
  );
};

export default Class;
