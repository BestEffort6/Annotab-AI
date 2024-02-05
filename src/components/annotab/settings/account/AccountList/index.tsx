import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper } from '@tanstack/react-table';
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
import { DEFAULT_PAGINATION } from '@/libs/constants';
import { InvitePeople } from '@/validations/WorkspaceValidation';
// import { Checkbox } from '@nextui-org/react';

const columnHelper = createColumnHelper<any>();

const defaultColumns = [
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: 'role',
    cell: (info) => info.getValue(),
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.user.email, {
    id: 'email',
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
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
  // const [keyword, setKeyword] = useState('');

  const { data } = useInvitations(session?.user.access.token, page, pageSize);

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
                // onChange={e => setKeyword(e.target.value)}
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
        <CoreTable
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
        {/* <table className="w-full table-auto">
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
        </table> */}
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
