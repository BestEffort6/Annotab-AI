'use client';

import Link from 'next/link';

import BillingCard from './billing-card';
import BillingTabs from './billing-tabs';

const SettingsBilling = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-5 overflow-y-auto px-7 py-11">
      <Link
        href="/"
        className="mb-[120px] ml-auto block rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
      >
        Go to your personal setting
      </Link>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Billing
      </h4>
      <hr />
      <BillingCard />
      <BillingTabs />
    </div>
  );
};

export default SettingsBilling;
