import { CreditCardIcon } from '@heroicons/react/24/outline';
import { Switch } from '@nextui-org/react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FaCcMastercard } from 'react-icons/fa';
import {
  RiArrowDownSLine,
  RiArrowGoBackFill,
  RiArrowUpSLine,
  RiCheckboxCircleFill,
  RiVisaLine,
} from 'react-icons/ri';

import Popup from '@/components/annotab/popup';
import { useSubscription } from '@/hooks/queries/useSubscription';

const PlanBoxs = ({ setIsOpen }: any) => {
  const { data: session } = useSession();
  const [isTableVisible, setTableVisible] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const { data } = useSubscription(session?.user.access.token);
  console.log({ data });

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };
  return (
    <>
      <h4 className="mb-[24px] text-center text-[30px] font-[600] text-dark-navy-blue">
        Make changes to your plan
      </h4>
      <div className="mb-[30px] flex items-center justify-between">
        <label
          htmlFor="team"
          className="flex w-[50%] items-center gap-[30px] whitespace-nowrap text-[14px] font-normal text-dark-navy-blue"
        >
          Choose team size:
          <select
            id="team"
            name="team"
            className="bg-gray-purple-white block h-[34px] w-[150px] rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.09)] focus:border-dark-navy-blue/30 focus:outline-none"
          >
            <option value="">1 seat</option>
            <option value="">2 seat</option>
            <option value="">3 seat</option>
            <option value="">4 seat</option>
            <option value="">5 seat</option>
          </select>
        </label>
        <button
          onClick={() => setIsPlanOpen(true)}
          type="button"
          className="rounded-[8px] bg-pastel-green px-[18px] py-[6px] text-[14px] font-normal text-grey-purple-white drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)] transition-all hover:bg-pastel-green/70"
        >
          Proceed
        </button>
      </div>
      <div className="mb-[20px] flex gap-[30px]">
        {data?.data?.map((plan: any, index: number) => (
          <div className="w-[calc(33.33%-20px)]" key={plan?.id}>
            <label htmlFor={`radio-${index}`} className="custom-radio relative">
              <input
                type="radio"
                name="plan-radio"
                id={`radio-${index}`}
                className="absolute top-0 opacity-0"
              />
              <span className="mx-auto mb-[10px] block h-[20px] w-[20px] rounded-full border bg-grey-purple-white" />
              <div className="rounded-[8px] border border-silver-sand/25 bg-grey-purple-white">
                <span
                  className={clsx(
                    'block h-[14px] w-full rounded-[8px_8px_0_0]',
                    plan?.name === 'Free'
                      ? 'bg-chili-red'
                      : plan?.name === 'Personal'
                        ? 'bg-blue-pastel'
                        : 'bg-[#8315F9]'
                  )}
                >{` `}</span>
                <div className="px-[29px] pb-[30px] pt-[19px]">
                  <h6 className="mb-[20px] text-[18px] font-[600]">
                    {plan?.name}
                  </h6>
                  <h2
                    className={clsx(
                      'mb-[25px] text-[50px] font-[600]',
                      plan?.name === 'Free'
                        ? 'text-chili-red'
                        : plan?.name === 'Personal'
                          ? 'text-blue-pastel'
                          : 'text-[#8315F9]'
                    )}
                  >
                    $ 0
                  </h2>
                  {plan?.name === 'Free' ? (
                    <>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Free Forever
                      </p>
                      <hr className="mb-[18px] mt-[98px]" />
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Free plan includes
                      </p>
                      <p className="my-[26px] text-[14px] font-normal text-dark-navy-blue">
                        1000 images
                      </p>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Public workspace{' '}
                      </p>
                    </>
                  ) : plan?.name === 'Personal' ? (
                    <>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Pay as you go
                      </p>
                      <hr className="mb-[18px] mt-[98px]" />
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Personal plan includes{' '}
                      </p>
                      <p className="my-[26px] text-[14px] font-normal text-dark-navy-blue">
                        Unlimited dataset
                      </p>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Private workspace{' '}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mb-[8px] text-[14px] font-normal text-dark-navy-blue">
                        Extra seat $50 / month
                      </p>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Billed monthly
                      </p>
                      <hr className="mb-[18px] mt-[70px]" />
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Team plan includes{' '}
                      </p>
                      <p className="my-[26px] text-[14px] font-normal text-dark-navy-blue">
                        Customized workflow
                      </p>
                      <p className="text-[14px] font-normal text-dark-navy-blue">
                        Collaboration{' '}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
        {/* <div className="w-[calc(33.33%-20px)]" >
          <h6 className="mb-[8px] text-center text-[14px] font-normal text-dark-navy-blue">
            Current plan
          </h6>
          <div className="rounded-[8px] border border-silver-sand/25 bg-grey-purple-white">
            <span className="block h-[14px] w-full rounded-[8px_8px_0_0] bg-chili-red">{` `}</span>
            <div className="px-[29px] pb-[30px] pt-[19px]">
              <h6 className="mb-[20px] text-[18px] font-[600]">Free</h6>
              <h2 className="mb-[25px] text-[50px] font-[600] text-chili-red">
                $ 0
              </h2>
              <p className="text-[14px] font-normal text-dark-navy-blue">
                Free Forever
              </p>
              <hr className="mb-[18px] mt-[98px]" />
              <p className="text-[14px] font-normal text-dark-navy-blue">
                Free plan includes
              </p>
              <p className="my-[26px] text-[14px] font-normal text-dark-navy-blue">
                1000 images
              </p>
              <p className="text-[14px] font-normal text-dark-navy-blue">
                Public workspace{' '}
              </p>
            </div>
          </div>
        </div>
      <div className="w-[calc(33.33%-20px)] ">
        <label htmlFor="radio-2" className="custom-radio-purple relative">
          <input
            type="radio"
            name="plan-radio"
            id="radio-2"
            className="absolute top-0 opacity-0"
          />
          <span className="mx-auto mb-[10px] block h-[20px] w-[20px] rounded-full border bg-grey-purple-white" />
          <div className="rounded-[8px] border border-silver-sand/25 bg-grey-purple-white">
            <span className="block h-[14px] w-full rounded-[8px_8px_0_0] bg-[#8315F9]">{` `}</span>
            <div className="px-[29px] pb-[30px] pt-[19px]">
              <h6 className="mb-[20px] text-[18px] font-[600]">Team</h6>
              <h2 className="mb-[25px] flex items-center gap-[30px] text-[50px] font-[600] text-[#8315F9]">
                $ 200{' '}
                <span className="text-[14px] font-[600] text-dark-navy-blue">
                  3 seat / <br />
                  month
                </span>
              </h2>
              
            </div>
          </div>
        </label>
      </div> */}
      </div>
      <button
        onClick={toggleTableVisibility}
        type="button"
        className={`mx-auto flex items-center justify-center gap-[10px] text-[18px] text-dark-navy-blue ${
          isTableVisible ? 'mb-[30px]' : ''
        }`}
      >
        Compare plans and features{' '}
        {isTableVisible ? (
          <RiArrowUpSLine className="h-[30px] w-[30px]" />
        ) : (
          <RiArrowDownSLine className="h-[30px] w-[30px]" />
        )}
      </button>
      <div
        className={`transition-all duration-1000 ease-in ${
          isTableVisible
            ? 'transition-max-h opacity-1 max-h-[1000px] transition-opacity delay-150'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b  border-dark-navy-blue/25">
              <th className="px-[20px] pb-[15px] text-[14px] font-normal text-dark-navy-blue">
                Essentials
              </th>
              <th className="px-[20px] pb-[15px] text-center text-[14px] font-normal text-chili-red">
                Free
              </th>
              <th className="px-[20px] pb-[15px] text-center text-[14px] font-normal text-blue-pastel">
                Personal
              </th>
              <th className="px-[20px] pb-[15px] text-center text-[14px] font-normal text-[#8315F9]">
                Team
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-[20px] pt-[15px] text-[14px] font-normal text-dark-navy-blue">
                Seats
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
            </tr>
            <tr>
              <td className="px-[20px] pt-[15px] text-[14px] font-normal text-dark-navy-blue">
                Items
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                Unlimited
              </td>
            </tr>
            <tr>
              <td className="px-[20px] pt-[15px] text-[14px] font-normal text-dark-navy-blue">
                Unlimited boards
              </td>
              <td className="px-[20px] pt-[15px]">
                <RiCheckboxCircleFill className="mx-auto h-[22px] w-[22px] text-chili-red" />
                {` `}
              </td>
              <td className="px-[20px] pt-[15px]">
                <RiCheckboxCircleFill className="mx-auto h-[22px] w-[22px] text-blue-pastel" />
                {` `}
              </td>
              <td className="px-[20px] pt-[15px]">
                <RiCheckboxCircleFill className="mx-auto h-[22px] w-[22px] text-[#8315F9]" />
                {` `}
              </td>
            </tr>
            <tr>
              <td className="px-[20px] pt-[15px] text-[14px] font-normal text-dark-navy-blue">
                File storage
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                5 GB
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                20 GB
              </td>
              <td className="px-[20px] pt-[15px] text-center text-[14px] font-normal text-dark-navy-blue">
                100 GB
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Popup
        bgColor="bg-white"
        isOpen={isPlanOpen}
        setIsOpen={setIsPlanOpen}
        size="6xl"
        forceClose
      >
        <button
          onClick={() => setIsPlanOpen(false)}
          type="button"
          className="absolute left-[30px] top-[30px] flex h-[40px] w-[40px] items-center justify-center rounded-full border"
        >
          <RiArrowGoBackFill className="h-[18px] w-[18px]" /> {` `}
        </button>
        <h4 className="mb-[36px] text-center text-[30px] font-[600] text-dark-navy-blue">
          Make changes to your plan
        </h4>
        <h6 className="mb-[34px] text-[16px] font-normal text-dark-navy-blue">
          Plan’s name
        </h6>
        <div className="mb-[20px] rounded-[15px] border border-silver-sand/25 p-[30px_30px_20px]">
          <h2 className="mb-[25px] flex items-center gap-[30px] text-[50px] font-[600] text-blue-pastel">
            $ 0{' '}
            <span className="text-[14px] font-[600] text-dark-navy-blue">
              seat / <br />
              month
            </span>
          </h2>
          <div className="pl-[85px]">
            <div className="flex justify-between pl-[15px]">
              <p className="mb-[10px] text-[14px] font-normal text-dark-navy-blue">
                Total
              </p>
              <p className="mb-[10px] text-end text-[14px] font-normal text-dark-navy-blue">
                $0 / month
              </p>
            </div>
            <div className="flex justify-between pl-[15px]">
              <p className="mb-[10px] text-[14px] font-normal text-dark-navy-blue">
                Billed monthly
              </p>
            </div>
            <div className="mb-[15px] flex justify-between rounded-[8px] bg-light-greyish px-[15px] py-[6px]">
              <p className="flex items-center gap-[5px] text-[14px] font-normal text-dark-navy-blue">
                <Switch defaultSelected size="sm" color="secondary">
                  <span className="text-[#8315F9]">Save $0</span>{' '}
                </Switch>
                with annual billing
              </p>
              <p className="text-end text-[14px] font-normal text-dark-navy-blue">
                $0/ year
              </p>
            </div>
            <hr />
            <div className="mt-[15px] flex justify-between pl-[15px]">
              <p className="mb-[10px] text-[14px] font-normal text-dark-navy-blue">
                Subtotal
              </p>
              <p className="mb-[10px] text-end text-[14px] font-normal text-dark-navy-blue">
                $0
              </p>
            </div>
            <div className="flex justify-between pl-[15px]">
              <p className="text-[14px] font-normal text-dark-navy-blue">Tax</p>
              <p className="text-end text-[14px] font-normal text-dark-navy-blue">
                Enter address to calculate
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[15px] border border-silver-sand/25 p-[30px_30px_20px_120px]">
          <h6 className="mb-[11px] text-[14px] font-normal text-dark-navy-blue">
            Payment method
          </h6>
          <form>
            <div className="mb-[20px] max-w-[150px] rounded-[8px] border border-dark-navy-blue/10 p-1.5 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
              <CreditCardIcon width={20} />
              <p className="mt-[6px] text-[14px] font-normal text-dark-navy-blue">
                Card
              </p>
            </div>
            <div className="flex justify-between gap-[15px]">
              <div className="w-full max-w-[450px]">
                <p className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue">
                  Card infomation
                </p>
                <div className="bg-gray-purple-white mb-[12px] overflow-hidden rounded-[8px] border border-dark-navy-blue/10 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
                  <div className="relative">
                    <label htmlFor="CardNumber" aria-label="CardNumber">
                      {` `}
                      <input
                        type="text"
                        id="CardNumber"
                        name="CardNumber"
                        placeholder="1234 1234 1234 1234"
                        className="block h-[32px] w-full border-b border-dark-navy-blue/10 p-1.5 text-sm text-gray-900   focus:outline-none"
                      />
                    </label>
                    <div className="absolute right-[10px] top-[50%] flex translate-y-[-50%] gap-[5px]">
                      <FaCcMastercard />
                      <RiVisaLine />
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <label htmlFor="date" aria-label="date">
                      {` `}
                      <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder="MM / YY"
                        className="block h-[32px] w-[calc(50%)] border-r border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:outline-none"
                      />
                    </label>
                    <label htmlFor="CVC" aria-label="cvc">
                      {` `}
                      <input
                        type="text"
                        id="CVC"
                        name="CVC"
                        placeholder="CVC"
                        className="block h-[32px] w-[calc(50%)] p-1.5 text-sm text-gray-900 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[450px]">
                <p className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue">
                  Payment address
                </p>
                <div className="bg-gray-purple-white overflow-hidden rounded-[8px] border border-dark-navy-blue/10 shadow-[0_0px_2px_0px_rgba(0,0,0,0.1)]">
                  <label htmlFor="country" aria-label="country">
                    {` `}{' '}
                    <select
                      id="country"
                      name="country"
                      className="block h-[32px] w-full border-b border-dark-navy-blue/10 p-1.5  text-sm text-gray-900  focus:outline-none"
                    >
                      <option value="">United States</option>
                      <option value="">1</option>
                      <option value="">3</option>
                    </select>
                  </label>
                  <label htmlFor="Address" aria-label="Address">
                    {` `}
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      placeholder="Address"
                      className="block h-[32px] w-full p-1.5 text-sm text-gray-900   focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-[20px] text-end">
          <button
            type="submit"
            onClick={() => {
              setIsPlanOpen(false);
              setIsOpen(false);
            }}
            className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white transition-all hover:bg-pastel-purple"
          >
            Submit
          </button>
        </div>
      </Popup>
    </>
  );
};

export default PlanBoxs;
