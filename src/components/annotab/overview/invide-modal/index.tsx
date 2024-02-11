import { zodResolver } from '@hookform/resolvers/zod';
import type { HTTPError } from 'ky';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useInviteMembers } from '@/hooks/mutations/useInviteMembers';
import { InvitePeople } from '@/validations/WorkspaceValidation';

import Popup from '../../popup';
import toast from '../../toast';

interface InviteModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const InviteModal = ({
  isOpen,
  setIsOpen,
  setLoading,
  size = 'md',
}: InviteModalProps) => {
  const { data: session } = useSession();

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
    <Popup bgColor="bg-white" isOpen={isOpen} setIsOpen={setIsOpen} size={size}>
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
            className="rounded-[8px] bg-neon-purple px-[20px] py-[6px] text-[14px] font-normal text-grey-purple-white text-white transition-all hover:bg-pastel-purple"
          >
            Confirm
          </button>
        </div>
      </form>
    </Popup>
  );
};
export default InviteModal;
