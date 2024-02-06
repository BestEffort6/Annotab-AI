import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Invitation, InviteMember } from '@/interfaces/invitation';
import { Env } from '@/libs/Env.mjs';

export const inviteMembers = async (
  accessToken: string | undefined,
  payload: InviteMember
) => {
  const response = (await ky
    .post(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/invitation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: payload,
    })
    .json()) as ApiResponse<Invitation>;

  return response;
};

export const useInviteMembers = () => {
  return useMutation({
    mutationKey: ['inviteMembers'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: InviteMember;
    }) => inviteMembers(accessToken, payload),
  });
};
