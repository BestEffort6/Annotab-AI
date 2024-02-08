import { useState } from 'react';

import type { Workspace } from '@/interfaces/workspace';

import PlanBoxs from '../plan-boxs';

type BillingOverviewTabProps = {
  currentWorkspace: Workspace;
};

const BillingOverviewTab = ({ currentWorkspace }: BillingOverviewTabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="my-[25px] text-end">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white transition-all hover:bg-pastel-purple"
        >
          Change plan
        </button>
      </div>
      <div />
      <h5 className="mb-[10px] text-[14px] font-[600] text-dark-navy-blue">
        Plan detail
      </h5>
      <div className="mb-[18px] rounded-[8px] border bg-mostly-white p-[20px]">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Current plan
              </th>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Billing Period
              </th>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Renewal date
              </th>
              <th className="pb-[5px] text-end text-[14px] font-normal text-dark-navy-blue">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[14px] text-dark-navy-blue">Pro</td>
              <td className="text-[14px] text-dark-navy-blue">Monthly</td>
              <td className="text-[14px] text-dark-navy-blue">DD MM,YYYY</td>
              <td className="text-end text-[14px] text-dark-navy-blue">
                $0.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h5 className="mb-[10px] text-[14px] font-[600] text-dark-navy-blue">
        Products
      </h5>
      <div className="mb-[18px] rounded-[8px] border bg-mostly-white p-[20px]">
        <h6 className="mb-[10px] text-[14px] font-normal text-dark-navy-blue">
          Work management
        </h6>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Seats
              </th>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Admins
              </th>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Members
              </th>
              <th className="pb-[5px] text-start text-[14px] font-normal text-dark-navy-blue">
                Guests
              </th>
              <th className="pb-[5px] text-end text-[14px] font-normal text-dark-navy-blue">
                Renewal amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[14px] text-dark-navy-blue">0</td>
              <td className="text-[14px] text-dark-navy-blue">0</td>
              <td className="text-[14px] text-dark-navy-blue">0</td>
              <td className="text-[14px] text-dark-navy-blue">0</td>
              <td className="text-end text-[14px] text-dark-navy-blue">
                $0.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <PlanBoxs
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        currentWorkspace={currentWorkspace}
      />
    </>
  );
};

export default BillingOverviewTab;
