import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import BillingEmailsTab from '../billing-emails-tab';
import BillingOverviewTab from '../billing-overview-tab';
import BillingPaymentinfoTab from '../billing-paymentinfo-tab';

const BillingTabs = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-[30px] px-[10px]">
        <Tab
          className={({ selected }) =>
            clsx(
              'relative px-[4px] pb-[9px] text-[14px] text-dark-navy-blue transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:content-[""] focus:outline-none',
              selected ? 'font-[500] after:bg-sea-green' : 'font-normal'
            )
          }
        >
          Overview
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx(
              'relative px-[4px] pb-[9px] text-[14px] text-dark-navy-blue transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:content-[""] focus:outline-none',
              selected ? 'font-[500] after:bg-sea-green' : 'font-normal'
            )
          }
        >
          Billing emails
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx(
              'relative px-[4px] pb-[9px] text-[14px] text-dark-navy-blue transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:content-[""] focus:outline-none',
              selected ? 'font-[500] after:bg-sea-green' : 'font-normal'
            )
          }
        >
          Payment infomation
        </Tab>
      </Tab.List>
      <hr />
      <Tab.Panels>
        <Tab.Panel>
          <BillingOverviewTab />
        </Tab.Panel>
        <Tab.Panel>
          <BillingEmailsTab />
        </Tab.Panel>
        <Tab.Panel>
          <BillingPaymentinfoTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default BillingTabs;
