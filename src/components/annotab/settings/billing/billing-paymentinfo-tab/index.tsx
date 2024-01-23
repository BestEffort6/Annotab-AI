import {
  ArrowDownTrayIcon,
  CheckIcon,
  CreditCardIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { FaCcMastercard } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';

import Popup from '@/components/annotab/popup';

const BillingPaymentinfoTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  return (
    <>
      <div className="my-[40px]">
        <div className="mb-[20px] rounded-[8px] border bg-mostly-white p-[18px]">
          <div className="mb-[5px] flex items-center">
            <p className="text-[14px] font-[600] text-dark-navy-blue">
              Billing information
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
            >
              Edit
            </button>
          </div>
          <p className="text-[14px] font-normal text-dark-navy-blue">XXXXX</p>
          <p className="text-[14px] font-normal text-dark-navy-blue">XXXXX</p>
          <p className="text-[14px] font-normal text-dark-navy-blue">XXXXX</p>
          <p className="text-[14px] font-normal text-dark-navy-blue">XXXXX</p>
        </div>
        <div className="mb-[20px] rounded-[8px] border bg-mostly-white p-[18px]">
          <div className="mb-[5px] flex items-center">
            <p className="text-[14px] font-[600] text-dark-navy-blue">
              Payment method
            </p>
            <Link
              href="/"
              className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
            >
              Add
            </Link>
          </div>
          <div className="flex flex-wrap gap-[14px]">
            <div className="w-[calc(33.33%-9.6px)] rounded-[8px] border bg-mostly-white p-[15px]">
              <div className="flex gap-[10px]">
                <CreditCardIcon width={20} />
                <div>
                  <h5 className="text-[14px] font-normal text-dark-navy-blue">
                    Visa
                  </h5>
                  <p className="text-[14px] font-normal text-dark-navy-blue">
                    XXX
                  </p>
                </div>
                <h6 className="ml-auto text-[14px] font-normal text-neon-purple">
                  Primary
                </h6>
              </div>
              <div className="text-end">
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  type="button"
                  className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="w-[calc(33.33%-9.6px)] rounded-[8px] border bg-mostly-white p-[15px]">
              <div className="flex gap-[10px]">
                <CreditCardIcon width={20} />
                <div>
                  <h5 className="text-[14px] font-normal text-dark-navy-blue">
                    Visa
                  </h5>
                  <p className="text-[14px] font-normal text-dark-navy-blue">
                    XXX
                  </p>
                </div>
                <h6 className="ml-auto text-[14px] font-normal text-neon-purple">
                  Primary
                </h6>
              </div>
              <div className="text-end">
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  type="button"
                  className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="w-[calc(33.33%-9.6px)] rounded-[8px] border bg-mostly-white p-[15px]">
              <div className="flex gap-[10px]">
                <CreditCardIcon width={20} />
                <div>
                  <h5 className="text-[14px] font-normal text-dark-navy-blue">
                    Visa
                  </h5>
                  <p className="text-[14px] font-normal text-dark-navy-blue">
                    XXX
                  </p>
                </div>
                <h6 className="ml-auto text-[14px] font-normal text-neon-purple">
                  Primary
                </h6>
              </div>
              <div className="text-end">
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  type="button"
                  className="ml-auto rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[20px] rounded-[8px] border bg-mostly-white p-[18px]">
          <h5 className="text-[14px] font-[600] text-dark-navy-blue">
            Payment history
          </h5>
          <table className="w-full table-auto">
            <thead>
              <tr className="border bg-[#F2F2F8]">
                <th className="px-2">{` `}</th>
                <th className="px-2 py-[10px] text-start text-[14px] font-normal text-dark-navy-blue">
                  ID
                </th>
                <th className="px-2 py-[10px] text-start text-[14px] font-normal text-dark-navy-blue">
                  Date
                </th>
                <th className="px-2 py-[10px] text-start text-[14px] font-normal text-dark-navy-blue">
                  Payment method
                </th>
                <th className="px-2 py-[10px] text-start text-[14px] font-normal text-dark-navy-blue">
                  Amount
                </th>
                <th className="px-2 py-[10px] text-start text-[14px] font-normal  text-dark-navy-blue">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <CheckIcon
                    width={14}
                    height={14}
                    className="text-dark-navy-blue"
                  />
                  {` `}
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  XXX
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  YYYY-MM-DD
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <p className="flex gap-[5px]">
                    <CreditCardIcon width={20} /> Visa ending in XXX
                  </p>
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  $0.00
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <div className="flex gap-2">
                    <Link href="/">
                      <ArrowDownTrayIcon width={18} />
                    </Link>
                    <Link href="/">
                      <EyeIcon width={18} />
                    </Link>
                  </div>
                  {` `}
                </td>
              </tr>
              <tr className="border bg-[#F2F2F8]">
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  <CheckIcon
                    width={14}
                    height={14}
                    className="text-rusty-red"
                  />
                  {` `}
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  XXX
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  YYYY-MM-DD
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  <p className="flex gap-[5px]">
                    <CreditCardIcon width={20} /> Visa ending in XXX
                  </p>
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  $0.00
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-rusty-red">
                  <div className="flex gap-2">
                    <Link href="/">
                      <ArrowDownTrayIcon width={18} />
                    </Link>
                    <Link href="/">
                      <EyeIcon width={18} />
                    </Link>
                  </div>
                  {` `}
                </td>
              </tr>
              <tr className="border">
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <CheckIcon
                    width={14}
                    height={14}
                    className="text-dark-navy-blue"
                  />
                  {` `}
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  XXX
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  YYYY-MM-DD
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <p className="flex gap-[5px]">
                    <CreditCardIcon width={20} /> Visa ending in XXX
                  </p>
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  $0.00
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <div className="flex gap-2">
                    <Link href="/">
                      <ArrowDownTrayIcon width={18} />
                    </Link>
                    <Link href="/">
                      <EyeIcon width={18} />
                    </Link>
                  </div>
                  {` `}
                </td>
              </tr>
              <tr className="border">
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <CheckIcon
                    width={14}
                    height={14}
                    className="text-dark-navy-blue"
                  />
                  {` `}
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  XXX
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  YYYY-MM-DD
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <p className="flex gap-[5px]">
                    <CreditCardIcon width={20} /> Visa ending in XXX
                  </p>
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  $0.00
                </td>
                <td className="px-2 py-[10px]  text-[14px] font-normal text-dark-navy-blue">
                  <div className="flex gap-2">
                    <Link href="/">
                      <ArrowDownTrayIcon width={18} />
                    </Link>
                    <Link href="/">
                      <EyeIcon width={18} />
                    </Link>
                  </div>
                  {` `}
                </td>
              </tr>
            </tbody>
          </table>
          <Link
            href="/"
            className="mt-[20px] inline-block rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
          >
            View entire payment history
          </Link>
        </div>
      </div>
      <Popup
        bgColor="bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        forceClose
      >
        <div>
          <h6 className="mb-[23px] text-[14px] font-normal text-dark-navy-blue">
            Billing infomation
          </h6>
          <form>
            <label
              htmlFor="FullName"
              className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
            >
              Full name
              <input
                type="text"
                id="FullName"
                name="FullName"
                className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
              />
            </label>
            <label
              htmlFor="Address"
              className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
            >
              Address
              <input
                type="text"
                id="Address"
                name="Address"
                className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
              />
            </label>
            <label
              htmlFor="Country"
              className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
            >
              Country
              <input
                type="text"
                id="Country"
                name="Country"
                className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
              />
            </label>
            <div className="flex flex-wrap gap-[20px]">
              <div className="w-[calc(50%-10px)]">
                <label
                  htmlFor="Country"
                  className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
                >
                  Country
                  <select
                    id="Location"
                    name="Location"
                    className="bg-gray-purple-white mt-[5px] block h-[34px] w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
                  >
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">3</option>
                  </select>
                </label>
              </div>
              <div className="w-[calc(50%-10px)]">
                <label
                  htmlFor="Zipcode"
                  className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
                >
                  Zip code
                  <input
                    type="text"
                    id="Zipcode"
                    name="Zipcode"
                    className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="mt-[10px] text-end">
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white text-white transition-all hover:bg-pastel-purple"
            >
              Submit
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        bgColor="bg-white"
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        size="md"
        forceClose
      >
        <div>
          <h6 className="mb-[23px] text-[14px] font-normal text-dark-navy-blue">
            Payment method
          </h6>
          <form>
            <div className="mb-[20px] max-w-[150px] rounded-[8px] border border-dark-navy-blue/10 p-1.5 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
              <CreditCardIcon width={20} />
              <p className="mt-[6px] text-[14px] font-normal text-dark-navy-blue">
                Card
              </p>
            </div>
            <p className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue">
              Card infomation
            </p>
            <div className="bg-gray-purple-white mb-[12px] overflow-hidden rounded-[8px] border border-dark-navy-blue/10 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
              <div className="relative">
                <input
                  type="text"
                  id="CardNumber"
                  name="CardNumber"
                  placeholder="1234 1234 1234 1234"
                  className="block h-[32px] w-full border-b border-dark-navy-blue/10 p-1.5 text-sm text-gray-900   focus:outline-none"
                />
                <div className="absolute right-[10px] top-[50%] flex translate-y-[-50%] gap-[5px]">
                  <FaCcMastercard />
                  <RiVisaLine />
                </div>
              </div>
              <div className="flex flex-wrap">
                <input
                  type="text"
                  id="date"
                  name="date"
                  placeholder="MM / YY"
                  className="block h-[32px] w-[calc(50%)] border-r border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:outline-none"
                />
                <input
                  type="text"
                  id="CVC"
                  name="CVC"
                  placeholder="CVC"
                  className="block h-[32px] w-[calc(50%)] p-1.5 text-sm text-gray-900 focus:outline-none"
                />
              </div>
            </div>
            <label
              htmlFor="NameOnCard"
              className="mb-[12px] block text-[14px] font-normal text-dark-navy-blue"
            >
              Name on card
              <input
                type="text"
                id="NameOnCard"
                name="NameOnCard"
                placeholder="John Doe"
                className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
              />
            </label>
            <p className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue">
              Payment address
            </p>
            <div className="bg-gray-purple-white overflow-hidden rounded-[8px] border border-dark-navy-blue/10 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
              <select
                id="country"
                name="country"
                className="block h-[32px] w-full border-b border-dark-navy-blue/10 p-1.5  text-sm text-gray-900  focus:outline-none"
              >
                <option value="">United States</option>
                <option value="">1</option>
                <option value="">3</option>
              </select>
              <input
                type="text"
                id="Address"
                name="Address"
                placeholder="Address"
                className="block h-[32px] w-full p-1.5 text-sm text-gray-900   focus:outline-none"
              />
            </div>
          </form>
          <div className="mt-[20px] text-end">
            <button
              type="submit"
              onClick={() => setIsPaymentOpen(false)}
              className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white text-white transition-all hover:bg-pastel-purple"
            >
              Submit
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default BillingPaymentinfoTab;
