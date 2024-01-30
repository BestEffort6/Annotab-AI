'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { z } from 'zod';

import { useLayoutActions } from '@/components/providers/LayoutProvider';
import type { IGeneralSettings } from '@/interfaces/setting';
import { UpdateWorkspaceValidation } from '@/validations/WorkspaceValidation';

import toast from '../../toast';

const GeneralSettings = ({ currentWorkspace }: IGeneralSettings) => {
  const { setLoading } = useLayoutActions();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateWorkspaceValidation>>({
    resolver: zodResolver(UpdateWorkspaceValidation),
    defaultValues: {
      name: currentWorkspace?.name || '',
      description: currentWorkspace?.description || '',
    },
  });

  const handleUpdateWorkspace = handleSubmit(async (data) => {
    setLoading(true);

    const formDataObject = new FormData();
    Object.entries(data).map(([key, value]) =>
      formDataObject.append(key, value)
    );

    if (selectedFile) {
      formDataObject.append('file', selectedFile);
    }

    fetch('/api/workspace/current', {
      method: 'PATCH',
      body: formDataObject,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) {
          toast({
            type: 'error',
            content: res.body.message,
          });
        } else {
          toast({
            type: 'success',
            content: 'Workspace updated successfully',
          });
        }
      })
      .finally(() => setLoading(false));
  });

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
      <form className="mb-[18px] mt-[23px]" onSubmit={handleUpdateWorkspace}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-[18px]">
              <label
                htmlFor="Workspace"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Workspace
                <input
                  {...register('name')}
                  type="text"
                  id="Workspace"
                  name="name"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                />
              </label>
              {errors.name?.message && (
                <div className="text-sm text-red-500">
                  {errors.name.message.toString()}
                </div>
              )}
            </div>
            <div className="mb-[18px]">
              <label
                htmlFor="Description"
                className="mb-[10px] block text-[14px] font-normal text-dark-navy-blue"
              >
                Description
                <input
                  {...register('description')}
                  type="text"
                  id="Description"
                  name="description"
                  className="block w-full rounded-[8px] border border-dark-navy-blue/10 bg-[#F2F2F8] p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
                />
              </label>
              {errors.description?.message && (
                <div className="text-sm text-red-500">
                  {errors.description.message.toString()}
                </div>
              )}
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
                  disabled
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
                  disabled
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
                  name="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="h-[185px] w-[185px] overflow-hidden rounded-full drop-shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
                  <LazyLoadImage
                    effect="blur"
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : currentWorkspace?.profilePicture?.url ||
                          '/images/no-image.png'
                    }
                    alt="Profile"
                    className="h-[185px] w-[185px] rounded-full object-cover"
                    wrapperClassName="rounded-full object-cover h-[185px] w-[185px]"
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
};

export default GeneralSettings;
