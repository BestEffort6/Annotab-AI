'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Snippet } from '@nextui-org/react';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import type { HTTPError } from 'ky';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useLayoutActions } from '@/components/providers/LayoutProvider';
import { useInviteMembers } from '@/hooks/mutations/useInviteMembers';
import { useInvitations } from '@/hooks/queries/useInvitations';
import type { Invitation } from '@/interfaces/invitation';
import { DEFAULT_PAGINATION, ROLE_COLORS } from '@/libs/constants';
import { InvitePeople } from '@/validations/WorkspaceValidation';

import Popup from '../../popup';
import CoreTable from '../../table';
import toast from '../../toast';

const columnHelper = createColumnHelper<Invitation>();

const defaultColumns: ColumnDef<Invitation, string>[] = [
  columnHelper.accessor((row) => `${row.user.firstName} ${row.user.lastName}`, {
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.user.email, {
    id: 'email',
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: 'role',
    cell: (info) => (
      <Snippet
        symbol=""
        hideCopyButton
        color={ROLE_COLORS[info.getValue().toUpperCase()]}
      >
        {info.getValue().toUpperCase()}
      </Snippet>
    ),
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
  }),
];

const Members = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading } = useLayoutActions();

  const [keyword] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useInvitations(
    session?.user.access.token,
    page,
    pageSize,
    keyword
  );

  const { mutate } = useInviteMembers();

  const { handleSubmit, register, reset } = useForm<
    z.infer<typeof InvitePeople>
  >({
    resolver: zodResolver(InvitePeople),
  });

  const handleInvite = handleSubmit(async (data) => {
    setLoading(true);

    mutate(
      { accessToken: session?.user.access.token, payload: data },
      {
        onSuccess: () => {
          toast({
            type: 'success',
            content: 'Add people successfully',
          });
          reset();
          setIsOpen(false);
        },
        onError: async (error) => {
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
  });

  return (
    <>
      <div className="flex w-full flex-col  gap-y-4 rounded-lg bg-mostly-white px-5 py-3">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm font-bold capitalize text-dark-navy-blue">
            Members
          </p>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="rounded-lg border border-dark-navy-blue/10 px-4 py-1 text-sm font-normal capitalize text-dark-navy-blue"
          >
            Add People
          </button>
        </div>
        <div className="w-full">
          <CoreTable<Invitation>
            data={data?.data || []}
            columns={defaultColumns}
            loading={false}
            page={page}
            pageSize={pageSize}
            total={data?.meta.itemCount || 0}
            totalPage={data?.meta.pageCount || 0}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      </div>
      <Popup bgColor="bg-white" isOpen={isOpen} setIsOpen={setIsOpen} size="md">
        <h6 className="mb-[20px] text-[16px] font-[600] text-dark-navy-blue">
          Invite people as Member
        </h6>
        <form onSubmit={handleInvite}>
          <label
            htmlFor="email"
            className="mb-[5px] block text-[14px] font-normal text-dark-navy-blue"
          >
            Email
            <input
              {...register('email')}
              type="email"
              id="email"
              name="email"
              className="bg-gray-purple-white mt-[5px] block w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
            />
          </label>

          <label
            htmlFor="Role"
            className="mb-[20px] mt-[10px] block text-[14px] font-normal text-dark-navy-blue"
          >
            Role
            <select
              {...register('role')}
              id="Role"
              name="Role"
              className="bg-gray-purple-white mt-[5px] block h-[34px] w-full rounded-[8px] border border-dark-navy-blue/10 p-1.5 text-sm text-gray-900 focus:border-dark-navy-blue/30 focus:outline-none"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
          </label>
          <div className="text-end">
            <button
              type="submit"
              // onClick={() => setIsOpen(false)}
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
export default Members;
