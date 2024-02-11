'use client';

import clsx from 'clsx';
import type { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import toast from '@/components/annotab/toast';
import { useLayoutActions } from '@/components/providers/LayoutProvider';
import { useSwitchCurrentWorkspace } from '@/hooks/mutations/useSwitchCurrentWorkspace';
import { useCurrentWorkspace } from '@/hooks/queries/useCurrentWorkspace';
import { useWorkspaces } from '@/hooks/queries/userWorkspaces';
import { DEFAULT_PAGINATION } from '@/libs/constants';

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setLoading } = useLayoutActions();

  const [page] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data, isLoading: workspacesLoading } = useWorkspaces(
    session?.user.access.token,
    page,
    pageSize
  );

  const { data: currentWorkspace, isLoading: currentWorkspaceLoading } =
    useCurrentWorkspace(session?.user.access.token);

  const { mutate } = useSwitchCurrentWorkspace();

  useEffect(() => {
    if (workspacesLoading || currentWorkspaceLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [workspacesLoading, currentWorkspaceLoading, setLoading]);

  const handleSwitchWorkspace = (workspaceId: string) => {
    setLoading(true);
    mutate(
      {
        payload: { workspaceId },
        accessToken: session?.user.access.token,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
        async onError(error) {
          if (error.name === 'HTTPError') {
            const errJson = await (error as HTTPError).response.json();

            toast({
              type: 'error',
              content: errJson.message,
            });
          }
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex h-screen w-[71px] flex-col items-center justify-between gap-y-10 rounded-r-lg border-r bg-mostly-white py-3 dark:bg-purple-grey">
      <div>
        <LazyLoadImage
          src="/images/svg/logo-icon-dark.svg"
          className="z-20 mb-8 h-11 w-11 cursor-pointer"
          effect="blur"
          onClick={() => router.push('/')}
        />
        {data?.data && (
          <div className=" justify-top flex cursor-pointer flex-col items-center gap-y-4 overflow-y-auto overflow-x-hidden">
            {data.data.map((workspace) => (
              <button
                type="button"
                key={workspace.id}
                className={clsx(
                  workspace.id === currentWorkspace?.data?.id
                    ? 'bg-[#31374A] text-white'
                    : 'bg-[#31374A0D] text-[#31374A] hover:bg-[#31374A] hover:text-white',
                  'flex h-[44px] w-[44px] items-center justify-center rounded-3xl border text-center text-xl font-semibold transition-all'
                )}
                onClick={() => handleSwitchWorkspace(workspace.id)}
              >
                {workspace.name.charAt(0)}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-end gap-y-4 pb-3">
        <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
          <LazyLoadImage
            src="/images/svg/icon-help-greypuplewhite-light.svg"
            className="flex h-[19px] w-[19px] "
          />
        </div>
        <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
          <LazyLoadImage
            src="/images/svg/icon-policy-greypuplewhite-light.svg"
            className="flex h-[17px] w-[17px] "
          />
        </div>
        <div className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-3xl border bg-[#31374A0D]">
          <LazyLoadImage
            src="/images/svg/icon-settings-greypuplewhite-light.svg"
            className="flex h-[25px] w-[25px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
