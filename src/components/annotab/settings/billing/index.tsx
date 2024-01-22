'use client';

import BillingCard from './billing-card';
import BillingTabs from './billing-tabs';

const SettingsBilling = () => {
  return (
    <>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Billing
      </h4>
      <hr />
      <BillingCard />
      <BillingTabs />
    </>
  );
};

export default SettingsBilling;
