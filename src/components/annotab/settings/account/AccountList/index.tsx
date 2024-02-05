import { zodResolver } from '@hookform/resolvers/zod';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { useDebounce } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Popup from '@/components/annotab/popup';
import CoreTable from '@/components/annotab/table';
import toast from '@/components/annotab/toast';
import { useLayoutActions } from '@/components/providers/LayoutProvider';
import { useInviteMembers } from '@/hooks/mutations/useInviteMembers';
import { useInvitations } from '@/hooks/queries/useInvitations';
import type { Invitation } from '@/interfaces/invitation';
import { DEFAULT_PAGINATION } from '@/libs/constants';
import { InvitePeople } from '@/validations/WorkspaceValidation';

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
    cell: (info) => info.getValue(),
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.invitationAcceptedAt, {
    id: 'joined',
    cell: (info) =>
      info.getValue() ? dayjs(info.getValue()).format('DD MMM YYYY') : '',
    header: () => <span>Joined</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.user.lastLoginAt, {
    id: 'lastActive',
    cell: (info) =>
      info.getValue() ? dayjs(info.getValue()).format('DD MMM YYYY') : '',
    header: () => <span>Last Active</span>,
    footer: (props) => props.column.id,
  }),
];

const AccountList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  const { setLoading } = useLayoutActions();

  const handleLinkClick = () => {
    setIsLabelOpen(true);
  };
  const { data: session } = useSession();
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);
  const [search, setSearch] = useState('');
  const debounceSearchValue = useDebounce(search, 500);

  const { data } = useInvitations(
    session?.user.access.token,
    page,
    pageSize,
    debounceSearchValue
  );

  const { mutate } = useInviteMembers();

  const { handleSubmit, register } = useForm<z.infer<typeof InvitePeople>>({
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
            content: 'Workspace updated successfully',
          });
          setLoading(false);
          setIsOpen(false);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  });

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
                onChange={(e) => setSearch(e.target.value)}
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
          )}
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

export default AccountList;
