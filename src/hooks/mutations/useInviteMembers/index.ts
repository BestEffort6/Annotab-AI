import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { InviteMember } from '@/interfaces/invitation';
import type { Workspace } from '@/interfaces/workspace';
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
      body: JSON.stringify(payload),
    })
    .json()) as ApiResponse<Workspace>;

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
