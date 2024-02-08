'use client';

import AccountList from './account-list';
import AccountRoles from './account-roles';
import AccountSeats from './account-seats';

const SettingsAccount = () => {
  return (
    <>
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
    </>
  );
};

export default SettingsAccount;
