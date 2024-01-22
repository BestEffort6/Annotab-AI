import { useState } from 'react';

import Popup from '@/components/annotab/popup';

const BillingEmailsTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ul className="my-[40px] rounded-[8px] border bg-mostly-white">
        <li className="flex items-center px-[20px] py-[12px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Email recipients
          </p>
          <button
            type="button"
            className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
            onClick={() => setIsOpen(true)}
          >
            Add
          </button>
        </li>
        <hr />
        <li className="flex items-center px-[20px] py-[15px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            JohnDoe@gmail.com
          </p>
        </li>
      </ul>
      <Popup
        bgColor="bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        forceClose
      >
        <form>
          <label
            htmlFor="email"
            className="mb-[20px] block text-[14px] font-normal text-dark-navy-blue"
          >
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
            />
          </label>
          <div className="text-end">
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white text-white transition-all hover:bg-pastel-purple"
            >
              Confirm
            </button>
          </div>
        </form>
      </Popup>
    </>
  );
};

export default BillingEmailsTab;
