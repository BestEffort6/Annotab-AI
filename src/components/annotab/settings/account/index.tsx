'use client';

import Link from 'next/link';

import AccountList from './account-list';
import AccountRoles from './account-roles';
import AccountSeats from './account-seats';

const SettingsAccount = () => {
  return (
    <div className="w-2/4 pt-6 2xl:w-3/4">
      <Link
        href="/"
        className="mb-[120px] ml-auto block w-[260px] rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
      >
        Go to your personal setting
      </Link>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Account
      </h4>
      <hr />
      <div className="mb-[20px] mt-[35px] flex w-full gap-[20px]">
        <div className="w-[calc(50%-10px)]">
          <AccountRoles />
        </div>
        <div className="w-[calc(50%-10px)]">
          <AccountSeats />
        </div>
      </div>
      <AccountList />
    </div>
  );
};

export default SettingsAccount;
