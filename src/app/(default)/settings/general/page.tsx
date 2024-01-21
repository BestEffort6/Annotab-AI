'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

export default function GeneralSetting() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event?.target?.files?.[0]);
    }
  };

  return (
    <div className="w-2/4 pt-6 2xl:w-3/4">
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        General
      </h4>
      <hr className="" />
      <form className="mb-[18px] mt-[23px]" id="general-setting">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-[18px]">
              <label
                htmlFor="Workspace"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Workspace
                <input
                  type="text"
                  id="Workspace"
                  name="Workspace"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-[18px]">
              <label
                htmlFor="Description"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Description
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-[18px] max-w-[220px]">
              <label
                htmlFor="Location"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Location
                <select
                  id="Location"
                  name="Location"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                >
                  <option value="">1</option>
                  <option value="">1</option>
                  <option value="">3</option>
                </select>
              </label>
            </div>
            <div className="mb-[18px] max-w-[465px]">
              <label
                htmlFor="BillingEmail"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Billing email (Private)
                <input
                  type="text"
                  id="BillingEmail"
                  name="BillingEmail"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white text-white transition-all hover:bg-pastel-purple"
            >
              Update profile
            </button>
          </div>
          <div className="mx-auto max-w-[500px]">
            <h6 className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue">
              Profile picture
            </h6>
            <div className="flex flex-col items-center">
              <label htmlFor="profile" className="relative cursor-pointer">
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="h-[185px] w-[185px] overflow-hidden rounded-full drop-shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
                  <Image
                    width={185}
                    height={185}
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : '/images/svg/google.svg'
                    }
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="absolute bottom-[15px] left-[10px] block rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-dark-navy-blue">
                  Edit
                </span>
              </label>
            </div>
          </div>
        </div>
      </form>
      <h6 className="mb-[10px] text-[14px] font-[400] text-dark-navy-blue">
        Terms of Service
      </h6>
      <div className="mb-[17px] flex gap-[15px] rounded-[8px] border border-dark-navy-blue/25 p-[20px]">
        <CheckIcon className="text-dark-pastel-green" width={20} height={20} />
        <div>
          <h5 className="mb-[2px] text-[14px] font-[400] text-dark-navy-blue">
            lorem
          </h5>
          <h6 className="mb-[2px] text-[14px] font-[400] text-dark-navy-blue">
            lorem lorem lorem lorem lorem
          </h6>
          <p className="text-[14px] font-[400] text-neon-purple">
            Read the Annotab customer agreement
          </p>
        </div>
      </div>
      <h6 className="mb-[10px] text-[14px] font-[400] text-rusty-red">
        Danger Zone
      </h6>
      <div className="flex items-center gap-[15px] rounded-[8px] border border-rusty-red p-[20px]">
        <h5 className="mb-[2px] text-[14px] font-[400] text-dark-navy-blue">
          Delete this workspace
        </h5>
        <p className="mb-[2px] text-[14px] font-[400] text-dark-navy-blue">
          Once deleted, any remaining days left in your billing cycle won&apos;t
          be refunded.
        </p>
        <button
          type="button"
          className="ml-auto block rounded-md border border-dark-navy-blue/25 bg-mostly-white px-[16px] py-[6px] text-[14px] font-normal text-rusty-red transition-all hover:bg-rusty-red hover:text-mostly-white"
        >
          Delete this workspace
        </button>
      </div>
    </div>
  );
}
