'use client';

import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useClass } from '@/hooks/queries/useClass';
import type { IClass } from '@/interfaces/class';

import ClassBarChart from '../class-bar-chart';
import ClassTable from '../class-table';

const ClassDetails = () => {
  const { classId } = useParams();
  const { data: session } = useSession();
  const { data: classData } = useClass(
    session?.user.access.token,
    classId as string
  );

  return (
    <div className="ml-7 mt-3.5 flex flex-col gap-5">
      <div className="flex items-center gap-3 text-purple-grey">
        <Link href="/classes">Classes</Link>
        <ChevronDoubleRightIcon height={18} color="#9798AD" />
        {classData?.data?.name ?? ''}
      </div>
      <ClassTable classData={classData?.data ?? ({} as IClass)} />
      <div className="flex h-[396px] w-full max-w-[1051px] flex-col items-center justify-start gap-2 rounded-lg border bg-mostly-white px-[15px] pt-3">
        <p className="w-full text-sm font-semibold">Dataset Distribution</p>
        <ClassBarChart />
      </div>
    </div>
  );
};

export default ClassDetails;
