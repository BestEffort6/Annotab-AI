'use client';

import React, { useState } from 'react';

import Popup from '@/components/annotab/popup';

const DatasetManagementList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Dataset management
      </h4>
      <hr />
      <div className="mt-[35px] overflow-hidden rounded-[8px] border border-b-0">
        <table className=" w-full table-fixed">
          <thead>
            <tr className="border-b bg-[#F2F2F8]">
              <th className="p-2 text-start text-[14px] font-normal text-dark-navy-blue">
                9 Datasets
              </th>
              <th className="p-2"> {` `}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 text-[14px] font-normal text-dark-navy-blue">
                Dataset 01
              </td>
              <td className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-[14px] font-normal text-rusty-red transition-all hover:text-chili-red"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-[14px] font-normal text-dark-navy-blue">
                Dataset 01
              </td>
              <td className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-[14px] font-normal text-rusty-red transition-all hover:text-chili-red"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-[14px] font-normal text-dark-navy-blue">
                Dataset 01
              </td>
              <td className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-[14px] font-normal text-rusty-red transition-all hover:text-chili-red"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-[14px] font-normal text-dark-navy-blue">
                Dataset 01
              </td>
              <td className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-[14px] font-normal text-rusty-red transition-all hover:text-chili-red"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 text-[14px] font-normal text-dark-navy-blue">
                Dataset 01
              </td>
              <td className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="p-2 text-[14px] font-normal text-rusty-red transition-all hover:text-chili-red"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Popup
        bgColor="bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
              onClick={() => setIsOpen(false)}
              className="rounded-full border bg-white px-[20px] py-[6px] text-[14px] font-normal text-dark-navy-blue transition-all hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-rusty-red px-[20px] py-[6px] text-[14px] font-normal text-white transition-all hover:bg-chili-red"
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default DatasetManagementList;
