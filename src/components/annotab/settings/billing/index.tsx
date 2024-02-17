'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useCurrentWorkspace } from '@/hooks/queries/useCurrentWorkspace';

import BillingCard from './billing-card';
import BillingTabs from './billing-tabs';

const SettingsBilling = () => {
  const { data: session } = useSession();

  const { data } = useCurrentWorkspace(session?.user.access.token);

  return (
    <div className="w-2/4 pt-6 2xl:w-3/4">
      <Link
        href="/"
        className="mb-[120px] ml-auto block w-[260px] rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-[14px] text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
      >
        Go to your personal setting
      </Link>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Billing
      </h4>
      <hr />
      <BillingCard />
      {data && <BillingTabs currentWorkspace={data.data} />}
    </div>
  );
};

export default SettingsBilling;
