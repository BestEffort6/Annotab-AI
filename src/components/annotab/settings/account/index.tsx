'use client';

import AccountList from './AccountList';
import AccountRoles from './AccountRoles';
import AccountSeats from './AccountSeats';

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
