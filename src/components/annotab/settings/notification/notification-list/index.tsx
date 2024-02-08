import { useState } from 'react';

import Popup from '@/components/annotab/popup';

const NotificationList = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <ul className="my-[40px] rounded-[8px] border bg-mostly-white">
        <li className="flex items-center px-[20px] py-[12px]">
          <p className="flex items-center gap-[10px] text-[14px] font-normal text-dark-navy-blue">
            JohnDoe@gmail.com
            <span className="rounded-full border border-dark-pastel-green px-[15px] py-[1px] text-[14px] font-normal text-dark-pastel-green">
              Owner
            </span>
          </p>
        </li>
        <hr />
        <li className="flex items-center px-[20px] py-[15px] ">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            JohnDoe@gmail.com
          </p>
          <button
            type="button"
            className="ml-auto rounded-md border border-rusty-red bg-mostly-white px-[8px] py-[5px] text-[14px] font-normal text-rusty-red transition-all hover:bg-rusty-red hover:text-white"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
        </li>
      </ul>

      <Popup
        bgColor="bg-white"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        size="lg"
        forceClose
      >
        <div>
          <h6 className="mb-[5px] text-[14px] font-[600] text-rusty-red">
            Warning
          </h6>
          <p className="mb-[20px] text-[14px] font-normal text-dark-navy-blue">
            Are you sure you want to delete this dataset?
          </p>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-full border bg-white px-[20px] py-[6px] text-[14px] font-normal text-dark-navy-blue transition-all hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-full bg-dark-pastel-green px-[20px] py-[6px] text-[14px] font-normal text-white transition-all hover:bg-green-600"
            >
              Start
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default NotificationList;
