import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import CheckoutModal from '@/components/annotab/payment/checkout-modal';
import { useSubscriptions } from '@/hooks/queries/useSubscriptions';
import type { Subscription } from '@/interfaces/subscription';
import type { Workspace } from '@/interfaces/workspace';

import PlanBoxs from '../plan-boxs';

type BillingOverviewTabProps = {
  currentWorkspace: Workspace;
};

const BillingOverviewTab = ({ currentWorkspace }: BillingOverviewTabProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    Subscription | undefined
  >();

  const { data } = useSubscriptions(session?.user.access.token);

  useEffect(() => {
    if (data && currentWorkspace.subscriptionId) {
      setSelectedSubscription(
        data.data.find((item) => item.id === currentWorkspace.subscriptionId)
      );
    }
  }, [data, currentWorkspace]);

  const handlePayment = () => {
    setIsOpen(false);
    setIsPaymentOpen(true);
  };

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

      {data && (
        <PlanBoxs
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          selectedSubscription={selectedSubscription}
          setSelectedSubscription={setSelectedSubscription}
          subscriptions={data.data}
          handlePayment={handlePayment}
        />
      )}

      {selectedSubscription && (
        <CheckoutModal
          isOpen={isPaymentOpen}
          setIsOpen={setIsPaymentOpen}
          selectedSubscription={selectedSubscription}
        />
      )}
    </>
  );
};

export default BillingOverviewTab;
