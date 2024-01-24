import { Checkbox } from '@nextui-org/react';
import { useState } from 'react';

import Popup from '@/components/annotab/popup';

const AccountList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  const handleLinkClick = () => {
    setIsLabelOpen(true);
  };
  return (
    <>
      <div className="relative">
        <div className="mb-[18px] flex items-end gap-[5px]">
          <div className="w-full max-w-[300px]">
            <label
              htmlFor="AccountSearch"
              className="block text-[14px] font-normal text-dark-navy-blue"
            >
              User name/email
              <input
                type="search"
                id="AccountSearch"
                name="AccountSearch"
                placeholder="search"
                className="mt-[6px] block w-full rounded-[8px] border border-dark-navy-blue/10 bg-mostly-white p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
              />
            </label>
          </div>
          <div className="ml-auto flex flex-wrap gap-[10px]">
            <button
              type="button"
              className="rounded-md border border-rusty-red bg-mostly-white px-[16px] py-[4px] text-[14px] font-normal text-rusty-red transition-all hover:bg-rusty-red hover:text-white"
            >
              Deactivate
            </button>
            <button
              type="button"
              className="rounded-md border border-rusty-red bg-mostly-white px-[16px] py-[4px] text-[14px] font-normal text-rusty-red transition-all hover:bg-rusty-red hover:text-white"
            >
              Delete
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[4px] text-[14px] font-normal text-dark-navy-blue"
              type="button"
            >
              Add People
            </button>
          </div>
        </div>
        <h6 className="text-[14px] font-normal text-dark-navy-blue">
          Showing: 4 results
        </h6>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-dark-navy-blue/25">
              <th className="px-[10px] py-[15px] text-start">
                <Checkbox>{` `}</Checkbox>
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Name
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Email
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                User role
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Status
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Joined
              </th>
              <th className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Last active
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-dark-navy-blue/25">
              <td className="px-[10px] py-[15px] text-start">
                <Checkbox>{` `}</Checkbox>
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                John Doe
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                JohnDoe@gmail.com
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Admin
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Pending
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
            </tr>
            <tr className="border-b border-dark-navy-blue/25">
              <td className="px-[10px] py-[15px] text-start">
                <Checkbox>{` `}</Checkbox>
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                John Doe
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                JohnDoe@gmail.com
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Admin
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Pending
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
            </tr>
            <tr className="border-b border-dark-navy-blue/25">
              <td className="px-[10px] py-[15px] text-start">
                <Checkbox>{` `}</Checkbox>
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                John Doe
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                JohnDoe@gmail.com
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Admin
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Pending
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
            </tr>
            <tr className="border-b border-dark-navy-blue/25">
              <td className="px-[10px] py-[15px] text-start">
                <Checkbox>{` `}</Checkbox>
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                John Doe
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                JohnDoe@gmail.com
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Admin
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                Pending
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
              <td className="px-[10px] py-[15px] text-start text-[14px] font-normal text-dark-navy-blue">
                DD MM,YYYY
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Popup
        bgColor="bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        forceClose
      >
        <h6 className="mb-[20px] text-[16px] font-[600] text-dark-navy-blue">
          Invite people as Member
        </h6>
        <form>
          <label
            htmlFor="email"
            className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue"
          >
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
            />
          </label>
          {!isLabelOpen && (
            <button
              type="button"
              onClick={handleLinkClick}
              className="text-[12px] font-normal text-dark-navy-blue/50 underline transition-all hover:text-dark-navy-blue"
            >
              or Invite people as Guest
            </button>
          )}
          {isLabelOpen && (
            <label
              htmlFor="Role"
              className="mb-[20px] mt-[10px] block text-[14px] font-normal text-dark-navy-blue"
            >
              Role
              <select
                id="Role"
                name="Role"
                className="bg-gray-purple-white mt-[5px] block h-[34px] w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
              >
                <option value="">1</option>
                <option value="">1</option>
                <option value="">3</option>
              </select>
            </label>
          )}
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

export default AccountList;
